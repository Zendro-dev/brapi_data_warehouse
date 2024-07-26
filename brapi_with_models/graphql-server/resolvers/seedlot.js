/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const seedlot = require(path.join(__dirname, '..', 'models', 'index.js')).seedlot;
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
    'addLocation': 'location',
    'addProgram': 'program',
    'addFromSeedLotTransactions': 'seedlottransaction',
    'addToSeedLotTransactions': 'seedlottransaction',
    'addObservationUnits': 'observationunit',
    'addAdditionalInfo': 'additionalinfo',
    'addExternalReferences': 'externalreference',
    'addContentMixture': 'contentmixture'
}



/**
 * seedlot.prototype.location - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
seedlot.prototype.location = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.location_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneLocation({
                [models.location.idAttribute()]: this.location_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.location.idAttribute(),
                "value": this.location_ID,
                "operator": "eq"
            });
            let found = (await resolvers.locationsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 locations matching seedlot with seedLotDbId ${this.location_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the seedlot model. Returning first location.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * seedlot.prototype.program - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
seedlot.prototype.program = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.program_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneProgram({
                [models.program.idAttribute()]: this.program_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.program.idAttribute(),
                "value": this.program_ID,
                "operator": "eq"
            });
            let found = (await resolvers.programsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 programs matching seedlot with seedLotDbId ${this.program_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the seedlot model. Returning first program.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}

/**
 * seedlot.prototype.fromSeedLotTransactionsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
seedlot.prototype.fromSeedLotTransactionsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.fromSeedLotTransactions_IDs) || this.fromSeedLotTransactions_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.seedlottransaction.idAttribute(),
        "value": this.fromSeedLotTransactions_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.seedlottransactions({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * seedlot.prototype.countFilteredFromSeedLotTransactions - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
seedlot.prototype.countFilteredFromSeedLotTransactions = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.fromSeedLotTransactions_IDs) || this.fromSeedLotTransactions_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.seedlottransaction.idAttribute(),
        "value": this.fromSeedLotTransactions_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countSeedlottransactions({
        search: nsearch
    }, context);
}

/**
 * seedlot.prototype.fromSeedLotTransactionsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
seedlot.prototype.fromSeedLotTransactionsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.fromSeedLotTransactions_IDs) || this.fromSeedLotTransactions_IDs.length === 0) {
        return {
            edges: [],
            seedlottransactions: [],
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
        "field": models.seedlottransaction.idAttribute(),
        "value": this.fromSeedLotTransactions_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.seedlottransactionsConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * seedlot.prototype.toSeedLotTransactionsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
seedlot.prototype.toSeedLotTransactionsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.toSeedLotTransactions_IDs) || this.toSeedLotTransactions_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.seedlottransaction.idAttribute(),
        "value": this.toSeedLotTransactions_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.seedlottransactions({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * seedlot.prototype.countFilteredToSeedLotTransactions - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
seedlot.prototype.countFilteredToSeedLotTransactions = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.toSeedLotTransactions_IDs) || this.toSeedLotTransactions_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.seedlottransaction.idAttribute(),
        "value": this.toSeedLotTransactions_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countSeedlottransactions({
        search: nsearch
    }, context);
}

/**
 * seedlot.prototype.toSeedLotTransactionsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
seedlot.prototype.toSeedLotTransactionsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.toSeedLotTransactions_IDs) || this.toSeedLotTransactions_IDs.length === 0) {
        return {
            edges: [],
            seedlottransactions: [],
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
        "field": models.seedlottransaction.idAttribute(),
        "value": this.toSeedLotTransactions_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.seedlottransactionsConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * seedlot.prototype.observationUnitsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
seedlot.prototype.observationUnitsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.observationUnits_IDs) || this.observationUnits_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.observationunit.idAttribute(),
        "value": this.observationUnits_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.observationunits({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * seedlot.prototype.countFilteredObservationUnits - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
seedlot.prototype.countFilteredObservationUnits = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.observationUnits_IDs) || this.observationUnits_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.observationunit.idAttribute(),
        "value": this.observationUnits_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countObservationunits({
        search: nsearch
    }, context);
}

/**
 * seedlot.prototype.observationUnitsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
seedlot.prototype.observationUnitsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.observationUnits_IDs) || this.observationUnits_IDs.length === 0) {
        return {
            edges: [],
            observationunits: [],
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
        "field": models.observationunit.idAttribute(),
        "value": this.observationUnits_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.observationunitsConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * seedlot.prototype.additionalInfoFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
seedlot.prototype.additionalInfoFilter = function({
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
 * seedlot.prototype.countFilteredAdditionalInfo - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
seedlot.prototype.countFilteredAdditionalInfo = function({
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
 * seedlot.prototype.additionalInfoConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
seedlot.prototype.additionalInfoConnection = function({
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
 * seedlot.prototype.externalReferencesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
seedlot.prototype.externalReferencesFilter = function({
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
 * seedlot.prototype.countFilteredExternalReferences - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
seedlot.prototype.countFilteredExternalReferences = function({
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
 * seedlot.prototype.externalReferencesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
seedlot.prototype.externalReferencesConnection = function({
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
 * seedlot.prototype.contentMixtureFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
seedlot.prototype.contentMixtureFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.contentMixture_IDs) || this.contentMixture_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.contentmixture.idAttribute(),
        "value": this.contentMixture_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.contentmixtures({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * seedlot.prototype.countFilteredContentMixture - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
seedlot.prototype.countFilteredContentMixture = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.contentMixture_IDs) || this.contentMixture_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.contentmixture.idAttribute(),
        "value": this.contentMixture_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countContentmixtures({
        search: nsearch
    }, context);
}

/**
 * seedlot.prototype.contentMixtureConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
seedlot.prototype.contentMixtureConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.contentMixture_IDs) || this.contentMixture_IDs.length === 0) {
        return {
            edges: [],
            contentmixtures: [],
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
        "field": models.contentmixture.idAttribute(),
        "value": this.contentMixture_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.contentmixturesConnection({
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
seedlot.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addFromSeedLotTransactions)) {
        promises_add.push(this.add_fromSeedLotTransactions(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addToSeedLotTransactions)) {
        promises_add.push(this.add_toSeedLotTransactions(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addObservationUnits)) {
        promises_add.push(this.add_observationUnits(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addAdditionalInfo)) {
        promises_add.push(this.add_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addExternalReferences)) {
        promises_add.push(this.add_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addContentMixture)) {
        promises_add.push(this.add_contentMixture(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addLocation)) {
        promises_add.push(this.add_location(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addProgram)) {
        promises_add.push(this.add_program(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removeFromSeedLotTransactions)) {
        promises_remove.push(this.remove_fromSeedLotTransactions(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeToSeedLotTransactions)) {
        promises_remove.push(this.remove_toSeedLotTransactions(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeObservationUnits)) {
        promises_remove.push(this.remove_observationUnits(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeAdditionalInfo)) {
        promises_remove.push(this.remove_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeExternalReferences)) {
        promises_remove.push(this.remove_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeContentMixture)) {
        promises_remove.push(this.remove_contentMixture(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeLocation)) {
        promises_remove.push(this.remove_location(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeProgram)) {
        promises_remove.push(this.remove_program(input, benignErrorReporter, token));
    }

    await Promise.all(promises_remove);

}
/**
 * add_fromSeedLotTransactions - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
seedlot.prototype.add_fromSeedLotTransactions = async function(input, benignErrorReporter, token) {

    await seedlot.add_fromSeedLotTransactions_IDs(this.getIdValue(), input.addFromSeedLotTransactions, benignErrorReporter, token);
    this.fromSeedLotTransactions_IDs = helper.unionIds(this.fromSeedLotTransactions_IDs, input.addFromSeedLotTransactions);
}

/**
 * add_toSeedLotTransactions - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
seedlot.prototype.add_toSeedLotTransactions = async function(input, benignErrorReporter, token) {

    await seedlot.add_toSeedLotTransactions_IDs(this.getIdValue(), input.addToSeedLotTransactions, benignErrorReporter, token);
    this.toSeedLotTransactions_IDs = helper.unionIds(this.toSeedLotTransactions_IDs, input.addToSeedLotTransactions);
}

/**
 * add_observationUnits - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
seedlot.prototype.add_observationUnits = async function(input, benignErrorReporter, token) {

    await seedlot.add_observationUnits_IDs(this.getIdValue(), input.addObservationUnits, benignErrorReporter, token);
    this.observationUnits_IDs = helper.unionIds(this.observationUnits_IDs, input.addObservationUnits);
}

/**
 * add_additionalInfo - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
seedlot.prototype.add_additionalInfo = async function(input, benignErrorReporter, token) {

    await seedlot.add_additionalInfo_IDs(this.getIdValue(), input.addAdditionalInfo, benignErrorReporter, token);
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
seedlot.prototype.add_externalReferences = async function(input, benignErrorReporter, token) {

    await seedlot.add_externalReferences_IDs(this.getIdValue(), input.addExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.unionIds(this.externalReferences_IDs, input.addExternalReferences);
}

/**
 * add_contentMixture - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
seedlot.prototype.add_contentMixture = async function(input, benignErrorReporter, token) {

    await seedlot.add_contentMixture_IDs(this.getIdValue(), input.addContentMixture, benignErrorReporter, token);
    this.contentMixture_IDs = helper.unionIds(this.contentMixture_IDs, input.addContentMixture);
}

/**
 * add_location - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
seedlot.prototype.add_location = async function(input, benignErrorReporter, token) {
    await seedlot.add_location_ID(this.getIdValue(), input.addLocation, benignErrorReporter, token);
    this.location_ID = input.addLocation;
}

/**
 * add_program - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
seedlot.prototype.add_program = async function(input, benignErrorReporter, token) {
    await seedlot.add_program_ID(this.getIdValue(), input.addProgram, benignErrorReporter, token);
    this.program_ID = input.addProgram;
}

/**
 * remove_fromSeedLotTransactions - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
seedlot.prototype.remove_fromSeedLotTransactions = async function(input, benignErrorReporter, token) {

    await seedlot.remove_fromSeedLotTransactions_IDs(this.getIdValue(), input.removeFromSeedLotTransactions, benignErrorReporter, token);
    this.fromSeedLotTransactions_IDs = helper.differenceIds(this.fromSeedLotTransactions_IDs, input.removeFromSeedLotTransactions);
}

/**
 * remove_toSeedLotTransactions - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
seedlot.prototype.remove_toSeedLotTransactions = async function(input, benignErrorReporter, token) {

    await seedlot.remove_toSeedLotTransactions_IDs(this.getIdValue(), input.removeToSeedLotTransactions, benignErrorReporter, token);
    this.toSeedLotTransactions_IDs = helper.differenceIds(this.toSeedLotTransactions_IDs, input.removeToSeedLotTransactions);
}

/**
 * remove_observationUnits - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
seedlot.prototype.remove_observationUnits = async function(input, benignErrorReporter, token) {

    await seedlot.remove_observationUnits_IDs(this.getIdValue(), input.removeObservationUnits, benignErrorReporter, token);
    this.observationUnits_IDs = helper.differenceIds(this.observationUnits_IDs, input.removeObservationUnits);
}

/**
 * remove_additionalInfo - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
seedlot.prototype.remove_additionalInfo = async function(input, benignErrorReporter, token) {

    await seedlot.remove_additionalInfo_IDs(this.getIdValue(), input.removeAdditionalInfo, benignErrorReporter, token);
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
seedlot.prototype.remove_externalReferences = async function(input, benignErrorReporter, token) {

    await seedlot.remove_externalReferences_IDs(this.getIdValue(), input.removeExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.differenceIds(this.externalReferences_IDs, input.removeExternalReferences);
}

/**
 * remove_contentMixture - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
seedlot.prototype.remove_contentMixture = async function(input, benignErrorReporter, token) {

    await seedlot.remove_contentMixture_IDs(this.getIdValue(), input.removeContentMixture, benignErrorReporter, token);
    this.contentMixture_IDs = helper.differenceIds(this.contentMixture_IDs, input.removeContentMixture);
}

/**
 * remove_location - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
seedlot.prototype.remove_location = async function(input, benignErrorReporter, token) {
    if (input.removeLocation == this.location_ID) {
        await seedlot.remove_location_ID(this.getIdValue(), input.removeLocation, benignErrorReporter, token);
        this.location_ID = null;
    }
}

/**
 * remove_program - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
seedlot.prototype.remove_program = async function(input, benignErrorReporter, token) {
    if (input.removeProgram == this.program_ID) {
        await seedlot.remove_program_ID(this.getIdValue(), input.removeProgram, benignErrorReporter, token);
        this.program_ID = null;
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

    let seedlot = await resolvers.readOneSeedlot({
        seedLotDbId: id
    }, context);
    //check that record actually exists
    if (seedlot === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(seedlot.fromSeedLotTransactions_IDs) ? seedlot.fromSeedLotTransactions_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(seedlot.toSeedLotTransactions_IDs) ? seedlot.toSeedLotTransactions_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(seedlot.observationUnits_IDs) ? seedlot.observationUnits_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(seedlot.additionalInfo_IDs) ? seedlot.additionalInfo_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(seedlot.externalReferences_IDs) ? seedlot.externalReferences_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(seedlot.contentMixture_IDs) ? seedlot.contentMixture_IDs.length : 0;

    get_to_one_associated_fk += [null, undefined].includes(seedlot.location_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(seedlot.program_ID) ? 0 : 1;


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
        throw new Error(`seedlot with seedLotDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const seedlot_record = await resolvers.readOneSeedlot({
            seedLotDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * seedlots - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    seedlots: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'seedlot', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "seedlots");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await seedlot.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * seedlotsConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    seedlotsConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'seedlot', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "seedlotsConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await seedlot.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneSeedlot - Check user authorization and return one record with the specified seedLotDbId in the seedLotDbId argument.
     *
     * @param  {number} {seedLotDbId}    seedLotDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with seedLotDbId requested
     */
    readOneSeedlot: async function({
        seedLotDbId
    }, context) {
        if (await checkAuthorization(context, 'seedlot', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneSeedlot");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await seedlot.readById(seedLotDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countSeedlots - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countSeedlots: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'seedlot', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await seedlot.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateSeedlotForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateSeedlotForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'seedlot', 'read');
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
                    seedlot,
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
     * validateSeedlotForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateSeedlotForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'seedlot', 'read');
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
                    seedlot,
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
     * validateSeedlotForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {seedLotDbId} seedLotDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateSeedlotForDeletion: async ({
        seedLotDbId
    }, context) => {
        if ((await checkAuthorization(context, 'seedlot', 'read')) === true) {
            try {
                await validForDeletion(seedLotDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    seedlot,
                    seedLotDbId);
                return true;
            } catch (error) {
                error.input = {
                    seedLotDbId: seedLotDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateSeedlotAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {seedLotDbId} seedLotDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateSeedlotAfterReading: async ({
        seedLotDbId
    }, context) => {
        if ((await checkAuthorization(context, 'seedlot', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    seedlot,
                    seedLotDbId);
                return true;
            } catch (error) {
                error.input = {
                    seedLotDbId: seedLotDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addSeedlot - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addSeedlot: async function(input, context) {
        let authorization = await checkAuthorization(context, 'seedlot', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.seedlot.definition);
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
            let createdSeedlot = await seedlot.addOne(inputSanitized, context.benignErrors, token);
            await createdSeedlot.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdSeedlot;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteSeedlot - Check user authorization and delete a record with the specified seedLotDbId in the seedLotDbId argument.
     *
     * @param  {number} {seedLotDbId}    seedLotDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteSeedlot: async function({
        seedLotDbId
    }, context) {
        if (await checkAuthorization(context, 'seedlot', 'delete') === true) {
            if (await validForDeletion(seedLotDbId, context)) {
                await updateAssociations(seedLotDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return seedlot.deleteOne(seedLotDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateSeedlot - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateSeedlot: async function(input, context) {
        let authorization = await checkAuthorization(context, 'seedlot', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.seedlot.definition);
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
            let updatedSeedlot = await seedlot.updateOne(inputSanitized, context.benignErrors, token);
            await updatedSeedlot.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedSeedlot;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateSeedlot - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateSeedlot: async function(_, context) {
        if (await checkAuthorization(context, 'seedlot', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return seedlot.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * seedlotsZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    seedlotsZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "seedlot", "read")) === true) {
            return seedlot.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}