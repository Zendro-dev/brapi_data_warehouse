/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const additionalinfo = require(path.join(__dirname, '..', 'models', 'index.js')).additionalinfo;
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
    'addCall': 'call',
    'addCallSet': 'callset',
    'addCross': 'cross',
    'addCrossingProject': 'crossingproject',
    'addEvent': 'event',
    'addGenomeMap': 'genomemap',
    'addGermplasm': 'germplasm',
    'addGermplasmAttribute': 'germplasmattribute',
    'addGermplasmAttributeValue': 'germplasmattributevalue',
    'addImage': 'image',
    'addList': 'list',
    'addLocation': 'location',
    'addMarkerPosition': 'markerposition',
    'addMethod': 'method',
    'addObservation': 'observation',
    'addObservationUnit': 'observationunit',
    'addObservationVariable': 'observationvariable',
    'addOntology': 'ontology',
    'addPerson': 'person',
    'addPedigreeNode': 'pedigreenode',
    'addPlannedCross': 'plannedcross',
    'addPlate': 'plate',
    'addProgram': 'program',
    'addReference': 'reference',
    'addReferenceSet': 'referenceset',
    'addSample': 'sample',
    'addScale': 'scale',
    'addSeedLot': 'seedlot',
    'addSeedLotTransaction': 'seedlottransaction',
    'addStudy': 'study',
    'addTrait': 'trait',
    'addTrial': 'trial',
    'addVariant': 'variant',
    'addVariantSet': 'variantset'
}



/**
 * additionalinfo.prototype.call - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.call = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.call_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneCall({
                [models.call.idAttribute()]: this.call_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.call.idAttribute(),
                "value": this.call_ID,
                "operator": "eq"
            });
            let found = (await resolvers.callsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 calls matching additionalinfo with additionalInfoDbId ${this.call_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first call.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.callSet - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.callSet = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.callSet_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneCallset({
                [models.callset.idAttribute()]: this.callSet_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.callset.idAttribute(),
                "value": this.callSet_ID,
                "operator": "eq"
            });
            let found = (await resolvers.callsetsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 callsets matching additionalinfo with additionalInfoDbId ${this.callSet_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first callset.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.cross - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.cross = async function({
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
                        `Not unique "to_one" association Error: Found > 1 crosses matching additionalinfo with additionalInfoDbId ${this.cross_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first cross.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.crossingProject - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.crossingProject = async function({
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
                        `Not unique "to_one" association Error: Found > 1 crossingprojects matching additionalinfo with additionalInfoDbId ${this.crossingProject_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first crossingproject.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.event - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.event = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.event_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneEvent({
                [models.event.idAttribute()]: this.event_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.event.idAttribute(),
                "value": this.event_ID,
                "operator": "eq"
            });
            let found = (await resolvers.eventsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 events matching additionalinfo with additionalInfoDbId ${this.event_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first event.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.genomeMap - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.genomeMap = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.genomeMap_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneGenomemap({
                [models.genomemap.idAttribute()]: this.genomeMap_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.genomemap.idAttribute(),
                "value": this.genomeMap_ID,
                "operator": "eq"
            });
            let found = (await resolvers.genomemapsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 genomemaps matching additionalinfo with additionalInfoDbId ${this.genomeMap_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first genomemap.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.germplasm - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.germplasm = async function({
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
                        `Not unique "to_one" association Error: Found > 1 germplasms matching additionalinfo with additionalInfoDbId ${this.germplasm_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first germplasm.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.germplasmAttribute - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.germplasmAttribute = async function({
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
                        `Not unique "to_one" association Error: Found > 1 germplasmattributes matching additionalinfo with additionalInfoDbId ${this.germplasmAttribute_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first germplasmattribute.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.germplasmAttributeValue - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.germplasmAttributeValue = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.germplasmAttributeValue_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneGermplasmattributevalue({
                [models.germplasmattributevalue.idAttribute()]: this.germplasmAttributeValue_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.germplasmattributevalue.idAttribute(),
                "value": this.germplasmAttributeValue_ID,
                "operator": "eq"
            });
            let found = (await resolvers.germplasmattributevaluesConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 germplasmattributevalues matching additionalinfo with additionalInfoDbId ${this.germplasmAttributeValue_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first germplasmattributevalue.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.image - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.image = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.image_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneImage({
                [models.image.idAttribute()]: this.image_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.image.idAttribute(),
                "value": this.image_ID,
                "operator": "eq"
            });
            let found = (await resolvers.imagesConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 images matching additionalinfo with additionalInfoDbId ${this.image_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first image.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.list - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.list = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.list_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneList({
                [models.list.idAttribute()]: this.list_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.list.idAttribute(),
                "value": this.list_ID,
                "operator": "eq"
            });
            let found = (await resolvers.listsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 lists matching additionalinfo with additionalInfoDbId ${this.list_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first list.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.location - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.location = async function({
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
                        `Not unique "to_one" association Error: Found > 1 locations matching additionalinfo with additionalInfoDbId ${this.location_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first location.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.markerPosition - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.markerPosition = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.markerPosition_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneMarkerposition({
                [models.markerposition.idAttribute()]: this.markerPosition_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.markerposition.idAttribute(),
                "value": this.markerPosition_ID,
                "operator": "eq"
            });
            let found = (await resolvers.markerpositionsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 markerpositions matching additionalinfo with additionalInfoDbId ${this.markerPosition_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first markerposition.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.method - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.method = async function({
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
                        `Not unique "to_one" association Error: Found > 1 methods matching additionalinfo with additionalInfoDbId ${this.method_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first method.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.observation - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.observation = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.observation_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneObservation({
                [models.observation.idAttribute()]: this.observation_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.observation.idAttribute(),
                "value": this.observation_ID,
                "operator": "eq"
            });
            let found = (await resolvers.observationsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 observations matching additionalinfo with additionalInfoDbId ${this.observation_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first observation.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.observationUnit - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.observationUnit = async function({
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
                        `Not unique "to_one" association Error: Found > 1 observationunits matching additionalinfo with additionalInfoDbId ${this.observationUnit_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first observationunit.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.observationVariable - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.observationVariable = async function({
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
                        `Not unique "to_one" association Error: Found > 1 observationvariables matching additionalinfo with additionalInfoDbId ${this.observationVariable_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first observationvariable.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.ontology - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.ontology = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.ontology_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneOntology({
                [models.ontology.idAttribute()]: this.ontology_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.ontology.idAttribute(),
                "value": this.ontology_ID,
                "operator": "eq"
            });
            let found = (await resolvers.ontologiesConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 ontologies matching additionalinfo with additionalInfoDbId ${this.ontology_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first ontology.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.person - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.person = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.person_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOnePerson({
                [models.person.idAttribute()]: this.person_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.person.idAttribute(),
                "value": this.person_ID,
                "operator": "eq"
            });
            let found = (await resolvers.peopleConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 people matching additionalinfo with additionalInfoDbId ${this.person_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first person.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.pedigreeNode - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.pedigreeNode = async function({
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
                        `Not unique "to_one" association Error: Found > 1 pedigreenodes matching additionalinfo with additionalInfoDbId ${this.pedigreeNode_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first pedigreenode.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.plannedCross - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.plannedCross = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.plannedCross_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOnePlannedcross({
                [models.plannedcross.idAttribute()]: this.plannedCross_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.plannedcross.idAttribute(),
                "value": this.plannedCross_ID,
                "operator": "eq"
            });
            let found = (await resolvers.plannedcrossesConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 plannedcrosses matching additionalinfo with additionalInfoDbId ${this.plannedCross_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first plannedcross.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.plate - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.plate = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.plate_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOnePlate({
                [models.plate.idAttribute()]: this.plate_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.plate.idAttribute(),
                "value": this.plate_ID,
                "operator": "eq"
            });
            let found = (await resolvers.platesConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 plates matching additionalinfo with additionalInfoDbId ${this.plate_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first plate.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.program - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.program = async function({
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
                        `Not unique "to_one" association Error: Found > 1 programs matching additionalinfo with additionalInfoDbId ${this.program_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first program.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.reference - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.reference = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.reference_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneReference({
                [models.reference.idAttribute()]: this.reference_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.reference.idAttribute(),
                "value": this.reference_ID,
                "operator": "eq"
            });
            let found = (await resolvers.referencesConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 references matching additionalinfo with additionalInfoDbId ${this.reference_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first reference.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.referenceSet - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.referenceSet = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.referenceSet_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneReferenceset({
                [models.referenceset.idAttribute()]: this.referenceSet_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.referenceset.idAttribute(),
                "value": this.referenceSet_ID,
                "operator": "eq"
            });
            let found = (await resolvers.referencesetsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 referencesets matching additionalinfo with additionalInfoDbId ${this.referenceSet_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first referenceset.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.sample - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.sample = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.sample_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneSample({
                [models.sample.idAttribute()]: this.sample_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.sample.idAttribute(),
                "value": this.sample_ID,
                "operator": "eq"
            });
            let found = (await resolvers.samplesConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 samples matching additionalinfo with additionalInfoDbId ${this.sample_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first sample.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.scale - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.scale = async function({
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
                        `Not unique "to_one" association Error: Found > 1 scales matching additionalinfo with additionalInfoDbId ${this.scale_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first scale.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.seedLot - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.seedLot = async function({
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
                        `Not unique "to_one" association Error: Found > 1 seedlots matching additionalinfo with additionalInfoDbId ${this.seedLot_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first seedlot.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.seedLotTransaction - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.seedLotTransaction = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.seedLotTransaction_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneSeedlottransaction({
                [models.seedlottransaction.idAttribute()]: this.seedLotTransaction_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.seedlottransaction.idAttribute(),
                "value": this.seedLotTransaction_ID,
                "operator": "eq"
            });
            let found = (await resolvers.seedlottransactionsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 seedlottransactions matching additionalinfo with additionalInfoDbId ${this.seedLotTransaction_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first seedlottransaction.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.study - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.study = async function({
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
                        `Not unique "to_one" association Error: Found > 1 studies matching additionalinfo with additionalInfoDbId ${this.study_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first study.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.trait - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.trait = async function({
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
                        `Not unique "to_one" association Error: Found > 1 traits matching additionalinfo with additionalInfoDbId ${this.trait_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first trait.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.trial - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.trial = async function({
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
                        `Not unique "to_one" association Error: Found > 1 trials matching additionalinfo with additionalInfoDbId ${this.trial_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first trial.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.variant - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.variant = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.variant_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneVariant({
                [models.variant.idAttribute()]: this.variant_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.variant.idAttribute(),
                "value": this.variant_ID,
                "operator": "eq"
            });
            let found = (await resolvers.variantsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 variants matching additionalinfo with additionalInfoDbId ${this.variant_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first variant.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * additionalinfo.prototype.variantSet - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
additionalinfo.prototype.variantSet = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.variantSet_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneVariantset({
                [models.variantset.idAttribute()]: this.variantSet_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.variantset.idAttribute(),
                "value": this.variantSet_ID,
                "operator": "eq"
            });
            let found = (await resolvers.variantsetsConnection({
                search: nsearch,
                pagination: {
                    first: 1
                }
            }, context)).edges;
            if (found.length > 0) {
                if (found.length > 1) {
                    context.benignErrors.push(new Error(
                        `Not unique "to_one" association Error: Found > 1 variantsets matching additionalinfo with additionalInfoDbId ${this.variantSet_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the additionalinfo model. Returning first variantset.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}





/**
 * handleAssociations - handles the given associations in the create and update case.
 *
 * @param {object} input   Info of each field to create the new record
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];

    if (helper.isNotUndefinedAndNotNull(input.addCall)) {
        promises_add.push(this.add_call(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addCallSet)) {
        promises_add.push(this.add_callSet(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addCross)) {
        promises_add.push(this.add_cross(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addCrossingProject)) {
        promises_add.push(this.add_crossingProject(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addEvent)) {
        promises_add.push(this.add_event(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addGenomeMap)) {
        promises_add.push(this.add_genomeMap(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addGermplasm)) {
        promises_add.push(this.add_germplasm(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addGermplasmAttribute)) {
        promises_add.push(this.add_germplasmAttribute(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addGermplasmAttributeValue)) {
        promises_add.push(this.add_germplasmAttributeValue(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addImage)) {
        promises_add.push(this.add_image(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addList)) {
        promises_add.push(this.add_list(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addLocation)) {
        promises_add.push(this.add_location(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addMarkerPosition)) {
        promises_add.push(this.add_markerPosition(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addMethod)) {
        promises_add.push(this.add_method(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addObservation)) {
        promises_add.push(this.add_observation(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addObservationUnit)) {
        promises_add.push(this.add_observationUnit(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addObservationVariable)) {
        promises_add.push(this.add_observationVariable(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addOntology)) {
        promises_add.push(this.add_ontology(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addPerson)) {
        promises_add.push(this.add_person(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addPedigreeNode)) {
        promises_add.push(this.add_pedigreeNode(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addPlannedCross)) {
        promises_add.push(this.add_plannedCross(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addPlate)) {
        promises_add.push(this.add_plate(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addProgram)) {
        promises_add.push(this.add_program(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addReference)) {
        promises_add.push(this.add_reference(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addReferenceSet)) {
        promises_add.push(this.add_referenceSet(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addSample)) {
        promises_add.push(this.add_sample(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addScale)) {
        promises_add.push(this.add_scale(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addSeedLot)) {
        promises_add.push(this.add_seedLot(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addSeedLotTransaction)) {
        promises_add.push(this.add_seedLotTransaction(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addStudy)) {
        promises_add.push(this.add_study(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addTrait)) {
        promises_add.push(this.add_trait(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addTrial)) {
        promises_add.push(this.add_trial(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addVariant)) {
        promises_add.push(this.add_variant(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addVariantSet)) {
        promises_add.push(this.add_variantSet(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];

    if (helper.isNotUndefinedAndNotNull(input.removeCall)) {
        promises_remove.push(this.remove_call(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeCallSet)) {
        promises_remove.push(this.remove_callSet(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeCross)) {
        promises_remove.push(this.remove_cross(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeCrossingProject)) {
        promises_remove.push(this.remove_crossingProject(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeEvent)) {
        promises_remove.push(this.remove_event(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeGenomeMap)) {
        promises_remove.push(this.remove_genomeMap(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeGermplasm)) {
        promises_remove.push(this.remove_germplasm(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeGermplasmAttribute)) {
        promises_remove.push(this.remove_germplasmAttribute(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeGermplasmAttributeValue)) {
        promises_remove.push(this.remove_germplasmAttributeValue(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeImage)) {
        promises_remove.push(this.remove_image(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeList)) {
        promises_remove.push(this.remove_list(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeLocation)) {
        promises_remove.push(this.remove_location(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeMarkerPosition)) {
        promises_remove.push(this.remove_markerPosition(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeMethod)) {
        promises_remove.push(this.remove_method(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeObservation)) {
        promises_remove.push(this.remove_observation(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeObservationUnit)) {
        promises_remove.push(this.remove_observationUnit(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeObservationVariable)) {
        promises_remove.push(this.remove_observationVariable(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeOntology)) {
        promises_remove.push(this.remove_ontology(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removePerson)) {
        promises_remove.push(this.remove_person(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removePedigreeNode)) {
        promises_remove.push(this.remove_pedigreeNode(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removePlannedCross)) {
        promises_remove.push(this.remove_plannedCross(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removePlate)) {
        promises_remove.push(this.remove_plate(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeProgram)) {
        promises_remove.push(this.remove_program(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeReference)) {
        promises_remove.push(this.remove_reference(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeReferenceSet)) {
        promises_remove.push(this.remove_referenceSet(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeSample)) {
        promises_remove.push(this.remove_sample(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeScale)) {
        promises_remove.push(this.remove_scale(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeSeedLot)) {
        promises_remove.push(this.remove_seedLot(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeSeedLotTransaction)) {
        promises_remove.push(this.remove_seedLotTransaction(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeStudy)) {
        promises_remove.push(this.remove_study(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeTrait)) {
        promises_remove.push(this.remove_trait(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeTrial)) {
        promises_remove.push(this.remove_trial(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeVariant)) {
        promises_remove.push(this.remove_variant(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeVariantSet)) {
        promises_remove.push(this.remove_variantSet(input, benignErrorReporter, token));
    }

    await Promise.all(promises_remove);

}
/**
 * add_call - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_call = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_call_ID(this.getIdValue(), input.addCall, benignErrorReporter, token);
    this.call_ID = input.addCall;
}

/**
 * add_callSet - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_callSet = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_callSet_ID(this.getIdValue(), input.addCallSet, benignErrorReporter, token);
    this.callSet_ID = input.addCallSet;
}

/**
 * add_cross - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_cross = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_cross_ID(this.getIdValue(), input.addCross, benignErrorReporter, token);
    this.cross_ID = input.addCross;
}

/**
 * add_crossingProject - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_crossingProject = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_crossingProject_ID(this.getIdValue(), input.addCrossingProject, benignErrorReporter, token);
    this.crossingProject_ID = input.addCrossingProject;
}

/**
 * add_event - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_event = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_event_ID(this.getIdValue(), input.addEvent, benignErrorReporter, token);
    this.event_ID = input.addEvent;
}

/**
 * add_genomeMap - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_genomeMap = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_genomeMap_ID(this.getIdValue(), input.addGenomeMap, benignErrorReporter, token);
    this.genomeMap_ID = input.addGenomeMap;
}

/**
 * add_germplasm - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_germplasm = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_germplasm_ID(this.getIdValue(), input.addGermplasm, benignErrorReporter, token);
    this.germplasm_ID = input.addGermplasm;
}

/**
 * add_germplasmAttribute - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_germplasmAttribute = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_germplasmAttribute_ID(this.getIdValue(), input.addGermplasmAttribute, benignErrorReporter, token);
    this.germplasmAttribute_ID = input.addGermplasmAttribute;
}

/**
 * add_germplasmAttributeValue - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_germplasmAttributeValue = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_germplasmAttributeValue_ID(this.getIdValue(), input.addGermplasmAttributeValue, benignErrorReporter, token);
    this.germplasmAttributeValue_ID = input.addGermplasmAttributeValue;
}

/**
 * add_image - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_image = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_image_ID(this.getIdValue(), input.addImage, benignErrorReporter, token);
    this.image_ID = input.addImage;
}

/**
 * add_list - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_list = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_list_ID(this.getIdValue(), input.addList, benignErrorReporter, token);
    this.list_ID = input.addList;
}

/**
 * add_location - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_location = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_location_ID(this.getIdValue(), input.addLocation, benignErrorReporter, token);
    this.location_ID = input.addLocation;
}

/**
 * add_markerPosition - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_markerPosition = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_markerPosition_ID(this.getIdValue(), input.addMarkerPosition, benignErrorReporter, token);
    this.markerPosition_ID = input.addMarkerPosition;
}

/**
 * add_method - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_method = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_method_ID(this.getIdValue(), input.addMethod, benignErrorReporter, token);
    this.method_ID = input.addMethod;
}

/**
 * add_observation - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_observation = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_observation_ID(this.getIdValue(), input.addObservation, benignErrorReporter, token);
    this.observation_ID = input.addObservation;
}

/**
 * add_observationUnit - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_observationUnit = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_observationUnit_ID(this.getIdValue(), input.addObservationUnit, benignErrorReporter, token);
    this.observationUnit_ID = input.addObservationUnit;
}

/**
 * add_observationVariable - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_observationVariable = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_observationVariable_ID(this.getIdValue(), input.addObservationVariable, benignErrorReporter, token);
    this.observationVariable_ID = input.addObservationVariable;
}

/**
 * add_ontology - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_ontology = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_ontology_ID(this.getIdValue(), input.addOntology, benignErrorReporter, token);
    this.ontology_ID = input.addOntology;
}

/**
 * add_person - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_person = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_person_ID(this.getIdValue(), input.addPerson, benignErrorReporter, token);
    this.person_ID = input.addPerson;
}

/**
 * add_pedigreeNode - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_pedigreeNode = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_pedigreeNode_ID(this.getIdValue(), input.addPedigreeNode, benignErrorReporter, token);
    this.pedigreeNode_ID = input.addPedigreeNode;
}

/**
 * add_plannedCross - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_plannedCross = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_plannedCross_ID(this.getIdValue(), input.addPlannedCross, benignErrorReporter, token);
    this.plannedCross_ID = input.addPlannedCross;
}

/**
 * add_plate - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_plate = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_plate_ID(this.getIdValue(), input.addPlate, benignErrorReporter, token);
    this.plate_ID = input.addPlate;
}

/**
 * add_program - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_program = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_program_ID(this.getIdValue(), input.addProgram, benignErrorReporter, token);
    this.program_ID = input.addProgram;
}

/**
 * add_reference - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_reference = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_reference_ID(this.getIdValue(), input.addReference, benignErrorReporter, token);
    this.reference_ID = input.addReference;
}

/**
 * add_referenceSet - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_referenceSet = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_referenceSet_ID(this.getIdValue(), input.addReferenceSet, benignErrorReporter, token);
    this.referenceSet_ID = input.addReferenceSet;
}

/**
 * add_sample - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_sample = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_sample_ID(this.getIdValue(), input.addSample, benignErrorReporter, token);
    this.sample_ID = input.addSample;
}

/**
 * add_scale - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_scale = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_scale_ID(this.getIdValue(), input.addScale, benignErrorReporter, token);
    this.scale_ID = input.addScale;
}

/**
 * add_seedLot - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_seedLot = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_seedLot_ID(this.getIdValue(), input.addSeedLot, benignErrorReporter, token);
    this.seedLot_ID = input.addSeedLot;
}

/**
 * add_seedLotTransaction - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_seedLotTransaction = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_seedLotTransaction_ID(this.getIdValue(), input.addSeedLotTransaction, benignErrorReporter, token);
    this.seedLotTransaction_ID = input.addSeedLotTransaction;
}

/**
 * add_study - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_study = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_study_ID(this.getIdValue(), input.addStudy, benignErrorReporter, token);
    this.study_ID = input.addStudy;
}

/**
 * add_trait - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_trait = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_trait_ID(this.getIdValue(), input.addTrait, benignErrorReporter, token);
    this.trait_ID = input.addTrait;
}

/**
 * add_trial - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_trial = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_trial_ID(this.getIdValue(), input.addTrial, benignErrorReporter, token);
    this.trial_ID = input.addTrial;
}

/**
 * add_variant - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_variant = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_variant_ID(this.getIdValue(), input.addVariant, benignErrorReporter, token);
    this.variant_ID = input.addVariant;
}

/**
 * add_variantSet - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.add_variantSet = async function(input, benignErrorReporter, token) {
    await additionalinfo.add_variantSet_ID(this.getIdValue(), input.addVariantSet, benignErrorReporter, token);
    this.variantSet_ID = input.addVariantSet;
}

/**
 * remove_call - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_call = async function(input, benignErrorReporter, token) {
    if (input.removeCall == this.call_ID) {
        await additionalinfo.remove_call_ID(this.getIdValue(), input.removeCall, benignErrorReporter, token);
        this.call_ID = null;
    }
}

/**
 * remove_callSet - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_callSet = async function(input, benignErrorReporter, token) {
    if (input.removeCallSet == this.callSet_ID) {
        await additionalinfo.remove_callSet_ID(this.getIdValue(), input.removeCallSet, benignErrorReporter, token);
        this.callSet_ID = null;
    }
}

/**
 * remove_cross - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_cross = async function(input, benignErrorReporter, token) {
    if (input.removeCross == this.cross_ID) {
        await additionalinfo.remove_cross_ID(this.getIdValue(), input.removeCross, benignErrorReporter, token);
        this.cross_ID = null;
    }
}

/**
 * remove_crossingProject - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_crossingProject = async function(input, benignErrorReporter, token) {
    if (input.removeCrossingProject == this.crossingProject_ID) {
        await additionalinfo.remove_crossingProject_ID(this.getIdValue(), input.removeCrossingProject, benignErrorReporter, token);
        this.crossingProject_ID = null;
    }
}

/**
 * remove_event - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_event = async function(input, benignErrorReporter, token) {
    if (input.removeEvent == this.event_ID) {
        await additionalinfo.remove_event_ID(this.getIdValue(), input.removeEvent, benignErrorReporter, token);
        this.event_ID = null;
    }
}

/**
 * remove_genomeMap - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_genomeMap = async function(input, benignErrorReporter, token) {
    if (input.removeGenomeMap == this.genomeMap_ID) {
        await additionalinfo.remove_genomeMap_ID(this.getIdValue(), input.removeGenomeMap, benignErrorReporter, token);
        this.genomeMap_ID = null;
    }
}

/**
 * remove_germplasm - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_germplasm = async function(input, benignErrorReporter, token) {
    if (input.removeGermplasm == this.germplasm_ID) {
        await additionalinfo.remove_germplasm_ID(this.getIdValue(), input.removeGermplasm, benignErrorReporter, token);
        this.germplasm_ID = null;
    }
}

/**
 * remove_germplasmAttribute - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_germplasmAttribute = async function(input, benignErrorReporter, token) {
    if (input.removeGermplasmAttribute == this.germplasmAttribute_ID) {
        await additionalinfo.remove_germplasmAttribute_ID(this.getIdValue(), input.removeGermplasmAttribute, benignErrorReporter, token);
        this.germplasmAttribute_ID = null;
    }
}

/**
 * remove_germplasmAttributeValue - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_germplasmAttributeValue = async function(input, benignErrorReporter, token) {
    if (input.removeGermplasmAttributeValue == this.germplasmAttributeValue_ID) {
        await additionalinfo.remove_germplasmAttributeValue_ID(this.getIdValue(), input.removeGermplasmAttributeValue, benignErrorReporter, token);
        this.germplasmAttributeValue_ID = null;
    }
}

/**
 * remove_image - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_image = async function(input, benignErrorReporter, token) {
    if (input.removeImage == this.image_ID) {
        await additionalinfo.remove_image_ID(this.getIdValue(), input.removeImage, benignErrorReporter, token);
        this.image_ID = null;
    }
}

/**
 * remove_list - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_list = async function(input, benignErrorReporter, token) {
    if (input.removeList == this.list_ID) {
        await additionalinfo.remove_list_ID(this.getIdValue(), input.removeList, benignErrorReporter, token);
        this.list_ID = null;
    }
}

/**
 * remove_location - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_location = async function(input, benignErrorReporter, token) {
    if (input.removeLocation == this.location_ID) {
        await additionalinfo.remove_location_ID(this.getIdValue(), input.removeLocation, benignErrorReporter, token);
        this.location_ID = null;
    }
}

/**
 * remove_markerPosition - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_markerPosition = async function(input, benignErrorReporter, token) {
    if (input.removeMarkerPosition == this.markerPosition_ID) {
        await additionalinfo.remove_markerPosition_ID(this.getIdValue(), input.removeMarkerPosition, benignErrorReporter, token);
        this.markerPosition_ID = null;
    }
}

/**
 * remove_method - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_method = async function(input, benignErrorReporter, token) {
    if (input.removeMethod == this.method_ID) {
        await additionalinfo.remove_method_ID(this.getIdValue(), input.removeMethod, benignErrorReporter, token);
        this.method_ID = null;
    }
}

/**
 * remove_observation - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_observation = async function(input, benignErrorReporter, token) {
    if (input.removeObservation == this.observation_ID) {
        await additionalinfo.remove_observation_ID(this.getIdValue(), input.removeObservation, benignErrorReporter, token);
        this.observation_ID = null;
    }
}

/**
 * remove_observationUnit - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_observationUnit = async function(input, benignErrorReporter, token) {
    if (input.removeObservationUnit == this.observationUnit_ID) {
        await additionalinfo.remove_observationUnit_ID(this.getIdValue(), input.removeObservationUnit, benignErrorReporter, token);
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
additionalinfo.prototype.remove_observationVariable = async function(input, benignErrorReporter, token) {
    if (input.removeObservationVariable == this.observationVariable_ID) {
        await additionalinfo.remove_observationVariable_ID(this.getIdValue(), input.removeObservationVariable, benignErrorReporter, token);
        this.observationVariable_ID = null;
    }
}

/**
 * remove_ontology - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_ontology = async function(input, benignErrorReporter, token) {
    if (input.removeOntology == this.ontology_ID) {
        await additionalinfo.remove_ontology_ID(this.getIdValue(), input.removeOntology, benignErrorReporter, token);
        this.ontology_ID = null;
    }
}

/**
 * remove_person - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_person = async function(input, benignErrorReporter, token) {
    if (input.removePerson == this.person_ID) {
        await additionalinfo.remove_person_ID(this.getIdValue(), input.removePerson, benignErrorReporter, token);
        this.person_ID = null;
    }
}

/**
 * remove_pedigreeNode - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_pedigreeNode = async function(input, benignErrorReporter, token) {
    if (input.removePedigreeNode == this.pedigreeNode_ID) {
        await additionalinfo.remove_pedigreeNode_ID(this.getIdValue(), input.removePedigreeNode, benignErrorReporter, token);
        this.pedigreeNode_ID = null;
    }
}

/**
 * remove_plannedCross - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_plannedCross = async function(input, benignErrorReporter, token) {
    if (input.removePlannedCross == this.plannedCross_ID) {
        await additionalinfo.remove_plannedCross_ID(this.getIdValue(), input.removePlannedCross, benignErrorReporter, token);
        this.plannedCross_ID = null;
    }
}

/**
 * remove_plate - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_plate = async function(input, benignErrorReporter, token) {
    if (input.removePlate == this.plate_ID) {
        await additionalinfo.remove_plate_ID(this.getIdValue(), input.removePlate, benignErrorReporter, token);
        this.plate_ID = null;
    }
}

/**
 * remove_program - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_program = async function(input, benignErrorReporter, token) {
    if (input.removeProgram == this.program_ID) {
        await additionalinfo.remove_program_ID(this.getIdValue(), input.removeProgram, benignErrorReporter, token);
        this.program_ID = null;
    }
}

/**
 * remove_reference - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_reference = async function(input, benignErrorReporter, token) {
    if (input.removeReference == this.reference_ID) {
        await additionalinfo.remove_reference_ID(this.getIdValue(), input.removeReference, benignErrorReporter, token);
        this.reference_ID = null;
    }
}

/**
 * remove_referenceSet - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_referenceSet = async function(input, benignErrorReporter, token) {
    if (input.removeReferenceSet == this.referenceSet_ID) {
        await additionalinfo.remove_referenceSet_ID(this.getIdValue(), input.removeReferenceSet, benignErrorReporter, token);
        this.referenceSet_ID = null;
    }
}

/**
 * remove_sample - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_sample = async function(input, benignErrorReporter, token) {
    if (input.removeSample == this.sample_ID) {
        await additionalinfo.remove_sample_ID(this.getIdValue(), input.removeSample, benignErrorReporter, token);
        this.sample_ID = null;
    }
}

/**
 * remove_scale - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_scale = async function(input, benignErrorReporter, token) {
    if (input.removeScale == this.scale_ID) {
        await additionalinfo.remove_scale_ID(this.getIdValue(), input.removeScale, benignErrorReporter, token);
        this.scale_ID = null;
    }
}

/**
 * remove_seedLot - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_seedLot = async function(input, benignErrorReporter, token) {
    if (input.removeSeedLot == this.seedLot_ID) {
        await additionalinfo.remove_seedLot_ID(this.getIdValue(), input.removeSeedLot, benignErrorReporter, token);
        this.seedLot_ID = null;
    }
}

/**
 * remove_seedLotTransaction - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_seedLotTransaction = async function(input, benignErrorReporter, token) {
    if (input.removeSeedLotTransaction == this.seedLotTransaction_ID) {
        await additionalinfo.remove_seedLotTransaction_ID(this.getIdValue(), input.removeSeedLotTransaction, benignErrorReporter, token);
        this.seedLotTransaction_ID = null;
    }
}

/**
 * remove_study - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_study = async function(input, benignErrorReporter, token) {
    if (input.removeStudy == this.study_ID) {
        await additionalinfo.remove_study_ID(this.getIdValue(), input.removeStudy, benignErrorReporter, token);
        this.study_ID = null;
    }
}

/**
 * remove_trait - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_trait = async function(input, benignErrorReporter, token) {
    if (input.removeTrait == this.trait_ID) {
        await additionalinfo.remove_trait_ID(this.getIdValue(), input.removeTrait, benignErrorReporter, token);
        this.trait_ID = null;
    }
}

/**
 * remove_trial - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_trial = async function(input, benignErrorReporter, token) {
    if (input.removeTrial == this.trial_ID) {
        await additionalinfo.remove_trial_ID(this.getIdValue(), input.removeTrial, benignErrorReporter, token);
        this.trial_ID = null;
    }
}

/**
 * remove_variant - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_variant = async function(input, benignErrorReporter, token) {
    if (input.removeVariant == this.variant_ID) {
        await additionalinfo.remove_variant_ID(this.getIdValue(), input.removeVariant, benignErrorReporter, token);
        this.variant_ID = null;
    }
}

/**
 * remove_variantSet - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
additionalinfo.prototype.remove_variantSet = async function(input, benignErrorReporter, token) {
    if (input.removeVariantSet == this.variantSet_ID) {
        await additionalinfo.remove_variantSet_ID(this.getIdValue(), input.removeVariantSet, benignErrorReporter, token);
        this.variantSet_ID = null;
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

    let additionalinfo = await resolvers.readOneAdditionalinfo({
        additionalInfoDbId: id
    }, context);
    //check that record actually exists
    if (additionalinfo === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.call_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.callSet_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.cross_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.crossingProject_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.event_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.genomeMap_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.germplasm_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.germplasmAttribute_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.germplasmAttributeValue_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.image_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.list_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.location_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.markerPosition_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.method_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.observation_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.observationUnit_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.observationVariable_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.ontology_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.person_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.pedigreeNode_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.plannedCross_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.plate_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.program_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.reference_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.referenceSet_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.sample_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.scale_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.seedLot_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.seedLotTransaction_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.study_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.trait_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.trial_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.variant_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(additionalinfo.variantSet_ID) ? 0 : 1;


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
        throw new Error(`additionalinfo with additionalInfoDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const additionalinfo_record = await resolvers.readOneAdditionalinfo({
            additionalInfoDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * additionalinfos - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    additionalinfos: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'additionalinfo', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "additionalinfos");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await additionalinfo.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * additionalinfosConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    additionalinfosConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'additionalinfo', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "additionalinfosConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await additionalinfo.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneAdditionalinfo - Check user authorization and return one record with the specified additionalInfoDbId in the additionalInfoDbId argument.
     *
     * @param  {number} {additionalInfoDbId}    additionalInfoDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with additionalInfoDbId requested
     */
    readOneAdditionalinfo: async function({
        additionalInfoDbId
    }, context) {
        if (await checkAuthorization(context, 'additionalinfo', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneAdditionalinfo");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await additionalinfo.readById(additionalInfoDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countAdditionalinfos - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countAdditionalinfos: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'additionalinfo', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await additionalinfo.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateAdditionalinfoForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateAdditionalinfoForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'additionalinfo', 'read');
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
                    additionalinfo,
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
     * validateAdditionalinfoForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateAdditionalinfoForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'additionalinfo', 'read');
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
                    additionalinfo,
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
     * validateAdditionalinfoForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {additionalInfoDbId} additionalInfoDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateAdditionalinfoForDeletion: async ({
        additionalInfoDbId
    }, context) => {
        if ((await checkAuthorization(context, 'additionalinfo', 'read')) === true) {
            try {
                await validForDeletion(additionalInfoDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    additionalinfo,
                    additionalInfoDbId);
                return true;
            } catch (error) {
                error.input = {
                    additionalInfoDbId: additionalInfoDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateAdditionalinfoAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {additionalInfoDbId} additionalInfoDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateAdditionalinfoAfterReading: async ({
        additionalInfoDbId
    }, context) => {
        if ((await checkAuthorization(context, 'additionalinfo', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    additionalinfo,
                    additionalInfoDbId);
                return true;
            } catch (error) {
                error.input = {
                    additionalInfoDbId: additionalInfoDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addAdditionalinfo - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addAdditionalinfo: async function(input, context) {
        let authorization = await checkAuthorization(context, 'additionalinfo', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.additionalinfo.definition);
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
            let createdAdditionalinfo = await additionalinfo.addOne(inputSanitized, context.benignErrors, token);
            await createdAdditionalinfo.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdAdditionalinfo;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteAdditionalinfo - Check user authorization and delete a record with the specified additionalInfoDbId in the additionalInfoDbId argument.
     *
     * @param  {number} {additionalInfoDbId}    additionalInfoDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteAdditionalinfo: async function({
        additionalInfoDbId
    }, context) {
        if (await checkAuthorization(context, 'additionalinfo', 'delete') === true) {
            if (await validForDeletion(additionalInfoDbId, context)) {
                await updateAssociations(additionalInfoDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return additionalinfo.deleteOne(additionalInfoDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateAdditionalinfo - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateAdditionalinfo: async function(input, context) {
        let authorization = await checkAuthorization(context, 'additionalinfo', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.additionalinfo.definition);
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
            let updatedAdditionalinfo = await additionalinfo.updateOne(inputSanitized, context.benignErrors, token);
            await updatedAdditionalinfo.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedAdditionalinfo;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateAdditionalinfo - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateAdditionalinfo: async function(_, context) {
        if (await checkAuthorization(context, 'additionalinfo', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return additionalinfo.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * additionalinfosZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    additionalinfosZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "additionalinfo", "read")) === true) {
            return additionalinfo.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}