/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const sourcegermplasm = require(path.join(__dirname, '..', 'models', 'index.js')).sourcegermplasm;
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
    'addReferenceset': 'referenceset',
    'addReference': 'reference'
}



/**
 * sourcegermplasm.prototype.referenceset - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
sourcegermplasm.prototype.referenceset = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.referenceset_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneReferenceset({
                [models.referenceset.idAttribute()]: this.referenceset_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.referenceset.idAttribute(),
                "value": this.referenceset_ID,
                "operator": "eq"
            });
            let found = (await resolvers.referencesetsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 referencesets matching sourcegermplasm with sourceGermplasmDbId ${this.referenceset_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the sourcegermplasm model. Returning first referenceset.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * sourcegermplasm.prototype.reference - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
sourcegermplasm.prototype.reference = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.reference_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneReference({
                [models.reference.idAttribute()]: this.reference_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.reference.idAttribute(),
                "value": this.reference_ID,
                "operator": "eq"
            });
            let found = (await resolvers.referencesConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 references matching sourcegermplasm with sourceGermplasmDbId ${this.reference_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the sourcegermplasm model. Returning first reference.`
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
sourcegermplasm.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];

    if (helper.isNotUndefinedAndNotNull(input.addReferenceset)) {
        promises_add.push(this.add_referenceset(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addReference)) {
        promises_add.push(this.add_reference(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];

    if (helper.isNotUndefinedAndNotNull(input.removeReferenceset)) {
        promises_remove.push(this.remove_referenceset(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeReference)) {
        promises_remove.push(this.remove_reference(input, benignErrorReporter, token));
    }

    await Promise.all(promises_remove);

}
/**
 * add_referenceset - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
sourcegermplasm.prototype.add_referenceset = async function(input, benignErrorReporter, token) {
    await sourcegermplasm.add_referenceset_ID(this.getIdValue(), input.addReferenceset, benignErrorReporter, token);
    this.referenceset_ID = input.addReferenceset;
}

/**
 * add_reference - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
sourcegermplasm.prototype.add_reference = async function(input, benignErrorReporter, token) {
    await sourcegermplasm.add_reference_ID(this.getIdValue(), input.addReference, benignErrorReporter, token);
    this.reference_ID = input.addReference;
}

/**
 * remove_referenceset - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
sourcegermplasm.prototype.remove_referenceset = async function(input, benignErrorReporter, token) {
    if (input.removeReferenceset == this.referenceset_ID) {
        await sourcegermplasm.remove_referenceset_ID(this.getIdValue(), input.removeReferenceset, benignErrorReporter, token);
        this.referenceset_ID = null;
    }
}

/**
 * remove_reference - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
sourcegermplasm.prototype.remove_reference = async function(input, benignErrorReporter, token) {
    if (input.removeReference == this.reference_ID) {
        await sourcegermplasm.remove_reference_ID(this.getIdValue(), input.removeReference, benignErrorReporter, token);
        this.reference_ID = null;
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

    let sourcegermplasm = await resolvers.readOneSourcegermplasm({
        sourceGermplasmDbId: id
    }, context);
    //check that record actually exists
    if (sourcegermplasm === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_one_associated_fk += [null, undefined].includes(sourcegermplasm.referenceset_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(sourcegermplasm.reference_ID) ? 0 : 1;


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
        throw new Error(`sourcegermplasm with sourceGermplasmDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const sourcegermplasm_record = await resolvers.readOneSourcegermplasm({
            sourceGermplasmDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * sourcegermplasms - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    sourcegermplasms: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'sourcegermplasm', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "sourcegermplasms");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await sourcegermplasm.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * sourcegermplasmsConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    sourcegermplasmsConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'sourcegermplasm', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "sourcegermplasmsConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await sourcegermplasm.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneSourcegermplasm - Check user authorization and return one record with the specified sourceGermplasmDbId in the sourceGermplasmDbId argument.
     *
     * @param  {number} {sourceGermplasmDbId}    sourceGermplasmDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with sourceGermplasmDbId requested
     */
    readOneSourcegermplasm: async function({
        sourceGermplasmDbId
    }, context) {
        if (await checkAuthorization(context, 'sourcegermplasm', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneSourcegermplasm");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await sourcegermplasm.readById(sourceGermplasmDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countSourcegermplasms - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countSourcegermplasms: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'sourcegermplasm', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await sourcegermplasm.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateSourcegermplasmForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateSourcegermplasmForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'sourcegermplasm', 'read');
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
                    sourcegermplasm,
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
     * validateSourcegermplasmForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateSourcegermplasmForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'sourcegermplasm', 'read');
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
                    sourcegermplasm,
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
     * validateSourcegermplasmForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {sourceGermplasmDbId} sourceGermplasmDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateSourcegermplasmForDeletion: async ({
        sourceGermplasmDbId
    }, context) => {
        if ((await checkAuthorization(context, 'sourcegermplasm', 'read')) === true) {
            try {
                await validForDeletion(sourceGermplasmDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    sourcegermplasm,
                    sourceGermplasmDbId);
                return true;
            } catch (error) {
                error.input = {
                    sourceGermplasmDbId: sourceGermplasmDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateSourcegermplasmAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {sourceGermplasmDbId} sourceGermplasmDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateSourcegermplasmAfterReading: async ({
        sourceGermplasmDbId
    }, context) => {
        if ((await checkAuthorization(context, 'sourcegermplasm', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    sourcegermplasm,
                    sourceGermplasmDbId);
                return true;
            } catch (error) {
                error.input = {
                    sourceGermplasmDbId: sourceGermplasmDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addSourcegermplasm - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addSourcegermplasm: async function(input, context) {
        let authorization = await checkAuthorization(context, 'sourcegermplasm', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.sourcegermplasm.definition);
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
            let createdSourcegermplasm = await sourcegermplasm.addOne(inputSanitized, context.benignErrors, token);
            await createdSourcegermplasm.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdSourcegermplasm;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteSourcegermplasm - Check user authorization and delete a record with the specified sourceGermplasmDbId in the sourceGermplasmDbId argument.
     *
     * @param  {number} {sourceGermplasmDbId}    sourceGermplasmDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteSourcegermplasm: async function({
        sourceGermplasmDbId
    }, context) {
        if (await checkAuthorization(context, 'sourcegermplasm', 'delete') === true) {
            if (await validForDeletion(sourceGermplasmDbId, context)) {
                await updateAssociations(sourceGermplasmDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return sourcegermplasm.deleteOne(sourceGermplasmDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateSourcegermplasm - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateSourcegermplasm: async function(input, context) {
        let authorization = await checkAuthorization(context, 'sourcegermplasm', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.sourcegermplasm.definition);
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
            let updatedSourcegermplasm = await sourcegermplasm.updateOne(inputSanitized, context.benignErrors, token);
            await updatedSourcegermplasm.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedSourcegermplasm;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateSourcegermplasm - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateSourcegermplasm: async function(_, context) {
        if (await checkAuthorization(context, 'sourcegermplasm', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return sourcegermplasm.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * sourcegermplasmsZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    sourcegermplasmsZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "sourcegermplasm", "read")) === true) {
            return sourcegermplasm.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}