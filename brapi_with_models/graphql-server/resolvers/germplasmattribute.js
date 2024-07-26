/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const germplasmattribute = require(path.join(__dirname, '..', 'models', 'index.js')).germplasmattribute;
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
    'addMethod': 'method',
    'addOntologyReference': 'ontologyreference',
    'addScale': 'scale',
    'addTrait': 'trait',
    'addGermplasmAttributeValues': 'germplasmattributevalue',
    'addAdditionalInfo': 'additionalinfo',
    'addExternalReferences': 'externalreference'
}



/**
 * germplasmattribute.prototype.method - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
germplasmattribute.prototype.method = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.method_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneMethod({
                [models.method.idAttribute()]: this.method_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.method.idAttribute(),
                "value": this.method_ID,
                "operator": "eq"
            });
            let found = (await resolvers.methodsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 methods matching germplasmattribute with germplasmAttributeDbId ${this.method_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the germplasmattribute model. Returning first method.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * germplasmattribute.prototype.ontologyReference - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
germplasmattribute.prototype.ontologyReference = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.ontologyReference_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneOntologyreference({
                [models.ontologyreference.idAttribute()]: this.ontologyReference_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.ontologyreference.idAttribute(),
                "value": this.ontologyReference_ID,
                "operator": "eq"
            });
            let found = (await resolvers.ontologyreferencesConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 ontologyreferences matching germplasmattribute with germplasmAttributeDbId ${this.ontologyReference_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the germplasmattribute model. Returning first ontologyreference.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * germplasmattribute.prototype.scale - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
germplasmattribute.prototype.scale = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.scale_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneScale({
                [models.scale.idAttribute()]: this.scale_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.scale.idAttribute(),
                "value": this.scale_ID,
                "operator": "eq"
            });
            let found = (await resolvers.scalesConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 scales matching germplasmattribute with germplasmAttributeDbId ${this.scale_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the germplasmattribute model. Returning first scale.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * germplasmattribute.prototype.trait - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
germplasmattribute.prototype.trait = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.trait_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneTrait({
                [models.trait.idAttribute()]: this.trait_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.trait.idAttribute(),
                "value": this.trait_ID,
                "operator": "eq"
            });
            let found = (await resolvers.traitsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 traits matching germplasmattribute with germplasmAttributeDbId ${this.trait_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the germplasmattribute model. Returning first trait.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}

/**
 * germplasmattribute.prototype.germplasmAttributeValuesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
germplasmattribute.prototype.germplasmAttributeValuesFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.germplasmAttributeValues_IDs) || this.germplasmAttributeValues_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.germplasmattributevalue.idAttribute(),
        "value": this.germplasmAttributeValues_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.germplasmattributevalues({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * germplasmattribute.prototype.countFilteredGermplasmAttributeValues - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
germplasmattribute.prototype.countFilteredGermplasmAttributeValues = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.germplasmAttributeValues_IDs) || this.germplasmAttributeValues_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.germplasmattributevalue.idAttribute(),
        "value": this.germplasmAttributeValues_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countGermplasmattributevalues({
        search: nsearch
    }, context);
}

/**
 * germplasmattribute.prototype.germplasmAttributeValuesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
germplasmattribute.prototype.germplasmAttributeValuesConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.germplasmAttributeValues_IDs) || this.germplasmAttributeValues_IDs.length === 0) {
        return {
            edges: [],
            germplasmattributevalues: [],
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
        "field": models.germplasmattributevalue.idAttribute(),
        "value": this.germplasmAttributeValues_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.germplasmattributevaluesConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * germplasmattribute.prototype.additionalInfoFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
germplasmattribute.prototype.additionalInfoFilter = function({
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
 * germplasmattribute.prototype.countFilteredAdditionalInfo - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
germplasmattribute.prototype.countFilteredAdditionalInfo = function({
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
 * germplasmattribute.prototype.additionalInfoConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
germplasmattribute.prototype.additionalInfoConnection = function({
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
 * germplasmattribute.prototype.externalReferencesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
germplasmattribute.prototype.externalReferencesFilter = function({
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
 * germplasmattribute.prototype.countFilteredExternalReferences - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
germplasmattribute.prototype.countFilteredExternalReferences = function({
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
 * germplasmattribute.prototype.externalReferencesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
germplasmattribute.prototype.externalReferencesConnection = function({
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
germplasmattribute.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addGermplasmAttributeValues)) {
        promises_add.push(this.add_germplasmAttributeValues(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addAdditionalInfo)) {
        promises_add.push(this.add_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addExternalReferences)) {
        promises_add.push(this.add_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addMethod)) {
        promises_add.push(this.add_method(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addOntologyReference)) {
        promises_add.push(this.add_ontologyReference(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addScale)) {
        promises_add.push(this.add_scale(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addTrait)) {
        promises_add.push(this.add_trait(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removeGermplasmAttributeValues)) {
        promises_remove.push(this.remove_germplasmAttributeValues(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeAdditionalInfo)) {
        promises_remove.push(this.remove_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeExternalReferences)) {
        promises_remove.push(this.remove_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeMethod)) {
        promises_remove.push(this.remove_method(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeOntologyReference)) {
        promises_remove.push(this.remove_ontologyReference(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeScale)) {
        promises_remove.push(this.remove_scale(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeTrait)) {
        promises_remove.push(this.remove_trait(input, benignErrorReporter, token));
    }

    await Promise.all(promises_remove);

}
/**
 * add_germplasmAttributeValues - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasmattribute.prototype.add_germplasmAttributeValues = async function(input, benignErrorReporter, token) {

    await germplasmattribute.add_germplasmAttributeValues_IDs(this.getIdValue(), input.addGermplasmAttributeValues, benignErrorReporter, token);
    this.germplasmAttributeValues_IDs = helper.unionIds(this.germplasmAttributeValues_IDs, input.addGermplasmAttributeValues);
}

/**
 * add_additionalInfo - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasmattribute.prototype.add_additionalInfo = async function(input, benignErrorReporter, token) {

    await germplasmattribute.add_additionalInfo_IDs(this.getIdValue(), input.addAdditionalInfo, benignErrorReporter, token);
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
germplasmattribute.prototype.add_externalReferences = async function(input, benignErrorReporter, token) {

    await germplasmattribute.add_externalReferences_IDs(this.getIdValue(), input.addExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.unionIds(this.externalReferences_IDs, input.addExternalReferences);
}

/**
 * add_method - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasmattribute.prototype.add_method = async function(input, benignErrorReporter, token) {
    await germplasmattribute.add_method_ID(this.getIdValue(), input.addMethod, benignErrorReporter, token);
    this.method_ID = input.addMethod;
}

/**
 * add_ontologyReference - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasmattribute.prototype.add_ontologyReference = async function(input, benignErrorReporter, token) {
    const associated = await models.ontologyreference.readById(input.addOntologyReference, benignErrorReporter, token);
    if (associated.germplasmAttribute_ID) {
        const removed = await germplasmattribute.remove_ontologyReference_ID(associated.germplasmAttribute_ID, input.addOntologyReference, benignErrorReporter, token);
        benignErrorReporter.push({
            message: `Hint: update ${removed} existing association!`,
        });
    }
    await germplasmattribute.add_ontologyReference_ID(this.getIdValue(), input.addOntologyReference, benignErrorReporter, token);
    this.ontologyReference_ID = input.addOntologyReference;
}

/**
 * add_scale - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasmattribute.prototype.add_scale = async function(input, benignErrorReporter, token) {
    const associated = await models.scale.readById(input.addScale, benignErrorReporter, token);
    if (associated.germplasmAttribute_ID) {
        const removed = await germplasmattribute.remove_scale_ID(associated.germplasmAttribute_ID, input.addScale, benignErrorReporter, token);
        benignErrorReporter.push({
            message: `Hint: update ${removed} existing association!`,
        });
    }
    await germplasmattribute.add_scale_ID(this.getIdValue(), input.addScale, benignErrorReporter, token);
    this.scale_ID = input.addScale;
}

/**
 * add_trait - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasmattribute.prototype.add_trait = async function(input, benignErrorReporter, token) {
    const associated = await models.trait.readById(input.addTrait, benignErrorReporter, token);
    if (associated.germplasmAttribute_ID) {
        const removed = await germplasmattribute.remove_trait_ID(associated.germplasmAttribute_ID, input.addTrait, benignErrorReporter, token);
        benignErrorReporter.push({
            message: `Hint: update ${removed} existing association!`,
        });
    }
    await germplasmattribute.add_trait_ID(this.getIdValue(), input.addTrait, benignErrorReporter, token);
    this.trait_ID = input.addTrait;
}

/**
 * remove_germplasmAttributeValues - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasmattribute.prototype.remove_germplasmAttributeValues = async function(input, benignErrorReporter, token) {

    await germplasmattribute.remove_germplasmAttributeValues_IDs(this.getIdValue(), input.removeGermplasmAttributeValues, benignErrorReporter, token);
    this.germplasmAttributeValues_IDs = helper.differenceIds(this.germplasmAttributeValues_IDs, input.removeGermplasmAttributeValues);
}

/**
 * remove_additionalInfo - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasmattribute.prototype.remove_additionalInfo = async function(input, benignErrorReporter, token) {

    await germplasmattribute.remove_additionalInfo_IDs(this.getIdValue(), input.removeAdditionalInfo, benignErrorReporter, token);
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
germplasmattribute.prototype.remove_externalReferences = async function(input, benignErrorReporter, token) {

    await germplasmattribute.remove_externalReferences_IDs(this.getIdValue(), input.removeExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.differenceIds(this.externalReferences_IDs, input.removeExternalReferences);
}

/**
 * remove_method - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasmattribute.prototype.remove_method = async function(input, benignErrorReporter, token) {
    if (input.removeMethod == this.method_ID) {
        await germplasmattribute.remove_method_ID(this.getIdValue(), input.removeMethod, benignErrorReporter, token);
        this.method_ID = null;
    }
}

/**
 * remove_ontologyReference - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasmattribute.prototype.remove_ontologyReference = async function(input, benignErrorReporter, token) {
    if (input.removeOntologyReference == this.ontologyReference_ID) {
        await germplasmattribute.remove_ontologyReference_ID(this.getIdValue(), input.removeOntologyReference, benignErrorReporter, token);
        this.ontologyReference_ID = null;
    }
}

/**
 * remove_scale - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasmattribute.prototype.remove_scale = async function(input, benignErrorReporter, token) {
    if (input.removeScale == this.scale_ID) {
        await germplasmattribute.remove_scale_ID(this.getIdValue(), input.removeScale, benignErrorReporter, token);
        this.scale_ID = null;
    }
}

/**
 * remove_trait - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasmattribute.prototype.remove_trait = async function(input, benignErrorReporter, token) {
    if (input.removeTrait == this.trait_ID) {
        await germplasmattribute.remove_trait_ID(this.getIdValue(), input.removeTrait, benignErrorReporter, token);
        this.trait_ID = null;
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

    let germplasmattribute = await resolvers.readOneGermplasmattribute({
        germplasmAttributeDbId: id
    }, context);
    //check that record actually exists
    if (germplasmattribute === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(germplasmattribute.germplasmAttributeValues_IDs) ? germplasmattribute.germplasmAttributeValues_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(germplasmattribute.additionalInfo_IDs) ? germplasmattribute.additionalInfo_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(germplasmattribute.externalReferences_IDs) ? germplasmattribute.externalReferences_IDs.length : 0;

    get_to_one_associated_fk += [null, undefined].includes(germplasmattribute.method_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(germplasmattribute.ontologyReference_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(germplasmattribute.scale_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(germplasmattribute.trait_ID) ? 0 : 1;


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
        throw new Error(`germplasmattribute with germplasmAttributeDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const germplasmattribute_record = await resolvers.readOneGermplasmattribute({
            germplasmAttributeDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * germplasmattributes - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    germplasmattributes: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'germplasmattribute', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "germplasmattributes");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await germplasmattribute.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * germplasmattributesConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    germplasmattributesConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'germplasmattribute', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "germplasmattributesConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await germplasmattribute.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneGermplasmattribute - Check user authorization and return one record with the specified germplasmAttributeDbId in the germplasmAttributeDbId argument.
     *
     * @param  {number} {germplasmAttributeDbId}    germplasmAttributeDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with germplasmAttributeDbId requested
     */
    readOneGermplasmattribute: async function({
        germplasmAttributeDbId
    }, context) {
        if (await checkAuthorization(context, 'germplasmattribute', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneGermplasmattribute");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await germplasmattribute.readById(germplasmAttributeDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countGermplasmattributes - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countGermplasmattributes: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'germplasmattribute', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await germplasmattribute.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateGermplasmattributeForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateGermplasmattributeForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'germplasmattribute', 'read');
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
                    germplasmattribute,
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
     * validateGermplasmattributeForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateGermplasmattributeForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'germplasmattribute', 'read');
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
                    germplasmattribute,
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
     * validateGermplasmattributeForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {germplasmAttributeDbId} germplasmAttributeDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateGermplasmattributeForDeletion: async ({
        germplasmAttributeDbId
    }, context) => {
        if ((await checkAuthorization(context, 'germplasmattribute', 'read')) === true) {
            try {
                await validForDeletion(germplasmAttributeDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    germplasmattribute,
                    germplasmAttributeDbId);
                return true;
            } catch (error) {
                error.input = {
                    germplasmAttributeDbId: germplasmAttributeDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateGermplasmattributeAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {germplasmAttributeDbId} germplasmAttributeDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateGermplasmattributeAfterReading: async ({
        germplasmAttributeDbId
    }, context) => {
        if ((await checkAuthorization(context, 'germplasmattribute', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    germplasmattribute,
                    germplasmAttributeDbId);
                return true;
            } catch (error) {
                error.input = {
                    germplasmAttributeDbId: germplasmAttributeDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addGermplasmattribute - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addGermplasmattribute: async function(input, context) {
        let authorization = await checkAuthorization(context, 'germplasmattribute', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.germplasmattribute.definition);
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
            let createdGermplasmattribute = await germplasmattribute.addOne(inputSanitized, context.benignErrors, token);
            await createdGermplasmattribute.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdGermplasmattribute;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteGermplasmattribute - Check user authorization and delete a record with the specified germplasmAttributeDbId in the germplasmAttributeDbId argument.
     *
     * @param  {number} {germplasmAttributeDbId}    germplasmAttributeDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteGermplasmattribute: async function({
        germplasmAttributeDbId
    }, context) {
        if (await checkAuthorization(context, 'germplasmattribute', 'delete') === true) {
            if (await validForDeletion(germplasmAttributeDbId, context)) {
                await updateAssociations(germplasmAttributeDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return germplasmattribute.deleteOne(germplasmAttributeDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateGermplasmattribute - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateGermplasmattribute: async function(input, context) {
        let authorization = await checkAuthorization(context, 'germplasmattribute', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.germplasmattribute.definition);
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
            let updatedGermplasmattribute = await germplasmattribute.updateOne(inputSanitized, context.benignErrors, token);
            await updatedGermplasmattribute.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedGermplasmattribute;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateGermplasmattribute - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateGermplasmattribute: async function(_, context) {
        if (await checkAuthorization(context, 'germplasmattribute', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return germplasmattribute.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * germplasmattributesZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    germplasmattributesZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "germplasmattribute", "read")) === true) {
            return germplasmattribute.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}