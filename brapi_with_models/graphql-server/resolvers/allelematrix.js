/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const allelematrix = require(path.join(__dirname, '..', 'models', 'index.js')).allelematrix;
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
    'addCallSets': 'callset',
    'addDataMatrices': 'datamatrix',
    'addPagination': 'pagination',
    'addVariantSets': 'variantset',
    'addVariants': 'variant'
}




/**
 * allelematrix.prototype.callSetsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
allelematrix.prototype.callSetsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.callSets_IDs) || this.callSets_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.callset.idAttribute(),
        "value": this.callSets_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.callsets({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * allelematrix.prototype.countFilteredCallSets - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
allelematrix.prototype.countFilteredCallSets = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.callSets_IDs) || this.callSets_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.callset.idAttribute(),
        "value": this.callSets_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countCallsets({
        search: nsearch
    }, context);
}

/**
 * allelematrix.prototype.callSetsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
allelematrix.prototype.callSetsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.callSets_IDs) || this.callSets_IDs.length === 0) {
        return {
            edges: [],
            callsets: [],
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
        "field": models.callset.idAttribute(),
        "value": this.callSets_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.callsetsConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * allelematrix.prototype.dataMatricesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
allelematrix.prototype.dataMatricesFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.dataMatrices_IDs) || this.dataMatrices_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.datamatrix.idAttribute(),
        "value": this.dataMatrices_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.datamatrices({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * allelematrix.prototype.countFilteredDataMatrices - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
allelematrix.prototype.countFilteredDataMatrices = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.dataMatrices_IDs) || this.dataMatrices_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.datamatrix.idAttribute(),
        "value": this.dataMatrices_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countDatamatrices({
        search: nsearch
    }, context);
}

/**
 * allelematrix.prototype.dataMatricesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
allelematrix.prototype.dataMatricesConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.dataMatrices_IDs) || this.dataMatrices_IDs.length === 0) {
        return {
            edges: [],
            datamatrices: [],
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
        "field": models.datamatrix.idAttribute(),
        "value": this.dataMatrices_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.datamatricesConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * allelematrix.prototype.paginationFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
allelematrix.prototype.paginationFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.pagination_IDs) || this.pagination_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.pagination.idAttribute(),
        "value": this.pagination_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.paginations({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * allelematrix.prototype.countFilteredPagination - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
allelematrix.prototype.countFilteredPagination = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.pagination_IDs) || this.pagination_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.pagination.idAttribute(),
        "value": this.pagination_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countPaginations({
        search: nsearch
    }, context);
}

/**
 * allelematrix.prototype.paginationConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
allelematrix.prototype.paginationConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.pagination_IDs) || this.pagination_IDs.length === 0) {
        return {
            edges: [],
            paginations: [],
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
        "field": models.pagination.idAttribute(),
        "value": this.pagination_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.paginationsConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * allelematrix.prototype.variantSetsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
allelematrix.prototype.variantSetsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.variantSets_IDs) || this.variantSets_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.variantset.idAttribute(),
        "value": this.variantSets_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.variantsets({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * allelematrix.prototype.countFilteredVariantSets - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
allelematrix.prototype.countFilteredVariantSets = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.variantSets_IDs) || this.variantSets_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.variantset.idAttribute(),
        "value": this.variantSets_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countVariantsets({
        search: nsearch
    }, context);
}

/**
 * allelematrix.prototype.variantSetsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
allelematrix.prototype.variantSetsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.variantSets_IDs) || this.variantSets_IDs.length === 0) {
        return {
            edges: [],
            variantsets: [],
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
        "field": models.variantset.idAttribute(),
        "value": this.variantSets_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.variantsetsConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * allelematrix.prototype.variantsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
allelematrix.prototype.variantsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.variants_IDs) || this.variants_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.variant.idAttribute(),
        "value": this.variants_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.variants({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * allelematrix.prototype.countFilteredVariants - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
allelematrix.prototype.countFilteredVariants = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.variants_IDs) || this.variants_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.variant.idAttribute(),
        "value": this.variants_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countVariants({
        search: nsearch
    }, context);
}

/**
 * allelematrix.prototype.variantsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
allelematrix.prototype.variantsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.variants_IDs) || this.variants_IDs.length === 0) {
        return {
            edges: [],
            variants: [],
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
        "field": models.variant.idAttribute(),
        "value": this.variants_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.variantsConnection({
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
allelematrix.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addCallSets)) {
        promises_add.push(this.add_callSets(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addDataMatrices)) {
        promises_add.push(this.add_dataMatrices(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addPagination)) {
        promises_add.push(this.add_pagination(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addVariantSets)) {
        promises_add.push(this.add_variantSets(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addVariants)) {
        promises_add.push(this.add_variants(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removeCallSets)) {
        promises_remove.push(this.remove_callSets(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeDataMatrices)) {
        promises_remove.push(this.remove_dataMatrices(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removePagination)) {
        promises_remove.push(this.remove_pagination(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeVariantSets)) {
        promises_remove.push(this.remove_variantSets(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeVariants)) {
        promises_remove.push(this.remove_variants(input, benignErrorReporter, token));
    }

    await Promise.all(promises_remove);

}
/**
 * add_callSets - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
allelematrix.prototype.add_callSets = async function(input, benignErrorReporter, token) {

    await allelematrix.add_callSets_IDs(this.getIdValue(), input.addCallSets, benignErrorReporter, token);
    this.callSets_IDs = helper.unionIds(this.callSets_IDs, input.addCallSets);
}

/**
 * add_dataMatrices - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
allelematrix.prototype.add_dataMatrices = async function(input, benignErrorReporter, token) {

    await allelematrix.add_dataMatrices_IDs(this.getIdValue(), input.addDataMatrices, benignErrorReporter, token);
    this.dataMatrices_IDs = helper.unionIds(this.dataMatrices_IDs, input.addDataMatrices);
}

/**
 * add_pagination - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
allelematrix.prototype.add_pagination = async function(input, benignErrorReporter, token) {

    await allelematrix.add_pagination_IDs(this.getIdValue(), input.addPagination, benignErrorReporter, token);
    this.pagination_IDs = helper.unionIds(this.pagination_IDs, input.addPagination);
}

/**
 * add_variantSets - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
allelematrix.prototype.add_variantSets = async function(input, benignErrorReporter, token) {

    await allelematrix.add_variantSets_IDs(this.getIdValue(), input.addVariantSets, benignErrorReporter, token);
    this.variantSets_IDs = helper.unionIds(this.variantSets_IDs, input.addVariantSets);
}

/**
 * add_variants - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
allelematrix.prototype.add_variants = async function(input, benignErrorReporter, token) {

    await allelematrix.add_variants_IDs(this.getIdValue(), input.addVariants, benignErrorReporter, token);
    this.variants_IDs = helper.unionIds(this.variants_IDs, input.addVariants);
}

/**
 * remove_callSets - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
allelematrix.prototype.remove_callSets = async function(input, benignErrorReporter, token) {

    await allelematrix.remove_callSets_IDs(this.getIdValue(), input.removeCallSets, benignErrorReporter, token);
    this.callSets_IDs = helper.differenceIds(this.callSets_IDs, input.removeCallSets);
}

/**
 * remove_dataMatrices - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
allelematrix.prototype.remove_dataMatrices = async function(input, benignErrorReporter, token) {

    await allelematrix.remove_dataMatrices_IDs(this.getIdValue(), input.removeDataMatrices, benignErrorReporter, token);
    this.dataMatrices_IDs = helper.differenceIds(this.dataMatrices_IDs, input.removeDataMatrices);
}

/**
 * remove_pagination - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
allelematrix.prototype.remove_pagination = async function(input, benignErrorReporter, token) {

    await allelematrix.remove_pagination_IDs(this.getIdValue(), input.removePagination, benignErrorReporter, token);
    this.pagination_IDs = helper.differenceIds(this.pagination_IDs, input.removePagination);
}

/**
 * remove_variantSets - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
allelematrix.prototype.remove_variantSets = async function(input, benignErrorReporter, token) {

    await allelematrix.remove_variantSets_IDs(this.getIdValue(), input.removeVariantSets, benignErrorReporter, token);
    this.variantSets_IDs = helper.differenceIds(this.variantSets_IDs, input.removeVariantSets);
}

/**
 * remove_variants - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
allelematrix.prototype.remove_variants = async function(input, benignErrorReporter, token) {

    await allelematrix.remove_variants_IDs(this.getIdValue(), input.removeVariants, benignErrorReporter, token);
    this.variants_IDs = helper.differenceIds(this.variants_IDs, input.removeVariants);
}



/**
 * countAssociatedRecordsWithRejectReaction - Count associated records with reject deletion action
 *
 * @param  {ID} id      Id of the record which the associations will be counted
 * @param  {objec} context Default context by resolver
 * @return {Int}         Number of associated records
 */
async function countAssociatedRecordsWithRejectReaction(id, context) {

    let allelematrix = await resolvers.readOneAllelematrix({
        alleleMatrixDbId: id
    }, context);
    //check that record actually exists
    if (allelematrix === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(allelematrix.callSets_IDs) ? allelematrix.callSets_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(allelematrix.dataMatrices_IDs) ? allelematrix.dataMatrices_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(allelematrix.pagination_IDs) ? allelematrix.pagination_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(allelematrix.variantSets_IDs) ? allelematrix.variantSets_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(allelematrix.variants_IDs) ? allelematrix.variants_IDs.length : 0;


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
        throw new Error(`allelematrix with alleleMatrixDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const allelematrix_record = await resolvers.readOneAllelematrix({
            alleleMatrixDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * allelematrices - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    allelematrices: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'allelematrix', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "allelematrices");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await allelematrix.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * allelematricesConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    allelematricesConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'allelematrix', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "allelematricesConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await allelematrix.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneAllelematrix - Check user authorization and return one record with the specified alleleMatrixDbId in the alleleMatrixDbId argument.
     *
     * @param  {number} {alleleMatrixDbId}    alleleMatrixDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with alleleMatrixDbId requested
     */
    readOneAllelematrix: async function({
        alleleMatrixDbId
    }, context) {
        if (await checkAuthorization(context, 'allelematrix', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneAllelematrix");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await allelematrix.readById(alleleMatrixDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countAllelematrices - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countAllelematrices: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'allelematrix', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await allelematrix.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateAllelematrixForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateAllelematrixForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'allelematrix', 'read');
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
                    allelematrix,
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
     * validateAllelematrixForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateAllelematrixForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'allelematrix', 'read');
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
                    allelematrix,
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
     * validateAllelematrixForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {alleleMatrixDbId} alleleMatrixDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateAllelematrixForDeletion: async ({
        alleleMatrixDbId
    }, context) => {
        if ((await checkAuthorization(context, 'allelematrix', 'read')) === true) {
            try {
                await validForDeletion(alleleMatrixDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    allelematrix,
                    alleleMatrixDbId);
                return true;
            } catch (error) {
                error.input = {
                    alleleMatrixDbId: alleleMatrixDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateAllelematrixAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {alleleMatrixDbId} alleleMatrixDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateAllelematrixAfterReading: async ({
        alleleMatrixDbId
    }, context) => {
        if ((await checkAuthorization(context, 'allelematrix', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    allelematrix,
                    alleleMatrixDbId);
                return true;
            } catch (error) {
                error.input = {
                    alleleMatrixDbId: alleleMatrixDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addAllelematrix - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addAllelematrix: async function(input, context) {
        let authorization = await checkAuthorization(context, 'allelematrix', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.allelematrix.definition);
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
            let createdAllelematrix = await allelematrix.addOne(inputSanitized, context.benignErrors, token);
            await createdAllelematrix.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdAllelematrix;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteAllelematrix - Check user authorization and delete a record with the specified alleleMatrixDbId in the alleleMatrixDbId argument.
     *
     * @param  {number} {alleleMatrixDbId}    alleleMatrixDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteAllelematrix: async function({
        alleleMatrixDbId
    }, context) {
        if (await checkAuthorization(context, 'allelematrix', 'delete') === true) {
            if (await validForDeletion(alleleMatrixDbId, context)) {
                await updateAssociations(alleleMatrixDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return allelematrix.deleteOne(alleleMatrixDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateAllelematrix - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateAllelematrix: async function(input, context) {
        let authorization = await checkAuthorization(context, 'allelematrix', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.allelematrix.definition);
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
            let updatedAllelematrix = await allelematrix.updateOne(inputSanitized, context.benignErrors, token);
            await updatedAllelematrix.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedAllelematrix;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateAllelematrix - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateAllelematrix: async function(_, context) {
        if (await checkAuthorization(context, 'allelematrix', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return allelematrix.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * allelematricesZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    allelematricesZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "allelematrix", "read")) === true) {
            return allelematrix.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}