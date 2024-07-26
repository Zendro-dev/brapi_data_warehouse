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
    "model": "germplasm",
    "storageType": "sql",
    "attributes": {
        "germplasmDbId": "[ String ]",
        "accessionNumber": "String",
        "acquisitionDate": "String",
        "biologicalStatusOfAccessionCode": "String",
        "biologicalStatusOfAccessionDescription": "String",
        "breedingMethod_ID": "String",
        "pedigreeNode_ID": "String",
        "collection": "String",
        "commonCropName": "String",
        "countryOfOriginCode": "String",
        "defaultDisplayName": "String",
        "documentationURL": "String",
        "genus": "String",
        "germplasmName": "String",
        "germplasmPUI": "String",
        "germplasmPreprocessing": "String",
        "instituteCode": "String",
        "instituteName": "String",
        "pedigree": "String",
        "seedSource": "String",
        "seedSourceDescription": "String",
        "species": "String",
        "speciesAuthority": "String",
        "subtaxa": "String",
        "subtaxaAuthority": "String",
        "samples_IDs": "[ String ]",
        "attributeValues_IDs": "[ String ]",
        "progenyPedigreeNodes_IDs": "[ String ]",
        "parentPedigreeNodes_IDs": "[ String ]",
        "siblingPedigreeNodes_IDs": "[ String ]",
        "observations_IDs": "[ String ]",
        "observationUnits_IDs": "[ String ]",
        "additionalInfo_IDs": "[ String ]",
        "externalReferences_IDs": "[ String ]",
        "donors_IDs": "[ String ]",
        "germplasmOrigin_ID": "String",
        "storageTypes_ID": "String",
        "synonyms_IDs": "[ String ]",
        "taxonIds_IDs": "[ String ]"
    },
    "associations": {
        "breedingMethod": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "germplasm",
            "target": "breedingmethod",
            "targetKey": "germplasm_IDs",
            "sourceKey": "breedingMethod_ID",
            "keysIn": "germplasm",
            "targetStorageType": "sql"
        },
        "pedigreeNode": {
            "type": "one_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "germplasm",
            "target": "pedigreenode",
            "targetKey": "germplasm_ID",
            "sourceKey": "pedigreeNode_ID",
            "keysIn": "germplasm",
            "targetStorageType": "sql"
        },
        "samples": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "germplasm",
            "target": "sample",
            "targetKey": "germplasm_ID",
            "sourceKey": "samples_IDs",
            "keysIn": "germplasm",
            "targetStorageType": "sql"
        },
        "attributeValues": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "germplasm",
            "target": "germplasmattributevalue",
            "targetKey": "germplasm_ID",
            "sourceKey": "attributeValues_IDs",
            "keysIn": "germplasm",
            "targetStorageType": "sql"
        },
        "progenyPedigreeNodes": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "parentGermplasm",
            "target": "parent",
            "targetKey": "parentGermplasm_ID",
            "sourceKey": "progenyPedigreeNodes_IDs",
            "keysIn": "germplasm",
            "targetStorageType": "sql"
        },
        "parentPedigreeNodes": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "progenyGermplasm",
            "target": "progeny",
            "targetKey": "progenyGermplasm_ID",
            "sourceKey": "parentPedigreeNodes_IDs",
            "keysIn": "germplasm",
            "targetStorageType": "sql"
        },
        "siblingPedigreeNodes": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "siblingGermplasm",
            "target": "sibling",
            "targetKey": "siblingGermplasm_ID",
            "sourceKey": "siblingPedigreeNodes_IDs",
            "keysIn": "germplasm",
            "targetStorageType": "sql"
        },
        "observations": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "germplasm",
            "target": "observation",
            "targetKey": "germplasm_ID",
            "sourceKey": "observations_IDs",
            "keysIn": "germplasm",
            "targetStorageType": "sql"
        },
        "observationUnits": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "germplasm",
            "target": "observationunit",
            "targetKey": "germplasm_ID",
            "sourceKey": "observationUnits_IDs",
            "keysIn": "germplasm",
            "targetStorageType": "sql"
        },
        "additionalInfo": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "germplasm",
            "target": "additionalinfo",
            "targetKey": "germplasm_ID",
            "sourceKey": "additionalInfo_IDs",
            "keysIn": "germplasm",
            "targetStorageType": "sql"
        },
        "externalReferences": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "germplasm",
            "target": "externalreference",
            "targetKey": "germplasm_ID",
            "sourceKey": "externalReferences_IDs",
            "keysIn": "germplasm",
            "targetStorageType": "sql"
        },
        "donors": {
            "type": "many_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "germplasms",
            "target": "donor",
            "targetKey": "germplasms_IDs",
            "sourceKey": "donors_IDs",
            "keysIn": "germplasm",
            "targetStorageType": "sql"
        },
        "germplasmOrigin": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "germplasms",
            "target": "germplasmorigin",
            "targetKey": "germplasms_IDs",
            "sourceKey": "germplasmOrigin_ID",
            "keysIn": "germplasm",
            "targetStorageType": "sql"
        },
        "storageTypes": {
            "type": "many_to_one",
            "implementation": "foreignkeys",
            "reverseAssociation": "germplasms",
            "target": "storagetype",
            "targetKey": "germplasms_IDs",
            "sourceKey": "storageTypes_ID",
            "keysIn": "germplasm",
            "targetStorageType": "sql"
        },
        "synonyms": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "germplasm",
            "target": "synonym",
            "targetKey": "germplasm_ID",
            "sourceKey": "synonyms_IDs",
            "keysIn": "germplasm",
            "targetStorageType": "sql"
        },
        "taxonIds": {
            "type": "one_to_many",
            "implementation": "foreignkeys",
            "reverseAssociation": "germplasm",
            "target": "taxon",
            "targetKey": "germplasm_ID",
            "sourceKey": "taxonIds_IDs",
            "keysIn": "germplasm",
            "targetStorageType": "sql"
        }
    },
    "internalId": "germplasmDbId",
    "id": {
        "name": "germplasmDbId",
        "type": "[String]"
    }
};
const DataLoader = require("dataloader");

/**
 * module - Creates a sequelize model
 */

module.exports = class germplasm extends Sequelize.Model {
    /**
     * Initialize sequelize model.
     * @param  {object} sequelize Sequelize instance.
     * @param  {object} DataTypes Allowed sequelize data types.
     * @return {object}           Sequelize model with associations defined
     */
    static init(sequelize, DataTypes) {
        return super.init({

            germplasmDbId: {
                type: Sequelize[dict['[String]']],
                primaryKey: true
            },
            accessionNumber: {
                type: Sequelize[dict['String']]
            },
            acquisitionDate: {
                type: Sequelize[dict['String']]
            },
            biologicalStatusOfAccessionCode: {
                type: Sequelize[dict['String']]
            },
            biologicalStatusOfAccessionDescription: {
                type: Sequelize[dict['String']]
            },
            breedingMethod_ID: {
                type: Sequelize[dict['String']]
            },
            pedigreeNode_ID: {
                type: Sequelize[dict['String']]
            },
            collection: {
                type: Sequelize[dict['String']]
            },
            commonCropName: {
                type: Sequelize[dict['String']]
            },
            countryOfOriginCode: {
                type: Sequelize[dict['String']]
            },
            defaultDisplayName: {
                type: Sequelize[dict['String']]
            },
            documentationURL: {
                type: Sequelize[dict['String']]
            },
            genus: {
                type: Sequelize[dict['String']]
            },
            germplasmName: {
                type: Sequelize[dict['String']]
            },
            germplasmPUI: {
                type: Sequelize[dict['String']]
            },
            germplasmPreprocessing: {
                type: Sequelize[dict['String']]
            },
            instituteCode: {
                type: Sequelize[dict['String']]
            },
            instituteName: {
                type: Sequelize[dict['String']]
            },
            pedigree: {
                type: Sequelize[dict['String']]
            },
            seedSource: {
                type: Sequelize[dict['String']]
            },
            seedSourceDescription: {
                type: Sequelize[dict['String']]
            },
            species: {
                type: Sequelize[dict['String']]
            },
            speciesAuthority: {
                type: Sequelize[dict['String']]
            },
            subtaxa: {
                type: Sequelize[dict['String']]
            },
            subtaxaAuthority: {
                type: Sequelize[dict['String']]
            },
            samples_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            attributeValues_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            progenyPedigreeNodes_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            parentPedigreeNodes_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            siblingPedigreeNodes_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            observations_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            observationUnits_IDs: {
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
            donors_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            germplasmOrigin_ID: {
                type: Sequelize[dict['String']]
            },
            storageTypes_ID: {
                type: Sequelize[dict['String']]
            },
            synonyms_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            },
            taxonIds_IDs: {
                type: Sequelize[dict['[String]']],
                defaultValue: '[]'
            }


        }, {
            modelName: "germplasm",
            tableName: "germplasms",
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
            field: germplasm.idAttribute(),
            value: keys.join(),
            valueType: "Array",
        };
        let cursorRes = await germplasm.readAllCursor(queryArg);
        cursorRes = cursorRes.germplasms.reduce(
            (map, obj) => ((map[obj[germplasm.idAttribute()]] = obj), map), {}
        );
        return keys.map(
            (key) =>
            cursorRes[key] || new Error(`Record with ID = "${key}" does not exist`)
        );
    }

    static readByIdLoader = new DataLoader(germplasm.batchReadById, {
        cache: false,
    });

    /**
     * readById - The model implementation for reading a single record given by its ID
     *
     * Read a single record by a given ID
     * @param {string} id - The ID of the requested record
     * @return {object} The requested record as an object with the type germplasm, or an error object if the validation after reading fails
     * @throws {Error} If the requested record does not exist
     */
    static async readById(id) {
        return await germplasm.readByIdLoader.load(id);
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
        options['where'] = helper.searchConditionsToSequelize(search, germplasm.definition.attributes);
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
        let options = helper.buildLimitOffsetSequelizeOptions(search, order, pagination, this.idAttribute(), germplasm.definition.attributes);
        let records = await super.findAll(options);
        records = records.map(x => germplasm.postReadCast(x))
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
        let options = helper.buildCursorBasedSequelizeOptions(search, order, pagination, this.idAttribute(), germplasm.definition.attributes);
        let records = await super.findAll(options);

        records = records.map(x => germplasm.postReadCast(x))

        // validationCheck after read
        records = await validatorUtil.bulkValidateData('validateAfterRead', this, records, benignErrorReporter);
        // get the first record (if exists) in the opposite direction to determine pageInfo.
        // if no cursor was given there is no need for an extra query as the results will start at the first (or last) page.
        let oppRecords = [];
        if (pagination && (pagination.after || pagination.before)) {
            let oppOptions = helper.buildOppositeSearchSequelize(search, order, {
                ...pagination,
                includeCursor: false
            }, this.idAttribute(), germplasm.definition.attributes);
            oppRecords = await super.findAll(oppOptions);
        }
        // build the graphql Connection Object
        let edges = helper.buildEdgeObject(records);
        let pageInfo = helper.buildPageInfo(edges, oppRecords, pagination);
        return {
            edges,
            pageInfo,
            germplasms: edges.map((edge) => edge.node)
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
        input = germplasm.preWriteCast(input)
        try {
            const result = await this.sequelize.transaction(async (t) => {
                let item = await super.create(input, {
                    transaction: t
                });
                return item;
            });
            germplasm.postReadCast(result.dataValues)
            germplasm.postReadCast(result._previousDataValues)
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
        input = germplasm.preWriteCast(input)
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
            germplasm.postReadCast(result.dataValues)
            germplasm.postReadCast(result._previousDataValues)
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
     * add_breedingMethod_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Id}   breedingMethod_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_breedingMethod_ID(germplasmDbId, breedingMethod_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.breedingmethod.add_germplasm_IDs(breedingMethod_ID, [`${germplasmDbId}`], benignErrorReporter, token, false);
            }
            let updated = await germplasm.update({
                breedingMethod_ID: breedingMethod_ID
            }, {
                where: {
                    germplasmDbId: germplasmDbId
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
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Id}   pedigreeNode_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_pedigreeNode_ID(germplasmDbId, pedigreeNode_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.pedigreenode.add_germplasm_ID(pedigreeNode_ID, germplasmDbId, benignErrorReporter, token, false);
            }
            let updated = await germplasm.update({
                pedigreeNode_ID: pedigreeNode_ID
            }, {
                where: {
                    germplasmDbId: germplasmDbId
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
     * add_germplasmOrigin_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Id}   germplasmOrigin_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_germplasmOrigin_ID(germplasmDbId, germplasmOrigin_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.germplasmorigin.add_germplasms_IDs(germplasmOrigin_ID, [`${germplasmDbId}`], benignErrorReporter, token, false);
            }
            let updated = await germplasm.update({
                germplasmOrigin_ID: germplasmOrigin_ID
            }, {
                where: {
                    germplasmDbId: germplasmDbId
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
     * add_storageTypes_ID - field Mutation (model-layer) for to_one associationsArguments to add
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Id}   storageTypes_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_storageTypes_ID(germplasmDbId, storageTypes_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.storagetype.add_germplasms_IDs(storageTypes_ID, [`${germplasmDbId}`], benignErrorReporter, token, false);
            }
            let updated = await germplasm.update({
                storageTypes_ID: storageTypes_ID
            }, {
                where: {
                    germplasmDbId: germplasmDbId
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
     * add_samples_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Array}   samples_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_samples_IDs(germplasmDbId, samples_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            samples_IDs.forEach(idx => {
                promises.push(models.sample.add_germplasm_ID(idx, germplasmDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.samples_IDs), samples_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                samples_IDs: updated_ids
            });
        }
    }
    /**
     * add_attributeValues_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Array}   attributeValues_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_attributeValues_IDs(germplasmDbId, attributeValues_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            attributeValues_IDs.forEach(idx => {
                promises.push(models.germplasmattributevalue.add_germplasm_ID(idx, germplasmDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.attributeValues_IDs), attributeValues_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                attributeValues_IDs: updated_ids
            });
        }
    }
    /**
     * add_progenyPedigreeNodes_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Array}   progenyPedigreeNodes_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_progenyPedigreeNodes_IDs(germplasmDbId, progenyPedigreeNodes_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            progenyPedigreeNodes_IDs.forEach(idx => {
                promises.push(models.parent.add_parentGermplasm_ID(idx, germplasmDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.progenyPedigreeNodes_IDs), progenyPedigreeNodes_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                progenyPedigreeNodes_IDs: updated_ids
            });
        }
    }
    /**
     * add_parentPedigreeNodes_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Array}   parentPedigreeNodes_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_parentPedigreeNodes_IDs(germplasmDbId, parentPedigreeNodes_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            parentPedigreeNodes_IDs.forEach(idx => {
                promises.push(models.progeny.add_progenyGermplasm_ID(idx, germplasmDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.parentPedigreeNodes_IDs), parentPedigreeNodes_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                parentPedigreeNodes_IDs: updated_ids
            });
        }
    }
    /**
     * add_siblingPedigreeNodes_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Array}   siblingPedigreeNodes_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_siblingPedigreeNodes_IDs(germplasmDbId, siblingPedigreeNodes_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            siblingPedigreeNodes_IDs.forEach(idx => {
                promises.push(models.sibling.add_siblingGermplasm_ID(idx, germplasmDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.siblingPedigreeNodes_IDs), siblingPedigreeNodes_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                siblingPedigreeNodes_IDs: updated_ids
            });
        }
    }
    /**
     * add_observations_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Array}   observations_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_observations_IDs(germplasmDbId, observations_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            observations_IDs.forEach(idx => {
                promises.push(models.observation.add_germplasm_ID(idx, germplasmDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.observations_IDs), observations_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                observations_IDs: updated_ids
            });
        }
    }
    /**
     * add_observationUnits_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Array}   observationUnits_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_observationUnits_IDs(germplasmDbId, observationUnits_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            observationUnits_IDs.forEach(idx => {
                promises.push(models.observationunit.add_germplasm_ID(idx, germplasmDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.observationUnits_IDs), observationUnits_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                observationUnits_IDs: updated_ids
            });
        }
    }
    /**
     * add_additionalInfo_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Array}   additionalInfo_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_additionalInfo_IDs(germplasmDbId, additionalInfo_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            additionalInfo_IDs.forEach(idx => {
                promises.push(models.additionalinfo.add_germplasm_ID(idx, germplasmDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmDbId);
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
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Array}   externalReferences_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_externalReferences_IDs(germplasmDbId, externalReferences_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            externalReferences_IDs.forEach(idx => {
                promises.push(models.externalreference.add_germplasm_ID(idx, germplasmDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.externalReferences_IDs), externalReferences_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                externalReferences_IDs: updated_ids
            });
        }
    }
    /**
     * add_donors_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Array}   donors_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_donors_IDs(germplasmDbId, donors_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            donors_IDs.forEach(idx => {
                promises.push(models.donor.add_germplasms_IDs(idx, [`${germplasmDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.donors_IDs), donors_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                donors_IDs: updated_ids
            });
        }
    }
    /**
     * add_synonyms_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Array}   synonyms_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_synonyms_IDs(germplasmDbId, synonyms_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            synonyms_IDs.forEach(idx => {
                promises.push(models.synonym.add_germplasm_ID(idx, germplasmDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.synonyms_IDs), synonyms_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                synonyms_IDs: updated_ids
            });
        }
    }
    /**
     * add_taxonIds_IDs - field Mutation (model-layer) for to_many associationsArguments to add
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Array}   taxonIds_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async add_taxonIds_IDs(germplasmDbId, taxonIds_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            taxonIds_IDs.forEach(idx => {
                promises.push(models.taxon.add_germplasm_ID(idx, germplasmDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmDbId);
        if (record !== null) {
            let updated_ids = helper.unionIds(JSON.parse(record.taxonIds_IDs), taxonIds_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                taxonIds_IDs: updated_ids
            });
        }
    }

    /**
     * remove_breedingMethod_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Id}   breedingMethod_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_breedingMethod_ID(germplasmDbId, breedingMethod_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.breedingmethod.remove_germplasm_IDs(breedingMethod_ID, [`${germplasmDbId}`], benignErrorReporter, token, false);
            }
            let updated = await germplasm.update({
                breedingMethod_ID: null
            }, {
                where: {
                    germplasmDbId: germplasmDbId,
                    breedingMethod_ID: breedingMethod_ID
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
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Id}   pedigreeNode_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_pedigreeNode_ID(germplasmDbId, pedigreeNode_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.pedigreenode.remove_germplasm_ID(pedigreeNode_ID, germplasmDbId, benignErrorReporter, token, false);
            }
            let updated = await germplasm.update({
                pedigreeNode_ID: null
            }, {
                where: {
                    germplasmDbId: germplasmDbId,
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
     * remove_germplasmOrigin_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Id}   germplasmOrigin_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_germplasmOrigin_ID(germplasmDbId, germplasmOrigin_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.germplasmorigin.remove_germplasms_IDs(germplasmOrigin_ID, [`${germplasmDbId}`], benignErrorReporter, token, false);
            }
            let updated = await germplasm.update({
                germplasmOrigin_ID: null
            }, {
                where: {
                    germplasmDbId: germplasmDbId,
                    germplasmOrigin_ID: germplasmOrigin_ID
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
     * remove_storageTypes_ID - field Mutation (model-layer) for to_one associationsArguments to remove
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Id}   storageTypes_ID Foreign Key (stored in "Me") of the Association to be updated.
     * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_storageTypes_ID(germplasmDbId, storageTypes_ID, benignErrorReporter, token, handle_inverse = true) {
        try {
            //handle inverse association
            if (handle_inverse) {
                await models.storagetype.remove_germplasms_IDs(storageTypes_ID, [`${germplasmDbId}`], benignErrorReporter, token, false);
            }
            let updated = await germplasm.update({
                storageTypes_ID: null
            }, {
                where: {
                    germplasmDbId: germplasmDbId,
                    storageTypes_ID: storageTypes_ID
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
     * remove_samples_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Array}   samples_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_samples_IDs(germplasmDbId, samples_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            samples_IDs.forEach(idx => {
                promises.push(models.sample.remove_germplasm_ID(idx, germplasmDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.samples_IDs), samples_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                samples_IDs: updated_ids
            });
        }
    }
    /**
     * remove_attributeValues_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Array}   attributeValues_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_attributeValues_IDs(germplasmDbId, attributeValues_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            attributeValues_IDs.forEach(idx => {
                promises.push(models.germplasmattributevalue.remove_germplasm_ID(idx, germplasmDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.attributeValues_IDs), attributeValues_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                attributeValues_IDs: updated_ids
            });
        }
    }
    /**
     * remove_progenyPedigreeNodes_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Array}   progenyPedigreeNodes_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_progenyPedigreeNodes_IDs(germplasmDbId, progenyPedigreeNodes_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            progenyPedigreeNodes_IDs.forEach(idx => {
                promises.push(models.parent.remove_parentGermplasm_ID(idx, germplasmDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.progenyPedigreeNodes_IDs), progenyPedigreeNodes_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                progenyPedigreeNodes_IDs: updated_ids
            });
        }
    }
    /**
     * remove_parentPedigreeNodes_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Array}   parentPedigreeNodes_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_parentPedigreeNodes_IDs(germplasmDbId, parentPedigreeNodes_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            parentPedigreeNodes_IDs.forEach(idx => {
                promises.push(models.progeny.remove_progenyGermplasm_ID(idx, germplasmDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.parentPedigreeNodes_IDs), parentPedigreeNodes_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                parentPedigreeNodes_IDs: updated_ids
            });
        }
    }
    /**
     * remove_siblingPedigreeNodes_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Array}   siblingPedigreeNodes_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_siblingPedigreeNodes_IDs(germplasmDbId, siblingPedigreeNodes_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            siblingPedigreeNodes_IDs.forEach(idx => {
                promises.push(models.sibling.remove_siblingGermplasm_ID(idx, germplasmDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.siblingPedigreeNodes_IDs), siblingPedigreeNodes_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                siblingPedigreeNodes_IDs: updated_ids
            });
        }
    }
    /**
     * remove_observations_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Array}   observations_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_observations_IDs(germplasmDbId, observations_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            observations_IDs.forEach(idx => {
                promises.push(models.observation.remove_germplasm_ID(idx, germplasmDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.observations_IDs), observations_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                observations_IDs: updated_ids
            });
        }
    }
    /**
     * remove_observationUnits_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Array}   observationUnits_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_observationUnits_IDs(germplasmDbId, observationUnits_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            observationUnits_IDs.forEach(idx => {
                promises.push(models.observationunit.remove_germplasm_ID(idx, germplasmDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.observationUnits_IDs), observationUnits_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                observationUnits_IDs: updated_ids
            });
        }
    }
    /**
     * remove_additionalInfo_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Array}   additionalInfo_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_additionalInfo_IDs(germplasmDbId, additionalInfo_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            additionalInfo_IDs.forEach(idx => {
                promises.push(models.additionalinfo.remove_germplasm_ID(idx, germplasmDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmDbId);
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
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Array}   externalReferences_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_externalReferences_IDs(germplasmDbId, externalReferences_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            externalReferences_IDs.forEach(idx => {
                promises.push(models.externalreference.remove_germplasm_ID(idx, germplasmDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.externalReferences_IDs), externalReferences_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                externalReferences_IDs: updated_ids
            });
        }
    }
    /**
     * remove_donors_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Array}   donors_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_donors_IDs(germplasmDbId, donors_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            donors_IDs.forEach(idx => {
                promises.push(models.donor.remove_germplasms_IDs(idx, [`${germplasmDbId}`], benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.donors_IDs), donors_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                donors_IDs: updated_ids
            });
        }
    }
    /**
     * remove_synonyms_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Array}   synonyms_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_synonyms_IDs(germplasmDbId, synonyms_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            synonyms_IDs.forEach(idx => {
                promises.push(models.synonym.remove_germplasm_ID(idx, germplasmDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.synonyms_IDs), synonyms_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                synonyms_IDs: updated_ids
            });
        }
    }
    /**
     * remove_taxonIds_IDs - field Mutation (model-layer) for to_many associationsArguments to remove
     *
     * @param {Id}   germplasmDbId   IdAttribute of the root model to be updated
     * @param {Array}   taxonIds_IDs Array foreign Key (stored in "Me") of the Association to be updated.
     * @param {string} token The token used for authorization
     * @param {boolean} handle_inverse Handle inverse association
     */
    static async remove_taxonIds_IDs(germplasmDbId, taxonIds_IDs, benignErrorReporter, token, handle_inverse = true) {
        //handle inverse association
        if (handle_inverse) {
            let promises = [];
            taxonIds_IDs.forEach(idx => {
                promises.push(models.taxon.remove_germplasm_ID(idx, germplasmDbId, benignErrorReporter, token, false));
            });
            await Promise.all(promises);
        }

        let record = await super.findByPk(germplasmDbId);
        if (record !== null) {
            let updated_ids = helper.differenceIds(JSON.parse(record.taxonIds_IDs), taxonIds_IDs);
            updated_ids = JSON.stringify(updated_ids);
            await record.update({
                taxonIds_IDs: updated_ids
            });
        }
    }








    /**
     * idAttribute - Check whether an attribute "internalId" is given in the JSON model. If not the standard "id" is used instead.
     *
     * @return {type} Name of the attribute that functions as an internalId
     */
    static idAttribute() {
        return germplasm.definition.id.name;
    }

    /**
     * idAttributeType - Return the Type of the internalId.
     *
     * @return {type} Type given in the JSON model
     */
    static idAttributeType() {
        return germplasm.definition.id.type;
    }

    /**
     * getIdValue - Get the value of the idAttribute ("id", or "internalId") for an instance of germplasm.
     *
     * @return {type} id value
     */
    getIdValue() {
        return this[germplasm.idAttribute()];
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
     * base64Encode - Encode  germplasm to a base 64 String
     *
     * @return {string} The germplasm object, encoded in a base 64 String
     */
    base64Encode() {
        return Buffer.from(JSON.stringify(this.stripAssociations())).toString(
            "base64"
        );
    }

    /**
     * asCursor - alias method for base64Encode
     *
     * @return {string} The germplasm object, encoded in a base 64 String
     */
    asCursor() {
        return this.base64Encode()
    }

    /**
     * stripAssociations - Instance method for getting all attributes of germplasm.
     *
     * @return {object} The attributes of germplasm in object form
     */
    stripAssociations() {
        let attributes = Object.keys(germplasm.definition.attributes);
        let data_values = _.pick(this, attributes);
        return data_values;
    }

    /**
     * externalIdsArray - Get all attributes of germplasm that are marked as external IDs.
     *
     * @return {Array<String>} An array of all attributes of germplasm that are marked as external IDs
     */
    static externalIdsArray() {
        let externalIds = [];
        if (definition.externalIds) {
            externalIds = definition.externalIds;
        }

        return externalIds;
    }

    /**
     * externalIdsObject - Get all external IDs of germplasm.
     *
     * @return {object} An object that has the names of the external IDs as keys and their types as values
     */
    static externalIdsObject() {
        return {};
    }

}