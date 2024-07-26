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
    "model": "event",
    "storageType": "sql",
    "attributes": {
        "eventDbId": "[ String ]",
        "eventDescription": "String",
        "eventType": "String",
        "eventTypeDbId": "String",
        "observationUnits_IDs": "[ String ]",
        "study_IDs": "[ String ]",
        "additionalInfo_IDs": "[ String ]",
        "eventDateRange_ID": "String",
        "eventParameters_IDs": "[ String ]"
    },
    "associations": {
        "observationUnits": {
            "type": "many_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "events",
            "target": "observationunit",
            "targetKey": "events_IDs",
            "sourceKey": "observationUnits_IDs",
            "keysIn": "event",
            "targetStorageType": "sql"
        },
        "study": {
            "type": "many_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "events",
            "target": "study",
            "targetKey": "events_IDs",
            "sourceKey": "study_IDs",
            "keysIn": "event",
            "targetStorageType": "sql"
        },
        "additionalInfo": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "event",
            "target": "additionalinfo",
            "targetKey": "event_ID",
            "sourceKey": "additionalInfo_IDs",
            "keysIn": "event",
            "targetStorageType": "sql"
        },
        "eventDateRange": {
            "type": "one_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "event",
            "target": "eventdaterange",
            "targetKey": "event_ID",
            "sourceKey": "eventDateRange_ID",
            "keysIn": "event",
            "targetStorageType": "sql"
        },
        "eventParameters": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "event",
            "target": "eventparameter",
            "targetKey": "event_ID",
            "sourceKey": "eventParameters_IDs",
            "keysIn": "event",
            "targetStorageType": "sql"
        }
    },
    "internalId": "eventDbId",
    "id": {
        "name": "eventDbId",
        "type": "[String]"
    }
};
const DataLoader = require("dataloader");

/**
 * module - Creates a sequelize model
 */

module.exports = class event extends Sequelize.Model {
    /**
     * Initialize sequelize model.
     * @param  {object} sequelize Sequelize instance.
     * @param  {object} DataTypes Allowed sequelize data types.
     * @return {object}           Sequelize model with associations defined
     */
    static init(sequelize, DataTypes) {
        return super.init({

            eventDbId: {
                type: Sequelize[dict['[String]']],
                primaryKey: true
            },
            eventDescription: {
                type: Sequelize[dict['String']]
            },
            eventType: {
                type: Sequelize[dict['String']]
            },
            eventTypeDbId: {
                type: Sequelize[dict['String']]
            },
            observationUnits_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            study_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            additionalInfo_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            eventDateRange_ID: {
                type: Sequelize[dict['String']]
            },
            eventParameters_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            }


        }, {
            modelName: "event",
            tableName: "events",
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
            field: event.idAttribute(),
            value: keys.join(),
            valueType: "Array",
        };
        let cursorRes = await event.readAllCursor(queryArg);
        cursorRes = cursorRes.events.reduce(
            (map, obj) => ((map[obj[event.idAttribute()]] = obj), map), {}
        );
        return keys.map(
            (key) =>
            cursorRes[key] || new Error(`Record with ID = "${key}" does not exist`)
        );
    }

    static readByIdLoader = new DataLoader(event.batchReadById, {
        cache: false,
    });

    /**
     * readById - The model implementation for reading a single record given by its ID
     *
     * Read a single record by a given ID
     * @param {string} id - The ID of the requested record
     * @return {object} The requested record as an object with the type event, or an error object if the validation after reading fails
     * @throws {Error} If the requested record does not exist
     */
    static async readById(id) {
        return await event.readByIdLoader.load(id);
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
        options['where'] = helper.searchConditionsToSequelize(search, event.definition.attributes);
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
        let options = helper.buildLimitOffsetSequelizeOptions(search, order, pagination, this.idAttribute(), event.definition.attributes);
        let records = await super.findAll(options);
        records = records.map(x => event.postReadCast(x))
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
        let options = helper.buildCursorBasedSequelizeOptions(search, order, pagination, this.idAttribute(), event.definition.attributes);
        let records = await super.findAll(options);

        records = records.map(x => event.postReadCast(x))

        // validationCheck after read
        records = await validatorUtil.bulkValidateData('validateAfterRead', this, records, benignErrorReporter);
        // get the first record (if exists) in the opposite direction to determine pageInfo.
        // if no cursor was given there is no need for an extra query as the results will start at the first (or last) page.
        let oppRecords = [];
        if (pagination && (pagination.after || pagination.before)) {
            let oppOptions = helper.buildOppositeSearchSequelize(search, order, {
                ...pagination,
                includeCursor: false
            }, this.idAttribute(), event.definition.attributes);
            oppRecords = await super.findAll(oppOptions);
        }
        // build the graphql Connection Object
        let edges = helper.buildEdgeObject(records);
        let pageInfo = helper.buildPageInfo(edges, oppRecords, pagination);
        return {
            edges,
            pageInfo,
            events: edges.map((edge) => edge.node)
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
        input = event.preWriteCast(input)
        try {
            const result = await this.sequelize.transaction(async (t) => {
                let item = await super.create(input, {
                    transaction: t
                });
                return item;
            });
            event.postReadCast(result.dataValues)
            event.postReadCast(result._previousDataValues)
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
        input = event.preWriteCast(input)
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
            event.postReadCast(result.dataValues)
            event.postReadCast(result._previousDataValues)
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
     * add_eventDateRange_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   eventDbId   IdAttribute of the root model to be updated
     * @param {Id}   eventDateRange_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_eventDateRange_ID(eventDbId, eventDateRange_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.eventdaterange.add_event_ID(eventDateRange_ID, eventDbId, benignErrorReporter, token, false);
            }
            let updated = await event.update({
                eventDateRange_ID: eventDateRange_ID
            }, {
                where: {
                    eventDbId: eventDbId
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
     * add_observationUnits_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   eventDbId   IdAttribute of the root model to be updated
     * @param {Array}   observationUnits_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_observationUnits_IDs(eventDbId, observationUnits_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            observationUnits_IDs.forEach(idx => {
                promises.push(models.observationunit.add_events_IDs(idx, [`${eventDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(eventDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.observationUnits_IDs), observationUnits_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                observationUnits_IDs: updated_ids
            });
        }
    }
    /**
     * add_study_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   eventDbId   IdAttribute of the root model to be updated
     * @param {Array}   study_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_study_IDs(eventDbId, study_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            study_IDs.forEach(idx => {
                promises.push(models.study.add_events_IDs(idx, [`${eventDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(eventDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.study_IDs), study_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                study_IDs: updated_ids
            });
        }
    }
    /**
     * add_additionalInfo_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   eventDbId   IdAttribute of the root model to be updated
     * @param {Array}   additionalInfo_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_additionalInfo_IDs(eventDbId, additionalInfo_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            additionalInfo_IDs.forEach(idx => {
                promises.push(models.additionalinfo.add_event_ID(idx, eventDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(eventDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.additionalInfo_IDs), additionalInfo_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                additionalInfo_IDs: updated_ids
            });
        }
    }
    /**
     * add_eventParameters_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   eventDbId   IdAttribute of the root model to be updated
     * @param {Array}   eventParameters_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_eventParameters_IDs(eventDbId, eventParameters_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            eventParameters_IDs.forEach(idx => {
                promises.push(models.eventparameter.add_event_ID(idx, eventDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(eventDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.eventParameters_IDs), eventParameters_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                eventParameters_IDs: updated_ids
            });
        }
    }

    /**
     * remove_eventDateRange_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   eventDbId   IdAttribute of the root model to be updated
     * @param {Id}   eventDateRange_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_eventDateRange_ID(eventDbId, eventDateRange_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.eventdaterange.remove_event_ID(eventDateRange_ID, eventDbId, benignErrorReporter, token, false);
            }
            let updated = await event.update({
                eventDateRange_ID: null
            }, {
                where: {
                    eventDbId: eventDbId,
                    eventDateRange_ID: eventDateRange_ID
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
     * remove_observationUnits_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   eventDbId   IdAttribute of the root model to be updated
     * @param {Array}   observationUnits_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_observationUnits_IDs(eventDbId, observationUnits_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            observationUnits_IDs.forEach(idx => {
                promises.push(models.observationunit.remove_events_IDs(idx, [`${eventDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(eventDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.observationUnits_IDs), observationUnits_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                observationUnits_IDs: updated_ids
            });
        }
    }
    /**
     * remove_study_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   eventDbId   IdAttribute of the root model to be updated
     * @param {Array}   study_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_study_IDs(eventDbId, study_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            study_IDs.forEach(idx => {
                promises.push(models.study.remove_events_IDs(idx, [`${eventDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(eventDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.study_IDs), study_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                study_IDs: updated_ids
            });
        }
    }
    /**
     * remove_additionalInfo_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   eventDbId   IdAttribute of the root model to be updated
     * @param {Array}   additionalInfo_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_additionalInfo_IDs(eventDbId, additionalInfo_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            additionalInfo_IDs.forEach(idx => {
                promises.push(models.additionalinfo.remove_event_ID(idx, eventDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(eventDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.additionalInfo_IDs), additionalInfo_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                additionalInfo_IDs: updated_ids
            });
        }
    }
    /**
     * remove_eventParameters_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   eventDbId   IdAttribute of the root model to be updated
     * @param {Array}   eventParameters_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_eventParameters_IDs(eventDbId, eventParameters_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            eventParameters_IDs.forEach(idx => {
                promises.push(models.eventparameter.remove_event_ID(idx, eventDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(eventDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.eventParameters_IDs), eventParameters_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                eventParameters_IDs: updated_ids
            });
        }
    }








    /**
     * idAttribute - Check whether an attribute "internalId" is given in the JSON model. If not the standard "id" is used instead.
     *
     * @return {type} Name of the attribute that functions as an internalId
     */
    static idAttribute() {
        return event.definition.id.name;
    }

    /**
     * idAttributeType - Return the Type of the internalId.
     *
     * @return {type} Type given in the JSON model
     */
    static idAttributeType() {
        return event.definition.id.type;
    }

    /**
     * getIdValue - Get the value of the idAttribute ("id", or "internalId") for an instance of event.
     *
     * @return {type} id value
     */
    getIdValue() {
        return this[event.idAttribute()];
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
     * base64Encode - Encode  event to a base 64 String
     *
     * @return {string} The event object, encoded in a base 64 String
     */
    base64Encode() {
        return Buffer.from(JSON.stringify(this.stripAssociations())).toString(
            "base64"
        );
    }

    /**
     * asCursor - alias method for base64Encode
     *
     * @return {string} The event object, encoded in a base 64 String
     */
    asCursor() {
        return this.base64Encode()
    }

    /**
     * stripAssociations - Instance method for getting all attributes of event.
     *
     * @return {object} The attributes of event in object form
     */
    stripAssociations() {
        let attributes = Object.keys(event.definition.attributes);
        let data_values = _.pick(this, attributes);
        return data_values;
    }

    /**
     * externalIdsArray - Get all attributes of event that are marked as external IDs.
     *
     * @return {Array<String>} An array of all attributes of event that are marked as external IDs
     */
    static externalIdsArray() {
        let externalIds = [];
        if (definition.externalIds) {
            externalIds = definition.externalIds;
        }

        return externalIds;
    }

    /**
     * externalIdsObject - Get all external IDs of event.
     *
     * @return {object} An object that has the names of the external IDs as keys and their types as values
     */
    static externalIdsObject() {
        return {};
    }

}