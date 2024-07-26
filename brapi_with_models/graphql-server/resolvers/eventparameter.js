/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const eventparameter = require(path.join(__dirname, '..', 'models', 'index.js')).eventparameter;
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
    'addEvent': 'event'
}



/**
 * eventparameter.prototype.event - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
eventparameter.prototype.event = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.event_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneEvent({
                [models.event.idAttribute()]: this.event_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.event.idAttribute(),
                "value": this.event_ID,
                "operator": "eq"
            });
            let found = (await resolvers.eventsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 events matching eventparameter with eventParameterDbId ${this.event_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the eventparameter model. Returning first event.`
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
eventparameter.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];

    if (helper.isNotUndefinedAndNotNull(input.addEvent)) {
        promises_add.push(this.add_event(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];

    if (helper.isNotUndefinedAndNotNull(input.removeEvent)) {
        promises_remove.push(this.remove_event(input, benignErrorReporter, token));
    }

    await Promise.all(promises_remove);

}
/**
 * add_event - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
eventparameter.prototype.add_event = async function(input, benignErrorReporter, token) {
    await eventparameter.add_event_ID(this.getIdValue(), input.addEvent, benignErrorReporter, token);
    this.event_ID = input.addEvent;
}

/**
 * remove_event - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
eventparameter.prototype.remove_event = async function(input, benignErrorReporter, token) {
    if (input.removeEvent == this.event_ID) {
        await eventparameter.remove_event_ID(this.getIdValue(), input.removeEvent, benignErrorReporter, token);
        this.event_ID = null;
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

    let eventparameter = await resolvers.readOneEventparameter({
        eventParameterDbId: id
    }, context);
    //check that record actually exists
    if (eventparameter === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_one_associated_fk += [null, undefined].includes(eventparameter.event_ID) ? 0 : 1;


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
        throw new Error(`eventparameter with eventParameterDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const eventparameter_record = await resolvers.readOneEventparameter({
            eventParameterDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * eventparameters - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    eventparameters: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'eventparameter', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "eventparameters");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await eventparameter.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * eventparametersConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    eventparametersConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'eventparameter', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "eventparametersConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await eventparameter.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneEventparameter - Check user authorization and return one record with the specified eventParameterDbId in the eventParameterDbId argument.
     *
     * @param  {number} {eventParameterDbId}    eventParameterDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with eventParameterDbId requested
     */
    readOneEventparameter: async function({
        eventParameterDbId
    }, context) {
        if (await checkAuthorization(context, 'eventparameter', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneEventparameter");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await eventparameter.readById(eventParameterDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countEventparameters - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countEventparameters: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'eventparameter', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await eventparameter.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateEventparameterForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateEventparameterForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'eventparameter', 'read');
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
                    eventparameter,
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
     * validateEventparameterForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateEventparameterForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'eventparameter', 'read');
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
                    eventparameter,
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
     * validateEventparameterForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {eventParameterDbId} eventParameterDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateEventparameterForDeletion: async ({
        eventParameterDbId
    }, context) => {
        if ((await checkAuthorization(context, 'eventparameter', 'read')) === true) {
            try {
                await validForDeletion(eventParameterDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    eventparameter,
                    eventParameterDbId);
                return true;
            } catch (error) {
                error.input = {
                    eventParameterDbId: eventParameterDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateEventparameterAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {eventParameterDbId} eventParameterDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateEventparameterAfterReading: async ({
        eventParameterDbId
    }, context) => {
        if ((await checkAuthorization(context, 'eventparameter', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    eventparameter,
                    eventParameterDbId);
                return true;
            } catch (error) {
                error.input = {
                    eventParameterDbId: eventParameterDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addEventparameter - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addEventparameter: async function(input, context) {
        let authorization = await checkAuthorization(context, 'eventparameter', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.eventparameter.definition);
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
            let createdEventparameter = await eventparameter.addOne(inputSanitized, context.benignErrors, token);
            await createdEventparameter.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdEventparameter;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteEventparameter - Check user authorization and delete a record with the specified eventParameterDbId in the eventParameterDbId argument.
     *
     * @param  {number} {eventParameterDbId}    eventParameterDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteEventparameter: async function({
        eventParameterDbId
    }, context) {
        if (await checkAuthorization(context, 'eventparameter', 'delete') === true) {
            if (await validForDeletion(eventParameterDbId, context)) {
                await updateAssociations(eventParameterDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return eventparameter.deleteOne(eventParameterDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateEventparameter - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateEventparameter: async function(input, context) {
        let authorization = await checkAuthorization(context, 'eventparameter', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.eventparameter.definition);
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
            let updatedEventparameter = await eventparameter.updateOne(inputSanitized, context.benignErrors, token);
            await updatedEventparameter.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedEventparameter;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateEventparameter - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateEventparameter: async function(_, context) {
        if (await checkAuthorization(context, 'eventparameter', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return eventparameter.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * eventparametersZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    eventparametersZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "eventparameter", "read")) === true) {
            return eventparameter.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}