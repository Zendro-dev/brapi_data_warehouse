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
    "model": "pedigreenode",
    "storageType": "sql",
    "attributes": {
        "pedigreeNodeDbId": "[ String ]",
        "breedingMethod_ID": "String",
        "crossingProject_ID": "String",
        "crossingYear": "Int",
        "defaultDisplayName": "String",
        "familyCode": "String",
        "germplasm_ID": "String",
        "germplasmPUI": "String",
        "pedigreeString": "String",
        "additionalInfo_IDs": "[ String ]",
        "externalReferences_IDs": "[ String ]",
        "parents_IDs": "[ String ]",
        "progeny_IDs": "[ String ]",
        "siblings_IDs": "[ String ]"
    },
    "associations": {
        "breedingMethod": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "pedigreeNodes",
            "target": "breedingmethod",
            "targetKey": "pedigreeNodes_IDs",
            "sourceKey": "breedingMethod_ID",
            "keysIn": "pedigreenode",
            "targetStorageType": "sql"
        },
        "crossingProject": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "pedigreeNodes",
            "target": "crossingproject",
            "targetKey": "pedigreeNodes_IDs",
            "sourceKey": "crossingProject_ID",
            "keysIn": "pedigreenode",
            "targetStorageType": "sql"
        },
        "germplasm": {
            "type": "one_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "pedigreeNode",
            "target": "germplasm",
            "targetKey": "pedigreeNode_ID",
            "sourceKey": "germplasm_ID",
            "keysIn": "pedigreenode",
            "targetStorageType": "sql"
        },
        "additionalInfo": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "pedigreeNode",
            "target": "additionalinfo",
            "targetKey": "pedigreeNode_ID",
            "sourceKey": "additionalInfo_IDs",
            "keysIn": "pedigreenode",
            "targetStorageType": "sql"
        },
        "externalReferences": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "pedigreeNode",
            "target": "externalreference",
            "targetKey": "pedigreeNode_ID",
            "sourceKey": "externalReferences_IDs",
            "keysIn": "pedigreenode",
            "targetStorageType": "sql"
        },
        "parents": {
            "type": "many_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "pedigreeNode",
            "target": "parent",
            "targetKey": "pedigreeNode_IDs",
            "sourceKey": "parents_IDs",
            "keysIn": "pedigreenode",
            "targetStorageType": "sql"
        },
        "progeny": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "pedigreeNode",
            "target": "progeny",
            "targetKey": "pedigreeNode_ID",
            "sourceKey": "progeny_IDs",
            "keysIn": "pedigreenode",
            "targetStorageType": "sql"
        },
        "siblings": {
            "type": "many_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "pedigreeNode",
            "target": "sibling",
            "targetKey": "pedigreeNode_IDs",
            "sourceKey": "siblings_IDs",
            "keysIn": "pedigreenode",
            "targetStorageType": "sql"
        }
    },
    "internalId": "pedigreeNodeDbId",
    "id": {
        "name": "pedigreeNodeDbId",
        "type": "[String]"
    }
};
const DataLoader = require("dataloader");

/**
 * module - Creates a sequelize model
 */

module.exports = class pedigreenode extends Sequelize.Model {
    /**
     * Initialize sequelize model.
     * @param  {object} sequelize Sequelize instance.
     * @param  {object} DataTypes Allowed sequelize data types.
     * @return {object}           Sequelize model with associations defined
     */
    static init(sequelize, DataTypes) {
        return super.init({

            pedigreeNodeDbId: {
                type: Sequelize[dict['[String]']],
                primaryKey: true
            },
            breedingMethod_ID: {
                type: Sequelize[dict['String']]
            },
            crossingProject_ID: {
                type: Sequelize[dict['String']]
            },
            crossingYear: {
                type: Sequelize[dict['Int']]
            },
            defaultDisplayName: {
                type: Sequelize[dict['String']]
            },
            familyCode: {
                type: Sequelize[dict['String']]
            },
            germplasm_ID: {
                type: Sequelize[dict['String']]
            },
            germplasmPUI: {
                type: Sequelize[dict['String']]
            },
            pedigreeString: {
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
            parents_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            progeny_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            siblings_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            }


        }, {
            modelName: "pedigreenode",
            tableName: "pedigreenodes",
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
            field: pedigreenode.idAttribute(),
            value: keys.join(),
            valueType: "Array",
        };
        let cursorRes = await pedigreenode.readAllCursor(queryArg);
        cursorRes = cursorRes.pedigreenodes.reduce(
            (map, obj) => ((map[obj[pedigreenode.idAttribute()]] = obj), map), {}
        );
        return keys.map(
            (key) =>
            cursorRes[key] || new Error(`Record with ID = "${key}" does not exist`)
        );
    }

    static readByIdLoader = new DataLoader(pedigreenode.batchReadById, {
        cache: false,
    });

    /**
     * readById - The model implementation for reading a single record given by its ID
     *
     * Read a single record by a given ID
     * @param {string} id - The ID of the requested record
     * @return {object} The requested record as an object with the type pedigreenode, or an error object if the validation after reading fails
     * @throws {Error} If the requested record does not exist
     */
    static async readById(id) {
        return await pedigreenode.readByIdLoader.load(id);
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
        options['where'] = helper.searchConditionsToSequelize(search, pedigreenode.definition.attributes);
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
        let options = helper.buildLimitOffsetSequelizeOptions(search, order, pagination, this.idAttribute(), pedigreenode.definition.attributes);
        let records = await super.findAll(options);
        records = records.map(x => pedigreenode.postReadCast(x))
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
        let options = helper.buildCursorBasedSequelizeOptions(search, order, pagination, this.idAttribute(), pedigreenode.definition.attributes);
        let records = await super.findAll(options);

        records = records.map(x => pedigreenode.postReadCast(x))

        // validationCheck after read
        records = await validatorUtil.bulkValidateData('validateAfterRead', this, records, benignErrorReporter);
        // get the first record (if exists) in the opposite direction to determine pageInfo.
        // if no cursor was given there is no need for an extra query as the results will start at the first (or last) page.
        let oppRecords = [];
        if (pagination && (pagination.after || pagination.before)) {
            let oppOptions = helper.buildOppositeSearchSequelize(search, order, {
                ...pagination,
                includeCursor: false
            }, this.idAttribute(), pedigreenode.definition.attributes);
            oppRecords = await super.findAll(oppOptions);
        }
        // build the graphql Connection Object
        let edges = helper.buildEdgeObject(records);
        let pageInfo = helper.buildPageInfo(edges, oppRecords, pagination);
        return {
            edges,
            pageInfo,
            pedigreenodes: edges.map((edge) => edge.node)
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
        input = pedigreenode.preWriteCast(input)
        try {
            const result = await this.sequelize.transaction(async (t) => {
                let item = await super.create(input, {
                    transaction: t
                });
                return item;
            });
            pedigreenode.postReadCast(result.dataValues)
            pedigreenode.postReadCast(result._previousDataValues)
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
        input = pedigreenode.preWriteCast(input)
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
            pedigreenode.postReadCast(result.dataValues)
            pedigreenode.postReadCast(result._previousDataValues)
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
     * add_breedingMethod_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   pedigreeNodeDbId   IdAttribute of the root model to be updated
     * @param {Id}   breedingMethod_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_breedingMethod_ID(pedigreeNodeDbId, breedingMethod_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.breedingmethod.add_pedigreeNodes_IDs(breedingMethod_ID, [`${pedigreeNodeDbId}`], benignErrorReporter, token, false);
            }
            let updated = await pedigreenode.update({
                breedingMethod_ID: breedingMethod_ID
            }, {
                where: {
                    pedigreeNodeDbId: pedigreeNodeDbId
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
     * add_crossingProject_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   pedigreeNodeDbId   IdAttribute of the root model to be updated
     * @param {Id}   crossingProject_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_crossingProject_ID(pedigreeNodeDbId, crossingProject_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.crossingproject.add_pedigreeNodes_IDs(crossingProject_ID, [`${pedigreeNodeDbId}`], benignErrorReporter, token, false);
            }
            let updated = await pedigreenode.update({
                crossingProject_ID: crossingProject_ID
            }, {
                where: {
                    pedigreeNodeDbId: pedigreeNodeDbId
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
     * add_germplasm_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   pedigreeNodeDbId   IdAttribute of the root model to be updated
     * @param {Id}   germplasm_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_germplasm_ID(pedigreeNodeDbId, germplasm_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.germplasm.add_pedigreeNode_ID(germplasm_ID, pedigreeNodeDbId, benignErrorReporter, token, false);
            }
            let updated = await pedigreenode.update({
                germplasm_ID: germplasm_ID
            }, {
                where: {
                    pedigreeNodeDbId: pedigreeNodeDbId
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
     * @param {Id}   pedigreeNodeDbId   IdAttribute of the root model to be updated
     * @param {Array}   additionalInfo_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_additionalInfo_IDs(pedigreeNodeDbId, additionalInfo_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            additionalInfo_IDs.forEach(idx => {
                promises.push(models.additionalinfo.add_pedigreeNode_ID(idx, pedigreeNodeDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(pedigreeNodeDbId);
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
     * @param {Id}   pedigreeNodeDbId   IdAttribute of the root model to be updated
     * @param {Array}   externalReferences_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_externalReferences_IDs(pedigreeNodeDbId, externalReferences_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            externalReferences_IDs.forEach(idx => {
                promises.push(models.externalreference.add_pedigreeNode_ID(idx, pedigreeNodeDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(pedigreeNodeDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.externalReferences_IDs), externalReferences_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                externalReferences_IDs: updated_ids
            });
        }
    }
    /**
     * add_parents_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   pedigreeNodeDbId   IdAttribute of the root model to be updated
     * @param {Array}   parents_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_parents_IDs(pedigreeNodeDbId, parents_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            parents_IDs.forEach(idx => {
                promises.push(models.parent.add_pedigreeNode_IDs(idx, [`${pedigreeNodeDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(pedigreeNodeDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.parents_IDs), parents_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                parents_IDs: updated_ids
            });
        }
    }
    /**
     * add_progeny_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   pedigreeNodeDbId   IdAttribute of the root model to be updated
     * @param {Array}   progeny_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_progeny_IDs(pedigreeNodeDbId, progeny_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            progeny_IDs.forEach(idx => {
                promises.push(models.progeny.add_pedigreeNode_ID(idx, pedigreeNodeDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(pedigreeNodeDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.progeny_IDs), progeny_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                progeny_IDs: updated_ids
            });
        }
    }
    /**
     * add_siblings_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   pedigreeNodeDbId   IdAttribute of the root model to be updated
     * @param {Array}   siblings_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_siblings_IDs(pedigreeNodeDbId, siblings_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            siblings_IDs.forEach(idx => {
                promises.push(models.sibling.add_pedigreeNode_IDs(idx, [`${pedigreeNodeDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(pedigreeNodeDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.siblings_IDs), siblings_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                siblings_IDs: updated_ids
            });
        }
    }

    /**
     * remove_breedingMethod_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   pedigreeNodeDbId   IdAttribute of the root model to be updated
     * @param {Id}   breedingMethod_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_breedingMethod_ID(pedigreeNodeDbId, breedingMethod_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.breedingmethod.remove_pedigreeNodes_IDs(breedingMethod_ID, [`${pedigreeNodeDbId}`], benignErrorReporter, token, false);
            }
            let updated = await pedigreenode.update({
                breedingMethod_ID: null
            }, {
                where: {
                    pedigreeNodeDbId: pedigreeNodeDbId,
                    breedingMethod_ID: breedingMethod_ID
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
     * remove_crossingProject_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   pedigreeNodeDbId   IdAttribute of the root model to be updated
     * @param {Id}   crossingProject_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_crossingProject_ID(pedigreeNodeDbId, crossingProject_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.crossingproject.remove_pedigreeNodes_IDs(crossingProject_ID, [`${pedigreeNodeDbId}`], benignErrorReporter, token, false);
            }
            let updated = await pedigreenode.update({
                crossingProject_ID: null
            }, {
                where: {
                    pedigreeNodeDbId: pedigreeNodeDbId,
                    crossingProject_ID: crossingProject_ID
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
     * remove_germplasm_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   pedigreeNodeDbId   IdAttribute of the root model to be updated
     * @param {Id}   germplasm_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_germplasm_ID(pedigreeNodeDbId, germplasm_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.germplasm.remove_pedigreeNode_ID(germplasm_ID, pedigreeNodeDbId, benignErrorReporter, token, false);
            }
            let updated = await pedigreenode.update({
                germplasm_ID: null
            }, {
                where: {
                    pedigreeNodeDbId: pedigreeNodeDbId,
                    germplasm_ID: germplasm_ID
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
     * @param {Id}   pedigreeNodeDbId   IdAttribute of the root model to be updated
     * @param {Array}   additionalInfo_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_additionalInfo_IDs(pedigreeNodeDbId, additionalInfo_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            additionalInfo_IDs.forEach(idx => {
                promises.push(models.additionalinfo.remove_pedigreeNode_ID(idx, pedigreeNodeDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(pedigreeNodeDbId);
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
     * @param {Id}   pedigreeNodeDbId   IdAttribute of the root model to be updated
     * @param {Array}   externalReferences_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_externalReferences_IDs(pedigreeNodeDbId, externalReferences_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            externalReferences_IDs.forEach(idx => {
                promises.push(models.externalreference.remove_pedigreeNode_ID(idx, pedigreeNodeDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(pedigreeNodeDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.externalReferences_IDs), externalReferences_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                externalReferences_IDs: updated_ids
            });
        }
    }
    /**
     * remove_parents_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   pedigreeNodeDbId   IdAttribute of the root model to be updated
     * @param {Array}   parents_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_parents_IDs(pedigreeNodeDbId, parents_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            parents_IDs.forEach(idx => {
                promises.push(models.parent.remove_pedigreeNode_IDs(idx, [`${pedigreeNodeDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(pedigreeNodeDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.parents_IDs), parents_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                parents_IDs: updated_ids
            });
        }
    }
    /**
     * remove_progeny_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   pedigreeNodeDbId   IdAttribute of the root model to be updated
     * @param {Array}   progeny_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_progeny_IDs(pedigreeNodeDbId, progeny_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            progeny_IDs.forEach(idx => {
                promises.push(models.progeny.remove_pedigreeNode_ID(idx, pedigreeNodeDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(pedigreeNodeDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.progeny_IDs), progeny_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                progeny_IDs: updated_ids
            });
        }
    }
    /**
     * remove_siblings_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   pedigreeNodeDbId   IdAttribute of the root model to be updated
     * @param {Array}   siblings_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_siblings_IDs(pedigreeNodeDbId, siblings_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            siblings_IDs.forEach(idx => {
                promises.push(models.sibling.remove_pedigreeNode_IDs(idx, [`${pedigreeNodeDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(pedigreeNodeDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.siblings_IDs), siblings_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                siblings_IDs: updated_ids
            });
        }
    }








    /**
     * idAttribute - Check whether an attribute "internalId" is given in the JSON model. If not the standard "id" is used instead.
     *
     * @return {type} Name of the attribute that functions as an internalId
     */
    static idAttribute() {
        return pedigreenode.definition.id.name;
    }

    /**
     * idAttributeType - Return the Type of the internalId.
     *
     * @return {type} Type given in the JSON model
     */
    static idAttributeType() {
        return pedigreenode.definition.id.type;
    }

    /**
     * getIdValue - Get the value of the idAttribute ("id", or "internalId") for an instance of pedigreenode.
     *
     * @return {type} id value
     */
    getIdValue() {
        return this[pedigreenode.idAttribute()];
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
     * base64Encode - Encode  pedigreenode to a base 64 String
     *
     * @return {string} The pedigreenode object, encoded in a base 64 String
     */
    base64Encode() {
        return Buffer.from(JSON.stringify(this.stripAssociations())).toString(
            "base64"
        );
    }

    /**
     * asCursor - alias method for base64Encode
     *
     * @return {string} The pedigreenode object, encoded in a base 64 String
     */
    asCursor() {
        return this.base64Encode()
    }

    /**
     * stripAssociations - Instance method for getting all attributes of pedigreenode.
     *
     * @return {object} The attributes of pedigreenode in object form
     */
    stripAssociations() {
        let attributes = Object.keys(pedigreenode.definition.attributes);
        let data_values = _.pick(this, attributes);
        return data_values;
    }

    /**
     * externalIdsArray - Get all attributes of pedigreenode that are marked as external IDs.
     *
     * @return {Array<String>} An array of all attributes of pedigreenode that are marked as external IDs
     */
    static externalIdsArray() {
        let externalIds = [];
        if (definition.externalIds) {
            externalIds = definition.externalIds;
        }

        return externalIds;
    }

    /**
     * externalIdsObject - Get all external IDs of pedigreenode.
     *
     * @return {object} An object that has the names of the external IDs as keys and their types as values
     */
    static externalIdsObject() {
        return {};
    }

}