/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const validvalue = require(path.join(__dirname, '..', 'models', 'index.js')).validvalue;
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
    'addCategories': 'category',
    'addScales': 'scale'
}




/**
 * validvalue.prototype.categoriesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
validvalue.prototype.categoriesFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.categories_IDs) || this.categories_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.category.idAttribute(),
        "value": this.categories_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.categories({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * validvalue.prototype.countFilteredCategories - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
validvalue.prototype.countFilteredCategories = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.categories_IDs) || this.categories_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.category.idAttribute(),
        "value": this.categories_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countCategories({
        search: nsearch
    }, context);
}

/**
 * validvalue.prototype.categoriesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
validvalue.prototype.categoriesConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.categories_IDs) || this.categories_IDs.length === 0) {
        return {
            edges: [],
            categories: [],
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
        "field": models.category.idAttribute(),
        "value": this.categories_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.categoriesConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * validvalue.prototype.scalesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
validvalue.prototype.scalesFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.scales_IDs) || this.scales_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.scale.idAttribute(),
        "value": this.scales_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.scales({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * validvalue.prototype.countFilteredScales - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
validvalue.prototype.countFilteredScales = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.scales_IDs) || this.scales_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.scale.idAttribute(),
        "value": this.scales_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countScales({
        search: nsearch
    }, context);
}

/**
 * validvalue.prototype.scalesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
validvalue.prototype.scalesConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.scales_IDs) || this.scales_IDs.length === 0) {
        return {
            edges: [],
            scales: [],
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
        "field": models.scale.idAttribute(),
        "value": this.scales_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.scalesConnection({
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
validvalue.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addCategories)) {
        promises_add.push(this.add_categories(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addScales)) {
        promises_add.push(this.add_scales(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removeCategories)) {
        promises_remove.push(this.remove_categories(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeScales)) {
        promises_remove.push(this.remove_scales(input, benignErrorReporter, token));
    }

    await Promise.all(promises_remove);

}
/**
 * add_categories - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
validvalue.prototype.add_categories = async function(input, benignErrorReporter, token) {

    await validvalue.add_categories_IDs(this.getIdValue(), input.addCategories, benignErrorReporter, token);
    this.categories_IDs = helper.unionIds(this.categories_IDs, input.addCategories);
}

/**
 * add_scales - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
validvalue.prototype.add_scales = async function(input, benignErrorReporter, token) {

    await validvalue.add_scales_IDs(this.getIdValue(), input.addScales, benignErrorReporter, token);
    this.scales_IDs = helper.unionIds(this.scales_IDs, input.addScales);
}

/**
 * remove_categories - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
validvalue.prototype.remove_categories = async function(input, benignErrorReporter, token) {

    await validvalue.remove_categories_IDs(this.getIdValue(), input.removeCategories, benignErrorReporter, token);
    this.categories_IDs = helper.differenceIds(this.categories_IDs, input.removeCategories);
}

/**
 * remove_scales - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
validvalue.prototype.remove_scales = async function(input, benignErrorReporter, token) {

    await validvalue.remove_scales_IDs(this.getIdValue(), input.removeScales, benignErrorReporter, token);
    this.scales_IDs = helper.differenceIds(this.scales_IDs, input.removeScales);
}



/**
 * countAssociatedRecordsWithRejectReaction - Count associated records with reject deletion action
 *
 * @param  {ID} id      Id of the record which the associations will be counted
 * @param  {objec} context Default context by resolver
 * @return {Int}         Number of associated records
 */
async function countAssociatedRecordsWithRejectReaction(id, context) {

    let validvalue = await resolvers.readOneValidvalue({
        validValueDbId: id
    }, context);
    //check that record actually exists
    if (validvalue === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(validvalue.categories_IDs) ? validvalue.categories_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(validvalue.scales_IDs) ? validvalue.scales_IDs.length : 0;


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
        throw new Error(`validvalue with validValueDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const validvalue_record = await resolvers.readOneValidvalue({
            validValueDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * validvalues - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    validvalues: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'validvalue', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "validvalues");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await validvalue.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validvaluesConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    validvaluesConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'validvalue', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "validvaluesConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await validvalue.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneValidvalue - Check user authorization and return one record with the specified validValueDbId in the validValueDbId argument.
     *
     * @param  {number} {validValueDbId}    validValueDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with validValueDbId requested
     */
    readOneValidvalue: async function({
        validValueDbId
    }, context) {
        if (await checkAuthorization(context, 'validvalue', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneValidvalue");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await validvalue.readById(validValueDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countValidvalues - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countValidvalues: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'validvalue', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await validvalue.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateValidvalueForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateValidvalueForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'validvalue', 'read');
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
                    validvalue,
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
     * validateValidvalueForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateValidvalueForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'validvalue', 'read');
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
                    validvalue,
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
     * validateValidvalueForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {validValueDbId} validValueDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateValidvalueForDeletion: async ({
        validValueDbId
    }, context) => {
        if ((await checkAuthorization(context, 'validvalue', 'read')) === true) {
            try {
                await validForDeletion(validValueDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    validvalue,
                    validValueDbId);
                return true;
            } catch (error) {
                error.input = {
                    validValueDbId: validValueDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateValidvalueAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {validValueDbId} validValueDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateValidvalueAfterReading: async ({
        validValueDbId
    }, context) => {
        if ((await checkAuthorization(context, 'validvalue', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    validvalue,
                    validValueDbId);
                return true;
            } catch (error) {
                error.input = {
                    validValueDbId: validValueDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addValidvalue - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addValidvalue: async function(input, context) {
        let authorization = await checkAuthorization(context, 'validvalue', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.validvalue.definition);
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
            let createdValidvalue = await validvalue.addOne(inputSanitized, context.benignErrors, token);
            await createdValidvalue.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdValidvalue;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteValidvalue - Check user authorization and delete a record with the specified validValueDbId in the validValueDbId argument.
     *
     * @param  {number} {validValueDbId}    validValueDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteValidvalue: async function({
        validValueDbId
    }, context) {
        if (await checkAuthorization(context, 'validvalue', 'delete') === true) {
            if (await validForDeletion(validValueDbId, context)) {
                await updateAssociations(validValueDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return validvalue.deleteOne(validValueDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateValidvalue - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateValidvalue: async function(input, context) {
        let authorization = await checkAuthorization(context, 'validvalue', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.validvalue.definition);
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
            let updatedValidvalue = await validvalue.updateOne(inputSanitized, context.benignErrors, token);
            await updatedValidvalue.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedValidvalue;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateValidvalue - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateValidvalue: async function(_, context) {
        if (await checkAuthorization(context, 'validvalue', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return validvalue.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validvaluesZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    validvaluesZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "validvalue", "read")) === true) {
            return validvalue.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}