/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const pedigreenode = require(path.join(__dirname, '..', 'models', 'index.js')).pedigreenode;
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
    'addBreedingMethod': 'breedingmethod',
    'addCrossingProject': 'crossingproject',
    'addGermplasm': 'germplasm',
    'addAdditionalInfo': 'additionalinfo',
    'addExternalReferences': 'externalreference',
    'addParents': 'parent',
    'addProgeny': 'progeny',
    'addSiblings': 'sibling'
}



/**
 * pedigreenode.prototype.breedingMethod - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
pedigreenode.prototype.breedingMethod = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.breedingMethod_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneBreedingmethod({
                [models.breedingmethod.idAttribute()]: this.breedingMethod_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.breedingmethod.idAttribute(),
                "value": this.breedingMethod_ID,
                "operator": "eq"
            });
            let found = (await resolvers.breedingmethodsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 breedingmethods matching pedigreenode with pedigreeNodeDbId ${this.breedingMethod_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the pedigreenode model. Returning first breedingmethod.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * pedigreenode.prototype.crossingProject - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
pedigreenode.prototype.crossingProject = async function({
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
                        `Not unique "to_one" association Error: Found > 1 crossingprojects matching pedigreenode with pedigreeNodeDbId ${this.crossingProject_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the pedigreenode model. Returning first crossingproject.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * pedigreenode.prototype.germplasm - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
pedigreenode.prototype.germplasm = async function({
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
                        `Not unique "to_one" association Error: Found > 1 germplasms matching pedigreenode with pedigreeNodeDbId ${this.germplasm_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the pedigreenode model. Returning first germplasm.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}

/**
 * pedigreenode.prototype.additionalInfoFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
pedigreenode.prototype.additionalInfoFilter = function({
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
 * pedigreenode.prototype.countFilteredAdditionalInfo - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
pedigreenode.prototype.countFilteredAdditionalInfo = function({
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
 * pedigreenode.prototype.additionalInfoConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
pedigreenode.prototype.additionalInfoConnection = function({
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
 * pedigreenode.prototype.externalReferencesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
pedigreenode.prototype.externalReferencesFilter = function({
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
 * pedigreenode.prototype.countFilteredExternalReferences - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
pedigreenode.prototype.countFilteredExternalReferences = function({
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
 * pedigreenode.prototype.externalReferencesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
pedigreenode.prototype.externalReferencesConnection = function({
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
 * pedigreenode.prototype.parentsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
pedigreenode.prototype.parentsFilter = function({
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
 * pedigreenode.prototype.countFilteredParents - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
pedigreenode.prototype.countFilteredParents = function({
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
 * pedigreenode.prototype.parentsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
pedigreenode.prototype.parentsConnection = function({
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
 * pedigreenode.prototype.progenyFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
pedigreenode.prototype.progenyFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.progeny_IDs) || this.progeny_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.progeny.idAttribute(),
        "value": this.progeny_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.progenies({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * pedigreenode.prototype.countFilteredProgeny - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
pedigreenode.prototype.countFilteredProgeny = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.progeny_IDs) || this.progeny_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.progeny.idAttribute(),
        "value": this.progeny_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countProgenies({
        search: nsearch
    }, context);
}

/**
 * pedigreenode.prototype.progenyConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
pedigreenode.prototype.progenyConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.progeny_IDs) || this.progeny_IDs.length === 0) {
        return {
            edges: [],
            progenies: [],
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
        "field": models.progeny.idAttribute(),
        "value": this.progeny_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.progeniesConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * pedigreenode.prototype.siblingsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
pedigreenode.prototype.siblingsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.siblings_IDs) || this.siblings_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.sibling.idAttribute(),
        "value": this.siblings_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.siblings({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * pedigreenode.prototype.countFilteredSiblings - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
pedigreenode.prototype.countFilteredSiblings = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.siblings_IDs) || this.siblings_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.sibling.idAttribute(),
        "value": this.siblings_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countSiblings({
        search: nsearch
    }, context);
}

/**
 * pedigreenode.prototype.siblingsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
pedigreenode.prototype.siblingsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.siblings_IDs) || this.siblings_IDs.length === 0) {
        return {
            edges: [],
            siblings: [],
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
        "field": models.sibling.idAttribute(),
        "value": this.siblings_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.siblingsConnection({
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
pedigreenode.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addAdditionalInfo)) {
        promises_add.push(this.add_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addExternalReferences)) {
        promises_add.push(this.add_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addParents)) {
        promises_add.push(this.add_parents(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addProgeny)) {
        promises_add.push(this.add_progeny(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addSiblings)) {
        promises_add.push(this.add_siblings(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addBreedingMethod)) {
        promises_add.push(this.add_breedingMethod(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addCrossingProject)) {
        promises_add.push(this.add_crossingProject(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addGermplasm)) {
        promises_add.push(this.add_germplasm(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removeAdditionalInfo)) {
        promises_remove.push(this.remove_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeExternalReferences)) {
        promises_remove.push(this.remove_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeParents)) {
        promises_remove.push(this.remove_parents(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeProgeny)) {
        promises_remove.push(this.remove_progeny(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeSiblings)) {
        promises_remove.push(this.remove_siblings(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeBreedingMethod)) {
        promises_remove.push(this.remove_breedingMethod(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeCrossingProject)) {
        promises_remove.push(this.remove_crossingProject(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeGermplasm)) {
        promises_remove.push(this.remove_germplasm(input, benignErrorReporter, token));
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
pedigreenode.prototype.add_additionalInfo = async function(input, benignErrorReporter, token) {

    await pedigreenode.add_additionalInfo_IDs(this.getIdValue(), input.addAdditionalInfo, benignErrorReporter, token);
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
pedigreenode.prototype.add_externalReferences = async function(input, benignErrorReporter, token) {

    await pedigreenode.add_externalReferences_IDs(this.getIdValue(), input.addExternalReferences, benignErrorReporter, token);
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
pedigreenode.prototype.add_parents = async function(input, benignErrorReporter, token) {

    await pedigreenode.add_parents_IDs(this.getIdValue(), input.addParents, benignErrorReporter, token);
    this.parents_IDs = helper.unionIds(this.parents_IDs, input.addParents);
}

/**
 * add_progeny - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
pedigreenode.prototype.add_progeny = async function(input, benignErrorReporter, token) {

    await pedigreenode.add_progeny_IDs(this.getIdValue(), input.addProgeny, benignErrorReporter, token);
    this.progeny_IDs = helper.unionIds(this.progeny_IDs, input.addProgeny);
}

/**
 * add_siblings - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
pedigreenode.prototype.add_siblings = async function(input, benignErrorReporter, token) {

    await pedigreenode.add_siblings_IDs(this.getIdValue(), input.addSiblings, benignErrorReporter, token);
    this.siblings_IDs = helper.unionIds(this.siblings_IDs, input.addSiblings);
}

/**
 * add_breedingMethod - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
pedigreenode.prototype.add_breedingMethod = async function(input, benignErrorReporter, token) {
    await pedigreenode.add_breedingMethod_ID(this.getIdValue(), input.addBreedingMethod, benignErrorReporter, token);
    this.breedingMethod_ID = input.addBreedingMethod;
}

/**
 * add_crossingProject - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
pedigreenode.prototype.add_crossingProject = async function(input, benignErrorReporter, token) {
    await pedigreenode.add_crossingProject_ID(this.getIdValue(), input.addCrossingProject, benignErrorReporter, token);
    this.crossingProject_ID = input.addCrossingProject;
}

/**
 * add_germplasm - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
pedigreenode.prototype.add_germplasm = async function(input, benignErrorReporter, token) {
    const associated = await models.germplasm.readById(input.addGermplasm, benignErrorReporter, token);
    if (associated.pedigreeNode_ID) {
        const removed = await pedigreenode.remove_germplasm_ID(associated.pedigreeNode_ID, input.addGermplasm, benignErrorReporter, token);
        benignErrorReporter.push({
            message: `Hint: update ${removed} existing association!`,
        });
    }
    await pedigreenode.add_germplasm_ID(this.getIdValue(), input.addGermplasm, benignErrorReporter, token);
    this.germplasm_ID = input.addGermplasm;
}

/**
 * remove_additionalInfo - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
pedigreenode.prototype.remove_additionalInfo = async function(input, benignErrorReporter, token) {

    await pedigreenode.remove_additionalInfo_IDs(this.getIdValue(), input.removeAdditionalInfo, benignErrorReporter, token);
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
pedigreenode.prototype.remove_externalReferences = async function(input, benignErrorReporter, token) {

    await pedigreenode.remove_externalReferences_IDs(this.getIdValue(), input.removeExternalReferences, benignErrorReporter, token);
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
pedigreenode.prototype.remove_parents = async function(input, benignErrorReporter, token) {

    await pedigreenode.remove_parents_IDs(this.getIdValue(), input.removeParents, benignErrorReporter, token);
    this.parents_IDs = helper.differenceIds(this.parents_IDs, input.removeParents);
}

/**
 * remove_progeny - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
pedigreenode.prototype.remove_progeny = async function(input, benignErrorReporter, token) {

    await pedigreenode.remove_progeny_IDs(this.getIdValue(), input.removeProgeny, benignErrorReporter, token);
    this.progeny_IDs = helper.differenceIds(this.progeny_IDs, input.removeProgeny);
}

/**
 * remove_siblings - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
pedigreenode.prototype.remove_siblings = async function(input, benignErrorReporter, token) {

    await pedigreenode.remove_siblings_IDs(this.getIdValue(), input.removeSiblings, benignErrorReporter, token);
    this.siblings_IDs = helper.differenceIds(this.siblings_IDs, input.removeSiblings);
}

/**
 * remove_breedingMethod - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
pedigreenode.prototype.remove_breedingMethod = async function(input, benignErrorReporter, token) {
    if (input.removeBreedingMethod == this.breedingMethod_ID) {
        await pedigreenode.remove_breedingMethod_ID(this.getIdValue(), input.removeBreedingMethod, benignErrorReporter, token);
        this.breedingMethod_ID = null;
    }
}

/**
 * remove_crossingProject - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
pedigreenode.prototype.remove_crossingProject = async function(input, benignErrorReporter, token) {
    if (input.removeCrossingProject == this.crossingProject_ID) {
        await pedigreenode.remove_crossingProject_ID(this.getIdValue(), input.removeCrossingProject, benignErrorReporter, token);
        this.crossingProject_ID = null;
    }
}

/**
 * remove_germplasm - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
pedigreenode.prototype.remove_germplasm = async function(input, benignErrorReporter, token) {
    if (input.removeGermplasm == this.germplasm_ID) {
        await pedigreenode.remove_germplasm_ID(this.getIdValue(), input.removeGermplasm, benignErrorReporter, token);
        this.germplasm_ID = null;
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

    let pedigreenode = await resolvers.readOnePedigreenode({
        pedigreeNodeDbId: id
    }, context);
    //check that record actually exists
    if (pedigreenode === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(pedigreenode.additionalInfo_IDs) ? pedigreenode.additionalInfo_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(pedigreenode.externalReferences_IDs) ? pedigreenode.externalReferences_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(pedigreenode.parents_IDs) ? pedigreenode.parents_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(pedigreenode.progeny_IDs) ? pedigreenode.progeny_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(pedigreenode.siblings_IDs) ? pedigreenode.siblings_IDs.length : 0;

    get_to_one_associated_fk += [null, undefined].includes(pedigreenode.breedingMethod_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(pedigreenode.crossingProject_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(pedigreenode.germplasm_ID) ? 0 : 1;


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
        throw new Error(`pedigreenode with pedigreeNodeDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const pedigreenode_record = await resolvers.readOnePedigreenode({
            pedigreeNodeDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * pedigreenodes - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    pedigreenodes: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'pedigreenode', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "pedigreenodes");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await pedigreenode.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * pedigreenodesConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    pedigreenodesConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'pedigreenode', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "pedigreenodesConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await pedigreenode.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOnePedigreenode - Check user authorization and return one record with the specified pedigreeNodeDbId in the pedigreeNodeDbId argument.
     *
     * @param  {number} {pedigreeNodeDbId}    pedigreeNodeDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with pedigreeNodeDbId requested
     */
    readOnePedigreenode: async function({
        pedigreeNodeDbId
    }, context) {
        if (await checkAuthorization(context, 'pedigreenode', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOnePedigreenode");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await pedigreenode.readById(pedigreeNodeDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countPedigreenodes - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countPedigreenodes: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'pedigreenode', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await pedigreenode.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validatePedigreenodeForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validatePedigreenodeForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'pedigreenode', 'read');
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
                    pedigreenode,
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
     * validatePedigreenodeForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validatePedigreenodeForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'pedigreenode', 'read');
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
                    pedigreenode,
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
     * validatePedigreenodeForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {pedigreeNodeDbId} pedigreeNodeDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validatePedigreenodeForDeletion: async ({
        pedigreeNodeDbId
    }, context) => {
        if ((await checkAuthorization(context, 'pedigreenode', 'read')) === true) {
            try {
                await validForDeletion(pedigreeNodeDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    pedigreenode,
                    pedigreeNodeDbId);
                return true;
            } catch (error) {
                error.input = {
                    pedigreeNodeDbId: pedigreeNodeDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validatePedigreenodeAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {pedigreeNodeDbId} pedigreeNodeDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validatePedigreenodeAfterReading: async ({
        pedigreeNodeDbId
    }, context) => {
        if ((await checkAuthorization(context, 'pedigreenode', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    pedigreenode,
                    pedigreeNodeDbId);
                return true;
            } catch (error) {
                error.input = {
                    pedigreeNodeDbId: pedigreeNodeDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addPedigreenode - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addPedigreenode: async function(input, context) {
        let authorization = await checkAuthorization(context, 'pedigreenode', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.pedigreenode.definition);
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
            let createdPedigreenode = await pedigreenode.addOne(inputSanitized, context.benignErrors, token);
            await createdPedigreenode.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdPedigreenode;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deletePedigreenode - Check user authorization and delete a record with the specified pedigreeNodeDbId in the pedigreeNodeDbId argument.
     *
     * @param  {number} {pedigreeNodeDbId}    pedigreeNodeDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deletePedigreenode: async function({
        pedigreeNodeDbId
    }, context) {
        if (await checkAuthorization(context, 'pedigreenode', 'delete') === true) {
            if (await validForDeletion(pedigreeNodeDbId, context)) {
                await updateAssociations(pedigreeNodeDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return pedigreenode.deleteOne(pedigreeNodeDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updatePedigreenode - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updatePedigreenode: async function(input, context) {
        let authorization = await checkAuthorization(context, 'pedigreenode', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.pedigreenode.definition);
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
            let updatedPedigreenode = await pedigreenode.updateOne(inputSanitized, context.benignErrors, token);
            await updatedPedigreenode.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedPedigreenode;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplatePedigreenode - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplatePedigreenode: async function(_, context) {
        if (await checkAuthorization(context, 'pedigreenode', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return pedigreenode.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * pedigreenodesZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    pedigreenodesZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "pedigreenode", "read")) === true) {
            return pedigreenode.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}