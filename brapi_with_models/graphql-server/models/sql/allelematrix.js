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
    "model": "allelematrix",
    "storageType": "sql",
    "attributes": {
        "alleleMatrixDbId": "[ String ]",
        "callSets_IDs": "[ String ]",
        "dataMatrices_IDs": "[ String ]",
        "expandHomozygotes": "Boolean",
        "pagination_IDs": "[ String ]",
        "sepPhased": "String",
        "sepUnphased": "String",
        "unknownString": "String",
        "variantSets_IDs": "[ String ]",
        "variants_IDs": "[ String ]"
    },
    "associations": {
        "callSets": {
            "type": "many_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "alleleMatrices",
            "target": "callset",
            "targetKey": "alleleMatrices_IDs",
            "sourceKey": "callSets_IDs",
            "keysIn": "allelematrix",
            "targetStorageType": "sql"
        },
        "dataMatrices": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "alleleMatrices",
            "target": "datamatrix",
            "targetKey": "alleleMatrices_ID",
            "sourceKey": "dataMatrices_IDs",
            "keysIn": "allelematrix",
            "targetStorageType": "sql"
        },
        "pagination": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "alleleMatrices",
            "target": "pagination",
            "targetKey": "alleleMatrices_ID",
            "sourceKey": "pagination_IDs",
            "keysIn": "allelematrix",
            "targetStorageType": "sql"
        },
        "variantSets": {
            "type": "many_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "alleleMatrices",
            "target": "variantset",
            "targetKey": "alleleMatrices_IDs",
            "sourceKey": "variantSets_IDs",
            "keysIn": "allelematrix",
            "targetStorageType": "sql"
        },
        "variants": {
            "type": "many_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "alleleMatrices",
            "target": "variant",
            "targetKey": "alleleMatrices_IDs",
            "sourceKey": "variants_IDs",
            "keysIn": "allelematrix",
            "targetStorageType": "sql"
        }
    },
    "internalId": "alleleMatrixDbId",
    "id": {
        "name": "alleleMatrixDbId",
        "type": "[String]"
    }
};
const DataLoader = require("dataloader");

/**
 * module - Creates a sequelize model
 */

module.exports = class allelematrix extends Sequelize.Model {
    /**
     * Initialize sequelize model.
     * @param  {object} sequelize Sequelize instance.
     * @param  {object} DataTypes Allowed sequelize data types.
     * @return {object}           Sequelize model with associations defined
     */
    static init(sequelize, DataTypes) {
        return super.init({

            alleleMatrixDbId: {
                type: Sequelize[dict['[String]']],
                primaryKey: true
            },
            callSets_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            dataMatrices_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            expandHomozygotes: {
                type: Sequelize[dict['Boolean']]
            },
            pagination_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            sepPhased: {
                type: Sequelize[dict['String']]
            },
            sepUnphased: {
                type: Sequelize[dict['String']]
            },
            unknownString: {
                type: Sequelize[dict['String']]
            },
            variantSets_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            variants_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            }


        }, {
            modelName: "allelematrix",
            tableName: "allelematrices",
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
            field: allelematrix.idAttribute(),
            value: keys.join(),
            valueType: "Array",
        };
        let cursorRes = await allelematrix.readAllCursor(queryArg);
        cursorRes = cursorRes.allelematrices.reduce(
            (map, obj) => ((map[obj[allelematrix.idAttribute()]] = obj), map), {}
        );
        return keys.map(
            (key) =>
            cursorRes[key] || new Error(`Record with ID = "${key}" does not exist`)
        );
    }

    static readByIdLoader = new DataLoader(allelematrix.batchReadById, {
        cache: false,
    });

    /**
     * readById - The model implementation for reading a single record given by its ID
     *
     * Read a single record by a given ID
     * @param {string} id - The ID of the requested record
     * @return {object} The requested record as an object with the type allelematrix, or an error object if the validation after reading fails
     * @throws {Error} If the requested record does not exist
     */
    static async readById(id) {
        return await allelematrix.readByIdLoader.load(id);
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
        options['where'] = helper.searchConditionsToSequelize(search, allelematrix.definition.attributes);
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
        let options = helper.buildLimitOffsetSequelizeOptions(search, order, pagination, this.idAttribute(), allelematrix.definition.attributes);
        let records = await super.findAll(options);
        records = records.map(x => allelematrix.postReadCast(x))
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
        let options = helper.buildCursorBasedSequelizeOptions(search, order, pagination, this.idAttribute(), allelematrix.definition.attributes);
        let records = await super.findAll(options);

        records = records.map(x => allelematrix.postReadCast(x))

        // validationCheck after read
        records = await validatorUtil.bulkValidateData('validateAfterRead', this, records, benignErrorReporter);
        // get the first record (if exists) in the opposite direction to determine pageInfo.
        // if no cursor was given there is no need for an extra query as the results will start at the first (or last) page.
        let oppRecords = [];
        if (pagination && (pagination.after || pagination.before)) {
            let oppOptions = helper.buildOppositeSearchSequelize(search, order, {
                ...pagination,
                includeCursor: false
            }, this.idAttribute(), allelematrix.definition.attributes);
            oppRecords = await super.findAll(oppOptions);
        }
        // build the graphql Connection Object
        let edges = helper.buildEdgeObject(records);
        let pageInfo = helper.buildPageInfo(edges, oppRecords, pagination);
        return {
            edges,
            pageInfo,
            allelematrices: edges.map((edge) => edge.node)
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
        input = allelematrix.preWriteCast(input)
        try {
            const result = await this.sequelize.transaction(async (t) => {
                let item = await super.create(input, {
                    transaction: t
                });
                return item;
            });
            allelematrix.postReadCast(result.dataValues)
            allelematrix.postReadCast(result._previousDataValues)
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
        input = allelematrix.preWriteCast(input)
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
            allelematrix.postReadCast(result.dataValues)
            allelematrix.postReadCast(result._previousDataValues)
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
     * add_callSets_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   alleleMatrixDbId   IdAttribute of the root model to be updated
     * @param {Array}   callSets_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_callSets_IDs(alleleMatrixDbId, callSets_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            callSets_IDs.forEach(idx => {
                promises.push(models.callset.add_alleleMatrices_IDs(idx, [`${alleleMatrixDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(alleleMatrixDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.callSets_IDs), callSets_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                callSets_IDs: updated_ids
            });
        }
    }
    /**
     * add_dataMatrices_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   alleleMatrixDbId   IdAttribute of the root model to be updated
     * @param {Array}   dataMatrices_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_dataMatrices_IDs(alleleMatrixDbId, dataMatrices_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            dataMatrices_IDs.forEach(idx => {
                promises.push(models.datamatrix.add_alleleMatrices_ID(idx, alleleMatrixDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(alleleMatrixDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.dataMatrices_IDs), dataMatrices_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                dataMatrices_IDs: updated_ids
            });
        }
    }
    /**
     * add_pagination_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   alleleMatrixDbId   IdAttribute of the root model to be updated
     * @param {Array}   pagination_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_pagination_IDs(alleleMatrixDbId, pagination_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            pagination_IDs.forEach(idx => {
                promises.push(models.pagination.add_alleleMatrices_ID(idx, alleleMatrixDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(alleleMatrixDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.pagination_IDs), pagination_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                pagination_IDs: updated_ids
            });
        }
    }
    /**
     * add_variantSets_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   alleleMatrixDbId   IdAttribute of the root model to be updated
     * @param {Array}   variantSets_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_variantSets_IDs(alleleMatrixDbId, variantSets_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            variantSets_IDs.forEach(idx => {
                promises.push(models.variantset.add_alleleMatrices_IDs(idx, [`${alleleMatrixDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(alleleMatrixDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.variantSets_IDs), variantSets_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                variantSets_IDs: updated_ids
            });
        }
    }
    /**
     * add_variants_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   alleleMatrixDbId   IdAttribute of the root model to be updated
     * @param {Array}   variants_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_variants_IDs(alleleMatrixDbId, variants_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            variants_IDs.forEach(idx => {
                promises.push(models.variant.add_alleleMatrices_IDs(idx, [`${alleleMatrixDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(alleleMatrixDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.variants_IDs), variants_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                variants_IDs: updated_ids
            });
        }
    }

    /**
     * remove_callSets_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   alleleMatrixDbId   IdAttribute of the root model to be updated
     * @param {Array}   callSets_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_callSets_IDs(alleleMatrixDbId, callSets_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            callSets_IDs.forEach(idx => {
                promises.push(models.callset.remove_alleleMatrices_IDs(idx, [`${alleleMatrixDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(alleleMatrixDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.callSets_IDs), callSets_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                callSets_IDs: updated_ids
            });
        }
    }
    /**
     * remove_dataMatrices_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   alleleMatrixDbId   IdAttribute of the root model to be updated
     * @param {Array}   dataMatrices_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_dataMatrices_IDs(alleleMatrixDbId, dataMatrices_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            dataMatrices_IDs.forEach(idx => {
                promises.push(models.datamatrix.remove_alleleMatrices_ID(idx, alleleMatrixDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(alleleMatrixDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.dataMatrices_IDs), dataMatrices_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                dataMatrices_IDs: updated_ids
            });
        }
    }
    /**
     * remove_pagination_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   alleleMatrixDbId   IdAttribute of the root model to be updated
     * @param {Array}   pagination_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_pagination_IDs(alleleMatrixDbId, pagination_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            pagination_IDs.forEach(idx => {
                promises.push(models.pagination.remove_alleleMatrices_ID(idx, alleleMatrixDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(alleleMatrixDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.pagination_IDs), pagination_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                pagination_IDs: updated_ids
            });
        }
    }
    /**
     * remove_variantSets_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   alleleMatrixDbId   IdAttribute of the root model to be updated
     * @param {Array}   variantSets_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_variantSets_IDs(alleleMatrixDbId, variantSets_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            variantSets_IDs.forEach(idx => {
                promises.push(models.variantset.remove_alleleMatrices_IDs(idx, [`${alleleMatrixDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(alleleMatrixDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.variantSets_IDs), variantSets_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                variantSets_IDs: updated_ids
            });
        }
    }
    /**
     * remove_variants_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   alleleMatrixDbId   IdAttribute of the root model to be updated
     * @param {Array}   variants_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_variants_IDs(alleleMatrixDbId, variants_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            variants_IDs.forEach(idx => {
                promises.push(models.variant.remove_alleleMatrices_IDs(idx, [`${alleleMatrixDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(alleleMatrixDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.variants_IDs), variants_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                variants_IDs: updated_ids
            });
        }
    }








    /**
     * idAttribute - Check whether an attribute "internalId" is given in the JSON model. If not the standard "id" is used instead.
     *
     * @return {type} Name of the attribute that functions as an internalId
     */
    static idAttribute() {
        return allelematrix.definition.id.name;
    }

    /**
     * idAttributeType - Return the Type of the internalId.
     *
     * @return {type} Type given in the JSON model
     */
    static idAttributeType() {
        return allelematrix.definition.id.type;
    }

    /**
     * getIdValue - Get the value of the idAttribute ("id", or "internalId") for an instance of allelematrix.
     *
     * @return {type} id value
     */
    getIdValue() {
        return this[allelematrix.idAttribute()];
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
     * base64Encode - Encode  allelematrix to a base 64 String
     *
     * @return {string} The allelematrix object, encoded in a base 64 String
     */
    base64Encode() {
        return Buffer.from(JSON.stringify(this.stripAssociations())).toString(
            "base64"
        );
    }

    /**
     * asCursor - alias method for base64Encode
     *
     * @return {string} The allelematrix object, encoded in a base 64 String
     */
    asCursor() {
        return this.base64Encode()
    }

    /**
     * stripAssociations - Instance method for getting all attributes of allelematrix.
     *
     * @return {object} The attributes of allelematrix in object form
     */
    stripAssociations() {
        let attributes = Object.keys(allelematrix.definition.attributes);
        let data_values = _.pick(this, attributes);
        return data_values;
    }

    /**
     * externalIdsArray - Get all attributes of allelematrix that are marked as external IDs.
     *
     * @return {Array<String>} An array of all attributes of allelematrix that are marked as external IDs
     */
    static externalIdsArray() {
        let externalIds = [];
        if (definition.externalIds) {
            externalIds = definition.externalIds;
        }

        return externalIds;
    }

    /**
     * externalIdsObject - Get all external IDs of allelematrix.
     *
     * @return {object} An object that has the names of the external IDs as keys and their types as values
     */
    static externalIdsObject() {
        return {};
    }

}