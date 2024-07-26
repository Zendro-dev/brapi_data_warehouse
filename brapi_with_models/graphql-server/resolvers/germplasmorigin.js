/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const germplasmorigin = require(path.join(__dirname, '..', 'models', 'index.js')).germplasmorigin;
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
    'addCoordinates': 'coordinate',
    'addGermplasms': 'germplasm'
}



/**
 * germplasmorigin.prototype.coordinates - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
germplasmorigin.prototype.coordinates = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.coordinates_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneCoordinate({
                [models.coordinate.idAttribute()]: this.coordinates_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.coordinate.idAttribute(),
                "value": this.coordinates_ID,
                "operator": "eq"
            });
            let found = (await resolvers.coordinatesConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 coordinates matching germplasmorigin with germplasmOriginDbId ${this.coordinates_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the germplasmorigin model. Returning first coordinate.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}

/**
 * germplasmorigin.prototype.germplasmsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
germplasmorigin.prototype.germplasmsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.germplasms_IDs) || this.germplasms_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.germplasm.idAttribute(),
        "value": this.germplasms_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.germplasms({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * germplasmorigin.prototype.countFilteredGermplasms - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
germplasmorigin.prototype.countFilteredGermplasms = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.germplasms_IDs) || this.germplasms_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.germplasm.idAttribute(),
        "value": this.germplasms_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countGermplasms({
        search: nsearch
    }, context);
}

/**
 * germplasmorigin.prototype.germplasmsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
germplasmorigin.prototype.germplasmsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.germplasms_IDs) || this.germplasms_IDs.length === 0) {
        return {
            edges: [],
            germplasms: [],
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
        "field": models.germplasm.idAttribute(),
        "value": this.germplasms_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.germplasmsConnection({
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
germplasmorigin.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addGermplasms)) {
        promises_add.push(this.add_germplasms(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addCoordinates)) {
        promises_add.push(this.add_coordinates(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removeGermplasms)) {
        promises_remove.push(this.remove_germplasms(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeCoordinates)) {
        promises_remove.push(this.remove_coordinates(input, benignErrorReporter, token));
    }

    await Promise.all(promises_remove);

}
/**
 * add_germplasms - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasmorigin.prototype.add_germplasms = async function(input, benignErrorReporter, token) {

    await germplasmorigin.add_germplasms_IDs(this.getIdValue(), input.addGermplasms, benignErrorReporter, token);
    this.germplasms_IDs = helper.unionIds(this.germplasms_IDs, input.addGermplasms);
}

/**
 * add_coordinates - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasmorigin.prototype.add_coordinates = async function(input, benignErrorReporter, token) {
    await germplasmorigin.add_coordinates_ID(this.getIdValue(), input.addCoordinates, benignErrorReporter, token);
    this.coordinates_ID = input.addCoordinates;
}

/**
 * remove_germplasms - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasmorigin.prototype.remove_germplasms = async function(input, benignErrorReporter, token) {

    await germplasmorigin.remove_germplasms_IDs(this.getIdValue(), input.removeGermplasms, benignErrorReporter, token);
    this.germplasms_IDs = helper.differenceIds(this.germplasms_IDs, input.removeGermplasms);
}

/**
 * remove_coordinates - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasmorigin.prototype.remove_coordinates = async function(input, benignErrorReporter, token) {
    if (input.removeCoordinates == this.coordinates_ID) {
        await germplasmorigin.remove_coordinates_ID(this.getIdValue(), input.removeCoordinates, benignErrorReporter, token);
        this.coordinates_ID = null;
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

    let germplasmorigin = await resolvers.readOneGermplasmorigin({
        germplasmOriginDbId: id
    }, context);
    //check that record actually exists
    if (germplasmorigin === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(germplasmorigin.germplasms_IDs) ? germplasmorigin.germplasms_IDs.length : 0;

    get_to_one_associated_fk += [null, undefined].includes(germplasmorigin.coordinates_ID) ? 0 : 1;


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
        throw new Error(`germplasmorigin with germplasmOriginDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const germplasmorigin_record = await resolvers.readOneGermplasmorigin({
            germplasmOriginDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * germplasmorigins - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    germplasmorigins: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'germplasmorigin', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "germplasmorigins");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await germplasmorigin.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * germplasmoriginsConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    germplasmoriginsConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'germplasmorigin', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "germplasmoriginsConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await germplasmorigin.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneGermplasmorigin - Check user authorization and return one record with the specified germplasmOriginDbId in the germplasmOriginDbId argument.
     *
     * @param  {number} {germplasmOriginDbId}    germplasmOriginDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with germplasmOriginDbId requested
     */
    readOneGermplasmorigin: async function({
        germplasmOriginDbId
    }, context) {
        if (await checkAuthorization(context, 'germplasmorigin', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneGermplasmorigin");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await germplasmorigin.readById(germplasmOriginDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countGermplasmorigins - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countGermplasmorigins: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'germplasmorigin', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await germplasmorigin.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateGermplasmoriginForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateGermplasmoriginForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'germplasmorigin', 'read');
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
                    germplasmorigin,
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
     * validateGermplasmoriginForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateGermplasmoriginForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'germplasmorigin', 'read');
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
                    germplasmorigin,
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
     * validateGermplasmoriginForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {germplasmOriginDbId} germplasmOriginDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateGermplasmoriginForDeletion: async ({
        germplasmOriginDbId
    }, context) => {
        if ((await checkAuthorization(context, 'germplasmorigin', 'read')) === true) {
            try {
                await validForDeletion(germplasmOriginDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    germplasmorigin,
                    germplasmOriginDbId);
                return true;
            } catch (error) {
                error.input = {
                    germplasmOriginDbId: germplasmOriginDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateGermplasmoriginAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {germplasmOriginDbId} germplasmOriginDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateGermplasmoriginAfterReading: async ({
        germplasmOriginDbId
    }, context) => {
        if ((await checkAuthorization(context, 'germplasmorigin', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    germplasmorigin,
                    germplasmOriginDbId);
                return true;
            } catch (error) {
                error.input = {
                    germplasmOriginDbId: germplasmOriginDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addGermplasmorigin - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addGermplasmorigin: async function(input, context) {
        let authorization = await checkAuthorization(context, 'germplasmorigin', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.germplasmorigin.definition);
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
            let createdGermplasmorigin = await germplasmorigin.addOne(inputSanitized, context.benignErrors, token);
            await createdGermplasmorigin.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdGermplasmorigin;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteGermplasmorigin - Check user authorization and delete a record with the specified germplasmOriginDbId in the germplasmOriginDbId argument.
     *
     * @param  {number} {germplasmOriginDbId}    germplasmOriginDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteGermplasmorigin: async function({
        germplasmOriginDbId
    }, context) {
        if (await checkAuthorization(context, 'germplasmorigin', 'delete') === true) {
            if (await validForDeletion(germplasmOriginDbId, context)) {
                await updateAssociations(germplasmOriginDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return germplasmorigin.deleteOne(germplasmOriginDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateGermplasmorigin - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateGermplasmorigin: async function(input, context) {
        let authorization = await checkAuthorization(context, 'germplasmorigin', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.germplasmorigin.definition);
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
            let updatedGermplasmorigin = await germplasmorigin.updateOne(inputSanitized, context.benignErrors, token);
            await updatedGermplasmorigin.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedGermplasmorigin;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateGermplasmorigin - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateGermplasmorigin: async function(_, context) {
        if (await checkAuthorization(context, 'germplasmorigin', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return germplasmorigin.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * germplasmoriginsZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    germplasmoriginsZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "germplasmorigin", "read")) === true) {
            return germplasmorigin.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}