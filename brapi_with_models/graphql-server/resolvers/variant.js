/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const variant = require(path.join(__dirname, '..', 'models', 'index.js')).variant;
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
    'addReference': 'reference',
    'addReferenceSet': 'referenceset',
    'addVariantSet': 'variantset',
    'addAdditionalInfo': 'additionalinfo',
    'addMarkerPositions': 'markerposition',
    'addAlleleMatrices': 'allelematrix',
    'addCalls': 'call',
    'addExternalReferences': 'externalreference'
}



/**
 * variant.prototype.reference - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
variant.prototype.reference = async function({
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
                        `Not unique "to_one" association Error: Found > 1 references matching variant with variantDbId ${this.reference_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the variant model. Returning first reference.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * variant.prototype.referenceSet - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
variant.prototype.referenceSet = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.referenceSet_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneReferenceset({
                [models.referenceset.idAttribute()]: this.referenceSet_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.referenceset.idAttribute(),
                "value": this.referenceSet_ID,
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
                        `Not unique "to_one" association Error: Found > 1 referencesets matching variant with variantDbId ${this.referenceSet_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the variant model. Returning first referenceset.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * variant.prototype.variantSet - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
variant.prototype.variantSet = async function({
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
                        `Not unique "to_one" association Error: Found > 1 variantsets matching variant with variantDbId ${this.variantSet_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the variant model. Returning first variantset.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}

/**
 * variant.prototype.additionalInfoFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
variant.prototype.additionalInfoFilter = function({
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
 * variant.prototype.countFilteredAdditionalInfo - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
variant.prototype.countFilteredAdditionalInfo = function({
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
 * variant.prototype.additionalInfoConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
variant.prototype.additionalInfoConnection = function({
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
 * variant.prototype.markerPositionsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
variant.prototype.markerPositionsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.markerPositions_IDs) || this.markerPositions_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.markerposition.idAttribute(),
        "value": this.markerPositions_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.markerpositions({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * variant.prototype.countFilteredMarkerPositions - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
variant.prototype.countFilteredMarkerPositions = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.markerPositions_IDs) || this.markerPositions_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.markerposition.idAttribute(),
        "value": this.markerPositions_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countMarkerpositions({
        search: nsearch
    }, context);
}

/**
 * variant.prototype.markerPositionsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
variant.prototype.markerPositionsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.markerPositions_IDs) || this.markerPositions_IDs.length === 0) {
        return {
            edges: [],
            markerpositions: [],
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
        "field": models.markerposition.idAttribute(),
        "value": this.markerPositions_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.markerpositionsConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * variant.prototype.alleleMatricesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
variant.prototype.alleleMatricesFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.alleleMatrices_IDs) || this.alleleMatrices_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.allelematrix.idAttribute(),
        "value": this.alleleMatrices_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.allelematrices({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * variant.prototype.countFilteredAlleleMatrices - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
variant.prototype.countFilteredAlleleMatrices = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.alleleMatrices_IDs) || this.alleleMatrices_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.allelematrix.idAttribute(),
        "value": this.alleleMatrices_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countAllelematrices({
        search: nsearch
    }, context);
}

/**
 * variant.prototype.alleleMatricesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
variant.prototype.alleleMatricesConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.alleleMatrices_IDs) || this.alleleMatrices_IDs.length === 0) {
        return {
            edges: [],
            allelematrices: [],
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
        "field": models.allelematrix.idAttribute(),
        "value": this.alleleMatrices_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.allelematricesConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * variant.prototype.callsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
variant.prototype.callsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.calls_IDs) || this.calls_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.call.idAttribute(),
        "value": this.calls_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.calls({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * variant.prototype.countFilteredCalls - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
variant.prototype.countFilteredCalls = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.calls_IDs) || this.calls_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.call.idAttribute(),
        "value": this.calls_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countCalls({
        search: nsearch
    }, context);
}

/**
 * variant.prototype.callsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
variant.prototype.callsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.calls_IDs) || this.calls_IDs.length === 0) {
        return {
            edges: [],
            calls: [],
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
        "field": models.call.idAttribute(),
        "value": this.calls_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.callsConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * variant.prototype.externalReferencesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
variant.prototype.externalReferencesFilter = function({
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
 * variant.prototype.countFilteredExternalReferences - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
variant.prototype.countFilteredExternalReferences = function({
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
 * variant.prototype.externalReferencesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
variant.prototype.externalReferencesConnection = function({
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
variant.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addAdditionalInfo)) {
        promises_add.push(this.add_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addMarkerPositions)) {
        promises_add.push(this.add_markerPositions(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addAlleleMatrices)) {
        promises_add.push(this.add_alleleMatrices(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addCalls)) {
        promises_add.push(this.add_calls(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addExternalReferences)) {
        promises_add.push(this.add_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addReference)) {
        promises_add.push(this.add_reference(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addReferenceSet)) {
        promises_add.push(this.add_referenceSet(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addVariantSet)) {
        promises_add.push(this.add_variantSet(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removeAdditionalInfo)) {
        promises_remove.push(this.remove_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeMarkerPositions)) {
        promises_remove.push(this.remove_markerPositions(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeAlleleMatrices)) {
        promises_remove.push(this.remove_alleleMatrices(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeCalls)) {
        promises_remove.push(this.remove_calls(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeExternalReferences)) {
        promises_remove.push(this.remove_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeReference)) {
        promises_remove.push(this.remove_reference(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeReferenceSet)) {
        promises_remove.push(this.remove_referenceSet(input, benignErrorReporter, token));
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
variant.prototype.add_additionalInfo = async function(input, benignErrorReporter, token) {

    await variant.add_additionalInfo_IDs(this.getIdValue(), input.addAdditionalInfo, benignErrorReporter, token);
    this.additionalInfo_IDs = helper.unionIds(this.additionalInfo_IDs, input.addAdditionalInfo);
}

/**
 * add_markerPositions - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variant.prototype.add_markerPositions = async function(input, benignErrorReporter, token) {

    await variant.add_markerPositions_IDs(this.getIdValue(), input.addMarkerPositions, benignErrorReporter, token);
    this.markerPositions_IDs = helper.unionIds(this.markerPositions_IDs, input.addMarkerPositions);
}

/**
 * add_alleleMatrices - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variant.prototype.add_alleleMatrices = async function(input, benignErrorReporter, token) {

    await variant.add_alleleMatrices_IDs(this.getIdValue(), input.addAlleleMatrices, benignErrorReporter, token);
    this.alleleMatrices_IDs = helper.unionIds(this.alleleMatrices_IDs, input.addAlleleMatrices);
}

/**
 * add_calls - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variant.prototype.add_calls = async function(input, benignErrorReporter, token) {

    await variant.add_calls_IDs(this.getIdValue(), input.addCalls, benignErrorReporter, token);
    this.calls_IDs = helper.unionIds(this.calls_IDs, input.addCalls);
}

/**
 * add_externalReferences - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variant.prototype.add_externalReferences = async function(input, benignErrorReporter, token) {

    await variant.add_externalReferences_IDs(this.getIdValue(), input.addExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.unionIds(this.externalReferences_IDs, input.addExternalReferences);
}

/**
 * add_reference - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variant.prototype.add_reference = async function(input, benignErrorReporter, token) {
    await variant.add_reference_ID(this.getIdValue(), input.addReference, benignErrorReporter, token);
    this.reference_ID = input.addReference;
}

/**
 * add_referenceSet - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variant.prototype.add_referenceSet = async function(input, benignErrorReporter, token) {
    await variant.add_referenceSet_ID(this.getIdValue(), input.addReferenceSet, benignErrorReporter, token);
    this.referenceSet_ID = input.addReferenceSet;
}

/**
 * add_variantSet - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variant.prototype.add_variantSet = async function(input, benignErrorReporter, token) {
    await variant.add_variantSet_ID(this.getIdValue(), input.addVariantSet, benignErrorReporter, token);
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
variant.prototype.remove_additionalInfo = async function(input, benignErrorReporter, token) {

    await variant.remove_additionalInfo_IDs(this.getIdValue(), input.removeAdditionalInfo, benignErrorReporter, token);
    this.additionalInfo_IDs = helper.differenceIds(this.additionalInfo_IDs, input.removeAdditionalInfo);
}

/**
 * remove_markerPositions - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variant.prototype.remove_markerPositions = async function(input, benignErrorReporter, token) {

    await variant.remove_markerPositions_IDs(this.getIdValue(), input.removeMarkerPositions, benignErrorReporter, token);
    this.markerPositions_IDs = helper.differenceIds(this.markerPositions_IDs, input.removeMarkerPositions);
}

/**
 * remove_alleleMatrices - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variant.prototype.remove_alleleMatrices = async function(input, benignErrorReporter, token) {

    await variant.remove_alleleMatrices_IDs(this.getIdValue(), input.removeAlleleMatrices, benignErrorReporter, token);
    this.alleleMatrices_IDs = helper.differenceIds(this.alleleMatrices_IDs, input.removeAlleleMatrices);
}

/**
 * remove_calls - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variant.prototype.remove_calls = async function(input, benignErrorReporter, token) {

    await variant.remove_calls_IDs(this.getIdValue(), input.removeCalls, benignErrorReporter, token);
    this.calls_IDs = helper.differenceIds(this.calls_IDs, input.removeCalls);
}

/**
 * remove_externalReferences - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variant.prototype.remove_externalReferences = async function(input, benignErrorReporter, token) {

    await variant.remove_externalReferences_IDs(this.getIdValue(), input.removeExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.differenceIds(this.externalReferences_IDs, input.removeExternalReferences);
}

/**
 * remove_reference - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variant.prototype.remove_reference = async function(input, benignErrorReporter, token) {
    if (input.removeReference == this.reference_ID) {
        await variant.remove_reference_ID(this.getIdValue(), input.removeReference, benignErrorReporter, token);
        this.reference_ID = null;
    }
}

/**
 * remove_referenceSet - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variant.prototype.remove_referenceSet = async function(input, benignErrorReporter, token) {
    if (input.removeReferenceSet == this.referenceSet_ID) {
        await variant.remove_referenceSet_ID(this.getIdValue(), input.removeReferenceSet, benignErrorReporter, token);
        this.referenceSet_ID = null;
    }
}

/**
 * remove_variantSet - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variant.prototype.remove_variantSet = async function(input, benignErrorReporter, token) {
    if (input.removeVariantSet == this.variantSet_ID) {
        await variant.remove_variantSet_ID(this.getIdValue(), input.removeVariantSet, benignErrorReporter, token);
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

    let variant = await resolvers.readOneVariant({
        variantDbId: id
    }, context);
    //check that record actually exists
    if (variant === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(variant.additionalInfo_IDs) ? variant.additionalInfo_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(variant.markerPositions_IDs) ? variant.markerPositions_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(variant.alleleMatrices_IDs) ? variant.alleleMatrices_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(variant.calls_IDs) ? variant.calls_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(variant.externalReferences_IDs) ? variant.externalReferences_IDs.length : 0;

    get_to_one_associated_fk += [null, undefined].includes(variant.reference_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(variant.referenceSet_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(variant.variantSet_ID) ? 0 : 1;


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
        throw new Error(`variant with variantDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const variant_record = await resolvers.readOneVariant({
            variantDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * variants - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    variants: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'variant', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "variants");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await variant.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * variantsConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    variantsConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'variant', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "variantsConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await variant.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneVariant - Check user authorization and return one record with the specified variantDbId in the variantDbId argument.
     *
     * @param  {number} {variantDbId}    variantDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with variantDbId requested
     */
    readOneVariant: async function({
        variantDbId
    }, context) {
        if (await checkAuthorization(context, 'variant', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneVariant");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await variant.readById(variantDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countVariants - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countVariants: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'variant', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await variant.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateVariantForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateVariantForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'variant', 'read');
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
                    variant,
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
     * validateVariantForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateVariantForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'variant', 'read');
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
                    variant,
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
     * validateVariantForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {variantDbId} variantDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateVariantForDeletion: async ({
        variantDbId
    }, context) => {
        if ((await checkAuthorization(context, 'variant', 'read')) === true) {
            try {
                await validForDeletion(variantDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    variant,
                    variantDbId);
                return true;
            } catch (error) {
                error.input = {
                    variantDbId: variantDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateVariantAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {variantDbId} variantDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateVariantAfterReading: async ({
        variantDbId
    }, context) => {
        if ((await checkAuthorization(context, 'variant', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    variant,
                    variantDbId);
                return true;
            } catch (error) {
                error.input = {
                    variantDbId: variantDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addVariant - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addVariant: async function(input, context) {
        let authorization = await checkAuthorization(context, 'variant', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.variant.definition);
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
            let createdVariant = await variant.addOne(inputSanitized, context.benignErrors, token);
            await createdVariant.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdVariant;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteVariant - Check user authorization and delete a record with the specified variantDbId in the variantDbId argument.
     *
     * @param  {number} {variantDbId}    variantDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteVariant: async function({
        variantDbId
    }, context) {
        if (await checkAuthorization(context, 'variant', 'delete') === true) {
            if (await validForDeletion(variantDbId, context)) {
                await updateAssociations(variantDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return variant.deleteOne(variantDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateVariant - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateVariant: async function(input, context) {
        let authorization = await checkAuthorization(context, 'variant', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.variant.definition);
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
            let updatedVariant = await variant.updateOne(inputSanitized, context.benignErrors, token);
            await updatedVariant.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedVariant;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateVariant - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateVariant: async function(_, context) {
        if (await checkAuthorization(context, 'variant', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return variant.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * variantsZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    variantsZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "variant", "read")) === true) {
            return variant.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}