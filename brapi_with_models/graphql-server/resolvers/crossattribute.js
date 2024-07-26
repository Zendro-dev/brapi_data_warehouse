/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const crossattribute = require(path.join(__dirname, '..', 'models', 'index.js')).crossattribute;
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
    'addCross': 'cross'
}



/**
 * crossattribute.prototype.cross - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
crossattribute.prototype.cross = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.cross_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneCross({
                [models.cross.idAttribute()]: this.cross_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.cross.idAttribute(),
                "value": this.cross_ID,
                "operator": "eq"
            });
            let found = (await resolvers.crossesConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 crosses matching crossattribute with crossAttributeDbId ${this.cross_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the crossattribute model. Returning first cross.`
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
crossattribute.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];

    if (helper.isNotUndefinedAndNotNull(input.addCross)) {
        promises_add.push(this.add_cross(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];

    if (helper.isNotUndefinedAndNotNull(input.removeCross)) {
        promises_remove.push(this.remove_cross(input, benignErrorReporter, token));
    }

    await Promise.all(promises_remove);

}
/**
 * add_cross - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
crossattribute.prototype.add_cross = async function(input, benignErrorReporter, token) {
    await crossattribute.add_cross_ID(this.getIdValue(), input.addCross, benignErrorReporter, token);
    this.cross_ID = input.addCross;
}

/**
 * remove_cross - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
crossattribute.prototype.remove_cross = async function(input, benignErrorReporter, token) {
    if (input.removeCross == this.cross_ID) {
        await crossattribute.remove_cross_ID(this.getIdValue(), input.removeCross, benignErrorReporter, token);
        this.cross_ID = null;
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

    let crossattribute = await resolvers.readOneCrossattribute({
        crossAttributeDbId: id
    }, context);
    //check that record actually exists
    if (crossattribute === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_one_associated_fk += [null, undefined].includes(crossattribute.cross_ID) ? 0 : 1;


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
        throw new Error(`crossattribute with crossAttributeDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const crossattribute_record = await resolvers.readOneCrossattribute({
            crossAttributeDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * crossattributes - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    crossattributes: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'crossattribute', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "crossattributes");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await crossattribute.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * crossattributesConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    crossattributesConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'crossattribute', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "crossattributesConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await crossattribute.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneCrossattribute - Check user authorization and return one record with the specified crossAttributeDbId in the crossAttributeDbId argument.
     *
     * @param  {number} {crossAttributeDbId}    crossAttributeDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with crossAttributeDbId requested
     */
    readOneCrossattribute: async function({
        crossAttributeDbId
    }, context) {
        if (await checkAuthorization(context, 'crossattribute', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneCrossattribute");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await crossattribute.readById(crossAttributeDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countCrossattributes - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countCrossattributes: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'crossattribute', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await crossattribute.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateCrossattributeForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateCrossattributeForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'crossattribute', 'read');
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
                    crossattribute,
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
     * validateCrossattributeForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateCrossattributeForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'crossattribute', 'read');
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
                    crossattribute,
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
     * validateCrossattributeForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {crossAttributeDbId} crossAttributeDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateCrossattributeForDeletion: async ({
        crossAttributeDbId
    }, context) => {
        if ((await checkAuthorization(context, 'crossattribute', 'read')) === true) {
            try {
                await validForDeletion(crossAttributeDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    crossattribute,
                    crossAttributeDbId);
                return true;
            } catch (error) {
                error.input = {
                    crossAttributeDbId: crossAttributeDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateCrossattributeAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {crossAttributeDbId} crossAttributeDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateCrossattributeAfterReading: async ({
        crossAttributeDbId
    }, context) => {
        if ((await checkAuthorization(context, 'crossattribute', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    crossattribute,
                    crossAttributeDbId);
                return true;
            } catch (error) {
                error.input = {
                    crossAttributeDbId: crossAttributeDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addCrossattribute - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addCrossattribute: async function(input, context) {
        let authorization = await checkAuthorization(context, 'crossattribute', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.crossattribute.definition);
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
            let createdCrossattribute = await crossattribute.addOne(inputSanitized, context.benignErrors, token);
            await createdCrossattribute.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdCrossattribute;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteCrossattribute - Check user authorization and delete a record with the specified crossAttributeDbId in the crossAttributeDbId argument.
     *
     * @param  {number} {crossAttributeDbId}    crossAttributeDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteCrossattribute: async function({
        crossAttributeDbId
    }, context) {
        if (await checkAuthorization(context, 'crossattribute', 'delete') === true) {
            if (await validForDeletion(crossAttributeDbId, context)) {
                await updateAssociations(crossAttributeDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return crossattribute.deleteOne(crossAttributeDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateCrossattribute - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateCrossattribute: async function(input, context) {
        let authorization = await checkAuthorization(context, 'crossattribute', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.crossattribute.definition);
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
            let updatedCrossattribute = await crossattribute.updateOne(inputSanitized, context.benignErrors, token);
            await updatedCrossattribute.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedCrossattribute;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateCrossattribute - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateCrossattribute: async function(_, context) {
        if (await checkAuthorization(context, 'crossattribute', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return crossattribute.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * crossattributesZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    crossattributesZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "crossattribute", "read")) === true) {
            return crossattribute.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}