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
    "model": "germplasmattribute",
    "storageType": "sql",
    "attributes": {
        "germplasmAttributeDbId": "[ String ]",
        "attributeName": "String",
        "attributeCategory": "String",
        "attributeDescription": "String",
        "attributePUI": "String",
        "commonCropName": "String",
        "contextOfUse": "[ String ]",
        "defaultValue": "String",
        "documentationURL": "String",
        "growthStage": "String",
        "institution": "String",
        "language": "String",
        "scientist": "String",
        "status": "String",
        "submissionTimestamp": "String",
        "synonyms": "[ String ]",
        "germplasmAttributeValues_IDs": "[ String ]",
        "additionalInfo_IDs": "[ String ]",
        "externalReferences_IDs": "[ String ]",
        "method_ID": "String",
        "ontologyReference_ID": "String",
        "scale_ID": "String",
        "trait_ID": "String"
    },
    "associations": {
        "germplasmAttributeValues": {
            "type": "many_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "attribute",
            "target": "germplasmattributevalue",
            "targetKey": "attribute_IDs",
            "sourceKey": "germplasmAttributeValues_IDs",
            "keysIn": "germplasmattribute",
            "targetStorageType": "sql"
        },
        "additionalInfo": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "germplasmAttribute",
            "target": "additionalinfo",
            "targetKey": "germplasmAttribute_ID",
            "sourceKey": "additionalInfo_IDs",
            "keysIn": "germplasmattribute",
            "targetStorageType": "sql"
        },
        "externalReferences": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "germplasmAttribute",
            "target": "externalreference",
            "targetKey": "germplasmAttribute_ID",
            "sourceKey": "externalReferences_IDs",
            "keysIn": "germplasmattribute",
            "targetStorageType": "sql"
        },
        "method": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "germplasmAttributes",
            "target": "method",
            "targetKey": "germplasmAttributes_IDs",
            "sourceKey": "method_ID",
            "keysIn": "germplasmattribute",
            "targetStorageType": "sql"
        },
        "ontologyReference": {
            "type": "one_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "germplasmAttribute",
            "target": "ontologyreference",
            "targetKey": "germplasmAttribute_ID",
            "sourceKey": "ontologyReference_ID",
            "keysIn": "germplasmattribute",
            "targetStorageType": "sql"
        },
        "scale": {
            "type": "one_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "germplasmAttribute",
            "target": "scale",
            "targetKey": "germplasmAttribute_ID",
            "sourceKey": "scale_ID",
            "keysIn": "germplasmattribute",
            "targetStorageType": "sql"
        },
        "trait": {
            "type": "one_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "germplasmAttribute",
            "target": "trait",
            "targetKey": "germplasmAttribute_ID",
            "sourceKey": "trait_ID",
            "keysIn": "germplasmattribute",
            "targetStorageType": "sql"
        }
    },
    "internalId": "germplasmAttributeDbId",
    "id": {
        "name": "germplasmAttributeDbId",
        "type": "[String]"
    }
};
const DataLoader = require("dataloader");

/**
 * module - Creates a sequelize model
 */

module.exports = class germplasmattribute extends Sequelize.Model {
    /**
     * Initialize sequelize model.
     * @param  {object} sequelize Sequelize instance.
     * @param  {object} DataTypes Allowed sequelize data types.
     * @return {object}           Sequelize model with associations defined
     */
    static init(sequelize, DataTypes) {
        return super.init({

            germplasmAttributeDbId: {
                type: Sequelize[dict['[String]']],
                primaryKey: true
            },
            attributeName: {
                type: Sequelize[dict['String']]
            },
            attributeCategory: {
                type: Sequelize[dict['String']]
            },
            attributeDescription: {
                type: Sequelize[dict['String']]
            },
            attributePUI: {
                type: Sequelize[dict['String']]
            },
            commonCropName: {
                type: Sequelize[dict['String']]
            },
            contextOfUse: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            defaultValue: {
                type: Sequelize[dict['String']]
            },
            documentationURL: {
                type: Sequelize[dict['String']]
            },
            growthStage: {
                type: Sequelize[dict['String']]
            },
            institution: {
                type: Sequelize[dict['String']]
            },
            language: {
                type: Sequelize[dict['String']]
            },
            scientist: {
                type: Sequelize[dict['String']]
            },
            status: {
                type: Sequelize[dict['String']]
            },
            submissionTimestamp: {
                type: Sequelize[dict['String']]
            },
            synonyms: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            germplasmAttributeValues_IDs: {
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
            method_ID: {
                type: Sequelize[dict['String']]
            },
            ontologyReference_ID: {
                type: Sequelize[dict['String']]
            },
            scale_ID: {
                type: Sequelize[dict['String']]
            },
            trait_ID: {
                type: Sequelize[dict['String']]
            }


        }, {
            modelName: "germplasmattribute",
            tableName: "germplasmattributes",
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
            field: germplasmattribute.idAttribute(),
            value: keys.join(),
            valueType: "Array",
        };
        let cursorRes = await germplasmattribute.readAllCursor(queryArg);
        cursorRes = cursorRes.germplasmattributes.reduce(
            (map, obj) => ((map[obj[germplasmattribute.idAttribute()]] = obj), map), {}
        );
        return keys.map(
            (key) =>
            cursorRes[key] || new Error(`Record with ID = "${key}" does not exist`)
        );
    }

    static readByIdLoader = new DataLoader(germplasmattribute.batchReadById, {
        cache: false,
    });

    /**
     * readById - The model implementation for reading a single record given by its ID
     *
     * Read a single record by a given ID
     * @param {string} id - The ID of the requested record
     * @return {object} The requested record as an object with the type germplasmattribute, or an error object if the validation after reading fails
     * @throws {Error} If the requested record does not exist
     */
    static async readById(id) {
        return await germplasmattribute.readByIdLoader.load(id);
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
        options['where'] = helper.searchConditionsToSequelize(search, germplasmattribute.definition.attributes);
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
        let options = helper.buildLimitOffsetSequelizeOptions(search, order, pagination, this.idAttribute(), germplasmattribute.definition.attributes);
        let records = await super.findAll(options);
        records = records.map(x => germplasmattribute.postReadCast(x))
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
        let options = helper.buildCursorBasedSequelizeOptions(search, order, pagination, this.idAttribute(), germplasmattribute.definition.attributes);
        let records = await super.findAll(options);

        records = records.map(x => germplasmattribute.postReadCast(x))

        // validationCheck after read
        records = await validatorUtil.bulkValidateData('validateAfterRead', this, records, benignErrorReporter);
        // get the first record (if exists) in the opposite direction to determine pageInfo.
        // if no cursor was given there is no need for an extra query as the results will start at the first (or last) page.
        let oppRecords = [];
        if (pagination && (pagination.after || pagination.before)) {
            let oppOptions = helper.buildOppositeSearchSequelize(search, order, {
                ...pagination,
                includeCursor: false
            }, this.idAttribute(), germplasmattribute.definition.attributes);
            oppRecords = await super.findAll(oppOptions);
        }
        // build the graphql Connection Object
        let edges = helper.buildEdgeObject(records);
        let pageInfo = helper.buildPageInfo(edges, oppRecords, pagination);
        return {
            edges,
            pageInfo,
            germplasmattributes: edges.map((edge) => edge.node)
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
        input = germplasmattribute.preWriteCast(input)
        try {
            const result = await this.sequelize.transaction(async (t) => {
                let item = await super.create(input, {
                    transaction: t
                });
                return item;
            });
            germplasmattribute.postReadCast(result.dataValues)
            germplasmattribute.postReadCast(result._previousDataValues)
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
        input = germplasmattribute.preWriteCast(input)
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
            germplasmattribute.postReadCast(result.dataValues)
            germplasmattribute.postReadCast(result._previousDataValues)
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
     * add_method_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   germplasmAttributeDbId   IdAttribute of the root model to be updated
     * @param {Id}   method_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_method_ID(germplasmAttributeDbId, method_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.method.add_germplasmAttributes_IDs(method_ID, [`${germplasmAttributeDbId}`], benignErrorReporter, token, false);
            }
            let updated = await germplasmattribute.update({
                method_ID: method_ID
            }, {
                where: {
                    germplasmAttributeDbId: germplasmAttributeDbId
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
     * add_ontologyReference_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   germplasmAttributeDbId   IdAttribute of the root model to be updated
     * @param {Id}   ontologyReference_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_ontologyReference_ID(germplasmAttributeDbId, ontologyReference_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.ontologyreference.add_germplasmAttribute_ID(ontologyReference_ID, germplasmAttributeDbId, benignErrorReporter, token, false);
            }
            let updated = await germplasmattribute.update({
                ontologyReference_ID: ontologyReference_ID
            }, {
                where: {
                    germplasmAttributeDbId: germplasmAttributeDbId
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
     * @param {Id}   germplasmAttributeDbId   IdAttribute of the root model to be updated
     * @param {Id}   scale_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_scale_ID(germplasmAttributeDbId, scale_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.scale.add_germplasmAttribute_ID(scale_ID, germplasmAttributeDbId, benignErrorReporter, token, false);
            }
            let updated = await germplasmattribute.update({
                scale_ID: scale_ID
            }, {
                where: {
                    germplasmAttributeDbId: germplasmAttributeDbId
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
     * @param {Id}   germplasmAttributeDbId   IdAttribute of the root model to be updated
     * @param {Id}   trait_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_trait_ID(germplasmAttributeDbId, trait_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.trait.add_germplasmAttribute_ID(trait_ID, germplasmAttributeDbId, benignErrorReporter, token, false);
            }
            let updated = await germplasmattribute.update({
                trait_ID: trait_ID
            }, {
                where: {
                    germplasmAttributeDbId: germplasmAttributeDbId
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
     * add_germplasmAttributeValues_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   germplasmAttributeDbId   IdAttribute of the root model to be updated
     * @param {Array}   germplasmAttributeValues_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_germplasmAttributeValues_IDs(germplasmAttributeDbId, germplasmAttributeValues_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            germplasmAttributeValues_IDs.forEach(idx => {
                promises.push(models.germplasmattributevalue.add_attribute_IDs(idx, [`${germplasmAttributeDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmAttributeDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.germplasmAttributeValues_IDs), germplasmAttributeValues_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                germplasmAttributeValues_IDs: updated_ids
            });
        }
    }
    /**
     * add_additionalInfo_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   germplasmAttributeDbId   IdAttribute of the root model to be updated
     * @param {Array}   additionalInfo_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_additionalInfo_IDs(germplasmAttributeDbId, additionalInfo_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            additionalInfo_IDs.forEach(idx => {
                promises.push(models.additionalinfo.add_germplasmAttribute_ID(idx, germplasmAttributeDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmAttributeDbId);
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
     * @param {Id}   germplasmAttributeDbId   IdAttribute of the root model to be updated
     * @param {Array}   externalReferences_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_externalReferences_IDs(germplasmAttributeDbId, externalReferences_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            externalReferences_IDs.forEach(idx => {
                promises.push(models.externalreference.add_germplasmAttribute_ID(idx, germplasmAttributeDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmAttributeDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.externalReferences_IDs), externalReferences_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                externalReferences_IDs: updated_ids
            });
        }
    }

    /**
     * remove_method_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   germplasmAttributeDbId   IdAttribute of the root model to be updated
     * @param {Id}   method_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_method_ID(germplasmAttributeDbId, method_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.method.remove_germplasmAttributes_IDs(method_ID, [`${germplasmAttributeDbId}`], benignErrorReporter, token, false);
            }
            let updated = await germplasmattribute.update({
                method_ID: null
            }, {
                where: {
                    germplasmAttributeDbId: germplasmAttributeDbId,
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
     * remove_ontologyReference_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   germplasmAttributeDbId   IdAttribute of the root model to be updated
     * @param {Id}   ontologyReference_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_ontologyReference_ID(germplasmAttributeDbId, ontologyReference_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.ontologyreference.remove_germplasmAttribute_ID(ontologyReference_ID, germplasmAttributeDbId, benignErrorReporter, token, false);
            }
            let updated = await germplasmattribute.update({
                ontologyReference_ID: null
            }, {
                where: {
                    germplasmAttributeDbId: germplasmAttributeDbId,
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
     * remove_scale_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   germplasmAttributeDbId   IdAttribute of the root model to be updated
     * @param {Id}   scale_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_scale_ID(germplasmAttributeDbId, scale_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.scale.remove_germplasmAttribute_ID(scale_ID, germplasmAttributeDbId, benignErrorReporter, token, false);
            }
            let updated = await germplasmattribute.update({
                scale_ID: null
            }, {
                where: {
                    germplasmAttributeDbId: germplasmAttributeDbId,
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
     * remove_trait_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   germplasmAttributeDbId   IdAttribute of the root model to be updated
     * @param {Id}   trait_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_trait_ID(germplasmAttributeDbId, trait_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.trait.remove_germplasmAttribute_ID(trait_ID, germplasmAttributeDbId, benignErrorReporter, token, false);
            }
            let updated = await germplasmattribute.update({
                trait_ID: null
            }, {
                where: {
                    germplasmAttributeDbId: germplasmAttributeDbId,
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
     * remove_germplasmAttributeValues_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   germplasmAttributeDbId   IdAttribute of the root model to be updated
     * @param {Array}   germplasmAttributeValues_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_germplasmAttributeValues_IDs(germplasmAttributeDbId, germplasmAttributeValues_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            germplasmAttributeValues_IDs.forEach(idx => {
                promises.push(models.germplasmattributevalue.remove_attribute_IDs(idx, [`${germplasmAttributeDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmAttributeDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.germplasmAttributeValues_IDs), germplasmAttributeValues_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                germplasmAttributeValues_IDs: updated_ids
            });
        }
    }
    /**
     * remove_additionalInfo_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   germplasmAttributeDbId   IdAttribute of the root model to be updated
     * @param {Array}   additionalInfo_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_additionalInfo_IDs(germplasmAttributeDbId, additionalInfo_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            additionalInfo_IDs.forEach(idx => {
                promises.push(models.additionalinfo.remove_germplasmAttribute_ID(idx, germplasmAttributeDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmAttributeDbId);
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
     * @param {Id}   germplasmAttributeDbId   IdAttribute of the root model to be updated
     * @param {Array}   externalReferences_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_externalReferences_IDs(germplasmAttributeDbId, externalReferences_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            externalReferences_IDs.forEach(idx => {
                promises.push(models.externalreference.remove_germplasmAttribute_ID(idx, germplasmAttributeDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmAttributeDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.externalReferences_IDs), externalReferences_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                externalReferences_IDs: updated_ids
            });
        }
    }








    /**
     * idAttribute - Check whether an attribute "internalId" is given in the JSON model. If not the standard "id" is used instead.
     *
     * @return {type} Name of the attribute that functions as an internalId
     */
    static idAttribute() {
        return germplasmattribute.definition.id.name;
    }

    /**
     * idAttributeType - Return the Type of the internalId.
     *
     * @return {type} Type given in the JSON model
     */
    static idAttributeType() {
        return germplasmattribute.definition.id.type;
    }

    /**
     * getIdValue - Get the value of the idAttribute ("id", or "internalId") for an instance of germplasmattribute.
     *
     * @return {type} id value
     */
    getIdValue() {
        return this[germplasmattribute.idAttribute()];
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
     * base64Encode - Encode  germplasmattribute to a base 64 String
     *
     * @return {string} The germplasmattribute object, encoded in a base 64 String
     */
    base64Encode() {
        return Buffer.from(JSON.stringify(this.stripAssociations())).toString(
            "base64"
        );
    }

    /**
     * asCursor - alias method for base64Encode
     *
     * @return {string} The germplasmattribute object, encoded in a base 64 String
     */
    asCursor() {
        return this.base64Encode()
    }

    /**
     * stripAssociations - Instance method for getting all attributes of germplasmattribute.
     *
     * @return {object} The attributes of germplasmattribute in object form
     */
    stripAssociations() {
        let attributes = Object.keys(germplasmattribute.definition.attributes);
        let data_values = _.pick(this, attributes);
        return data_values;
    }

    /**
     * externalIdsArray - Get all attributes of germplasmattribute that are marked as external IDs.
     *
     * @return {Array<String>} An array of all attributes of germplasmattribute that are marked as external IDs
     */
    static externalIdsArray() {
        let externalIds = [];
        if (definition.externalIds) {
            externalIds = definition.externalIds;
        }

        return externalIds;
    }

    /**
     * externalIdsObject - Get all external IDs of germplasmattribute.
     *
     * @return {object} An object that has the names of the external IDs as keys and their types as values
     */
    static externalIdsObject() {
        return {};
    }

}