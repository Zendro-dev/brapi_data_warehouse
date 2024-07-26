/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const variantset = require(path.join(__dirname, '..', 'models', 'index.js')).variantset;
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
    'addReferenceSet': 'referenceset',
    'addStudy': 'study',
    'addAdditionalInfo': 'additionalinfo',
    'addAlleleMatrices': 'allelematrix',
    'addCalls': 'call',
    'addCallSets': 'callset',
    'addAnalysis': 'analysis',
    'addAvailableFormats': 'availableformat',
    'addExternalReferences': 'externalreference',
    'addMetadataFields': 'metadatafield',
    'addVariants': 'variant'
}



/**
 * variantset.prototype.referenceSet - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
variantset.prototype.referenceSet = async function({
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
                        `Not unique "to_one" association Error: Found > 1 referencesets matching variantset with variantSetDbId ${this.referenceSet_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the variantset model. Returning first referenceset.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * variantset.prototype.study - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
variantset.prototype.study = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.study_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneStudy({
                [models.study.idAttribute()]: this.study_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.study.idAttribute(),
                "value": this.study_ID,
                "operator": "eq"
            });
            let found = (await resolvers.studiesConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 studies matching variantset with variantSetDbId ${this.study_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the variantset model. Returning first study.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}

/**
 * variantset.prototype.additionalInfoFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
variantset.prototype.additionalInfoFilter = function({
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
 * variantset.prototype.countFilteredAdditionalInfo - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
variantset.prototype.countFilteredAdditionalInfo = function({
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
 * variantset.prototype.additionalInfoConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
variantset.prototype.additionalInfoConnection = function({
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
 * variantset.prototype.alleleMatricesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
variantset.prototype.alleleMatricesFilter = function({
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
 * variantset.prototype.countFilteredAlleleMatrices - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
variantset.prototype.countFilteredAlleleMatrices = function({
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
 * variantset.prototype.alleleMatricesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
variantset.prototype.alleleMatricesConnection = function({
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
 * variantset.prototype.callsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
variantset.prototype.callsFilter = function({
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
 * variantset.prototype.countFilteredCalls - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
variantset.prototype.countFilteredCalls = function({
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
 * variantset.prototype.callsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
variantset.prototype.callsConnection = function({
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
 * variantset.prototype.callSetsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
variantset.prototype.callSetsFilter = function({
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
 * variantset.prototype.countFilteredCallSets - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
variantset.prototype.countFilteredCallSets = function({
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
 * variantset.prototype.callSetsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
variantset.prototype.callSetsConnection = function({
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
 * variantset.prototype.analysisFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
variantset.prototype.analysisFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.analysis_IDs) || this.analysis_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.analysis.idAttribute(),
        "value": this.analysis_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.analyses({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * variantset.prototype.countFilteredAnalysis - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
variantset.prototype.countFilteredAnalysis = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.analysis_IDs) || this.analysis_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.analysis.idAttribute(),
        "value": this.analysis_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countAnalyses({
        search: nsearch
    }, context);
}

/**
 * variantset.prototype.analysisConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
variantset.prototype.analysisConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.analysis_IDs) || this.analysis_IDs.length === 0) {
        return {
            edges: [],
            analyses: [],
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
        "field": models.analysis.idAttribute(),
        "value": this.analysis_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.analysesConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * variantset.prototype.availableFormatsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
variantset.prototype.availableFormatsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.availableFormats_IDs) || this.availableFormats_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.availableformat.idAttribute(),
        "value": this.availableFormats_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.availableformats({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * variantset.prototype.countFilteredAvailableFormats - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
variantset.prototype.countFilteredAvailableFormats = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.availableFormats_IDs) || this.availableFormats_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.availableformat.idAttribute(),
        "value": this.availableFormats_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countAvailableformats({
        search: nsearch
    }, context);
}

/**
 * variantset.prototype.availableFormatsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
variantset.prototype.availableFormatsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.availableFormats_IDs) || this.availableFormats_IDs.length === 0) {
        return {
            edges: [],
            availableformats: [],
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
        "field": models.availableformat.idAttribute(),
        "value": this.availableFormats_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.availableformatsConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * variantset.prototype.externalReferencesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
variantset.prototype.externalReferencesFilter = function({
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
 * variantset.prototype.countFilteredExternalReferences - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
variantset.prototype.countFilteredExternalReferences = function({
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
 * variantset.prototype.externalReferencesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
variantset.prototype.externalReferencesConnection = function({
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
 * variantset.prototype.metadataFieldsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
variantset.prototype.metadataFieldsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.metadataFields_IDs) || this.metadataFields_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.metadatafield.idAttribute(),
        "value": this.metadataFields_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.metadatafields({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * variantset.prototype.countFilteredMetadataFields - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
variantset.prototype.countFilteredMetadataFields = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.metadataFields_IDs) || this.metadataFields_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.metadatafield.idAttribute(),
        "value": this.metadataFields_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countMetadatafields({
        search: nsearch
    }, context);
}

/**
 * variantset.prototype.metadataFieldsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
variantset.prototype.metadataFieldsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.metadataFields_IDs) || this.metadataFields_IDs.length === 0) {
        return {
            edges: [],
            metadatafields: [],
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
        "field": models.metadatafield.idAttribute(),
        "value": this.metadataFields_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.metadatafieldsConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * variantset.prototype.variantsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
variantset.prototype.variantsFilter = function({
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
 * variantset.prototype.countFilteredVariants - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
variantset.prototype.countFilteredVariants = function({
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
 * variantset.prototype.variantsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
variantset.prototype.variantsConnection = function({
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
variantset.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addAdditionalInfo)) {
        promises_add.push(this.add_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addAlleleMatrices)) {
        promises_add.push(this.add_alleleMatrices(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addCalls)) {
        promises_add.push(this.add_calls(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addCallSets)) {
        promises_add.push(this.add_callSets(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addAnalysis)) {
        promises_add.push(this.add_analysis(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addAvailableFormats)) {
        promises_add.push(this.add_availableFormats(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addExternalReferences)) {
        promises_add.push(this.add_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addMetadataFields)) {
        promises_add.push(this.add_metadataFields(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addVariants)) {
        promises_add.push(this.add_variants(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addReferenceSet)) {
        promises_add.push(this.add_referenceSet(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addStudy)) {
        promises_add.push(this.add_study(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removeAdditionalInfo)) {
        promises_remove.push(this.remove_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeAlleleMatrices)) {
        promises_remove.push(this.remove_alleleMatrices(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeCalls)) {
        promises_remove.push(this.remove_calls(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeCallSets)) {
        promises_remove.push(this.remove_callSets(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeAnalysis)) {
        promises_remove.push(this.remove_analysis(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeAvailableFormats)) {
        promises_remove.push(this.remove_availableFormats(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeExternalReferences)) {
        promises_remove.push(this.remove_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeMetadataFields)) {
        promises_remove.push(this.remove_metadataFields(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeVariants)) {
        promises_remove.push(this.remove_variants(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeReferenceSet)) {
        promises_remove.push(this.remove_referenceSet(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeStudy)) {
        promises_remove.push(this.remove_study(input, benignErrorReporter, token));
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
variantset.prototype.add_additionalInfo = async function(input, benignErrorReporter, token) {

    await variantset.add_additionalInfo_IDs(this.getIdValue(), input.addAdditionalInfo, benignErrorReporter, token);
    this.additionalInfo_IDs = helper.unionIds(this.additionalInfo_IDs, input.addAdditionalInfo);
}

/**
 * add_alleleMatrices - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variantset.prototype.add_alleleMatrices = async function(input, benignErrorReporter, token) {

    await variantset.add_alleleMatrices_IDs(this.getIdValue(), input.addAlleleMatrices, benignErrorReporter, token);
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
variantset.prototype.add_calls = async function(input, benignErrorReporter, token) {

    await variantset.add_calls_IDs(this.getIdValue(), input.addCalls, benignErrorReporter, token);
    this.calls_IDs = helper.unionIds(this.calls_IDs, input.addCalls);
}

/**
 * add_callSets - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variantset.prototype.add_callSets = async function(input, benignErrorReporter, token) {

    await variantset.add_callSets_IDs(this.getIdValue(), input.addCallSets, benignErrorReporter, token);
    this.callSets_IDs = helper.unionIds(this.callSets_IDs, input.addCallSets);
}

/**
 * add_analysis - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variantset.prototype.add_analysis = async function(input, benignErrorReporter, token) {

    await variantset.add_analysis_IDs(this.getIdValue(), input.addAnalysis, benignErrorReporter, token);
    this.analysis_IDs = helper.unionIds(this.analysis_IDs, input.addAnalysis);
}

/**
 * add_availableFormats - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variantset.prototype.add_availableFormats = async function(input, benignErrorReporter, token) {

    await variantset.add_availableFormats_IDs(this.getIdValue(), input.addAvailableFormats, benignErrorReporter, token);
    this.availableFormats_IDs = helper.unionIds(this.availableFormats_IDs, input.addAvailableFormats);
}

/**
 * add_externalReferences - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variantset.prototype.add_externalReferences = async function(input, benignErrorReporter, token) {

    await variantset.add_externalReferences_IDs(this.getIdValue(), input.addExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.unionIds(this.externalReferences_IDs, input.addExternalReferences);
}

/**
 * add_metadataFields - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variantset.prototype.add_metadataFields = async function(input, benignErrorReporter, token) {

    await variantset.add_metadataFields_IDs(this.getIdValue(), input.addMetadataFields, benignErrorReporter, token);
    this.metadataFields_IDs = helper.unionIds(this.metadataFields_IDs, input.addMetadataFields);
}

/**
 * add_variants - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variantset.prototype.add_variants = async function(input, benignErrorReporter, token) {

    await variantset.add_variants_IDs(this.getIdValue(), input.addVariants, benignErrorReporter, token);
    this.variants_IDs = helper.unionIds(this.variants_IDs, input.addVariants);
}

/**
 * add_referenceSet - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variantset.prototype.add_referenceSet = async function(input, benignErrorReporter, token) {
    await variantset.add_referenceSet_ID(this.getIdValue(), input.addReferenceSet, benignErrorReporter, token);
    this.referenceSet_ID = input.addReferenceSet;
}

/**
 * add_study - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variantset.prototype.add_study = async function(input, benignErrorReporter, token) {
    await variantset.add_study_ID(this.getIdValue(), input.addStudy, benignErrorReporter, token);
    this.study_ID = input.addStudy;
}

/**
 * remove_additionalInfo - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variantset.prototype.remove_additionalInfo = async function(input, benignErrorReporter, token) {

    await variantset.remove_additionalInfo_IDs(this.getIdValue(), input.removeAdditionalInfo, benignErrorReporter, token);
    this.additionalInfo_IDs = helper.differenceIds(this.additionalInfo_IDs, input.removeAdditionalInfo);
}

/**
 * remove_alleleMatrices - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variantset.prototype.remove_alleleMatrices = async function(input, benignErrorReporter, token) {

    await variantset.remove_alleleMatrices_IDs(this.getIdValue(), input.removeAlleleMatrices, benignErrorReporter, token);
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
variantset.prototype.remove_calls = async function(input, benignErrorReporter, token) {

    await variantset.remove_calls_IDs(this.getIdValue(), input.removeCalls, benignErrorReporter, token);
    this.calls_IDs = helper.differenceIds(this.calls_IDs, input.removeCalls);
}

/**
 * remove_callSets - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variantset.prototype.remove_callSets = async function(input, benignErrorReporter, token) {

    await variantset.remove_callSets_IDs(this.getIdValue(), input.removeCallSets, benignErrorReporter, token);
    this.callSets_IDs = helper.differenceIds(this.callSets_IDs, input.removeCallSets);
}

/**
 * remove_analysis - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variantset.prototype.remove_analysis = async function(input, benignErrorReporter, token) {

    await variantset.remove_analysis_IDs(this.getIdValue(), input.removeAnalysis, benignErrorReporter, token);
    this.analysis_IDs = helper.differenceIds(this.analysis_IDs, input.removeAnalysis);
}

/**
 * remove_availableFormats - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variantset.prototype.remove_availableFormats = async function(input, benignErrorReporter, token) {

    await variantset.remove_availableFormats_IDs(this.getIdValue(), input.removeAvailableFormats, benignErrorReporter, token);
    this.availableFormats_IDs = helper.differenceIds(this.availableFormats_IDs, input.removeAvailableFormats);
}

/**
 * remove_externalReferences - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variantset.prototype.remove_externalReferences = async function(input, benignErrorReporter, token) {

    await variantset.remove_externalReferences_IDs(this.getIdValue(), input.removeExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.differenceIds(this.externalReferences_IDs, input.removeExternalReferences);
}

/**
 * remove_metadataFields - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variantset.prototype.remove_metadataFields = async function(input, benignErrorReporter, token) {

    await variantset.remove_metadataFields_IDs(this.getIdValue(), input.removeMetadataFields, benignErrorReporter, token);
    this.metadataFields_IDs = helper.differenceIds(this.metadataFields_IDs, input.removeMetadataFields);
}

/**
 * remove_variants - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variantset.prototype.remove_variants = async function(input, benignErrorReporter, token) {

    await variantset.remove_variants_IDs(this.getIdValue(), input.removeVariants, benignErrorReporter, token);
    this.variants_IDs = helper.differenceIds(this.variants_IDs, input.removeVariants);
}

/**
 * remove_referenceSet - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variantset.prototype.remove_referenceSet = async function(input, benignErrorReporter, token) {
    if (input.removeReferenceSet == this.referenceSet_ID) {
        await variantset.remove_referenceSet_ID(this.getIdValue(), input.removeReferenceSet, benignErrorReporter, token);
        this.referenceSet_ID = null;
    }
}

/**
 * remove_study - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
variantset.prototype.remove_study = async function(input, benignErrorReporter, token) {
    if (input.removeStudy == this.study_ID) {
        await variantset.remove_study_ID(this.getIdValue(), input.removeStudy, benignErrorReporter, token);
        this.study_ID = null;
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

    let variantset = await resolvers.readOneVariantset({
        variantSetDbId: id
    }, context);
    //check that record actually exists
    if (variantset === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(variantset.additionalInfo_IDs) ? variantset.additionalInfo_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(variantset.alleleMatrices_IDs) ? variantset.alleleMatrices_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(variantset.calls_IDs) ? variantset.calls_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(variantset.callSets_IDs) ? variantset.callSets_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(variantset.analysis_IDs) ? variantset.analysis_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(variantset.availableFormats_IDs) ? variantset.availableFormats_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(variantset.externalReferences_IDs) ? variantset.externalReferences_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(variantset.metadataFields_IDs) ? variantset.metadataFields_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(variantset.variants_IDs) ? variantset.variants_IDs.length : 0;

    get_to_one_associated_fk += [null, undefined].includes(variantset.referenceSet_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(variantset.study_ID) ? 0 : 1;


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
        throw new Error(`variantset with variantSetDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const variantset_record = await resolvers.readOneVariantset({
            variantSetDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * variantsets - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    variantsets: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'variantset', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "variantsets");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await variantset.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * variantsetsConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    variantsetsConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'variantset', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "variantsetsConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await variantset.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneVariantset - Check user authorization and return one record with the specified variantSetDbId in the variantSetDbId argument.
     *
     * @param  {number} {variantSetDbId}    variantSetDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with variantSetDbId requested
     */
    readOneVariantset: async function({
        variantSetDbId
    }, context) {
        if (await checkAuthorization(context, 'variantset', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneVariantset");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await variantset.readById(variantSetDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countVariantsets - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countVariantsets: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'variantset', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await variantset.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateVariantsetForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateVariantsetForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'variantset', 'read');
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
                    variantset,
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
     * validateVariantsetForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateVariantsetForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'variantset', 'read');
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
                    variantset,
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
     * validateVariantsetForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {variantSetDbId} variantSetDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateVariantsetForDeletion: async ({
        variantSetDbId
    }, context) => {
        if ((await checkAuthorization(context, 'variantset', 'read')) === true) {
            try {
                await validForDeletion(variantSetDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    variantset,
                    variantSetDbId);
                return true;
            } catch (error) {
                error.input = {
                    variantSetDbId: variantSetDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateVariantsetAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {variantSetDbId} variantSetDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateVariantsetAfterReading: async ({
        variantSetDbId
    }, context) => {
        if ((await checkAuthorization(context, 'variantset', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    variantset,
                    variantSetDbId);
                return true;
            } catch (error) {
                error.input = {
                    variantSetDbId: variantSetDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addVariantset - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addVariantset: async function(input, context) {
        let authorization = await checkAuthorization(context, 'variantset', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.variantset.definition);
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
            let createdVariantset = await variantset.addOne(inputSanitized, context.benignErrors, token);
            await createdVariantset.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdVariantset;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteVariantset - Check user authorization and delete a record with the specified variantSetDbId in the variantSetDbId argument.
     *
     * @param  {number} {variantSetDbId}    variantSetDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteVariantset: async function({
        variantSetDbId
    }, context) {
        if (await checkAuthorization(context, 'variantset', 'delete') === true) {
            if (await validForDeletion(variantSetDbId, context)) {
                await updateAssociations(variantSetDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return variantset.deleteOne(variantSetDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateVariantset - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateVariantset: async function(input, context) {
        let authorization = await checkAuthorization(context, 'variantset', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.variantset.definition);
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
            let updatedVariantset = await variantset.updateOne(inputSanitized, context.benignErrors, token);
            await updatedVariantset.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedVariantset;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateVariantset - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateVariantset: async function(_, context) {
        if (await checkAuthorization(context, 'variantset', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return variantset.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * variantsetsZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    variantsetsZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "variantset", "read")) === true) {
            return variantset.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}