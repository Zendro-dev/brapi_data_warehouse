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
    "model": "location",
    "storageType": "sql",
    "attributes": {
        "abbreviation": "String",
        "additionalInfo_IDs": "[ String ]",
        "coordinateDescription": "String",
        "coordinateUncertainty": "String",
        "coordinates_ID": "String",
        "countryCode": "String",
        "countryName": "String",
        "documentationURL": "String",
        "environmentType": "String",
        "exposure": "String",
        "externalReferences_IDs": "[ String ]",
        "instituteAddress": "String",
        "instituteName": "String",
        "locationDbId": "[ String ]",
        "locationName": "String",
        "locationType": "String",
        "parentLocation_ID": "String",
        "childLocations_IDs": "[ String ]",
        "studies_IDs": "[ String ]",
        "siteStatus": "String",
        "slope": "String",
        "topography": "String",
        "seedLots_IDs": "[ String ]",
        "observationUnits_IDs": "[ String ]"
    },
    "associations": {
        "additionalInfo": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "location",
            "target": "additionalinfo",
            "targetKey": "location_ID",
            "sourceKey": "additionalInfo_IDs",
            "keysIn": "location",
            "targetStorageType": "sql"
        },
        "coordinates": {
            "type": "one_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "location",
            "target": "coordinate",
            "targetKey": "location_ID",
            "sourceKey": "coordinates_ID",
            "keysIn": "location",
            "targetStorageType": "sql"
        },
        "externalReferences": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "location",
            "target": "externalreference",
            "targetKey": "location_ID",
            "sourceKey": "externalReferences_IDs",
            "keysIn": "location",
            "targetStorageType": "sql"
        },
        "parentLocation": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "childLocations",
            "target": "location",
            "targetKey": "childLocations_IDs",
            "sourceKey": "parentLocation_ID",
            "keysIn": "location",
            "targetStorageType": "sql"
        },
        "childLocations": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "parentLocation",
            "target": "location",
            "targetKey": "parentLocation_ID",
            "sourceKey": "childLocations_IDs",
            "keysIn": "location",
            "targetStorageType": "sql"
        },
        "studies": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "location",
            "target": "study",
            "targetKey": "location_ID",
            "sourceKey": "studies_IDs",
            "keysIn": "location",
            "targetStorageType": "sql"
        },
        "seedLots": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "location",
            "target": "seedlot",
            "targetKey": "location_ID",
            "sourceKey": "seedLots_IDs",
            "keysIn": "location",
            "targetStorageType": "sql"
        },
        "observationUnits": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "location",
            "target": "observationunit",
            "targetKey": "location_ID",
            "sourceKey": "observationUnits_IDs",
            "keysIn": "location",
            "targetStorageType": "sql"
        }
    },
    "internalId": "locationDbId",
    "id": {
        "name": "locationDbId",
        "type": "[String]"
    }
};
const DataLoader = require("dataloader");

/**
 * module - Creates a sequelize model
 */

module.exports = class location extends Sequelize.Model {
    /**
     * Initialize sequelize model.
     * @param  {object} sequelize Sequelize instance.
     * @param  {object} DataTypes Allowed sequelize data types.
     * @return {object}           Sequelize model with associations defined
     */
    static init(sequelize, DataTypes) {
        return super.init({

            locationDbId: {
                type: Sequelize[dict['[String]']],
                primaryKey: true
            },
            abbreviation: {
                type: Sequelize[dict['String']]
            },
            additionalInfo_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            coordinateDescription: {
                type: Sequelize[dict['String']]
            },
            coordinateUncertainty: {
                type: Sequelize[dict['String']]
            },
            coordinates_ID: {
                type: Sequelize[dict['String']]
            },
            countryCode: {
                type: Sequelize[dict['String']]
            },
            countryName: {
                type: Sequelize[dict['String']]
            },
            documentationURL: {
                type: Sequelize[dict['String']]
            },
            environmentType: {
                type: Sequelize[dict['String']]
            },
            exposure: {
                type: Sequelize[dict['String']]
            },
            externalReferences_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            instituteAddress: {
                type: Sequelize[dict['String']]
            },
            instituteName: {
                type: Sequelize[dict['String']]
            },
            locationName: {
                type: Sequelize[dict['String']]
            },
            locationType: {
                type: Sequelize[dict['String']]
            },
            parentLocation_ID: {
                type: Sequelize[dict['String']]
            },
            childLocations_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            studies_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            siteStatus: {
                type: Sequelize[dict['String']]
            },
            slope: {
                type: Sequelize[dict['String']]
            },
            topography: {
                type: Sequelize[dict['String']]
            },
            seedLots_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            observationUnits_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            }


        }, {
            modelName: "location",
            tableName: "locations",
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
            field: location.idAttribute(),
            value: keys.join(),
            valueType: "Array",
        };
        let cursorRes = await location.readAllCursor(queryArg);
        cursorRes = cursorRes.locations.reduce(
            (map, obj) => ((map[obj[location.idAttribute()]] = obj), map), {}
        );
        return keys.map(
            (key) =>
            cursorRes[key] || new Error(`Record with ID = "${key}" does not exist`)
        );
    }

    static readByIdLoader = new DataLoader(location.batchReadById, {
        cache: false,
    });

    /**
     * readById - The model implementation for reading a single record given by its ID
     *
     * Read a single record by a given ID
     * @param {string} id - The ID of the requested record
     * @return {object} The requested record as an object with the type location, or an error object if the validation after reading fails
     * @throws {Error} If the requested record does not exist
     */
    static async readById(id) {
        return await location.readByIdLoader.load(id);
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
        options['where'] = helper.searchConditionsToSequelize(search, location.definition.attributes);
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
        let options = helper.buildLimitOffsetSequelizeOptions(search, order, pagination, this.idAttribute(), location.definition.attributes);
        let records = await super.findAll(options);
        records = records.map(x => location.postReadCast(x))
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
        let options = helper.buildCursorBasedSequelizeOptions(search, order, pagination, this.idAttribute(), location.definition.attributes);
        let records = await super.findAll(options);

        records = records.map(x => location.postReadCast(x))

        // validationCheck after read
        records = await validatorUtil.bulkValidateData('validateAfterRead', this, records, benignErrorReporter);
        // get the first record (if exists) in the opposite direction to determine pageInfo.
        // if no cursor was given there is no need for an extra query as the results will start at the first (or last) page.
        let oppRecords = [];
        if (pagination && (pagination.after || pagination.before)) {
            let oppOptions = helper.buildOppositeSearchSequelize(search, order, {
                ...pagination,
                includeCursor: false
            }, this.idAttribute(), location.definition.attributes);
            oppRecords = await super.findAll(oppOptions);
        }
        // build the graphql Connection Object
        let edges = helper.buildEdgeObject(records);
        let pageInfo = helper.buildPageInfo(edges, oppRecords, pagination);
        return {
            edges,
            pageInfo,
            locations: edges.map((edge) => edge.node)
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
        input = location.preWriteCast(input)
        try {
            const result = await this.sequelize.transaction(async (t) => {
                let item = await super.create(input, {
                    transaction: t
                });
                return item;
            });
            location.postReadCast(result.dataValues)
            location.postReadCast(result._previousDataValues)
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
        input = location.preWriteCast(input)
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
            location.postReadCast(result.dataValues)
            location.postReadCast(result._previousDataValues)
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
     * add_coordinates_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   locationDbId   IdAttribute of the root model to be updated
     * @param {Id}   coordinates_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_coordinates_ID(locationDbId, coordinates_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.coordinate.add_location_ID(coordinates_ID, locationDbId, benignErrorReporter, token, false);
            }
            let updated = await location.update({
                coordinates_ID: coordinates_ID
            }, {
                where: {
                    locationDbId: locationDbId
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
     * add_parentLocation_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   locationDbId   IdAttribute of the root model to be updated
     * @param {Id}   parentLocation_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_parentLocation_ID(locationDbId, parentLocation_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.location.add_childLocations_IDs(parentLocation_ID, [`${locationDbId}`], benignErrorReporter, token, false);
            }
            let updated = await location.update({
                parentLocation_ID: parentLocation_ID
            }, {
                where: {
                    locationDbId: locationDbId
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
     * @param {Id}   locationDbId   IdAttribute of the root model to be updated
     * @param {Array}   additionalInfo_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_additionalInfo_IDs(locationDbId, additionalInfo_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            additionalInfo_IDs.forEach(idx => {
                promises.push(models.additionalinfo.add_location_ID(idx, locationDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(locationDbId);
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
     * @param {Id}   locationDbId   IdAttribute of the root model to be updated
     * @param {Array}   externalReferences_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_externalReferences_IDs(locationDbId, externalReferences_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            externalReferences_IDs.forEach(idx => {
                promises.push(models.externalreference.add_location_ID(idx, locationDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(locationDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.externalReferences_IDs), externalReferences_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                externalReferences_IDs: updated_ids
            });
        }
    }
    /**
     * add_childLocations_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   locationDbId   IdAttribute of the root model to be updated
     * @param {Array}   childLocations_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_childLocations_IDs(locationDbId, childLocations_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            childLocations_IDs.forEach(idx => {
                promises.push(models.location.add_parentLocation_ID(idx, locationDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(locationDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.childLocations_IDs), childLocations_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                childLocations_IDs: updated_ids
            });
        }
    }
    /**
     * add_studies_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   locationDbId   IdAttribute of the root model to be updated
     * @param {Array}   studies_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_studies_IDs(locationDbId, studies_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            studies_IDs.forEach(idx => {
                promises.push(models.study.add_location_ID(idx, locationDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(locationDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.studies_IDs), studies_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                studies_IDs: updated_ids
            });
        }
    }
    /**
     * add_seedLots_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   locationDbId   IdAttribute of the root model to be updated
     * @param {Array}   seedLots_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_seedLots_IDs(locationDbId, seedLots_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            seedLots_IDs.forEach(idx => {
                promises.push(models.seedlot.add_location_ID(idx, locationDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(locationDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.seedLots_IDs), seedLots_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                seedLots_IDs: updated_ids
            });
        }
    }
    /**
     * add_observationUnits_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   locationDbId   IdAttribute of the root model to be updated
     * @param {Array}   observationUnits_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_observationUnits_IDs(locationDbId, observationUnits_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            observationUnits_IDs.forEach(idx => {
                promises.push(models.observationunit.add_location_ID(idx, locationDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(locationDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.observationUnits_IDs), observationUnits_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                observationUnits_IDs: updated_ids
            });
        }
    }

    /**
     * remove_coordinates_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   locationDbId   IdAttribute of the root model to be updated
     * @param {Id}   coordinates_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_coordinates_ID(locationDbId, coordinates_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.coordinate.remove_location_ID(coordinates_ID, locationDbId, benignErrorReporter, token, false);
            }
            let updated = await location.update({
                coordinates_ID: null
            }, {
                where: {
                    locationDbId: locationDbId,
                    coordinates_ID: coordinates_ID
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
     * remove_parentLocation_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   locationDbId   IdAttribute of the root model to be updated
     * @param {Id}   parentLocation_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_parentLocation_ID(locationDbId, parentLocation_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.location.remove_childLocations_IDs(parentLocation_ID, [`${locationDbId}`], benignErrorReporter, token, false);
            }
            let updated = await location.update({
                parentLocation_ID: null
            }, {
                where: {
                    locationDbId: locationDbId,
                    parentLocation_ID: parentLocation_ID
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
     * @param {Id}   locationDbId   IdAttribute of the root model to be updated
     * @param {Array}   additionalInfo_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_additionalInfo_IDs(locationDbId, additionalInfo_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            additionalInfo_IDs.forEach(idx => {
                promises.push(models.additionalinfo.remove_location_ID(idx, locationDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(locationDbId);
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
     * @param {Id}   locationDbId   IdAttribute of the root model to be updated
     * @param {Array}   externalReferences_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_externalReferences_IDs(locationDbId, externalReferences_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            externalReferences_IDs.forEach(idx => {
                promises.push(models.externalreference.remove_location_ID(idx, locationDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(locationDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.externalReferences_IDs), externalReferences_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                externalReferences_IDs: updated_ids
            });
        }
    }
    /**
     * remove_childLocations_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   locationDbId   IdAttribute of the root model to be updated
     * @param {Array}   childLocations_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_childLocations_IDs(locationDbId, childLocations_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            childLocations_IDs.forEach(idx => {
                promises.push(models.location.remove_parentLocation_ID(idx, locationDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(locationDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.childLocations_IDs), childLocations_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                childLocations_IDs: updated_ids
            });
        }
    }
    /**
     * remove_studies_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   locationDbId   IdAttribute of the root model to be updated
     * @param {Array}   studies_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_studies_IDs(locationDbId, studies_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            studies_IDs.forEach(idx => {
                promises.push(models.study.remove_location_ID(idx, locationDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(locationDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.studies_IDs), studies_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                studies_IDs: updated_ids
            });
        }
    }
    /**
     * remove_seedLots_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   locationDbId   IdAttribute of the root model to be updated
     * @param {Array}   seedLots_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_seedLots_IDs(locationDbId, seedLots_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            seedLots_IDs.forEach(idx => {
                promises.push(models.seedlot.remove_location_ID(idx, locationDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(locationDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.seedLots_IDs), seedLots_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                seedLots_IDs: updated_ids
            });
        }
    }
    /**
     * remove_observationUnits_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   locationDbId   IdAttribute of the root model to be updated
     * @param {Array}   observationUnits_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_observationUnits_IDs(locationDbId, observationUnits_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            observationUnits_IDs.forEach(idx => {
                promises.push(models.observationunit.remove_location_ID(idx, locationDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(locationDbId);
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
        return location.definition.id.name;
    }

    /**
     * idAttributeType - Return the Type of the internalId.
     *
     * @return {type} Type given in the JSON model
     */
    static idAttributeType() {
        return location.definition.id.type;
    }

    /**
     * getIdValue - Get the value of the idAttribute ("id", or "internalId") for an instance of location.
     *
     * @return {type} id value
     */
    getIdValue() {
        return this[location.idAttribute()];
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
     * base64Encode - Encode  location to a base 64 String
     *
     * @return {string} The location object, encoded in a base 64 String
     */
    base64Encode() {
        return Buffer.from(JSON.stringify(this.stripAssociations())).toString(
            "base64"
        );
    }

    /**
     * asCursor - alias method for base64Encode
     *
     * @return {string} The location object, encoded in a base 64 String
     */
    asCursor() {
        return this.base64Encode()
    }

    /**
     * stripAssociations - Instance method for getting all attributes of location.
     *
     * @return {object} The attributes of location in object form
     */
    stripAssociations() {
        let attributes = Object.keys(location.definition.attributes);
        let data_values = _.pick(this, attributes);
        return data_values;
    }

    /**
     * externalIdsArray - Get all attributes of location that are marked as external IDs.
     *
     * @return {Array<String>} An array of all attributes of location that are marked as external IDs
     */
    static externalIdsArray() {
        let externalIds = [];
        if (definition.externalIds) {
            externalIds = definition.externalIds;
        }

        return externalIds;
    }

    /**
     * externalIdsObject - Get all external IDs of location.
     *
     * @return {object} An object that has the names of the external IDs as keys and their types as values
     */
    static externalIdsObject() {
        return {};
    }

}