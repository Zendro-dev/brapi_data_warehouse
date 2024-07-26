/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const genotypemetadata = require(path.join(__dirname, '..', 'models', 'index.js')).genotypemetadata;
const helper = require('../utils/helper');
const checkAuthorization = require('../utils/check-authorization');
const fs = require('fs');
const os = require('os');
const resolvers = require(path.join(__dirname, 'index.js'));
const models = require(path.join(__dirname, '..', 'models', 'index.js'));
const globals = require('../config/globals');
const errorHelper = require('../utils/errors');
const validatorUtil = require("../utils/validatorUtil");
const associationArgsDef = {
    'addCall': 'call'
}



/**
 * genotypemetadata.prototype.call - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
genotypemetadata.prototype.call = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.call_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneCall({
                [models.call.idAttribute()]: this.call_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.call.idAttribute(),
                "value": this.call_ID,
                "operator": "eq"
            });
            let found = (await resolvers.callsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 calls matching genotypemetadata with genotypeMetadataDbId ${this.call_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the genotypemetadata model. Returning first call.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}





/**
 * handleAssociations - handles the given associations in the create and update case.
 *
 * @param {object} input   Info of each field to create the new record
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
genotypemetadata.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];

    if (helper.isNotUndefinedAndNotNull(input.addCall)) {
        promises_add.push(this.add_call(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];

    if (helper.isNotUndefinedAndNotNull(input.removeCall)) {
        promises_remove.push(this.remove_call(input, benignErrorReporter, token));
    }

    await Promise.all(promises_remove);

}
/**
 * add_call - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
genotypemetadata.prototype.add_call = async function(input, benignErrorReporter, token) {
    await genotypemetadata.add_call_ID(this.getIdValue(), input.addCall, benignErrorReporter, token);
    this.call_ID = input.addCall;
}

/**
 * remove_call - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
genotypemetadata.prototype.remove_call = async function(input, benignErrorReporter, token) {
    if (input.removeCall == this.call_ID) {
        await genotypemetadata.remove_call_ID(this.getIdValue(), input.removeCall, benignErrorReporter, token);
        this.call_ID = null;
    }
}



/**
 * countAssociatedRecordsWithRejectReaction - Count associated records with reject deletion action
 *
 * @param  {ID} id      Id of the record which the associations will be counted
 * @param  {objec} context Default context by resolver
 * @return {Int}         Number of associated records
 */
async function countAssociatedRecordsWithRejectReaction(id, context) {

    let genotypemetadata = await resolvers.readOneGenotypemetadata({
        genotypeMetadataDbId: id
    }, context);
    //check that record actually exists
    if (genotypemetadata === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_one_associated_fk += [null, undefined].includes(genotypemetadata.call_ID) ? 0 : 1;


    let result_to_many = await Promise.all(promises_to_many);
    let result_to_one = await Promise.all(promises_to_one);

    let get_to_many_associated = result_to_many.reduce((accumulator, current_val) => accumulator + current_val, 0);
    let get_to_one_associated = result_to_one.filter((r, index) => helper.isNotUndefinedAndNotNull(r)).length;

    return get_to_one_associated + get_to_many_associated_fk + get_to_many_associated + get_to_one_associated_fk;
}

/**
 * validForDeletion - Checks wether a record is allowed to be deleted
 *
 * @param  {ID} id      Id of record to check if it can be deleted
 * @param  {object} context Default context by resolver
 * @return {boolean}         True if it is allowed to be deleted and false otherwise
 */
async function validForDeletion(id, context) {
    if (await countAssociatedRecordsWithRejectReaction(id, context) > 0) {
        throw new Error(`genotypemetadata with genotypeMetadataDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
    }
    return true;
}

/**
 * updateAssociations - update associations for a given record
 *
 * @param  {ID} id      Id of record
 * @param  {object} context Default context by resolver
 */
const updateAssociations = async (id, context) => {
    const genotypemetadata_record = await resolvers.readOneGenotypemetadata({
            genotypeMetadataDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * genotypemetadata - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    genotypemetadata: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'genotypemetadata', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "genotypemetadata");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await genotypemetadata.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * genotypemetadataConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    genotypemetadataConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'genotypemetadata', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "genotypemetadataConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await genotypemetadata.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneGenotypemetadata - Check user authorization and return one record with the specified genotypeMetadataDbId in the genotypeMetadataDbId argument.
     *
     * @param  {number} {genotypeMetadataDbId}    genotypeMetadataDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with genotypeMetadataDbId requested
     */
    readOneGenotypemetadata: async function({
        genotypeMetadataDbId
    }, context) {
        if (await checkAuthorization(context, 'genotypemetadata', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneGenotypemetadata");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await genotypemetadata.readById(genotypeMetadataDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countGenotypemetadata - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countGenotypemetadata: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'genotypemetadata', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await genotypemetadata.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateGenotypemetadataForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateGenotypemetadataForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'genotypemetadata', 'read');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [
                Object.keys(associationArgsDef),
            ]);
            try {
                if (!input.skipAssociationsExistenceChecks) {
                    await helper.validateAssociationArgsExistence(
                        inputSanitized,
                        context,
                        associationArgsDef
                    );
                }
                await validatorUtil.validateData(
                    "validateForCreate",
                    genotypemetadata,
                    inputSanitized
                );
                return true;
            } catch (error) {
                delete input.skipAssociationsExistenceChecks;
                error.input = input;
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateGenotypemetadataForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateGenotypemetadataForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'genotypemetadata', 'read');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [
                Object.keys(associationArgsDef),
            ]);
            try {
                if (!input.skipAssociationsExistenceChecks) {
                    await helper.validateAssociationArgsExistence(
                        inputSanitized,
                        context,
                        associationArgsDef
                    );
                }
                await validatorUtil.validateData(
                    "validateForUpdate",
                    genotypemetadata,
                    inputSanitized
                );
                return true;
            } catch (error) {
                delete input.skipAssociationsExistenceChecks;
                error.input = input;
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateGenotypemetadataForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {genotypeMetadataDbId} genotypeMetadataDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateGenotypemetadataForDeletion: async ({
        genotypeMetadataDbId
    }, context) => {
        if ((await checkAuthorization(context, 'genotypemetadata', 'read')) === true) {
            try {
                await validForDeletion(genotypeMetadataDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    genotypemetadata,
                    genotypeMetadataDbId);
                return true;
            } catch (error) {
                error.input = {
                    genotypeMetadataDbId: genotypeMetadataDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateGenotypemetadataAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {genotypeMetadataDbId} genotypeMetadataDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateGenotypemetadataAfterReading: async ({
        genotypeMetadataDbId
    }, context) => {
        if ((await checkAuthorization(context, 'genotypemetadata', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    genotypemetadata,
                    genotypeMetadataDbId);
                return true;
            } catch (error) {
                error.input = {
                    genotypeMetadataDbId: genotypeMetadataDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addGenotypemetadata - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addGenotypemetadata: async function(input, context) {
        let authorization = await checkAuthorization(context, 'genotypemetadata', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.genotypemetadata.definition);
            await helper.checkAuthorizationOnAssocArgs(inputSanitized, context, associationArgsDef, ['read', 'create'], models);
            await helper.checkAndAdjustRecordLimitForCreateUpdate(inputSanitized, context, associationArgsDef);
            if (!input.skipAssociationsExistenceChecks) {
                await helper.validateAssociationArgsExistence(inputSanitized, context, associationArgsDef);
            }
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            let createdGenotypemetadata = await genotypemetadata.addOne(inputSanitized, context.benignErrors, token);
            await createdGenotypemetadata.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdGenotypemetadata;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteGenotypemetadata - Check user authorization and delete a record with the specified genotypeMetadataDbId in the genotypeMetadataDbId argument.
     *
     * @param  {number} {genotypeMetadataDbId}    genotypeMetadataDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteGenotypemetadata: async function({
        genotypeMetadataDbId
    }, context) {
        if (await checkAuthorization(context, 'genotypemetadata', 'delete') === true) {
            if (await validForDeletion(genotypeMetadataDbId, context)) {
                await updateAssociations(genotypeMetadataDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return genotypemetadata.deleteOne(genotypeMetadataDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateGenotypemetadata - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateGenotypemetadata: async function(input, context) {
        let authorization = await checkAuthorization(context, 'genotypemetadata', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.genotypemetadata.definition);
            await helper.checkAuthorizationOnAssocArgs(inputSanitized, context, associationArgsDef, ['read', 'create'], models);
            await helper.checkAndAdjustRecordLimitForCreateUpdate(inputSanitized, context, associationArgsDef);
            if (!input.skipAssociationsExistenceChecks) {
                await helper.validateAssociationArgsExistence(inputSanitized, context, associationArgsDef);
            }
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            let updatedGenotypemetadata = await genotypemetadata.updateOne(inputSanitized, context.benignErrors, token);
            await updatedGenotypemetadata.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedGenotypemetadata;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateGenotypemetadata - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateGenotypemetadata: async function(_, context) {
        if (await checkAuthorization(context, 'genotypemetadata', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return genotypemetadata.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * genotypemetadataZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    genotypemetadataZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "genotypemetadata", "read")) === true) {
            return genotypemetadata.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}