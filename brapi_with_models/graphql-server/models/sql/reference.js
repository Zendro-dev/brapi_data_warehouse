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
    "model": "reference",
    "storageType": "sql",
    "attributes": {
        "additionalInfo_IDs": "[ String ]",
        "commonCropName": "String",
        "externalReferences_IDs": "[ String ]",
        "isDerived": "Boolean",
        "length": "Int",
        "md5checksum": "String",
        "referenceDbId": "[ String ]",
        "referenceName": "String",
        "referenceSet_ID": "String",
        "sourceAccessions": "[ String ]",
        "sourceDivergence": "Float",
        "sourceGermplasm_IDs": "[ String ]",
        "sourceURI": "String",
        "species_ID": "String",
        "variants_IDs": "[ String ]"
    },
    "associations": {
        "additionalInfo": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "reference",
            "target": "additionalinfo",
            "targetKey": "reference_ID",
            "sourceKey": "additionalInfo_IDs",
            "keysIn": "reference",
            "targetStorageType": "sql"
        },
        "externalReferences": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "reference",
            "target": "externalreference",
            "targetKey": "reference_ID",
            "sourceKey": "externalReferences_IDs",
            "keysIn": "reference",
            "targetStorageType": "sql"
        },
        "referenceSet": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "references",
            "target": "referenceset",
            "targetKey": "references_IDs",
            "sourceKey": "referenceSet_ID",
            "keysIn": "reference",
            "targetStorageType": "sql"
        },
        "sourceGermplasm": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "reference",
            "target": "sourcegermplasm",
            "targetKey": "reference_ID",
            "sourceKey": "sourceGermplasm_IDs",
            "keysIn": "reference",
            "targetStorageType": "sql"
        },
        "species": {
            "type": "one_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "reference",
            "target": "species",
            "targetKey": "reference_ID",
            "sourceKey": "species_ID",
            "keysIn": "reference",
            "targetStorageType": "sql"
        },
        "variants": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "reference",
            "target": "variant",
            "targetKey": "reference_ID",
            "sourceKey": "variants_IDs",
            "keysIn": "reference",
            "targetStorageType": "sql"
        }
    },
    "internalId": "referenceDbId",
    "id": {
        "name": "referenceDbId",
        "type": "[String]"
    }
};
const DataLoader = require("dataloader");

/**
 * module - Creates a sequelize model
 */

module.exports = class reference extends Sequelize.Model {
    /**
     * Initialize sequelize model.
     * @param  {object} sequelize Sequelize instance.
     * @param  {object} DataTypes Allowed sequelize data types.
     * @return {object}           Sequelize model with associations defined
     */
    static init(sequelize, DataTypes) {
        return super.init({

            referenceDbId: {
                type: Sequelize[dict['[String]']],
                primaryKey: true
            },
            additionalInfo_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            commonCropName: {
                type: Sequelize[dict['String']]
            },
            externalReferences_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            isDerived: {
                type: Sequelize[dict['Boolean']]
            },
            length: {
                type: Sequelize[dict['Int']]
            },
            md5checksum: {
                type: Sequelize[dict['String']]
            },
            referenceName: {
                type: Sequelize[dict['String']]
            },
            referenceSet_ID: {
                type: Sequelize[dict['String']]
            },
            sourceAccessions: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            sourceDivergence: {
                type: Sequelize[dict['Float']]
            },
            sourceGermplasm_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            sourceURI: {
                type: Sequelize[dict['String']]
            },
            species_ID: {
                type: Sequelize[dict['String']]
            },
            variants_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            }


        }, {
            modelName: "reference",
            tableName: "references",
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
            field: reference.idAttribute(),
            value: keys.join(),
            valueType: "Array",
        };
        let cursorRes = await reference.readAllCursor(queryArg);
        cursorRes = cursorRes.references.reduce(
            (map, obj) => ((map[obj[reference.idAttribute()]] = obj), map), {}
        );
        return keys.map(
            (key) =>
            cursorRes[key] || new Error(`Record with ID = "${key}" does not exist`)
        );
    }

    static readByIdLoader = new DataLoader(reference.batchReadById, {
        cache: false,
    });

    /**
     * readById - The model implementation for reading a single record given by its ID
     *
     * Read a single record by a given ID
     * @param {string} id - The ID of the requested record
     * @return {object} The requested record as an object with the type reference, or an error object if the validation after reading fails
     * @throws {Error} If the requested record does not exist
     */
    static async readById(id) {
        return await reference.readByIdLoader.load(id);
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
        options['where'] = helper.searchConditionsToSequelize(search, reference.definition.attributes);
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
        let options = helper.buildLimitOffsetSequelizeOptions(search, order, pagination, this.idAttribute(), reference.definition.attributes);
        let records = await super.findAll(options);
        records = records.map(x => reference.postReadCast(x))
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
        let options = helper.buildCursorBasedSequelizeOptions(search, order, pagination, this.idAttribute(), reference.definition.attributes);
        let records = await super.findAll(options);

        records = records.map(x => reference.postReadCast(x))

        // validationCheck after read
        records = await validatorUtil.bulkValidateData('validateAfterRead', this, records, benignErrorReporter);
        // get the first record (if exists) in the opposite direction to determine pageInfo.
        // if no cursor was given there is no need for an extra query as the results will start at the first (or last) page.
        let oppRecords = [];
        if (pagination && (pagination.after || pagination.before)) {
            let oppOptions = helper.buildOppositeSearchSequelize(search, order, {
                ...pagination,
                includeCursor: false
            }, this.idAttribute(), reference.definition.attributes);
            oppRecords = await super.findAll(oppOptions);
        }
        // build the graphql Connection Object
        let edges = helper.buildEdgeObject(records);
        let pageInfo = helper.buildPageInfo(edges, oppRecords, pagination);
        return {
            edges,
            pageInfo,
            references: edges.map((edge) => edge.node)
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
        input = reference.preWriteCast(input)
        try {
            const result = await this.sequelize.transaction(async (t) => {
                let item = await super.create(input, {
                    transaction: t
                });
                return item;
            });
            reference.postReadCast(result.dataValues)
            reference.postReadCast(result._previousDataValues)
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
        input = reference.preWriteCast(input)
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
            reference.postReadCast(result.dataValues)
            reference.postReadCast(result._previousDataValues)
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
     * add_referenceSet_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   referenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   referenceSet_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_referenceSet_ID(referenceDbId, referenceSet_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.referenceset.add_references_IDs(referenceSet_ID, [`${referenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await reference.update({
                referenceSet_ID: referenceSet_ID
            }, {
                where: {
                    referenceDbId: referenceDbId
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
     * add_species_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   referenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   species_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_species_ID(referenceDbId, species_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.species.add_reference_ID(species_ID, referenceDbId, benignErrorReporter, token, false);
            }
            let updated = await reference.update({
                species_ID: species_ID
            }, {
                where: {
                    referenceDbId: referenceDbId
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
     * @param {Id}   referenceDbId   IdAttribute of the root model to be updated
     * @param {Array}   additionalInfo_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_additionalInfo_IDs(referenceDbId, additionalInfo_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            additionalInfo_IDs.forEach(idx => {
                promises.push(models.additionalinfo.add_reference_ID(idx, referenceDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(referenceDbId);
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
     * @param {Id}   referenceDbId   IdAttribute of the root model to be updated
     * @param {Array}   externalReferences_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_externalReferences_IDs(referenceDbId, externalReferences_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            externalReferences_IDs.forEach(idx => {
                promises.push(models.externalreference.add_reference_ID(idx, referenceDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(referenceDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.externalReferences_IDs), externalReferences_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                externalReferences_IDs: updated_ids
            });
        }
    }
    /**
     * add_sourceGermplasm_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   referenceDbId   IdAttribute of the root model to be updated
     * @param {Array}   sourceGermplasm_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_sourceGermplasm_IDs(referenceDbId, sourceGermplasm_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            sourceGermplasm_IDs.forEach(idx => {
                promises.push(models.sourcegermplasm.add_reference_ID(idx, referenceDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(referenceDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.sourceGermplasm_IDs), sourceGermplasm_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                sourceGermplasm_IDs: updated_ids
            });
        }
    }
    /**
     * add_variants_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   referenceDbId   IdAttribute of the root model to be updated
     * @param {Array}   variants_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_variants_IDs(referenceDbId, variants_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            variants_IDs.forEach(idx => {
                promises.push(models.variant.add_reference_ID(idx, referenceDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(referenceDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.variants_IDs), variants_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                variants_IDs: updated_ids
            });
        }
    }

    /**
     * remove_referenceSet_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   referenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   referenceSet_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_referenceSet_ID(referenceDbId, referenceSet_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.referenceset.remove_references_IDs(referenceSet_ID, [`${referenceDbId}`], benignErrorReporter, token, false);
            }
            let updated = await reference.update({
                referenceSet_ID: null
            }, {
                where: {
                    referenceDbId: referenceDbId,
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
     * remove_species_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   referenceDbId   IdAttribute of the root model to be updated
     * @param {Id}   species_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_species_ID(referenceDbId, species_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.species.remove_reference_ID(species_ID, referenceDbId, benignErrorReporter, token, false);
            }
            let updated = await reference.update({
                species_ID: null
            }, {
                where: {
                    referenceDbId: referenceDbId,
                    species_ID: species_ID
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
     * @param {Id}   referenceDbId   IdAttribute of the root model to be updated
     * @param {Array}   additionalInfo_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_additionalInfo_IDs(referenceDbId, additionalInfo_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            additionalInfo_IDs.forEach(idx => {
                promises.push(models.additionalinfo.remove_reference_ID(idx, referenceDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(referenceDbId);
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
     * @param {Id}   referenceDbId   IdAttribute of the root model to be updated
     * @param {Array}   externalReferences_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_externalReferences_IDs(referenceDbId, externalReferences_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            externalReferences_IDs.forEach(idx => {
                promises.push(models.externalreference.remove_reference_ID(idx, referenceDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(referenceDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.externalReferences_IDs), externalReferences_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                externalReferences_IDs: updated_ids
            });
        }
    }
    /**
     * remove_sourceGermplasm_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   referenceDbId   IdAttribute of the root model to be updated
     * @param {Array}   sourceGermplasm_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_sourceGermplasm_IDs(referenceDbId, sourceGermplasm_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            sourceGermplasm_IDs.forEach(idx => {
                promises.push(models.sourcegermplasm.remove_reference_ID(idx, referenceDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(referenceDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.sourceGermplasm_IDs), sourceGermplasm_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                sourceGermplasm_IDs: updated_ids
            });
        }
    }
    /**
     * remove_variants_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   referenceDbId   IdAttribute of the root model to be updated
     * @param {Array}   variants_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_variants_IDs(referenceDbId, variants_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            variants_IDs.forEach(idx => {
                promises.push(models.variant.remove_reference_ID(idx, referenceDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(referenceDbId);
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
        return reference.definition.id.name;
    }

    /**
     * idAttributeType - Return the Type of the internalId.
     *
     * @return {type} Type given in the JSON model
     */
    static idAttributeType() {
        return reference.definition.id.type;
    }

    /**
     * getIdValue - Get the value of the idAttribute ("id", or "internalId") for an instance of reference.
     *
     * @return {type} id value
     */
    getIdValue() {
        return this[reference.idAttribute()];
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
     * base64Encode - Encode  reference to a base 64 String
     *
     * @return {string} The reference object, encoded in a base 64 String
     */
    base64Encode() {
        return Buffer.from(JSON.stringify(this.stripAssociations())).toString(
            "base64"
        );
    }

    /**
     * asCursor - alias method for base64Encode
     *
     * @return {string} The reference object, encoded in a base 64 String
     */
    asCursor() {
        return this.base64Encode()
    }

    /**
     * stripAssociations - Instance method for getting all attributes of reference.
     *
     * @return {object} The attributes of reference in object form
     */
    stripAssociations() {
        let attributes = Object.keys(reference.definition.attributes);
        let data_values = _.pick(this, attributes);
        return data_values;
    }

    /**
     * externalIdsArray - Get all attributes of reference that are marked as external IDs.
     *
     * @return {Array<String>} An array of all attributes of reference that are marked as external IDs
     */
    static externalIdsArray() {
        let externalIds = [];
        if (definition.externalIds) {
            externalIds = definition.externalIds;
        }

        return externalIds;
    }

    /**
     * externalIdsObject - Get all external IDs of reference.
     *
     * @return {object} An object that has the names of the external IDs as keys and their types as values
     */
    static externalIdsObject() {
        return {};
    }

}