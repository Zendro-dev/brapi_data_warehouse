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
    "model": "externalreference",
    "storageType": "sql",
    "attributes": {
        "externalReferenceDbId": "[ String ]",
        "externalID": "String",
        "referenceSource": "String",
        "callset_ID": "String",
        "cross_ID": "String",
        "crossingProject_ID": "String",
        "germplasm_ID": "String",
        "germplasmAttribute_ID": "String",
        "germplasmAttributeValue_ID": "String",
        "image_ID": "String",
        "method_ID": "String",
        "list_ID": "String",
        "location_ID": "String",
        "observation_ID": "String",
        "observationUnit_ID": "String",
        "observationVariable_ID": "String",
        "plate_ID": "String",
        "person_ID": "String",
        "pedigreeNode_ID": "String",
        "plannedCross_ID": "String",
        "program_ID": "String",
        "reference_ID": "String",
        "referenceset_ID": "String",
        "sample_ID": "String",
        "scale_ID": "String",
        "seedLot_ID": "String",
        "seedLotTransaction_ID": "String",
        "study_ID": "String",
        "trait_ID": "String",
        "trial_ID": "String",
        "variant_ID": "String",
        "variantset_ID": "String"
    },
    "associations": {
        "callset": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "callset",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "callset_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "cross": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "cross",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "cross_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "crossingProject": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "crossingproject",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "crossingProject_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "germplasm": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "germplasm",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "germplasm_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "germplasmAttribute": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "germplasmattribute",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "germplasmAttribute_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "germplasmAttributeValue": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "germplasmattributevalue",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "germplasmAttributeValue_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "image": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "image",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "image_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "method": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "method",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "method_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "list": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "list",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "list_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "location": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "location",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "location_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "observation": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "observation",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "observation_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "observationUnit": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "observationunit",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "observationUnit_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "observationVariable": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "observationvariable",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "observationVariable_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "plate": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "plate",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "plate_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "person": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "person",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "person_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "pedigreeNode": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "pedigreenode",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "pedigreeNode_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "plannedCross": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "plannedcross",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "plannedCross_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "program": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "program",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "program_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "reference": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "reference",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "reference_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "referenceset": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "referenceset",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "referenceset_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "sample": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "sample",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "sample_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "scale": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "scale",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "scale_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "seedLot": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "seedlot",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "seedLot_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "seedLotTransaction": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "seedlottransaction",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "seedLotTransaction_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "study": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "study",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "study_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "trait": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "trait",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "trait_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "trial": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "trial",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "trial_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "variant": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "variant",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "variant_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        },
        "variantset": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "externalReferences",
            "target": "variantset",
            "targetKey": "externalReferences_IDs",
            "sourceKey": "variantset_ID",
            "keysIn": "externalreference",
            "targetStorageType": "sql"
        }
    },
    "internalId": "externalReferenceDbId",
    "id": {
        "name": "externalReferenceDbId",
        "type": "[String]"
    }
};
const DataLoader = require("dataloader");

/**
 * module - Creates a sequelize model
 */

module.exports = class externalreference extends Sequelize.Model {
    /**
     * Initialize sequelize model.
     * @param  {object} sequelize Sequelize instance.
     * @param  {object} DataTypes Allowed sequelize data types.
     * @return {object}           Sequelize model with associations defined
     */
    static init(sequelize, DataTypes) {
        return super.init({

            externalReferenceDbId: {
                type: Sequelize[dict['[String]']],
                primaryKey: true
            },
            externalID: {
                type: Sequelize[dict['String']]
            },
            referenceSource: {
                type: Sequelize[dict['String']]
            },
            callset_ID: {
                type: Sequelize[dict['String']]
            },
            cross_ID: {
                type: Sequelize[dict['String']]
            },
            crossingProject_ID: {
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
            method_ID: {
                type: Sequelize[dict['String']]
            },
            list_ID: {
                type: Sequelize[dict['String']]
            },
            location_ID: {
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
            plate_ID: {
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
            program_ID: {
                type: Sequelize[dict['String']]
            },
            reference_ID: {
                type: Sequelize[dict['String']]
            },
            referenceset_ID: {
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
            variantset_ID: {
                type: Sequelize[dict['String']]
            }


        }, {
            modelName: "externalreference",
            tableName: "externalreferences",
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
            field: externalreference.idAttribute(),
            value: keys.join(),
            valueType: "Array",
        };
        let cursorRes = await externalreference.readAllCursor(queryArg);
        cursorRes = cursorRes.externalreferences.reduce(
            (map, obj) => ((map[obj[externalreference.idAttribute()]] = obj), map), {}
        );
        return keys.map(
            (key) =>
            cursorRes[key] || new Error(`Record with ID = "${key}" does not exist`)
        );
    }

    static readByIdLoader = new DataLoader(externalreference.batchReadById, {
        cache: false,
    });

    /**
     * readById - The model implementation for reading a single record given by its ID
     *
     * Read a single record by a given ID
     * @param {string} id - The ID of the requested record
     * @return {object} The requested record as an object with the type externalreference, or an error object if the validation after reading fails
     * @throws {Error} If the requested record does not exist
     */
    static async readById(id) {
        return await externalreference.readByIdLoader.load(id);
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
        options['where'] = helper.searchConditionsToSequelize(search, externalreference.definition.attributes);
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
        let options = helper.buildLimitOffsetSequelizeOptions(search, order, pagination, this.idAttribute(), externalreference.definition.attributes);
        let records = await super.findAll(options);
        records = records.map(x => externalreference.postReadCast(x))
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
        let options = helper.buildCursorBasedSequelizeOptions(search, order, pagination, this.idAttribute(), externalreference.definition.attributes);
        let records = await super.findAll(options);

        records = records.map(x => externalreference.postReadCast(x))

        // validationCheck after read
        records = await validatorUtil.bulkValidateData('validateAfterRead', this, records, benignErrorReporter);
        // get the first record (if exists) in the opposite direction to determine pageInfo.
        // if no cursor was given there is no need for an extra query as the results will start at the first (or last) page.
        let oppRecords = [];
        if (pagination && (pagination.after || pagination.before)) {
            let oppOptions = helper.buildOppositeSearchSequelize(search, order, {
                ...pagination,
                includeCursor: false
            }, this.idAttribute(), externalreference.definition.attributes);
            oppRecords = await super.findAll(oppOptions);
        }
        // build the graphql Connection Object
        let edges = helper.buildEdgeObject(records);
        let pageInfo = helper.buildPageInfo(edges, oppRecords, pagination);
        return {
            edges,
            pageInfo,
            externalreferences: edges.map((edge) => edge.node)
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
        input = externalreference.preWriteCast(input)
        try {
            const result = await this.sequelize.transaction(async (t) => {
                let item = await super.create(input, {
                    transaction: t
                });
                return item;
            });
            externalreference.postReadCast(result.dataValues)
            externalreference.postReadCast(result._previousDataValues)
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
        input = externalreference.preWriteCast(input)
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
            externalreference.postReadCast(result.dataValues)
            externalreference.postReadCast(result._previousDataValues)
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
     * add_callset_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   callset_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_callset_ID(externalReferenceDbId, callset_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.callset.add_externalReferences_IDs(callset_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                callset_ID: callset_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   cross_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_cross_ID(externalReferenceDbId, cross_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.cross.add_externalReferences_IDs(cross_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                cross_ID: cross_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   crossingProject_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_crossingProject_ID(externalReferenceDbId, crossingProject_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.crossingproject.add_externalReferences_IDs(crossingProject_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                crossingProject_ID: crossingProject_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   germplasm_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_germplasm_ID(externalReferenceDbId, germplasm_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.germplasm.add_externalReferences_IDs(germplasm_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                germplasm_ID: germplasm_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   germplasmAttribute_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_germplasmAttribute_ID(externalReferenceDbId, germplasmAttribute_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.germplasmattribute.add_externalReferences_IDs(germplasmAttribute_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                germplasmAttribute_ID: germplasmAttribute_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   germplasmAttributeValue_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_germplasmAttributeValue_ID(externalReferenceDbId, germplasmAttributeValue_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.germplasmattributevalue.add_externalReferences_IDs(germplasmAttributeValue_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                germplasmAttributeValue_ID: germplasmAttributeValue_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   image_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_image_ID(externalReferenceDbId, image_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.image.add_externalReferences_IDs(image_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                image_ID: image_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   method_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_method_ID(externalReferenceDbId, method_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.method.add_externalReferences_IDs(method_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                method_ID: method_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   list_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_list_ID(externalReferenceDbId, list_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.list.add_externalReferences_IDs(list_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                list_ID: list_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   location_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_location_ID(externalReferenceDbId, location_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.location.add_externalReferences_IDs(location_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                location_ID: location_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   observation_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_observation_ID(externalReferenceDbId, observation_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.observation.add_externalReferences_IDs(observation_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                observation_ID: observation_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   observationUnit_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_observationUnit_ID(externalReferenceDbId, observationUnit_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.observationunit.add_externalReferences_IDs(observationUnit_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                observationUnit_ID: observationUnit_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   observationVariable_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_observationVariable_ID(externalReferenceDbId, observationVariable_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.observationvariable.add_externalReferences_IDs(observationVariable_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                observationVariable_ID: observationVariable_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   plate_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_plate_ID(externalReferenceDbId, plate_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.plate.add_externalReferences_IDs(plate_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                plate_ID: plate_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   person_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_person_ID(externalReferenceDbId, person_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.person.add_externalReferences_IDs(person_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                person_ID: person_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   pedigreeNode_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_pedigreeNode_ID(externalReferenceDbId, pedigreeNode_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.pedigreenode.add_externalReferences_IDs(pedigreeNode_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                pedigreeNode_ID: pedigreeNode_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   plannedCross_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_plannedCross_ID(externalReferenceDbId, plannedCross_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.plannedcross.add_externalReferences_IDs(plannedCross_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                plannedCross_ID: plannedCross_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   program_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_program_ID(externalReferenceDbId, program_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.program.add_externalReferences_IDs(program_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                program_ID: program_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   reference_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_reference_ID(externalReferenceDbId, reference_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.reference.add_externalReferences_IDs(reference_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                reference_ID: reference_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * add_referenceset_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   referenceset_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_referenceset_ID(externalReferenceDbId, referenceset_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.referenceset.add_externalReferences_IDs(referenceset_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                referenceset_ID: referenceset_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   sample_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_sample_ID(externalReferenceDbId, sample_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.sample.add_externalReferences_IDs(sample_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                sample_ID: sample_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   scale_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_scale_ID(externalReferenceDbId, scale_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.scale.add_externalReferences_IDs(scale_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                scale_ID: scale_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   seedLot_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_seedLot_ID(externalReferenceDbId, seedLot_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.seedlot.add_externalReferences_IDs(seedLot_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                seedLot_ID: seedLot_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   seedLotTransaction_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_seedLotTransaction_ID(externalReferenceDbId, seedLotTransaction_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.seedlottransaction.add_externalReferences_IDs(seedLotTransaction_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                seedLotTransaction_ID: seedLotTransaction_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   study_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_study_ID(externalReferenceDbId, study_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.study.add_externalReferences_IDs(study_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                study_ID: study_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   trait_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_trait_ID(externalReferenceDbId, trait_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.trait.add_externalReferences_IDs(trait_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                trait_ID: trait_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   trial_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_trial_ID(externalReferenceDbId, trial_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.trial.add_externalReferences_IDs(trial_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                trial_ID: trial_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   variant_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_variant_ID(externalReferenceDbId, variant_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.variant.add_externalReferences_IDs(variant_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                variant_ID: variant_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * add_variantset_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   variantset_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_variantset_ID(externalReferenceDbId, variantset_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.variantset.add_externalReferences_IDs(variantset_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                variantset_ID: variantset_ID
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId
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
     * remove_callset_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   callset_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_callset_ID(externalReferenceDbId, callset_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.callset.remove_externalReferences_IDs(callset_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                callset_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
                    callset_ID: callset_ID
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   cross_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_cross_ID(externalReferenceDbId, cross_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.cross.remove_externalReferences_IDs(cross_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                cross_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   crossingProject_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_crossingProject_ID(externalReferenceDbId, crossingProject_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.crossingproject.remove_externalReferences_IDs(crossingProject_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                crossingProject_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   germplasm_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_germplasm_ID(externalReferenceDbId, germplasm_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.germplasm.remove_externalReferences_IDs(germplasm_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                germplasm_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   germplasmAttribute_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_germplasmAttribute_ID(externalReferenceDbId, germplasmAttribute_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.germplasmattribute.remove_externalReferences_IDs(germplasmAttribute_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                germplasmAttribute_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   germplasmAttributeValue_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_germplasmAttributeValue_ID(externalReferenceDbId, germplasmAttributeValue_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.germplasmattributevalue.remove_externalReferences_IDs(germplasmAttributeValue_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                germplasmAttributeValue_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   image_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_image_ID(externalReferenceDbId, image_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.image.remove_externalReferences_IDs(image_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                image_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * remove_method_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   method_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_method_ID(externalReferenceDbId, method_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.method.remove_externalReferences_IDs(method_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                method_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * remove_list_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   list_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_list_ID(externalReferenceDbId, list_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.list.remove_externalReferences_IDs(list_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                list_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   location_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_location_ID(externalReferenceDbId, location_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.location.remove_externalReferences_IDs(location_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                location_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * remove_observation_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   observation_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_observation_ID(externalReferenceDbId, observation_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.observation.remove_externalReferences_IDs(observation_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                observation_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   observationUnit_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_observationUnit_ID(externalReferenceDbId, observationUnit_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.observationunit.remove_externalReferences_IDs(observationUnit_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                observationUnit_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   observationVariable_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_observationVariable_ID(externalReferenceDbId, observationVariable_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.observationvariable.remove_externalReferences_IDs(observationVariable_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                observationVariable_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * remove_plate_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   plate_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_plate_ID(externalReferenceDbId, plate_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.plate.remove_externalReferences_IDs(plate_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                plate_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * remove_person_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   person_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_person_ID(externalReferenceDbId, person_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.person.remove_externalReferences_IDs(person_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                person_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   pedigreeNode_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_pedigreeNode_ID(externalReferenceDbId, pedigreeNode_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.pedigreenode.remove_externalReferences_IDs(pedigreeNode_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                pedigreeNode_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   plannedCross_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_plannedCross_ID(externalReferenceDbId, plannedCross_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.plannedcross.remove_externalReferences_IDs(plannedCross_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                plannedCross_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * remove_program_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   program_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_program_ID(externalReferenceDbId, program_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.program.remove_externalReferences_IDs(program_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                program_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   reference_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_reference_ID(externalReferenceDbId, reference_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.reference.remove_externalReferences_IDs(reference_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                reference_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * remove_referenceset_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   referenceset_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_referenceset_ID(externalReferenceDbId, referenceset_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.referenceset.remove_externalReferences_IDs(referenceset_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                referenceset_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
                    referenceset_ID: referenceset_ID
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   sample_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_sample_ID(externalReferenceDbId, sample_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.sample.remove_externalReferences_IDs(sample_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                sample_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   scale_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_scale_ID(externalReferenceDbId, scale_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.scale.remove_externalReferences_IDs(scale_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                scale_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   seedLot_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_seedLot_ID(externalReferenceDbId, seedLot_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.seedlot.remove_externalReferences_IDs(seedLot_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                seedLot_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   seedLotTransaction_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_seedLotTransaction_ID(externalReferenceDbId, seedLotTransaction_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.seedlottransaction.remove_externalReferences_IDs(seedLotTransaction_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                seedLotTransaction_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   study_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_study_ID(externalReferenceDbId, study_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.study.remove_externalReferences_IDs(study_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                study_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   trait_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_trait_ID(externalReferenceDbId, trait_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.trait.remove_externalReferences_IDs(trait_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                trait_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   trial_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_trial_ID(externalReferenceDbId, trial_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.trial.remove_externalReferences_IDs(trial_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                trial_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   variant_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_variant_ID(externalReferenceDbId, variant_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.variant.remove_externalReferences_IDs(variant_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                variant_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
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
     * remove_variantset_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   externalReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   variantset_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_variantset_ID(externalReferenceDbId, variantset_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.variantset.remove_externalReferences_IDs(variantset_ID, [`${externalReferenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await externalreference.update({
                variantset_ID: null
            }, {
                where: {
                    externalReferenceDbId: externalReferenceDbId,
                    variantset_ID: variantset_ID
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
        return externalreference.definition.id.name;
    }

    /**
     * idAttributeType - Return the Type of the internalId.
     *
     * @return {type} Type given in the JSON model
     */
    static idAttributeType() {
        return externalreference.definition.id.type;
    }

    /**
     * getIdValue - Get the value of the idAttribute ("id", or "internalId") for an instance of externalreference.
     *
     * @return {type} id value
     */
    getIdValue() {
        return this[externalreference.idAttribute()];
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
     * base64Encode - Encode  externalreference to a base 64 String
     *
     * @return {string} The externalreference object, encoded in a base 64 String
     */
    base64Encode() {
        return Buffer.from(JSON.stringify(this.stripAssociations())).toString(
            "base64"
        );
    }

    /**
     * asCursor - alias method for base64Encode
     *
     * @return {string} The externalreference object, encoded in a base 64 String
     */
    asCursor() {
        return this.base64Encode()
    }

    /**
     * stripAssociations - Instance method for getting all attributes of externalreference.
     *
     * @return {object} The attributes of externalreference in object form
     */
    stripAssociations() {
        let attributes = Object.keys(externalreference.definition.attributes);
        let data_values = _.pick(this, attributes);
        return data_values;
    }

    /**
     * externalIdsArray - Get all attributes of externalreference that are marked as external IDs.
     *
     * @return {Array<String>} An array of all attributes of externalreference that are marked as external IDs
     */
    static externalIdsArray() {
        let externalIds = [];
        if (definition.externalIds) {
            externalIds = definition.externalIds;
        }

        return externalIds;
    }

    /**
     * externalIdsObject - Get all external IDs of externalreference.
     *
     * @return {object} An object that has the names of the external IDs as keys and their types as values
     */
    static externalIdsObject() {
        return {};
    }

}