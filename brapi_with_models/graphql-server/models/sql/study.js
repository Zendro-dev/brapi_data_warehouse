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
    "model": "study",
    "storageType": "sql",
    "attributes": {
        "active": "Boolean",
        "additionalInfo_IDs": "[ String ]",
        "commonCropName": "String",
        "contacts_IDs": "[ String ]",
        "culturalPractices": "String",
        "dataLinks_IDs": "[ String ]",
        "documentationURL": "String",
        "endDate": "String",
        "environmentParameters_IDs": "[ String ]",
        "experimentalDesign_ID": "String",
        "externalReferences_IDs": "[ String ]",
        "growthFacility_ID": "String",
        "lastUpdate_ID": "String",
        "license": "String",
        "location_ID": "String",
        "observationLevels_IDs": "[ String ]",
        "observationUnitsDescription": "String",
        "observationVariables_IDs": "[ String ]",
        "seasons": "[ String ]",
        "startDate": "String",
        "studyCode": "String",
        "studyDbId": "[ String ]",
        "studyDescription": "String",
        "studyName": "String",
        "studyPUI": "String",
        "studyType": "String",
        "trial_ID": "String",
        "callSets_IDs": "[ String ]",
        "plates_IDs": "[ String ]",
        "samples_IDs": "[ String ]",
        "variantSets_IDs": "[ String ]",
        "events_IDs": "[ String ]",
        "observations_IDs": "[ String ]",
        "observationUnits_IDs": "[ String ]"
    },
    "associations": {
        "additionalInfo": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "study",
            "target": "additionalinfo",
            "targetKey": "study_ID",
            "sourceKey": "additionalInfo_IDs",
            "keysIn": "study",
            "targetStorageType": "sql"
        },
        "contacts": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "study",
            "target": "contact",
            "targetKey": "study_ID",
            "sourceKey": "contacts_IDs",
            "keysIn": "study",
            "targetStorageType": "sql"
        },
        "dataLinks": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "study",
            "target": "datalink",
            "targetKey": "study_ID",
            "sourceKey": "dataLinks_IDs",
            "keysIn": "study",
            "targetStorageType": "sql"
        },
        "environmentParameters": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "study",
            "target": "environmentparameter",
            "targetKey": "study_ID",
            "sourceKey": "environmentParameters_IDs",
            "keysIn": "study",
            "targetStorageType": "sql"
        },
        "experimentalDesign": {
            "type": "one_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "study",
            "target": "experimentaldesign",
            "targetKey": "study_ID",
            "sourceKey": "experimentalDesign_ID",
            "keysIn": "study",
            "targetStorageType": "sql"
        },
        "externalReferences": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "study",
            "target": "externalreference",
            "targetKey": "study_ID",
            "sourceKey": "externalReferences_IDs",
            "keysIn": "study",
            "targetStorageType": "sql"
        },
        "growthFacility": {
            "type": "one_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "study",
            "target": "growthfacility",
            "targetKey": "study_ID",
            "sourceKey": "growthFacility_ID",
            "keysIn": "study",
            "targetStorageType": "sql"
        },
        "lastUpdate": {
            "type": "one_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "study",
            "target": "lastupdate",
            "targetKey": "study_ID",
            "sourceKey": "lastUpdate_ID",
            "keysIn": "study",
            "targetStorageType": "sql"
        },
        "location": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "studies",
            "target": "location",
            "targetKey": "studies_IDs",
            "sourceKey": "location_ID",
            "keysIn": "study",
            "targetStorageType": "sql"
        },
        "observationLevels": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "study",
            "target": "observationlevel",
            "targetKey": "study_ID",
            "sourceKey": "observationLevels_IDs",
            "keysIn": "study",
            "targetStorageType": "sql"
        },
        "observationVariables": {
            "type": "many_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "studies",
            "target": "observationvariable",
            "targetKey": "studies_IDs",
            "sourceKey": "observationVariables_IDs",
            "keysIn": "study",
            "targetStorageType": "sql"
        },
        "trial": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "studies",
            "target": "trial",
            "targetKey": "studies_IDs",
            "sourceKey": "trial_ID",
            "keysIn": "study",
            "targetStorageType": "sql"
        },
        "callSets": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "study",
            "target": "callset",
            "targetKey": "study_ID",
            "sourceKey": "callSets_IDs",
            "keysIn": "study",
            "targetStorageType": "sql"
        },
        "plates": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "study",
            "target": "plate",
            "targetKey": "study_ID",
            "sourceKey": "plates_IDs",
            "keysIn": "study",
            "targetStorageType": "sql"
        },
        "samples": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "study",
            "target": "sample",
            "targetKey": "study_ID",
            "sourceKey": "samples_IDs",
            "keysIn": "study",
            "targetStorageType": "sql"
        },
        "variantSets": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "study",
            "target": "variantset",
            "targetKey": "study_ID",
            "sourceKey": "variantSets_IDs",
            "keysIn": "study",
            "targetStorageType": "sql"
        },
        "events": {
            "type": "many_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "study",
            "target": "event",
            "targetKey": "study_IDs",
            "sourceKey": "events_IDs",
            "keysIn": "study",
            "targetStorageType": "sql"
        },
        "observations": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "study",
            "target": "observation",
            "targetKey": "study_ID",
            "sourceKey": "observations_IDs",
            "keysIn": "study",
            "targetStorageType": "sql"
        },
        "observationUnits": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "study",
            "target": "observationunit",
            "targetKey": "study_ID",
            "sourceKey": "observationUnits_IDs",
            "keysIn": "study",
            "targetStorageType": "sql"
        }
    },
    "internalId": "studyDbId",
    "id": {
        "name": "studyDbId",
        "type": "[String]"
    }
};
const DataLoader = require("dataloader");

/**
 * module - Creates a sequelize model
 */

module.exports = class study extends Sequelize.Model {
    /**
     * Initialize sequelize model.
     * @param  {object} sequelize Sequelize instance.
     * @param  {object} DataTypes Allowed sequelize data types.
     * @return {object}           Sequelize model with associations defined
     */
    static init(sequelize, DataTypes) {
        return super.init({

            studyDbId: {
                type: Sequelize[dict['[String]']],
                primaryKey: true
            },
            active: {
                type: Sequelize[dict['Boolean']]
            },
            additionalInfo_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            commonCropName: {
                type: Sequelize[dict['String']]
            },
            contacts_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            culturalPractices: {
                type: Sequelize[dict['String']]
            },
            dataLinks_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            documentationURL: {
                type: Sequelize[dict['String']]
            },
            endDate: {
                type: Sequelize[dict['String']]
            },
            environmentParameters_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            experimentalDesign_ID: {
                type: Sequelize[dict['String']]
            },
            externalReferences_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            growthFacility_ID: {
                type: Sequelize[dict['String']]
            },
            lastUpdate_ID: {
                type: Sequelize[dict['String']]
            },
            license: {
                type: Sequelize[dict['String']]
            },
            location_ID: {
                type: Sequelize[dict['String']]
            },
            observationLevels_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            observationUnitsDescription: {
                type: Sequelize[dict['String']]
            },
            observationVariables_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            seasons: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            startDate: {
                type: Sequelize[dict['String']]
            },
            studyCode: {
                type: Sequelize[dict['String']]
            },
            studyDescription: {
                type: Sequelize[dict['String']]
            },
            studyName: {
                type: Sequelize[dict['String']]
            },
            studyPUI: {
                type: Sequelize[dict['String']]
            },
            studyType: {
                type: Sequelize[dict['String']]
            },
            trial_ID: {
                type: Sequelize[dict['String']]
            },
            callSets_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            plates_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            samples_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            variantSets_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            events_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            observations_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            observationUnits_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            }


        }, {
            modelName: "study",
            tableName: "studies",
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
            field: study.idAttribute(),
            value: keys.join(),
            valueType: "Array",
        };
        let cursorRes = await study.readAllCursor(queryArg);
        cursorRes = cursorRes.studies.reduce(
            (map, obj) => ((map[obj[study.idAttribute()]] = obj), map), {}
        );
        return keys.map(
            (key) =>
            cursorRes[key] || new Error(`Record with ID = "${key}" does not exist`)
        );
    }

    static readByIdLoader = new DataLoader(study.batchReadById, {
        cache: false,
    });

    /**
     * readById - The model implementation for reading a single record given by its ID
     *
     * Read a single record by a given ID
     * @param {string} id - The ID of the requested record
     * @return {object} The requested record as an object with the type study, or an error object if the validation after reading fails
     * @throws {Error} If the requested record does not exist
     */
    static async readById(id) {
        return await study.readByIdLoader.load(id);
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
        options['where'] = helper.searchConditionsToSequelize(search, study.definition.attributes);
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
        let options = helper.buildLimitOffsetSequelizeOptions(search, order, pagination, this.idAttribute(), study.definition.attributes);
        let records = await super.findAll(options);
        records = records.map(x => study.postReadCast(x))
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
        let options = helper.buildCursorBasedSequelizeOptions(search, order, pagination, this.idAttribute(), study.definition.attributes);
        let records = await super.findAll(options);

        records = records.map(x => study.postReadCast(x))

        // validationCheck after read
        records = await validatorUtil.bulkValidateData('validateAfterRead', this, records, benignErrorReporter);
        // get the first record (if exists) in the opposite direction to determine pageInfo.
        // if no cursor was given there is no need for an extra query as the results will start at the first (or last) page.
        let oppRecords = [];
        if (pagination && (pagination.after || pagination.before)) {
            let oppOptions = helper.buildOppositeSearchSequelize(search, order, {
                ...pagination,
                includeCursor: false
            }, this.idAttribute(), study.definition.attributes);
            oppRecords = await super.findAll(oppOptions);
        }
        // build the graphql Connection Object
        let edges = helper.buildEdgeObject(records);
        let pageInfo = helper.buildPageInfo(edges, oppRecords, pagination);
        return {
            edges,
            pageInfo,
            studies: edges.map((edge) => edge.node)
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
        input = study.preWriteCast(input)
        try {
            const result = await this.sequelize.transaction(async (t) => {
                let item = await super.create(input, {
                    transaction: t
                });
                return item;
            });
            study.postReadCast(result.dataValues)
            study.postReadCast(result._previousDataValues)
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
        input = study.preWriteCast(input)
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
            study.postReadCast(result.dataValues)
            study.postReadCast(result._previousDataValues)
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
     * add_experimentalDesign_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Id}   experimentalDesign_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_experimentalDesign_ID(studyDbId, experimentalDesign_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.experimentaldesign.add_study_ID(experimentalDesign_ID, studyDbId, benignErrorReporter, token, false);
            }
            let updated = await study.update({
                experimentalDesign_ID: experimentalDesign_ID
            }, {
                where: {
                    studyDbId: studyDbId
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
     * add_growthFacility_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Id}   growthFacility_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_growthFacility_ID(studyDbId, growthFacility_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.growthfacility.add_study_ID(growthFacility_ID, studyDbId, benignErrorReporter, token, false);
            }
            let updated = await study.update({
                growthFacility_ID: growthFacility_ID
            }, {
                where: {
                    studyDbId: studyDbId
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
     * add_lastUpdate_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Id}   lastUpdate_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_lastUpdate_ID(studyDbId, lastUpdate_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.lastupdate.add_study_ID(lastUpdate_ID, studyDbId, benignErrorReporter, token, false);
            }
            let updated = await study.update({
                lastUpdate_ID: lastUpdate_ID
            }, {
                where: {
                    studyDbId: studyDbId
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
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Id}   location_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_location_ID(studyDbId, location_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.location.add_studies_IDs(location_ID, [`${studyDbId}`], benignErrorReporter, token, false);
            }
            let updated = await study.update({
                location_ID: location_ID
            }, {
                where: {
                    studyDbId: studyDbId
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
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Id}   trial_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_trial_ID(studyDbId, trial_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.trial.add_studies_IDs(trial_ID, [`${studyDbId}`], benignErrorReporter, token, false);
            }
            let updated = await study.update({
                trial_ID: trial_ID
            }, {
                where: {
                    studyDbId: studyDbId
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
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   additionalInfo_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_additionalInfo_IDs(studyDbId, additionalInfo_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            additionalInfo_IDs.forEach(idx => {
                promises.push(models.additionalinfo.add_study_ID(idx, studyDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.additionalInfo_IDs), additionalInfo_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                additionalInfo_IDs: updated_ids
            });
        }
    }
    /**
     * add_contacts_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   contacts_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_contacts_IDs(studyDbId, contacts_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            contacts_IDs.forEach(idx => {
                promises.push(models.contact.add_study_ID(idx, studyDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.contacts_IDs), contacts_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                contacts_IDs: updated_ids
            });
        }
    }
    /**
     * add_dataLinks_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   dataLinks_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_dataLinks_IDs(studyDbId, dataLinks_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            dataLinks_IDs.forEach(idx => {
                promises.push(models.datalink.add_study_ID(idx, studyDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.dataLinks_IDs), dataLinks_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                dataLinks_IDs: updated_ids
            });
        }
    }
    /**
     * add_environmentParameters_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   environmentParameters_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_environmentParameters_IDs(studyDbId, environmentParameters_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            environmentParameters_IDs.forEach(idx => {
                promises.push(models.environmentparameter.add_study_ID(idx, studyDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.environmentParameters_IDs), environmentParameters_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                environmentParameters_IDs: updated_ids
            });
        }
    }
    /**
     * add_externalReferences_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   externalReferences_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_externalReferences_IDs(studyDbId, externalReferences_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            externalReferences_IDs.forEach(idx => {
                promises.push(models.externalreference.add_study_ID(idx, studyDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.externalReferences_IDs), externalReferences_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                externalReferences_IDs: updated_ids
            });
        }
    }
    /**
     * add_observationLevels_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   observationLevels_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_observationLevels_IDs(studyDbId, observationLevels_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            observationLevels_IDs.forEach(idx => {
                promises.push(models.observationlevel.add_study_ID(idx, studyDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.observationLevels_IDs), observationLevels_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                observationLevels_IDs: updated_ids
            });
        }
    }
    /**
     * add_observationVariables_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   observationVariables_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_observationVariables_IDs(studyDbId, observationVariables_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            observationVariables_IDs.forEach(idx => {
                promises.push(models.observationvariable.add_studies_IDs(idx, [`${studyDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.observationVariables_IDs), observationVariables_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                observationVariables_IDs: updated_ids
            });
        }
    }
    /**
     * add_callSets_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   callSets_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_callSets_IDs(studyDbId, callSets_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            callSets_IDs.forEach(idx => {
                promises.push(models.callset.add_study_ID(idx, studyDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.callSets_IDs), callSets_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                callSets_IDs: updated_ids
            });
        }
    }
    /**
     * add_plates_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   plates_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_plates_IDs(studyDbId, plates_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            plates_IDs.forEach(idx => {
                promises.push(models.plate.add_study_ID(idx, studyDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.plates_IDs), plates_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                plates_IDs: updated_ids
            });
        }
    }
    /**
     * add_samples_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   samples_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_samples_IDs(studyDbId, samples_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            samples_IDs.forEach(idx => {
                promises.push(models.sample.add_study_ID(idx, studyDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.samples_IDs), samples_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                samples_IDs: updated_ids
            });
        }
    }
    /**
     * add_variantSets_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   variantSets_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_variantSets_IDs(studyDbId, variantSets_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            variantSets_IDs.forEach(idx => {
                promises.push(models.variantset.add_study_ID(idx, studyDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.variantSets_IDs), variantSets_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                variantSets_IDs: updated_ids
            });
        }
    }
    /**
     * add_events_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   events_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_events_IDs(studyDbId, events_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            events_IDs.forEach(idx => {
                promises.push(models.event.add_study_IDs(idx, [`${studyDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.events_IDs), events_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                events_IDs: updated_ids
            });
        }
    }
    /**
     * add_observations_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   observations_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_observations_IDs(studyDbId, observations_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            observations_IDs.forEach(idx => {
                promises.push(models.observation.add_study_ID(idx, studyDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.observations_IDs), observations_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                observations_IDs: updated_ids
            });
        }
    }
    /**
     * add_observationUnits_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   observationUnits_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_observationUnits_IDs(studyDbId, observationUnits_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            observationUnits_IDs.forEach(idx => {
                promises.push(models.observationunit.add_study_ID(idx, studyDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.observationUnits_IDs), observationUnits_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                observationUnits_IDs: updated_ids
            });
        }
    }

    /**
     * remove_experimentalDesign_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Id}   experimentalDesign_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_experimentalDesign_ID(studyDbId, experimentalDesign_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.experimentaldesign.remove_study_ID(experimentalDesign_ID, studyDbId, benignErrorReporter, token, false);
            }
            let updated = await study.update({
                experimentalDesign_ID: null
            }, {
                where: {
                    studyDbId: studyDbId,
                    experimentalDesign_ID: experimentalDesign_ID
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
     * remove_growthFacility_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Id}   growthFacility_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_growthFacility_ID(studyDbId, growthFacility_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.growthfacility.remove_study_ID(growthFacility_ID, studyDbId, benignErrorReporter, token, false);
            }
            let updated = await study.update({
                growthFacility_ID: null
            }, {
                where: {
                    studyDbId: studyDbId,
                    growthFacility_ID: growthFacility_ID
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
     * remove_lastUpdate_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Id}   lastUpdate_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_lastUpdate_ID(studyDbId, lastUpdate_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.lastupdate.remove_study_ID(lastUpdate_ID, studyDbId, benignErrorReporter, token, false);
            }
            let updated = await study.update({
                lastUpdate_ID: null
            }, {
                where: {
                    studyDbId: studyDbId,
                    lastUpdate_ID: lastUpdate_ID
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
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Id}   location_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_location_ID(studyDbId, location_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.location.remove_studies_IDs(location_ID, [`${studyDbId}`], benignErrorReporter, token, false);
            }
            let updated = await study.update({
                location_ID: null
            }, {
                where: {
                    studyDbId: studyDbId,
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
     * remove_trial_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Id}   trial_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_trial_ID(studyDbId, trial_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.trial.remove_studies_IDs(trial_ID, [`${studyDbId}`], benignErrorReporter, token, false);
            }
            let updated = await study.update({
                trial_ID: null
            }, {
                where: {
                    studyDbId: studyDbId,
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
     * remove_additionalInfo_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   additionalInfo_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_additionalInfo_IDs(studyDbId, additionalInfo_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            additionalInfo_IDs.forEach(idx => {
                promises.push(models.additionalinfo.remove_study_ID(idx, studyDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.additionalInfo_IDs), additionalInfo_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                additionalInfo_IDs: updated_ids
            });
        }
    }
    /**
     * remove_contacts_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   contacts_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_contacts_IDs(studyDbId, contacts_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            contacts_IDs.forEach(idx => {
                promises.push(models.contact.remove_study_ID(idx, studyDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.contacts_IDs), contacts_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                contacts_IDs: updated_ids
            });
        }
    }
    /**
     * remove_dataLinks_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   dataLinks_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_dataLinks_IDs(studyDbId, dataLinks_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            dataLinks_IDs.forEach(idx => {
                promises.push(models.datalink.remove_study_ID(idx, studyDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.dataLinks_IDs), dataLinks_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                dataLinks_IDs: updated_ids
            });
        }
    }
    /**
     * remove_environmentParameters_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   environmentParameters_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_environmentParameters_IDs(studyDbId, environmentParameters_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            environmentParameters_IDs.forEach(idx => {
                promises.push(models.environmentparameter.remove_study_ID(idx, studyDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.environmentParameters_IDs), environmentParameters_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                environmentParameters_IDs: updated_ids
            });
        }
    }
    /**
     * remove_externalReferences_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   externalReferences_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_externalReferences_IDs(studyDbId, externalReferences_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            externalReferences_IDs.forEach(idx => {
                promises.push(models.externalreference.remove_study_ID(idx, studyDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.externalReferences_IDs), externalReferences_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                externalReferences_IDs: updated_ids
            });
        }
    }
    /**
     * remove_observationLevels_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   observationLevels_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_observationLevels_IDs(studyDbId, observationLevels_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            observationLevels_IDs.forEach(idx => {
                promises.push(models.observationlevel.remove_study_ID(idx, studyDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.observationLevels_IDs), observationLevels_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                observationLevels_IDs: updated_ids
            });
        }
    }
    /**
     * remove_observationVariables_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   observationVariables_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_observationVariables_IDs(studyDbId, observationVariables_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            observationVariables_IDs.forEach(idx => {
                promises.push(models.observationvariable.remove_studies_IDs(idx, [`${studyDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.observationVariables_IDs), observationVariables_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                observationVariables_IDs: updated_ids
            });
        }
    }
    /**
     * remove_callSets_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   callSets_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_callSets_IDs(studyDbId, callSets_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            callSets_IDs.forEach(idx => {
                promises.push(models.callset.remove_study_ID(idx, studyDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.callSets_IDs), callSets_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                callSets_IDs: updated_ids
            });
        }
    }
    /**
     * remove_plates_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   plates_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_plates_IDs(studyDbId, plates_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            plates_IDs.forEach(idx => {
                promises.push(models.plate.remove_study_ID(idx, studyDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.plates_IDs), plates_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                plates_IDs: updated_ids
            });
        }
    }
    /**
     * remove_samples_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   samples_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_samples_IDs(studyDbId, samples_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            samples_IDs.forEach(idx => {
                promises.push(models.sample.remove_study_ID(idx, studyDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.samples_IDs), samples_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                samples_IDs: updated_ids
            });
        }
    }
    /**
     * remove_variantSets_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   variantSets_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_variantSets_IDs(studyDbId, variantSets_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            variantSets_IDs.forEach(idx => {
                promises.push(models.variantset.remove_study_ID(idx, studyDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.variantSets_IDs), variantSets_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                variantSets_IDs: updated_ids
            });
        }
    }
    /**
     * remove_events_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   events_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_events_IDs(studyDbId, events_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            events_IDs.forEach(idx => {
                promises.push(models.event.remove_study_IDs(idx, [`${studyDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.events_IDs), events_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                events_IDs: updated_ids
            });
        }
    }
    /**
     * remove_observations_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   observations_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_observations_IDs(studyDbId, observations_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            observations_IDs.forEach(idx => {
                promises.push(models.observation.remove_study_ID(idx, studyDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.observations_IDs), observations_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                observations_IDs: updated_ids
            });
        }
    }
    /**
     * remove_observationUnits_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   studyDbId   IdAttribute of the root model to be updated
     * @param {Array}   observationUnits_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_observationUnits_IDs(studyDbId, observationUnits_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            observationUnits_IDs.forEach(idx => {
                promises.push(models.observationunit.remove_study_ID(idx, studyDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(studyDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.observationUnits_IDs), observationUnits_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                observationUnits_IDs: updated_ids
            });
        }
    }








    /**
     * idAttribute - Check whether an attribute "internalId" is given in the JSON model. If not the standard "id" is used instead.
     *
     * @return {type} Name of the attribute that functions as an internalId
     */
    static idAttribute() {
        return study.definition.id.name;
    }

    /**
     * idAttributeType - Return the Type of the internalId.
     *
     * @return {type} Type given in the JSON model
     */
    static idAttributeType() {
        return study.definition.id.type;
    }

    /**
     * getIdValue - Get the value of the idAttribute ("id", or "internalId") for an instance of study.
     *
     * @return {type} id value
     */
    getIdValue() {
        return this[study.idAttribute()];
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
     * base64Encode - Encode  study to a base 64 String
     *
     * @return {string} The study object, encoded in a base 64 String
     */
    base64Encode() {
        return Buffer.from(JSON.stringify(this.stripAssociations())).toString(
            "base64"
        );
    }

    /**
     * asCursor - alias method for base64Encode
     *
     * @return {string} The study object, encoded in a base 64 String
     */
    asCursor() {
        return this.base64Encode()
    }

    /**
     * stripAssociations - Instance method for getting all attributes of study.
     *
     * @return {object} The attributes of study in object form
     */
    stripAssociations() {
        let attributes = Object.keys(study.definition.attributes);
        let data_values = _.pick(this, attributes);
        return data_values;
    }

    /**
     * externalIdsArray - Get all attributes of study that are marked as external IDs.
     *
     * @return {Array<String>} An array of all attributes of study that are marked as external IDs
     */
    static externalIdsArray() {
        let externalIds = [];
        if (definition.externalIds) {
            externalIds = definition.externalIds;
        }

        return externalIds;
    }

    /**
     * externalIdsObject - Get all external IDs of study.
     *
     * @return {object} An object that has the names of the external IDs as keys and their types as values
     */
    static externalIdsObject() {
        return {};
    }

}