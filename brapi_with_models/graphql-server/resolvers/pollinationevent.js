/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const pollinationevent = require(path.join(__dirname, '..', 'models', 'index.js')).pollinationevent;
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
 * pollinationevent.prototype.cross - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
pollinationevent.prototype.cross = async function({
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
                        `Not unique "to_one" association Error: Found > 1 crosses matching pollinationevent with pollinationEventDbId ${this.cross_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the pollinationevent model. Returning first cross.`
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
pollinationevent.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

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
pollinationevent.prototype.add_cross = async function(input, benignErrorReporter, token) {
    await pollinationevent.add_cross_ID(this.getIdValue(), input.addCross, benignErrorReporter, token);
    this.cross_ID = input.addCross;
}

/**
 * remove_cross - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
pollinationevent.prototype.remove_cross = async function(input, benignErrorReporter, token) {
    if (input.removeCross == this.cross_ID) {
        await pollinationevent.remove_cross_ID(this.getIdValue(), input.removeCross, benignErrorReporter, token);
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

    let pollinationevent = await resolvers.readOnePollinationevent({
        pollinationEventDbId: id
    }, context);
    //check that record actually exists
    if (pollinationevent === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_one_associated_fk += [null, undefined].includes(pollinationevent.cross_ID) ? 0 : 1;


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
        throw new Error(`pollinationevent with pollinationEventDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const pollinationevent_record = await resolvers.readOnePollinationevent({
            pollinationEventDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * pollinationevents - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    pollinationevents: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'pollinationevent', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "pollinationevents");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await pollinationevent.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * pollinationeventsConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    pollinationeventsConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'pollinationevent', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "pollinationeventsConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await pollinationevent.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOnePollinationevent - Check user authorization and return one record with the specified pollinationEventDbId in the pollinationEventDbId argument.
     *
     * @param  {number} {pollinationEventDbId}    pollinationEventDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with pollinationEventDbId requested
     */
    readOnePollinationevent: async function({
        pollinationEventDbId
    }, context) {
        if (await checkAuthorization(context, 'pollinationevent', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOnePollinationevent");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await pollinationevent.readById(pollinationEventDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countPollinationevents - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countPollinationevents: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'pollinationevent', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await pollinationevent.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validatePollinationeventForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validatePollinationeventForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'pollinationevent', 'read');
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
                    pollinationevent,
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
     * validatePollinationeventForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validatePollinationeventForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'pollinationevent', 'read');
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
                    pollinationevent,
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
     * validatePollinationeventForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {pollinationEventDbId} pollinationEventDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validatePollinationeventForDeletion: async ({
        pollinationEventDbId
    }, context) => {
        if ((await checkAuthorization(context, 'pollinationevent', 'read')) === true) {
            try {
                await validForDeletion(pollinationEventDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    pollinationevent,
                    pollinationEventDbId);
                return true;
            } catch (error) {
                error.input = {
                    pollinationEventDbId: pollinationEventDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validatePollinationeventAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {pollinationEventDbId} pollinationEventDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validatePollinationeventAfterReading: async ({
        pollinationEventDbId
    }, context) => {
        if ((await checkAuthorization(context, 'pollinationevent', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    pollinationevent,
                    pollinationEventDbId);
                return true;
            } catch (error) {
                error.input = {
                    pollinationEventDbId: pollinationEventDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addPollinationevent - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addPollinationevent: async function(input, context) {
        let authorization = await checkAuthorization(context, 'pollinationevent', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.pollinationevent.definition);
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
            let createdPollinationevent = await pollinationevent.addOne(inputSanitized, context.benignErrors, token);
            await createdPollinationevent.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdPollinationevent;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deletePollinationevent - Check user authorization and delete a record with the specified pollinationEventDbId in the pollinationEventDbId argument.
     *
     * @param  {number} {pollinationEventDbId}    pollinationEventDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deletePollinationevent: async function({
        pollinationEventDbId
    }, context) {
        if (await checkAuthorization(context, 'pollinationevent', 'delete') === true) {
            if (await validForDeletion(pollinationEventDbId, context)) {
                await updateAssociations(pollinationEventDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return pollinationevent.deleteOne(pollinationEventDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updatePollinationevent - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updatePollinationevent: async function(input, context) {
        let authorization = await checkAuthorization(context, 'pollinationevent', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.pollinationevent.definition);
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
            let updatedPollinationevent = await pollinationevent.updateOne(inputSanitized, context.benignErrors, token);
            await updatedPollinationevent.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedPollinationevent;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplatePollinationevent - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplatePollinationevent: async function(_, context) {
        if (await checkAuthorization(context, 'pollinationevent', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return pollinationevent.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * pollinationeventsZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    pollinationeventsZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "pollinationevent", "read")) === true) {
            return pollinationevent.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}