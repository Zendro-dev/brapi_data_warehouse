/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const call = require(path.join(__dirname, '..', 'models', 'index.js')).call;
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
    'addCallSet': 'callset',
    'addVariant': 'variant',
    'addVariantSet': 'variantset',
    'addAdditionalInfo': 'additionalinfo',
    'addGenotypeMetadata': 'genotypemetadata'
}



/**
 * call.prototype.callSet - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
call.prototype.callSet = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.callSet_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneCallset({
                [models.callset.idAttribute()]: this.callSet_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.callset.idAttribute(),
                "value": this.callSet_ID,
                "operator": "eq"
            });
            let found = (await resolvers.callsetsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 callsets matching call with callDbId ${this.callSet_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the call model. Returning first callset.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * call.prototype.variant - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
call.prototype.variant = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.variant_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneVariant({
                [models.variant.idAttribute()]: this.variant_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.variant.idAttribute(),
                "value": this.variant_ID,
                "operator": "eq"
            });
            let found = (await resolvers.variantsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 variants matching call with callDbId ${this.variant_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the call model. Returning first variant.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * call.prototype.variantSet - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
call.prototype.variantSet = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.variantSet_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneVariantset({
                [models.variantset.idAttribute()]: this.variantSet_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.variantset.idAttribute(),
                "value": this.variantSet_ID,
                "operator": "eq"
            });
            let found = (await resolvers.variantsetsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 variantsets matching call with callDbId ${this.variantSet_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the call model. Returning first variantset.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}

/**
 * call.prototype.additionalInfoFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
call.prototype.additionalInfoFilter = function({
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
 * call.prototype.countFilteredAdditionalInfo - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
call.prototype.countFilteredAdditionalInfo = function({
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
 * call.prototype.additionalInfoConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
call.prototype.additionalInfoConnection = function({
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
 * call.prototype.genotypeMetadataFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
call.prototype.genotypeMetadataFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.genotypeMetadata_IDs) || this.genotypeMetadata_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.genotypemetadata.idAttribute(),
        "value": this.genotypeMetadata_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.genotypemetadata({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * call.prototype.countFilteredGenotypeMetadata - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
call.prototype.countFilteredGenotypeMetadata = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.genotypeMetadata_IDs) || this.genotypeMetadata_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.genotypemetadata.idAttribute(),
        "value": this.genotypeMetadata_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countGenotypemetadata({
        search: nsearch
    }, context);
}

/**
 * call.prototype.genotypeMetadataConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
call.prototype.genotypeMetadataConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.genotypeMetadata_IDs) || this.genotypeMetadata_IDs.length === 0) {
        return {
            edges: [],
            genotypemetadata: [],
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
        "field": models.genotypemetadata.idAttribute(),
        "value": this.genotypeMetadata_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.genotypemetadataConnection({
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
call.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addAdditionalInfo)) {
        promises_add.push(this.add_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addGenotypeMetadata)) {
        promises_add.push(this.add_genotypeMetadata(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addCallSet)) {
        promises_add.push(this.add_callSet(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addVariant)) {
        promises_add.push(this.add_variant(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addVariantSet)) {
        promises_add.push(this.add_variantSet(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removeAdditionalInfo)) {
        promises_remove.push(this.remove_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeGenotypeMetadata)) {
        promises_remove.push(this.remove_genotypeMetadata(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeCallSet)) {
        promises_remove.push(this.remove_callSet(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeVariant)) {
        promises_remove.push(this.remove_variant(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeVariantSet)) {
        promises_remove.push(this.remove_variantSet(input, benignErrorReporter, token));
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
call.prototype.add_additionalInfo = async function(input, benignErrorReporter, token) {

    await call.add_additionalInfo_IDs(this.getIdValue(), input.addAdditionalInfo, benignErrorReporter, token);
    this.additionalInfo_IDs = helper.unionIds(this.additionalInfo_IDs, input.addAdditionalInfo);
}

/**
 * add_genotypeMetadata - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
call.prototype.add_genotypeMetadata = async function(input, benignErrorReporter, token) {

    await call.add_genotypeMetadata_IDs(this.getIdValue(), input.addGenotypeMetadata, benignErrorReporter, token);
    this.genotypeMetadata_IDs = helper.unionIds(this.genotypeMetadata_IDs, input.addGenotypeMetadata);
}

/**
 * add_callSet - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
call.prototype.add_callSet = async function(input, benignErrorReporter, token) {
    await call.add_callSet_ID(this.getIdValue(), input.addCallSet, benignErrorReporter, token);
    this.callSet_ID = input.addCallSet;
}

/**
 * add_variant - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
call.prototype.add_variant = async function(input, benignErrorReporter, token) {
    await call.add_variant_ID(this.getIdValue(), input.addVariant, benignErrorReporter, token);
    this.variant_ID = input.addVariant;
}

/**
 * add_variantSet - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
call.prototype.add_variantSet = async function(input, benignErrorReporter, token) {
    await call.add_variantSet_ID(this.getIdValue(), input.addVariantSet, benignErrorReporter, token);
    this.variantSet_ID = input.addVariantSet;
}

/**
 * remove_additionalInfo - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
call.prototype.remove_additionalInfo = async function(input, benignErrorReporter, token) {

    await call.remove_additionalInfo_IDs(this.getIdValue(), input.removeAdditionalInfo, benignErrorReporter, token);
    this.additionalInfo_IDs = helper.differenceIds(this.additionalInfo_IDs, input.removeAdditionalInfo);
}

/**
 * remove_genotypeMetadata - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
call.prototype.remove_genotypeMetadata = async function(input, benignErrorReporter, token) {

    await call.remove_genotypeMetadata_IDs(this.getIdValue(), input.removeGenotypeMetadata, benignErrorReporter, token);
    this.genotypeMetadata_IDs = helper.differenceIds(this.genotypeMetadata_IDs, input.removeGenotypeMetadata);
}

/**
 * remove_callSet - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
call.prototype.remove_callSet = async function(input, benignErrorReporter, token) {
    if (input.removeCallSet == this.callSet_ID) {
        await call.remove_callSet_ID(this.getIdValue(), input.removeCallSet, benignErrorReporter, token);
        this.callSet_ID = null;
    }
}

/**
 * remove_variant - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
call.prototype.remove_variant = async function(input, benignErrorReporter, token) {
    if (input.removeVariant == this.variant_ID) {
        await call.remove_variant_ID(this.getIdValue(), input.removeVariant, benignErrorReporter, token);
        this.variant_ID = null;
    }
}

/**
 * remove_variantSet - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
call.prototype.remove_variantSet = async function(input, benignErrorReporter, token) {
    if (input.removeVariantSet == this.variantSet_ID) {
        await call.remove_variantSet_ID(this.getIdValue(), input.removeVariantSet, benignErrorReporter, token);
        this.variantSet_ID = null;
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

    let call = await resolvers.readOneCall({
        callDbId: id
    }, context);
    //check that record actually exists
    if (call === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(call.additionalInfo_IDs) ? call.additionalInfo_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(call.genotypeMetadata_IDs) ? call.genotypeMetadata_IDs.length : 0;

    get_to_one_associated_fk += [null, undefined].includes(call.callSet_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(call.variant_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(call.variantSet_ID) ? 0 : 1;


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
        throw new Error(`call with callDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const call_record = await resolvers.readOneCall({
            callDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * calls - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    calls: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'call', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "calls");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await call.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * callsConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    callsConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'call', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "callsConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await call.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneCall - Check user authorization and return one record with the specified callDbId in the callDbId argument.
     *
     * @param  {number} {callDbId}    callDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with callDbId requested
     */
    readOneCall: async function({
        callDbId
    }, context) {
        if (await checkAuthorization(context, 'call', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneCall");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await call.readById(callDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countCalls - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countCalls: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'call', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await call.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateCallForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateCallForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'call', 'read');
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
                    call,
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
     * validateCallForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateCallForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'call', 'read');
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
                    call,
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
     * validateCallForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {callDbId} callDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateCallForDeletion: async ({
        callDbId
    }, context) => {
        if ((await checkAuthorization(context, 'call', 'read')) === true) {
            try {
                await validForDeletion(callDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    call,
                    callDbId);
                return true;
            } catch (error) {
                error.input = {
                    callDbId: callDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateCallAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {callDbId} callDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateCallAfterReading: async ({
        callDbId
    }, context) => {
        if ((await checkAuthorization(context, 'call', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    call,
                    callDbId);
                return true;
            } catch (error) {
                error.input = {
                    callDbId: callDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addCall - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addCall: async function(input, context) {
        let authorization = await checkAuthorization(context, 'call', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.call.definition);
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
            let createdCall = await call.addOne(inputSanitized, context.benignErrors, token);
            await createdCall.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdCall;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteCall - Check user authorization and delete a record with the specified callDbId in the callDbId argument.
     *
     * @param  {number} {callDbId}    callDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteCall: async function({
        callDbId
    }, context) {
        if (await checkAuthorization(context, 'call', 'delete') === true) {
            if (await validForDeletion(callDbId, context)) {
                await updateAssociations(callDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return call.deleteOne(callDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateCall - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateCall: async function(input, context) {
        let authorization = await checkAuthorization(context, 'call', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.call.definition);
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
            let updatedCall = await call.updateOne(inputSanitized, context.benignErrors, token);
            await updatedCall.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedCall;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateCall - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateCall: async function(_, context) {
        if (await checkAuthorization(context, 'call', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return call.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * callsZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    callsZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "call", "read")) === true) {
            return call.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}