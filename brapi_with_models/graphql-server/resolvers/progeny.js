/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const progeny = require(path.join(__dirname, '..', 'models', 'index.js')).progeny;
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
    'addProgenyGermplasm': 'germplasm',
    'addPedigreeNode': 'pedigreenode'
}



/**
 * progeny.prototype.progenyGermplasm - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
progeny.prototype.progenyGermplasm = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.progenyGermplasm_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneGermplasm({
                [models.germplasm.idAttribute()]: this.progenyGermplasm_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.germplasm.idAttribute(),
                "value": this.progenyGermplasm_ID,
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
                        `Not unique "to_one" association Error: Found > 1 germplasms matching progeny with progenyDbId ${this.progenyGermplasm_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the progeny model. Returning first germplasm.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * progeny.prototype.pedigreeNode - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
progeny.prototype.pedigreeNode = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.pedigreeNode_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOnePedigreenode({
                [models.pedigreenode.idAttribute()]: this.pedigreeNode_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.pedigreenode.idAttribute(),
                "value": this.pedigreeNode_ID,
                "operator": "eq"
            });
            let found = (await resolvers.pedigreenodesConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 pedigreenodes matching progeny with progenyDbId ${this.pedigreeNode_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the progeny model. Returning first pedigreenode.`
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
progeny.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];

    if (helper.isNotUndefinedAndNotNull(input.addProgenyGermplasm)) {
        promises_add.push(this.add_progenyGermplasm(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addPedigreeNode)) {
        promises_add.push(this.add_pedigreeNode(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];

    if (helper.isNotUndefinedAndNotNull(input.removeProgenyGermplasm)) {
        promises_remove.push(this.remove_progenyGermplasm(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removePedigreeNode)) {
        promises_remove.push(this.remove_pedigreeNode(input, benignErrorReporter, token));
    }

    await Promise.all(promises_remove);

}
/**
 * add_progenyGermplasm - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
progeny.prototype.add_progenyGermplasm = async function(input, benignErrorReporter, token) {
    await progeny.add_progenyGermplasm_ID(this.getIdValue(), input.addProgenyGermplasm, benignErrorReporter, token);
    this.progenyGermplasm_ID = input.addProgenyGermplasm;
}

/**
 * add_pedigreeNode - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
progeny.prototype.add_pedigreeNode = async function(input, benignErrorReporter, token) {
    await progeny.add_pedigreeNode_ID(this.getIdValue(), input.addPedigreeNode, benignErrorReporter, token);
    this.pedigreeNode_ID = input.addPedigreeNode;
}

/**
 * remove_progenyGermplasm - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
progeny.prototype.remove_progenyGermplasm = async function(input, benignErrorReporter, token) {
    if (input.removeProgenyGermplasm == this.progenyGermplasm_ID) {
        await progeny.remove_progenyGermplasm_ID(this.getIdValue(), input.removeProgenyGermplasm, benignErrorReporter, token);
        this.progenyGermplasm_ID = null;
    }
}

/**
 * remove_pedigreeNode - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
progeny.prototype.remove_pedigreeNode = async function(input, benignErrorReporter, token) {
    if (input.removePedigreeNode == this.pedigreeNode_ID) {
        await progeny.remove_pedigreeNode_ID(this.getIdValue(), input.removePedigreeNode, benignErrorReporter, token);
        this.pedigreeNode_ID = null;
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

    let progeny = await resolvers.readOneProgeny({
        progenyDbId: id
    }, context);
    //check that record actually exists
    if (progeny === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_one_associated_fk += [null, undefined].includes(progeny.progenyGermplasm_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(progeny.pedigreeNode_ID) ? 0 : 1;


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
        throw new Error(`progeny with progenyDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const progeny_record = await resolvers.readOneProgeny({
            progenyDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * progenies - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    progenies: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'progeny', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "progenies");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await progeny.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * progeniesConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    progeniesConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'progeny', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "progeniesConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await progeny.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneProgeny - Check user authorization and return one record with the specified progenyDbId in the progenyDbId argument.
     *
     * @param  {number} {progenyDbId}    progenyDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with progenyDbId requested
     */
    readOneProgeny: async function({
        progenyDbId
    }, context) {
        if (await checkAuthorization(context, 'progeny', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneProgeny");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await progeny.readById(progenyDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countProgenies - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countProgenies: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'progeny', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await progeny.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateProgenyForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateProgenyForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'progeny', 'read');
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
                    progeny,
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
     * validateProgenyForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateProgenyForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'progeny', 'read');
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
                    progeny,
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
     * validateProgenyForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {progenyDbId} progenyDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateProgenyForDeletion: async ({
        progenyDbId
    }, context) => {
        if ((await checkAuthorization(context, 'progeny', 'read')) === true) {
            try {
                await validForDeletion(progenyDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    progeny,
                    progenyDbId);
                return true;
            } catch (error) {
                error.input = {
                    progenyDbId: progenyDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateProgenyAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {progenyDbId} progenyDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateProgenyAfterReading: async ({
        progenyDbId
    }, context) => {
        if ((await checkAuthorization(context, 'progeny', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    progeny,
                    progenyDbId);
                return true;
            } catch (error) {
                error.input = {
                    progenyDbId: progenyDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addProgeny - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addProgeny: async function(input, context) {
        let authorization = await checkAuthorization(context, 'progeny', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.progeny.definition);
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
            let createdProgeny = await progeny.addOne(inputSanitized, context.benignErrors, token);
            await createdProgeny.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdProgeny;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteProgeny - Check user authorization and delete a record with the specified progenyDbId in the progenyDbId argument.
     *
     * @param  {number} {progenyDbId}    progenyDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteProgeny: async function({
        progenyDbId
    }, context) {
        if (await checkAuthorization(context, 'progeny', 'delete') === true) {
            if (await validForDeletion(progenyDbId, context)) {
                await updateAssociations(progenyDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return progeny.deleteOne(progenyDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateProgeny - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateProgeny: async function(input, context) {
        let authorization = await checkAuthorization(context, 'progeny', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.progeny.definition);
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
            let updatedProgeny = await progeny.updateOne(inputSanitized, context.benignErrors, token);
            await updatedProgeny.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedProgeny;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateProgeny - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateProgeny: async function(_, context) {
        if (await checkAuthorization(context, 'progeny', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return progeny.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * progeniesZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    progeniesZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "progeny", "read")) === true) {
            return progeny.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}