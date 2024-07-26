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
    "model": "variant",
    "storageType": "sql",
    "attributes": {
        "additionalInfo_IDs": "[ String ]",
        "markerPositions_IDs": "[ String ]",
        "alleleMatrices_IDs": "[ String ]",
        "calls_IDs": "[ String ]",
        "analysis": "[ String ]",
        "ciend": "[ Int ]",
        "cipos": "[ Int ]",
        "created": "String",
        "end": "Int",
        "externalReferences_IDs": "[ String ]",
        "filtersApplied": "Boolean",
        "filtersFailed": "[ String ]",
        "filtersPassed": "Boolean",
        "reference_ID": "String",
        "referenceBases": "String",
        "referenceSet_ID": "String",
        "start": "Int",
        "svlen": "Int",
        "updated": "String",
        "variantDbId": "[ String ]",
        "variantNames": "[ String ]",
        "variantSet_ID": "String",
        "variantType": "String"
    },
    "associations": {
        "additionalInfo": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "variant",
            "target": "additionalinfo",
            "targetKey": "variant_ID",
            "sourceKey": "additionalInfo_IDs",
            "keysIn": "variant",
            "targetStorageType": "sql"
        },
        "markerPositions": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "variant",
            "target": "markerposition",
            "targetKey": "variant_ID",
            "sourceKey": "markerPositions_IDs",
            "keysIn": "variant",
            "targetStorageType": "sql"
        },
        "alleleMatrices": {
            "type": "many_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "variants",
            "target": "allelematrix",
            "targetKey": "variants_IDs",
            "sourceKey": "alleleMatrices_IDs",
            "keysIn": "variant",
            "targetStorageType": "sql"
        },
        "calls": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "variant",
            "target": "call",
            "targetKey": "variant_ID",
            "sourceKey": "calls_IDs",
            "keysIn": "variant",
            "targetStorageType": "sql"
        },
        "externalReferences": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "variant",
            "target": "externalreference",
            "targetKey": "variant_ID",
            "sourceKey": "externalReferences_IDs",
            "keysIn": "variant",
            "targetStorageType": "sql"
        },
        "reference": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "variants",
            "target": "reference",
            "targetKey": "variants_IDs",
            "sourceKey": "reference_ID",
            "keysIn": "variant",
            "targetStorageType": "sql"
        },
        "referenceSet": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "variants",
            "target": "referenceset",
            "targetKey": "variants_IDs",
            "sourceKey": "referenceSet_ID",
            "keysIn": "variant",
            "targetStorageType": "sql"
        },
        "variantSet": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "variants",
            "target": "variantset",
            "targetKey": "variants_IDs",
            "sourceKey": "variantSet_ID",
            "keysIn": "variant",
            "targetStorageType": "sql"
        }
    },
    "internalId": "variantDbId",
    "id": {
        "name": "variantDbId",
        "type": "[String]"
    }
};
const DataLoader = require("dataloader");

/**
 * module - Creates a sequelize model
 */

module.exports = class variant extends Sequelize.Model {
    /**
     * Initialize sequelize model.
     * @param  {object} sequelize Sequelize instance.
     * @param  {object} DataTypes Allowed sequelize data types.
     * @return {object}           Sequelize model with associations defined
     */
    static init(sequelize, DataTypes) {
        return super.init({

            variantDbId: {
                type: Sequelize[dict['[String]']],
                primaryKey: true
            },
            additionalInfo_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            markerPositions_IDs: {
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
            analysis: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            ciend: {
                type: Sequelize[dict['[Int]']],
                defaultValue: '[]'
            },
            cipos: {
                type: Sequelize[dict['[Int]']],
                defaultValue: '[]'
            },
            created: {
                type: Sequelize[dict['String']]
            },
            end: {
                type: Sequelize[dict['Int']]
            },
            externalReferences_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            filtersApplied: {
                type: Sequelize[dict['Boolean']]
            },
            filtersFailed: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            filtersPassed: {
                type: Sequelize[dict['Boolean']]
            },
            reference_ID: {
                type: Sequelize[dict['String']]
            },
            referenceBases: {
                type: Sequelize[dict['String']]
            },
            referenceSet_ID: {
                type: Sequelize[dict['String']]
            },
            start: {
                type: Sequelize[dict['Int']]
            },
            svlen: {
                type: Sequelize[dict['Int']]
            },
            updated: {
                type: Sequelize[dict['String']]
            },
            variantNames: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            variantSet_ID: {
                type: Sequelize[dict['String']]
            },
            variantType: {
                type: Sequelize[dict['String']]
            }


        }, {
            modelName: "variant",
            tableName: "variants",
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
            field: variant.idAttribute(),
            value: keys.join(),
            valueType: "Array",
        };
        let cursorRes = await variant.readAllCursor(queryArg);
        cursorRes = cursorRes.variants.reduce(
            (map, obj) => ((map[obj[variant.idAttribute()]] = obj), map), {}
        );
        return keys.map(
            (key) =>
            cursorRes[key] || new Error(`Record with ID = "${key}" does not exist`)
        );
    }

    static readByIdLoader = new DataLoader(variant.batchReadById, {
        cache: false,
    });

    /**
     * readById - The model implementation for reading a single record given by its ID
     *
     * Read a single record by a given ID
     * @param {string} id - The ID of the requested record
     * @return {object} The requested record as an object with the type variant, or an error object if the validation after reading fails
     * @throws {Error} If the requested record does not exist
     */
    static async readById(id) {
        return await variant.readByIdLoader.load(id);
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
        options['where'] = helper.searchConditionsToSequelize(search, variant.definition.attributes);
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
        let options = helper.buildLimitOffsetSequelizeOptions(search, order, pagination, this.idAttribute(), variant.definition.attributes);
        let records = await super.findAll(options);
        records = records.map(x => variant.postReadCast(x))
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
        let options = helper.buildCursorBasedSequelizeOptions(search, order, pagination, this.idAttribute(), variant.definition.attributes);
        let records = await super.findAll(options);

        records = records.map(x => variant.postReadCast(x))

        // validationCheck after read
        records = await validatorUtil.bulkValidateData('validateAfterRead', this, records, benignErrorReporter);
        // get the first record (if exists) in the opposite direction to determine pageInfo.
        // if no cursor was given there is no need for an extra query as the results will start at the first (or last) page.
        let oppRecords = [];
        if (pagination && (pagination.after || pagination.before)) {
            let oppOptions = helper.buildOppositeSearchSequelize(search, order, {
                ...pagination,
                includeCursor: false
            }, this.idAttribute(), variant.definition.attributes);
            oppRecords = await super.findAll(oppOptions);
        }
        // build the graphql Connection Object
        let edges = helper.buildEdgeObject(records);
        let pageInfo = helper.buildPageInfo(edges, oppRecords, pagination);
        return {
            edges,
            pageInfo,
            variants: edges.map((edge) => edge.node)
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
        input = variant.preWriteCast(input)
        try {
            const result = await this.sequelize.transaction(async (t) => {
                let item = await super.create(input, {
                    transaction: t
                });
                return item;
            });
            variant.postReadCast(result.dataValues)
            variant.postReadCast(result._previousDataValues)
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
        input = variant.preWriteCast(input)
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
            variant.postReadCast(result.dataValues)
            variant.postReadCast(result._previousDataValues)
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
     * add_reference_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   variantDbId   IdAttribute of the root model to be updated
     * @param {Id}   reference_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_reference_ID(variantDbId, reference_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.reference.add_variants_IDs(reference_ID, [`${variantDbId}`], benignErrorReporter, token, false);
            }
            let updated = await variant.update({
                reference_ID: reference_ID
            }, {
                where: {
                    variantDbId: variantDbId
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
     * @param {Id}   variantDbId   IdAttribute of the root model to be updated
     * @param {Id}   referenceSet_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_referenceSet_ID(variantDbId, referenceSet_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.referenceset.add_variants_IDs(referenceSet_ID, [`${variantDbId}`], benignErrorReporter, token, false);
            }
            let updated = await variant.update({
                referenceSet_ID: referenceSet_ID
            }, {
                where: {
                    variantDbId: variantDbId
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
     * @param {Id}   variantDbId   IdAttribute of the root model to be updated
     * @param {Id}   variantSet_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_variantSet_ID(variantDbId, variantSet_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.variantset.add_variants_IDs(variantSet_ID, [`${variantDbId}`], benignErrorReporter, token, false);
            }
            let updated = await variant.update({
                variantSet_ID: variantSet_ID
            }, {
                where: {
                    variantDbId: variantDbId
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
     * @param {Id}   variantDbId   IdAttribute of the root model to be updated
     * @param {Array}   additionalInfo_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_additionalInfo_IDs(variantDbId, additionalInfo_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            additionalInfo_IDs.forEach(idx => {
                promises.push(models.additionalinfo.add_variant_ID(idx, variantDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(variantDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.additionalInfo_IDs), additionalInfo_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                additionalInfo_IDs: updated_ids
            });
        }
    }
    /**
     * add_markerPositions_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   variantDbId   IdAttribute of the root model to be updated
     * @param {Array}   markerPositions_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_markerPositions_IDs(variantDbId, markerPositions_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            markerPositions_IDs.forEach(idx => {
                promises.push(models.markerposition.add_variant_ID(idx, variantDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(variantDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.markerPositions_IDs), markerPositions_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                markerPositions_IDs: updated_ids
            });
        }
    }
    /**
     * add_alleleMatrices_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   variantDbId   IdAttribute of the root model to be updated
     * @param {Array}   alleleMatrices_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_alleleMatrices_IDs(variantDbId, alleleMatrices_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            alleleMatrices_IDs.forEach(idx => {
                promises.push(models.allelematrix.add_variants_IDs(idx, [`${variantDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(variantDbId);
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
     * @param {Id}   variantDbId   IdAttribute of the root model to be updated
     * @param {Array}   calls_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_calls_IDs(variantDbId, calls_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            calls_IDs.forEach(idx => {
                promises.push(models.call.add_variant_ID(idx, variantDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(variantDbId);
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
     * @param {Id}   variantDbId   IdAttribute of the root model to be updated
     * @param {Array}   externalReferences_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_externalReferences_IDs(variantDbId, externalReferences_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            externalReferences_IDs.forEach(idx => {
                promises.push(models.externalreference.add_variant_ID(idx, variantDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(variantDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.externalReferences_IDs), externalReferences_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                externalReferences_IDs: updated_ids
            });
        }
    }

    /**
     * remove_reference_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   variantDbId   IdAttribute of the root model to be updated
     * @param {Id}   reference_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_reference_ID(variantDbId, reference_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.reference.remove_variants_IDs(reference_ID, [`${variantDbId}`], benignErrorReporter, token, false);
            }
            let updated = await variant.update({
                reference_ID: null
            }, {
                where: {
                    variantDbId: variantDbId,
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
     * @param {Id}   variantDbId   IdAttribute of the root model to be updated
     * @param {Id}   referenceSet_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_referenceSet_ID(variantDbId, referenceSet_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.referenceset.remove_variants_IDs(referenceSet_ID, [`${variantDbId}`], benignErrorReporter, token, false);
            }
            let updated = await variant.update({
                referenceSet_ID: null
            }, {
                where: {
                    variantDbId: variantDbId,
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
     * remove_variantSet_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   variantDbId   IdAttribute of the root model to be updated
     * @param {Id}   variantSet_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_variantSet_ID(variantDbId, variantSet_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.variantset.remove_variants_IDs(variantSet_ID, [`${variantDbId}`], benignErrorReporter, token, false);
            }
            let updated = await variant.update({
                variantSet_ID: null
            }, {
                where: {
                    variantDbId: variantDbId,
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
     * remove_additionalInfo_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   variantDbId   IdAttribute of the root model to be updated
     * @param {Array}   additionalInfo_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_additionalInfo_IDs(variantDbId, additionalInfo_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            additionalInfo_IDs.forEach(idx => {
                promises.push(models.additionalinfo.remove_variant_ID(idx, variantDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(variantDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.additionalInfo_IDs), additionalInfo_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                additionalInfo_IDs: updated_ids
            });
        }
    }
    /**
     * remove_markerPositions_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   variantDbId   IdAttribute of the root model to be updated
     * @param {Array}   markerPositions_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_markerPositions_IDs(variantDbId, markerPositions_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            markerPositions_IDs.forEach(idx => {
                promises.push(models.markerposition.remove_variant_ID(idx, variantDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(variantDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.markerPositions_IDs), markerPositions_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                markerPositions_IDs: updated_ids
            });
        }
    }
    /**
     * remove_alleleMatrices_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   variantDbId   IdAttribute of the root model to be updated
     * @param {Array}   alleleMatrices_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_alleleMatrices_IDs(variantDbId, alleleMatrices_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            alleleMatrices_IDs.forEach(idx => {
                promises.push(models.allelematrix.remove_variants_IDs(idx, [`${variantDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(variantDbId);
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
     * @param {Id}   variantDbId   IdAttribute of the root model to be updated
     * @param {Array}   calls_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_calls_IDs(variantDbId, calls_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            calls_IDs.forEach(idx => {
                promises.push(models.call.remove_variant_ID(idx, variantDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(variantDbId);
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
     * @param {Id}   variantDbId   IdAttribute of the root model to be updated
     * @param {Array}   externalReferences_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_externalReferences_IDs(variantDbId, externalReferences_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            externalReferences_IDs.forEach(idx => {
                promises.push(models.externalreference.remove_variant_ID(idx, variantDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(variantDbId);
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
        return variant.definition.id.name;
    }

    /**
     * idAttributeType - Return the Type of the internalId.
     *
     * @return {type} Type given in the JSON model
     */
    static idAttributeType() {
        return variant.definition.id.type;
    }

    /**
     * getIdValue - Get the value of the idAttribute ("id", or "internalId") for an instance of variant.
     *
     * @return {type} id value
     */
    getIdValue() {
        return this[variant.idAttribute()];
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
     * base64Encode - Encode  variant to a base 64 String
     *
     * @return {string} The variant object, encoded in a base 64 String
     */
    base64Encode() {
        return Buffer.from(JSON.stringify(this.stripAssociations())).toString(
            "base64"
        );
    }

    /**
     * asCursor - alias method for base64Encode
     *
     * @return {string} The variant object, encoded in a base 64 String
     */
    asCursor() {
        return this.base64Encode()
    }

    /**
     * stripAssociations - Instance method for getting all attributes of variant.
     *
     * @return {object} The attributes of variant in object form
     */
    stripAssociations() {
        let attributes = Object.keys(variant.definition.attributes);
        let data_values = _.pick(this, attributes);
        return data_values;
    }

    /**
     * externalIdsArray - Get all attributes of variant that are marked as external IDs.
     *
     * @return {Array<String>} An array of all attributes of variant that are marked as external IDs
     */
    static externalIdsArray() {
        let externalIds = [];
        if (definition.externalIds) {
            externalIds = definition.externalIds;
        }

        return externalIds;
    }

    /**
     * externalIdsObject - Get all external IDs of variant.
     *
     * @return {object} An object that has the names of the external IDs as keys and their types as values
     */
    static externalIdsObject() {
        return {};
    }

}