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
    "model": "crossingproject",
    "storageType": "sql",
    "attributes": {
        "crossingProjectDbId": "[ String ]",
        "commonCropName": "String",
        "crossingProjectDescription": "String",
        "crossingProjectName": "String",
        "program_ID": "String",
        "crosses_IDs": "[ String ]",
        "plannedCrosses_IDs": "[ String ]",
        "pedigreeNodes_IDs": "[ String ]",
        "additionalInfo_IDs": "[ String ]",
        "externalReferences_IDs": "[ String ]",
        "potentialParents_IDs": "[ String ]"
    },
    "associations": {
        "program": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "crossingProjects",
            "target": "program",
            "targetKey": "crossingProjects_IDs",
            "sourceKey": "program_ID",
            "keysIn": "crossingproject",
            "targetStorageType": "sql"
        },
        "crosses": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "crossingProject",
            "target": "cross",
            "targetKey": "crossingProject_ID",
            "sourceKey": "crosses_IDs",
            "keysIn": "crossingproject",
            "targetStorageType": "sql"
        },
        "plannedCrosses": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "crossingProject",
            "target": "plannedcross",
            "targetKey": "crossingProject_ID",
            "sourceKey": "plannedCrosses_IDs",
            "keysIn": "crossingproject",
            "targetStorageType": "sql"
        },
        "pedigreeNodes": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "crossingProject",
            "target": "pedigreenode",
            "targetKey": "crossingProject_ID",
            "sourceKey": "pedigreeNodes_IDs",
            "keysIn": "crossingproject",
            "targetStorageType": "sql"
        },
        "additionalInfo": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "crossingProject",
            "target": "additionalinfo",
            "targetKey": "crossingProject_ID",
            "sourceKey": "additionalInfo_IDs",
            "keysIn": "crossingproject",
            "targetStorageType": "sql"
        },
        "externalReferences": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "crossingProject",
            "target": "externalreference",
            "targetKey": "crossingProject_ID",
            "sourceKey": "externalReferences_IDs",
            "keysIn": "crossingproject",
            "targetStorageType": "sql"
        },
        "potentialParents": {
            "type": "many_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "crossingProjects",
            "target": "parent",
            "targetKey": "crossingProjects_IDs",
            "sourceKey": "potentialParents_IDs",
            "keysIn": "crossingproject",
            "targetStorageType": "sql"
        }
    },
    "internalId": "crossingProjectDbId",
    "id": {
        "name": "crossingProjectDbId",
        "type": "[String]"
    }
};
const DataLoader = require("dataloader");

/**
 * module - Creates a sequelize model
 */

module.exports = class crossingproject extends Sequelize.Model {
    /**
     * Initialize sequelize model.
     * @param  {object} sequelize Sequelize instance.
     * @param  {object} DataTypes Allowed sequelize data types.
     * @return {object}           Sequelize model with associations defined
     */
    static init(sequelize, DataTypes) {
        return super.init({

            crossingProjectDbId: {
                type: Sequelize[dict['[String]']],
                primaryKey: true
            },
            commonCropName: {
                type: Sequelize[dict['String']]
            },
            crossingProjectDescription: {
                type: Sequelize[dict['String']]
            },
            crossingProjectName: {
                type: Sequelize[dict['String']]
            },
            program_ID: {
                type: Sequelize[dict['String']]
            },
            crosses_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            plannedCrosses_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            pedigreeNodes_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            additionalInfo_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            externalReferences_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            potentialParents_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            }


        }, {
            modelName: "crossingproject",
            tableName: "crossingprojects",
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
            field: crossingproject.idAttribute(),
            value: keys.join(),
            valueType: "Array",
        };
        let cursorRes = await crossingproject.readAllCursor(queryArg);
        cursorRes = cursorRes.crossingprojects.reduce(
            (map, obj) => ((map[obj[crossingproject.idAttribute()]] = obj), map), {}
        );
        return keys.map(
            (key) =>
            cursorRes[key] || new Error(`Record with ID = "${key}" does not exist`)
        );
    }

    static readByIdLoader = new DataLoader(crossingproject.batchReadById, {
        cache: false,
    });

    /**
     * readById - The model implementation for reading a single record given by its ID
     *
     * Read a single record by a given ID
     * @param {string} id - The ID of the requested record
     * @return {object} The requested record as an object with the type crossingproject, or an error object if the validation after reading fails
     * @throws {Error} If the requested record does not exist
     */
    static async readById(id) {
        return await crossingproject.readByIdLoader.load(id);
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
        options['where'] = helper.searchConditionsToSequelize(search, crossingproject.definition.attributes);
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
        let options = helper.buildLimitOffsetSequelizeOptions(search, order, pagination, this.idAttribute(), crossingproject.definition.attributes);
        let records = await super.findAll(options);
        records = records.map(x => crossingproject.postReadCast(x))
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
        let options = helper.buildCursorBasedSequelizeOptions(search, order, pagination, this.idAttribute(), crossingproject.definition.attributes);
        let records = await super.findAll(options);

        records = records.map(x => crossingproject.postReadCast(x))

        // validationCheck after read
        records = await validatorUtil.bulkValidateData('validateAfterRead', this, records, benignErrorReporter);
        // get the first record (if exists) in the opposite direction to determine pageInfo.
        // if no cursor was given there is no need for an extra query as the results will start at the first (or last) page.
        let oppRecords = [];
        if (pagination && (pagination.after || pagination.before)) {
            let oppOptions = helper.buildOppositeSearchSequelize(search, order, {
                ...pagination,
                includeCursor: false
            }, this.idAttribute(), crossingproject.definition.attributes);
            oppRecords = await super.findAll(oppOptions);
        }
        // build the graphql Connection Object
        let edges = helper.buildEdgeObject(records);
        let pageInfo = helper.buildPageInfo(edges, oppRecords, pagination);
        return {
            edges,
            pageInfo,
            crossingprojects: edges.map((edge) => edge.node)
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
        input = crossingproject.preWriteCast(input)
        try {
            const result = await this.sequelize.transaction(async (t) => {
                let item = await super.create(input, {
                    transaction: t
                });
                return item;
            });
            crossingproject.postReadCast(result.dataValues)
            crossingproject.postReadCast(result._previousDataValues)
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
        input = crossingproject.preWriteCast(input)
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
            crossingproject.postReadCast(result.dataValues)
            crossingproject.postReadCast(result._previousDataValues)
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
     * add_program_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   crossingProjectDbId   IdAttribute of the root model to be updated
     * @param {Id}   program_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_program_ID(crossingProjectDbId, program_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.program.add_crossingProjects_IDs(program_ID, [`${crossingProjectDbId}`], benignErrorReporter, token, false);
            }
            let updated = await crossingproject.update({
                program_ID: program_ID
            }, {
                where: {
                    crossingProjectDbId: crossingProjectDbId
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
     * add_crosses_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   crossingProjectDbId   IdAttribute of the root model to be updated
     * @param {Array}   crosses_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_crosses_IDs(crossingProjectDbId, crosses_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            crosses_IDs.forEach(idx => {
                promises.push(models.cross.add_crossingProject_ID(idx, crossingProjectDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(crossingProjectDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.crosses_IDs), crosses_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                crosses_IDs: updated_ids
            });
        }
    }
    /**
     * add_plannedCrosses_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   crossingProjectDbId   IdAttribute of the root model to be updated
     * @param {Array}   plannedCrosses_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_plannedCrosses_IDs(crossingProjectDbId, plannedCrosses_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            plannedCrosses_IDs.forEach(idx => {
                promises.push(models.plannedcross.add_crossingProject_ID(idx, crossingProjectDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(crossingProjectDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.plannedCrosses_IDs), plannedCrosses_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                plannedCrosses_IDs: updated_ids
            });
        }
    }
    /**
     * add_pedigreeNodes_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   crossingProjectDbId   IdAttribute of the root model to be updated
     * @param {Array}   pedigreeNodes_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_pedigreeNodes_IDs(crossingProjectDbId, pedigreeNodes_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            pedigreeNodes_IDs.forEach(idx => {
                promises.push(models.pedigreenode.add_crossingProject_ID(idx, crossingProjectDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(crossingProjectDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.pedigreeNodes_IDs), pedigreeNodes_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                pedigreeNodes_IDs: updated_ids
            });
        }
    }
    /**
     * add_additionalInfo_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   crossingProjectDbId   IdAttribute of the root model to be updated
     * @param {Array}   additionalInfo_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_additionalInfo_IDs(crossingProjectDbId, additionalInfo_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            additionalInfo_IDs.forEach(idx => {
                promises.push(models.additionalinfo.add_crossingProject_ID(idx, crossingProjectDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(crossingProjectDbId);
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
     * @param {Id}   crossingProjectDbId   IdAttribute of the root model to be updated
     * @param {Array}   externalReferences_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_externalReferences_IDs(crossingProjectDbId, externalReferences_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            externalReferences_IDs.forEach(idx => {
                promises.push(models.externalreference.add_crossingProject_ID(idx, crossingProjectDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(crossingProjectDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.externalReferences_IDs), externalReferences_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                externalReferences_IDs: updated_ids
            });
        }
    }
    /**
     * add_potentialParents_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   crossingProjectDbId   IdAttribute of the root model to be updated
     * @param {Array}   potentialParents_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_potentialParents_IDs(crossingProjectDbId, potentialParents_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            potentialParents_IDs.forEach(idx => {
                promises.push(models.parent.add_crossingProjects_IDs(idx, [`${crossingProjectDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(crossingProjectDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.potentialParents_IDs), potentialParents_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                potentialParents_IDs: updated_ids
            });
        }
    }

    /**
     * remove_program_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   crossingProjectDbId   IdAttribute of the root model to be updated
     * @param {Id}   program_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_program_ID(crossingProjectDbId, program_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.program.remove_crossingProjects_IDs(program_ID, [`${crossingProjectDbId}`], benignErrorReporter, token, false);
            }
            let updated = await crossingproject.update({
                program_ID: null
            }, {
                where: {
                    crossingProjectDbId: crossingProjectDbId,
                    program_ID: program_ID
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
     * remove_crosses_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   crossingProjectDbId   IdAttribute of the root model to be updated
     * @param {Array}   crosses_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_crosses_IDs(crossingProjectDbId, crosses_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            crosses_IDs.forEach(idx => {
                promises.push(models.cross.remove_crossingProject_ID(idx, crossingProjectDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(crossingProjectDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.crosses_IDs), crosses_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                crosses_IDs: updated_ids
            });
        }
    }
    /**
     * remove_plannedCrosses_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   crossingProjectDbId   IdAttribute of the root model to be updated
     * @param {Array}   plannedCrosses_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_plannedCrosses_IDs(crossingProjectDbId, plannedCrosses_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            plannedCrosses_IDs.forEach(idx => {
                promises.push(models.plannedcross.remove_crossingProject_ID(idx, crossingProjectDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(crossingProjectDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.plannedCrosses_IDs), plannedCrosses_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                plannedCrosses_IDs: updated_ids
            });
        }
    }
    /**
     * remove_pedigreeNodes_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   crossingProjectDbId   IdAttribute of the root model to be updated
     * @param {Array}   pedigreeNodes_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_pedigreeNodes_IDs(crossingProjectDbId, pedigreeNodes_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            pedigreeNodes_IDs.forEach(idx => {
                promises.push(models.pedigreenode.remove_crossingProject_ID(idx, crossingProjectDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(crossingProjectDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.pedigreeNodes_IDs), pedigreeNodes_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                pedigreeNodes_IDs: updated_ids
            });
        }
    }
    /**
     * remove_additionalInfo_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   crossingProjectDbId   IdAttribute of the root model to be updated
     * @param {Array}   additionalInfo_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_additionalInfo_IDs(crossingProjectDbId, additionalInfo_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            additionalInfo_IDs.forEach(idx => {
                promises.push(models.additionalinfo.remove_crossingProject_ID(idx, crossingProjectDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(crossingProjectDbId);
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
     * @param {Id}   crossingProjectDbId   IdAttribute of the root model to be updated
     * @param {Array}   externalReferences_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_externalReferences_IDs(crossingProjectDbId, externalReferences_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            externalReferences_IDs.forEach(idx => {
                promises.push(models.externalreference.remove_crossingProject_ID(idx, crossingProjectDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(crossingProjectDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.externalReferences_IDs), externalReferences_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                externalReferences_IDs: updated_ids
            });
        }
    }
    /**
     * remove_potentialParents_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   crossingProjectDbId   IdAttribute of the root model to be updated
     * @param {Array}   potentialParents_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_potentialParents_IDs(crossingProjectDbId, potentialParents_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            potentialParents_IDs.forEach(idx => {
                promises.push(models.parent.remove_crossingProjects_IDs(idx, [`${crossingProjectDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(crossingProjectDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.potentialParents_IDs), potentialParents_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                potentialParents_IDs: updated_ids
            });
        }
    }








    /**
     * idAttribute - Check whether an attribute "internalId" is given in the JSON model. If not the standard "id" is used instead.
     *
     * @return {type} Name of the attribute that functions as an internalId
     */
    static idAttribute() {
        return crossingproject.definition.id.name;
    }

    /**
     * idAttributeType - Return the Type of the internalId.
     *
     * @return {type} Type given in the JSON model
     */
    static idAttributeType() {
        return crossingproject.definition.id.type;
    }

    /**
     * getIdValue - Get the value of the idAttribute ("id", or "internalId") for an instance of crossingproject.
     *
     * @return {type} id value
     */
    getIdValue() {
        return this[crossingproject.idAttribute()];
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
     * base64Encode - Encode  crossingproject to a base 64 String
     *
     * @return {string} The crossingproject object, encoded in a base 64 String
     */
    base64Encode() {
        return Buffer.from(JSON.stringify(this.stripAssociations())).toString(
            "base64"
        );
    }

    /**
     * asCursor - alias method for base64Encode
     *
     * @return {string} The crossingproject object, encoded in a base 64 String
     */
    asCursor() {
        return this.base64Encode()
    }

    /**
     * stripAssociations - Instance method for getting all attributes of crossingproject.
     *
     * @return {object} The attributes of crossingproject in object form
     */
    stripAssociations() {
        let attributes = Object.keys(crossingproject.definition.attributes);
        let data_values = _.pick(this, attributes);
        return data_values;
    }

    /**
     * externalIdsArray - Get all attributes of crossingproject that are marked as external IDs.
     *
     * @return {Array<String>} An array of all attributes of crossingproject that are marked as external IDs
     */
    static externalIdsArray() {
        let externalIds = [];
        if (definition.externalIds) {
            externalIds = definition.externalIds;
        }

        return externalIds;
    }

    /**
     * externalIdsObject - Get all external IDs of crossingproject.
     *
     * @return {object} An object that has the names of the external IDs as keys and their types as values
     */
    static externalIdsObject() {
        return {};
    }

}