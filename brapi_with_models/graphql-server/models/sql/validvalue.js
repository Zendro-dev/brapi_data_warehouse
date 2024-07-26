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
    "model": "validvalue",
    "storageType": "sql",
    "attributes": {
        "validValueDbId": "[ String ]",
        "maximumValue": "String",
        "minimumValue": "String",
        "categories_IDs": "[ String ]",
        "scales_IDs": "[ String ]"
    },
    "associations": {
        "categories": {
            "type": "many_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "validValues",
            "target": "category",
            "targetKey": "validValues_IDs",
            "sourceKey": "categories_IDs",
            "keysIn": "validvalue",
            "targetStorageType": "sql"
        },
        "scales": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "validValues",
            "target": "scale",
            "targetKey": "validValues_ID",
            "sourceKey": "scales_IDs",
            "keysIn": "validvalue",
            "targetStorageType": "sql"
        }
    },
    "internalId": "validValueDbId",
    "id": {
        "name": "validValueDbId",
        "type": "[String]"
    }
};
const DataLoader = require("dataloader");

/**
 * module - Creates a sequelize model
 */

module.exports = class validvalue extends Sequelize.Model {
    /**
     * Initialize sequelize model.
     * @param  {object} sequelize Sequelize instance.
     * @param  {object} DataTypes Allowed sequelize data types.
     * @return {object}           Sequelize model with associations defined
     */
    static init(sequelize, DataTypes) {
        return super.init({

            validValueDbId: {
                type: Sequelize[dict['[String]']],
                primaryKey: true
            },
            maximumValue: {
                type: Sequelize[dict['String']]
            },
            minimumValue: {
                type: Sequelize[dict['String']]
            },
            categories_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            scales_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            }


        }, {
            modelName: "validvalue",
            tableName: "validvalues",
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
            field: validvalue.idAttribute(),
            value: keys.join(),
            valueType: "Array",
        };
        let cursorRes = await validvalue.readAllCursor(queryArg);
        cursorRes = cursorRes.validvalues.reduce(
            (map, obj) => ((map[obj[validvalue.idAttribute()]] = obj), map), {}
        );
        return keys.map(
            (key) =>
            cursorRes[key] || new Error(`Record with ID = "${key}" does not exist`)
        );
    }

    static readByIdLoader = new DataLoader(validvalue.batchReadById, {
        cache: false,
    });

    /**
     * readById - The model implementation for reading a single record given by its ID
     *
     * Read a single record by a given ID
     * @param {string} id - The ID of the requested record
     * @return {object} The requested record as an object with the type validvalue, or an error object if the validation after reading fails
     * @throws {Error} If the requested record does not exist
     */
    static async readById(id) {
        return await validvalue.readByIdLoader.load(id);
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
        options['where'] = helper.searchConditionsToSequelize(search, validvalue.definition.attributes);
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
        let options = helper.buildLimitOffsetSequelizeOptions(search, order, pagination, this.idAttribute(), validvalue.definition.attributes);
        let records = await super.findAll(options);
        records = records.map(x => validvalue.postReadCast(x))
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
        let options = helper.buildCursorBasedSequelizeOptions(search, order, pagination, this.idAttribute(), validvalue.definition.attributes);
        let records = await super.findAll(options);

        records = records.map(x => validvalue.postReadCast(x))

        // validationCheck after read
        records = await validatorUtil.bulkValidateData('validateAfterRead', this, records, benignErrorReporter);
        // get the first record (if exists) in the opposite direction to determine pageInfo.
        // if no cursor was given there is no need for an extra query as the results will start at the first (or last) page.
        let oppRecords = [];
        if (pagination && (pagination.after || pagination.before)) {
            let oppOptions = helper.buildOppositeSearchSequelize(search, order, {
                ...pagination,
                includeCursor: false
            }, this.idAttribute(), validvalue.definition.attributes);
            oppRecords = await super.findAll(oppOptions);
        }
        // build the graphql Connection Object
        let edges = helper.buildEdgeObject(records);
        let pageInfo = helper.buildPageInfo(edges, oppRecords, pagination);
        return {
            edges,
            pageInfo,
            validvalues: edges.map((edge) => edge.node)
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
        input = validvalue.preWriteCast(input)
        try {
            const result = await this.sequelize.transaction(async (t) => {
                let item = await super.create(input, {
                    transaction: t
                });
                return item;
            });
            validvalue.postReadCast(result.dataValues)
            validvalue.postReadCast(result._previousDataValues)
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
        input = validvalue.preWriteCast(input)
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
            validvalue.postReadCast(result.dataValues)
            validvalue.postReadCast(result._previousDataValues)
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
     * add_categories_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   validValueDbId   IdAttribute of the root model to be updated
     * @param {Array}   categories_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_categories_IDs(validValueDbId, categories_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            categories_IDs.forEach(idx => {
                promises.push(models.category.add_validValues_IDs(idx, [`${validValueDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(validValueDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.categories_IDs), categories_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                categories_IDs: updated_ids
            });
        }
    }
    /**
     * add_scales_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   validValueDbId   IdAttribute of the root model to be updated
     * @param {Array}   scales_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_scales_IDs(validValueDbId, scales_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            scales_IDs.forEach(idx => {
                promises.push(models.scale.add_validValues_ID(idx, validValueDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(validValueDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.scales_IDs), scales_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                scales_IDs: updated_ids
            });
        }
    }

    /**
     * remove_categories_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   validValueDbId   IdAttribute of the root model to be updated
     * @param {Array}   categories_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_categories_IDs(validValueDbId, categories_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            categories_IDs.forEach(idx => {
                promises.push(models.category.remove_validValues_IDs(idx, [`${validValueDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(validValueDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.categories_IDs), categories_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                categories_IDs: updated_ids
            });
        }
    }
    /**
     * remove_scales_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   validValueDbId   IdAttribute of the root model to be updated
     * @param {Array}   scales_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_scales_IDs(validValueDbId, scales_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            scales_IDs.forEach(idx => {
                promises.push(models.scale.remove_validValues_ID(idx, validValueDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(validValueDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.scales_IDs), scales_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                scales_IDs: updated_ids
            });
        }
    }








    /**
     * idAttribute - Check whether an attribute "internalId" is given in the JSON model. If not the standard "id" is used instead.
     *
     * @return {type} Name of the attribute that functions as an internalId
     */
    static idAttribute() {
        return validvalue.definition.id.name;
    }

    /**
     * idAttributeType - Return the Type of the internalId.
     *
     * @return {type} Type given in the JSON model
     */
    static idAttributeType() {
        return validvalue.definition.id.type;
    }

    /**
     * getIdValue - Get the value of the idAttribute ("id", or "internalId") for an instance of validvalue.
     *
     * @return {type} id value
     */
    getIdValue() {
        return this[validvalue.idAttribute()];
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
     * base64Encode - Encode  validvalue to a base 64 String
     *
     * @return {string} The validvalue object, encoded in a base 64 String
     */
    base64Encode() {
        return Buffer.from(JSON.stringify(this.stripAssociations())).toString(
            "base64"
        );
    }

    /**
     * asCursor - alias method for base64Encode
     *
     * @return {string} The validvalue object, encoded in a base 64 String
     */
    asCursor() {
        return this.base64Encode()
    }

    /**
     * stripAssociations - Instance method for getting all attributes of validvalue.
     *
     * @return {object} The attributes of validvalue in object form
     */
    stripAssociations() {
        let attributes = Object.keys(validvalue.definition.attributes);
        let data_values = _.pick(this, attributes);
        return data_values;
    }

    /**
     * externalIdsArray - Get all attributes of validvalue that are marked as external IDs.
     *
     * @return {Array<String>} An array of all attributes of validvalue that are marked as external IDs
     */
    static externalIdsArray() {
        let externalIds = [];
        if (definition.externalIds) {
            externalIds = definition.externalIds;
        }

        return externalIds;
    }

    /**
     * externalIdsObject - Get all external IDs of validvalue.
     *
     * @return {object} An object that has the names of the external IDs as keys and their types as values
     */
    static externalIdsObject() {
        return {};
    }

}