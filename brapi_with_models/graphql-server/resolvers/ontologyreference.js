/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const ontologyreference = require(path.join(__dirname, '..', 'models', 'index.js')).ontologyreference;
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
    'addGermplasmAttribute': 'germplasmattribute',
    'addMethod': 'method',
    'addObservationVariable': 'observationvariable',
    'addScale': 'scale',
    'addTrait': 'trait',
    'addDocumentationLinks': 'documentationlink'
}



/**
 * ontologyreference.prototype.germplasmAttribute - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
ontologyreference.prototype.germplasmAttribute = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.germplasmAttribute_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneGermplasmattribute({
                [models.germplasmattribute.idAttribute()]: this.germplasmAttribute_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.germplasmattribute.idAttribute(),
                "value": this.germplasmAttribute_ID,
                "operator": "eq"
            });
            let found = (await resolvers.germplasmattributesConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 germplasmattributes matching ontologyreference with ontologyReferenceDbId ${this.germplasmAttribute_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the ontologyreference model. Returning first germplasmattribute.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * ontologyreference.prototype.method - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
ontologyreference.prototype.method = async function({
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
                        `Not unique "to_one" association Error: Found > 1 methods matching ontologyreference with ontologyReferenceDbId ${this.method_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the ontologyreference model. Returning first method.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * ontologyreference.prototype.observationVariable - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
ontologyreference.prototype.observationVariable = async function({
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
                        `Not unique "to_one" association Error: Found > 1 observationvariables matching ontologyreference with ontologyReferenceDbId ${this.observationVariable_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the ontologyreference model. Returning first observationvariable.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * ontologyreference.prototype.scale - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
ontologyreference.prototype.scale = async function({
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
                        `Not unique "to_one" association Error: Found > 1 scales matching ontologyreference with ontologyReferenceDbId ${this.scale_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the ontologyreference model. Returning first scale.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * ontologyreference.prototype.trait - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
ontologyreference.prototype.trait = async function({
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
                        `Not unique "to_one" association Error: Found > 1 traits matching ontologyreference with ontologyReferenceDbId ${this.trait_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the ontologyreference model. Returning first trait.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}

/**
 * ontologyreference.prototype.documentationLinksFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
ontologyreference.prototype.documentationLinksFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.documentationLinks_IDs) || this.documentationLinks_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.documentationlink.idAttribute(),
        "value": this.documentationLinks_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.documentationlinks({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * ontologyreference.prototype.countFilteredDocumentationLinks - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
ontologyreference.prototype.countFilteredDocumentationLinks = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.documentationLinks_IDs) || this.documentationLinks_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.documentationlink.idAttribute(),
        "value": this.documentationLinks_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countDocumentationlinks({
        search: nsearch
    }, context);
}

/**
 * ontologyreference.prototype.documentationLinksConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
ontologyreference.prototype.documentationLinksConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.documentationLinks_IDs) || this.documentationLinks_IDs.length === 0) {
        return {
            edges: [],
            documentationlinks: [],
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
        "field": models.documentationlink.idAttribute(),
        "value": this.documentationLinks_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.documentationlinksConnection({
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
ontologyreference.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addDocumentationLinks)) {
        promises_add.push(this.add_documentationLinks(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addGermplasmAttribute)) {
        promises_add.push(this.add_germplasmAttribute(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addMethod)) {
        promises_add.push(this.add_method(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addObservationVariable)) {
        promises_add.push(this.add_observationVariable(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addScale)) {
        promises_add.push(this.add_scale(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addTrait)) {
        promises_add.push(this.add_trait(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removeDocumentationLinks)) {
        promises_remove.push(this.remove_documentationLinks(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeGermplasmAttribute)) {
        promises_remove.push(this.remove_germplasmAttribute(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeMethod)) {
        promises_remove.push(this.remove_method(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeObservationVariable)) {
        promises_remove.push(this.remove_observationVariable(input, benignErrorReporter, token));
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
 * add_documentationLinks - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
ontologyreference.prototype.add_documentationLinks = async function(input, benignErrorReporter, token) {

    await ontologyreference.add_documentationLinks_IDs(this.getIdValue(), input.addDocumentationLinks, benignErrorReporter, token);
    this.documentationLinks_IDs = helper.unionIds(this.documentationLinks_IDs, input.addDocumentationLinks);
}

/**
 * add_germplasmAttribute - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
ontologyreference.prototype.add_germplasmAttribute = async function(input, benignErrorReporter, token) {
    const associated = await models.germplasmattribute.readById(input.addGermplasmAttribute, benignErrorReporter, token);
    if (associated.ontologyReference_ID) {
        const removed = await ontologyreference.remove_germplasmAttribute_ID(associated.ontologyReference_ID, input.addGermplasmAttribute, benignErrorReporter, token);
        benignErrorReporter.push({
            message: `Hint: update ${removed} existing association!`,
        });
    }
    await ontologyreference.add_germplasmAttribute_ID(this.getIdValue(), input.addGermplasmAttribute, benignErrorReporter, token);
    this.germplasmAttribute_ID = input.addGermplasmAttribute;
}

/**
 * add_method - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
ontologyreference.prototype.add_method = async function(input, benignErrorReporter, token) {
    const associated = await models.method.readById(input.addMethod, benignErrorReporter, token);
    if (associated.ontologyReference_ID) {
        const removed = await ontologyreference.remove_method_ID(associated.ontologyReference_ID, input.addMethod, benignErrorReporter, token);
        benignErrorReporter.push({
            message: `Hint: update ${removed} existing association!`,
        });
    }
    await ontologyreference.add_method_ID(this.getIdValue(), input.addMethod, benignErrorReporter, token);
    this.method_ID = input.addMethod;
}

/**
 * add_observationVariable - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
ontologyreference.prototype.add_observationVariable = async function(input, benignErrorReporter, token) {
    const associated = await models.observationvariable.readById(input.addObservationVariable, benignErrorReporter, token);
    if (associated.ontologyReference_ID) {
        const removed = await ontologyreference.remove_observationVariable_ID(associated.ontologyReference_ID, input.addObservationVariable, benignErrorReporter, token);
        benignErrorReporter.push({
            message: `Hint: update ${removed} existing association!`,
        });
    }
    await ontologyreference.add_observationVariable_ID(this.getIdValue(), input.addObservationVariable, benignErrorReporter, token);
    this.observationVariable_ID = input.addObservationVariable;
}

/**
 * add_scale - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
ontologyreference.prototype.add_scale = async function(input, benignErrorReporter, token) {
    const associated = await models.scale.readById(input.addScale, benignErrorReporter, token);
    if (associated.ontologyReference_ID) {
        const removed = await ontologyreference.remove_scale_ID(associated.ontologyReference_ID, input.addScale, benignErrorReporter, token);
        benignErrorReporter.push({
            message: `Hint: update ${removed} existing association!`,
        });
    }
    await ontologyreference.add_scale_ID(this.getIdValue(), input.addScale, benignErrorReporter, token);
    this.scale_ID = input.addScale;
}

/**
 * add_trait - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
ontologyreference.prototype.add_trait = async function(input, benignErrorReporter, token) {
    const associated = await models.trait.readById(input.addTrait, benignErrorReporter, token);
    if (associated.ontologyReference_ID) {
        const removed = await ontologyreference.remove_trait_ID(associated.ontologyReference_ID, input.addTrait, benignErrorReporter, token);
        benignErrorReporter.push({
            message: `Hint: update ${removed} existing association!`,
        });
    }
    await ontologyreference.add_trait_ID(this.getIdValue(), input.addTrait, benignErrorReporter, token);
    this.trait_ID = input.addTrait;
}

/**
 * remove_documentationLinks - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
ontologyreference.prototype.remove_documentationLinks = async function(input, benignErrorReporter, token) {

    await ontologyreference.remove_documentationLinks_IDs(this.getIdValue(), input.removeDocumentationLinks, benignErrorReporter, token);
    this.documentationLinks_IDs = helper.differenceIds(this.documentationLinks_IDs, input.removeDocumentationLinks);
}

/**
 * remove_germplasmAttribute - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
ontologyreference.prototype.remove_germplasmAttribute = async function(input, benignErrorReporter, token) {
    if (input.removeGermplasmAttribute == this.germplasmAttribute_ID) {
        await ontologyreference.remove_germplasmAttribute_ID(this.getIdValue(), input.removeGermplasmAttribute, benignErrorReporter, token);
        this.germplasmAttribute_ID = null;
    }
}

/**
 * remove_method - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
ontologyreference.prototype.remove_method = async function(input, benignErrorReporter, token) {
    if (input.removeMethod == this.method_ID) {
        await ontologyreference.remove_method_ID(this.getIdValue(), input.removeMethod, benignErrorReporter, token);
        this.method_ID = null;
    }
}

/**
 * remove_observationVariable - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
ontologyreference.prototype.remove_observationVariable = async function(input, benignErrorReporter, token) {
    if (input.removeObservationVariable == this.observationVariable_ID) {
        await ontologyreference.remove_observationVariable_ID(this.getIdValue(), input.removeObservationVariable, benignErrorReporter, token);
        this.observationVariable_ID = null;
    }
}

/**
 * remove_scale - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
ontologyreference.prototype.remove_scale = async function(input, benignErrorReporter, token) {
    if (input.removeScale == this.scale_ID) {
        await ontologyreference.remove_scale_ID(this.getIdValue(), input.removeScale, benignErrorReporter, token);
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
ontologyreference.prototype.remove_trait = async function(input, benignErrorReporter, token) {
    if (input.removeTrait == this.trait_ID) {
        await ontologyreference.remove_trait_ID(this.getIdValue(), input.removeTrait, benignErrorReporter, token);
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

    let ontologyreference = await resolvers.readOneOntologyreference({
        ontologyReferenceDbId: id
    }, context);
    //check that record actually exists
    if (ontologyreference === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(ontologyreference.documentationLinks_IDs) ? ontologyreference.documentationLinks_IDs.length : 0;

    get_to_one_associated_fk += [null, undefined].includes(ontologyreference.germplasmAttribute_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(ontologyreference.method_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(ontologyreference.observationVariable_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(ontologyreference.scale_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(ontologyreference.trait_ID) ? 0 : 1;


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
        throw new Error(`ontologyreference with ontologyReferenceDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const ontologyreference_record = await resolvers.readOneOntologyreference({
            ontologyReferenceDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * ontologyreferences - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    ontologyreferences: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'ontologyreference', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "ontologyreferences");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await ontologyreference.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * ontologyreferencesConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    ontologyreferencesConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'ontologyreference', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "ontologyreferencesConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await ontologyreference.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneOntologyreference - Check user authorization and return one record with the specified ontologyReferenceDbId in the ontologyReferenceDbId argument.
     *
     * @param  {number} {ontologyReferenceDbId}    ontologyReferenceDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with ontologyReferenceDbId requested
     */
    readOneOntologyreference: async function({
        ontologyReferenceDbId
    }, context) {
        if (await checkAuthorization(context, 'ontologyreference', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneOntologyreference");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await ontologyreference.readById(ontologyReferenceDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countOntologyreferences - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countOntologyreferences: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'ontologyreference', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await ontologyreference.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateOntologyreferenceForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateOntologyreferenceForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'ontologyreference', 'read');
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
                    ontologyreference,
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
     * validateOntologyreferenceForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateOntologyreferenceForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'ontologyreference', 'read');
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
                    ontologyreference,
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
     * validateOntologyreferenceForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {ontologyReferenceDbId} ontologyReferenceDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateOntologyreferenceForDeletion: async ({
        ontologyReferenceDbId
    }, context) => {
        if ((await checkAuthorization(context, 'ontologyreference', 'read')) === true) {
            try {
                await validForDeletion(ontologyReferenceDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    ontologyreference,
                    ontologyReferenceDbId);
                return true;
            } catch (error) {
                error.input = {
                    ontologyReferenceDbId: ontologyReferenceDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateOntologyreferenceAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {ontologyReferenceDbId} ontologyReferenceDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateOntologyreferenceAfterReading: async ({
        ontologyReferenceDbId
    }, context) => {
        if ((await checkAuthorization(context, 'ontologyreference', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    ontologyreference,
                    ontologyReferenceDbId);
                return true;
            } catch (error) {
                error.input = {
                    ontologyReferenceDbId: ontologyReferenceDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addOntologyreference - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addOntologyreference: async function(input, context) {
        let authorization = await checkAuthorization(context, 'ontologyreference', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.ontologyreference.definition);
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
            let createdOntologyreference = await ontologyreference.addOne(inputSanitized, context.benignErrors, token);
            await createdOntologyreference.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdOntologyreference;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteOntologyreference - Check user authorization and delete a record with the specified ontologyReferenceDbId in the ontologyReferenceDbId argument.
     *
     * @param  {number} {ontologyReferenceDbId}    ontologyReferenceDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteOntologyreference: async function({
        ontologyReferenceDbId
    }, context) {
        if (await checkAuthorization(context, 'ontologyreference', 'delete') === true) {
            if (await validForDeletion(ontologyReferenceDbId, context)) {
                await updateAssociations(ontologyReferenceDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return ontologyreference.deleteOne(ontologyReferenceDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateOntologyreference - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateOntologyreference: async function(input, context) {
        let authorization = await checkAuthorization(context, 'ontologyreference', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.ontologyreference.definition);
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
            let updatedOntologyreference = await ontologyreference.updateOne(inputSanitized, context.benignErrors, token);
            await updatedOntologyreference.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedOntologyreference;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateOntologyreference - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateOntologyreference: async function(_, context) {
        if (await checkAuthorization(context, 'ontologyreference', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return ontologyreference.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * ontologyreferencesZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    ontologyreferencesZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "ontologyreference", "read")) === true) {
            return ontologyreference.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}