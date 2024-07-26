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
    "model": "ontologyreference",
    "storageType": "sql",
    "attributes": {
        "ontologyReferenceDbId": "[ String ]",
        "ontologyName": "String",
        "version": "String",
        "germplasmAttribute_ID": "String",
        "method_ID": "String",
        "observationVariable_ID": "String",
        "scale_ID": "String",
        "trait_ID": "String",
        "documentationLinks_IDs": "[ String ]"
    },
    "associations": {
        "germplasmAttribute": {
            "type": "one_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "ontologyReference",
            "target": "germplasmattribute",
            "targetKey": "ontologyReference_ID",
            "sourceKey": "germplasmAttribute_ID",
            "keysIn": "ontologyreference",
            "targetStorageType": "sql"
        },
        "method": {
            "type": "one_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "ontologyReference",
            "target": "method",
            "targetKey": "ontologyReference_ID",
            "sourceKey": "method_ID",
            "keysIn": "ontologyreference",
            "targetStorageType": "sql"
        },
        "observationVariable": {
            "type": "one_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "ontologyReference",
            "target": "observationvariable",
            "targetKey": "ontologyReference_ID",
            "sourceKey": "observationVariable_ID",
            "keysIn": "ontologyreference",
            "targetStorageType": "sql"
        },
        "scale": {
            "type": "one_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "ontologyReference",
            "target": "scale",
            "targetKey": "ontologyReference_ID",
            "sourceKey": "scale_ID",
            "keysIn": "ontologyreference",
            "targetStorageType": "sql"
        },
        "trait": {
            "type": "one_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "ontologyReference",
            "target": "trait",
            "targetKey": "ontologyReference_ID",
            "sourceKey": "trait_ID",
            "keysIn": "ontologyreference",
            "targetStorageType": "sql"
        },
        "documentationLinks": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "ontologyReference",
            "target": "documentationlink",
            "targetKey": "ontologyReference_ID",
            "sourceKey": "documentationLinks_IDs",
            "keysIn": "ontologyreference",
            "targetStorageType": "sql"
        }
    },
    "internalId": "ontologyReferenceDbId",
    "id": {
        "name": "ontologyReferenceDbId",
        "type": "[String]"
    }
};
const DataLoader = require("dataloader");

/**
 * module - Creates a sequelize model
 */

module.exports = class ontologyreference extends Sequelize.Model {
    /**
     * Initialize sequelize model.
     * @param  {object} sequelize Sequelize instance.
     * @param  {object} DataTypes Allowed sequelize data types.
     * @return {object}           Sequelize model with associations defined
     */
    static init(sequelize, DataTypes) {
        return super.init({

            ontologyReferenceDbId: {
                type: Sequelize[dict['[String]']],
                primaryKey: true
            },
            ontologyName: {
                type: Sequelize[dict['String']]
            },
            version: {
                type: Sequelize[dict['String']]
            },
            germplasmAttribute_ID: {
                type: Sequelize[dict['String']]
            },
            method_ID: {
                type: Sequelize[dict['String']]
            },
            observationVariable_ID: {
                type: Sequelize[dict['String']]
            },
            scale_ID: {
                type: Sequelize[dict['String']]
            },
            trait_ID: {
                type: Sequelize[dict['String']]
            },
            documentationLinks_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            }


        }, {
            modelName: "ontologyreference",
            tableName: "ontologyreferences",
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
            field: ontologyreference.idAttribute(),
            value: keys.join(),
            valueType: "Array",
        };
        let cursorRes = await ontologyreference.readAllCursor(queryArg);
        cursorRes = cursorRes.ontologyreferences.reduce(
            (map, obj) => ((map[obj[ontologyreference.idAttribute()]] = obj), map), {}
        );
        return keys.map(
            (key) =>
            cursorRes[key] || new Error(`Record with ID = "${key}" does not exist`)
        );
    }

    static readByIdLoader = new DataLoader(ontologyreference.batchReadById, {
        cache: false,
    });

    /**
     * readById - The model implementation for reading a single record given by its ID
     *
     * Read a single record by a given ID
     * @param {string} id - The ID of the requested record
     * @return {object} The requested record as an object with the type ontologyreference, or an error object if the validation after reading fails
     * @throws {Error} If the requested record does not exist
     */
    static async readById(id) {
        return await ontologyreference.readByIdLoader.load(id);
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
        options['where'] = helper.searchConditionsToSequelize(search, ontologyreference.definition.attributes);
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
        let options = helper.buildLimitOffsetSequelizeOptions(search, order, pagination, this.idAttribute(), ontologyreference.definition.attributes);
        let records = await super.findAll(options);
        records = records.map(x => ontologyreference.postReadCast(x))
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
        let options = helper.buildCursorBasedSequelizeOptions(search, order, pagination, this.idAttribute(), ontologyreference.definition.attributes);
        let records = await super.findAll(options);

        records = records.map(x => ontologyreference.postReadCast(x))

        // validationCheck after read
        records = await validatorUtil.bulkValidateData('validateAfterRead', this, records, benignErrorReporter);
        // get the first record (if exists) in the opposite direction to determine pageInfo.
        // if no cursor was given there is no need for an extra query as the results will start at the first (or last) page.
        let oppRecords = [];
        if (pagination && (pagination.after || pagination.before)) {
            let oppOptions = helper.buildOppositeSearchSequelize(search, order, {
                ...pagination,
                includeCursor: false
            }, this.idAttribute(), ontologyreference.definition.attributes);
            oppRecords = await super.findAll(oppOptions);
        }
        // build the graphql Connection Object
        let edges = helper.buildEdgeObject(records);
        let pageInfo = helper.buildPageInfo(edges, oppRecords, pagination);
        return {
            edges,
            pageInfo,
            ontologyreferences: edges.map((edge) => edge.node)
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
        input = ontologyreference.preWriteCast(input)
        try {
            const result = await this.sequelize.transaction(async (t) => {
                let item = await super.create(input, {
                    transaction: t
                });
                return item;
            });
            ontologyreference.postReadCast(result.dataValues)
            ontologyreference.postReadCast(result._previousDataValues)
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
        input = ontologyreference.preWriteCast(input)
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
            ontologyreference.postReadCast(result.dataValues)
            ontologyreference.postReadCast(result._previousDataValues)
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
     * add_germplasmAttribute_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   ontologyReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   germplasmAttribute_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_germplasmAttribute_ID(ontologyReferenceDbId, germplasmAttribute_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.germplasmattribute.add_ontologyReference_ID(germplasmAttribute_ID, ontologyReferenceDbId, benignErrorReporter, token, false);
            }
            let updated = await ontologyreference.update({
                germplasmAttribute_ID: germplasmAttribute_ID
            }, {
                where: {
                    ontologyReferenceDbId: ontologyReferenceDbId
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
     * @param {Id}   ontologyReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   method_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_method_ID(ontologyReferenceDbId, method_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.method.add_ontologyReference_ID(method_ID, ontologyReferenceDbId, benignErrorReporter, token, false);
            }
            let updated = await ontologyreference.update({
                method_ID: method_ID
            }, {
                where: {
                    ontologyReferenceDbId: ontologyReferenceDbId
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
     * @param {Id}   ontologyReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   observationVariable_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_observationVariable_ID(ontologyReferenceDbId, observationVariable_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.observationvariable.add_ontologyReference_ID(observationVariable_ID, ontologyReferenceDbId, benignErrorReporter, token, false);
            }
            let updated = await ontologyreference.update({
                observationVariable_ID: observationVariable_ID
            }, {
                where: {
                    ontologyReferenceDbId: ontologyReferenceDbId
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
     * @param {Id}   ontologyReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   scale_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_scale_ID(ontologyReferenceDbId, scale_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.scale.add_ontologyReference_ID(scale_ID, ontologyReferenceDbId, benignErrorReporter, token, false);
            }
            let updated = await ontologyreference.update({
                scale_ID: scale_ID
            }, {
                where: {
                    ontologyReferenceDbId: ontologyReferenceDbId
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
     * @param {Id}   ontologyReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   trait_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_trait_ID(ontologyReferenceDbId, trait_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.trait.add_ontologyReference_ID(trait_ID, ontologyReferenceDbId, benignErrorReporter, token, false);
            }
            let updated = await ontologyreference.update({
                trait_ID: trait_ID
            }, {
                where: {
                    ontologyReferenceDbId: ontologyReferenceDbId
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
     * add_documentationLinks_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   ontologyReferenceDbId   IdAttribute of the root model to be updated
     * @param {Array}   documentationLinks_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_documentationLinks_IDs(ontologyReferenceDbId, documentationLinks_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            documentationLinks_IDs.forEach(idx => {
                promises.push(models.documentationlink.add_ontologyReference_ID(idx, ontologyReferenceDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(ontologyReferenceDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.documentationLinks_IDs), documentationLinks_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                documentationLinks_IDs: updated_ids
            });
        }
    }

    /**
     * remove_germplasmAttribute_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   ontologyReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   germplasmAttribute_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_germplasmAttribute_ID(ontologyReferenceDbId, germplasmAttribute_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.germplasmattribute.remove_ontologyReference_ID(germplasmAttribute_ID, ontologyReferenceDbId, benignErrorReporter, token, false);
            }
            let updated = await ontologyreference.update({
                germplasmAttribute_ID: null
            }, {
                where: {
                    ontologyReferenceDbId: ontologyReferenceDbId,
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
     * remove_method_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   ontologyReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   method_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_method_ID(ontologyReferenceDbId, method_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.method.remove_ontologyReference_ID(method_ID, ontologyReferenceDbId, benignErrorReporter, token, false);
            }
            let updated = await ontologyreference.update({
                method_ID: null
            }, {
                where: {
                    ontologyReferenceDbId: ontologyReferenceDbId,
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
     * remove_observationVariable_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   ontologyReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   observationVariable_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_observationVariable_ID(ontologyReferenceDbId, observationVariable_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.observationvariable.remove_ontologyReference_ID(observationVariable_ID, ontologyReferenceDbId, benignErrorReporter, token, false);
            }
            let updated = await ontologyreference.update({
                observationVariable_ID: null
            }, {
                where: {
                    ontologyReferenceDbId: ontologyReferenceDbId,
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
     * remove_scale_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   ontologyReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   scale_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_scale_ID(ontologyReferenceDbId, scale_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.scale.remove_ontologyReference_ID(scale_ID, ontologyReferenceDbId, benignErrorReporter, token, false);
            }
            let updated = await ontologyreference.update({
                scale_ID: null
            }, {
                where: {
                    ontologyReferenceDbId: ontologyReferenceDbId,
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
     * @param {Id}   ontologyReferenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   trait_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_trait_ID(ontologyReferenceDbId, trait_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.trait.remove_ontologyReference_ID(trait_ID, ontologyReferenceDbId, benignErrorReporter, token, false);
            }
            let updated = await ontologyreference.update({
                trait_ID: null
            }, {
                where: {
                    ontologyReferenceDbId: ontologyReferenceDbId,
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
     * remove_documentationLinks_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   ontologyReferenceDbId   IdAttribute of the root model to be updated
     * @param {Array}   documentationLinks_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_documentationLinks_IDs(ontologyReferenceDbId, documentationLinks_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            documentationLinks_IDs.forEach(idx => {
                promises.push(models.documentationlink.remove_ontologyReference_ID(idx, ontologyReferenceDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(ontologyReferenceDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.documentationLinks_IDs), documentationLinks_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                documentationLinks_IDs: updated_ids
            });
        }
    }








    /**
     * idAttribute - Check whether an attribute "internalId" is given in the JSON model. If not the standard "id" is used instead.
     *
     * @return {type} Name of the attribute that functions as an internalId
     */
    static idAttribute() {
        return ontologyreference.definition.id.name;
    }

    /**
     * idAttributeType - Return the Type of the internalId.
     *
     * @return {type} Type given in the JSON model
     */
    static idAttributeType() {
        return ontologyreference.definition.id.type;
    }

    /**
     * getIdValue - Get the value of the idAttribute ("id", or "internalId") for an instance of ontologyreference.
     *
     * @return {type} id value
     */
    getIdValue() {
        return this[ontologyreference.idAttribute()];
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
     * base64Encode - Encode  ontologyreference to a base 64 String
     *
     * @return {string} The ontologyreference object, encoded in a base 64 String
     */
    base64Encode() {
        return Buffer.from(JSON.stringify(this.stripAssociations())).toString(
            "base64"
        );
    }

    /**
     * asCursor - alias method for base64Encode
     *
     * @return {string} The ontologyreference object, encoded in a base 64 String
     */
    asCursor() {
        return this.base64Encode()
    }

    /**
     * stripAssociations - Instance method for getting all attributes of ontologyreference.
     *
     * @return {object} The attributes of ontologyreference in object form
     */
    stripAssociations() {
        let attributes = Object.keys(ontologyreference.definition.attributes);
        let data_values = _.pick(this, attributes);
        return data_values;
    }

    /**
     * externalIdsArray - Get all attributes of ontologyreference that are marked as external IDs.
     *
     * @return {Array<String>} An array of all attributes of ontologyreference that are marked as external IDs
     */
    static externalIdsArray() {
        let externalIds = [];
        if (definition.externalIds) {
            externalIds = definition.externalIds;
        }

        return externalIds;
    }

    /**
     * externalIdsObject - Get all external IDs of ontologyreference.
     *
     * @return {object} An object that has the names of the external IDs as keys and their types as values
     */
    static externalIdsObject() {
        return {};
    }

}