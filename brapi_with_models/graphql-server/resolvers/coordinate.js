/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const coordinate = require(path.join(__dirname, '..', 'models', 'index.js')).coordinate;
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
    'addGermplasmOrigin': 'germplasmorigin',
    'addObservations': 'observation',
    'addObservationUnitPosition': 'observationunitposition'
}



/**
 * coordinate.prototype.location - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
coordinate.prototype.location = async function({
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
                        `Not unique "to_one" association Error: Found > 1 locations matching coordinate with coordinateDbId ${this.location_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the coordinate model. Returning first location.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}

/**
 * coordinate.prototype.germplasmOriginFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
coordinate.prototype.germplasmOriginFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.germplasmOrigin_IDs) || this.germplasmOrigin_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.germplasmorigin.idAttribute(),
        "value": this.germplasmOrigin_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.germplasmorigins({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * coordinate.prototype.countFilteredGermplasmOrigin - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
coordinate.prototype.countFilteredGermplasmOrigin = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.germplasmOrigin_IDs) || this.germplasmOrigin_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.germplasmorigin.idAttribute(),
        "value": this.germplasmOrigin_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countGermplasmorigins({
        search: nsearch
    }, context);
}

/**
 * coordinate.prototype.germplasmOriginConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
coordinate.prototype.germplasmOriginConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.germplasmOrigin_IDs) || this.germplasmOrigin_IDs.length === 0) {
        return {
            edges: [],
            germplasmorigins: [],
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
        "field": models.germplasmorigin.idAttribute(),
        "value": this.germplasmOrigin_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.germplasmoriginsConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * coordinate.prototype.observationsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
coordinate.prototype.observationsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.observations_IDs) || this.observations_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.observation.idAttribute(),
        "value": this.observations_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.observations({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * coordinate.prototype.countFilteredObservations - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
coordinate.prototype.countFilteredObservations = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.observations_IDs) || this.observations_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.observation.idAttribute(),
        "value": this.observations_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countObservations({
        search: nsearch
    }, context);
}

/**
 * coordinate.prototype.observationsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
coordinate.prototype.observationsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.observations_IDs) || this.observations_IDs.length === 0) {
        return {
            edges: [],
            observations: [],
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
        "field": models.observation.idAttribute(),
        "value": this.observations_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.observationsConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * coordinate.prototype.observationUnitPositionFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
coordinate.prototype.observationUnitPositionFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.observationUnitPosition_IDs) || this.observationUnitPosition_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.observationunitposition.idAttribute(),
        "value": this.observationUnitPosition_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.observationunitpositions({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * coordinate.prototype.countFilteredObservationUnitPosition - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
coordinate.prototype.countFilteredObservationUnitPosition = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.observationUnitPosition_IDs) || this.observationUnitPosition_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.observationunitposition.idAttribute(),
        "value": this.observationUnitPosition_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countObservationunitpositions({
        search: nsearch
    }, context);
}

/**
 * coordinate.prototype.observationUnitPositionConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
coordinate.prototype.observationUnitPositionConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.observationUnitPosition_IDs) || this.observationUnitPosition_IDs.length === 0) {
        return {
            edges: [],
            observationunitpositions: [],
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
        "field": models.observationunitposition.idAttribute(),
        "value": this.observationUnitPosition_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.observationunitpositionsConnection({
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
coordinate.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addGermplasmOrigin)) {
        promises_add.push(this.add_germplasmOrigin(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addObservations)) {
        promises_add.push(this.add_observations(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addObservationUnitPosition)) {
        promises_add.push(this.add_observationUnitPosition(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addLocation)) {
        promises_add.push(this.add_location(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removeGermplasmOrigin)) {
        promises_remove.push(this.remove_germplasmOrigin(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeObservations)) {
        promises_remove.push(this.remove_observations(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeObservationUnitPosition)) {
        promises_remove.push(this.remove_observationUnitPosition(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeLocation)) {
        promises_remove.push(this.remove_location(input, benignErrorReporter, token));
    }

    await Promise.all(promises_remove);

}
/**
 * add_germplasmOrigin - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
coordinate.prototype.add_germplasmOrigin = async function(input, benignErrorReporter, token) {

    await coordinate.add_germplasmOrigin_IDs(this.getIdValue(), input.addGermplasmOrigin, benignErrorReporter, token);
    this.germplasmOrigin_IDs = helper.unionIds(this.germplasmOrigin_IDs, input.addGermplasmOrigin);
}

/**
 * add_observations - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
coordinate.prototype.add_observations = async function(input, benignErrorReporter, token) {

    await coordinate.add_observations_IDs(this.getIdValue(), input.addObservations, benignErrorReporter, token);
    this.observations_IDs = helper.unionIds(this.observations_IDs, input.addObservations);
}

/**
 * add_observationUnitPosition - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
coordinate.prototype.add_observationUnitPosition = async function(input, benignErrorReporter, token) {

    await coordinate.add_observationUnitPosition_IDs(this.getIdValue(), input.addObservationUnitPosition, benignErrorReporter, token);
    this.observationUnitPosition_IDs = helper.unionIds(this.observationUnitPosition_IDs, input.addObservationUnitPosition);
}

/**
 * add_location - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
coordinate.prototype.add_location = async function(input, benignErrorReporter, token) {
    const associated = await models.location.readById(input.addLocation, benignErrorReporter, token);
    if (associated.coordinates_ID) {
        const removed = await coordinate.remove_location_ID(associated.coordinates_ID, input.addLocation, benignErrorReporter, token);
        benignErrorReporter.push({
            message: `Hint: update ${removed} existing association!`,
        });
    }
    await coordinate.add_location_ID(this.getIdValue(), input.addLocation, benignErrorReporter, token);
    this.location_ID = input.addLocation;
}

/**
 * remove_germplasmOrigin - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
coordinate.prototype.remove_germplasmOrigin = async function(input, benignErrorReporter, token) {

    await coordinate.remove_germplasmOrigin_IDs(this.getIdValue(), input.removeGermplasmOrigin, benignErrorReporter, token);
    this.germplasmOrigin_IDs = helper.differenceIds(this.germplasmOrigin_IDs, input.removeGermplasmOrigin);
}

/**
 * remove_observations - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
coordinate.prototype.remove_observations = async function(input, benignErrorReporter, token) {

    await coordinate.remove_observations_IDs(this.getIdValue(), input.removeObservations, benignErrorReporter, token);
    this.observations_IDs = helper.differenceIds(this.observations_IDs, input.removeObservations);
}

/**
 * remove_observationUnitPosition - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
coordinate.prototype.remove_observationUnitPosition = async function(input, benignErrorReporter, token) {

    await coordinate.remove_observationUnitPosition_IDs(this.getIdValue(), input.removeObservationUnitPosition, benignErrorReporter, token);
    this.observationUnitPosition_IDs = helper.differenceIds(this.observationUnitPosition_IDs, input.removeObservationUnitPosition);
}

/**
 * remove_location - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
coordinate.prototype.remove_location = async function(input, benignErrorReporter, token) {
    if (input.removeLocation == this.location_ID) {
        await coordinate.remove_location_ID(this.getIdValue(), input.removeLocation, benignErrorReporter, token);
        this.location_ID = null;
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

    let coordinate = await resolvers.readOneCoordinate({
        coordinateDbId: id
    }, context);
    //check that record actually exists
    if (coordinate === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(coordinate.germplasmOrigin_IDs) ? coordinate.germplasmOrigin_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(coordinate.observations_IDs) ? coordinate.observations_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(coordinate.observationUnitPosition_IDs) ? coordinate.observationUnitPosition_IDs.length : 0;

    get_to_one_associated_fk += [null, undefined].includes(coordinate.location_ID) ? 0 : 1;


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
        throw new Error(`coordinate with coordinateDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const coordinate_record = await resolvers.readOneCoordinate({
            coordinateDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * coordinates - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    coordinates: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'coordinate', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "coordinates");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await coordinate.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * coordinatesConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    coordinatesConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'coordinate', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "coordinatesConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await coordinate.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneCoordinate - Check user authorization and return one record with the specified coordinateDbId in the coordinateDbId argument.
     *
     * @param  {number} {coordinateDbId}    coordinateDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with coordinateDbId requested
     */
    readOneCoordinate: async function({
        coordinateDbId
    }, context) {
        if (await checkAuthorization(context, 'coordinate', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneCoordinate");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await coordinate.readById(coordinateDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countCoordinates - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countCoordinates: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'coordinate', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await coordinate.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateCoordinateForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateCoordinateForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'coordinate', 'read');
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
                    coordinate,
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
     * validateCoordinateForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateCoordinateForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'coordinate', 'read');
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
                    coordinate,
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
     * validateCoordinateForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {coordinateDbId} coordinateDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateCoordinateForDeletion: async ({
        coordinateDbId
    }, context) => {
        if ((await checkAuthorization(context, 'coordinate', 'read')) === true) {
            try {
                await validForDeletion(coordinateDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    coordinate,
                    coordinateDbId);
                return true;
            } catch (error) {
                error.input = {
                    coordinateDbId: coordinateDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateCoordinateAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {coordinateDbId} coordinateDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateCoordinateAfterReading: async ({
        coordinateDbId
    }, context) => {
        if ((await checkAuthorization(context, 'coordinate', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    coordinate,
                    coordinateDbId);
                return true;
            } catch (error) {
                error.input = {
                    coordinateDbId: coordinateDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addCoordinate - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addCoordinate: async function(input, context) {
        let authorization = await checkAuthorization(context, 'coordinate', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.coordinate.definition);
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
            let createdCoordinate = await coordinate.addOne(inputSanitized, context.benignErrors, token);
            await createdCoordinate.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdCoordinate;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteCoordinate - Check user authorization and delete a record with the specified coordinateDbId in the coordinateDbId argument.
     *
     * @param  {number} {coordinateDbId}    coordinateDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteCoordinate: async function({
        coordinateDbId
    }, context) {
        if (await checkAuthorization(context, 'coordinate', 'delete') === true) {
            if (await validForDeletion(coordinateDbId, context)) {
                await updateAssociations(coordinateDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return coordinate.deleteOne(coordinateDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateCoordinate - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateCoordinate: async function(input, context) {
        let authorization = await checkAuthorization(context, 'coordinate', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.coordinate.definition);
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
            let updatedCoordinate = await coordinate.updateOne(inputSanitized, context.benignErrors, token);
            await updatedCoordinate.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedCoordinate;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateCoordinate - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateCoordinate: async function(_, context) {
        if (await checkAuthorization(context, 'coordinate', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return coordinate.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * coordinatesZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    coordinatesZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "coordinate", "read")) === true) {
            return coordinate.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}