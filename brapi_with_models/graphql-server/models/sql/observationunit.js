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
    "model": "observationunit",
    "storageType": "sql",
    "attributes": {
        "observationUnitDbId": "[ String ]",
        "cross_ID": "String",
        "germplasm_ID": "String",
        "location_ID": "String",
        "observationUnitName": "String",
        "observationUnitPUI": "String",
        "program_ID": "String",
        "seedLot_ID": "String",
        "study_ID": "String",
        "trial_ID": "String",
        "samples_IDs": "[ String ]",
        "events_IDs": "[ String ]",
        "images_IDs": "[ String ]",
        "observations_IDs": "[ String ]",
        "additionalInfo_IDs": "[ String ]",
        "externalReferences_IDs": "[ String ]",
        "observationUnitPosition_ID": "String",
        "treatments_IDs": "[ String ]"
    },
    "associations": {
        "cross": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "observationUnits",
            "target": "cross",
            "targetKey": "observationUnits_IDs",
            "sourceKey": "cross_ID",
            "keysIn": "observationunit",
            "targetStorageType": "sql"
        },
        "germplasm": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "observationUnits",
            "target": "germplasm",
            "targetKey": "observationUnits_IDs",
            "sourceKey": "germplasm_ID",
            "keysIn": "observationunit",
            "targetStorageType": "sql"
        },
        "location": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "observationUnits",
            "target": "location",
            "targetKey": "observationUnits_IDs",
            "sourceKey": "location_ID",
            "keysIn": "observationunit",
            "targetStorageType": "sql"
        },
        "program": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "observationUnits",
            "target": "program",
            "targetKey": "observationUnits_IDs",
            "sourceKey": "program_ID",
            "keysIn": "observationunit",
            "targetStorageType": "sql"
        },
        "seedLot": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "observationUnits",
            "target": "seedlot",
            "targetKey": "observationUnits_IDs",
            "sourceKey": "seedLot_ID",
            "keysIn": "observationunit",
            "targetStorageType": "sql"
        },
        "study": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "observationUnits",
            "target": "study",
            "targetKey": "observationUnits_IDs",
            "sourceKey": "study_ID",
            "keysIn": "observationunit",
            "targetStorageType": "sql"
        },
        "trial": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "observationUnits",
            "target": "trial",
            "targetKey": "observationUnits_IDs",
            "sourceKey": "trial_ID",
            "keysIn": "observationunit",
            "targetStorageType": "sql"
        },
        "samples": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "observationUnit",
            "target": "sample",
            "targetKey": "observationUnit_ID",
            "sourceKey": "samples_IDs",
            "keysIn": "observationunit",
            "targetStorageType": "sql"
        },
        "events": {
            "type": "many_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "observationUnits",
            "target": "event",
            "targetKey": "observationUnits_IDs",
            "sourceKey": "events_IDs",
            "keysIn": "observationunit",
            "targetStorageType": "sql"
        },
        "images": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "observationUnit",
            "target": "image",
            "targetKey": "observationUnit_ID",
            "sourceKey": "images_IDs",
            "keysIn": "observationunit",
            "targetStorageType": "sql"
        },
        "observations": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "observationUnit",
            "target": "observation",
            "targetKey": "observationUnit_ID",
            "sourceKey": "observations_IDs",
            "keysIn": "observationunit",
            "targetStorageType": "sql"
        },
        "additionalInfo": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "observationUnit",
            "target": "additionalinfo",
            "targetKey": "observationUnit_ID",
            "sourceKey": "additionalInfo_IDs",
            "keysIn": "observationunit",
            "targetStorageType": "sql"
        },
        "externalReferences": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "observationUnit",
            "target": "externalreference",
            "targetKey": "observationUnit_ID",
            "sourceKey": "externalReferences_IDs",
            "keysIn": "observationunit",
            "targetStorageType": "sql"
        },
        "observationUnitPosition": {
            "type": "one_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "observationUnit",
            "target": "observationunitposition",
            "targetKey": "observationUnit_ID",
            "sourceKey": "observationUnitPosition_ID",
            "keysIn": "observationunit",
            "targetStorageType": "sql"
        },
        "treatments": {
            "type": "many_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "observationUnits",
            "target": "treatment",
            "targetKey": "observationUnits_IDs",
            "sourceKey": "treatments_IDs",
            "keysIn": "observationunit",
            "targetStorageType": "sql"
        }
    },
    "internalId": "observationUnitDbId",
    "id": {
        "name": "observationUnitDbId",
        "type": "[String]"
    }
};
const DataLoader = require("dataloader");

/**
 * module - Creates a sequelize model
 */

module.exports = class observationunit extends Sequelize.Model {
    /**
     * Initialize sequelize model.
     * @param  {object} sequelize Sequelize instance.
     * @param  {object} DataTypes Allowed sequelize data types.
     * @return {object}           Sequelize model with associations defined
     */
    static init(sequelize, DataTypes) {
        return super.init({

            observationUnitDbId: {
                type: Sequelize[dict['[String]']],
                primaryKey: true
            },
            cross_ID: {
                type: Sequelize[dict['String']]
            },
            germplasm_ID: {
                type: Sequelize[dict['String']]
            },
            location_ID: {
                type: Sequelize[dict['String']]
            },
            observationUnitName: {
                type: Sequelize[dict['String']]
            },
            observationUnitPUI: {
                type: Sequelize[dict['String']]
            },
            program_ID: {
                type: Sequelize[dict['String']]
            },
            seedLot_ID: {
                type: Sequelize[dict['String']]
            },
            study_ID: {
                type: Sequelize[dict['String']]
            },
            trial_ID: {
                type: Sequelize[dict['String']]
            },
            samples_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            events_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            images_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            observations_IDs: {
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
            observationUnitPosition_ID: {
                type: Sequelize[dict['String']]
            },
            treatments_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            }


        }, {
            modelName: "observationunit",
            tableName: "observationunits",
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
            field: observationunit.idAttribute(),
            value: keys.join(),
            valueType: "Array",
        };
        let cursorRes = await observationunit.readAllCursor(queryArg);
        cursorRes = cursorRes.observationunits.reduce(
            (map, obj) => ((map[obj[observationunit.idAttribute()]] = obj), map), {}
        );
        return keys.map(
            (key) =>
            cursorRes[key] || new Error(`Record with ID = "${key}" does not exist`)
        );
    }

    static readByIdLoader = new DataLoader(observationunit.batchReadById, {
        cache: false,
    });

    /**
     * readById - The model implementation for reading a single record given by its ID
     *
     * Read a single record by a given ID
     * @param {string} id - The ID of the requested record
     * @return {object} The requested record as an object with the type observationunit, or an error object if the validation after reading fails
     * @throws {Error} If the requested record does not exist
     */
    static async readById(id) {
        return await observationunit.readByIdLoader.load(id);
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
        options['where'] = helper.searchConditionsToSequelize(search, observationunit.definition.attributes);
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
        let options = helper.buildLimitOffsetSequelizeOptions(search, order, pagination, this.idAttribute(), observationunit.definition.attributes);
        let records = await super.findAll(options);
        records = records.map(x => observationunit.postReadCast(x))
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
        let options = helper.buildCursorBasedSequelizeOptions(search, order, pagination, this.idAttribute(), observationunit.definition.attributes);
        let records = await super.findAll(options);

        records = records.map(x => observationunit.postReadCast(x))

        // validationCheck after read
        records = await validatorUtil.bulkValidateData('validateAfterRead', this, records, benignErrorReporter);
        // get the first record (if exists) in the opposite direction to determine pageInfo.
        // if no cursor was given there is no need for an extra query as the results will start at the first (or last) page.
        let oppRecords = [];
        if (pagination && (pagination.after || pagination.before)) {
            let oppOptions = helper.buildOppositeSearchSequelize(search, order, {
                ...pagination,
                includeCursor: false
            }, this.idAttribute(), observationunit.definition.attributes);
            oppRecords = await super.findAll(oppOptions);
        }
        // build the graphql Connection Object
        let edges = helper.buildEdgeObject(records);
        let pageInfo = helper.buildPageInfo(edges, oppRecords, pagination);
        return {
            edges,
            pageInfo,
            observationunits: edges.map((edge) => edge.node)
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
        input = observationunit.preWriteCast(input)
        try {
            const result = await this.sequelize.transaction(async (t) => {
                let item = await super.create(input, {
                    transaction: t
                });
                return item;
            });
            observationunit.postReadCast(result.dataValues)
            observationunit.postReadCast(result._previousDataValues)
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
        input = observationunit.preWriteCast(input)
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
            observationunit.postReadCast(result.dataValues)
            observationunit.postReadCast(result._previousDataValues)
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
     * add_cross_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Id}   cross_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_cross_ID(observationUnitDbId, cross_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.cross.add_observationUnits_IDs(cross_ID, [`${observationUnitDbId}`], benignErrorReporter, token, false);
            }
            let updated = await observationunit.update({
                cross_ID: cross_ID
            }, {
                where: {
                    observationUnitDbId: observationUnitDbId
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
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Id}   germplasm_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_germplasm_ID(observationUnitDbId, germplasm_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.germplasm.add_observationUnits_IDs(germplasm_ID, [`${observationUnitDbId}`], benignErrorReporter, token, false);
            }
            let updated = await observationunit.update({
                germplasm_ID: germplasm_ID
            }, {
                where: {
                    observationUnitDbId: observationUnitDbId
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
     * add_location_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Id}   location_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_location_ID(observationUnitDbId, location_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.location.add_observationUnits_IDs(location_ID, [`${observationUnitDbId}`], benignErrorReporter, token, false);
            }
            let updated = await observationunit.update({
                location_ID: location_ID
            }, {
                where: {
                    observationUnitDbId: observationUnitDbId
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
     * add_program_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Id}   program_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_program_ID(observationUnitDbId, program_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.program.add_observationUnits_IDs(program_ID, [`${observationUnitDbId}`], benignErrorReporter, token, false);
            }
            let updated = await observationunit.update({
                program_ID: program_ID
            }, {
                where: {
                    observationUnitDbId: observationUnitDbId
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
     * add_seedLot_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Id}   seedLot_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_seedLot_ID(observationUnitDbId, seedLot_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.seedlot.add_observationUnits_IDs(seedLot_ID, [`${observationUnitDbId}`], benignErrorReporter, token, false);
            }
            let updated = await observationunit.update({
                seedLot_ID: seedLot_ID
            }, {
                where: {
                    observationUnitDbId: observationUnitDbId
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
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Id}   study_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_study_ID(observationUnitDbId, study_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.study.add_observationUnits_IDs(study_ID, [`${observationUnitDbId}`], benignErrorReporter, token, false);
            }
            let updated = await observationunit.update({
                study_ID: study_ID
            }, {
                where: {
                    observationUnitDbId: observationUnitDbId
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
     * add_trial_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Id}   trial_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_trial_ID(observationUnitDbId, trial_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.trial.add_observationUnits_IDs(trial_ID, [`${observationUnitDbId}`], benignErrorReporter, token, false);
            }
            let updated = await observationunit.update({
                trial_ID: trial_ID
            }, {
                where: {
                    observationUnitDbId: observationUnitDbId
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
     * add_observationUnitPosition_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Id}   observationUnitPosition_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_observationUnitPosition_ID(observationUnitDbId, observationUnitPosition_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.observationunitposition.add_observationUnit_ID(observationUnitPosition_ID, observationUnitDbId, benignErrorReporter, token, false);
            }
            let updated = await observationunit.update({
                observationUnitPosition_ID: observationUnitPosition_ID
            }, {
                where: {
                    observationUnitDbId: observationUnitDbId
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
     * add_samples_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Array}   samples_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_samples_IDs(observationUnitDbId, samples_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            samples_IDs.forEach(idx => {
                promises.push(models.sample.add_observationUnit_ID(idx, observationUnitDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(observationUnitDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.samples_IDs), samples_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                samples_IDs: updated_ids
            });
        }
    }
    /**
     * add_events_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Array}   events_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_events_IDs(observationUnitDbId, events_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            events_IDs.forEach(idx => {
                promises.push(models.event.add_observationUnits_IDs(idx, [`${observationUnitDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(observationUnitDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.events_IDs), events_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                events_IDs: updated_ids
            });
        }
    }
    /**
     * add_images_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Array}   images_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_images_IDs(observationUnitDbId, images_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            images_IDs.forEach(idx => {
                promises.push(models.image.add_observationUnit_ID(idx, observationUnitDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(observationUnitDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.images_IDs), images_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                images_IDs: updated_ids
            });
        }
    }
    /**
     * add_observations_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Array}   observations_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_observations_IDs(observationUnitDbId, observations_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            observations_IDs.forEach(idx => {
                promises.push(models.observation.add_observationUnit_ID(idx, observationUnitDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(observationUnitDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.observations_IDs), observations_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                observations_IDs: updated_ids
            });
        }
    }
    /**
     * add_additionalInfo_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Array}   additionalInfo_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_additionalInfo_IDs(observationUnitDbId, additionalInfo_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            additionalInfo_IDs.forEach(idx => {
                promises.push(models.additionalinfo.add_observationUnit_ID(idx, observationUnitDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(observationUnitDbId);
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
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Array}   externalReferences_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_externalReferences_IDs(observationUnitDbId, externalReferences_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            externalReferences_IDs.forEach(idx => {
                promises.push(models.externalreference.add_observationUnit_ID(idx, observationUnitDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(observationUnitDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.externalReferences_IDs), externalReferences_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                externalReferences_IDs: updated_ids
            });
        }
    }
    /**
     * add_treatments_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Array}   treatments_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_treatments_IDs(observationUnitDbId, treatments_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            treatments_IDs.forEach(idx => {
                promises.push(models.treatment.add_observationUnits_IDs(idx, [`${observationUnitDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(observationUnitDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.treatments_IDs), treatments_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                treatments_IDs: updated_ids
            });
        }
    }

    /**
     * remove_cross_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Id}   cross_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_cross_ID(observationUnitDbId, cross_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.cross.remove_observationUnits_IDs(cross_ID, [`${observationUnitDbId}`], benignErrorReporter, token, false);
            }
            let updated = await observationunit.update({
                cross_ID: null
            }, {
                where: {
                    observationUnitDbId: observationUnitDbId,
                    cross_ID: cross_ID
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
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Id}   germplasm_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_germplasm_ID(observationUnitDbId, germplasm_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.germplasm.remove_observationUnits_IDs(germplasm_ID, [`${observationUnitDbId}`], benignErrorReporter, token, false);
            }
            let updated = await observationunit.update({
                germplasm_ID: null
            }, {
                where: {
                    observationUnitDbId: observationUnitDbId,
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
     * remove_location_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Id}   location_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_location_ID(observationUnitDbId, location_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.location.remove_observationUnits_IDs(location_ID, [`${observationUnitDbId}`], benignErrorReporter, token, false);
            }
            let updated = await observationunit.update({
                location_ID: null
            }, {
                where: {
                    observationUnitDbId: observationUnitDbId,
                    location_ID: location_ID
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
     * remove_program_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Id}   program_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_program_ID(observationUnitDbId, program_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.program.remove_observationUnits_IDs(program_ID, [`${observationUnitDbId}`], benignErrorReporter, token, false);
            }
            let updated = await observationunit.update({
                program_ID: null
            }, {
                where: {
                    observationUnitDbId: observationUnitDbId,
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
     * remove_seedLot_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Id}   seedLot_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_seedLot_ID(observationUnitDbId, seedLot_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.seedlot.remove_observationUnits_IDs(seedLot_ID, [`${observationUnitDbId}`], benignErrorReporter, token, false);
            }
            let updated = await observationunit.update({
                seedLot_ID: null
            }, {
                where: {
                    observationUnitDbId: observationUnitDbId,
                    seedLot_ID: seedLot_ID
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
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Id}   study_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_study_ID(observationUnitDbId, study_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.study.remove_observationUnits_IDs(study_ID, [`${observationUnitDbId}`], benignErrorReporter, token, false);
            }
            let updated = await observationunit.update({
                study_ID: null
            }, {
                where: {
                    observationUnitDbId: observationUnitDbId,
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
     * remove_trial_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Id}   trial_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_trial_ID(observationUnitDbId, trial_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.trial.remove_observationUnits_IDs(trial_ID, [`${observationUnitDbId}`], benignErrorReporter, token, false);
            }
            let updated = await observationunit.update({
                trial_ID: null
            }, {
                where: {
                    observationUnitDbId: observationUnitDbId,
                    trial_ID: trial_ID
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
     * remove_observationUnitPosition_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Id}   observationUnitPosition_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_observationUnitPosition_ID(observationUnitDbId, observationUnitPosition_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.observationunitposition.remove_observationUnit_ID(observationUnitPosition_ID, observationUnitDbId, benignErrorReporter, token, false);
            }
            let updated = await observationunit.update({
                observationUnitPosition_ID: null
            }, {
                where: {
                    observationUnitDbId: observationUnitDbId,
                    observationUnitPosition_ID: observationUnitPosition_ID
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
     * remove_samples_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Array}   samples_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_samples_IDs(observationUnitDbId, samples_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            samples_IDs.forEach(idx => {
                promises.push(models.sample.remove_observationUnit_ID(idx, observationUnitDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(observationUnitDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.samples_IDs), samples_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                samples_IDs: updated_ids
            });
        }
    }
    /**
     * remove_events_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Array}   events_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_events_IDs(observationUnitDbId, events_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            events_IDs.forEach(idx => {
                promises.push(models.event.remove_observationUnits_IDs(idx, [`${observationUnitDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(observationUnitDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.events_IDs), events_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                events_IDs: updated_ids
            });
        }
    }
    /**
     * remove_images_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Array}   images_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_images_IDs(observationUnitDbId, images_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            images_IDs.forEach(idx => {
                promises.push(models.image.remove_observationUnit_ID(idx, observationUnitDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(observationUnitDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.images_IDs), images_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                images_IDs: updated_ids
            });
        }
    }
    /**
     * remove_observations_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Array}   observations_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_observations_IDs(observationUnitDbId, observations_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            observations_IDs.forEach(idx => {
                promises.push(models.observation.remove_observationUnit_ID(idx, observationUnitDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(observationUnitDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.observations_IDs), observations_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                observations_IDs: updated_ids
            });
        }
    }
    /**
     * remove_additionalInfo_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Array}   additionalInfo_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_additionalInfo_IDs(observationUnitDbId, additionalInfo_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            additionalInfo_IDs.forEach(idx => {
                promises.push(models.additionalinfo.remove_observationUnit_ID(idx, observationUnitDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(observationUnitDbId);
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
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Array}   externalReferences_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_externalReferences_IDs(observationUnitDbId, externalReferences_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            externalReferences_IDs.forEach(idx => {
                promises.push(models.externalreference.remove_observationUnit_ID(idx, observationUnitDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(observationUnitDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.externalReferences_IDs), externalReferences_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                externalReferences_IDs: updated_ids
            });
        }
    }
    /**
     * remove_treatments_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   observationUnitDbId   IdAttribute of the root model to be updated
     * @param {Array}   treatments_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_treatments_IDs(observationUnitDbId, treatments_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            treatments_IDs.forEach(idx => {
                promises.push(models.treatment.remove_observationUnits_IDs(idx, [`${observationUnitDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(observationUnitDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.treatments_IDs), treatments_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                treatments_IDs: updated_ids
            });
        }
    }








    /**
     * idAttribute - Check whether an attribute "internalId" is given in the JSON model. If not the standard "id" is used instead.
     *
     * @return {type} Name of the attribute that functions as an internalId
     */
    static idAttribute() {
        return observationunit.definition.id.name;
    }

    /**
     * idAttributeType - Return the Type of the internalId.
     *
     * @return {type} Type given in the JSON model
     */
    static idAttributeType() {
        return observationunit.definition.id.type;
    }

    /**
     * getIdValue - Get the value of the idAttribute ("id", or "internalId") for an instance of observationunit.
     *
     * @return {type} id value
     */
    getIdValue() {
        return this[observationunit.idAttribute()];
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
     * base64Encode - Encode  observationunit to a base 64 String
     *
     * @return {string} The observationunit object, encoded in a base 64 String
     */
    base64Encode() {
        return Buffer.from(JSON.stringify(this.stripAssociations())).toString(
            "base64"
        );
    }

    /**
     * asCursor - alias method for base64Encode
     *
     * @return {string} The observationunit object, encoded in a base 64 String
     */
    asCursor() {
        return this.base64Encode()
    }

    /**
     * stripAssociations - Instance method for getting all attributes of observationunit.
     *
     * @return {object} The attributes of observationunit in object form
     */
    stripAssociations() {
        let attributes = Object.keys(observationunit.definition.attributes);
        let data_values = _.pick(this, attributes);
        return data_values;
    }

    /**
     * externalIdsArray - Get all attributes of observationunit that are marked as external IDs.
     *
     * @return {Array<String>} An array of all attributes of observationunit that are marked as external IDs
     */
    static externalIdsArray() {
        let externalIds = [];
        if (definition.externalIds) {
            externalIds = definition.externalIds;
        }

        return externalIds;
    }

    /**
     * externalIdsObject - Get all external IDs of observationunit.
     *
     * @return {object} An object that has the names of the external IDs as keys and their types as values
     */
    static externalIdsObject() {
        return {};
    }

}