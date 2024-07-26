/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const parent = require(path.join(__dirname, '..', 'models', 'index.js')).parent;
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
    'addParentGermplasm': 'germplasm',
    'addCrosses': 'cross',
    'addCrossingProjects': 'crossingproject',
    'addPedigreeNode': 'pedigreenode',
    'addPlannedCrosses': 'plannedcross'
}



/**
 * parent.prototype.parentGermplasm - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
parent.prototype.parentGermplasm = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.parentGermplasm_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneGermplasm({
                [models.germplasm.idAttribute()]: this.parentGermplasm_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.germplasm.idAttribute(),
                "value": this.parentGermplasm_ID,
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
                        `Not unique "to_one" association Error: Found > 1 germplasms matching parent with parentDbId ${this.parentGermplasm_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the parent model. Returning first germplasm.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}

/**
 * parent.prototype.crossesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
parent.prototype.crossesFilter = function({
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
 * parent.prototype.countFilteredCrosses - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
parent.prototype.countFilteredCrosses = function({
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
 * parent.prototype.crossesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
parent.prototype.crossesConnection = function({
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
 * parent.prototype.crossingProjectsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
parent.prototype.crossingProjectsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.crossingProjects_IDs) || this.crossingProjects_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.crossingproject.idAttribute(),
        "value": this.crossingProjects_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.crossingprojects({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * parent.prototype.countFilteredCrossingProjects - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
parent.prototype.countFilteredCrossingProjects = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.crossingProjects_IDs) || this.crossingProjects_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.crossingproject.idAttribute(),
        "value": this.crossingProjects_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countCrossingprojects({
        search: nsearch
    }, context);
}

/**
 * parent.prototype.crossingProjectsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
parent.prototype.crossingProjectsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.crossingProjects_IDs) || this.crossingProjects_IDs.length === 0) {
        return {
            edges: [],
            crossingprojects: [],
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
        "field": models.crossingproject.idAttribute(),
        "value": this.crossingProjects_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.crossingprojectsConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * parent.prototype.pedigreeNodeFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
parent.prototype.pedigreeNodeFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.pedigreeNode_IDs) || this.pedigreeNode_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.pedigreenode.idAttribute(),
        "value": this.pedigreeNode_IDs.join(','),
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
 * parent.prototype.countFilteredPedigreeNode - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
parent.prototype.countFilteredPedigreeNode = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.pedigreeNode_IDs) || this.pedigreeNode_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.pedigreenode.idAttribute(),
        "value": this.pedigreeNode_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countPedigreenodes({
        search: nsearch
    }, context);
}

/**
 * parent.prototype.pedigreeNodeConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
parent.prototype.pedigreeNodeConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.pedigreeNode_IDs) || this.pedigreeNode_IDs.length === 0) {
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
        "value": this.pedigreeNode_IDs.join(','),
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
 * parent.prototype.plannedCrossesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
parent.prototype.plannedCrossesFilter = function({
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
 * parent.prototype.countFilteredPlannedCrosses - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
parent.prototype.countFilteredPlannedCrosses = function({
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
 * parent.prototype.plannedCrossesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
parent.prototype.plannedCrossesConnection = function({
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
 * handleAssociations - handles the given associations in the create and update case.
 *
 * @param {object} input   Info of each field to create the new record
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
parent.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addCrosses)) {
        promises_add.push(this.add_crosses(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addCrossingProjects)) {
        promises_add.push(this.add_crossingProjects(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addPedigreeNode)) {
        promises_add.push(this.add_pedigreeNode(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addPlannedCrosses)) {
        promises_add.push(this.add_plannedCrosses(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addParentGermplasm)) {
        promises_add.push(this.add_parentGermplasm(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removeCrosses)) {
        promises_remove.push(this.remove_crosses(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeCrossingProjects)) {
        promises_remove.push(this.remove_crossingProjects(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removePedigreeNode)) {
        promises_remove.push(this.remove_pedigreeNode(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removePlannedCrosses)) {
        promises_remove.push(this.remove_plannedCrosses(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeParentGermplasm)) {
        promises_remove.push(this.remove_parentGermplasm(input, benignErrorReporter, token));
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
parent.prototype.add_crosses = async function(input, benignErrorReporter, token) {

    await parent.add_crosses_IDs(this.getIdValue(), input.addCrosses, benignErrorReporter, token);
    this.crosses_IDs = helper.unionIds(this.crosses_IDs, input.addCrosses);
}

/**
 * add_crossingProjects - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
parent.prototype.add_crossingProjects = async function(input, benignErrorReporter, token) {

    await parent.add_crossingProjects_IDs(this.getIdValue(), input.addCrossingProjects, benignErrorReporter, token);
    this.crossingProjects_IDs = helper.unionIds(this.crossingProjects_IDs, input.addCrossingProjects);
}

/**
 * add_pedigreeNode - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
parent.prototype.add_pedigreeNode = async function(input, benignErrorReporter, token) {

    await parent.add_pedigreeNode_IDs(this.getIdValue(), input.addPedigreeNode, benignErrorReporter, token);
    this.pedigreeNode_IDs = helper.unionIds(this.pedigreeNode_IDs, input.addPedigreeNode);
}

/**
 * add_plannedCrosses - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
parent.prototype.add_plannedCrosses = async function(input, benignErrorReporter, token) {

    await parent.add_plannedCrosses_IDs(this.getIdValue(), input.addPlannedCrosses, benignErrorReporter, token);
    this.plannedCrosses_IDs = helper.unionIds(this.plannedCrosses_IDs, input.addPlannedCrosses);
}

/**
 * add_parentGermplasm - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
parent.prototype.add_parentGermplasm = async function(input, benignErrorReporter, token) {
    await parent.add_parentGermplasm_ID(this.getIdValue(), input.addParentGermplasm, benignErrorReporter, token);
    this.parentGermplasm_ID = input.addParentGermplasm;
}

/**
 * remove_crosses - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
parent.prototype.remove_crosses = async function(input, benignErrorReporter, token) {

    await parent.remove_crosses_IDs(this.getIdValue(), input.removeCrosses, benignErrorReporter, token);
    this.crosses_IDs = helper.differenceIds(this.crosses_IDs, input.removeCrosses);
}

/**
 * remove_crossingProjects - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
parent.prototype.remove_crossingProjects = async function(input, benignErrorReporter, token) {

    await parent.remove_crossingProjects_IDs(this.getIdValue(), input.removeCrossingProjects, benignErrorReporter, token);
    this.crossingProjects_IDs = helper.differenceIds(this.crossingProjects_IDs, input.removeCrossingProjects);
}

/**
 * remove_pedigreeNode - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
parent.prototype.remove_pedigreeNode = async function(input, benignErrorReporter, token) {

    await parent.remove_pedigreeNode_IDs(this.getIdValue(), input.removePedigreeNode, benignErrorReporter, token);
    this.pedigreeNode_IDs = helper.differenceIds(this.pedigreeNode_IDs, input.removePedigreeNode);
}

/**
 * remove_plannedCrosses - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
parent.prototype.remove_plannedCrosses = async function(input, benignErrorReporter, token) {

    await parent.remove_plannedCrosses_IDs(this.getIdValue(), input.removePlannedCrosses, benignErrorReporter, token);
    this.plannedCrosses_IDs = helper.differenceIds(this.plannedCrosses_IDs, input.removePlannedCrosses);
}

/**
 * remove_parentGermplasm - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
parent.prototype.remove_parentGermplasm = async function(input, benignErrorReporter, token) {
    if (input.removeParentGermplasm == this.parentGermplasm_ID) {
        await parent.remove_parentGermplasm_ID(this.getIdValue(), input.removeParentGermplasm, benignErrorReporter, token);
        this.parentGermplasm_ID = null;
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

    let parent = await resolvers.readOneParent({
        parentDbId: id
    }, context);
    //check that record actually exists
    if (parent === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(parent.crosses_IDs) ? parent.crosses_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(parent.crossingProjects_IDs) ? parent.crossingProjects_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(parent.pedigreeNode_IDs) ? parent.pedigreeNode_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(parent.plannedCrosses_IDs) ? parent.plannedCrosses_IDs.length : 0;

    get_to_one_associated_fk += [null, undefined].includes(parent.parentGermplasm_ID) ? 0 : 1;


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
        throw new Error(`parent with parentDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const parent_record = await resolvers.readOneParent({
            parentDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * parents - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    parents: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'parent', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "parents");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await parent.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * parentsConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    parentsConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'parent', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "parentsConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await parent.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneParent - Check user authorization and return one record with the specified parentDbId in the parentDbId argument.
     *
     * @param  {number} {parentDbId}    parentDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with parentDbId requested
     */
    readOneParent: async function({
        parentDbId
    }, context) {
        if (await checkAuthorization(context, 'parent', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneParent");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await parent.readById(parentDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countParents - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countParents: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'parent', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await parent.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateParentForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateParentForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'parent', 'read');
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
                    parent,
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
     * validateParentForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateParentForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'parent', 'read');
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
                    parent,
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
     * validateParentForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {parentDbId} parentDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateParentForDeletion: async ({
        parentDbId
    }, context) => {
        if ((await checkAuthorization(context, 'parent', 'read')) === true) {
            try {
                await validForDeletion(parentDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    parent,
                    parentDbId);
                return true;
            } catch (error) {
                error.input = {
                    parentDbId: parentDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateParentAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {parentDbId} parentDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateParentAfterReading: async ({
        parentDbId
    }, context) => {
        if ((await checkAuthorization(context, 'parent', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    parent,
                    parentDbId);
                return true;
            } catch (error) {
                error.input = {
                    parentDbId: parentDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addParent - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addParent: async function(input, context) {
        let authorization = await checkAuthorization(context, 'parent', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.parent.definition);
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
            let createdParent = await parent.addOne(inputSanitized, context.benignErrors, token);
            await createdParent.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdParent;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteParent - Check user authorization and delete a record with the specified parentDbId in the parentDbId argument.
     *
     * @param  {number} {parentDbId}    parentDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteParent: async function({
        parentDbId
    }, context) {
        if (await checkAuthorization(context, 'parent', 'delete') === true) {
            if (await validForDeletion(parentDbId, context)) {
                await updateAssociations(parentDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return parent.deleteOne(parentDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateParent - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateParent: async function(input, context) {
        let authorization = await checkAuthorization(context, 'parent', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.parent.definition);
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
            let updatedParent = await parent.updateOne(inputSanitized, context.benignErrors, token);
            await updatedParent.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedParent;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateParent - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateParent: async function(_, context) {
        if (await checkAuthorization(context, 'parent', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return parent.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * parentsZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    parentsZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "parent", "read")) === true) {
            return parent.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}