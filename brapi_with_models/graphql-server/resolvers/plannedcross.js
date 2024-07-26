/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const plannedcross = require(path.join(__dirname, '..', 'models', 'index.js')).plannedcross;
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
    'addCrosses': 'cross',
    'addAdditionalInfo': 'additionalinfo',
    'addExternalReferences': 'externalreference',
    'addParents': 'parent'
}



/**
 * plannedcross.prototype.crossingProject - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
plannedcross.prototype.crossingProject = async function({
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
                        `Not unique "to_one" association Error: Found > 1 crossingprojects matching plannedcross with plannedCrossDbId ${this.crossingProject_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the plannedcross model. Returning first crossingproject.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}

/**
 * plannedcross.prototype.crossesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
plannedcross.prototype.crossesFilter = function({
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
 * plannedcross.prototype.countFilteredCrosses - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
plannedcross.prototype.countFilteredCrosses = function({
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
 * plannedcross.prototype.crossesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
plannedcross.prototype.crossesConnection = function({
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
 * plannedcross.prototype.additionalInfoFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
plannedcross.prototype.additionalInfoFilter = function({
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
 * plannedcross.prototype.countFilteredAdditionalInfo - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
plannedcross.prototype.countFilteredAdditionalInfo = function({
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
 * plannedcross.prototype.additionalInfoConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
plannedcross.prototype.additionalInfoConnection = function({
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
 * plannedcross.prototype.externalReferencesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
plannedcross.prototype.externalReferencesFilter = function({
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
 * plannedcross.prototype.countFilteredExternalReferences - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
plannedcross.prototype.countFilteredExternalReferences = function({
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
 * plannedcross.prototype.externalReferencesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
plannedcross.prototype.externalReferencesConnection = function({
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
 * plannedcross.prototype.parentsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
plannedcross.prototype.parentsFilter = function({
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
 * plannedcross.prototype.countFilteredParents - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
plannedcross.prototype.countFilteredParents = function({
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
 * plannedcross.prototype.parentsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
plannedcross.prototype.parentsConnection = function({
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
 * handleAssociations - handles the given associations in the create and update case.
 *
 * @param {object} input   Info of each field to create the new record
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
plannedcross.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addCrosses)) {
        promises_add.push(this.add_crosses(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addAdditionalInfo)) {
        promises_add.push(this.add_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addExternalReferences)) {
        promises_add.push(this.add_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addParents)) {
        promises_add.push(this.add_parents(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addCrossingProject)) {
        promises_add.push(this.add_crossingProject(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removeCrosses)) {
        promises_remove.push(this.remove_crosses(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeAdditionalInfo)) {
        promises_remove.push(this.remove_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeExternalReferences)) {
        promises_remove.push(this.remove_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeParents)) {
        promises_remove.push(this.remove_parents(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeCrossingProject)) {
        promises_remove.push(this.remove_crossingProject(input, benignErrorReporter, token));
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
plannedcross.prototype.add_crosses = async function(input, benignErrorReporter, token) {

    await plannedcross.add_crosses_IDs(this.getIdValue(), input.addCrosses, benignErrorReporter, token);
    this.crosses_IDs = helper.unionIds(this.crosses_IDs, input.addCrosses);
}

/**
 * add_additionalInfo - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
plannedcross.prototype.add_additionalInfo = async function(input, benignErrorReporter, token) {

    await plannedcross.add_additionalInfo_IDs(this.getIdValue(), input.addAdditionalInfo, benignErrorReporter, token);
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
plannedcross.prototype.add_externalReferences = async function(input, benignErrorReporter, token) {

    await plannedcross.add_externalReferences_IDs(this.getIdValue(), input.addExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.unionIds(this.externalReferences_IDs, input.addExternalReferences);
}

/**
 * add_parents - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
plannedcross.prototype.add_parents = async function(input, benignErrorReporter, token) {

    await plannedcross.add_parents_IDs(this.getIdValue(), input.addParents, benignErrorReporter, token);
    this.parents_IDs = helper.unionIds(this.parents_IDs, input.addParents);
}

/**
 * add_crossingProject - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
plannedcross.prototype.add_crossingProject = async function(input, benignErrorReporter, token) {
    await plannedcross.add_crossingProject_ID(this.getIdValue(), input.addCrossingProject, benignErrorReporter, token);
    this.crossingProject_ID = input.addCrossingProject;
}

/**
 * remove_crosses - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
plannedcross.prototype.remove_crosses = async function(input, benignErrorReporter, token) {

    await plannedcross.remove_crosses_IDs(this.getIdValue(), input.removeCrosses, benignErrorReporter, token);
    this.crosses_IDs = helper.differenceIds(this.crosses_IDs, input.removeCrosses);
}

/**
 * remove_additionalInfo - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
plannedcross.prototype.remove_additionalInfo = async function(input, benignErrorReporter, token) {

    await plannedcross.remove_additionalInfo_IDs(this.getIdValue(), input.removeAdditionalInfo, benignErrorReporter, token);
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
plannedcross.prototype.remove_externalReferences = async function(input, benignErrorReporter, token) {

    await plannedcross.remove_externalReferences_IDs(this.getIdValue(), input.removeExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.differenceIds(this.externalReferences_IDs, input.removeExternalReferences);
}

/**
 * remove_parents - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
plannedcross.prototype.remove_parents = async function(input, benignErrorReporter, token) {

    await plannedcross.remove_parents_IDs(this.getIdValue(), input.removeParents, benignErrorReporter, token);
    this.parents_IDs = helper.differenceIds(this.parents_IDs, input.removeParents);
}

/**
 * remove_crossingProject - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
plannedcross.prototype.remove_crossingProject = async function(input, benignErrorReporter, token) {
    if (input.removeCrossingProject == this.crossingProject_ID) {
        await plannedcross.remove_crossingProject_ID(this.getIdValue(), input.removeCrossingProject, benignErrorReporter, token);
        this.crossingProject_ID = null;
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

    let plannedcross = await resolvers.readOnePlannedcross({
        plannedCrossDbId: id
    }, context);
    //check that record actually exists
    if (plannedcross === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(plannedcross.crosses_IDs) ? plannedcross.crosses_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(plannedcross.additionalInfo_IDs) ? plannedcross.additionalInfo_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(plannedcross.externalReferences_IDs) ? plannedcross.externalReferences_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(plannedcross.parents_IDs) ? plannedcross.parents_IDs.length : 0;

    get_to_one_associated_fk += [null, undefined].includes(plannedcross.crossingProject_ID) ? 0 : 1;


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
        throw new Error(`plannedcross with plannedCrossDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const plannedcross_record = await resolvers.readOnePlannedcross({
            plannedCrossDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * plannedcrosses - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    plannedcrosses: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'plannedcross', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "plannedcrosses");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await plannedcross.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * plannedcrossesConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    plannedcrossesConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'plannedcross', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "plannedcrossesConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await plannedcross.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOnePlannedcross - Check user authorization and return one record with the specified plannedCrossDbId in the plannedCrossDbId argument.
     *
     * @param  {number} {plannedCrossDbId}    plannedCrossDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with plannedCrossDbId requested
     */
    readOnePlannedcross: async function({
        plannedCrossDbId
    }, context) {
        if (await checkAuthorization(context, 'plannedcross', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOnePlannedcross");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await plannedcross.readById(plannedCrossDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countPlannedcrosses - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countPlannedcrosses: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'plannedcross', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await plannedcross.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validatePlannedcrossForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validatePlannedcrossForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'plannedcross', 'read');
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
                    plannedcross,
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
     * validatePlannedcrossForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validatePlannedcrossForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'plannedcross', 'read');
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
                    plannedcross,
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
     * validatePlannedcrossForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {plannedCrossDbId} plannedCrossDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validatePlannedcrossForDeletion: async ({
        plannedCrossDbId
    }, context) => {
        if ((await checkAuthorization(context, 'plannedcross', 'read')) === true) {
            try {
                await validForDeletion(plannedCrossDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    plannedcross,
                    plannedCrossDbId);
                return true;
            } catch (error) {
                error.input = {
                    plannedCrossDbId: plannedCrossDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validatePlannedcrossAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {plannedCrossDbId} plannedCrossDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validatePlannedcrossAfterReading: async ({
        plannedCrossDbId
    }, context) => {
        if ((await checkAuthorization(context, 'plannedcross', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    plannedcross,
                    plannedCrossDbId);
                return true;
            } catch (error) {
                error.input = {
                    plannedCrossDbId: plannedCrossDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addPlannedcross - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addPlannedcross: async function(input, context) {
        let authorization = await checkAuthorization(context, 'plannedcross', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.plannedcross.definition);
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
            let createdPlannedcross = await plannedcross.addOne(inputSanitized, context.benignErrors, token);
            await createdPlannedcross.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdPlannedcross;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deletePlannedcross - Check user authorization and delete a record with the specified plannedCrossDbId in the plannedCrossDbId argument.
     *
     * @param  {number} {plannedCrossDbId}    plannedCrossDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deletePlannedcross: async function({
        plannedCrossDbId
    }, context) {
        if (await checkAuthorization(context, 'plannedcross', 'delete') === true) {
            if (await validForDeletion(plannedCrossDbId, context)) {
                await updateAssociations(plannedCrossDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return plannedcross.deleteOne(plannedCrossDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updatePlannedcross - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updatePlannedcross: async function(input, context) {
        let authorization = await checkAuthorization(context, 'plannedcross', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.plannedcross.definition);
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
            let updatedPlannedcross = await plannedcross.updateOne(inputSanitized, context.benignErrors, token);
            await updatedPlannedcross.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedPlannedcross;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplatePlannedcross - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplatePlannedcross: async function(_, context) {
        if (await checkAuthorization(context, 'plannedcross', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return plannedcross.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * plannedcrossesZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    plannedcrossesZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "plannedcross", "read")) === true) {
            return plannedcross.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}