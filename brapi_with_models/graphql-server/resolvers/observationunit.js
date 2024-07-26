/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const observationunit = require(path.join(__dirname, '..', 'models', 'index.js')).observationunit;
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
    'addCross': 'cross',
    'addGermplasm': 'germplasm',
    'addLocation': 'location',
    'addProgram': 'program',
    'addSeedLot': 'seedlot',
    'addStudy': 'study',
    'addTrial': 'trial',
    'addObservationUnitPosition': 'observationunitposition',
    'addSamples': 'sample',
    'addEvents': 'event',
    'addImages': 'image',
    'addObservations': 'observation',
    'addAdditionalInfo': 'additionalinfo',
    'addExternalReferences': 'externalreference',
    'addTreatments': 'treatment'
}



/**
 * observationunit.prototype.cross - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
observationunit.prototype.cross = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.cross_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneCross({
                [models.cross.idAttribute()]: this.cross_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.cross.idAttribute(),
                "value": this.cross_ID,
                "operator": "eq"
            });
            let found = (await resolvers.crossesConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 crosses matching observationunit with observationUnitDbId ${this.cross_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the observationunit model. Returning first cross.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * observationunit.prototype.germplasm - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
observationunit.prototype.germplasm = async function({
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
                        `Not unique "to_one" association Error: Found > 1 germplasms matching observationunit with observationUnitDbId ${this.germplasm_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the observationunit model. Returning first germplasm.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * observationunit.prototype.location - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
observationunit.prototype.location = async function({
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
                        `Not unique "to_one" association Error: Found > 1 locations matching observationunit with observationUnitDbId ${this.location_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the observationunit model. Returning first location.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * observationunit.prototype.program - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
observationunit.prototype.program = async function({
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
                        `Not unique "to_one" association Error: Found > 1 programs matching observationunit with observationUnitDbId ${this.program_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the observationunit model. Returning first program.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * observationunit.prototype.seedLot - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
observationunit.prototype.seedLot = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.seedLot_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneSeedlot({
                [models.seedlot.idAttribute()]: this.seedLot_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.seedlot.idAttribute(),
                "value": this.seedLot_ID,
                "operator": "eq"
            });
            let found = (await resolvers.seedlotsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 seedlots matching observationunit with observationUnitDbId ${this.seedLot_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the observationunit model. Returning first seedlot.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * observationunit.prototype.study - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
observationunit.prototype.study = async function({
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
                        `Not unique "to_one" association Error: Found > 1 studies matching observationunit with observationUnitDbId ${this.study_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the observationunit model. Returning first study.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * observationunit.prototype.trial - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
observationunit.prototype.trial = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.trial_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneTrial({
                [models.trial.idAttribute()]: this.trial_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.trial.idAttribute(),
                "value": this.trial_ID,
                "operator": "eq"
            });
            let found = (await resolvers.trialsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 trials matching observationunit with observationUnitDbId ${this.trial_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the observationunit model. Returning first trial.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * observationunit.prototype.observationUnitPosition - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
observationunit.prototype.observationUnitPosition = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.observationUnitPosition_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneObservationunitposition({
                [models.observationunitposition.idAttribute()]: this.observationUnitPosition_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.observationunitposition.idAttribute(),
                "value": this.observationUnitPosition_ID,
                "operator": "eq"
            });
            let found = (await resolvers.observationunitpositionsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 observationunitpositions matching observationunit with observationUnitDbId ${this.observationUnitPosition_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the observationunit model. Returning first observationunitposition.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}

/**
 * observationunit.prototype.samplesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
observationunit.prototype.samplesFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.samples_IDs) || this.samples_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.sample.idAttribute(),
        "value": this.samples_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.samples({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * observationunit.prototype.countFilteredSamples - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
observationunit.prototype.countFilteredSamples = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.samples_IDs) || this.samples_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.sample.idAttribute(),
        "value": this.samples_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countSamples({
        search: nsearch
    }, context);
}

/**
 * observationunit.prototype.samplesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
observationunit.prototype.samplesConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.samples_IDs) || this.samples_IDs.length === 0) {
        return {
            edges: [],
            samples: [],
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
        "field": models.sample.idAttribute(),
        "value": this.samples_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.samplesConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * observationunit.prototype.eventsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
observationunit.prototype.eventsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.events_IDs) || this.events_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.event.idAttribute(),
        "value": this.events_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.events({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * observationunit.prototype.countFilteredEvents - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
observationunit.prototype.countFilteredEvents = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.events_IDs) || this.events_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.event.idAttribute(),
        "value": this.events_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countEvents({
        search: nsearch
    }, context);
}

/**
 * observationunit.prototype.eventsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
observationunit.prototype.eventsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.events_IDs) || this.events_IDs.length === 0) {
        return {
            edges: [],
            events: [],
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
        "field": models.event.idAttribute(),
        "value": this.events_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.eventsConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * observationunit.prototype.imagesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
observationunit.prototype.imagesFilter = function({
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
 * observationunit.prototype.countFilteredImages - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
observationunit.prototype.countFilteredImages = function({
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
 * observationunit.prototype.imagesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
observationunit.prototype.imagesConnection = function({
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
 * observationunit.prototype.observationsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
observationunit.prototype.observationsFilter = function({
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
 * observationunit.prototype.countFilteredObservations - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
observationunit.prototype.countFilteredObservations = function({
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
 * observationunit.prototype.observationsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
observationunit.prototype.observationsConnection = function({
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
 * observationunit.prototype.additionalInfoFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
observationunit.prototype.additionalInfoFilter = function({
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
 * observationunit.prototype.countFilteredAdditionalInfo - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
observationunit.prototype.countFilteredAdditionalInfo = function({
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
 * observationunit.prototype.additionalInfoConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
observationunit.prototype.additionalInfoConnection = function({
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
 * observationunit.prototype.externalReferencesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
observationunit.prototype.externalReferencesFilter = function({
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
 * observationunit.prototype.countFilteredExternalReferences - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
observationunit.prototype.countFilteredExternalReferences = function({
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
 * observationunit.prototype.externalReferencesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
observationunit.prototype.externalReferencesConnection = function({
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
 * observationunit.prototype.treatmentsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
observationunit.prototype.treatmentsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.treatments_IDs) || this.treatments_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.treatment.idAttribute(),
        "value": this.treatments_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.treatments({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * observationunit.prototype.countFilteredTreatments - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
observationunit.prototype.countFilteredTreatments = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.treatments_IDs) || this.treatments_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.treatment.idAttribute(),
        "value": this.treatments_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countTreatments({
        search: nsearch
    }, context);
}

/**
 * observationunit.prototype.treatmentsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
observationunit.prototype.treatmentsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.treatments_IDs) || this.treatments_IDs.length === 0) {
        return {
            edges: [],
            treatments: [],
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
        "field": models.treatment.idAttribute(),
        "value": this.treatments_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.treatmentsConnection({
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
observationunit.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addSamples)) {
        promises_add.push(this.add_samples(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addEvents)) {
        promises_add.push(this.add_events(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addImages)) {
        promises_add.push(this.add_images(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addObservations)) {
        promises_add.push(this.add_observations(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addAdditionalInfo)) {
        promises_add.push(this.add_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addExternalReferences)) {
        promises_add.push(this.add_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addTreatments)) {
        promises_add.push(this.add_treatments(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addCross)) {
        promises_add.push(this.add_cross(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addGermplasm)) {
        promises_add.push(this.add_germplasm(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addLocation)) {
        promises_add.push(this.add_location(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addProgram)) {
        promises_add.push(this.add_program(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addSeedLot)) {
        promises_add.push(this.add_seedLot(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addStudy)) {
        promises_add.push(this.add_study(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addTrial)) {
        promises_add.push(this.add_trial(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addObservationUnitPosition)) {
        promises_add.push(this.add_observationUnitPosition(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removeSamples)) {
        promises_remove.push(this.remove_samples(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeEvents)) {
        promises_remove.push(this.remove_events(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeImages)) {
        promises_remove.push(this.remove_images(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeObservations)) {
        promises_remove.push(this.remove_observations(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeAdditionalInfo)) {
        promises_remove.push(this.remove_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeExternalReferences)) {
        promises_remove.push(this.remove_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeTreatments)) {
        promises_remove.push(this.remove_treatments(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeCross)) {
        promises_remove.push(this.remove_cross(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeGermplasm)) {
        promises_remove.push(this.remove_germplasm(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeLocation)) {
        promises_remove.push(this.remove_location(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeProgram)) {
        promises_remove.push(this.remove_program(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeSeedLot)) {
        promises_remove.push(this.remove_seedLot(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeStudy)) {
        promises_remove.push(this.remove_study(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeTrial)) {
        promises_remove.push(this.remove_trial(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeObservationUnitPosition)) {
        promises_remove.push(this.remove_observationUnitPosition(input, benignErrorReporter, token));
    }

    await Promise.all(promises_remove);

}
/**
 * add_samples - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.add_samples = async function(input, benignErrorReporter, token) {

    await observationunit.add_samples_IDs(this.getIdValue(), input.addSamples, benignErrorReporter, token);
    this.samples_IDs = helper.unionIds(this.samples_IDs, input.addSamples);
}

/**
 * add_events - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.add_events = async function(input, benignErrorReporter, token) {

    await observationunit.add_events_IDs(this.getIdValue(), input.addEvents, benignErrorReporter, token);
    this.events_IDs = helper.unionIds(this.events_IDs, input.addEvents);
}

/**
 * add_images - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.add_images = async function(input, benignErrorReporter, token) {

    await observationunit.add_images_IDs(this.getIdValue(), input.addImages, benignErrorReporter, token);
    this.images_IDs = helper.unionIds(this.images_IDs, input.addImages);
}

/**
 * add_observations - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.add_observations = async function(input, benignErrorReporter, token) {

    await observationunit.add_observations_IDs(this.getIdValue(), input.addObservations, benignErrorReporter, token);
    this.observations_IDs = helper.unionIds(this.observations_IDs, input.addObservations);
}

/**
 * add_additionalInfo - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.add_additionalInfo = async function(input, benignErrorReporter, token) {

    await observationunit.add_additionalInfo_IDs(this.getIdValue(), input.addAdditionalInfo, benignErrorReporter, token);
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
observationunit.prototype.add_externalReferences = async function(input, benignErrorReporter, token) {

    await observationunit.add_externalReferences_IDs(this.getIdValue(), input.addExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.unionIds(this.externalReferences_IDs, input.addExternalReferences);
}

/**
 * add_treatments - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.add_treatments = async function(input, benignErrorReporter, token) {

    await observationunit.add_treatments_IDs(this.getIdValue(), input.addTreatments, benignErrorReporter, token);
    this.treatments_IDs = helper.unionIds(this.treatments_IDs, input.addTreatments);
}

/**
 * add_cross - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.add_cross = async function(input, benignErrorReporter, token) {
    await observationunit.add_cross_ID(this.getIdValue(), input.addCross, benignErrorReporter, token);
    this.cross_ID = input.addCross;
}

/**
 * add_germplasm - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.add_germplasm = async function(input, benignErrorReporter, token) {
    await observationunit.add_germplasm_ID(this.getIdValue(), input.addGermplasm, benignErrorReporter, token);
    this.germplasm_ID = input.addGermplasm;
}

/**
 * add_location - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.add_location = async function(input, benignErrorReporter, token) {
    await observationunit.add_location_ID(this.getIdValue(), input.addLocation, benignErrorReporter, token);
    this.location_ID = input.addLocation;
}

/**
 * add_program - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.add_program = async function(input, benignErrorReporter, token) {
    await observationunit.add_program_ID(this.getIdValue(), input.addProgram, benignErrorReporter, token);
    this.program_ID = input.addProgram;
}

/**
 * add_seedLot - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.add_seedLot = async function(input, benignErrorReporter, token) {
    await observationunit.add_seedLot_ID(this.getIdValue(), input.addSeedLot, benignErrorReporter, token);
    this.seedLot_ID = input.addSeedLot;
}

/**
 * add_study - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.add_study = async function(input, benignErrorReporter, token) {
    await observationunit.add_study_ID(this.getIdValue(), input.addStudy, benignErrorReporter, token);
    this.study_ID = input.addStudy;
}

/**
 * add_trial - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.add_trial = async function(input, benignErrorReporter, token) {
    await observationunit.add_trial_ID(this.getIdValue(), input.addTrial, benignErrorReporter, token);
    this.trial_ID = input.addTrial;
}

/**
 * add_observationUnitPosition - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.add_observationUnitPosition = async function(input, benignErrorReporter, token) {
    const associated = await models.observationunitposition.readById(input.addObservationUnitPosition, benignErrorReporter, token);
    if (associated.observationUnit_ID) {
        const removed = await observationunit.remove_observationUnitPosition_ID(associated.observationUnit_ID, input.addObservationUnitPosition, benignErrorReporter, token);
        benignErrorReporter.push({
            message: `Hint: update ${removed} existing association!`,
        });
    }
    await observationunit.add_observationUnitPosition_ID(this.getIdValue(), input.addObservationUnitPosition, benignErrorReporter, token);
    this.observationUnitPosition_ID = input.addObservationUnitPosition;
}

/**
 * remove_samples - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.remove_samples = async function(input, benignErrorReporter, token) {

    await observationunit.remove_samples_IDs(this.getIdValue(), input.removeSamples, benignErrorReporter, token);
    this.samples_IDs = helper.differenceIds(this.samples_IDs, input.removeSamples);
}

/**
 * remove_events - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.remove_events = async function(input, benignErrorReporter, token) {

    await observationunit.remove_events_IDs(this.getIdValue(), input.removeEvents, benignErrorReporter, token);
    this.events_IDs = helper.differenceIds(this.events_IDs, input.removeEvents);
}

/**
 * remove_images - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.remove_images = async function(input, benignErrorReporter, token) {

    await observationunit.remove_images_IDs(this.getIdValue(), input.removeImages, benignErrorReporter, token);
    this.images_IDs = helper.differenceIds(this.images_IDs, input.removeImages);
}

/**
 * remove_observations - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.remove_observations = async function(input, benignErrorReporter, token) {

    await observationunit.remove_observations_IDs(this.getIdValue(), input.removeObservations, benignErrorReporter, token);
    this.observations_IDs = helper.differenceIds(this.observations_IDs, input.removeObservations);
}

/**
 * remove_additionalInfo - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.remove_additionalInfo = async function(input, benignErrorReporter, token) {

    await observationunit.remove_additionalInfo_IDs(this.getIdValue(), input.removeAdditionalInfo, benignErrorReporter, token);
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
observationunit.prototype.remove_externalReferences = async function(input, benignErrorReporter, token) {

    await observationunit.remove_externalReferences_IDs(this.getIdValue(), input.removeExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.differenceIds(this.externalReferences_IDs, input.removeExternalReferences);
}

/**
 * remove_treatments - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.remove_treatments = async function(input, benignErrorReporter, token) {

    await observationunit.remove_treatments_IDs(this.getIdValue(), input.removeTreatments, benignErrorReporter, token);
    this.treatments_IDs = helper.differenceIds(this.treatments_IDs, input.removeTreatments);
}

/**
 * remove_cross - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.remove_cross = async function(input, benignErrorReporter, token) {
    if (input.removeCross == this.cross_ID) {
        await observationunit.remove_cross_ID(this.getIdValue(), input.removeCross, benignErrorReporter, token);
        this.cross_ID = null;
    }
}

/**
 * remove_germplasm - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.remove_germplasm = async function(input, benignErrorReporter, token) {
    if (input.removeGermplasm == this.germplasm_ID) {
        await observationunit.remove_germplasm_ID(this.getIdValue(), input.removeGermplasm, benignErrorReporter, token);
        this.germplasm_ID = null;
    }
}

/**
 * remove_location - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.remove_location = async function(input, benignErrorReporter, token) {
    if (input.removeLocation == this.location_ID) {
        await observationunit.remove_location_ID(this.getIdValue(), input.removeLocation, benignErrorReporter, token);
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
observationunit.prototype.remove_program = async function(input, benignErrorReporter, token) {
    if (input.removeProgram == this.program_ID) {
        await observationunit.remove_program_ID(this.getIdValue(), input.removeProgram, benignErrorReporter, token);
        this.program_ID = null;
    }
}

/**
 * remove_seedLot - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.remove_seedLot = async function(input, benignErrorReporter, token) {
    if (input.removeSeedLot == this.seedLot_ID) {
        await observationunit.remove_seedLot_ID(this.getIdValue(), input.removeSeedLot, benignErrorReporter, token);
        this.seedLot_ID = null;
    }
}

/**
 * remove_study - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.remove_study = async function(input, benignErrorReporter, token) {
    if (input.removeStudy == this.study_ID) {
        await observationunit.remove_study_ID(this.getIdValue(), input.removeStudy, benignErrorReporter, token);
        this.study_ID = null;
    }
}

/**
 * remove_trial - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.remove_trial = async function(input, benignErrorReporter, token) {
    if (input.removeTrial == this.trial_ID) {
        await observationunit.remove_trial_ID(this.getIdValue(), input.removeTrial, benignErrorReporter, token);
        this.trial_ID = null;
    }
}

/**
 * remove_observationUnitPosition - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
observationunit.prototype.remove_observationUnitPosition = async function(input, benignErrorReporter, token) {
    if (input.removeObservationUnitPosition == this.observationUnitPosition_ID) {
        await observationunit.remove_observationUnitPosition_ID(this.getIdValue(), input.removeObservationUnitPosition, benignErrorReporter, token);
        this.observationUnitPosition_ID = null;
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

    let observationunit = await resolvers.readOneObservationunit({
        observationUnitDbId: id
    }, context);
    //check that record actually exists
    if (observationunit === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(observationunit.samples_IDs) ? observationunit.samples_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(observationunit.events_IDs) ? observationunit.events_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(observationunit.images_IDs) ? observationunit.images_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(observationunit.observations_IDs) ? observationunit.observations_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(observationunit.additionalInfo_IDs) ? observationunit.additionalInfo_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(observationunit.externalReferences_IDs) ? observationunit.externalReferences_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(observationunit.treatments_IDs) ? observationunit.treatments_IDs.length : 0;

    get_to_one_associated_fk += [null, undefined].includes(observationunit.cross_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(observationunit.germplasm_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(observationunit.location_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(observationunit.program_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(observationunit.seedLot_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(observationunit.study_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(observationunit.trial_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(observationunit.observationUnitPosition_ID) ? 0 : 1;


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
        throw new Error(`observationunit with observationUnitDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const observationunit_record = await resolvers.readOneObservationunit({
            observationUnitDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * observationunits - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    observationunits: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'observationunit', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "observationunits");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await observationunit.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * observationunitsConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    observationunitsConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'observationunit', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "observationunitsConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await observationunit.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneObservationunit - Check user authorization and return one record with the specified observationUnitDbId in the observationUnitDbId argument.
     *
     * @param  {number} {observationUnitDbId}    observationUnitDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with observationUnitDbId requested
     */
    readOneObservationunit: async function({
        observationUnitDbId
    }, context) {
        if (await checkAuthorization(context, 'observationunit', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneObservationunit");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await observationunit.readById(observationUnitDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countObservationunits - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countObservationunits: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'observationunit', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await observationunit.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateObservationunitForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateObservationunitForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'observationunit', 'read');
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
                    observationunit,
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
     * validateObservationunitForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateObservationunitForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'observationunit', 'read');
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
                    observationunit,
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
     * validateObservationunitForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {observationUnitDbId} observationUnitDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateObservationunitForDeletion: async ({
        observationUnitDbId
    }, context) => {
        if ((await checkAuthorization(context, 'observationunit', 'read')) === true) {
            try {
                await validForDeletion(observationUnitDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    observationunit,
                    observationUnitDbId);
                return true;
            } catch (error) {
                error.input = {
                    observationUnitDbId: observationUnitDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateObservationunitAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {observationUnitDbId} observationUnitDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateObservationunitAfterReading: async ({
        observationUnitDbId
    }, context) => {
        if ((await checkAuthorization(context, 'observationunit', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    observationunit,
                    observationUnitDbId);
                return true;
            } catch (error) {
                error.input = {
                    observationUnitDbId: observationUnitDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addObservationunit - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addObservationunit: async function(input, context) {
        let authorization = await checkAuthorization(context, 'observationunit', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.observationunit.definition);
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
            let createdObservationunit = await observationunit.addOne(inputSanitized, context.benignErrors, token);
            await createdObservationunit.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdObservationunit;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteObservationunit - Check user authorization and delete a record with the specified observationUnitDbId in the observationUnitDbId argument.
     *
     * @param  {number} {observationUnitDbId}    observationUnitDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteObservationunit: async function({
        observationUnitDbId
    }, context) {
        if (await checkAuthorization(context, 'observationunit', 'delete') === true) {
            if (await validForDeletion(observationUnitDbId, context)) {
                await updateAssociations(observationUnitDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return observationunit.deleteOne(observationUnitDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateObservationunit - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateObservationunit: async function(input, context) {
        let authorization = await checkAuthorization(context, 'observationunit', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.observationunit.definition);
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
            let updatedObservationunit = await observationunit.updateOne(inputSanitized, context.benignErrors, token);
            await updatedObservationunit.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedObservationunit;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateObservationunit - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateObservationunit: async function(_, context) {
        if (await checkAuthorization(context, 'observationunit', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return observationunit.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * observationunitsZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    observationunitsZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "observationunit", "read")) === true) {
            return observationunit.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}