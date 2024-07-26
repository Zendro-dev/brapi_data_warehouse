'use strict';

const _ = require('lodash');
const Sequelize = require('sequelize');
const dict = require('../../utils/graphql-sequelize-types');
const searchArg = require('../../utils/search-argument');
const globals = require('../../config/globals');
const validatorUtil = require('../../utils/validatorUtil');
const helpersAcl = require('../../utils/helpers-acl');
const email = require('../../utils/email');
const fs = require('fs');
const path = require('path');
const os = require('os');
const uuidv4 = require('uuidv4').uuid;
const helper = require('../../utils/helper');
const models = require(path.join(__dirname, '..', 'index.js'));
const moment = require('moment');
const errorHelper = require('../../utils/errors');
// An exact copy of the the model definition that comes from the .json file
const definition = {
    "model": "callset",
    "storageType": "sql",
    "attributes": {
        "additionalInfo_IDs": "[ String ]",
        "alleleMatrices_IDs": "[ String ]",
        "calls_IDs": "[ String ]",
        "callSetDbId": "[ String ]",
        "callSetName": "String",
        "created": "String",
        "externalReferences_IDs": "[ String ]",
        "sample_ID": "String",
        "study_ID": "String",
        "updated": "String",
        "variantSets_IDs": "[ String ]"
    },
    "associations": {
        "additionalInfo": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "callSet",
            "target": "additionalinfo",
            "targetKey": "callSet_ID",
            "sourceKey": "additionalInfo_IDs",
            "keysIn": "callset",
            "targetStorageType": "sql"
        },
        "alleleMatrices": {
            "type": "many_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "callSets",
            "target": "allelematrix",
            "targetKey": "callSets_IDs",
            "sourceKey": "alleleMatrices_IDs",
            "keysIn": "callset",
            "targetStorageType": "sql"
        },
        "calls": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "callSet",
            "target": "call",
            "targetKey": "callSet_ID",
            "sourceKey": "calls_IDs",
            "keysIn": "callset",
            "targetStorageType": "sql"
        },
        "externalReferences": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "callset",
            "target": "externalreference",
            "targetKey": "callset_ID",
            "sourceKey": "externalReferences_IDs",
            "keysIn": "callset",
            "targetStorageType": "sql"
        },
        "sample": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "callSets",
            "target": "sample",
            "targetKey": "callSets_IDs",
            "sourceKey": "sample_ID",
            "keysIn": "callset",
            "targetStorageType": "sql"
        },
        "study": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "callSets",
            "target": "study",
            "targetKey": "callSets_IDs",
            "sourceKey": "study_ID",
            "keysIn": "callset",
            "targetStorageType": "sql"
        },
        "variantSets": {
            "type": "many_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "callSets",
            "target": "variantset",
            "targetKey": "callSets_IDs",
            "sourceKey": "variantSets_IDs",
            "keysIn": "callset",
            "targetStorageType": "sql"
        }
    },
    "internalId": "callSetDbId",
    "id": {
        "name": "callSetDbId",
        "type": "[String]"
    }
};
const DataLoader = require("dataloader");

/**
 * module - Creates a sequelize model
 */

module.exports = class callset extends Sequelize.Model {
    /**
     * Initialize sequelize model.
     * @param  {object} sequelize Sequelize instance.
     * @param  {object} DataTypes Allowed sequelize data types.
     * @return {object}           Sequelize model with associations defined
     */
    static init(sequelize, DataTypes) {
        return super.init({

            callSetDbId: {
                type: Sequelize[dict['[String]']],
                primaryKey: true
            },
            additionalInfo_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            alleleMatrices_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            calls_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            callSetName: {
                type: Sequelize[dict['String']]
            },
            created: {
                type: Sequelize[dict['String']]
            },
            externalReferences_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            sample_ID: {
                type: Sequelize[dict['String']]
            },
            study_ID: {
                type: Sequelize[dict['String']]
            },
            updated: {
                type: Sequelize[dict['String']]
            },
            variantSets_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            }


        }, {
            modelName: "callset",
            tableName: "callsets",
            sequelize
        });
    }

    /**
     * Get the storage handler, which is a static property of the data model class.
     * @returns sequelize.
     */
    get storageHandler() {
        return this.sequelize;
    }

    /**
     * Cast array to JSON string for the storage.
     * @param  {object} record  Original data record.
     * @return {object}         Record with JSON string if necessary.
     */
    static preWriteCast(record) {
        for (let attr in definition.attributes) {
            let type = definition.attributes[attr].replace(/\s+/g, '');
            if (type[0] === '[' && record[attr] !== undefined && record[attr] !== null) {
                record[attr] = JSON.stringify(record[attr]);
            }
        }
        return record;
    }

    /**
     * Cast JSON string to array for the validation.
     * @param  {object} record  Record with JSON string if necessary.
     * @return {object}         Parsed data record.
     */
    static postReadCast(record) {
        for (let attr in definition.attributes) {
            let type = definition.attributes[attr].replace(/\s+/g, '');
            if (type[0] === '[' && record[attr] !== undefined && record[attr] !== null) {
                record[attr] = JSON.parse(record[attr]);
            }
        }
        return record;
    }

    /**
     * Associate models.
     * @param  {object} models  Indexed models.
     */
    static associate(models) {}

    /**
     * Batch function for readById method.
     * @param  {array} keys  keys from readById method
     * @return {array}       searched results
     */
    static async batchReadById(keys) {
        let queryArg = {
            operator: "in",
            field: callset.idAttribute(),
            value: keys.join(),
            valueType: "Array",
        };
        let cursorRes = await callset.readAllCursor(queryArg);
        cursorRes = cursorRes.callsets.reduce(
            (map, obj) => ((map[obj[callset.idAttribute()]] = obj), map), {}
        );
        return keys.map(
            (key) =>
            cursorRes[key] || new Error(`Record with ID = "${key}" does not exist`)
        );
    }

    static readByIdLoader = new DataLoader(callset.batchReadById, {
        cache: false,
    });

    /**
     * readById - The model implementation for reading a single record given by its ID
     *
     * Read a single record by a given ID
     * @param {string} id - The ID of the requested record
     * @return {object} The requested record as an object with the type callset, or an error object if the validation after reading fails
     * @throws {Error} If the requested record does not exist
     */
    static async readById(id) {
        return await callset.readByIdLoader.load(id);
    }
    /**
     * countRecords - The model implementation for counting the number of records, possibly restricted by a search term
     *
     * This method is the implementation for counting the number of records that fulfill a given condition, or for all records in the table.
     * @param {object} search - The search term that restricts the set of records to be counted - if undefined, all records in the table
     * @param {BenignErrorReporter} benignErrorReporter can be used to generate the standard
     * @return {number} The number of records that fulfill the condition, or of all records in the table
     */
    static async countRecords(search) {
        let options = {}
        options['where'] = helper.searchConditionsToSequelize(search, callset.definition.attributes);
        return super.count(options);
    }

    /**
     * readAll - The model implementation for searching for records in MongoDB. This method uses limit-offset-based pagination.
     *
     * @param  {object} search - Search argument for filtering records
     * @param  {array} order - Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination - Offset and limit to get the records from and to respectively
     * @param  {BenignErrorReporter} - benignErrorReporter can be used to generate the standard
     * @return {array}  Array of records holding conditions specified by search, order and pagination argument
     */
    static async readAll(search, order, pagination, benignErrorReporter) {
        // build the sequelize options object for limit-offset-based pagination
        let options = helper.buildLimitOffsetSequelizeOptions(search, order, pagination, this.idAttribute(), callset.definition.attributes);
        let records = await super.findAll(options);
        records = records.map(x => callset.postReadCast(x))
        // validationCheck after read
        return validatorUtil.bulkValidateData('validateAfterRead', this, records, benignErrorReporter);
    }

    /**
     * readAllCursor - The model implementation for searching for records. This method uses cursor based pagination.
     *
     * @param {object} search - The search condition for which records shall be fetched
     * @param  {array} order - Type of sorting (ASC, DESC) for each field
     * @param {object} pagination - The parameters for pagination, which can be used to get a subset of the requested record set.
     * @param {BenignErrorReporter} benignErrorReporter can be used to generate the standard
     * @return {object} The set of records, possibly constrained by pagination, with full cursor information for all records
     */
    static async readAllCursor(search, order, pagination, benignErrorReporter) {
        // build the sequelize options object for cursor-based pagination
        let options = helper.buildCursorBasedSequelizeOptions(search, order, pagination, this.idAttribute(), callset.definition.attributes);
        let records = await super.findAll(options);

        records = records.map(x => callset.postReadCast(x))

        // validationCheck after read
        records = await validatorUtil.bulkValidateData('validateAfterRead', this, records, benignErrorReporter);
        // get the first record (if exists) in the opposite direction to determine pageInfo.
        // if no cursor was given there is no need for an extra query as the results will start at the first (or last) page.
        let oppRecords = [];
        if (pagination && (pagination.after || pagination.before)) {
            let oppOptions = helper.buildOppositeSearchSequelize(search, order, {
                ...pagination,
                includeCursor: false
            }, this.idAttribute(), callset.definition.attributes);
            oppRecords = await super.findAll(oppOptions);
        }
        // build the graphql Connection Object
        let edges = helper.buildEdgeObject(records);
        let pageInfo = helper.buildPageInfo(edges, oppRecords, pagination);
        return {
            edges,
            pageInfo,
            callsets: edges.map((edge) => edge.node)
        };
    }

    /**
     * addOne - The model implementation method for adding a record.
     *
     * @param {object} input - The input object.
     * @return {object} The created record 
     * @throw {Error} If the process fails, an error is thrown
     */
    static async addOne(input) {
        //validate input
        await validatorUtil.validateData('validateForCreate', this, input);
        input = callset.preWriteCast(input)
        try {
            const result = await this.sequelize.transaction(async (t) => {
                let item = await super.create(input, {
                    transaction: t
                });
                return item;
            });
            callset.postReadCast(result.dataValues)
            callset.postReadCast(result._previousDataValues)
            return result;
        } catch (error) {
            throw error;
        }

    }

    /**
     * deleteOne - The model implementation for deleting a single record, given by its ID.
     *
     * @param {string} id - The ID of the record to be deleted
     * @returns {string} A success message is returned
     * @throw {Error} If the record could not be deleted - this means a record with the ID is still present
     */
    static async deleteOne(id) {
        //validate id
        await validatorUtil.validateData('validateForDelete', this, id);
        let destroyed = await super.destroy({
            where: {
                [this.idAttribute()]: id
            }
        });
        if (destroyed !== 0) {
            return 'Item successfully deleted';
        } else {
            throw new Error(`Record with ID = ${id} does not exist or could not been deleted`);
        }
    }

    /**
     * updateOne - The model implementation for updating a single record.
     *
     * @param {object} input - The input object.
     * @returns {object} The updated record
     * @throw {Error} If this method fails, an error is thrown
     */
    static async updateOne(input) {
        //validate input
        await validatorUtil.validateData('validateForUpdate', this, input);
        input = callset.preWriteCast(input)
        try {
            let result = await this.sequelize.transaction(async (t) => {
                let to_update = await super.findByPk(input[this.idAttribute()]);
                if (to_update === null) {
                    throw new Error(`Record with ID = ${input[this.idAttribute()]} does not exist`);
                }

                let updated = await to_update.update(input, {
                    transaction: t
                });
                return updated;
            });
            callset.postReadCast(result.dataValues)
            callset.postReadCast(result._previousDataValues)
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * csvTableTemplate - Allows the user to download a template in CSV format with the
     * properties and types of this model.
     *
     * @param {BenignErrorReporter} benignErrorReporter can be used to generate the standard
     * GraphQL output {error: ..., data: ...}. If the function reportError of the benignErrorReporter
     * is invoked, the server will include any so reported errors in the final response, i.e. the
     * GraphQL response will have a non empty errors property.
     */
    static async csvTableTemplate(benignErrorReporter) {
        return helper.csvTableTemplate(definition);
    }



    /**
     * add_sample_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   callSetDbId   IdAttribute of the root model to be updated
     * @param {Id}   sample_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_sample_ID(callSetDbId, sample_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.sample.add_callSets_IDs(sample_ID, [`${callSetDbId}`], benignErrorReporter, token, false);
            }
            let updated = await callset.update({
                sample_ID: sample_ID
            }, {
                where: {
                    callSetDbId: callSetDbId
                }
            });
            return updated[0];
        } catch (error) {
            benignErrorReporter.push({
                message: error
            });
        }
    }
    /**
     * add_study_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   callSetDbId   IdAttribute of the root model to be updated
     * @param {Id}   study_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_study_ID(callSetDbId, study_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.study.add_callSets_IDs(study_ID, [`${callSetDbId}`], benignErrorReporter, token, false);
            }
            let updated = await callset.update({
                study_ID: study_ID
            }, {
                where: {
                    callSetDbId: callSetDbId
                }
            });
            return updated[0];
        } catch (error) {
            benignErrorReporter.push({
                message: error
            });
        }
    }
    /**
     * add_additionalInfo_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   callSetDbId   IdAttribute of the root model to be updated
     * @param {Array}   additionalInfo_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_additionalInfo_IDs(callSetDbId, additionalInfo_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            additionalInfo_IDs.forEach(idx => {
                promises.push(models.additionalinfo.add_callSet_ID(idx, callSetDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(callSetDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.additionalInfo_IDs), additionalInfo_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                additionalInfo_IDs: updated_ids
            });
        }
    }
    /**
     * add_alleleMatrices_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   callSetDbId   IdAttribute of the root model to be updated
     * @param {Array}   alleleMatrices_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_alleleMatrices_IDs(callSetDbId, alleleMatrices_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            alleleMatrices_IDs.forEach(idx => {
                promises.push(models.allelematrix.add_callSets_IDs(idx, [`${callSetDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(callSetDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.alleleMatrices_IDs), alleleMatrices_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                alleleMatrices_IDs: updated_ids
            });
        }
    }
    /**
     * add_calls_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   callSetDbId   IdAttribute of the root model to be updated
     * @param {Array}   calls_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_calls_IDs(callSetDbId, calls_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            calls_IDs.forEach(idx => {
                promises.push(models.call.add_callSet_ID(idx, callSetDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(callSetDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.calls_IDs), calls_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                calls_IDs: updated_ids
            });
        }
    }
    /**
     * add_externalReferences_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   callSetDbId   IdAttribute of the root model to be updated
     * @param {Array}   externalReferences_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_externalReferences_IDs(callSetDbId, externalReferences_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            externalReferences_IDs.forEach(idx => {
                promises.push(models.externalreference.add_callset_ID(idx, callSetDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(callSetDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.externalReferences_IDs), externalReferences_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                externalReferences_IDs: updated_ids
            });
        }
    }
    /**
     * add_variantSets_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   callSetDbId   IdAttribute of the root model to be updated
     * @param {Array}   variantSets_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_variantSets_IDs(callSetDbId, variantSets_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            variantSets_IDs.forEach(idx => {
                promises.push(models.variantset.add_callSets_IDs(idx, [`${callSetDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(callSetDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.variantSets_IDs), variantSets_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                variantSets_IDs: updated_ids
            });
        }
    }

    /**
     * remove_sample_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   callSetDbId   IdAttribute of the root model to be updated
     * @param {Id}   sample_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_sample_ID(callSetDbId, sample_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.sample.remove_callSets_IDs(sample_ID, [`${callSetDbId}`], benignErrorReporter, token, false);
            }
            let updated = await callset.update({
                sample_ID: null
            }, {
                where: {
                    callSetDbId: callSetDbId,
                    sample_ID: sample_ID
                }
            });
            return updated[0];
        } catch (error) {
            benignErrorReporter.push({
                message: error
            });
        }
    }
    /**
     * remove_study_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   callSetDbId   IdAttribute of the root model to be updated
     * @param {Id}   study_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_study_ID(callSetDbId, study_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.study.remove_callSets_IDs(study_ID, [`${callSetDbId}`], benignErrorReporter, token, false);
            }
            let updated = await callset.update({
                study_ID: null
            }, {
                where: {
                    callSetDbId: callSetDbId,
                    study_ID: study_ID
                }
            });
            return updated[0];
        } catch (error) {
            benignErrorReporter.push({
                message: error
            });
        }
    }
    /**
     * remove_additionalInfo_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   callSetDbId   IdAttribute of the root model to be updated
     * @param {Array}   additionalInfo_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_additionalInfo_IDs(callSetDbId, additionalInfo_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            additionalInfo_IDs.forEach(idx => {
                promises.push(models.additionalinfo.remove_callSet_ID(idx, callSetDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(callSetDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.additionalInfo_IDs), additionalInfo_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                additionalInfo_IDs: updated_ids
            });
        }
    }
    /**
     * remove_alleleMatrices_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   callSetDbId   IdAttribute of the root model to be updated
     * @param {Array}   alleleMatrices_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_alleleMatrices_IDs(callSetDbId, alleleMatrices_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            alleleMatrices_IDs.forEach(idx => {
                promises.push(models.allelematrix.remove_callSets_IDs(idx, [`${callSetDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(callSetDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.alleleMatrices_IDs), alleleMatrices_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                alleleMatrices_IDs: updated_ids
            });
        }
    }
    /**
     * remove_calls_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   callSetDbId   IdAttribute of the root model to be updated
     * @param {Array}   calls_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_calls_IDs(callSetDbId, calls_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            calls_IDs.forEach(idx => {
                promises.push(models.call.remove_callSet_ID(idx, callSetDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(callSetDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.calls_IDs), calls_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                calls_IDs: updated_ids
            });
        }
    }
    /**
     * remove_externalReferences_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   callSetDbId   IdAttribute of the root model to be updated
     * @param {Array}   externalReferences_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_externalReferences_IDs(callSetDbId, externalReferences_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            externalReferences_IDs.forEach(idx => {
                promises.push(models.externalreference.remove_callset_ID(idx, callSetDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(callSetDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.externalReferences_IDs), externalReferences_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                externalReferences_IDs: updated_ids
            });
        }
    }
    /**
     * remove_variantSets_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   callSetDbId   IdAttribute of the root model to be updated
     * @param {Array}   variantSets_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_variantSets_IDs(callSetDbId, variantSets_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            variantSets_IDs.forEach(idx => {
                promises.push(models.variantset.remove_callSets_IDs(idx, [`${callSetDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(callSetDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.variantSets_IDs), variantSets_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                variantSets_IDs: updated_ids
            });
        }
    }








    /**
     * idAttribute - Check whether an attribute "internalId" is given in the JSON model. If not the standard "id" is used instead.
     *
     * @return {type} Name of the attribute that functions as an internalId
     */
    static idAttribute() {
        return callset.definition.id.name;
    }

    /**
     * idAttributeType - Return the Type of the internalId.
     *
     * @return {type} Type given in the JSON model
     */
    static idAttributeType() {
        return callset.definition.id.type;
    }

    /**
     * getIdValue - Get the value of the idAttribute ("id", or "internalId") for an instance of callset.
     *
     * @return {type} id value
     */
    getIdValue() {
        return this[callset.idAttribute()];
    }

    /**
     * definition - Getter for the attribute 'definition'
     * @return {string} the definition string
     */
    static get definition() {
        return definition;
    }

    /**
     * base64Decode - Decode a base 64 String to UTF-8.
     * @param {string} cursor - The cursor to be decoded into the record, given in base 64
     * @return {string} The stringified object in UTF-8 format
     */
    static base64Decode(cursor) {
        return Buffer.from(cursor, "base64").toString("utf-8");
    }

    /**
     * base64Encode - Encode  callset to a base 64 String
     *
     * @return {string} The callset object, encoded in a base 64 String
     */
    base64Encode() {
        return Buffer.from(JSON.stringify(this.stripAssociations())).toString(
            "base64"
        );
    }

    /**
     * asCursor - alias method for base64Encode
     *
     * @return {string} The callset object, encoded in a base 64 String
     */
    asCursor() {
        return this.base64Encode()
    }

    /**
     * stripAssociations - Instance method for getting all attributes of callset.
     *
     * @return {object} The attributes of callset in object form
     */
    stripAssociations() {
        let attributes = Object.keys(callset.definition.attributes);
        let data_values = _.pick(this, attributes);
        return data_values;
    }

    /**
     * externalIdsArray - Get all attributes of callset that are marked as external IDs.
     *
     * @return {Array<String>} An array of all attributes of callset that are marked as external IDs
     */
    static externalIdsArray() {
        let externalIds = [];
        if (definition.externalIds) {
            externalIds = definition.externalIds;
        }

        return externalIds;
    }

    /**
     * externalIdsObject - Get all external IDs of callset.
     *
     * @return {object} An object that has the names of the external IDs as keys and their types as values
     */
    static externalIdsObject() {
        return {};
    }

}