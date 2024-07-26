/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const observationunitposition = require(path.join(__dirname, '..', 'models', 'index.js')).observationunitposition;
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
    'addObservationUnit': 'observationunit',
    'addGeoCoordinates': 'coordinate',
    'addObservationLevel': 'observationlevel',
    'addObservationLevelRelationships': 'observationlevelrelationship'
}



/**
 * observationunitposition.prototype.observationUnit - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
observationunitposition.prototype.observationUnit = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.observationUnit_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneObservationunit({
                [models.observationunit.idAttribute()]: this.observationUnit_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.observationunit.idAttribute(),
                "value": this.observationUnit_ID,
                "operator": "eq"
            });
            let found = (await resolvers.observationunitsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 observationunits matching observationunitposition with observationUnitPositionDbId ${this.observationUnit_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the observationunitposition model. Returning first observationunit.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * observationunitposition.prototype.geoCoordinates - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
observationunitposition.prototype.geoCoordinates = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.geoCoordinates_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneCoordinate({
                [models.coordinate.idAttribute()]: this.geoCoordinates_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.coordinate.idAttribute(),
                "value": this.geoCoordinates_ID,
                "operator": "eq"
            });
            let found = (await resolvers.coordinatesConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 coordinates matching observationunitposition with observationUnitPositionDbId ${this.geoCoordinates_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the observationunitposition model. Returning first coordinate.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}

/**
 * observationunitposition.prototype.observationLevelFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
observationunitposition.prototype.observationLevelFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.observationLevel_IDs) || this.observationLevel_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.observationlevel.idAttribute(),
        "value": this.observationLevel_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.observationlevels({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * observationunitposition.prototype.countFilteredObservationLevel - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
observationunitposition.prototype.countFilteredObservationLevel = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.observationLevel_IDs) || this.observationLevel_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.observationlevel.idAttribute(),
        "value": this.observationLevel_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countObservationlevels({
        search: nsearch
    }, context);
}

/**
 * observationunitposition.prototype.observationLevelConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
observationunitposition.prototype.observationLevelConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.observationLevel_IDs) || this.observationLevel_IDs.length === 0) {
        return {
            edges: [],
            observationlevels: [],
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
        "field": models.observationlevel.idAttribute(),
        "value": this.observationLevel_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.observationlevelsConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * observationunitposition.prototype.observationLevelRelationshipsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
observationunitposition.prototype.observationLevelRelationshipsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.observationLevelRelationships_IDs) || this.observationLevelRelationships_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.observationlevelrelationship.idAttribute(),
        "value": this.observationLevelRelationships_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.observationlevelrelationships({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * observationunitposition.prototype.countFilteredObservationLevelRelationships - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
observationunitposition.prototype.countFilteredObservationLevelRelationships = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.observationLevelRelationships_IDs) || this.observationLevelRelationships_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.observationlevelrelationship.idAttribute(),
        "value": this.observationLevelRelationships_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countObservationlevelrelationships({
        search: nsearch
    }, context);
}

/**
 * observationunitposition.prototype.observationLevelRelationshipsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
observationunitposition.prototype.observationLevelRelationshipsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.observationLevelRelationships_IDs) || this.observationLevelRelationships_IDs.length === 0) {
        return {
            edges: [],
            observationlevelrelationships: [],
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
        "field": models.observationlevelrelationship.idAttribute(),
        "value": this.observationLevelRelationships_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.observationlevelrelationshipsConnection({
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
observationunitposition.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addObservationLevel)) {
        promises_add.push(this.add_observationLevel(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addObservationLevelRelationships)) {
        promises_add.push(this.add_observationLevelRelationships(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addObservationUnit)) {
        promises_add.push(this.add_observationUnit(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addGeoCoordinates)) {
        promises_add.push(this.add_geoCoordinates(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removeObservationLevel)) {
        promises_remove.push(this.remove_observationLevel(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeObservationLevelRelationships)) {
        promises_remove.push(this.remove_observationLevelRelationships(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeObservationUnit)) {
        promises_remove.push(this.remove_observationUnit(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeGeoCoordinates)) {
        promises_remove.push(this.remove_geoCoordinates(input, benignErrorReporter, token));
    }

    await Promise.all(promises_remove);

}
/**
 * add_observationLevel - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunitposition.prototype.add_observationLevel = async function(input, benignErrorReporter, token) {

    await observationunitposition.add_observationLevel_IDs(this.getIdValue(), input.addObservationLevel, benignErrorReporter, token);
    this.observationLevel_IDs = helper.unionIds(this.observationLevel_IDs, input.addObservationLevel);
}

/**
 * add_observationLevelRelationships - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunitposition.prototype.add_observationLevelRelationships = async function(input, benignErrorReporter, token) {

    await observationunitposition.add_observationLevelRelationships_IDs(this.getIdValue(), input.addObservationLevelRelationships, benignErrorReporter, token);
    this.observationLevelRelationships_IDs = helper.unionIds(this.observationLevelRelationships_IDs, input.addObservationLevelRelationships);
}

/**
 * add_observationUnit - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunitposition.prototype.add_observationUnit = async function(input, benignErrorReporter, token) {
    const associated = await models.observationunit.readById(input.addObservationUnit, benignErrorReporter, token);
    if (associated.observationUnitPosition_ID) {
        const removed = await observationunitposition.remove_observationUnit_ID(associated.observationUnitPosition_ID, input.addObservationUnit, benignErrorReporter, token);
        benignErrorReporter.push({
            message: `Hint: update ${removed} existing association!`,
        });
    }
    await observationunitposition.add_observationUnit_ID(this.getIdValue(), input.addObservationUnit, benignErrorReporter, token);
    this.observationUnit_ID = input.addObservationUnit;
}

/**
 * add_geoCoordinates - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunitposition.prototype.add_geoCoordinates = async function(input, benignErrorReporter, token) {
    await observationunitposition.add_geoCoordinates_ID(this.getIdValue(), input.addGeoCoordinates, benignErrorReporter, token);
    this.geoCoordinates_ID = input.addGeoCoordinates;
}

/**
 * remove_observationLevel - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunitposition.prototype.remove_observationLevel = async function(input, benignErrorReporter, token) {

    await observationunitposition.remove_observationLevel_IDs(this.getIdValue(), input.removeObservationLevel, benignErrorReporter, token);
    this.observationLevel_IDs = helper.differenceIds(this.observationLevel_IDs, input.removeObservationLevel);
}

/**
 * remove_observationLevelRelationships - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunitposition.prototype.remove_observationLevelRelationships = async function(input, benignErrorReporter, token) {

    await observationunitposition.remove_observationLevelRelationships_IDs(this.getIdValue(), input.removeObservationLevelRelationships, benignErrorReporter, token);
    this.observationLevelRelationships_IDs = helper.differenceIds(this.observationLevelRelationships_IDs, input.removeObservationLevelRelationships);
}

/**
 * remove_observationUnit - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunitposition.prototype.remove_observationUnit = async function(input, benignErrorReporter, token) {
    if (input.removeObservationUnit == this.observationUnit_ID) {
        await observationunitposition.remove_observationUnit_ID(this.getIdValue(), input.removeObservationUnit, benignErrorReporter, token);
        this.observationUnit_ID = null;
    }
}

/**
 * remove_geoCoordinates - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunitposition.prototype.remove_geoCoordinates = async function(input, benignErrorReporter, token) {
    if (input.removeGeoCoordinates == this.geoCoordinates_ID) {
        await observationunitposition.remove_geoCoordinates_ID(this.getIdValue(), input.removeGeoCoordinates, benignErrorReporter, token);
        this.geoCoordinates_ID = null;
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

    let observationunitposition = await resolvers.readOneObservationunitposition({
        observationUnitPositionDbId: id
    }, context);
    //check that record actually exists
    if (observationunitposition === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(observationunitposition.observationLevel_IDs) ? observationunitposition.observationLevel_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(observationunitposition.observationLevelRelationships_IDs) ? observationunitposition.observationLevelRelationships_IDs.length : 0;

    get_to_one_associated_fk += [null, undefined].includes(observationunitposition.observationUnit_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(observationunitposition.geoCoordinates_ID) ? 0 : 1;


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
        throw new Error(`observationunitposition with observationUnitPositionDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const observationunitposition_record = await resolvers.readOneObservationunitposition({
            observationUnitPositionDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * observationunitpositions - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    observationunitpositions: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'observationunitposition', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "observationunitpositions");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await observationunitposition.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * observationunitpositionsConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    observationunitpositionsConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'observationunitposition', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "observationunitpositionsConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await observationunitposition.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneObservationunitposition - Check user authorization and return one record with the specified observationUnitPositionDbId in the observationUnitPositionDbId argument.
     *
     * @param  {number} {observationUnitPositionDbId}    observationUnitPositionDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with observationUnitPositionDbId requested
     */
    readOneObservationunitposition: async function({
        observationUnitPositionDbId
    }, context) {
        if (await checkAuthorization(context, 'observationunitposition', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneObservationunitposition");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await observationunitposition.readById(observationUnitPositionDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countObservationunitpositions - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countObservationunitpositions: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'observationunitposition', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await observationunitposition.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateObservationunitpositionForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateObservationunitpositionForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'observationunitposition', 'read');
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
                    observationunitposition,
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
     * validateObservationunitpositionForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateObservationunitpositionForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'observationunitposition', 'read');
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
                    observationunitposition,
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
     * validateObservationunitpositionForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {observationUnitPositionDbId} observationUnitPositionDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateObservationunitpositionForDeletion: async ({
        observationUnitPositionDbId
    }, context) => {
        if ((await checkAuthorization(context, 'observationunitposition', 'read')) === true) {
            try {
                await validForDeletion(observationUnitPositionDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    observationunitposition,
                    observationUnitPositionDbId);
                return true;
            } catch (error) {
                error.input = {
                    observationUnitPositionDbId: observationUnitPositionDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateObservationunitpositionAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {observationUnitPositionDbId} observationUnitPositionDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateObservationunitpositionAfterReading: async ({
        observationUnitPositionDbId
    }, context) => {
        if ((await checkAuthorization(context, 'observationunitposition', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    observationunitposition,
                    observationUnitPositionDbId);
                return true;
            } catch (error) {
                error.input = {
                    observationUnitPositionDbId: observationUnitPositionDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addObservationunitposition - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addObservationunitposition: async function(input, context) {
        let authorization = await checkAuthorization(context, 'observationunitposition', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.observationunitposition.definition);
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
            let createdObservationunitposition = await observationunitposition.addOne(inputSanitized, context.benignErrors, token);
            await createdObservationunitposition.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdObservationunitposition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteObservationunitposition - Check user authorization and delete a record with the specified observationUnitPositionDbId in the observationUnitPositionDbId argument.
     *
     * @param  {number} {observationUnitPositionDbId}    observationUnitPositionDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteObservationunitposition: async function({
        observationUnitPositionDbId
    }, context) {
        if (await checkAuthorization(context, 'observationunitposition', 'delete') === true) {
            if (await validForDeletion(observationUnitPositionDbId, context)) {
                await updateAssociations(observationUnitPositionDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return observationunitposition.deleteOne(observationUnitPositionDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateObservationunitposition - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateObservationunitposition: async function(input, context) {
        let authorization = await checkAuthorization(context, 'observationunitposition', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.observationunitposition.definition);
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
            let updatedObservationunitposition = await observationunitposition.updateOne(inputSanitized, context.benignErrors, token);
            await updatedObservationunitposition.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedObservationunitposition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateObservationunitposition - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateObservationunitposition: async function(_, context) {
        if (await checkAuthorization(context, 'observationunitposition', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return observationunitposition.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * observationunitpositionsZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    observationunitpositionsZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "observationunitposition", "read")) === true) {
            return observationunitposition.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}