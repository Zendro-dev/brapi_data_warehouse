/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const breedingmethod = require(path.join(__dirname, '..', 'models', 'index.js')).breedingmethod;
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
    'addGermplasm': 'germplasm',
    'addPedigreeNodes': 'pedigreenode'
}




/**
 * breedingmethod.prototype.germplasmFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
breedingmethod.prototype.germplasmFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.germplasm_IDs) || this.germplasm_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.germplasm.idAttribute(),
        "value": this.germplasm_IDs.join(','),
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
 * breedingmethod.prototype.countFilteredGermplasm - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
breedingmethod.prototype.countFilteredGermplasm = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.germplasm_IDs) || this.germplasm_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.germplasm.idAttribute(),
        "value": this.germplasm_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countGermplasms({
        search: nsearch
    }, context);
}

/**
 * breedingmethod.prototype.germplasmConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
breedingmethod.prototype.germplasmConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.germplasm_IDs) || this.germplasm_IDs.length === 0) {
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
        "value": this.germplasm_IDs.join(','),
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
 * breedingmethod.prototype.pedigreeNodesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
breedingmethod.prototype.pedigreeNodesFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.pedigreeNodes_IDs) || this.pedigreeNodes_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.pedigreenode.idAttribute(),
        "value": this.pedigreeNodes_IDs.join(','),
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
 * breedingmethod.prototype.countFilteredPedigreeNodes - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
breedingmethod.prototype.countFilteredPedigreeNodes = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.pedigreeNodes_IDs) || this.pedigreeNodes_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.pedigreenode.idAttribute(),
        "value": this.pedigreeNodes_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countPedigreenodes({
        search: nsearch
    }, context);
}

/**
 * breedingmethod.prototype.pedigreeNodesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
breedingmethod.prototype.pedigreeNodesConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.pedigreeNodes_IDs) || this.pedigreeNodes_IDs.length === 0) {
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
        "value": this.pedigreeNodes_IDs.join(','),
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
breedingmethod.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addGermplasm)) {
        promises_add.push(this.add_germplasm(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addPedigreeNodes)) {
        promises_add.push(this.add_pedigreeNodes(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removeGermplasm)) {
        promises_remove.push(this.remove_germplasm(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removePedigreeNodes)) {
        promises_remove.push(this.remove_pedigreeNodes(input, benignErrorReporter, token));
    }

    await Promise.all(promises_remove);

}
/**
 * add_germplasm - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
breedingmethod.prototype.add_germplasm = async function(input, benignErrorReporter, token) {

    await breedingmethod.add_germplasm_IDs(this.getIdValue(), input.addGermplasm, benignErrorReporter, token);
    this.germplasm_IDs = helper.unionIds(this.germplasm_IDs, input.addGermplasm);
}

/**
 * add_pedigreeNodes - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
breedingmethod.prototype.add_pedigreeNodes = async function(input, benignErrorReporter, token) {

    await breedingmethod.add_pedigreeNodes_IDs(this.getIdValue(), input.addPedigreeNodes, benignErrorReporter, token);
    this.pedigreeNodes_IDs = helper.unionIds(this.pedigreeNodes_IDs, input.addPedigreeNodes);
}

/**
 * remove_germplasm - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
breedingmethod.prototype.remove_germplasm = async function(input, benignErrorReporter, token) {

    await breedingmethod.remove_germplasm_IDs(this.getIdValue(), input.removeGermplasm, benignErrorReporter, token);
    this.germplasm_IDs = helper.differenceIds(this.germplasm_IDs, input.removeGermplasm);
}

/**
 * remove_pedigreeNodes - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
breedingmethod.prototype.remove_pedigreeNodes = async function(input, benignErrorReporter, token) {

    await breedingmethod.remove_pedigreeNodes_IDs(this.getIdValue(), input.removePedigreeNodes, benignErrorReporter, token);
    this.pedigreeNodes_IDs = helper.differenceIds(this.pedigreeNodes_IDs, input.removePedigreeNodes);
}



/**
 * countAssociatedRecordsWithRejectReaction - Count associated records with reject deletion action
 *
 * @param  {ID} id      Id of the record which the associations will be counted
 * @param  {objec} context Default context by resolver
 * @return {Int}         Number of associated records
 */
async function countAssociatedRecordsWithRejectReaction(id, context) {

    let breedingmethod = await resolvers.readOneBreedingmethod({
        breedingMethodDbId: id
    }, context);
    //check that record actually exists
    if (breedingmethod === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(breedingmethod.germplasm_IDs) ? breedingmethod.germplasm_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(breedingmethod.pedigreeNodes_IDs) ? breedingmethod.pedigreeNodes_IDs.length : 0;


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
        throw new Error(`breedingmethod with breedingMethodDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const breedingmethod_record = await resolvers.readOneBreedingmethod({
            breedingMethodDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * breedingmethods - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    breedingmethods: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'breedingmethod', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "breedingmethods");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await breedingmethod.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * breedingmethodsConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    breedingmethodsConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'breedingmethod', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "breedingmethodsConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await breedingmethod.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneBreedingmethod - Check user authorization and return one record with the specified breedingMethodDbId in the breedingMethodDbId argument.
     *
     * @param  {number} {breedingMethodDbId}    breedingMethodDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with breedingMethodDbId requested
     */
    readOneBreedingmethod: async function({
        breedingMethodDbId
    }, context) {
        if (await checkAuthorization(context, 'breedingmethod', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneBreedingmethod");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await breedingmethod.readById(breedingMethodDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countBreedingmethods - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countBreedingmethods: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'breedingmethod', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await breedingmethod.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateBreedingmethodForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateBreedingmethodForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'breedingmethod', 'read');
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
                    breedingmethod,
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
     * validateBreedingmethodForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateBreedingmethodForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'breedingmethod', 'read');
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
                    breedingmethod,
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
     * validateBreedingmethodForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {breedingMethodDbId} breedingMethodDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateBreedingmethodForDeletion: async ({
        breedingMethodDbId
    }, context) => {
        if ((await checkAuthorization(context, 'breedingmethod', 'read')) === true) {
            try {
                await validForDeletion(breedingMethodDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    breedingmethod,
                    breedingMethodDbId);
                return true;
            } catch (error) {
                error.input = {
                    breedingMethodDbId: breedingMethodDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateBreedingmethodAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {breedingMethodDbId} breedingMethodDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateBreedingmethodAfterReading: async ({
        breedingMethodDbId
    }, context) => {
        if ((await checkAuthorization(context, 'breedingmethod', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    breedingmethod,
                    breedingMethodDbId);
                return true;
            } catch (error) {
                error.input = {
                    breedingMethodDbId: breedingMethodDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addBreedingmethod - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addBreedingmethod: async function(input, context) {
        let authorization = await checkAuthorization(context, 'breedingmethod', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.breedingmethod.definition);
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
            let createdBreedingmethod = await breedingmethod.addOne(inputSanitized, context.benignErrors, token);
            await createdBreedingmethod.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdBreedingmethod;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteBreedingmethod - Check user authorization and delete a record with the specified breedingMethodDbId in the breedingMethodDbId argument.
     *
     * @param  {number} {breedingMethodDbId}    breedingMethodDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteBreedingmethod: async function({
        breedingMethodDbId
    }, context) {
        if (await checkAuthorization(context, 'breedingmethod', 'delete') === true) {
            if (await validForDeletion(breedingMethodDbId, context)) {
                await updateAssociations(breedingMethodDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return breedingmethod.deleteOne(breedingMethodDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateBreedingmethod - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateBreedingmethod: async function(input, context) {
        let authorization = await checkAuthorization(context, 'breedingmethod', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.breedingmethod.definition);
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
            let updatedBreedingmethod = await breedingmethod.updateOne(inputSanitized, context.benignErrors, token);
            await updatedBreedingmethod.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedBreedingmethod;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateBreedingmethod - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateBreedingmethod: async function(_, context) {
        if (await checkAuthorization(context, 'breedingmethod', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return breedingmethod.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * breedingmethodsZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    breedingmethodsZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "breedingmethod", "read")) === true) {
            return breedingmethod.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}