/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const seedlottransaction = require(path.join(__dirname, '..', 'models', 'index.js')).seedlottransaction;
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
    'addFromSeedLot': 'seedlot',
    'addToSeedLot': 'seedlot',
    'addAdditionalInfo': 'additionalinfo',
    'addExternalReferences': 'externalreference'
}



/**
 * seedlottransaction.prototype.fromSeedLot - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
seedlottransaction.prototype.fromSeedLot = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.fromSeedLot_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneSeedlot({
                [models.seedlot.idAttribute()]: this.fromSeedLot_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.seedlot.idAttribute(),
                "value": this.fromSeedLot_ID,
                "operator": "eq"
            });
            let found = (await resolvers.seedlotsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 seedlots matching seedlottransaction with seedLotTransactionDbId ${this.fromSeedLot_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the seedlottransaction model. Returning first seedlot.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * seedlottransaction.prototype.toSeedLot - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
seedlottransaction.prototype.toSeedLot = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.toSeedLot_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneSeedlot({
                [models.seedlot.idAttribute()]: this.toSeedLot_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.seedlot.idAttribute(),
                "value": this.toSeedLot_ID,
                "operator": "eq"
            });
            let found = (await resolvers.seedlotsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 seedlots matching seedlottransaction with seedLotTransactionDbId ${this.toSeedLot_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the seedlottransaction model. Returning first seedlot.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}

/**
 * seedlottransaction.prototype.additionalInfoFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
seedlottransaction.prototype.additionalInfoFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.additionalInfo_IDs) || this.additionalInfo_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.additionalinfo.idAttribute(),
        "value": this.additionalInfo_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.additionalinfos({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * seedlottransaction.prototype.countFilteredAdditionalInfo - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
seedlottransaction.prototype.countFilteredAdditionalInfo = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.additionalInfo_IDs) || this.additionalInfo_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.additionalinfo.idAttribute(),
        "value": this.additionalInfo_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countAdditionalinfos({
        search: nsearch
    }, context);
}

/**
 * seedlottransaction.prototype.additionalInfoConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
seedlottransaction.prototype.additionalInfoConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.additionalInfo_IDs) || this.additionalInfo_IDs.length === 0) {
        return {
            edges: [],
            additionalinfos: [],
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
        "field": models.additionalinfo.idAttribute(),
        "value": this.additionalInfo_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.additionalinfosConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * seedlottransaction.prototype.externalReferencesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
seedlottransaction.prototype.externalReferencesFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.externalReferences_IDs) || this.externalReferences_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.externalreference.idAttribute(),
        "value": this.externalReferences_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.externalreferences({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * seedlottransaction.prototype.countFilteredExternalReferences - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
seedlottransaction.prototype.countFilteredExternalReferences = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.externalReferences_IDs) || this.externalReferences_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.externalreference.idAttribute(),
        "value": this.externalReferences_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countExternalreferences({
        search: nsearch
    }, context);
}

/**
 * seedlottransaction.prototype.externalReferencesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
seedlottransaction.prototype.externalReferencesConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.externalReferences_IDs) || this.externalReferences_IDs.length === 0) {
        return {
            edges: [],
            externalreferences: [],
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
        "field": models.externalreference.idAttribute(),
        "value": this.externalReferences_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.externalreferencesConnection({
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
seedlottransaction.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addAdditionalInfo)) {
        promises_add.push(this.add_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addExternalReferences)) {
        promises_add.push(this.add_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addFromSeedLot)) {
        promises_add.push(this.add_fromSeedLot(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addToSeedLot)) {
        promises_add.push(this.add_toSeedLot(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removeAdditionalInfo)) {
        promises_remove.push(this.remove_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeExternalReferences)) {
        promises_remove.push(this.remove_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeFromSeedLot)) {
        promises_remove.push(this.remove_fromSeedLot(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeToSeedLot)) {
        promises_remove.push(this.remove_toSeedLot(input, benignErrorReporter, token));
    }

    await Promise.all(promises_remove);

}
/**
 * add_additionalInfo - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
seedlottransaction.prototype.add_additionalInfo = async function(input, benignErrorReporter, token) {

    await seedlottransaction.add_additionalInfo_IDs(this.getIdValue(), input.addAdditionalInfo, benignErrorReporter, token);
    this.additionalInfo_IDs = helper.unionIds(this.additionalInfo_IDs, input.addAdditionalInfo);
}

/**
 * add_externalReferences - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
seedlottransaction.prototype.add_externalReferences = async function(input, benignErrorReporter, token) {

    await seedlottransaction.add_externalReferences_IDs(this.getIdValue(), input.addExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.unionIds(this.externalReferences_IDs, input.addExternalReferences);
}

/**
 * add_fromSeedLot - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
seedlottransaction.prototype.add_fromSeedLot = async function(input, benignErrorReporter, token) {
    await seedlottransaction.add_fromSeedLot_ID(this.getIdValue(), input.addFromSeedLot, benignErrorReporter, token);
    this.fromSeedLot_ID = input.addFromSeedLot;
}

/**
 * add_toSeedLot - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
seedlottransaction.prototype.add_toSeedLot = async function(input, benignErrorReporter, token) {
    await seedlottransaction.add_toSeedLot_ID(this.getIdValue(), input.addToSeedLot, benignErrorReporter, token);
    this.toSeedLot_ID = input.addToSeedLot;
}

/**
 * remove_additionalInfo - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
seedlottransaction.prototype.remove_additionalInfo = async function(input, benignErrorReporter, token) {

    await seedlottransaction.remove_additionalInfo_IDs(this.getIdValue(), input.removeAdditionalInfo, benignErrorReporter, token);
    this.additionalInfo_IDs = helper.differenceIds(this.additionalInfo_IDs, input.removeAdditionalInfo);
}

/**
 * remove_externalReferences - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
seedlottransaction.prototype.remove_externalReferences = async function(input, benignErrorReporter, token) {

    await seedlottransaction.remove_externalReferences_IDs(this.getIdValue(), input.removeExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.differenceIds(this.externalReferences_IDs, input.removeExternalReferences);
}

/**
 * remove_fromSeedLot - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
seedlottransaction.prototype.remove_fromSeedLot = async function(input, benignErrorReporter, token) {
    if (input.removeFromSeedLot == this.fromSeedLot_ID) {
        await seedlottransaction.remove_fromSeedLot_ID(this.getIdValue(), input.removeFromSeedLot, benignErrorReporter, token);
        this.fromSeedLot_ID = null;
    }
}

/**
 * remove_toSeedLot - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
seedlottransaction.prototype.remove_toSeedLot = async function(input, benignErrorReporter, token) {
    if (input.removeToSeedLot == this.toSeedLot_ID) {
        await seedlottransaction.remove_toSeedLot_ID(this.getIdValue(), input.removeToSeedLot, benignErrorReporter, token);
        this.toSeedLot_ID = null;
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

    let seedlottransaction = await resolvers.readOneSeedlottransaction({
        seedLotTransactionDbId: id
    }, context);
    //check that record actually exists
    if (seedlottransaction === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(seedlottransaction.additionalInfo_IDs) ? seedlottransaction.additionalInfo_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(seedlottransaction.externalReferences_IDs) ? seedlottransaction.externalReferences_IDs.length : 0;

    get_to_one_associated_fk += [null, undefined].includes(seedlottransaction.fromSeedLot_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(seedlottransaction.toSeedLot_ID) ? 0 : 1;


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
        throw new Error(`seedlottransaction with seedLotTransactionDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const seedlottransaction_record = await resolvers.readOneSeedlottransaction({
            seedLotTransactionDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * seedlottransactions - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    seedlottransactions: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'seedlottransaction', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "seedlottransactions");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await seedlottransaction.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * seedlottransactionsConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    seedlottransactionsConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'seedlottransaction', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "seedlottransactionsConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await seedlottransaction.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneSeedlottransaction - Check user authorization and return one record with the specified seedLotTransactionDbId in the seedLotTransactionDbId argument.
     *
     * @param  {number} {seedLotTransactionDbId}    seedLotTransactionDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with seedLotTransactionDbId requested
     */
    readOneSeedlottransaction: async function({
        seedLotTransactionDbId
    }, context) {
        if (await checkAuthorization(context, 'seedlottransaction', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneSeedlottransaction");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await seedlottransaction.readById(seedLotTransactionDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countSeedlottransactions - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countSeedlottransactions: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'seedlottransaction', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await seedlottransaction.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateSeedlottransactionForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateSeedlottransactionForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'seedlottransaction', 'read');
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
                    seedlottransaction,
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
     * validateSeedlottransactionForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateSeedlottransactionForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'seedlottransaction', 'read');
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
                    seedlottransaction,
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
     * validateSeedlottransactionForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {seedLotTransactionDbId} seedLotTransactionDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateSeedlottransactionForDeletion: async ({
        seedLotTransactionDbId
    }, context) => {
        if ((await checkAuthorization(context, 'seedlottransaction', 'read')) === true) {
            try {
                await validForDeletion(seedLotTransactionDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    seedlottransaction,
                    seedLotTransactionDbId);
                return true;
            } catch (error) {
                error.input = {
                    seedLotTransactionDbId: seedLotTransactionDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateSeedlottransactionAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {seedLotTransactionDbId} seedLotTransactionDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateSeedlottransactionAfterReading: async ({
        seedLotTransactionDbId
    }, context) => {
        if ((await checkAuthorization(context, 'seedlottransaction', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    seedlottransaction,
                    seedLotTransactionDbId);
                return true;
            } catch (error) {
                error.input = {
                    seedLotTransactionDbId: seedLotTransactionDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addSeedlottransaction - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addSeedlottransaction: async function(input, context) {
        let authorization = await checkAuthorization(context, 'seedlottransaction', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.seedlottransaction.definition);
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
            let createdSeedlottransaction = await seedlottransaction.addOne(inputSanitized, context.benignErrors, token);
            await createdSeedlottransaction.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdSeedlottransaction;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteSeedlottransaction - Check user authorization and delete a record with the specified seedLotTransactionDbId in the seedLotTransactionDbId argument.
     *
     * @param  {number} {seedLotTransactionDbId}    seedLotTransactionDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteSeedlottransaction: async function({
        seedLotTransactionDbId
    }, context) {
        if (await checkAuthorization(context, 'seedlottransaction', 'delete') === true) {
            if (await validForDeletion(seedLotTransactionDbId, context)) {
                await updateAssociations(seedLotTransactionDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return seedlottransaction.deleteOne(seedLotTransactionDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateSeedlottransaction - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateSeedlottransaction: async function(input, context) {
        let authorization = await checkAuthorization(context, 'seedlottransaction', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.seedlottransaction.definition);
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
            let updatedSeedlottransaction = await seedlottransaction.updateOne(inputSanitized, context.benignErrors, token);
            await updatedSeedlottransaction.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedSeedlottransaction;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateSeedlottransaction - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateSeedlottransaction: async function(_, context) {
        if (await checkAuthorization(context, 'seedlottransaction', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return seedlottransaction.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * seedlottransactionsZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    seedlottransactionsZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "seedlottransaction", "read")) === true) {
            return seedlottransaction.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}