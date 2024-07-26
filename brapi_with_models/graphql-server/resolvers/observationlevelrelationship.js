/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const observationlevelrelationship = require(path.join(__dirname, '..', 'models', 'index.js')).observationlevelrelationship;
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
    'addObservationUnitPositions': 'observationunitposition'
}




/**
 * observationlevelrelationship.prototype.observationUnitPositionsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
observationlevelrelationship.prototype.observationUnitPositionsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.observationUnitPositions_IDs) || this.observationUnitPositions_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.observationunitposition.idAttribute(),
        "value": this.observationUnitPositions_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.observationunitpositions({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * observationlevelrelationship.prototype.countFilteredObservationUnitPositions - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
observationlevelrelationship.prototype.countFilteredObservationUnitPositions = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.observationUnitPositions_IDs) || this.observationUnitPositions_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.observationunitposition.idAttribute(),
        "value": this.observationUnitPositions_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countObservationunitpositions({
        search: nsearch
    }, context);
}

/**
 * observationlevelrelationship.prototype.observationUnitPositionsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
observationlevelrelationship.prototype.observationUnitPositionsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.observationUnitPositions_IDs) || this.observationUnitPositions_IDs.length === 0) {
        return {
            edges: [],
            observationunitpositions: [],
            pageInfo: {
                startCursor: null,
                endCursor: null,
                hasPreviousPage: false,
                hasNextPage: false
            }
        };
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.observationunitposition.idAttribute(),
        "value": this.observationUnitPositions_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.observationunitpositionsConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}




/**
 * handleAssociations - handles the given associations in the create and update case.
 *
 * @param {object} input   Info of each field to create the new record
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationlevelrelationship.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addObservationUnitPositions)) {
        promises_add.push(this.add_observationUnitPositions(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removeObservationUnitPositions)) {
        promises_remove.push(this.remove_observationUnitPositions(input, benignErrorReporter, token));
    }

    await Promise.all(promises_remove);

}
/**
 * add_observationUnitPositions - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationlevelrelationship.prototype.add_observationUnitPositions = async function(input, benignErrorReporter, token) {

    await observationlevelrelationship.add_observationUnitPositions_IDs(this.getIdValue(), input.addObservationUnitPositions, benignErrorReporter, token);
    this.observationUnitPositions_IDs = helper.unionIds(this.observationUnitPositions_IDs, input.addObservationUnitPositions);
}

/**
 * remove_observationUnitPositions - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationlevelrelationship.prototype.remove_observationUnitPositions = async function(input, benignErrorReporter, token) {

    await observationlevelrelationship.remove_observationUnitPositions_IDs(this.getIdValue(), input.removeObservationUnitPositions, benignErrorReporter, token);
    this.observationUnitPositions_IDs = helper.differenceIds(this.observationUnitPositions_IDs, input.removeObservationUnitPositions);
}



/**
 * countAssociatedRecordsWithRejectReaction - Count associated records with reject deletion action
 *
 * @param  {ID} id      Id of the record which the associations will be counted
 * @param  {objec} context Default context by resolver
 * @return {Int}         Number of associated records
 */
async function countAssociatedRecordsWithRejectReaction(id, context) {

    let observationlevelrelationship = await resolvers.readOneObservationlevelrelationship({
        observationLevelRelationshipDbId: id
    }, context);
    //check that record actually exists
    if (observationlevelrelationship === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(observationlevelrelationship.observationUnitPositions_IDs) ? observationlevelrelationship.observationUnitPositions_IDs.length : 0;


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
        throw new Error(`observationlevelrelationship with observationLevelRelationshipDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const observationlevelrelationship_record = await resolvers.readOneObservationlevelrelationship({
            observationLevelRelationshipDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * observationlevelrelationships - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    observationlevelrelationships: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'observationlevelrelationship', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "observationlevelrelationships");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await observationlevelrelationship.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * observationlevelrelationshipsConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    observationlevelrelationshipsConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'observationlevelrelationship', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "observationlevelrelationshipsConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await observationlevelrelationship.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneObservationlevelrelationship - Check user authorization and return one record with the specified observationLevelRelationshipDbId in the observationLevelRelationshipDbId argument.
     *
     * @param  {number} {observationLevelRelationshipDbId}    observationLevelRelationshipDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with observationLevelRelationshipDbId requested
     */
    readOneObservationlevelrelationship: async function({
        observationLevelRelationshipDbId
    }, context) {
        if (await checkAuthorization(context, 'observationlevelrelationship', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneObservationlevelrelationship");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await observationlevelrelationship.readById(observationLevelRelationshipDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countObservationlevelrelationships - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countObservationlevelrelationships: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'observationlevelrelationship', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await observationlevelrelationship.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateObservationlevelrelationshipForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateObservationlevelrelationshipForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'observationlevelrelationship', 'read');
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
                    observationlevelrelationship,
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
     * validateObservationlevelrelationshipForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateObservationlevelrelationshipForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'observationlevelrelationship', 'read');
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
                    observationlevelrelationship,
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
     * validateObservationlevelrelationshipForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {observationLevelRelationshipDbId} observationLevelRelationshipDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateObservationlevelrelationshipForDeletion: async ({
        observationLevelRelationshipDbId
    }, context) => {
        if ((await checkAuthorization(context, 'observationlevelrelationship', 'read')) === true) {
            try {
                await validForDeletion(observationLevelRelationshipDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    observationlevelrelationship,
                    observationLevelRelationshipDbId);
                return true;
            } catch (error) {
                error.input = {
                    observationLevelRelationshipDbId: observationLevelRelationshipDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateObservationlevelrelationshipAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {observationLevelRelationshipDbId} observationLevelRelationshipDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateObservationlevelrelationshipAfterReading: async ({
        observationLevelRelationshipDbId
    }, context) => {
        if ((await checkAuthorization(context, 'observationlevelrelationship', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    observationlevelrelationship,
                    observationLevelRelationshipDbId);
                return true;
            } catch (error) {
                error.input = {
                    observationLevelRelationshipDbId: observationLevelRelationshipDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addObservationlevelrelationship - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addObservationlevelrelationship: async function(input, context) {
        let authorization = await checkAuthorization(context, 'observationlevelrelationship', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.observationlevelrelationship.definition);
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
            let createdObservationlevelrelationship = await observationlevelrelationship.addOne(inputSanitized, context.benignErrors, token);
            await createdObservationlevelrelationship.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdObservationlevelrelationship;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteObservationlevelrelationship - Check user authorization and delete a record with the specified observationLevelRelationshipDbId in the observationLevelRelationshipDbId argument.
     *
     * @param  {number} {observationLevelRelationshipDbId}    observationLevelRelationshipDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteObservationlevelrelationship: async function({
        observationLevelRelationshipDbId
    }, context) {
        if (await checkAuthorization(context, 'observationlevelrelationship', 'delete') === true) {
            if (await validForDeletion(observationLevelRelationshipDbId, context)) {
                await updateAssociations(observationLevelRelationshipDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return observationlevelrelationship.deleteOne(observationLevelRelationshipDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateObservationlevelrelationship - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateObservationlevelrelationship: async function(input, context) {
        let authorization = await checkAuthorization(context, 'observationlevelrelationship', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.observationlevelrelationship.definition);
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
            let updatedObservationlevelrelationship = await observationlevelrelationship.updateOne(inputSanitized, context.benignErrors, token);
            await updatedObservationlevelrelationship.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedObservationlevelrelationship;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateObservationlevelrelationship - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateObservationlevelrelationship: async function(_, context) {
        if (await checkAuthorization(context, 'observationlevelrelationship', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return observationlevelrelationship.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * observationlevelrelationshipsZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    observationlevelrelationshipsZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "observationlevelrelationship", "read")) === true) {
            return observationlevelrelationship.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}