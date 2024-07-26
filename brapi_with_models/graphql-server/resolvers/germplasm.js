/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const germplasm = require(path.join(__dirname, '..', 'models', 'index.js')).germplasm;
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
    'addPedigreeNode': 'pedigreenode',
    'addGermplasmOrigin': 'germplasmorigin',
    'addStorageTypes': 'storagetype',
    'addSamples': 'sample',
    'addAttributeValues': 'germplasmattributevalue',
    'addProgenyPedigreeNodes': 'parent',
    'addParentPedigreeNodes': 'progeny',
    'addSiblingPedigreeNodes': 'sibling',
    'addObservations': 'observation',
    'addObservationUnits': 'observationunit',
    'addAdditionalInfo': 'additionalinfo',
    'addExternalReferences': 'externalreference',
    'addDonors': 'donor',
    'addSynonyms': 'synonym',
    'addTaxonIds': 'taxon'
}



/**
 * germplasm.prototype.breedingMethod - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
germplasm.prototype.breedingMethod = async function({
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
                        `Not unique "to_one" association Error: Found > 1 breedingmethods matching germplasm with germplasmDbId ${this.breedingMethod_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the germplasm model. Returning first breedingmethod.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * germplasm.prototype.pedigreeNode - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
germplasm.prototype.pedigreeNode = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.pedigreeNode_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOnePedigreenode({
                [models.pedigreenode.idAttribute()]: this.pedigreeNode_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.pedigreenode.idAttribute(),
                "value": this.pedigreeNode_ID,
                "operator": "eq"
            });
            let found = (await resolvers.pedigreenodesConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 pedigreenodes matching germplasm with germplasmDbId ${this.pedigreeNode_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the germplasm model. Returning first pedigreenode.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * germplasm.prototype.germplasmOrigin - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
germplasm.prototype.germplasmOrigin = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.germplasmOrigin_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneGermplasmorigin({
                [models.germplasmorigin.idAttribute()]: this.germplasmOrigin_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.germplasmorigin.idAttribute(),
                "value": this.germplasmOrigin_ID,
                "operator": "eq"
            });
            let found = (await resolvers.germplasmoriginsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 germplasmorigins matching germplasm with germplasmDbId ${this.germplasmOrigin_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the germplasm model. Returning first germplasmorigin.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * germplasm.prototype.storageTypes - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
germplasm.prototype.storageTypes = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.storageTypes_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneStoragetype({
                [models.storagetype.idAttribute()]: this.storageTypes_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.storagetype.idAttribute(),
                "value": this.storageTypes_ID,
                "operator": "eq"
            });
            let found = (await resolvers.storagetypesConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 storagetypes matching germplasm with germplasmDbId ${this.storageTypes_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the germplasm model. Returning first storagetype.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}

/**
 * germplasm.prototype.samplesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
germplasm.prototype.samplesFilter = function({
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
 * germplasm.prototype.countFilteredSamples - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
germplasm.prototype.countFilteredSamples = function({
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
 * germplasm.prototype.samplesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
germplasm.prototype.samplesConnection = function({
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
 * germplasm.prototype.attributeValuesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
germplasm.prototype.attributeValuesFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.attributeValues_IDs) || this.attributeValues_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.germplasmattributevalue.idAttribute(),
        "value": this.attributeValues_IDs.join(','),
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
 * germplasm.prototype.countFilteredAttributeValues - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
germplasm.prototype.countFilteredAttributeValues = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.attributeValues_IDs) || this.attributeValues_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.germplasmattributevalue.idAttribute(),
        "value": this.attributeValues_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countGermplasmattributevalues({
        search: nsearch
    }, context);
}

/**
 * germplasm.prototype.attributeValuesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
germplasm.prototype.attributeValuesConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.attributeValues_IDs) || this.attributeValues_IDs.length === 0) {
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
        "value": this.attributeValues_IDs.join(','),
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
 * germplasm.prototype.progenyPedigreeNodesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
germplasm.prototype.progenyPedigreeNodesFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.progenyPedigreeNodes_IDs) || this.progenyPedigreeNodes_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.parent.idAttribute(),
        "value": this.progenyPedigreeNodes_IDs.join(','),
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
 * germplasm.prototype.countFilteredProgenyPedigreeNodes - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
germplasm.prototype.countFilteredProgenyPedigreeNodes = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.progenyPedigreeNodes_IDs) || this.progenyPedigreeNodes_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.parent.idAttribute(),
        "value": this.progenyPedigreeNodes_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countParents({
        search: nsearch
    }, context);
}

/**
 * germplasm.prototype.progenyPedigreeNodesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
germplasm.prototype.progenyPedigreeNodesConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.progenyPedigreeNodes_IDs) || this.progenyPedigreeNodes_IDs.length === 0) {
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
        "value": this.progenyPedigreeNodes_IDs.join(','),
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
 * germplasm.prototype.parentPedigreeNodesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
germplasm.prototype.parentPedigreeNodesFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.parentPedigreeNodes_IDs) || this.parentPedigreeNodes_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.progeny.idAttribute(),
        "value": this.parentPedigreeNodes_IDs.join(','),
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
 * germplasm.prototype.countFilteredParentPedigreeNodes - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
germplasm.prototype.countFilteredParentPedigreeNodes = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.parentPedigreeNodes_IDs) || this.parentPedigreeNodes_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.progeny.idAttribute(),
        "value": this.parentPedigreeNodes_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countProgenies({
        search: nsearch
    }, context);
}

/**
 * germplasm.prototype.parentPedigreeNodesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
germplasm.prototype.parentPedigreeNodesConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.parentPedigreeNodes_IDs) || this.parentPedigreeNodes_IDs.length === 0) {
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
        "value": this.parentPedigreeNodes_IDs.join(','),
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
 * germplasm.prototype.siblingPedigreeNodesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
germplasm.prototype.siblingPedigreeNodesFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.siblingPedigreeNodes_IDs) || this.siblingPedigreeNodes_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.sibling.idAttribute(),
        "value": this.siblingPedigreeNodes_IDs.join(','),
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
 * germplasm.prototype.countFilteredSiblingPedigreeNodes - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
germplasm.prototype.countFilteredSiblingPedigreeNodes = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.siblingPedigreeNodes_IDs) || this.siblingPedigreeNodes_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.sibling.idAttribute(),
        "value": this.siblingPedigreeNodes_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countSiblings({
        search: nsearch
    }, context);
}

/**
 * germplasm.prototype.siblingPedigreeNodesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
germplasm.prototype.siblingPedigreeNodesConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.siblingPedigreeNodes_IDs) || this.siblingPedigreeNodes_IDs.length === 0) {
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
        "value": this.siblingPedigreeNodes_IDs.join(','),
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
 * germplasm.prototype.observationsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
germplasm.prototype.observationsFilter = function({
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
 * germplasm.prototype.countFilteredObservations - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
germplasm.prototype.countFilteredObservations = function({
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
 * germplasm.prototype.observationsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
germplasm.prototype.observationsConnection = function({
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
 * germplasm.prototype.observationUnitsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
germplasm.prototype.observationUnitsFilter = function({
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
 * germplasm.prototype.countFilteredObservationUnits - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
germplasm.prototype.countFilteredObservationUnits = function({
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
 * germplasm.prototype.observationUnitsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
germplasm.prototype.observationUnitsConnection = function({
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
 * germplasm.prototype.additionalInfoFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
germplasm.prototype.additionalInfoFilter = function({
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
 * germplasm.prototype.countFilteredAdditionalInfo - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
germplasm.prototype.countFilteredAdditionalInfo = function({
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
 * germplasm.prototype.additionalInfoConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
germplasm.prototype.additionalInfoConnection = function({
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
 * germplasm.prototype.externalReferencesFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
germplasm.prototype.externalReferencesFilter = function({
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
 * germplasm.prototype.countFilteredExternalReferences - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
germplasm.prototype.countFilteredExternalReferences = function({
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
 * germplasm.prototype.externalReferencesConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
germplasm.prototype.externalReferencesConnection = function({
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
 * germplasm.prototype.donorsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
germplasm.prototype.donorsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.donors_IDs) || this.donors_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.donor.idAttribute(),
        "value": this.donors_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.donors({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * germplasm.prototype.countFilteredDonors - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
germplasm.prototype.countFilteredDonors = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.donors_IDs) || this.donors_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.donor.idAttribute(),
        "value": this.donors_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countDonors({
        search: nsearch
    }, context);
}

/**
 * germplasm.prototype.donorsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
germplasm.prototype.donorsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.donors_IDs) || this.donors_IDs.length === 0) {
        return {
            edges: [],
            donors: [],
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
        "field": models.donor.idAttribute(),
        "value": this.donors_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.donorsConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * germplasm.prototype.synonymsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
germplasm.prototype.synonymsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.synonyms_IDs) || this.synonyms_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.synonym.idAttribute(),
        "value": this.synonyms_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.synonyms({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * germplasm.prototype.countFilteredSynonyms - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
germplasm.prototype.countFilteredSynonyms = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.synonyms_IDs) || this.synonyms_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.synonym.idAttribute(),
        "value": this.synonyms_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countSynonyms({
        search: nsearch
    }, context);
}

/**
 * germplasm.prototype.synonymsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
germplasm.prototype.synonymsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.synonyms_IDs) || this.synonyms_IDs.length === 0) {
        return {
            edges: [],
            synonyms: [],
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
        "field": models.synonym.idAttribute(),
        "value": this.synonyms_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.synonymsConnection({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}
/**
 * germplasm.prototype.taxonIdsFilter - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Offset and limit to get the records from and to respectively
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of associated records holding conditions specified by search, order and pagination argument
 */
germplasm.prototype.taxonIdsFilter = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.taxonIds_IDs) || this.taxonIds_IDs.length === 0) {
        return [];
    }
    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.taxon.idAttribute(),
        "value": this.taxonIds_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.taxons({
        search: nsearch,
        order: order,
        pagination: pagination
    }, context);
}

/**
 * germplasm.prototype.countFilteredTaxonIds - Count number of associated records that holds the conditions specified in the search argument
 *
 * @param  {object} {search} description
 * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}          Number of associated records that holds the conditions specified in the search argument
 */
germplasm.prototype.countFilteredTaxonIds = function({
    search
}, context) {

    //return 0 if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.taxonIds_IDs) || this.taxonIds_IDs.length === 0) {
        return 0;
    }

    let nsearch = helper.addSearchField({
        "search": search,
        "field": models.taxon.idAttribute(),
        "value": this.taxonIds_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.countTaxons({
        search: nsearch
    }, context);
}

/**
 * germplasm.prototype.taxonIdsConnection - Check user authorization and return certain number, specified in pagination argument, of records
 * associated with the current instance, this records should also
 * holds the condition of search argument, all of them sorted as specified by the order argument.
 *
 * @param  {object} search     Search argument for filtering associated records
 * @param  {array} order       Type of sorting (ASC, DESC) for each field
 * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
 * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
 */
germplasm.prototype.taxonIdsConnection = function({
    search,
    order,
    pagination
}, context) {

    //return an empty response if the foreignKey Array is empty, no need to query the database
    if (!Array.isArray(this.taxonIds_IDs) || this.taxonIds_IDs.length === 0) {
        return {
            edges: [],
            taxons: [],
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
        "field": models.taxon.idAttribute(),
        "value": this.taxonIds_IDs.join(','),
        "valueType": "Array",
        "operator": "in"
    });
    return resolvers.taxonsConnection({
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
germplasm.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];
    if (helper.isNonEmptyArray(input.addSamples)) {
        promises_add.push(this.add_samples(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addAttributeValues)) {
        promises_add.push(this.add_attributeValues(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addProgenyPedigreeNodes)) {
        promises_add.push(this.add_progenyPedigreeNodes(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addParentPedigreeNodes)) {
        promises_add.push(this.add_parentPedigreeNodes(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addSiblingPedigreeNodes)) {
        promises_add.push(this.add_siblingPedigreeNodes(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addObservations)) {
        promises_add.push(this.add_observations(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addObservationUnits)) {
        promises_add.push(this.add_observationUnits(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addAdditionalInfo)) {
        promises_add.push(this.add_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addExternalReferences)) {
        promises_add.push(this.add_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addDonors)) {
        promises_add.push(this.add_donors(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addSynonyms)) {
        promises_add.push(this.add_synonyms(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.addTaxonIds)) {
        promises_add.push(this.add_taxonIds(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addBreedingMethod)) {
        promises_add.push(this.add_breedingMethod(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addPedigreeNode)) {
        promises_add.push(this.add_pedigreeNode(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addGermplasmOrigin)) {
        promises_add.push(this.add_germplasmOrigin(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addStorageTypes)) {
        promises_add.push(this.add_storageTypes(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];
    if (helper.isNonEmptyArray(input.removeSamples)) {
        promises_remove.push(this.remove_samples(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeAttributeValues)) {
        promises_remove.push(this.remove_attributeValues(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeProgenyPedigreeNodes)) {
        promises_remove.push(this.remove_progenyPedigreeNodes(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeParentPedigreeNodes)) {
        promises_remove.push(this.remove_parentPedigreeNodes(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeSiblingPedigreeNodes)) {
        promises_remove.push(this.remove_siblingPedigreeNodes(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeObservations)) {
        promises_remove.push(this.remove_observations(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeObservationUnits)) {
        promises_remove.push(this.remove_observationUnits(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeAdditionalInfo)) {
        promises_remove.push(this.remove_additionalInfo(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeExternalReferences)) {
        promises_remove.push(this.remove_externalReferences(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeDonors)) {
        promises_remove.push(this.remove_donors(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeSynonyms)) {
        promises_remove.push(this.remove_synonyms(input, benignErrorReporter, token));
    }
    if (helper.isNonEmptyArray(input.removeTaxonIds)) {
        promises_remove.push(this.remove_taxonIds(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeBreedingMethod)) {
        promises_remove.push(this.remove_breedingMethod(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removePedigreeNode)) {
        promises_remove.push(this.remove_pedigreeNode(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeGermplasmOrigin)) {
        promises_remove.push(this.remove_germplasmOrigin(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeStorageTypes)) {
        promises_remove.push(this.remove_storageTypes(input, benignErrorReporter, token));
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
germplasm.prototype.add_samples = async function(input, benignErrorReporter, token) {

    await germplasm.add_samples_IDs(this.getIdValue(), input.addSamples, benignErrorReporter, token);
    this.samples_IDs = helper.unionIds(this.samples_IDs, input.addSamples);
}

/**
 * add_attributeValues - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.add_attributeValues = async function(input, benignErrorReporter, token) {

    await germplasm.add_attributeValues_IDs(this.getIdValue(), input.addAttributeValues, benignErrorReporter, token);
    this.attributeValues_IDs = helper.unionIds(this.attributeValues_IDs, input.addAttributeValues);
}

/**
 * add_progenyPedigreeNodes - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.add_progenyPedigreeNodes = async function(input, benignErrorReporter, token) {

    await germplasm.add_progenyPedigreeNodes_IDs(this.getIdValue(), input.addProgenyPedigreeNodes, benignErrorReporter, token);
    this.progenyPedigreeNodes_IDs = helper.unionIds(this.progenyPedigreeNodes_IDs, input.addProgenyPedigreeNodes);
}

/**
 * add_parentPedigreeNodes - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.add_parentPedigreeNodes = async function(input, benignErrorReporter, token) {

    await germplasm.add_parentPedigreeNodes_IDs(this.getIdValue(), input.addParentPedigreeNodes, benignErrorReporter, token);
    this.parentPedigreeNodes_IDs = helper.unionIds(this.parentPedigreeNodes_IDs, input.addParentPedigreeNodes);
}

/**
 * add_siblingPedigreeNodes - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.add_siblingPedigreeNodes = async function(input, benignErrorReporter, token) {

    await germplasm.add_siblingPedigreeNodes_IDs(this.getIdValue(), input.addSiblingPedigreeNodes, benignErrorReporter, token);
    this.siblingPedigreeNodes_IDs = helper.unionIds(this.siblingPedigreeNodes_IDs, input.addSiblingPedigreeNodes);
}

/**
 * add_observations - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.add_observations = async function(input, benignErrorReporter, token) {

    await germplasm.add_observations_IDs(this.getIdValue(), input.addObservations, benignErrorReporter, token);
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
germplasm.prototype.add_observationUnits = async function(input, benignErrorReporter, token) {

    await germplasm.add_observationUnits_IDs(this.getIdValue(), input.addObservationUnits, benignErrorReporter, token);
    this.observationUnits_IDs = helper.unionIds(this.observationUnits_IDs, input.addObservationUnits);
}

/**
 * add_additionalInfo - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.add_additionalInfo = async function(input, benignErrorReporter, token) {

    await germplasm.add_additionalInfo_IDs(this.getIdValue(), input.addAdditionalInfo, benignErrorReporter, token);
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
germplasm.prototype.add_externalReferences = async function(input, benignErrorReporter, token) {

    await germplasm.add_externalReferences_IDs(this.getIdValue(), input.addExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.unionIds(this.externalReferences_IDs, input.addExternalReferences);
}

/**
 * add_donors - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.add_donors = async function(input, benignErrorReporter, token) {

    await germplasm.add_donors_IDs(this.getIdValue(), input.addDonors, benignErrorReporter, token);
    this.donors_IDs = helper.unionIds(this.donors_IDs, input.addDonors);
}

/**
 * add_synonyms - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.add_synonyms = async function(input, benignErrorReporter, token) {

    await germplasm.add_synonyms_IDs(this.getIdValue(), input.addSynonyms, benignErrorReporter, token);
    this.synonyms_IDs = helper.unionIds(this.synonyms_IDs, input.addSynonyms);
}

/**
 * add_taxonIds - field Mutation for to_many associations to add
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.add_taxonIds = async function(input, benignErrorReporter, token) {

    await germplasm.add_taxonIds_IDs(this.getIdValue(), input.addTaxonIds, benignErrorReporter, token);
    this.taxonIds_IDs = helper.unionIds(this.taxonIds_IDs, input.addTaxonIds);
}

/**
 * add_breedingMethod - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.add_breedingMethod = async function(input, benignErrorReporter, token) {
    await germplasm.add_breedingMethod_ID(this.getIdValue(), input.addBreedingMethod, benignErrorReporter, token);
    this.breedingMethod_ID = input.addBreedingMethod;
}

/**
 * add_pedigreeNode - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.add_pedigreeNode = async function(input, benignErrorReporter, token) {
    const associated = await models.pedigreenode.readById(input.addPedigreeNode, benignErrorReporter, token);
    if (associated.germplasm_ID) {
        const removed = await germplasm.remove_pedigreeNode_ID(associated.germplasm_ID, input.addPedigreeNode, benignErrorReporter, token);
        benignErrorReporter.push({
            message: `Hint: update ${removed} existing association!`,
        });
    }
    await germplasm.add_pedigreeNode_ID(this.getIdValue(), input.addPedigreeNode, benignErrorReporter, token);
    this.pedigreeNode_ID = input.addPedigreeNode;
}

/**
 * add_germplasmOrigin - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.add_germplasmOrigin = async function(input, benignErrorReporter, token) {
    await germplasm.add_germplasmOrigin_ID(this.getIdValue(), input.addGermplasmOrigin, benignErrorReporter, token);
    this.germplasmOrigin_ID = input.addGermplasmOrigin;
}

/**
 * add_storageTypes - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.add_storageTypes = async function(input, benignErrorReporter, token) {
    await germplasm.add_storageTypes_ID(this.getIdValue(), input.addStorageTypes, benignErrorReporter, token);
    this.storageTypes_ID = input.addStorageTypes;
}

/**
 * remove_samples - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.remove_samples = async function(input, benignErrorReporter, token) {

    await germplasm.remove_samples_IDs(this.getIdValue(), input.removeSamples, benignErrorReporter, token);
    this.samples_IDs = helper.differenceIds(this.samples_IDs, input.removeSamples);
}

/**
 * remove_attributeValues - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.remove_attributeValues = async function(input, benignErrorReporter, token) {

    await germplasm.remove_attributeValues_IDs(this.getIdValue(), input.removeAttributeValues, benignErrorReporter, token);
    this.attributeValues_IDs = helper.differenceIds(this.attributeValues_IDs, input.removeAttributeValues);
}

/**
 * remove_progenyPedigreeNodes - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.remove_progenyPedigreeNodes = async function(input, benignErrorReporter, token) {

    await germplasm.remove_progenyPedigreeNodes_IDs(this.getIdValue(), input.removeProgenyPedigreeNodes, benignErrorReporter, token);
    this.progenyPedigreeNodes_IDs = helper.differenceIds(this.progenyPedigreeNodes_IDs, input.removeProgenyPedigreeNodes);
}

/**
 * remove_parentPedigreeNodes - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.remove_parentPedigreeNodes = async function(input, benignErrorReporter, token) {

    await germplasm.remove_parentPedigreeNodes_IDs(this.getIdValue(), input.removeParentPedigreeNodes, benignErrorReporter, token);
    this.parentPedigreeNodes_IDs = helper.differenceIds(this.parentPedigreeNodes_IDs, input.removeParentPedigreeNodes);
}

/**
 * remove_siblingPedigreeNodes - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.remove_siblingPedigreeNodes = async function(input, benignErrorReporter, token) {

    await germplasm.remove_siblingPedigreeNodes_IDs(this.getIdValue(), input.removeSiblingPedigreeNodes, benignErrorReporter, token);
    this.siblingPedigreeNodes_IDs = helper.differenceIds(this.siblingPedigreeNodes_IDs, input.removeSiblingPedigreeNodes);
}

/**
 * remove_observations - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.remove_observations = async function(input, benignErrorReporter, token) {

    await germplasm.remove_observations_IDs(this.getIdValue(), input.removeObservations, benignErrorReporter, token);
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
germplasm.prototype.remove_observationUnits = async function(input, benignErrorReporter, token) {

    await germplasm.remove_observationUnits_IDs(this.getIdValue(), input.removeObservationUnits, benignErrorReporter, token);
    this.observationUnits_IDs = helper.differenceIds(this.observationUnits_IDs, input.removeObservationUnits);
}

/**
 * remove_additionalInfo - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.remove_additionalInfo = async function(input, benignErrorReporter, token) {

    await germplasm.remove_additionalInfo_IDs(this.getIdValue(), input.removeAdditionalInfo, benignErrorReporter, token);
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
germplasm.prototype.remove_externalReferences = async function(input, benignErrorReporter, token) {

    await germplasm.remove_externalReferences_IDs(this.getIdValue(), input.removeExternalReferences, benignErrorReporter, token);
    this.externalReferences_IDs = helper.differenceIds(this.externalReferences_IDs, input.removeExternalReferences);
}

/**
 * remove_donors - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.remove_donors = async function(input, benignErrorReporter, token) {

    await germplasm.remove_donors_IDs(this.getIdValue(), input.removeDonors, benignErrorReporter, token);
    this.donors_IDs = helper.differenceIds(this.donors_IDs, input.removeDonors);
}

/**
 * remove_synonyms - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.remove_synonyms = async function(input, benignErrorReporter, token) {

    await germplasm.remove_synonyms_IDs(this.getIdValue(), input.removeSynonyms, benignErrorReporter, token);
    this.synonyms_IDs = helper.differenceIds(this.synonyms_IDs, input.removeSynonyms);
}

/**
 * remove_taxonIds - field Mutation for to_many associations to remove
 * uses bulkAssociate to efficiently update associations
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.remove_taxonIds = async function(input, benignErrorReporter, token) {

    await germplasm.remove_taxonIds_IDs(this.getIdValue(), input.removeTaxonIds, benignErrorReporter, token);
    this.taxonIds_IDs = helper.differenceIds(this.taxonIds_IDs, input.removeTaxonIds);
}

/**
 * remove_breedingMethod - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.remove_breedingMethod = async function(input, benignErrorReporter, token) {
    if (input.removeBreedingMethod == this.breedingMethod_ID) {
        await germplasm.remove_breedingMethod_ID(this.getIdValue(), input.removeBreedingMethod, benignErrorReporter, token);
        this.breedingMethod_ID = null;
    }
}

/**
 * remove_pedigreeNode - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.remove_pedigreeNode = async function(input, benignErrorReporter, token) {
    if (input.removePedigreeNode == this.pedigreeNode_ID) {
        await germplasm.remove_pedigreeNode_ID(this.getIdValue(), input.removePedigreeNode, benignErrorReporter, token);
        this.pedigreeNode_ID = null;
    }
}

/**
 * remove_germplasmOrigin - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.remove_germplasmOrigin = async function(input, benignErrorReporter, token) {
    if (input.removeGermplasmOrigin == this.germplasmOrigin_ID) {
        await germplasm.remove_germplasmOrigin_ID(this.getIdValue(), input.removeGermplasmOrigin, benignErrorReporter, token);
        this.germplasmOrigin_ID = null;
    }
}

/**
 * remove_storageTypes - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
germplasm.prototype.remove_storageTypes = async function(input, benignErrorReporter, token) {
    if (input.removeStorageTypes == this.storageTypes_ID) {
        await germplasm.remove_storageTypes_ID(this.getIdValue(), input.removeStorageTypes, benignErrorReporter, token);
        this.storageTypes_ID = null;
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

    let germplasm = await resolvers.readOneGermplasm({
        germplasmDbId: id
    }, context);
    //check that record actually exists
    if (germplasm === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_many_associated_fk += Array.isArray(germplasm.samples_IDs) ? germplasm.samples_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(germplasm.attributeValues_IDs) ? germplasm.attributeValues_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(germplasm.progenyPedigreeNodes_IDs) ? germplasm.progenyPedigreeNodes_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(germplasm.parentPedigreeNodes_IDs) ? germplasm.parentPedigreeNodes_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(germplasm.siblingPedigreeNodes_IDs) ? germplasm.siblingPedigreeNodes_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(germplasm.observations_IDs) ? germplasm.observations_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(germplasm.observationUnits_IDs) ? germplasm.observationUnits_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(germplasm.additionalInfo_IDs) ? germplasm.additionalInfo_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(germplasm.externalReferences_IDs) ? germplasm.externalReferences_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(germplasm.donors_IDs) ? germplasm.donors_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(germplasm.synonyms_IDs) ? germplasm.synonyms_IDs.length : 0;

    get_to_many_associated_fk += Array.isArray(germplasm.taxonIds_IDs) ? germplasm.taxonIds_IDs.length : 0;

    get_to_one_associated_fk += [null, undefined].includes(germplasm.breedingMethod_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(germplasm.pedigreeNode_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(germplasm.germplasmOrigin_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(germplasm.storageTypes_ID) ? 0 : 1;


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
        throw new Error(`germplasm with germplasmDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const germplasm_record = await resolvers.readOneGermplasm({
            germplasmDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * germplasms - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    germplasms: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'germplasm', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "germplasms");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await germplasm.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * germplasmsConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    germplasmsConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'germplasm', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "germplasmsConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await germplasm.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneGermplasm - Check user authorization and return one record with the specified germplasmDbId in the germplasmDbId argument.
     *
     * @param  {number} {germplasmDbId}    germplasmDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with germplasmDbId requested
     */
    readOneGermplasm: async function({
        germplasmDbId
    }, context) {
        if (await checkAuthorization(context, 'germplasm', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneGermplasm");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await germplasm.readById(germplasmDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countGermplasms - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countGermplasms: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'germplasm', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await germplasm.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateGermplasmForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateGermplasmForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'germplasm', 'read');
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
                    germplasm,
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
     * validateGermplasmForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateGermplasmForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'germplasm', 'read');
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
                    germplasm,
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
     * validateGermplasmForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {germplasmDbId} germplasmDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateGermplasmForDeletion: async ({
        germplasmDbId
    }, context) => {
        if ((await checkAuthorization(context, 'germplasm', 'read')) === true) {
            try {
                await validForDeletion(germplasmDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    germplasm,
                    germplasmDbId);
                return true;
            } catch (error) {
                error.input = {
                    germplasmDbId: germplasmDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateGermplasmAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {germplasmDbId} germplasmDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateGermplasmAfterReading: async ({
        germplasmDbId
    }, context) => {
        if ((await checkAuthorization(context, 'germplasm', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    germplasm,
                    germplasmDbId);
                return true;
            } catch (error) {
                error.input = {
                    germplasmDbId: germplasmDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addGermplasm - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addGermplasm: async function(input, context) {
        let authorization = await checkAuthorization(context, 'germplasm', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.germplasm.definition);
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
            let createdGermplasm = await germplasm.addOne(inputSanitized, context.benignErrors, token);
            await createdGermplasm.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdGermplasm;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteGermplasm - Check user authorization and delete a record with the specified germplasmDbId in the germplasmDbId argument.
     *
     * @param  {number} {germplasmDbId}    germplasmDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteGermplasm: async function({
        germplasmDbId
    }, context) {
        if (await checkAuthorization(context, 'germplasm', 'delete') === true) {
            if (await validForDeletion(germplasmDbId, context)) {
                await updateAssociations(germplasmDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return germplasm.deleteOne(germplasmDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateGermplasm - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateGermplasm: async function(input, context) {
        let authorization = await checkAuthorization(context, 'germplasm', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.germplasm.definition);
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
            let updatedGermplasm = await germplasm.updateOne(inputSanitized, context.benignErrors, token);
            await updatedGermplasm.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedGermplasm;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateGermplasm - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateGermplasm: async function(_, context) {
        if (await checkAuthorization(context, 'germplasm', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return germplasm.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * germplasmsZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    germplasmsZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "germplasm", "read")) === true) {
            return germplasm.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}