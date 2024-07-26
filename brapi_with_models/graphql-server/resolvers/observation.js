/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const observation = require(path.join(__dirname, '..', 'models', 'index.js')).observation;
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
    'addGermplasm': 'germplasm',
    'addObservationUnit': 'observationunit',
    'addObservationVariable': 'observationvariable',
    'addStudy': 'study',
    'addGeoCoordinates': 'coordinate',
    'addSeason': 'season',
    'addImages': 'image',
    'addAdditionalInfo': 'additionalinfo',
    'addExternalReferences': 'externalreference'
}



/**
 * observation.prototype.germplasm - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
observation.prototype.germplasm = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.germplasm_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneGermplasm({
                [models.germplasm.idAttribute()]: this.germplasm_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.germplasm.idAttribute(),
                "value": this.germplasm_ID,
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
                        `Not unique "to_one" association Error: Found > 1 germplasms matching observation with observationDbId ${this.germplasm_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the observation model. Returning first germplasm.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * observation.prototype.observationUnit - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
observation.prototype.observationUnit = async function({
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
                        `Not unique "to_one" association Error: Found > 1 observationunits matching observation with observationDbId ${this.observationUnit_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the observation model. Returning first observationunit.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * observation.prototype.observationVariable - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
observation.prototype.observationVariable = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.observationVariable_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneObservationvariable({
                [models.observationvariable.idAttribute()]: this.observationVariable_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.observationvariable.idAttribute(),
                "value": this.observationVariable_ID,
                "operator": "eq"
            });
            let found = (await resolvers.observationvariablesConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 observationvariables matching observation with observationDbId ${this.observationVariable_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the observation model. Returning first observationvariable.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * observation.prototype.study - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
observation.prototype.study = async function({
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
                        `Not unique "to_one" association Error: Found > 1 studies matching observation with observationDbId ${this.study_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the observation model. Returning first study.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * observation.prototype.geoCoordinates - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
observation.prototype.geoCoordinates = async function({
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
                        `Not unique "to_one" association Error: Found > 1 coordinates matching observation with observationDbId ${this.geoCoordinates_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the observation model. Returning first coordinate.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * observation.prototype.season - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
observation.prototype.season = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.season_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneSeason({
                [models.season.idAttribute()]: this.season_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.season.idAttribute(),
                "value": this.season_ID,
                "operator": "eq"
            });
            let found = (await resolvers.seasonsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 seasons matching observation with observationDbId ${this.season_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the observation model. Returning first season.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}

/**
 * observation.prototype.imagesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
observation.prototype.imagesFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.images_IDs) || this.images_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.image.idAttribute(),
        "value": this.images_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.images({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * observation.prototype.countFilteredImages - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
observation.prototype.countFilteredImages = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.images_IDs) || this.images_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.image.idAttribute(),
        "value": this.images_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countImages({
        search: nsearch
    }, context);
}

/**
 * observation.prototype.imagesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
observation.prototype.imagesConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.images_IDs) || this.images_IDs.length === 0) {
        return {
            edges: [],
            images: [],
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
        "field": models.image.idAttribute(),
        "value": this.images_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.imagesConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * observation.prototype.additionalInfoFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
observation.prototype.additionalInfoFilter = function({
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
 * observation.prototype.countFilteredAdditionalInfo - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
observation.prototype.countFilteredAdditionalInfo = function({
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
 * observation.prototype.additionalInfoConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
observation.prototype.additionalInfoConnection = function({
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
 * observation.prototype.externalReferencesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
observation.prototype.externalReferencesFilter = function({
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
 * observation.prototype.countFilteredExternalReferences - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
observation.prototype.countFilteredExternalReferences = function({
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
 * observation.prototype.externalReferencesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
observation.prototype.externalReferencesConnection = function({
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
observation.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addImages)) {
        promises_add.push(this.add_images(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addAdditionalInfo)) {
        promises_add.push(this.add_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addExternalReferences)) {
        promises_add.push(this.add_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addGermplasm)) {
        promises_add.push(this.add_germplasm(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addObservationUnit)) {
        promises_add.push(this.add_observationUnit(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addObservationVariable)) {
        promises_add.push(this.add_observationVariable(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addStudy)) {
        promises_add.push(this.add_study(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addGeoCoordinates)) {
        promises_add.push(this.add_geoCoordinates(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addSeason)) {
        promises_add.push(this.add_season(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removeImages)) {
        promises_remove.push(this.remove_images(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeAdditionalInfo)) {
        promises_remove.push(this.remove_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeExternalReferences)) {
        promises_remove.push(this.remove_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeGermplasm)) {
        promises_remove.push(this.remove_germplasm(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeObservationUnit)) {
        promises_remove.push(this.remove_observationUnit(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeObservationVariable)) {
        promises_remove.push(this.remove_observationVariable(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeStudy)) {
        promises_remove.push(this.remove_study(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeGeoCoordinates)) {
        promises_remove.push(this.remove_geoCoordinates(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeSeason)) {
        promises_remove.push(this.remove_season(input, benignErrorReporter, token));
    }

    await Promise.all(promises_remove);

}
/**
 * add_images - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observation.prototype.add_images = async function(input, benignErrorReporter, token) {

    await observation.add_images_IDs(this.getIdValue(), input.addImages, benignErrorReporter, token);
    this.images_IDs = helper.unionIds(this.images_IDs, input.addImages);
}

/**
 * add_additionalInfo - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observation.prototype.add_additionalInfo = async function(input, benignErrorReporter, token) {

    await observation.add_additionalInfo_IDs(this.getIdValue(), input.addAdditionalInfo, benignErrorReporter, token);
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
observation.prototype.add_externalReferences = async function(input, benignErrorReporter, token) {

    await observation.add_externalReferences_IDs(this.getIdValue(), input.addExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.unionIds(this.externalReferences_IDs, input.addExternalReferences);
}

/**
 * add_germplasm - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observation.prototype.add_germplasm = async function(input, benignErrorReporter, token) {
    await observation.add_germplasm_ID(this.getIdValue(), input.addGermplasm, benignErrorReporter, token);
    this.germplasm_ID = input.addGermplasm;
}

/**
 * add_observationUnit - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observation.prototype.add_observationUnit = async function(input, benignErrorReporter, token) {
    await observation.add_observationUnit_ID(this.getIdValue(), input.addObservationUnit, benignErrorReporter, token);
    this.observationUnit_ID = input.addObservationUnit;
}

/**
 * add_observationVariable - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observation.prototype.add_observationVariable = async function(input, benignErrorReporter, token) {
    await observation.add_observationVariable_ID(this.getIdValue(), input.addObservationVariable, benignErrorReporter, token);
    this.observationVariable_ID = input.addObservationVariable;
}

/**
 * add_study - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observation.prototype.add_study = async function(input, benignErrorReporter, token) {
    await observation.add_study_ID(this.getIdValue(), input.addStudy, benignErrorReporter, token);
    this.study_ID = input.addStudy;
}

/**
 * add_geoCoordinates - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observation.prototype.add_geoCoordinates = async function(input, benignErrorReporter, token) {
    await observation.add_geoCoordinates_ID(this.getIdValue(), input.addGeoCoordinates, benignErrorReporter, token);
    this.geoCoordinates_ID = input.addGeoCoordinates;
}

/**
 * add_season - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observation.prototype.add_season = async function(input, benignErrorReporter, token) {
    await observation.add_season_ID(this.getIdValue(), input.addSeason, benignErrorReporter, token);
    this.season_ID = input.addSeason;
}

/**
 * remove_images - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observation.prototype.remove_images = async function(input, benignErrorReporter, token) {

    await observation.remove_images_IDs(this.getIdValue(), input.removeImages, benignErrorReporter, token);
    this.images_IDs = helper.differenceIds(this.images_IDs, input.removeImages);
}

/**
 * remove_additionalInfo - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observation.prototype.remove_additionalInfo = async function(input, benignErrorReporter, token) {

    await observation.remove_additionalInfo_IDs(this.getIdValue(), input.removeAdditionalInfo, benignErrorReporter, token);
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
observation.prototype.remove_externalReferences = async function(input, benignErrorReporter, token) {

    await observation.remove_externalReferences_IDs(this.getIdValue(), input.removeExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.differenceIds(this.externalReferences_IDs, input.removeExternalReferences);
}

/**
 * remove_germplasm - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observation.prototype.remove_germplasm = async function(input, benignErrorReporter, token) {
    if (input.removeGermplasm == this.germplasm_ID) {
        await observation.remove_germplasm_ID(this.getIdValue(), input.removeGermplasm, benignErrorReporter, token);
        this.germplasm_ID = null;
    }
}

/**
 * remove_observationUnit - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observation.prototype.remove_observationUnit = async function(input, benignErrorReporter, token) {
    if (input.removeObservationUnit == this.observationUnit_ID) {
        await observation.remove_observationUnit_ID(this.getIdValue(), input.removeObservationUnit, benignErrorReporter, token);
        this.observationUnit_ID = null;
    }
}

/**
 * remove_observationVariable - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observation.prototype.remove_observationVariable = async function(input, benignErrorReporter, token) {
    if (input.removeObservationVariable == this.observationVariable_ID) {
        await observation.remove_observationVariable_ID(this.getIdValue(), input.removeObservationVariable, benignErrorReporter, token);
        this.observationVariable_ID = null;
    }
}

/**
 * remove_study - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observation.prototype.remove_study = async function(input, benignErrorReporter, token) {
    if (input.removeStudy == this.study_ID) {
        await observation.remove_study_ID(this.getIdValue(), input.removeStudy, benignErrorReporter, token);
        this.study_ID = null;
    }
}

/**
 * remove_geoCoordinates - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observation.prototype.remove_geoCoordinates = async function(input, benignErrorReporter, token) {
    if (input.removeGeoCoordinates == this.geoCoordinates_ID) {
        await observation.remove_geoCoordinates_ID(this.getIdValue(), input.removeGeoCoordinates, benignErrorReporter, token);
        this.geoCoordinates_ID = null;
    }
}

/**
 * remove_season - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observation.prototype.remove_season = async function(input, benignErrorReporter, token) {
    if (input.removeSeason == this.season_ID) {
        await observation.remove_season_ID(this.getIdValue(), input.removeSeason, benignErrorReporter, token);
        this.season_ID = null;
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

    let observation = await resolvers.readOneObservation({
        observationDbId: id
    }, context);
    //check that record actually exists
    if (observation === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(observation.images_IDs) ? observation.images_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(observation.additionalInfo_IDs) ? observation.additionalInfo_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(observation.externalReferences_IDs) ? observation.externalReferences_IDs.length : 0;

    get_to_one_associated_fk += [null, undefined].includes(observation.germplasm_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(observation.observationUnit_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(observation.observationVariable_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(observation.study_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(observation.geoCoordinates_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(observation.season_ID) ? 0 : 1;


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
        throw new Error(`observation with observationDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const observation_record = await resolvers.readOneObservation({
            observationDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * observations - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    observations: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'observation', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "observations");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await observation.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * observationsConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    observationsConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'observation', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "observationsConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await observation.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneObservation - Check user authorization and return one record with the specified observationDbId in the observationDbId argument.
     *
     * @param  {number} {observationDbId}    observationDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with observationDbId requested
     */
    readOneObservation: async function({
        observationDbId
    }, context) {
        if (await checkAuthorization(context, 'observation', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneObservation");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await observation.readById(observationDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countObservations - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countObservations: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'observation', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await observation.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateObservationForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateObservationForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'observation', 'read');
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
                    observation,
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
     * validateObservationForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateObservationForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'observation', 'read');
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
                    observation,
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
     * validateObservationForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {observationDbId} observationDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateObservationForDeletion: async ({
        observationDbId
    }, context) => {
        if ((await checkAuthorization(context, 'observation', 'read')) === true) {
            try {
                await validForDeletion(observationDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    observation,
                    observationDbId);
                return true;
            } catch (error) {
                error.input = {
                    observationDbId: observationDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateObservationAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {observationDbId} observationDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateObservationAfterReading: async ({
        observationDbId
    }, context) => {
        if ((await checkAuthorization(context, 'observation', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    observation,
                    observationDbId);
                return true;
            } catch (error) {
                error.input = {
                    observationDbId: observationDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addObservation - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addObservation: async function(input, context) {
        let authorization = await checkAuthorization(context, 'observation', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.observation.definition);
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
            let createdObservation = await observation.addOne(inputSanitized, context.benignErrors, token);
            await createdObservation.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdObservation;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteObservation - Check user authorization and delete a record with the specified observationDbId in the observationDbId argument.
     *
     * @param  {number} {observationDbId}    observationDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteObservation: async function({
        observationDbId
    }, context) {
        if (await checkAuthorization(context, 'observation', 'delete') === true) {
            if (await validForDeletion(observationDbId, context)) {
                await updateAssociations(observationDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return observation.deleteOne(observationDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateObservation - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateObservation: async function(input, context) {
        let authorization = await checkAuthorization(context, 'observation', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.observation.definition);
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
            let updatedObservation = await observation.updateOne(inputSanitized, context.benignErrors, token);
            await updatedObservation.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedObservation;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateObservation - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateObservation: async function(_, context) {
        if (await checkAuthorization(context, 'observation', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return observation.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * observationsZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    observationsZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "observation", "read")) === true) {
            return observation.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}