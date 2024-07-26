/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const datamatrix = require(path.join(__dirname, '..', 'models', 'index.js')).datamatrix;
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
    'addAlleleMatrices': 'allelematrix'
}



/**
 * datamatrix.prototype.alleleMatrices - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
datamatrix.prototype.alleleMatrices = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.alleleMatrices_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneAllelematrix({
                [models.allelematrix.idAttribute()]: this.alleleMatrices_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.allelematrix.idAttribute(),
                "value": this.alleleMatrices_ID,
                "operator": "eq"
            });
            let found = (await resolvers.allelematricesConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 allelematrices matching datamatrix with dataMatrixDbId ${this.alleleMatrices_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the datamatrix model. Returning first allelematrix.`
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
datamatrix.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];

    if (helper.isNotUndefinedAndNotNull(input.addAlleleMatrices)) {
        promises_add.push(this.add_alleleMatrices(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];

    if (helper.isNotUndefinedAndNotNull(input.removeAlleleMatrices)) {
        promises_remove.push(this.remove_alleleMatrices(input, benignErrorReporter, token));
    }

    await Promise.all(promises_remove);

}
/**
 * add_alleleMatrices - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
datamatrix.prototype.add_alleleMatrices = async function(input, benignErrorReporter, token) {
    await datamatrix.add_alleleMatrices_ID(this.getIdValue(), input.addAlleleMatrices, benignErrorReporter, token);
    this.alleleMatrices_ID = input.addAlleleMatrices;
}

/**
 * remove_alleleMatrices - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
datamatrix.prototype.remove_alleleMatrices = async function(input, benignErrorReporter, token) {
    if (input.removeAlleleMatrices == this.alleleMatrices_ID) {
        await datamatrix.remove_alleleMatrices_ID(this.getIdValue(), input.removeAlleleMatrices, benignErrorReporter, token);
        this.alleleMatrices_ID = null;
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

    let datamatrix = await resolvers.readOneDatamatrix({
        dataMatrixDbId: id
    }, context);
    //check that record actually exists
    if (datamatrix === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_one_associated_fk += [null, undefined].includes(datamatrix.alleleMatrices_ID) ? 0 : 1;


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
        throw new Error(`datamatrix with dataMatrixDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const datamatrix_record = await resolvers.readOneDatamatrix({
            dataMatrixDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * datamatrices - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    datamatrices: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'datamatrix', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "datamatrices");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await datamatrix.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * datamatricesConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    datamatricesConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'datamatrix', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "datamatricesConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await datamatrix.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneDatamatrix - Check user authorization and return one record with the specified dataMatrixDbId in the dataMatrixDbId argument.
     *
     * @param  {number} {dataMatrixDbId}    dataMatrixDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with dataMatrixDbId requested
     */
    readOneDatamatrix: async function({
        dataMatrixDbId
    }, context) {
        if (await checkAuthorization(context, 'datamatrix', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneDatamatrix");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await datamatrix.readById(dataMatrixDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countDatamatrices - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countDatamatrices: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'datamatrix', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await datamatrix.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateDatamatrixForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateDatamatrixForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'datamatrix', 'read');
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
                    datamatrix,
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
     * validateDatamatrixForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateDatamatrixForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'datamatrix', 'read');
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
                    datamatrix,
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
     * validateDatamatrixForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {dataMatrixDbId} dataMatrixDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateDatamatrixForDeletion: async ({
        dataMatrixDbId
    }, context) => {
        if ((await checkAuthorization(context, 'datamatrix', 'read')) === true) {
            try {
                await validForDeletion(dataMatrixDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    datamatrix,
                    dataMatrixDbId);
                return true;
            } catch (error) {
                error.input = {
                    dataMatrixDbId: dataMatrixDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateDatamatrixAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {dataMatrixDbId} dataMatrixDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateDatamatrixAfterReading: async ({
        dataMatrixDbId
    }, context) => {
        if ((await checkAuthorization(context, 'datamatrix', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    datamatrix,
                    dataMatrixDbId);
                return true;
            } catch (error) {
                error.input = {
                    dataMatrixDbId: dataMatrixDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addDatamatrix - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addDatamatrix: async function(input, context) {
        let authorization = await checkAuthorization(context, 'datamatrix', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.datamatrix.definition);
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
            let createdDatamatrix = await datamatrix.addOne(inputSanitized, context.benignErrors, token);
            await createdDatamatrix.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdDatamatrix;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteDatamatrix - Check user authorization and delete a record with the specified dataMatrixDbId in the dataMatrixDbId argument.
     *
     * @param  {number} {dataMatrixDbId}    dataMatrixDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteDatamatrix: async function({
        dataMatrixDbId
    }, context) {
        if (await checkAuthorization(context, 'datamatrix', 'delete') === true) {
            if (await validForDeletion(dataMatrixDbId, context)) {
                await updateAssociations(dataMatrixDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return datamatrix.deleteOne(dataMatrixDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateDatamatrix - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateDatamatrix: async function(input, context) {
        let authorization = await checkAuthorization(context, 'datamatrix', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.datamatrix.definition);
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
            let updatedDatamatrix = await datamatrix.updateOne(inputSanitized, context.benignErrors, token);
            await updatedDatamatrix.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedDatamatrix;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateDatamatrix - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateDatamatrix: async function(_, context) {
        if (await checkAuthorization(context, 'datamatrix', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return datamatrix.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * datamatricesZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    datamatricesZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "datamatrix", "read")) === true) {
            return datamatrix.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}