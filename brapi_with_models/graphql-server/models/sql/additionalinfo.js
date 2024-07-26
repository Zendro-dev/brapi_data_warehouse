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
    "model": "additionalinfo",
    "storageType": "sql",
    "attributes": {
        "additionalInfoDbId": "[ String ]",
        "additionalProperties": "String",
        "call_ID": "String",
        "callSet_ID": "String",
        "cross_ID": "String",
        "crossingProject_ID": "String",
        "event_ID": "String",
        "genomeMap_ID": "String",
        "germplasm_ID": "String",
        "germplasmAttribute_ID": "String",
        "germplasmAttributeValue_ID": "String",
        "image_ID": "String",
        "list_ID": "String",
        "location_ID": "String",
        "markerPosition_ID": "String",
        "method_ID": "String",
        "observation_ID": "String",
        "observationUnit_ID": "String",
        "observationVariable_ID": "String",
        "ontology_ID": "String",
        "person_ID": "String",
        "pedigreeNode_ID": "String",
        "plannedCross_ID": "String",
        "plate_ID": "String",
        "program_ID": "String",
        "reference_ID": "String",
        "referenceSet_ID": "String",
        "sample_ID": "String",
        "scale_ID": "String",
        "seedLot_ID": "String",
        "seedLotTransaction_ID": "String",
        "study_ID": "String",
        "trait_ID": "String",
        "trial_ID": "String",
        "variant_ID": "String",
        "variantSet_ID": "String"
    },
    "associations": {
        "call": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "call",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "call_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "callSet": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "callset",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "callSet_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "cross": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "cross",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "cross_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "crossingProject": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "crossingproject",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "crossingProject_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "event": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "event",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "event_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "genomeMap": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "genomemap",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "genomeMap_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "germplasm": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "germplasm",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "germplasm_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "germplasmAttribute": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "germplasmattribute",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "germplasmAttribute_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "germplasmAttributeValue": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "germplasmattributevalue",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "germplasmAttributeValue_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "image": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "image",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "image_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "list": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "list",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "list_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "location": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "location",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "location_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "markerPosition": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "markerposition",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "markerPosition_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "method": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "method",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "method_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "observation": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "observation",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "observation_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "observationUnit": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "observationunit",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "observationUnit_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "observationVariable": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "observationvariable",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "observationVariable_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "ontology": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "ontology",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "ontology_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "person": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "person",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "person_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "pedigreeNode": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "pedigreenode",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "pedigreeNode_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "plannedCross": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "plannedcross",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "plannedCross_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "plate": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "plate",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "plate_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "program": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "program",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "program_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "reference": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "reference",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "reference_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "referenceSet": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "referenceset",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "referenceSet_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "sample": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "sample",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "sample_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "scale": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "scale",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "scale_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "seedLot": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "seedlot",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "seedLot_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "seedLotTransaction": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "seedlottransaction",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "seedLotTransaction_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "study": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "study",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "study_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "trait": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "trait",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "trait_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "trial": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "trial",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "trial_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "variant": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "variant",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "variant_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        },
        "variantSet": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "additionalInfo",
            "target": "variantset",
            "targetKey": "additionalInfo_IDs",
            "sourceKey": "variantSet_ID",
            "keysIn": "additionalinfo",
            "targetStorageType": "sql"
        }
    },
    "internalId": "additionalInfoDbId",
    "id": {
        "name": "additionalInfoDbId",
        "type": "[String]"
    }
};
const DataLoader = require("dataloader");

/**
 * module - Creates a sequelize model
 */

module.exports = class additionalinfo extends Sequelize.Model {
    /**
     * Initialize sequelize model.
     * @param  {object} sequelize Sequelize instance.
     * @param  {object} DataTypes Allowed sequelize data types.
     * @return {object}           Sequelize model with associations defined
     */
    static init(sequelize, DataTypes) {
        return super.init({

            additionalInfoDbId: {
                type: Sequelize[dict['[String]']],
                primaryKey: true
            },
            additionalProperties: {
                type: Sequelize[dict['String']]
            },
            call_ID: {
                type: Sequelize[dict['String']]
            },
            callSet_ID: {
                type: Sequelize[dict['String']]
            },
            cross_ID: {
                type: Sequelize[dict['String']]
            },
            crossingProject_ID: {
                type: Sequelize[dict['String']]
            },
            event_ID: {
                type: Sequelize[dict['String']]
            },
            genomeMap_ID: {
                type: Sequelize[dict['String']]
            },
            germplasm_ID: {
                type: Sequelize[dict['String']]
            },
            germplasmAttribute_ID: {
                type: Sequelize[dict['String']]
            },
            germplasmAttributeValue_ID: {
                type: Sequelize[dict['String']]
            },
            image_ID: {
                type: Sequelize[dict['String']]
            },
            list_ID: {
                type: Sequelize[dict['String']]
            },
            location_ID: {
                type: Sequelize[dict['String']]
            },
            markerPosition_ID: {
                type: Sequelize[dict['String']]
            },
            method_ID: {
                type: Sequelize[dict['String']]
            },
            observation_ID: {
                type: Sequelize[dict['String']]
            },
            observationUnit_ID: {
                type: Sequelize[dict['String']]
            },
            observationVariable_ID: {
                type: Sequelize[dict['String']]
            },
            ontology_ID: {
                type: Sequelize[dict['String']]
            },
            person_ID: {
                type: Sequelize[dict['String']]
            },
            pedigreeNode_ID: {
                type: Sequelize[dict['String']]
            },
            plannedCross_ID: {
                type: Sequelize[dict['String']]
            },
            plate_ID: {
                type: Sequelize[dict['String']]
            },
            program_ID: {
                type: Sequelize[dict['String']]
            },
            reference_ID: {
                type: Sequelize[dict['String']]
            },
            referenceSet_ID: {
                type: Sequelize[dict['String']]
            },
            sample_ID: {
                type: Sequelize[dict['String']]
            },
            scale_ID: {
                type: Sequelize[dict['String']]
            },
            seedLot_ID: {
                type: Sequelize[dict['String']]
            },
            seedLotTransaction_ID: {
                type: Sequelize[dict['String']]
            },
            study_ID: {
                type: Sequelize[dict['String']]
            },
            trait_ID: {
                type: Sequelize[dict['String']]
            },
            trial_ID: {
                type: Sequelize[dict['String']]
            },
            variant_ID: {
                type: Sequelize[dict['String']]
            },
            variantSet_ID: {
                type: Sequelize[dict['String']]
            }


        }, {
            modelName: "additionalinfo",
            tableName: "additionalinfos",
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
            field: additionalinfo.idAttribute(),
            value: keys.join(),
            valueType: "Array",
        };
        let cursorRes = await additionalinfo.readAllCursor(queryArg);
        cursorRes = cursorRes.additionalinfos.reduce(
            (map, obj) => ((map[obj[additionalinfo.idAttribute()]] = obj), map), {}
        );
        return keys.map(
            (key) =>
            cursorRes[key] || new Error(`Record with ID = "${key}" does not exist`)
        );
    }

    static readByIdLoader = new DataLoader(additionalinfo.batchReadById, {
        cache: false,
    });

    /**
     * readById - The model implementation for reading a single record given by its ID
     *
     * Read a single record by a given ID
     * @param {string} id - The ID of the requested record
     * @return {object} The requested record as an object with the type additionalinfo, or an error object if the validation after reading fails
     * @throws {Error} If the requested record does not exist
     */
    static async readById(id) {
        return await additionalinfo.readByIdLoader.load(id);
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
        options['where'] = helper.searchConditionsToSequelize(search, additionalinfo.definition.attributes);
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
        let options = helper.buildLimitOffsetSequelizeOptions(search, order, pagination, this.idAttribute(), additionalinfo.definition.attributes);
        let records = await super.findAll(options);
        records = records.map(x => additionalinfo.postReadCast(x))
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
        let options = helper.buildCursorBasedSequelizeOptions(search, order, pagination, this.idAttribute(), additionalinfo.definition.attributes);
        let records = await super.findAll(options);

        records = records.map(x => additionalinfo.postReadCast(x))

        // validationCheck after read
        records = await validatorUtil.bulkValidateData('validateAfterRead', this, records, benignErrorReporter);
        // get the first record (if exists) in the opposite direction to determine pageInfo.
        // if no cursor was given there is no need for an extra query as the results will start at the first (or last) page.
        let oppRecords = [];
        if (pagination && (pagination.after || pagination.before)) {
            let oppOptions = helper.buildOppositeSearchSequelize(search, order, {
                ...pagination,
                includeCursor: false
            }, this.idAttribute(), additionalinfo.definition.attributes);
            oppRecords = await super.findAll(oppOptions);
        }
        // build the graphql Connection Object
        let edges = helper.buildEdgeObject(records);
        let pageInfo = helper.buildPageInfo(edges, oppRecords, pagination);
        return {
            edges,
            pageInfo,
            additionalinfos: edges.map((edge) => edge.node)
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
        input = additionalinfo.preWriteCast(input)
        try {
            const result = await this.sequelize.transaction(async (t) => {
                let item = await super.create(input, {
                    transaction: t
                });
                return item;
            });
            additionalinfo.postReadCast(result.dataValues)
            additionalinfo.postReadCast(result._previousDataValues)
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
        input = additionalinfo.preWriteCast(input)
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
            additionalinfo.postReadCast(result.dataValues)
            additionalinfo.postReadCast(result._previousDataValues)
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
     * add_call_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   call_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_call_ID(additionalInfoDbId, call_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.call.add_additionalInfo_IDs(call_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                call_ID: call_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * add_callSet_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   callSet_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_callSet_ID(additionalInfoDbId, callSet_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.callset.add_additionalInfo_IDs(callSet_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                callSet_ID: callSet_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * add_cross_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   cross_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_cross_ID(additionalInfoDbId, cross_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.cross.add_additionalInfo_IDs(cross_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                cross_ID: cross_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   crossingProject_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_crossingProject_ID(additionalInfoDbId, crossingProject_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.crossingproject.add_additionalInfo_IDs(crossingProject_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                crossingProject_ID: crossingProject_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * add_event_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   event_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_event_ID(additionalInfoDbId, event_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.event.add_additionalInfo_IDs(event_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                event_ID: event_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * add_genomeMap_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   genomeMap_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_genomeMap_ID(additionalInfoDbId, genomeMap_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.genomemap.add_additionalInfo_IDs(genomeMap_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                genomeMap_ID: genomeMap_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   germplasm_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_germplasm_ID(additionalInfoDbId, germplasm_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.germplasm.add_additionalInfo_IDs(germplasm_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                germplasm_ID: germplasm_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   germplasmAttribute_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_germplasmAttribute_ID(additionalInfoDbId, germplasmAttribute_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.germplasmattribute.add_additionalInfo_IDs(germplasmAttribute_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                germplasmAttribute_ID: germplasmAttribute_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * add_germplasmAttributeValue_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   germplasmAttributeValue_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_germplasmAttributeValue_ID(additionalInfoDbId, germplasmAttributeValue_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.germplasmattributevalue.add_additionalInfo_IDs(germplasmAttributeValue_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                germplasmAttributeValue_ID: germplasmAttributeValue_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * add_image_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   image_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_image_ID(additionalInfoDbId, image_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.image.add_additionalInfo_IDs(image_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                image_ID: image_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * add_list_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   list_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_list_ID(additionalInfoDbId, list_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.list.add_additionalInfo_IDs(list_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                list_ID: list_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   location_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_location_ID(additionalInfoDbId, location_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.location.add_additionalInfo_IDs(location_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                location_ID: location_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * add_markerPosition_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   markerPosition_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_markerPosition_ID(additionalInfoDbId, markerPosition_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.markerposition.add_additionalInfo_IDs(markerPosition_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                markerPosition_ID: markerPosition_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * add_method_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   method_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_method_ID(additionalInfoDbId, method_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.method.add_additionalInfo_IDs(method_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                method_ID: method_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * add_observation_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   observation_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_observation_ID(additionalInfoDbId, observation_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.observation.add_additionalInfo_IDs(observation_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                observation_ID: observation_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * add_observationUnit_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   observationUnit_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_observationUnit_ID(additionalInfoDbId, observationUnit_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.observationunit.add_additionalInfo_IDs(observationUnit_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                observationUnit_ID: observationUnit_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * add_observationVariable_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   observationVariable_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_observationVariable_ID(additionalInfoDbId, observationVariable_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.observationvariable.add_additionalInfo_IDs(observationVariable_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                observationVariable_ID: observationVariable_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * add_ontology_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   ontology_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_ontology_ID(additionalInfoDbId, ontology_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.ontology.add_additionalInfo_IDs(ontology_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                ontology_ID: ontology_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * add_person_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   person_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_person_ID(additionalInfoDbId, person_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.person.add_additionalInfo_IDs(person_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                person_ID: person_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * add_pedigreeNode_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   pedigreeNode_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_pedigreeNode_ID(additionalInfoDbId, pedigreeNode_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.pedigreenode.add_additionalInfo_IDs(pedigreeNode_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                pedigreeNode_ID: pedigreeNode_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * add_plannedCross_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   plannedCross_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_plannedCross_ID(additionalInfoDbId, plannedCross_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.plannedcross.add_additionalInfo_IDs(plannedCross_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                plannedCross_ID: plannedCross_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * add_plate_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   plate_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_plate_ID(additionalInfoDbId, plate_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.plate.add_additionalInfo_IDs(plate_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                plate_ID: plate_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   program_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_program_ID(additionalInfoDbId, program_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.program.add_additionalInfo_IDs(program_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                program_ID: program_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * add_reference_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   reference_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_reference_ID(additionalInfoDbId, reference_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.reference.add_additionalInfo_IDs(reference_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                reference_ID: reference_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * add_referenceSet_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   referenceSet_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_referenceSet_ID(additionalInfoDbId, referenceSet_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.referenceset.add_additionalInfo_IDs(referenceSet_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                referenceSet_ID: referenceSet_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * add_sample_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   sample_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_sample_ID(additionalInfoDbId, sample_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.sample.add_additionalInfo_IDs(sample_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                sample_ID: sample_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * add_scale_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   scale_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_scale_ID(additionalInfoDbId, scale_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.scale.add_additionalInfo_IDs(scale_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                scale_ID: scale_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   seedLot_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_seedLot_ID(additionalInfoDbId, seedLot_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.seedlot.add_additionalInfo_IDs(seedLot_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                seedLot_ID: seedLot_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * add_seedLotTransaction_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   seedLotTransaction_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_seedLotTransaction_ID(additionalInfoDbId, seedLotTransaction_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.seedlottransaction.add_additionalInfo_IDs(seedLotTransaction_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                seedLotTransaction_ID: seedLotTransaction_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   study_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_study_ID(additionalInfoDbId, study_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.study.add_additionalInfo_IDs(study_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                study_ID: study_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * add_trait_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   trait_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_trait_ID(additionalInfoDbId, trait_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.trait.add_additionalInfo_IDs(trait_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                trait_ID: trait_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   trial_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_trial_ID(additionalInfoDbId, trial_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.trial.add_additionalInfo_IDs(trial_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                trial_ID: trial_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * add_variant_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   variant_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_variant_ID(additionalInfoDbId, variant_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.variant.add_additionalInfo_IDs(variant_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                variant_ID: variant_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * add_variantSet_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   variantSet_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_variantSet_ID(additionalInfoDbId, variantSet_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.variantset.add_additionalInfo_IDs(variantSet_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                variantSet_ID: variantSet_ID
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId
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
     * remove_call_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   call_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_call_ID(additionalInfoDbId, call_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.call.remove_additionalInfo_IDs(call_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                call_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
                    call_ID: call_ID
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
     * remove_callSet_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   callSet_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_callSet_ID(additionalInfoDbId, callSet_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.callset.remove_additionalInfo_IDs(callSet_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                callSet_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
                    callSet_ID: callSet_ID
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
     * remove_cross_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   cross_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_cross_ID(additionalInfoDbId, cross_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.cross.remove_additionalInfo_IDs(cross_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                cross_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
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
     * remove_crossingProject_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   crossingProject_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_crossingProject_ID(additionalInfoDbId, crossingProject_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.crossingproject.remove_additionalInfo_IDs(crossingProject_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                crossingProject_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
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
     * remove_event_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   event_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_event_ID(additionalInfoDbId, event_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.event.remove_additionalInfo_IDs(event_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                event_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
                    event_ID: event_ID
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
     * remove_genomeMap_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   genomeMap_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_genomeMap_ID(additionalInfoDbId, genomeMap_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.genomemap.remove_additionalInfo_IDs(genomeMap_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                genomeMap_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
                    genomeMap_ID: genomeMap_ID
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
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   germplasm_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_germplasm_ID(additionalInfoDbId, germplasm_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.germplasm.remove_additionalInfo_IDs(germplasm_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                germplasm_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
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
     * remove_germplasmAttribute_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   germplasmAttribute_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_germplasmAttribute_ID(additionalInfoDbId, germplasmAttribute_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.germplasmattribute.remove_additionalInfo_IDs(germplasmAttribute_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                germplasmAttribute_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
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
     * remove_germplasmAttributeValue_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   germplasmAttributeValue_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_germplasmAttributeValue_ID(additionalInfoDbId, germplasmAttributeValue_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.germplasmattributevalue.remove_additionalInfo_IDs(germplasmAttributeValue_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                germplasmAttributeValue_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
                    germplasmAttributeValue_ID: germplasmAttributeValue_ID
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
     * remove_image_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   image_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_image_ID(additionalInfoDbId, image_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.image.remove_additionalInfo_IDs(image_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                image_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
                    image_ID: image_ID
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
     * remove_list_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   list_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_list_ID(additionalInfoDbId, list_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.list.remove_additionalInfo_IDs(list_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                list_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
                    list_ID: list_ID
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
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   location_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_location_ID(additionalInfoDbId, location_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.location.remove_additionalInfo_IDs(location_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                location_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
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
     * remove_markerPosition_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   markerPosition_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_markerPosition_ID(additionalInfoDbId, markerPosition_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.markerposition.remove_additionalInfo_IDs(markerPosition_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                markerPosition_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
                    markerPosition_ID: markerPosition_ID
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
     * remove_method_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   method_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_method_ID(additionalInfoDbId, method_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.method.remove_additionalInfo_IDs(method_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                method_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
                    method_ID: method_ID
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
     * remove_observation_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   observation_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_observation_ID(additionalInfoDbId, observation_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.observation.remove_additionalInfo_IDs(observation_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                observation_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
                    observation_ID: observation_ID
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
     * remove_observationUnit_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   observationUnit_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_observationUnit_ID(additionalInfoDbId, observationUnit_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.observationunit.remove_additionalInfo_IDs(observationUnit_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                observationUnit_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
                    observationUnit_ID: observationUnit_ID
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
     * remove_observationVariable_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   observationVariable_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_observationVariable_ID(additionalInfoDbId, observationVariable_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.observationvariable.remove_additionalInfo_IDs(observationVariable_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                observationVariable_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
                    observationVariable_ID: observationVariable_ID
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
     * remove_ontology_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   ontology_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_ontology_ID(additionalInfoDbId, ontology_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.ontology.remove_additionalInfo_IDs(ontology_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                ontology_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
                    ontology_ID: ontology_ID
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
     * remove_person_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   person_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_person_ID(additionalInfoDbId, person_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.person.remove_additionalInfo_IDs(person_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                person_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
                    person_ID: person_ID
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
     * remove_pedigreeNode_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   pedigreeNode_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_pedigreeNode_ID(additionalInfoDbId, pedigreeNode_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.pedigreenode.remove_additionalInfo_IDs(pedigreeNode_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                pedigreeNode_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
                    pedigreeNode_ID: pedigreeNode_ID
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
     * remove_plannedCross_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   plannedCross_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_plannedCross_ID(additionalInfoDbId, plannedCross_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.plannedcross.remove_additionalInfo_IDs(plannedCross_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                plannedCross_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
                    plannedCross_ID: plannedCross_ID
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
     * remove_plate_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   plate_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_plate_ID(additionalInfoDbId, plate_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.plate.remove_additionalInfo_IDs(plate_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                plate_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
                    plate_ID: plate_ID
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
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   program_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_program_ID(additionalInfoDbId, program_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.program.remove_additionalInfo_IDs(program_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                program_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
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
     * remove_reference_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   reference_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_reference_ID(additionalInfoDbId, reference_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.reference.remove_additionalInfo_IDs(reference_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                reference_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
                    reference_ID: reference_ID
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
     * remove_referenceSet_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   referenceSet_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_referenceSet_ID(additionalInfoDbId, referenceSet_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.referenceset.remove_additionalInfo_IDs(referenceSet_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                referenceSet_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
                    referenceSet_ID: referenceSet_ID
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
     * remove_sample_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   sample_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_sample_ID(additionalInfoDbId, sample_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.sample.remove_additionalInfo_IDs(sample_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                sample_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
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
     * remove_scale_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   scale_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_scale_ID(additionalInfoDbId, scale_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.scale.remove_additionalInfo_IDs(scale_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                scale_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
                    scale_ID: scale_ID
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
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   seedLot_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_seedLot_ID(additionalInfoDbId, seedLot_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.seedlot.remove_additionalInfo_IDs(seedLot_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                seedLot_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
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
     * remove_seedLotTransaction_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   seedLotTransaction_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_seedLotTransaction_ID(additionalInfoDbId, seedLotTransaction_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.seedlottransaction.remove_additionalInfo_IDs(seedLotTransaction_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                seedLotTransaction_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
                    seedLotTransaction_ID: seedLotTransaction_ID
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
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   study_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_study_ID(additionalInfoDbId, study_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.study.remove_additionalInfo_IDs(study_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                study_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
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
     * remove_trait_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   trait_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_trait_ID(additionalInfoDbId, trait_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.trait.remove_additionalInfo_IDs(trait_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                trait_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
                    trait_ID: trait_ID
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
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   trial_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_trial_ID(additionalInfoDbId, trial_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.trial.remove_additionalInfo_IDs(trial_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                trial_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
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
     * remove_variant_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   variant_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_variant_ID(additionalInfoDbId, variant_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.variant.remove_additionalInfo_IDs(variant_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                variant_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
                    variant_ID: variant_ID
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
     * remove_variantSet_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   additionalInfoDbId   IdAttribute of the root model to be updated
     * @param {Id}   variantSet_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_variantSet_ID(additionalInfoDbId, variantSet_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.variantset.remove_additionalInfo_IDs(variantSet_ID, [`${additionalInfoDbId}`], benignErrorReporter, token, false);
            }
            let updated = await additionalinfo.update({
                variantSet_ID: null
            }, {
                where: {
                    additionalInfoDbId: additionalInfoDbId,
                    variantSet_ID: variantSet_ID
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
     * idAttribute - Check whether an attribute "internalId" is given in the JSON model. If not the standard "id" is used instead.
     *
     * @return {type} Name of the attribute that functions as an internalId
     */
    static idAttribute() {
        return additionalinfo.definition.id.name;
    }

    /**
     * idAttributeType - Return the Type of the internalId.
     *
     * @return {type} Type given in the JSON model
     */
    static idAttributeType() {
        return additionalinfo.definition.id.type;
    }

    /**
     * getIdValue - Get the value of the idAttribute ("id", or "internalId") for an instance of additionalinfo.
     *
     * @return {type} id value
     */
    getIdValue() {
        return this[additionalinfo.idAttribute()];
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
     * base64Encode - Encode  additionalinfo to a base 64 String
     *
     * @return {string} The additionalinfo object, encoded in a base 64 String
     */
    base64Encode() {
        return Buffer.from(JSON.stringify(this.stripAssociations())).toString(
            "base64"
        );
    }

    /**
     * asCursor - alias method for base64Encode
     *
     * @return {string} The additionalinfo object, encoded in a base 64 String
     */
    asCursor() {
        return this.base64Encode()
    }

    /**
     * stripAssociations - Instance method for getting all attributes of additionalinfo.
     *
     * @return {object} The attributes of additionalinfo in object form
     */
    stripAssociations() {
        let attributes = Object.keys(additionalinfo.definition.attributes);
        let data_values = _.pick(this, attributes);
        return data_values;
    }

    /**
     * externalIdsArray - Get all attributes of additionalinfo that are marked as external IDs.
     *
     * @return {Array<String>} An array of all attributes of additionalinfo that are marked as external IDs
     */
    static externalIdsArray() {
        let externalIds = [];
        if (definition.externalIds) {
            externalIds = definition.externalIds;
        }

        return externalIds;
    }

    /**
     * externalIdsObject - Get all external IDs of additionalinfo.
     *
     * @return {object} An object that has the names of the external IDs as keys and their types as values
     */
    static externalIdsObject() {
        return {};
    }

}