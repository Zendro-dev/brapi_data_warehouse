/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const crossingproject = require(path.join(__dirname, '..', 'models', 'index.js')).crossingproject;
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
    'addProgram': 'program',
    'addCrosses': 'cross',
    'addPlannedCrosses': 'plannedcross',
    'addPedigreeNodes': 'pedigreenode',
    'addAdditionalInfo': 'additionalinfo',
    'addExternalReferences': 'externalreference',
    'addPotentialParents': 'parent'
}



/**
 * crossingproject.prototype.program - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
crossingproject.prototype.program = async function({
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
                        `Not unique "to_one" association Error: Found > 1 programs matching crossingproject with crossingProjectDbId ${this.program_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the crossingproject model. Returning first program.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}

/**
 * crossingproject.prototype.crossesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
crossingproject.prototype.crossesFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.crosses_IDs) || this.crosses_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.cross.idAttribute(),
        "value": this.crosses_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.crosses({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * crossingproject.prototype.countFilteredCrosses - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
crossingproject.prototype.countFilteredCrosses = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.crosses_IDs) || this.crosses_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.cross.idAttribute(),
        "value": this.crosses_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countCrosses({
        search: nsearch
    }, context);
}

/**
 * crossingproject.prototype.crossesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
crossingproject.prototype.crossesConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.crosses_IDs) || this.crosses_IDs.length === 0) {
        return {
            edges: [],
            crosses: [],
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
        "field": models.cross.idAttribute(),
        "value": this.crosses_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.crossesConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * crossingproject.prototype.plannedCrossesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
crossingproject.prototype.plannedCrossesFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.plannedCrosses_IDs) || this.plannedCrosses_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.plannedcross.idAttribute(),
        "value": this.plannedCrosses_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.plannedcrosses({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * crossingproject.prototype.countFilteredPlannedCrosses - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
crossingproject.prototype.countFilteredPlannedCrosses = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.plannedCrosses_IDs) || this.plannedCrosses_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.plannedcross.idAttribute(),
        "value": this.plannedCrosses_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countPlannedcrosses({
        search: nsearch
    }, context);
}

/**
 * crossingproject.prototype.plannedCrossesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
crossingproject.prototype.plannedCrossesConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.plannedCrosses_IDs) || this.plannedCrosses_IDs.length === 0) {
        return {
            edges: [],
            plannedcrosses: [],
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
        "field": models.plannedcross.idAttribute(),
        "value": this.plannedCrosses_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.plannedcrossesConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * crossingproject.prototype.pedigreeNodesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
crossingproject.prototype.pedigreeNodesFilter = function({
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
 * crossingproject.prototype.countFilteredPedigreeNodes - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
crossingproject.prototype.countFilteredPedigreeNodes = function({
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
 * crossingproject.prototype.pedigreeNodesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
crossingproject.prototype.pedigreeNodesConnection = function({
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
 * crossingproject.prototype.additionalInfoFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
crossingproject.prototype.additionalInfoFilter = function({
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
 * crossingproject.prototype.countFilteredAdditionalInfo - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
crossingproject.prototype.countFilteredAdditionalInfo = function({
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
 * crossingproject.prototype.additionalInfoConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
crossingproject.prototype.additionalInfoConnection = function({
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
 * crossingproject.prototype.externalReferencesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
crossingproject.prototype.externalReferencesFilter = function({
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
 * crossingproject.prototype.countFilteredExternalReferences - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
crossingproject.prototype.countFilteredExternalReferences = function({
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
 * crossingproject.prototype.externalReferencesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
crossingproject.prototype.externalReferencesConnection = function({
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
 * crossingproject.prototype.potentialParentsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
crossingproject.prototype.potentialParentsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.potentialParents_IDs) || this.potentialParents_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.parent.idAttribute(),
        "value": this.potentialParents_IDs.join(','),
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
 * crossingproject.prototype.countFilteredPotentialParents - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
crossingproject.prototype.countFilteredPotentialParents = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.potentialParents_IDs) || this.potentialParents_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.parent.idAttribute(),
        "value": this.potentialParents_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countParents({
        search: nsearch
    }, context);
}

/**
 * crossingproject.prototype.potentialParentsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
crossingproject.prototype.potentialParentsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.potentialParents_IDs) || this.potentialParents_IDs.length === 0) {
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
        "value": this.potentialParents_IDs.join(','),
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
 * handleAssociations - handles the given associations in the create and update case.
 *
 * @param {object} input   Info of each field to create the new record
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
crossingproject.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addCrosses)) {
        promises_add.push(this.add_crosses(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addPlannedCrosses)) {
        promises_add.push(this.add_plannedCrosses(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addPedigreeNodes)) {
        promises_add.push(this.add_pedigreeNodes(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addAdditionalInfo)) {
        promises_add.push(this.add_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addExternalReferences)) {
        promises_add.push(this.add_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addPotentialParents)) {
        promises_add.push(this.add_potentialParents(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addProgram)) {
        promises_add.push(this.add_program(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removeCrosses)) {
        promises_remove.push(this.remove_crosses(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removePlannedCrosses)) {
        promises_remove.push(this.remove_plannedCrosses(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removePedigreeNodes)) {
        promises_remove.push(this.remove_pedigreeNodes(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeAdditionalInfo)) {
        promises_remove.push(this.remove_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeExternalReferences)) {
        promises_remove.push(this.remove_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removePotentialParents)) {
        promises_remove.push(this.remove_potentialParents(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeProgram)) {
        promises_remove.push(this.remove_program(input, benignErrorReporter, token));
    }

    await Promise.all(promises_remove);

}
/**
 * add_crosses - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
crossingproject.prototype.add_crosses = async function(input, benignErrorReporter, token) {

    await crossingproject.add_crosses_IDs(this.getIdValue(), input.addCrosses, benignErrorReporter, token);
    this.crosses_IDs = helper.unionIds(this.crosses_IDs, input.addCrosses);
}

/**
 * add_plannedCrosses - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
crossingproject.prototype.add_plannedCrosses = async function(input, benignErrorReporter, token) {

    await crossingproject.add_plannedCrosses_IDs(this.getIdValue(), input.addPlannedCrosses, benignErrorReporter, token);
    this.plannedCrosses_IDs = helper.unionIds(this.plannedCrosses_IDs, input.addPlannedCrosses);
}

/**
 * add_pedigreeNodes - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
crossingproject.prototype.add_pedigreeNodes = async function(input, benignErrorReporter, token) {

    await crossingproject.add_pedigreeNodes_IDs(this.getIdValue(), input.addPedigreeNodes, benignErrorReporter, token);
    this.pedigreeNodes_IDs = helper.unionIds(this.pedigreeNodes_IDs, input.addPedigreeNodes);
}

/**
 * add_additionalInfo - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
crossingproject.prototype.add_additionalInfo = async function(input, benignErrorReporter, token) {

    await crossingproject.add_additionalInfo_IDs(this.getIdValue(), input.addAdditionalInfo, benignErrorReporter, token);
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
crossingproject.prototype.add_externalReferences = async function(input, benignErrorReporter, token) {

    await crossingproject.add_externalReferences_IDs(this.getIdValue(), input.addExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.unionIds(this.externalReferences_IDs, input.addExternalReferences);
}

/**
 * add_potentialParents - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
crossingproject.prototype.add_potentialParents = async function(input, benignErrorReporter, token) {

    await crossingproject.add_potentialParents_IDs(this.getIdValue(), input.addPotentialParents, benignErrorReporter, token);
    this.potentialParents_IDs = helper.unionIds(this.potentialParents_IDs, input.addPotentialParents);
}

/**
 * add_program - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
crossingproject.prototype.add_program = async function(input, benignErrorReporter, token) {
    await crossingproject.add_program_ID(this.getIdValue(), input.addProgram, benignErrorReporter, token);
    this.program_ID = input.addProgram;
}

/**
 * remove_crosses - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
crossingproject.prototype.remove_crosses = async function(input, benignErrorReporter, token) {

    await crossingproject.remove_crosses_IDs(this.getIdValue(), input.removeCrosses, benignErrorReporter, token);
    this.crosses_IDs = helper.differenceIds(this.crosses_IDs, input.removeCrosses);
}

/**
 * remove_plannedCrosses - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
crossingproject.prototype.remove_plannedCrosses = async function(input, benignErrorReporter, token) {

    await crossingproject.remove_plannedCrosses_IDs(this.getIdValue(), input.removePlannedCrosses, benignErrorReporter, token);
    this.plannedCrosses_IDs = helper.differenceIds(this.plannedCrosses_IDs, input.removePlannedCrosses);
}

/**
 * remove_pedigreeNodes - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
crossingproject.prototype.remove_pedigreeNodes = async function(input, benignErrorReporter, token) {

    await crossingproject.remove_pedigreeNodes_IDs(this.getIdValue(), input.removePedigreeNodes, benignErrorReporter, token);
    this.pedigreeNodes_IDs = helper.differenceIds(this.pedigreeNodes_IDs, input.removePedigreeNodes);
}

/**
 * remove_additionalInfo - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
crossingproject.prototype.remove_additionalInfo = async function(input, benignErrorReporter, token) {

    await crossingproject.remove_additionalInfo_IDs(this.getIdValue(), input.removeAdditionalInfo, benignErrorReporter, token);
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
crossingproject.prototype.remove_externalReferences = async function(input, benignErrorReporter, token) {

    await crossingproject.remove_externalReferences_IDs(this.getIdValue(), input.removeExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.differenceIds(this.externalReferences_IDs, input.removeExternalReferences);
}

/**
 * remove_potentialParents - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
crossingproject.prototype.remove_potentialParents = async function(input, benignErrorReporter, token) {

    await crossingproject.remove_potentialParents_IDs(this.getIdValue(), input.removePotentialParents, benignErrorReporter, token);
    this.potentialParents_IDs = helper.differenceIds(this.potentialParents_IDs, input.removePotentialParents);
}

/**
 * remove_program - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
crossingproject.prototype.remove_program = async function(input, benignErrorReporter, token) {
    if (input.removeProgram == this.program_ID) {
        await crossingproject.remove_program_ID(this.getIdValue(), input.removeProgram, benignErrorReporter, token);
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

    let crossingproject = await resolvers.readOneCrossingproject({
        crossingProjectDbId: id
    }, context);
    //check that record actually exists
    if (crossingproject === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(crossingproject.crosses_IDs) ? crossingproject.crosses_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(crossingproject.plannedCrosses_IDs) ? crossingproject.plannedCrosses_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(crossingproject.pedigreeNodes_IDs) ? crossingproject.pedigreeNodes_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(crossingproject.additionalInfo_IDs) ? crossingproject.additionalInfo_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(crossingproject.externalReferences_IDs) ? crossingproject.externalReferences_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(crossingproject.potentialParents_IDs) ? crossingproject.potentialParents_IDs.length : 0;

    get_to_one_associated_fk += [null, undefined].includes(crossingproject.program_ID) ? 0 : 1;


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
        throw new Error(`crossingproject with crossingProjectDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const crossingproject_record = await resolvers.readOneCrossingproject({
            crossingProjectDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * crossingprojects - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    crossingprojects: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'crossingproject', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "crossingprojects");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await crossingproject.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * crossingprojectsConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    crossingprojectsConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'crossingproject', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "crossingprojectsConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await crossingproject.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneCrossingproject - Check user authorization and return one record with the specified crossingProjectDbId in the crossingProjectDbId argument.
     *
     * @param  {number} {crossingProjectDbId}    crossingProjectDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with crossingProjectDbId requested
     */
    readOneCrossingproject: async function({
        crossingProjectDbId
    }, context) {
        if (await checkAuthorization(context, 'crossingproject', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneCrossingproject");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await crossingproject.readById(crossingProjectDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countCrossingprojects - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countCrossingprojects: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'crossingproject', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await crossingproject.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateCrossingprojectForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateCrossingprojectForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'crossingproject', 'read');
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
                    crossingproject,
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
     * validateCrossingprojectForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateCrossingprojectForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'crossingproject', 'read');
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
                    crossingproject,
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
     * validateCrossingprojectForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {crossingProjectDbId} crossingProjectDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateCrossingprojectForDeletion: async ({
        crossingProjectDbId
    }, context) => {
        if ((await checkAuthorization(context, 'crossingproject', 'read')) === true) {
            try {
                await validForDeletion(crossingProjectDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    crossingproject,
                    crossingProjectDbId);
                return true;
            } catch (error) {
                error.input = {
                    crossingProjectDbId: crossingProjectDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateCrossingprojectAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {crossingProjectDbId} crossingProjectDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateCrossingprojectAfterReading: async ({
        crossingProjectDbId
    }, context) => {
        if ((await checkAuthorization(context, 'crossingproject', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    crossingproject,
                    crossingProjectDbId);
                return true;
            } catch (error) {
                error.input = {
                    crossingProjectDbId: crossingProjectDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addCrossingproject - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addCrossingproject: async function(input, context) {
        let authorization = await checkAuthorization(context, 'crossingproject', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.crossingproject.definition);
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
            let createdCrossingproject = await crossingproject.addOne(inputSanitized, context.benignErrors, token);
            await createdCrossingproject.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdCrossingproject;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteCrossingproject - Check user authorization and delete a record with the specified crossingProjectDbId in the crossingProjectDbId argument.
     *
     * @param  {number} {crossingProjectDbId}    crossingProjectDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteCrossingproject: async function({
        crossingProjectDbId
    }, context) {
        if (await checkAuthorization(context, 'crossingproject', 'delete') === true) {
            if (await validForDeletion(crossingProjectDbId, context)) {
                await updateAssociations(crossingProjectDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return crossingproject.deleteOne(crossingProjectDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateCrossingproject - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateCrossingproject: async function(input, context) {
        let authorization = await checkAuthorization(context, 'crossingproject', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.crossingproject.definition);
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
            let updatedCrossingproject = await crossingproject.updateOne(inputSanitized, context.benignErrors, token);
            await updatedCrossingproject.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedCrossingproject;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateCrossingproject - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateCrossingproject: async function(_, context) {
        if (await checkAuthorization(context, 'crossingproject', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return crossingproject.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * crossingprojectsZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    crossingprojectsZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "crossingproject", "read")) === true) {
            return crossingproject.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}