/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const study = require(path.join(__dirname, '..', 'models', 'index.js')).study;
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
    'addExperimentalDesign': 'experimentaldesign',
    'addGrowthFacility': 'growthfacility',
    'addLastUpdate': 'lastupdate',
    'addLocation': 'location',
    'addTrial': 'trial',
    'addAdditionalInfo': 'additionalinfo',
    'addContacts': 'contact',
    'addDataLinks': 'datalink',
    'addEnvironmentParameters': 'environmentparameter',
    'addExternalReferences': 'externalreference',
    'addObservationLevels': 'observationlevel',
    'addObservationVariables': 'observationvariable',
    'addCallSets': 'callset',
    'addPlates': 'plate',
    'addSamples': 'sample',
    'addVariantSets': 'variantset',
    'addEvents': 'event',
    'addObservations': 'observation',
    'addObservationUnits': 'observationunit'
}



/**
 * study.prototype.experimentalDesign - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
study.prototype.experimentalDesign = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.experimentalDesign_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneExperimentaldesign({
                [models.experimentaldesign.idAttribute()]: this.experimentalDesign_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.experimentaldesign.idAttribute(),
                "value": this.experimentalDesign_ID,
                "operator": "eq"
            });
            let found = (await resolvers.experimentaldesignsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 experimentaldesigns matching study with studyDbId ${this.experimentalDesign_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the study model. Returning first experimentaldesign.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * study.prototype.growthFacility - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
study.prototype.growthFacility = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.growthFacility_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneGrowthfacility({
                [models.growthfacility.idAttribute()]: this.growthFacility_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.growthfacility.idAttribute(),
                "value": this.growthFacility_ID,
                "operator": "eq"
            });
            let found = (await resolvers.growthfacilitiesConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 growthfacilities matching study with studyDbId ${this.growthFacility_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the study model. Returning first growthfacility.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * study.prototype.lastUpdate - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
study.prototype.lastUpdate = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.lastUpdate_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneLastupdate({
                [models.lastupdate.idAttribute()]: this.lastUpdate_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.lastupdate.idAttribute(),
                "value": this.lastUpdate_ID,
                "operator": "eq"
            });
            let found = (await resolvers.lastupdatesConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 lastupdates matching study with studyDbId ${this.lastUpdate_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the study model. Returning first lastupdate.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * study.prototype.location - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
study.prototype.location = async function({
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
                        `Not unique "to_one" association Error: Found > 1 locations matching study with studyDbId ${this.location_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the study model. Returning first location.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * study.prototype.trial - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
study.prototype.trial = async function({
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
                        `Not unique "to_one" association Error: Found > 1 trials matching study with studyDbId ${this.trial_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the study model. Returning first trial.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}

/**
 * study.prototype.additionalInfoFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
study.prototype.additionalInfoFilter = function({
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
 * study.prototype.countFilteredAdditionalInfo - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
study.prototype.countFilteredAdditionalInfo = function({
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
 * study.prototype.additionalInfoConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
study.prototype.additionalInfoConnection = function({
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
 * study.prototype.contactsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
study.prototype.contactsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.contacts_IDs) || this.contacts_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.contact.idAttribute(),
        "value": this.contacts_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.contacts({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * study.prototype.countFilteredContacts - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
study.prototype.countFilteredContacts = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.contacts_IDs) || this.contacts_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.contact.idAttribute(),
        "value": this.contacts_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countContacts({
        search: nsearch
    }, context);
}

/**
 * study.prototype.contactsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
study.prototype.contactsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.contacts_IDs) || this.contacts_IDs.length === 0) {
        return {
            edges: [],
            contacts: [],
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
        "field": models.contact.idAttribute(),
        "value": this.contacts_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.contactsConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * study.prototype.dataLinksFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
study.prototype.dataLinksFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.dataLinks_IDs) || this.dataLinks_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.datalink.idAttribute(),
        "value": this.dataLinks_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.datalinks({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * study.prototype.countFilteredDataLinks - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
study.prototype.countFilteredDataLinks = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.dataLinks_IDs) || this.dataLinks_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.datalink.idAttribute(),
        "value": this.dataLinks_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countDatalinks({
        search: nsearch
    }, context);
}

/**
 * study.prototype.dataLinksConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
study.prototype.dataLinksConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.dataLinks_IDs) || this.dataLinks_IDs.length === 0) {
        return {
            edges: [],
            datalinks: [],
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
        "field": models.datalink.idAttribute(),
        "value": this.dataLinks_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.datalinksConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * study.prototype.environmentParametersFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
study.prototype.environmentParametersFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.environmentParameters_IDs) || this.environmentParameters_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.environmentparameter.idAttribute(),
        "value": this.environmentParameters_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.environmentparameters({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * study.prototype.countFilteredEnvironmentParameters - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
study.prototype.countFilteredEnvironmentParameters = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.environmentParameters_IDs) || this.environmentParameters_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.environmentparameter.idAttribute(),
        "value": this.environmentParameters_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countEnvironmentparameters({
        search: nsearch
    }, context);
}

/**
 * study.prototype.environmentParametersConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
study.prototype.environmentParametersConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.environmentParameters_IDs) || this.environmentParameters_IDs.length === 0) {
        return {
            edges: [],
            environmentparameters: [],
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
        "field": models.environmentparameter.idAttribute(),
        "value": this.environmentParameters_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.environmentparametersConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * study.prototype.externalReferencesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
study.prototype.externalReferencesFilter = function({
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
 * study.prototype.countFilteredExternalReferences - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
study.prototype.countFilteredExternalReferences = function({
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
 * study.prototype.externalReferencesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
study.prototype.externalReferencesConnection = function({
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
 * study.prototype.observationLevelsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
study.prototype.observationLevelsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.observationLevels_IDs) || this.observationLevels_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.observationlevel.idAttribute(),
        "value": this.observationLevels_IDs.join(','),
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
 * study.prototype.countFilteredObservationLevels - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
study.prototype.countFilteredObservationLevels = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.observationLevels_IDs) || this.observationLevels_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.observationlevel.idAttribute(),
        "value": this.observationLevels_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countObservationlevels({
        search: nsearch
    }, context);
}

/**
 * study.prototype.observationLevelsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
study.prototype.observationLevelsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.observationLevels_IDs) || this.observationLevels_IDs.length === 0) {
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
        "value": this.observationLevels_IDs.join(','),
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
 * study.prototype.observationVariablesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
study.prototype.observationVariablesFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.observationVariables_IDs) || this.observationVariables_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.observationvariable.idAttribute(),
        "value": this.observationVariables_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.observationvariables({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * study.prototype.countFilteredObservationVariables - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
study.prototype.countFilteredObservationVariables = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.observationVariables_IDs) || this.observationVariables_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.observationvariable.idAttribute(),
        "value": this.observationVariables_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countObservationvariables({
        search: nsearch
    }, context);
}

/**
 * study.prototype.observationVariablesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
study.prototype.observationVariablesConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.observationVariables_IDs) || this.observationVariables_IDs.length === 0) {
        return {
            edges: [],
            observationvariables: [],
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
        "field": models.observationvariable.idAttribute(),
        "value": this.observationVariables_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.observationvariablesConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * study.prototype.callSetsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
study.prototype.callSetsFilter = function({
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
 * study.prototype.countFilteredCallSets - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
study.prototype.countFilteredCallSets = function({
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
 * study.prototype.callSetsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
study.prototype.callSetsConnection = function({
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
 * study.prototype.platesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
study.prototype.platesFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.plates_IDs) || this.plates_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.plate.idAttribute(),
        "value": this.plates_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.plates({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * study.prototype.countFilteredPlates - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
study.prototype.countFilteredPlates = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.plates_IDs) || this.plates_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.plate.idAttribute(),
        "value": this.plates_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countPlates({
        search: nsearch
    }, context);
}

/**
 * study.prototype.platesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
study.prototype.platesConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.plates_IDs) || this.plates_IDs.length === 0) {
        return {
            edges: [],
            plates: [],
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
        "field": models.plate.idAttribute(),
        "value": this.plates_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.platesConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * study.prototype.samplesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
study.prototype.samplesFilter = function({
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
 * study.prototype.countFilteredSamples - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
study.prototype.countFilteredSamples = function({
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
 * study.prototype.samplesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
study.prototype.samplesConnection = function({
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
 * study.prototype.variantSetsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
study.prototype.variantSetsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.variantSets_IDs) || this.variantSets_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.variantset.idAttribute(),
        "value": this.variantSets_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.variantsets({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * study.prototype.countFilteredVariantSets - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
study.prototype.countFilteredVariantSets = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.variantSets_IDs) || this.variantSets_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.variantset.idAttribute(),
        "value": this.variantSets_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countVariantsets({
        search: nsearch
    }, context);
}

/**
 * study.prototype.variantSetsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
study.prototype.variantSetsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.variantSets_IDs) || this.variantSets_IDs.length === 0) {
        return {
            edges: [],
            variantsets: [],
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
        "field": models.variantset.idAttribute(),
        "value": this.variantSets_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.variantsetsConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * study.prototype.eventsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
study.prototype.eventsFilter = function({
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
 * study.prototype.countFilteredEvents - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
study.prototype.countFilteredEvents = function({
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
 * study.prototype.eventsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
study.prototype.eventsConnection = function({
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
 * study.prototype.observationsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
study.prototype.observationsFilter = function({
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
 * study.prototype.countFilteredObservations - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
study.prototype.countFilteredObservations = function({
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
 * study.prototype.observationsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
study.prototype.observationsConnection = function({
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
 * study.prototype.observationUnitsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
study.prototype.observationUnitsFilter = function({
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
 * study.prototype.countFilteredObservationUnits - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
study.prototype.countFilteredObservationUnits = function({
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
 * study.prototype.observationUnitsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
study.prototype.observationUnitsConnection = function({
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
 * handleAssociations - handles the given associations in the create and update case.
 *
 * @param {object} input   Info of each field to create the new record
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addAdditionalInfo)) {
        promises_add.push(this.add_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addContacts)) {
        promises_add.push(this.add_contacts(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addDataLinks)) {
        promises_add.push(this.add_dataLinks(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addEnvironmentParameters)) {
        promises_add.push(this.add_environmentParameters(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addExternalReferences)) {
        promises_add.push(this.add_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addObservationLevels)) {
        promises_add.push(this.add_observationLevels(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addObservationVariables)) {
        promises_add.push(this.add_observationVariables(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addCallSets)) {
        promises_add.push(this.add_callSets(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addPlates)) {
        promises_add.push(this.add_plates(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addSamples)) {
        promises_add.push(this.add_samples(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addVariantSets)) {
        promises_add.push(this.add_variantSets(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addEvents)) {
        promises_add.push(this.add_events(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addObservations)) {
        promises_add.push(this.add_observations(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addObservationUnits)) {
        promises_add.push(this.add_observationUnits(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addExperimentalDesign)) {
        promises_add.push(this.add_experimentalDesign(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addGrowthFacility)) {
        promises_add.push(this.add_growthFacility(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addLastUpdate)) {
        promises_add.push(this.add_lastUpdate(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addLocation)) {
        promises_add.push(this.add_location(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addTrial)) {
        promises_add.push(this.add_trial(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removeAdditionalInfo)) {
        promises_remove.push(this.remove_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeContacts)) {
        promises_remove.push(this.remove_contacts(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeDataLinks)) {
        promises_remove.push(this.remove_dataLinks(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeEnvironmentParameters)) {
        promises_remove.push(this.remove_environmentParameters(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeExternalReferences)) {
        promises_remove.push(this.remove_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeObservationLevels)) {
        promises_remove.push(this.remove_observationLevels(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeObservationVariables)) {
        promises_remove.push(this.remove_observationVariables(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeCallSets)) {
        promises_remove.push(this.remove_callSets(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removePlates)) {
        promises_remove.push(this.remove_plates(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeSamples)) {
        promises_remove.push(this.remove_samples(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeVariantSets)) {
        promises_remove.push(this.remove_variantSets(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeEvents)) {
        promises_remove.push(this.remove_events(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeObservations)) {
        promises_remove.push(this.remove_observations(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeObservationUnits)) {
        promises_remove.push(this.remove_observationUnits(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeExperimentalDesign)) {
        promises_remove.push(this.remove_experimentalDesign(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeGrowthFacility)) {
        promises_remove.push(this.remove_growthFacility(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeLastUpdate)) {
        promises_remove.push(this.remove_lastUpdate(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeLocation)) {
        promises_remove.push(this.remove_location(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeTrial)) {
        promises_remove.push(this.remove_trial(input, benignErrorReporter, token));
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
study.prototype.add_additionalInfo = async function(input, benignErrorReporter, token) {

    await study.add_additionalInfo_IDs(this.getIdValue(), input.addAdditionalInfo, benignErrorReporter, token);
    this.additionalInfo_IDs = helper.unionIds(this.additionalInfo_IDs, input.addAdditionalInfo);
}

/**
 * add_contacts - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.add_contacts = async function(input, benignErrorReporter, token) {

    await study.add_contacts_IDs(this.getIdValue(), input.addContacts, benignErrorReporter, token);
    this.contacts_IDs = helper.unionIds(this.contacts_IDs, input.addContacts);
}

/**
 * add_dataLinks - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.add_dataLinks = async function(input, benignErrorReporter, token) {

    await study.add_dataLinks_IDs(this.getIdValue(), input.addDataLinks, benignErrorReporter, token);
    this.dataLinks_IDs = helper.unionIds(this.dataLinks_IDs, input.addDataLinks);
}

/**
 * add_environmentParameters - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.add_environmentParameters = async function(input, benignErrorReporter, token) {

    await study.add_environmentParameters_IDs(this.getIdValue(), input.addEnvironmentParameters, benignErrorReporter, token);
    this.environmentParameters_IDs = helper.unionIds(this.environmentParameters_IDs, input.addEnvironmentParameters);
}

/**
 * add_externalReferences - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.add_externalReferences = async function(input, benignErrorReporter, token) {

    await study.add_externalReferences_IDs(this.getIdValue(), input.addExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.unionIds(this.externalReferences_IDs, input.addExternalReferences);
}

/**
 * add_observationLevels - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.add_observationLevels = async function(input, benignErrorReporter, token) {

    await study.add_observationLevels_IDs(this.getIdValue(), input.addObservationLevels, benignErrorReporter, token);
    this.observationLevels_IDs = helper.unionIds(this.observationLevels_IDs, input.addObservationLevels);
}

/**
 * add_observationVariables - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.add_observationVariables = async function(input, benignErrorReporter, token) {

    await study.add_observationVariables_IDs(this.getIdValue(), input.addObservationVariables, benignErrorReporter, token);
    this.observationVariables_IDs = helper.unionIds(this.observationVariables_IDs, input.addObservationVariables);
}

/**
 * add_callSets - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.add_callSets = async function(input, benignErrorReporter, token) {

    await study.add_callSets_IDs(this.getIdValue(), input.addCallSets, benignErrorReporter, token);
    this.callSets_IDs = helper.unionIds(this.callSets_IDs, input.addCallSets);
}

/**
 * add_plates - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.add_plates = async function(input, benignErrorReporter, token) {

    await study.add_plates_IDs(this.getIdValue(), input.addPlates, benignErrorReporter, token);
    this.plates_IDs = helper.unionIds(this.plates_IDs, input.addPlates);
}

/**
 * add_samples - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.add_samples = async function(input, benignErrorReporter, token) {

    await study.add_samples_IDs(this.getIdValue(), input.addSamples, benignErrorReporter, token);
    this.samples_IDs = helper.unionIds(this.samples_IDs, input.addSamples);
}

/**
 * add_variantSets - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.add_variantSets = async function(input, benignErrorReporter, token) {

    await study.add_variantSets_IDs(this.getIdValue(), input.addVariantSets, benignErrorReporter, token);
    this.variantSets_IDs = helper.unionIds(this.variantSets_IDs, input.addVariantSets);
}

/**
 * add_events - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.add_events = async function(input, benignErrorReporter, token) {

    await study.add_events_IDs(this.getIdValue(), input.addEvents, benignErrorReporter, token);
    this.events_IDs = helper.unionIds(this.events_IDs, input.addEvents);
}

/**
 * add_observations - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.add_observations = async function(input, benignErrorReporter, token) {

    await study.add_observations_IDs(this.getIdValue(), input.addObservations, benignErrorReporter, token);
    this.observations_IDs = helper.unionIds(this.observations_IDs, input.addObservations);
}

/**
 * add_observationUnits - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.add_observationUnits = async function(input, benignErrorReporter, token) {

    await study.add_observationUnits_IDs(this.getIdValue(), input.addObservationUnits, benignErrorReporter, token);
    this.observationUnits_IDs = helper.unionIds(this.observationUnits_IDs, input.addObservationUnits);
}

/**
 * add_experimentalDesign - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.add_experimentalDesign = async function(input, benignErrorReporter, token) {
    const associated = await models.experimentaldesign.readById(input.addExperimentalDesign, benignErrorReporter, token);
    if (associated.study_ID) {
        const removed = await study.remove_experimentalDesign_ID(associated.study_ID, input.addExperimentalDesign, benignErrorReporter, token);
        benignErrorReporter.push({
            message: `Hint: update ${removed} existing association!`,
        });
    }
    await study.add_experimentalDesign_ID(this.getIdValue(), input.addExperimentalDesign, benignErrorReporter, token);
    this.experimentalDesign_ID = input.addExperimentalDesign;
}

/**
 * add_growthFacility - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.add_growthFacility = async function(input, benignErrorReporter, token) {
    const associated = await models.growthfacility.readById(input.addGrowthFacility, benignErrorReporter, token);
    if (associated.study_ID) {
        const removed = await study.remove_growthFacility_ID(associated.study_ID, input.addGrowthFacility, benignErrorReporter, token);
        benignErrorReporter.push({
            message: `Hint: update ${removed} existing association!`,
        });
    }
    await study.add_growthFacility_ID(this.getIdValue(), input.addGrowthFacility, benignErrorReporter, token);
    this.growthFacility_ID = input.addGrowthFacility;
}

/**
 * add_lastUpdate - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.add_lastUpdate = async function(input, benignErrorReporter, token) {
    const associated = await models.lastupdate.readById(input.addLastUpdate, benignErrorReporter, token);
    if (associated.study_ID) {
        const removed = await study.remove_lastUpdate_ID(associated.study_ID, input.addLastUpdate, benignErrorReporter, token);
        benignErrorReporter.push({
            message: `Hint: update ${removed} existing association!`,
        });
    }
    await study.add_lastUpdate_ID(this.getIdValue(), input.addLastUpdate, benignErrorReporter, token);
    this.lastUpdate_ID = input.addLastUpdate;
}

/**
 * add_location - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.add_location = async function(input, benignErrorReporter, token) {
    await study.add_location_ID(this.getIdValue(), input.addLocation, benignErrorReporter, token);
    this.location_ID = input.addLocation;
}

/**
 * add_trial - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.add_trial = async function(input, benignErrorReporter, token) {
    await study.add_trial_ID(this.getIdValue(), input.addTrial, benignErrorReporter, token);
    this.trial_ID = input.addTrial;
}

/**
 * remove_additionalInfo - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.remove_additionalInfo = async function(input, benignErrorReporter, token) {

    await study.remove_additionalInfo_IDs(this.getIdValue(), input.removeAdditionalInfo, benignErrorReporter, token);
    this.additionalInfo_IDs = helper.differenceIds(this.additionalInfo_IDs, input.removeAdditionalInfo);
}

/**
 * remove_contacts - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.remove_contacts = async function(input, benignErrorReporter, token) {

    await study.remove_contacts_IDs(this.getIdValue(), input.removeContacts, benignErrorReporter, token);
    this.contacts_IDs = helper.differenceIds(this.contacts_IDs, input.removeContacts);
}

/**
 * remove_dataLinks - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.remove_dataLinks = async function(input, benignErrorReporter, token) {

    await study.remove_dataLinks_IDs(this.getIdValue(), input.removeDataLinks, benignErrorReporter, token);
    this.dataLinks_IDs = helper.differenceIds(this.dataLinks_IDs, input.removeDataLinks);
}

/**
 * remove_environmentParameters - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.remove_environmentParameters = async function(input, benignErrorReporter, token) {

    await study.remove_environmentParameters_IDs(this.getIdValue(), input.removeEnvironmentParameters, benignErrorReporter, token);
    this.environmentParameters_IDs = helper.differenceIds(this.environmentParameters_IDs, input.removeEnvironmentParameters);
}

/**
 * remove_externalReferences - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.remove_externalReferences = async function(input, benignErrorReporter, token) {

    await study.remove_externalReferences_IDs(this.getIdValue(), input.removeExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.differenceIds(this.externalReferences_IDs, input.removeExternalReferences);
}

/**
 * remove_observationLevels - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.remove_observationLevels = async function(input, benignErrorReporter, token) {

    await study.remove_observationLevels_IDs(this.getIdValue(), input.removeObservationLevels, benignErrorReporter, token);
    this.observationLevels_IDs = helper.differenceIds(this.observationLevels_IDs, input.removeObservationLevels);
}

/**
 * remove_observationVariables - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.remove_observationVariables = async function(input, benignErrorReporter, token) {

    await study.remove_observationVariables_IDs(this.getIdValue(), input.removeObservationVariables, benignErrorReporter, token);
    this.observationVariables_IDs = helper.differenceIds(this.observationVariables_IDs, input.removeObservationVariables);
}

/**
 * remove_callSets - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.remove_callSets = async function(input, benignErrorReporter, token) {

    await study.remove_callSets_IDs(this.getIdValue(), input.removeCallSets, benignErrorReporter, token);
    this.callSets_IDs = helper.differenceIds(this.callSets_IDs, input.removeCallSets);
}

/**
 * remove_plates - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.remove_plates = async function(input, benignErrorReporter, token) {

    await study.remove_plates_IDs(this.getIdValue(), input.removePlates, benignErrorReporter, token);
    this.plates_IDs = helper.differenceIds(this.plates_IDs, input.removePlates);
}

/**
 * remove_samples - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.remove_samples = async function(input, benignErrorReporter, token) {

    await study.remove_samples_IDs(this.getIdValue(), input.removeSamples, benignErrorReporter, token);
    this.samples_IDs = helper.differenceIds(this.samples_IDs, input.removeSamples);
}

/**
 * remove_variantSets - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.remove_variantSets = async function(input, benignErrorReporter, token) {

    await study.remove_variantSets_IDs(this.getIdValue(), input.removeVariantSets, benignErrorReporter, token);
    this.variantSets_IDs = helper.differenceIds(this.variantSets_IDs, input.removeVariantSets);
}

/**
 * remove_events - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.remove_events = async function(input, benignErrorReporter, token) {

    await study.remove_events_IDs(this.getIdValue(), input.removeEvents, benignErrorReporter, token);
    this.events_IDs = helper.differenceIds(this.events_IDs, input.removeEvents);
}

/**
 * remove_observations - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.remove_observations = async function(input, benignErrorReporter, token) {

    await study.remove_observations_IDs(this.getIdValue(), input.removeObservations, benignErrorReporter, token);
    this.observations_IDs = helper.differenceIds(this.observations_IDs, input.removeObservations);
}

/**
 * remove_observationUnits - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.remove_observationUnits = async function(input, benignErrorReporter, token) {

    await study.remove_observationUnits_IDs(this.getIdValue(), input.removeObservationUnits, benignErrorReporter, token);
    this.observationUnits_IDs = helper.differenceIds(this.observationUnits_IDs, input.removeObservationUnits);
}

/**
 * remove_experimentalDesign - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.remove_experimentalDesign = async function(input, benignErrorReporter, token) {
    if (input.removeExperimentalDesign == this.experimentalDesign_ID) {
        await study.remove_experimentalDesign_ID(this.getIdValue(), input.removeExperimentalDesign, benignErrorReporter, token);
        this.experimentalDesign_ID = null;
    }
}

/**
 * remove_growthFacility - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.remove_growthFacility = async function(input, benignErrorReporter, token) {
    if (input.removeGrowthFacility == this.growthFacility_ID) {
        await study.remove_growthFacility_ID(this.getIdValue(), input.removeGrowthFacility, benignErrorReporter, token);
        this.growthFacility_ID = null;
    }
}

/**
 * remove_lastUpdate - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.remove_lastUpdate = async function(input, benignErrorReporter, token) {
    if (input.removeLastUpdate == this.lastUpdate_ID) {
        await study.remove_lastUpdate_ID(this.getIdValue(), input.removeLastUpdate, benignErrorReporter, token);
        this.lastUpdate_ID = null;
    }
}

/**
 * remove_location - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.remove_location = async function(input, benignErrorReporter, token) {
    if (input.removeLocation == this.location_ID) {
        await study.remove_location_ID(this.getIdValue(), input.removeLocation, benignErrorReporter, token);
        this.location_ID = null;
    }
}

/**
 * remove_trial - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
study.prototype.remove_trial = async function(input, benignErrorReporter, token) {
    if (input.removeTrial == this.trial_ID) {
        await study.remove_trial_ID(this.getIdValue(), input.removeTrial, benignErrorReporter, token);
        this.trial_ID = null;
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

    let study = await resolvers.readOneStudy({
        studyDbId: id
    }, context);
    //check that record actually exists
    if (study === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(study.additionalInfo_IDs) ? study.additionalInfo_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(study.contacts_IDs) ? study.contacts_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(study.dataLinks_IDs) ? study.dataLinks_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(study.environmentParameters_IDs) ? study.environmentParameters_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(study.externalReferences_IDs) ? study.externalReferences_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(study.observationLevels_IDs) ? study.observationLevels_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(study.observationVariables_IDs) ? study.observationVariables_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(study.callSets_IDs) ? study.callSets_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(study.plates_IDs) ? study.plates_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(study.samples_IDs) ? study.samples_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(study.variantSets_IDs) ? study.variantSets_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(study.events_IDs) ? study.events_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(study.observations_IDs) ? study.observations_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(study.observationUnits_IDs) ? study.observationUnits_IDs.length : 0;

    get_to_one_associated_fk += [null, undefined].includes(study.experimentalDesign_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(study.growthFacility_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(study.lastUpdate_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(study.location_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(study.trial_ID) ? 0 : 1;


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
        throw new Error(`study with studyDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const study_record = await resolvers.readOneStudy({
            studyDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * studies - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    studies: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'study', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "studies");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await study.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * studiesConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    studiesConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'study', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "studiesConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await study.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneStudy - Check user authorization and return one record with the specified studyDbId in the studyDbId argument.
     *
     * @param  {number} {studyDbId}    studyDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with studyDbId requested
     */
    readOneStudy: async function({
        studyDbId
    }, context) {
        if (await checkAuthorization(context, 'study', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneStudy");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await study.readById(studyDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countStudies - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countStudies: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'study', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await study.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateStudyForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateStudyForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'study', 'read');
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
                    study,
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
     * validateStudyForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateStudyForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'study', 'read');
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
                    study,
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
     * validateStudyForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {studyDbId} studyDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateStudyForDeletion: async ({
        studyDbId
    }, context) => {
        if ((await checkAuthorization(context, 'study', 'read')) === true) {
            try {
                await validForDeletion(studyDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    study,
                    studyDbId);
                return true;
            } catch (error) {
                error.input = {
                    studyDbId: studyDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateStudyAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {studyDbId} studyDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateStudyAfterReading: async ({
        studyDbId
    }, context) => {
        if ((await checkAuthorization(context, 'study', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    study,
                    studyDbId);
                return true;
            } catch (error) {
                error.input = {
                    studyDbId: studyDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addStudy - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addStudy: async function(input, context) {
        let authorization = await checkAuthorization(context, 'study', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.study.definition);
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
            let createdStudy = await study.addOne(inputSanitized, context.benignErrors, token);
            await createdStudy.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdStudy;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteStudy - Check user authorization and delete a record with the specified studyDbId in the studyDbId argument.
     *
     * @param  {number} {studyDbId}    studyDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteStudy: async function({
        studyDbId
    }, context) {
        if (await checkAuthorization(context, 'study', 'delete') === true) {
            if (await validForDeletion(studyDbId, context)) {
                await updateAssociations(studyDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return study.deleteOne(studyDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateStudy - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateStudy: async function(input, context) {
        let authorization = await checkAuthorization(context, 'study', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.study.definition);
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
            let updatedStudy = await study.updateOne(inputSanitized, context.benignErrors, token);
            await updatedStudy.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedStudy;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateStudy - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateStudy: async function(_, context) {
        if (await checkAuthorization(context, 'study', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return study.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * studiesZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    studiesZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "study", "read")) === true) {
            return study.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}