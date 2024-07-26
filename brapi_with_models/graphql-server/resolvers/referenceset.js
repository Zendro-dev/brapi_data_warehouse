/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const referenceset = require(path.join(__dirname, '..', 'models', 'index.js')).referenceset;
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
    'addSpecies': 'species',
    'addAdditionalInfo': 'additionalinfo',
    'addExternalReferences': 'externalreference',
    'addSourceGermplasm': 'sourcegermplasm',
    'addReferences': 'reference',
    'addVariants': 'variant',
    'addVariantSets': 'variantset'
}



/**
 * referenceset.prototype.species - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
referenceset.prototype.species = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.species_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneSpecies({
                [models.species.idAttribute()]: this.species_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.species.idAttribute(),
                "value": this.species_ID,
                "operator": "eq"
            });
            let found = (await resolvers.speciesConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 species matching referenceset with referenceSetDbId ${this.species_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the referenceset model. Returning first species.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}

/**
 * referenceset.prototype.additionalInfoFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
referenceset.prototype.additionalInfoFilter = function({
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
 * referenceset.prototype.countFilteredAdditionalInfo - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
referenceset.prototype.countFilteredAdditionalInfo = function({
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
 * referenceset.prototype.additionalInfoConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
referenceset.prototype.additionalInfoConnection = function({
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
 * referenceset.prototype.externalReferencesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
referenceset.prototype.externalReferencesFilter = function({
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
 * referenceset.prototype.countFilteredExternalReferences - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
referenceset.prototype.countFilteredExternalReferences = function({
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
 * referenceset.prototype.externalReferencesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
referenceset.prototype.externalReferencesConnection = function({
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
 * referenceset.prototype.sourceGermplasmFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
referenceset.prototype.sourceGermplasmFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.sourceGermplasm_IDs) || this.sourceGermplasm_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.sourcegermplasm.idAttribute(),
        "value": this.sourceGermplasm_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.sourcegermplasms({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * referenceset.prototype.countFilteredSourceGermplasm - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
referenceset.prototype.countFilteredSourceGermplasm = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.sourceGermplasm_IDs) || this.sourceGermplasm_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.sourcegermplasm.idAttribute(),
        "value": this.sourceGermplasm_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countSourcegermplasms({
        search: nsearch
    }, context);
}

/**
 * referenceset.prototype.sourceGermplasmConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
referenceset.prototype.sourceGermplasmConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.sourceGermplasm_IDs) || this.sourceGermplasm_IDs.length === 0) {
        return {
            edges: [],
            sourcegermplasms: [],
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
        "field": models.sourcegermplasm.idAttribute(),
        "value": this.sourceGermplasm_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.sourcegermplasmsConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * referenceset.prototype.referencesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
referenceset.prototype.referencesFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.references_IDs) || this.references_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.reference.idAttribute(),
        "value": this.references_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.references({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * referenceset.prototype.countFilteredReferences - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
referenceset.prototype.countFilteredReferences = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.references_IDs) || this.references_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.reference.idAttribute(),
        "value": this.references_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countReferences({
        search: nsearch
    }, context);
}

/**
 * referenceset.prototype.referencesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
referenceset.prototype.referencesConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.references_IDs) || this.references_IDs.length === 0) {
        return {
            edges: [],
            references: [],
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
        "field": models.reference.idAttribute(),
        "value": this.references_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.referencesConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * referenceset.prototype.variantsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
referenceset.prototype.variantsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.variants_IDs) || this.variants_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.variant.idAttribute(),
        "value": this.variants_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.variants({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * referenceset.prototype.countFilteredVariants - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
referenceset.prototype.countFilteredVariants = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.variants_IDs) || this.variants_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.variant.idAttribute(),
        "value": this.variants_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countVariants({
        search: nsearch
    }, context);
}

/**
 * referenceset.prototype.variantsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
referenceset.prototype.variantsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.variants_IDs) || this.variants_IDs.length === 0) {
        return {
            edges: [],
            variants: [],
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
        "field": models.variant.idAttribute(),
        "value": this.variants_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.variantsConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * referenceset.prototype.variantSetsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
referenceset.prototype.variantSetsFilter = function({
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
 * referenceset.prototype.countFilteredVariantSets - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
referenceset.prototype.countFilteredVariantSets = function({
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
 * referenceset.prototype.variantSetsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
referenceset.prototype.variantSetsConnection = function({
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
 * handleAssociations - handles the given associations in the create and update case.
 *
 * @param {object} input   Info of each field to create the new record
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
referenceset.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addAdditionalInfo)) {
        promises_add.push(this.add_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addExternalReferences)) {
        promises_add.push(this.add_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addSourceGermplasm)) {
        promises_add.push(this.add_sourceGermplasm(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addReferences)) {
        promises_add.push(this.add_references(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addVariants)) {
        promises_add.push(this.add_variants(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addVariantSets)) {
        promises_add.push(this.add_variantSets(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addSpecies)) {
        promises_add.push(this.add_species(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removeAdditionalInfo)) {
        promises_remove.push(this.remove_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeExternalReferences)) {
        promises_remove.push(this.remove_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeSourceGermplasm)) {
        promises_remove.push(this.remove_sourceGermplasm(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeReferences)) {
        promises_remove.push(this.remove_references(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeVariants)) {
        promises_remove.push(this.remove_variants(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeVariantSets)) {
        promises_remove.push(this.remove_variantSets(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeSpecies)) {
        promises_remove.push(this.remove_species(input, benignErrorReporter, token));
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
referenceset.prototype.add_additionalInfo = async function(input, benignErrorReporter, token) {

    await referenceset.add_additionalInfo_IDs(this.getIdValue(), input.addAdditionalInfo, benignErrorReporter, token);
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
referenceset.prototype.add_externalReferences = async function(input, benignErrorReporter, token) {

    await referenceset.add_externalReferences_IDs(this.getIdValue(), input.addExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.unionIds(this.externalReferences_IDs, input.addExternalReferences);
}

/**
 * add_sourceGermplasm - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
referenceset.prototype.add_sourceGermplasm = async function(input, benignErrorReporter, token) {

    await referenceset.add_sourceGermplasm_IDs(this.getIdValue(), input.addSourceGermplasm, benignErrorReporter, token);
    this.sourceGermplasm_IDs = helper.unionIds(this.sourceGermplasm_IDs, input.addSourceGermplasm);
}

/**
 * add_references - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
referenceset.prototype.add_references = async function(input, benignErrorReporter, token) {

    await referenceset.add_references_IDs(this.getIdValue(), input.addReferences, benignErrorReporter, token);
    this.references_IDs = helper.unionIds(this.references_IDs, input.addReferences);
}

/**
 * add_variants - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
referenceset.prototype.add_variants = async function(input, benignErrorReporter, token) {

    await referenceset.add_variants_IDs(this.getIdValue(), input.addVariants, benignErrorReporter, token);
    this.variants_IDs = helper.unionIds(this.variants_IDs, input.addVariants);
}

/**
 * add_variantSets - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
referenceset.prototype.add_variantSets = async function(input, benignErrorReporter, token) {

    await referenceset.add_variantSets_IDs(this.getIdValue(), input.addVariantSets, benignErrorReporter, token);
    this.variantSets_IDs = helper.unionIds(this.variantSets_IDs, input.addVariantSets);
}

/**
 * add_species - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
referenceset.prototype.add_species = async function(input, benignErrorReporter, token) {
    const associated = await models.species.readById(input.addSpecies, benignErrorReporter, token);
    if (associated.referenceset_ID) {
        const removed = await referenceset.remove_species_ID(associated.referenceset_ID, input.addSpecies, benignErrorReporter, token);
        benignErrorReporter.push({
            message: `Hint: update ${removed} existing association!`,
        });
    }
    await referenceset.add_species_ID(this.getIdValue(), input.addSpecies, benignErrorReporter, token);
    this.species_ID = input.addSpecies;
}

/**
 * remove_additionalInfo - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
referenceset.prototype.remove_additionalInfo = async function(input, benignErrorReporter, token) {

    await referenceset.remove_additionalInfo_IDs(this.getIdValue(), input.removeAdditionalInfo, benignErrorReporter, token);
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
referenceset.prototype.remove_externalReferences = async function(input, benignErrorReporter, token) {

    await referenceset.remove_externalReferences_IDs(this.getIdValue(), input.removeExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.differenceIds(this.externalReferences_IDs, input.removeExternalReferences);
}

/**
 * remove_sourceGermplasm - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
referenceset.prototype.remove_sourceGermplasm = async function(input, benignErrorReporter, token) {

    await referenceset.remove_sourceGermplasm_IDs(this.getIdValue(), input.removeSourceGermplasm, benignErrorReporter, token);
    this.sourceGermplasm_IDs = helper.differenceIds(this.sourceGermplasm_IDs, input.removeSourceGermplasm);
}

/**
 * remove_references - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
referenceset.prototype.remove_references = async function(input, benignErrorReporter, token) {

    await referenceset.remove_references_IDs(this.getIdValue(), input.removeReferences, benignErrorReporter, token);
    this.references_IDs = helper.differenceIds(this.references_IDs, input.removeReferences);
}

/**
 * remove_variants - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
referenceset.prototype.remove_variants = async function(input, benignErrorReporter, token) {

    await referenceset.remove_variants_IDs(this.getIdValue(), input.removeVariants, benignErrorReporter, token);
    this.variants_IDs = helper.differenceIds(this.variants_IDs, input.removeVariants);
}

/**
 * remove_variantSets - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
referenceset.prototype.remove_variantSets = async function(input, benignErrorReporter, token) {

    await referenceset.remove_variantSets_IDs(this.getIdValue(), input.removeVariantSets, benignErrorReporter, token);
    this.variantSets_IDs = helper.differenceIds(this.variantSets_IDs, input.removeVariantSets);
}

/**
 * remove_species - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
referenceset.prototype.remove_species = async function(input, benignErrorReporter, token) {
    if (input.removeSpecies == this.species_ID) {
        await referenceset.remove_species_ID(this.getIdValue(), input.removeSpecies, benignErrorReporter, token);
        this.species_ID = null;
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

    let referenceset = await resolvers.readOneReferenceset({
        referenceSetDbId: id
    }, context);
    //check that record actually exists
    if (referenceset === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(referenceset.additionalInfo_IDs) ? referenceset.additionalInfo_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(referenceset.externalReferences_IDs) ? referenceset.externalReferences_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(referenceset.sourceGermplasm_IDs) ? referenceset.sourceGermplasm_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(referenceset.references_IDs) ? referenceset.references_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(referenceset.variants_IDs) ? referenceset.variants_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(referenceset.variantSets_IDs) ? referenceset.variantSets_IDs.length : 0;

    get_to_one_associated_fk += [null, undefined].includes(referenceset.species_ID) ? 0 : 1;


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
        throw new Error(`referenceset with referenceSetDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const referenceset_record = await resolvers.readOneReferenceset({
            referenceSetDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * referencesets - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    referencesets: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'referenceset', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "referencesets");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await referenceset.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * referencesetsConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    referencesetsConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'referenceset', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "referencesetsConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await referenceset.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneReferenceset - Check user authorization and return one record with the specified referenceSetDbId in the referenceSetDbId argument.
     *
     * @param  {number} {referenceSetDbId}    referenceSetDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with referenceSetDbId requested
     */
    readOneReferenceset: async function({
        referenceSetDbId
    }, context) {
        if (await checkAuthorization(context, 'referenceset', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneReferenceset");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await referenceset.readById(referenceSetDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countReferencesets - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countReferencesets: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'referenceset', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await referenceset.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateReferencesetForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateReferencesetForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'referenceset', 'read');
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
                    referenceset,
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
     * validateReferencesetForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateReferencesetForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'referenceset', 'read');
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
                    referenceset,
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
     * validateReferencesetForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {referenceSetDbId} referenceSetDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateReferencesetForDeletion: async ({
        referenceSetDbId
    }, context) => {
        if ((await checkAuthorization(context, 'referenceset', 'read')) === true) {
            try {
                await validForDeletion(referenceSetDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    referenceset,
                    referenceSetDbId);
                return true;
            } catch (error) {
                error.input = {
                    referenceSetDbId: referenceSetDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateReferencesetAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {referenceSetDbId} referenceSetDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateReferencesetAfterReading: async ({
        referenceSetDbId
    }, context) => {
        if ((await checkAuthorization(context, 'referenceset', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    referenceset,
                    referenceSetDbId);
                return true;
            } catch (error) {
                error.input = {
                    referenceSetDbId: referenceSetDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addReferenceset - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addReferenceset: async function(input, context) {
        let authorization = await checkAuthorization(context, 'referenceset', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.referenceset.definition);
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
            let createdReferenceset = await referenceset.addOne(inputSanitized, context.benignErrors, token);
            await createdReferenceset.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdReferenceset;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteReferenceset - Check user authorization and delete a record with the specified referenceSetDbId in the referenceSetDbId argument.
     *
     * @param  {number} {referenceSetDbId}    referenceSetDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteReferenceset: async function({
        referenceSetDbId
    }, context) {
        if (await checkAuthorization(context, 'referenceset', 'delete') === true) {
            if (await validForDeletion(referenceSetDbId, context)) {
                await updateAssociations(referenceSetDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return referenceset.deleteOne(referenceSetDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateReferenceset - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateReferenceset: async function(input, context) {
        let authorization = await checkAuthorization(context, 'referenceset', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.referenceset.definition);
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
            let updatedReferenceset = await referenceset.updateOne(inputSanitized, context.benignErrors, token);
            await updatedReferenceset.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedReferenceset;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateReferenceset - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateReferenceset: async function(_, context) {
        if (await checkAuthorization(context, 'referenceset', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return referenceset.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * referencesetsZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    referencesetsZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "referenceset", "read")) === true) {
            return referenceset.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}