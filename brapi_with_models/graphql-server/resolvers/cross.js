/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const cross = require(path.join(__dirname, '..', 'models', 'index.js')).cross;
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
    'addCrossingProject': 'crossingproject',
    'addPlannedCross': 'plannedcross',
    'addObservationUnits': 'observationunit',
    'addAdditionalInfo': 'additionalinfo',
    'addExternalReferences': 'externalreference',
    'addCrossAttributes': 'crossattribute',
    'addParents': 'parent',
    'addPollinationEvents': 'pollinationevent'
}



/**
 * cross.prototype.crossingProject - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
cross.prototype.crossingProject = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.crossingProject_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneCrossingproject({
                [models.crossingproject.idAttribute()]: this.crossingProject_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.crossingproject.idAttribute(),
                "value": this.crossingProject_ID,
                "operator": "eq"
            });
            let found = (await resolvers.crossingprojectsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 crossingprojects matching cross with crossDbId ${this.crossingProject_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the cross model. Returning first crossingproject.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * cross.prototype.plannedCross - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
cross.prototype.plannedCross = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.plannedCross_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOnePlannedcross({
                [models.plannedcross.idAttribute()]: this.plannedCross_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.plannedcross.idAttribute(),
                "value": this.plannedCross_ID,
                "operator": "eq"
            });
            let found = (await resolvers.plannedcrossesConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 plannedcrosses matching cross with crossDbId ${this.plannedCross_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the cross model. Returning first plannedcross.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}

/**
 * cross.prototype.observationUnitsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
cross.prototype.observationUnitsFilter = function({
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
 * cross.prototype.countFilteredObservationUnits - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
cross.prototype.countFilteredObservationUnits = function({
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
 * cross.prototype.observationUnitsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
cross.prototype.observationUnitsConnection = function({
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
 * cross.prototype.additionalInfoFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
cross.prototype.additionalInfoFilter = function({
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
 * cross.prototype.countFilteredAdditionalInfo - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
cross.prototype.countFilteredAdditionalInfo = function({
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
 * cross.prototype.additionalInfoConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
cross.prototype.additionalInfoConnection = function({
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
 * cross.prototype.externalReferencesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
cross.prototype.externalReferencesFilter = function({
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
 * cross.prototype.countFilteredExternalReferences - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
cross.prototype.countFilteredExternalReferences = function({
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
 * cross.prototype.externalReferencesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
cross.prototype.externalReferencesConnection = function({
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
 * cross.prototype.crossAttributesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
cross.prototype.crossAttributesFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.crossAttributes_IDs) || this.crossAttributes_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.crossattribute.idAttribute(),
        "value": this.crossAttributes_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.crossattributes({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * cross.prototype.countFilteredCrossAttributes - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
cross.prototype.countFilteredCrossAttributes = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.crossAttributes_IDs) || this.crossAttributes_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.crossattribute.idAttribute(),
        "value": this.crossAttributes_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countCrossattributes({
        search: nsearch
    }, context);
}

/**
 * cross.prototype.crossAttributesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
cross.prototype.crossAttributesConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.crossAttributes_IDs) || this.crossAttributes_IDs.length === 0) {
        return {
            edges: [],
            crossattributes: [],
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
        "field": models.crossattribute.idAttribute(),
        "value": this.crossAttributes_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.crossattributesConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * cross.prototype.parentsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
cross.prototype.parentsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.parents_IDs) || this.parents_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.parent.idAttribute(),
        "value": this.parents_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.parents({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * cross.prototype.countFilteredParents - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
cross.prototype.countFilteredParents = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.parents_IDs) || this.parents_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.parent.idAttribute(),
        "value": this.parents_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countParents({
        search: nsearch
    }, context);
}

/**
 * cross.prototype.parentsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
cross.prototype.parentsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.parents_IDs) || this.parents_IDs.length === 0) {
        return {
            edges: [],
            parents: [],
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
        "field": models.parent.idAttribute(),
        "value": this.parents_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.parentsConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * cross.prototype.pollinationEventsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
cross.prototype.pollinationEventsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.pollinationEvents_IDs) || this.pollinationEvents_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.pollinationevent.idAttribute(),
        "value": this.pollinationEvents_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.pollinationevents({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * cross.prototype.countFilteredPollinationEvents - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
cross.prototype.countFilteredPollinationEvents = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.pollinationEvents_IDs) || this.pollinationEvents_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.pollinationevent.idAttribute(),
        "value": this.pollinationEvents_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countPollinationevents({
        search: nsearch
    }, context);
}

/**
 * cross.prototype.pollinationEventsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
cross.prototype.pollinationEventsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.pollinationEvents_IDs) || this.pollinationEvents_IDs.length === 0) {
        return {
            edges: [],
            pollinationevents: [],
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
        "field": models.pollinationevent.idAttribute(),
        "value": this.pollinationEvents_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.pollinationeventsConnection({
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
cross.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addObservationUnits)) {
        promises_add.push(this.add_observationUnits(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addAdditionalInfo)) {
        promises_add.push(this.add_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addExternalReferences)) {
        promises_add.push(this.add_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addCrossAttributes)) {
        promises_add.push(this.add_crossAttributes(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addParents)) {
        promises_add.push(this.add_parents(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addPollinationEvents)) {
        promises_add.push(this.add_pollinationEvents(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addCrossingProject)) {
        promises_add.push(this.add_crossingProject(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addPlannedCross)) {
        promises_add.push(this.add_plannedCross(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removeObservationUnits)) {
        promises_remove.push(this.remove_observationUnits(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeAdditionalInfo)) {
        promises_remove.push(this.remove_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeExternalReferences)) {
        promises_remove.push(this.remove_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeCrossAttributes)) {
        promises_remove.push(this.remove_crossAttributes(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeParents)) {
        promises_remove.push(this.remove_parents(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removePollinationEvents)) {
        promises_remove.push(this.remove_pollinationEvents(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeCrossingProject)) {
        promises_remove.push(this.remove_crossingProject(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removePlannedCross)) {
        promises_remove.push(this.remove_plannedCross(input, benignErrorReporter, token));
    }

    await Promise.all(promises_remove);

}
/**
 * add_observationUnits - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
cross.prototype.add_observationUnits = async function(input, benignErrorReporter, token) {

    await cross.add_observationUnits_IDs(this.getIdValue(), input.addObservationUnits, benignErrorReporter, token);
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
cross.prototype.add_additionalInfo = async function(input, benignErrorReporter, token) {

    await cross.add_additionalInfo_IDs(this.getIdValue(), input.addAdditionalInfo, benignErrorReporter, token);
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
cross.prototype.add_externalReferences = async function(input, benignErrorReporter, token) {

    await cross.add_externalReferences_IDs(this.getIdValue(), input.addExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.unionIds(this.externalReferences_IDs, input.addExternalReferences);
}

/**
 * add_crossAttributes - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
cross.prototype.add_crossAttributes = async function(input, benignErrorReporter, token) {

    await cross.add_crossAttributes_IDs(this.getIdValue(), input.addCrossAttributes, benignErrorReporter, token);
    this.crossAttributes_IDs = helper.unionIds(this.crossAttributes_IDs, input.addCrossAttributes);
}

/**
 * add_parents - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
cross.prototype.add_parents = async function(input, benignErrorReporter, token) {

    await cross.add_parents_IDs(this.getIdValue(), input.addParents, benignErrorReporter, token);
    this.parents_IDs = helper.unionIds(this.parents_IDs, input.addParents);
}

/**
 * add_pollinationEvents - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
cross.prototype.add_pollinationEvents = async function(input, benignErrorReporter, token) {

    await cross.add_pollinationEvents_IDs(this.getIdValue(), input.addPollinationEvents, benignErrorReporter, token);
    this.pollinationEvents_IDs = helper.unionIds(this.pollinationEvents_IDs, input.addPollinationEvents);
}

/**
 * add_crossingProject - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
cross.prototype.add_crossingProject = async function(input, benignErrorReporter, token) {
    await cross.add_crossingProject_ID(this.getIdValue(), input.addCrossingProject, benignErrorReporter, token);
    this.crossingProject_ID = input.addCrossingProject;
}

/**
 * add_plannedCross - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
cross.prototype.add_plannedCross = async function(input, benignErrorReporter, token) {
    await cross.add_plannedCross_ID(this.getIdValue(), input.addPlannedCross, benignErrorReporter, token);
    this.plannedCross_ID = input.addPlannedCross;
}

/**
 * remove_observationUnits - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
cross.prototype.remove_observationUnits = async function(input, benignErrorReporter, token) {

    await cross.remove_observationUnits_IDs(this.getIdValue(), input.removeObservationUnits, benignErrorReporter, token);
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
cross.prototype.remove_additionalInfo = async function(input, benignErrorReporter, token) {

    await cross.remove_additionalInfo_IDs(this.getIdValue(), input.removeAdditionalInfo, benignErrorReporter, token);
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
cross.prototype.remove_externalReferences = async function(input, benignErrorReporter, token) {

    await cross.remove_externalReferences_IDs(this.getIdValue(), input.removeExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.differenceIds(this.externalReferences_IDs, input.removeExternalReferences);
}

/**
 * remove_crossAttributes - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
cross.prototype.remove_crossAttributes = async function(input, benignErrorReporter, token) {

    await cross.remove_crossAttributes_IDs(this.getIdValue(), input.removeCrossAttributes, benignErrorReporter, token);
    this.crossAttributes_IDs = helper.differenceIds(this.crossAttributes_IDs, input.removeCrossAttributes);
}

/**
 * remove_parents - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
cross.prototype.remove_parents = async function(input, benignErrorReporter, token) {

    await cross.remove_parents_IDs(this.getIdValue(), input.removeParents, benignErrorReporter, token);
    this.parents_IDs = helper.differenceIds(this.parents_IDs, input.removeParents);
}

/**
 * remove_pollinationEvents - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
cross.prototype.remove_pollinationEvents = async function(input, benignErrorReporter, token) {

    await cross.remove_pollinationEvents_IDs(this.getIdValue(), input.removePollinationEvents, benignErrorReporter, token);
    this.pollinationEvents_IDs = helper.differenceIds(this.pollinationEvents_IDs, input.removePollinationEvents);
}

/**
 * remove_crossingProject - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
cross.prototype.remove_crossingProject = async function(input, benignErrorReporter, token) {
    if (input.removeCrossingProject == this.crossingProject_ID) {
        await cross.remove_crossingProject_ID(this.getIdValue(), input.removeCrossingProject, benignErrorReporter, token);
        this.crossingProject_ID = null;
    }
}

/**
 * remove_plannedCross - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
cross.prototype.remove_plannedCross = async function(input, benignErrorReporter, token) {
    if (input.removePlannedCross == this.plannedCross_ID) {
        await cross.remove_plannedCross_ID(this.getIdValue(), input.removePlannedCross, benignErrorReporter, token);
        this.plannedCross_ID = null;
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

    let cross = await resolvers.readOneCross({
        crossDbId: id
    }, context);
    //check that record actually exists
    if (cross === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(cross.observationUnits_IDs) ? cross.observationUnits_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(cross.additionalInfo_IDs) ? cross.additionalInfo_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(cross.externalReferences_IDs) ? cross.externalReferences_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(cross.crossAttributes_IDs) ? cross.crossAttributes_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(cross.parents_IDs) ? cross.parents_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(cross.pollinationEvents_IDs) ? cross.pollinationEvents_IDs.length : 0;

    get_to_one_associated_fk += [null, undefined].includes(cross.crossingProject_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(cross.plannedCross_ID) ? 0 : 1;


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
        throw new Error(`cross with crossDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const cross_record = await resolvers.readOneCross({
            crossDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * crosses - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    crosses: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'cross', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "crosses");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await cross.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * crossesConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    crossesConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'cross', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "crossesConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await cross.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneCross - Check user authorization and return one record with the specified crossDbId in the crossDbId argument.
     *
     * @param  {number} {crossDbId}    crossDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with crossDbId requested
     */
    readOneCross: async function({
        crossDbId
    }, context) {
        if (await checkAuthorization(context, 'cross', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneCross");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await cross.readById(crossDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countCrosses - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countCrosses: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'cross', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await cross.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateCrossForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateCrossForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'cross', 'read');
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
                    cross,
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
     * validateCrossForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateCrossForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'cross', 'read');
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
                    cross,
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
     * validateCrossForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {crossDbId} crossDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateCrossForDeletion: async ({
        crossDbId
    }, context) => {
        if ((await checkAuthorization(context, 'cross', 'read')) === true) {
            try {
                await validForDeletion(crossDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    cross,
                    crossDbId);
                return true;
            } catch (error) {
                error.input = {
                    crossDbId: crossDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateCrossAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {crossDbId} crossDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateCrossAfterReading: async ({
        crossDbId
    }, context) => {
        if ((await checkAuthorization(context, 'cross', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    cross,
                    crossDbId);
                return true;
            } catch (error) {
                error.input = {
                    crossDbId: crossDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addCross - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addCross: async function(input, context) {
        let authorization = await checkAuthorization(context, 'cross', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.cross.definition);
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
            let createdCross = await cross.addOne(inputSanitized, context.benignErrors, token);
            await createdCross.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdCross;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteCross - Check user authorization and delete a record with the specified crossDbId in the crossDbId argument.
     *
     * @param  {number} {crossDbId}    crossDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteCross: async function({
        crossDbId
    }, context) {
        if (await checkAuthorization(context, 'cross', 'delete') === true) {
            if (await validForDeletion(crossDbId, context)) {
                await updateAssociations(crossDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return cross.deleteOne(crossDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateCross - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateCross: async function(input, context) {
        let authorization = await checkAuthorization(context, 'cross', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.cross.definition);
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
            let updatedCross = await cross.updateOne(inputSanitized, context.benignErrors, token);
            await updatedCross.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedCross;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateCross - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateCross: async function(_, context) {
        if (await checkAuthorization(context, 'cross', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return cross.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * crossesZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    crossesZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "cross", "read")) === true) {
            return cross.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}