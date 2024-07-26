/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const sibling = require(path.join(__dirname, '..', 'models', 'index.js')).sibling;
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
    'addSiblingGermplasm': 'germplasm',
    'addPedigreeNode': 'pedigreenode'
}



/**
 * sibling.prototype.siblingGermplasm - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
sibling.prototype.siblingGermplasm = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.siblingGermplasm_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneGermplasm({
                [models.germplasm.idAttribute()]: this.siblingGermplasm_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.germplasm.idAttribute(),
                "value": this.siblingGermplasm_ID,
                "operator": "eq"
            });
            let found = (await resolvers.germplasmsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 germplasms matching sibling with siblingDbId ${this.siblingGermplasm_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the sibling model. Returning first germplasm.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}

/**
 * sibling.prototype.pedigreeNodeFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
sibling.prototype.pedigreeNodeFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.pedigreeNode_IDs) || this.pedigreeNode_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.pedigreenode.idAttribute(),
        "value": this.pedigreeNode_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.pedigreenodes({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * sibling.prototype.countFilteredPedigreeNode - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
sibling.prototype.countFilteredPedigreeNode = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.pedigreeNode_IDs) || this.pedigreeNode_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.pedigreenode.idAttribute(),
        "value": this.pedigreeNode_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countPedigreenodes({
        search: nsearch
    }, context);
}

/**
 * sibling.prototype.pedigreeNodeConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
sibling.prototype.pedigreeNodeConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.pedigreeNode_IDs) || this.pedigreeNode_IDs.length === 0) {
        return {
            edges: [],
            pedigreenodes: [],
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
        "field": models.pedigreenode.idAttribute(),
        "value": this.pedigreeNode_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.pedigreenodesConnection({
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
sibling.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addPedigreeNode)) {
        promises_add.push(this.add_pedigreeNode(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addSiblingGermplasm)) {
        promises_add.push(this.add_siblingGermplasm(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removePedigreeNode)) {
        promises_remove.push(this.remove_pedigreeNode(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeSiblingGermplasm)) {
        promises_remove.push(this.remove_siblingGermplasm(input, benignErrorReporter, token));
    }

    await Promise.all(promises_remove);

}
/**
 * add_pedigreeNode - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
sibling.prototype.add_pedigreeNode = async function(input, benignErrorReporter, token) {

    await sibling.add_pedigreeNode_IDs(this.getIdValue(), input.addPedigreeNode, benignErrorReporter, token);
    this.pedigreeNode_IDs = helper.unionIds(this.pedigreeNode_IDs, input.addPedigreeNode);
}

/**
 * add_siblingGermplasm - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
sibling.prototype.add_siblingGermplasm = async function(input, benignErrorReporter, token) {
    await sibling.add_siblingGermplasm_ID(this.getIdValue(), input.addSiblingGermplasm, benignErrorReporter, token);
    this.siblingGermplasm_ID = input.addSiblingGermplasm;
}

/**
 * remove_pedigreeNode - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
sibling.prototype.remove_pedigreeNode = async function(input, benignErrorReporter, token) {

    await sibling.remove_pedigreeNode_IDs(this.getIdValue(), input.removePedigreeNode, benignErrorReporter, token);
    this.pedigreeNode_IDs = helper.differenceIds(this.pedigreeNode_IDs, input.removePedigreeNode);
}

/**
 * remove_siblingGermplasm - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
sibling.prototype.remove_siblingGermplasm = async function(input, benignErrorReporter, token) {
    if (input.removeSiblingGermplasm == this.siblingGermplasm_ID) {
        await sibling.remove_siblingGermplasm_ID(this.getIdValue(), input.removeSiblingGermplasm, benignErrorReporter, token);
        this.siblingGermplasm_ID = null;
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

    let sibling = await resolvers.readOneSibling({
        siblingDbId: id
    }, context);
    //check that record actually exists
    if (sibling === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(sibling.pedigreeNode_IDs) ? sibling.pedigreeNode_IDs.length : 0;

    get_to_one_associated_fk += [null, undefined].includes(sibling.siblingGermplasm_ID) ? 0 : 1;


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
        throw new Error(`sibling with siblingDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const sibling_record = await resolvers.readOneSibling({
            siblingDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * siblings - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    siblings: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'sibling', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "siblings");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await sibling.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * siblingsConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    siblingsConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'sibling', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "siblingsConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await sibling.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneSibling - Check user authorization and return one record with the specified siblingDbId in the siblingDbId argument.
     *
     * @param  {number} {siblingDbId}    siblingDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with siblingDbId requested
     */
    readOneSibling: async function({
        siblingDbId
    }, context) {
        if (await checkAuthorization(context, 'sibling', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneSibling");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await sibling.readById(siblingDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countSiblings - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countSiblings: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'sibling', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await sibling.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateSiblingForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateSiblingForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'sibling', 'read');
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
                    sibling,
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
     * validateSiblingForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateSiblingForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'sibling', 'read');
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
                    sibling,
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
     * validateSiblingForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {siblingDbId} siblingDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateSiblingForDeletion: async ({
        siblingDbId
    }, context) => {
        if ((await checkAuthorization(context, 'sibling', 'read')) === true) {
            try {
                await validForDeletion(siblingDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    sibling,
                    siblingDbId);
                return true;
            } catch (error) {
                error.input = {
                    siblingDbId: siblingDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateSiblingAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {siblingDbId} siblingDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateSiblingAfterReading: async ({
        siblingDbId
    }, context) => {
        if ((await checkAuthorization(context, 'sibling', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    sibling,
                    siblingDbId);
                return true;
            } catch (error) {
                error.input = {
                    siblingDbId: siblingDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addSibling - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addSibling: async function(input, context) {
        let authorization = await checkAuthorization(context, 'sibling', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.sibling.definition);
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
            let createdSibling = await sibling.addOne(inputSanitized, context.benignErrors, token);
            await createdSibling.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdSibling;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteSibling - Check user authorization and delete a record with the specified siblingDbId in the siblingDbId argument.
     *
     * @param  {number} {siblingDbId}    siblingDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteSibling: async function({
        siblingDbId
    }, context) {
        if (await checkAuthorization(context, 'sibling', 'delete') === true) {
            if (await validForDeletion(siblingDbId, context)) {
                await updateAssociations(siblingDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return sibling.deleteOne(siblingDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateSibling - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateSibling: async function(input, context) {
        let authorization = await checkAuthorization(context, 'sibling', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.sibling.definition);
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
            let updatedSibling = await sibling.updateOne(inputSanitized, context.benignErrors, token);
            await updatedSibling.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedSibling;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateSibling - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateSibling: async function(_, context) {
        if (await checkAuthorization(context, 'sibling', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return sibling.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * siblingsZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    siblingsZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "sibling", "read")) === true) {
            return sibling.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}