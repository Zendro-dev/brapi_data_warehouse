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
    "model": "coordinate",
    "storageType": "sql",
    "attributes": {
        "coordinateDbId": "[ String ]",
        "geometry": "String",
        "type": "String",
        "germplasmOrigin_IDs": "[ String ]",
        "location_ID": "String",
        "observations_IDs": "[ String ]",
        "observationUnitPosition_IDs": "[ String ]"
    },
    "associations": {
        "germplasmOrigin": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "coordinates",
            "target": "germplasmorigin",
            "targetKey": "coordinates_ID",
            "sourceKey": "germplasmOrigin_IDs",
            "keysIn": "coordinate",
            "targetStorageType": "sql"
        },
        "location": {
            "type": "one_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "coordinates",
            "target": "location",
            "targetKey": "coordinates_ID",
            "sourceKey": "location_ID",
            "keysIn": "coordinate",
            "targetStorageType": "sql"
        },
        "observations": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "geoCoordinates",
            "target": "observation",
            "targetKey": "geoCoordinates_ID",
            "sourceKey": "observations_IDs",
            "keysIn": "coordinate",
            "targetStorageType": "sql"
        },
        "observationUnitPosition": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "geoCoordinates",
            "target": "observationunitposition",
            "targetKey": "geoCoordinates_ID",
            "sourceKey": "observationUnitPosition_IDs",
            "keysIn": "coordinate",
            "targetStorageType": "sql"
        }
    },
    "internalId": "coordinateDbId",
    "id": {
        "name": "coordinateDbId",
        "type": "[String]"
    }
};
const DataLoader = require("dataloader");

/**
 * module - Creates a sequelize model
 */

module.exports = class coordinate extends Sequelize.Model {
    /**
     * Initialize sequelize model.
     * @param  {object} sequelize Sequelize instance.
     * @param  {object} DataTypes Allowed sequelize data types.
     * @return {object}           Sequelize model with associations defined
     */
    static init(sequelize, DataTypes) {
        return super.init({

            coordinateDbId: {
                type: Sequelize[dict['[String]']],
                primaryKey: true
            },
            geometry: {
                type: Sequelize[dict['String']]
            },
            type: {
                type: Sequelize[dict['String']]
            },
            germplasmOrigin_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            location_ID: {
                type: Sequelize[dict['String']]
            },
            observations_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            observationUnitPosition_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            }


        }, {
            modelName: "coordinate",
            tableName: "coordinates",
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
            field: coordinate.idAttribute(),
            value: keys.join(),
            valueType: "Array",
        };
        let cursorRes = await coordinate.readAllCursor(queryArg);
        cursorRes = cursorRes.coordinates.reduce(
            (map, obj) => ((map[obj[coordinate.idAttribute()]] = obj), map), {}
        );
        return keys.map(
            (key) =>
            cursorRes[key] || new Error(`Record with ID = "${key}" does not exist`)
        );
    }

    static readByIdLoader = new DataLoader(coordinate.batchReadById, {
        cache: false,
    });

    /**
     * readById - The model implementation for reading a single record given by its ID
     *
     * Read a single record by a given ID
     * @param {string} id - The ID of the requested record
     * @return {object} The requested record as an object with the type coordinate, or an error object if the validation after reading fails
     * @throws {Error} If the requested record does not exist
     */
    static async readById(id) {
        return await coordinate.readByIdLoader.load(id);
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
        options['where'] = helper.searchConditionsToSequelize(search, coordinate.definition.attributes);
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
        let options = helper.buildLimitOffsetSequelizeOptions(search, order, pagination, this.idAttribute(), coordinate.definition.attributes);
        let records = await super.findAll(options);
        records = records.map(x => coordinate.postReadCast(x))
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
        let options = helper.buildCursorBasedSequelizeOptions(search, order, pagination, this.idAttribute(), coordinate.definition.attributes);
        let records = await super.findAll(options);

        records = records.map(x => coordinate.postReadCast(x))

        // validationCheck after read
        records = await validatorUtil.bulkValidateData('validateAfterRead', this, records, benignErrorReporter);
        // get the first record (if exists) in the opposite direction to determine pageInfo.
        // if no cursor was given there is no need for an extra query as the results will start at the first (or last) page.
        let oppRecords = [];
        if (pagination && (pagination.after || pagination.before)) {
            let oppOptions = helper.buildOppositeSearchSequelize(search, order, {
                ...pagination,
                includeCursor: false
            }, this.idAttribute(), coordinate.definition.attributes);
            oppRecords = await super.findAll(oppOptions);
        }
        // build the graphql Connection Object
        let edges = helper.buildEdgeObject(records);
        let pageInfo = helper.buildPageInfo(edges, oppRecords, pagination);
        return {
            edges,
            pageInfo,
            coordinates: edges.map((edge) => edge.node)
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
        input = coordinate.preWriteCast(input)
        try {
            const result = await this.sequelize.transaction(async (t) => {
                let item = await super.create(input, {
                    transaction: t
                });
                return item;
            });
            coordinate.postReadCast(result.dataValues)
            coordinate.postReadCast(result._previousDataValues)
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
        input = coordinate.preWriteCast(input)
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
            coordinate.postReadCast(result.dataValues)
            coordinate.postReadCast(result._previousDataValues)
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
     * add_location_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   coordinateDbId   IdAttribute of the root model to be updated
     * @param {Id}   location_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_location_ID(coordinateDbId, location_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.location.add_coordinates_ID(location_ID, coordinateDbId, benignErrorReporter, token, false);
            }
            let updated = await coordinate.update({
                location_ID: location_ID
            }, {
                where: {
                    coordinateDbId: coordinateDbId
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
     * add_germplasmOrigin_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   coordinateDbId   IdAttribute of the root model to be updated
     * @param {Array}   germplasmOrigin_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_germplasmOrigin_IDs(coordinateDbId, germplasmOrigin_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            germplasmOrigin_IDs.forEach(idx => {
                promises.push(models.germplasmorigin.add_coordinates_ID(idx, coordinateDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(coordinateDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.germplasmOrigin_IDs), germplasmOrigin_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                germplasmOrigin_IDs: updated_ids
            });
        }
    }
    /**
     * add_observations_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   coordinateDbId   IdAttribute of the root model to be updated
     * @param {Array}   observations_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_observations_IDs(coordinateDbId, observations_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            observations_IDs.forEach(idx => {
                promises.push(models.observation.add_geoCoordinates_ID(idx, coordinateDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(coordinateDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.observations_IDs), observations_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                observations_IDs: updated_ids
            });
        }
    }
    /**
     * add_observationUnitPosition_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   coordinateDbId   IdAttribute of the root model to be updated
     * @param {Array}   observationUnitPosition_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_observationUnitPosition_IDs(coordinateDbId, observationUnitPosition_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            observationUnitPosition_IDs.forEach(idx => {
                promises.push(models.observationunitposition.add_geoCoordinates_ID(idx, coordinateDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(coordinateDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.observationUnitPosition_IDs), observationUnitPosition_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                observationUnitPosition_IDs: updated_ids
            });
        }
    }

    /**
     * remove_location_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   coordinateDbId   IdAttribute of the root model to be updated
     * @param {Id}   location_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_location_ID(coordinateDbId, location_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.location.remove_coordinates_ID(location_ID, coordinateDbId, benignErrorReporter, token, false);
            }
            let updated = await coordinate.update({
                location_ID: null
            }, {
                where: {
                    coordinateDbId: coordinateDbId,
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
     * remove_germplasmOrigin_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   coordinateDbId   IdAttribute of the root model to be updated
     * @param {Array}   germplasmOrigin_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_germplasmOrigin_IDs(coordinateDbId, germplasmOrigin_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            germplasmOrigin_IDs.forEach(idx => {
                promises.push(models.germplasmorigin.remove_coordinates_ID(idx, coordinateDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(coordinateDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.germplasmOrigin_IDs), germplasmOrigin_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                germplasmOrigin_IDs: updated_ids
            });
        }
    }
    /**
     * remove_observations_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   coordinateDbId   IdAttribute of the root model to be updated
     * @param {Array}   observations_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_observations_IDs(coordinateDbId, observations_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            observations_IDs.forEach(idx => {
                promises.push(models.observation.remove_geoCoordinates_ID(idx, coordinateDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(coordinateDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.observations_IDs), observations_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                observations_IDs: updated_ids
            });
        }
    }
    /**
     * remove_observationUnitPosition_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   coordinateDbId   IdAttribute of the root model to be updated
     * @param {Array}   observationUnitPosition_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_observationUnitPosition_IDs(coordinateDbId, observationUnitPosition_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            observationUnitPosition_IDs.forEach(idx => {
                promises.push(models.observationunitposition.remove_geoCoordinates_ID(idx, coordinateDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(coordinateDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.observationUnitPosition_IDs), observationUnitPosition_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                observationUnitPosition_IDs: updated_ids
            });
        }
    }








    /**
     * idAttribute - Check whether an attribute "internalId" is given in the JSON model. If not the standard "id" is used instead.
     *
     * @return {type} Name of the attribute that functions as an internalId
     */
    static idAttribute() {
        return coordinate.definition.id.name;
    }

    /**
     * idAttributeType - Return the Type of the internalId.
     *
     * @return {type} Type given in the JSON model
     */
    static idAttributeType() {
        return coordinate.definition.id.type;
    }

    /**
     * getIdValue - Get the value of the idAttribute ("id", or "internalId") for an instance of coordinate.
     *
     * @return {type} id value
     */
    getIdValue() {
        return this[coordinate.idAttribute()];
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
     * base64Encode - Encode  coordinate to a base 64 String
     *
     * @return {string} The coordinate object, encoded in a base 64 String
     */
    base64Encode() {
        return Buffer.from(JSON.stringify(this.stripAssociations())).toString(
            "base64"
        );
    }

    /**
     * asCursor - alias method for base64Encode
     *
     * @return {string} The coordinate object, encoded in a base 64 String
     */
    asCursor() {
        return this.base64Encode()
    }

    /**
     * stripAssociations - Instance method for getting all attributes of coordinate.
     *
     * @return {object} The attributes of coordinate in object form
     */
    stripAssociations() {
        let attributes = Object.keys(coordinate.definition.attributes);
        let data_values = _.pick(this, attributes);
        return data_values;
    }

    /**
     * externalIdsArray - Get all attributes of coordinate that are marked as external IDs.
     *
     * @return {Array<String>} An array of all attributes of coordinate that are marked as external IDs
     */
    static externalIdsArray() {
        let externalIds = [];
        if (definition.externalIds) {
            externalIds = definition.externalIds;
        }

        return externalIds;
    }

    /**
     * externalIdsObject - Get all external IDs of coordinate.
     *
     * @return {object} An object that has the names of the external IDs as keys and their types as values
     */
    static externalIdsObject() {
        return {};
    }

}