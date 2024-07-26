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
    "model": "scale",
    "storageType": "sql",
    "attributes": {
        "scaleDbId": "[ String ]",
        "dataType": "String",
        "decimalPlaces": "Int",
        "scaleName": "String",
        "scalePUI": "String",
        "units": "String",
        "additionalInfo_IDs": "[ String ]",
        "externalReferences_IDs": "[ String ]",
        "ontologyReference_ID": "String",
        "germplasmAttribute_ID": "String",
        "observationVariable_IDs": "[ String ]",
        "validValues_ID": "String"
    },
    "associations": {
        "additionalInfo": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "scale",
            "target": "additionalinfo",
            "targetKey": "scale_ID",
            "sourceKey": "additionalInfo_IDs",
            "keysIn": "scale",
            "targetStorageType": "sql"
        },
        "externalReferences": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "scale",
            "target": "externalreference",
            "targetKey": "scale_ID",
            "sourceKey": "externalReferences_IDs",
            "keysIn": "scale",
            "targetStorageType": "sql"
        },
        "ontologyReference": {
            "type": "one_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "scale",
            "target": "ontologyreference",
            "targetKey": "scale_ID",
            "sourceKey": "ontologyReference_ID",
            "keysIn": "scale",
            "targetStorageType": "sql"
        },
        "germplasmAttribute": {
            "type": "one_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "scale",
            "target": "germplasmattribute",
            "targetKey": "scale_ID",
            "sourceKey": "germplasmAttribute_ID",
            "keysIn": "scale",
            "targetStorageType": "sql"
        },
        "observationVariable": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "scale",
            "target": "observationvariable",
            "targetKey": "scale_ID",
            "sourceKey": "observationVariable_IDs",
            "keysIn": "scale",
            "targetStorageType": "sql"
        },
        "validValues": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "scales",
            "target": "validvalue",
            "targetKey": "scales_IDs",
            "sourceKey": "validValues_ID",
            "keysIn": "scale",
            "targetStorageType": "sql"
        }
    },
    "internalId": "scaleDbId",
    "id": {
        "name": "scaleDbId",
        "type": "[String]"
    }
};
const DataLoader = require("dataloader");

/**
 * module - Creates a sequelize model
 */

module.exports = class scale extends Sequelize.Model {
    /**
     * Initialize sequelize model.
     * @param  {object} sequelize Sequelize instance.
     * @param  {object} DataTypes Allowed sequelize data types.
     * @return {object}           Sequelize model with associations defined
     */
    static init(sequelize, DataTypes) {
        return super.init({

            scaleDbId: {
                type: Sequelize[dict['[String]']],
                primaryKey: true
            },
            dataType: {
                type: Sequelize[dict['String']]
            },
            decimalPlaces: {
                type: Sequelize[dict['Int']]
            },
            scaleName: {
                type: Sequelize[dict['String']]
            },
            scalePUI: {
                type: Sequelize[dict['String']]
            },
            units: {
                type: Sequelize[dict['String']]
            },
            additionalInfo_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            externalReferences_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            ontologyReference_ID: {
                type: Sequelize[dict['String']]
            },
            germplasmAttribute_ID: {
                type: Sequelize[dict['String']]
            },
            observationVariable_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            validValues_ID: {
                type: Sequelize[dict['String']]
            }


        }, {
            modelName: "scale",
            tableName: "scales",
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
            field: scale.idAttribute(),
            value: keys.join(),
            valueType: "Array",
        };
        let cursorRes = await scale.readAllCursor(queryArg);
        cursorRes = cursorRes.scales.reduce(
            (map, obj) => ((map[obj[scale.idAttribute()]] = obj), map), {}
        );
        return keys.map(
            (key) =>
            cursorRes[key] || new Error(`Record with ID = "${key}" does not exist`)
        );
    }

    static readByIdLoader = new DataLoader(scale.batchReadById, {
        cache: false,
    });

    /**
     * readById - The model implementation for reading a single record given by its ID
     *
     * Read a single record by a given ID
     * @param {string} id - The ID of the requested record
     * @return {object} The requested record as an object with the type scale, or an error object if the validation after reading fails
     * @throws {Error} If the requested record does not exist
     */
    static async readById(id) {
        return await scale.readByIdLoader.load(id);
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
        options['where'] = helper.searchConditionsToSequelize(search, scale.definition.attributes);
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
        let options = helper.buildLimitOffsetSequelizeOptions(search, order, pagination, this.idAttribute(), scale.definition.attributes);
        let records = await super.findAll(options);
        records = records.map(x => scale.postReadCast(x))
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
        let options = helper.buildCursorBasedSequelizeOptions(search, order, pagination, this.idAttribute(), scale.definition.attributes);
        let records = await super.findAll(options);

        records = records.map(x => scale.postReadCast(x))

        // validationCheck after read
        records = await validatorUtil.bulkValidateData('validateAfterRead', this, records, benignErrorReporter);
        // get the first record (if exists) in the opposite direction to determine pageInfo.
        // if no cursor was given there is no need for an extra query as the results will start at the first (or last) page.
        let oppRecords = [];
        if (pagination && (pagination.after || pagination.before)) {
            let oppOptions = helper.buildOppositeSearchSequelize(search, order, {
                ...pagination,
                includeCursor: false
            }, this.idAttribute(), scale.definition.attributes);
            oppRecords = await super.findAll(oppOptions);
        }
        // build the graphql Connection Object
        let edges = helper.buildEdgeObject(records);
        let pageInfo = helper.buildPageInfo(edges, oppRecords, pagination);
        return {
            edges,
            pageInfo,
            scales: edges.map((edge) => edge.node)
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
        input = scale.preWriteCast(input)
        try {
            const result = await this.sequelize.transaction(async (t) => {
                let item = await super.create(input, {
                    transaction: t
                });
                return item;
            });
            scale.postReadCast(result.dataValues)
            scale.postReadCast(result._previousDataValues)
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
        input = scale.preWriteCast(input)
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
            scale.postReadCast(result.dataValues)
            scale.postReadCast(result._previousDataValues)
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
     * add_ontologyReference_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   scaleDbId   IdAttribute of the root model to be updated
     * @param {Id}   ontologyReference_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_ontologyReference_ID(scaleDbId, ontologyReference_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.ontologyreference.add_scale_ID(ontologyReference_ID, scaleDbId, benignErrorReporter, token, false);
            }
            let updated = await scale.update({
                ontologyReference_ID: ontologyReference_ID
            }, {
                where: {
                    scaleDbId: scaleDbId
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
     * add_germplasmAttribute_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   scaleDbId   IdAttribute of the root model to be updated
     * @param {Id}   germplasmAttribute_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_germplasmAttribute_ID(scaleDbId, germplasmAttribute_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.germplasmattribute.add_scale_ID(germplasmAttribute_ID, scaleDbId, benignErrorReporter, token, false);
            }
            let updated = await scale.update({
                germplasmAttribute_ID: germplasmAttribute_ID
            }, {
                where: {
                    scaleDbId: scaleDbId
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
     * add_validValues_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   scaleDbId   IdAttribute of the root model to be updated
     * @param {Id}   validValues_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_validValues_ID(scaleDbId, validValues_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.validvalue.add_scales_IDs(validValues_ID, [`${scaleDbId}`], benignErrorReporter, token, false);
            }
            let updated = await scale.update({
                validValues_ID: validValues_ID
            }, {
                where: {
                    scaleDbId: scaleDbId
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
     * @param {Id}   scaleDbId   IdAttribute of the root model to be updated
     * @param {Array}   additionalInfo_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_additionalInfo_IDs(scaleDbId, additionalInfo_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            additionalInfo_IDs.forEach(idx => {
                promises.push(models.additionalinfo.add_scale_ID(idx, scaleDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(scaleDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.additionalInfo_IDs), additionalInfo_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                additionalInfo_IDs: updated_ids
            });
        }
    }
    /**
     * add_externalReferences_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   scaleDbId   IdAttribute of the root model to be updated
     * @param {Array}   externalReferences_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_externalReferences_IDs(scaleDbId, externalReferences_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            externalReferences_IDs.forEach(idx => {
                promises.push(models.externalreference.add_scale_ID(idx, scaleDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(scaleDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.externalReferences_IDs), externalReferences_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                externalReferences_IDs: updated_ids
            });
        }
    }
    /**
     * add_observationVariable_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   scaleDbId   IdAttribute of the root model to be updated
     * @param {Array}   observationVariable_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_observationVariable_IDs(scaleDbId, observationVariable_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            observationVariable_IDs.forEach(idx => {
                promises.push(models.observationvariable.add_scale_ID(idx, scaleDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(scaleDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.observationVariable_IDs), observationVariable_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                observationVariable_IDs: updated_ids
            });
        }
    }

    /**
     * remove_ontologyReference_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   scaleDbId   IdAttribute of the root model to be updated
     * @param {Id}   ontologyReference_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_ontologyReference_ID(scaleDbId, ontologyReference_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.ontologyreference.remove_scale_ID(ontologyReference_ID, scaleDbId, benignErrorReporter, token, false);
            }
            let updated = await scale.update({
                ontologyReference_ID: null
            }, {
                where: {
                    scaleDbId: scaleDbId,
                    ontologyReference_ID: ontologyReference_ID
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
     * remove_germplasmAttribute_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   scaleDbId   IdAttribute of the root model to be updated
     * @param {Id}   germplasmAttribute_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_germplasmAttribute_ID(scaleDbId, germplasmAttribute_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.germplasmattribute.remove_scale_ID(germplasmAttribute_ID, scaleDbId, benignErrorReporter, token, false);
            }
            let updated = await scale.update({
                germplasmAttribute_ID: null
            }, {
                where: {
                    scaleDbId: scaleDbId,
                    germplasmAttribute_ID: germplasmAttribute_ID
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
     * remove_validValues_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   scaleDbId   IdAttribute of the root model to be updated
     * @param {Id}   validValues_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_validValues_ID(scaleDbId, validValues_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.validvalue.remove_scales_IDs(validValues_ID, [`${scaleDbId}`], benignErrorReporter, token, false);
            }
            let updated = await scale.update({
                validValues_ID: null
            }, {
                where: {
                    scaleDbId: scaleDbId,
                    validValues_ID: validValues_ID
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
     * @param {Id}   scaleDbId   IdAttribute of the root model to be updated
     * @param {Array}   additionalInfo_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_additionalInfo_IDs(scaleDbId, additionalInfo_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            additionalInfo_IDs.forEach(idx => {
                promises.push(models.additionalinfo.remove_scale_ID(idx, scaleDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(scaleDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.additionalInfo_IDs), additionalInfo_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                additionalInfo_IDs: updated_ids
            });
        }
    }
    /**
     * remove_externalReferences_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   scaleDbId   IdAttribute of the root model to be updated
     * @param {Array}   externalReferences_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_externalReferences_IDs(scaleDbId, externalReferences_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            externalReferences_IDs.forEach(idx => {
                promises.push(models.externalreference.remove_scale_ID(idx, scaleDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(scaleDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.externalReferences_IDs), externalReferences_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                externalReferences_IDs: updated_ids
            });
        }
    }
    /**
     * remove_observationVariable_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   scaleDbId   IdAttribute of the root model to be updated
     * @param {Array}   observationVariable_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_observationVariable_IDs(scaleDbId, observationVariable_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            observationVariable_IDs.forEach(idx => {
                promises.push(models.observationvariable.remove_scale_ID(idx, scaleDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(scaleDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.observationVariable_IDs), observationVariable_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                observationVariable_IDs: updated_ids
            });
        }
    }








    /**
     * idAttribute - Check whether an attribute "internalId" is given in the JSON model. If not the standard "id" is used instead.
     *
     * @return {type} Name of the attribute that functions as an internalId
     */
    static idAttribute() {
        return scale.definition.id.name;
    }

    /**
     * idAttributeType - Return the Type of the internalId.
     *
     * @return {type} Type given in the JSON model
     */
    static idAttributeType() {
        return scale.definition.id.type;
    }

    /**
     * getIdValue - Get the value of the idAttribute ("id", or "internalId") for an instance of scale.
     *
     * @return {type} id value
     */
    getIdValue() {
        return this[scale.idAttribute()];
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
     * base64Encode - Encode  scale to a base 64 String
     *
     * @return {string} The scale object, encoded in a base 64 String
     */
    base64Encode() {
        return Buffer.from(JSON.stringify(this.stripAssociations())).toString(
            "base64"
        );
    }

    /**
     * asCursor - alias method for base64Encode
     *
     * @return {string} The scale object, encoded in a base 64 String
     */
    asCursor() {
        return this.base64Encode()
    }

    /**
     * stripAssociations - Instance method for getting all attributes of scale.
     *
     * @return {object} The attributes of scale in object form
     */
    stripAssociations() {
        let attributes = Object.keys(scale.definition.attributes);
        let data_values = _.pick(this, attributes);
        return data_values;
    }

    /**
     * externalIdsArray - Get all attributes of scale that are marked as external IDs.
     *
     * @return {Array<String>} An array of all attributes of scale that are marked as external IDs
     */
    static externalIdsArray() {
        let externalIds = [];
        if (definition.externalIds) {
            externalIds = definition.externalIds;
        }

        return externalIds;
    }

    /**
     * externalIdsObject - Get all external IDs of scale.
     *
     * @return {object} An object that has the names of the external IDs as keys and their types as values
     */
    static externalIdsObject() {
        return {};
    }

}