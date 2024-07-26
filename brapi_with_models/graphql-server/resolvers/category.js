/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const category = require(path.join(__dirname, '..', 'models', 'index.js')).category;
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
    'addValidValues': 'validvalue'
}




/**
 * category.prototype.validValuesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
category.prototype.validValuesFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.validValues_IDs) || this.validValues_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.validvalue.idAttribute(),
        "value": this.validValues_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.validvalues({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * category.prototype.countFilteredValidValues - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
category.prototype.countFilteredValidValues = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.validValues_IDs) || this.validValues_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.validvalue.idAttribute(),
        "value": this.validValues_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countValidvalues({
        search: nsearch
    }, context);
}

/**
 * category.prototype.validValuesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
category.prototype.validValuesConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.validValues_IDs) || this.validValues_IDs.length === 0) {
        return {
            edges: [],
            validvalues: [],
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
        "field": models.validvalue.idAttribute(),
        "value": this.validValues_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.validvaluesConnection({
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
category.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addValidValues)) {
        promises_add.push(this.add_validValues(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removeValidValues)) {
        promises_remove.push(this.remove_validValues(input, benignErrorReporter, token));
    }

    await Promise.all(promises_remove);

}
/**
 * add_validValues - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
category.prototype.add_validValues = async function(input, benignErrorReporter, token) {

    await category.add_validValues_IDs(this.getIdValue(), input.addValidValues, benignErrorReporter, token);
    this.validValues_IDs = helper.unionIds(this.validValues_IDs, input.addValidValues);
}

/**
 * remove_validValues - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
category.prototype.remove_validValues = async function(input, benignErrorReporter, token) {

    await category.remove_validValues_IDs(this.getIdValue(), input.removeValidValues, benignErrorReporter, token);
    this.validValues_IDs = helper.differenceIds(this.validValues_IDs, input.removeValidValues);
}



/**
 * countAssociatedRecordsWithRejectReaction - Count associated records with reject deletion action
 *
 * @param  {ID} id      Id of the record which the associations will be counted
 * @param  {objec} context Default context by resolver
 * @return {Int}         Number of associated records
 */
async function countAssociatedRecordsWithRejectReaction(id, context) {

    let category = await resolvers.readOneCategory({
        categoryDbId: id
    }, context);
    //check that record actually exists
    if (category === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(category.validValues_IDs) ? category.validValues_IDs.length : 0;


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
        throw new Error(`category with categoryDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const category_record = await resolvers.readOneCategory({
            categoryDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * categories - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    categories: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'category', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "categories");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await category.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * categoriesConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    categoriesConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'category', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "categoriesConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await category.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneCategory - Check user authorization and return one record with the specified categoryDbId in the categoryDbId argument.
     *
     * @param  {number} {categoryDbId}    categoryDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with categoryDbId requested
     */
    readOneCategory: async function({
        categoryDbId
    }, context) {
        if (await checkAuthorization(context, 'category', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneCategory");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await category.readById(categoryDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countCategories - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countCategories: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'category', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await category.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateCategoryForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateCategoryForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'category', 'read');
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
                    category,
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
     * validateCategoryForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateCategoryForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'category', 'read');
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
                    category,
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
     * validateCategoryForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {categoryDbId} categoryDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateCategoryForDeletion: async ({
        categoryDbId
    }, context) => {
        if ((await checkAuthorization(context, 'category', 'read')) === true) {
            try {
                await validForDeletion(categoryDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    category,
                    categoryDbId);
                return true;
            } catch (error) {
                error.input = {
                    categoryDbId: categoryDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateCategoryAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {categoryDbId} categoryDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateCategoryAfterReading: async ({
        categoryDbId
    }, context) => {
        if ((await checkAuthorization(context, 'category', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    category,
                    categoryDbId);
                return true;
            } catch (error) {
                error.input = {
                    categoryDbId: categoryDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addCategory - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addCategory: async function(input, context) {
        let authorization = await checkAuthorization(context, 'category', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.category.definition);
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
            let createdCategory = await category.addOne(inputSanitized, context.benignErrors, token);
            await createdCategory.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdCategory;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteCategory - Check user authorization and delete a record with the specified categoryDbId in the categoryDbId argument.
     *
     * @param  {number} {categoryDbId}    categoryDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteCategory: async function({
        categoryDbId
    }, context) {
        if (await checkAuthorization(context, 'category', 'delete') === true) {
            if (await validForDeletion(categoryDbId, context)) {
                await updateAssociations(categoryDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return category.deleteOne(categoryDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateCategory - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateCategory: async function(input, context) {
        let authorization = await checkAuthorization(context, 'category', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.category.definition);
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
            let updatedCategory = await category.updateOne(inputSanitized, context.benignErrors, token);
            await updatedCategory.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedCategory;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateCategory - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateCategory: async function(_, context) {
        if (await checkAuthorization(context, 'category', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return category.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * categoriesZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    categoriesZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "category", "read")) === true) {
            return category.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}