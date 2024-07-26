/*
    Resolvers for basic CRUD operations
*/

const path = require('path');
const externalreference = require(path.join(__dirname, '..', 'models', 'index.js')).externalreference;
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
    'addCallset': 'callset',
    'addCross': 'cross',
    'addCrossingProject': 'crossingproject',
    'addGermplasm': 'germplasm',
    'addGermplasmAttribute': 'germplasmattribute',
    'addGermplasmAttributeValue': 'germplasmattributevalue',
    'addImage': 'image',
    'addMethod': 'method',
    'addList': 'list',
    'addLocation': 'location',
    'addObservation': 'observation',
    'addObservationUnit': 'observationunit',
    'addObservationVariable': 'observationvariable',
    'addPlate': 'plate',
    'addPerson': 'person',
    'addPedigreeNode': 'pedigreenode',
    'addPlannedCross': 'plannedcross',
    'addProgram': 'program',
    'addReference': 'reference',
    'addReferenceset': 'referenceset',
    'addSample': 'sample',
    'addScale': 'scale',
    'addSeedLot': 'seedlot',
    'addSeedLotTransaction': 'seedlottransaction',
    'addStudy': 'study',
    'addTrait': 'trait',
    'addTrial': 'trial',
    'addVariant': 'variant',
    'addVariantset': 'variantset'
}



/**
 * externalreference.prototype.callset - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.callset = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.callset_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneCallset({
                [models.callset.idAttribute()]: this.callset_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.callset.idAttribute(),
                "value": this.callset_ID,
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
                        `Not unique "to_one" association Error: Found > 1 callsets matching externalreference with externalReferenceDbId ${this.callset_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first callset.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.cross - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.cross = async function({
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
                        `Not unique "to_one" association Error: Found > 1 crosses matching externalreference with externalReferenceDbId ${this.cross_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first cross.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.crossingProject - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.crossingProject = async function({
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
                        `Not unique "to_one" association Error: Found > 1 crossingprojects matching externalreference with externalReferenceDbId ${this.crossingProject_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first crossingproject.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.germplasm - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.germplasm = async function({
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
                        `Not unique "to_one" association Error: Found > 1 germplasms matching externalreference with externalReferenceDbId ${this.germplasm_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first germplasm.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.germplasmAttribute - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.germplasmAttribute = async function({
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
                        `Not unique "to_one" association Error: Found > 1 germplasmattributes matching externalreference with externalReferenceDbId ${this.germplasmAttribute_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first germplasmattribute.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.germplasmAttributeValue - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.germplasmAttributeValue = async function({
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
                        `Not unique "to_one" association Error: Found > 1 germplasmattributevalues matching externalreference with externalReferenceDbId ${this.germplasmAttributeValue_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first germplasmattributevalue.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.image - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.image = async function({
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
                        `Not unique "to_one" association Error: Found > 1 images matching externalreference with externalReferenceDbId ${this.image_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first image.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.method - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.method = async function({
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
                        `Not unique "to_one" association Error: Found > 1 methods matching externalreference with externalReferenceDbId ${this.method_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first method.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.list - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.list = async function({
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
                        `Not unique "to_one" association Error: Found > 1 lists matching externalreference with externalReferenceDbId ${this.list_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first list.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.location - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.location = async function({
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
                        `Not unique "to_one" association Error: Found > 1 locations matching externalreference with externalReferenceDbId ${this.location_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first location.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.observation - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.observation = async function({
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
                        `Not unique "to_one" association Error: Found > 1 observations matching externalreference with externalReferenceDbId ${this.observation_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first observation.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.observationUnit - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.observationUnit = async function({
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
                        `Not unique "to_one" association Error: Found > 1 observationunits matching externalreference with externalReferenceDbId ${this.observationUnit_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first observationunit.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.observationVariable - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.observationVariable = async function({
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
                        `Not unique "to_one" association Error: Found > 1 observationvariables matching externalreference with externalReferenceDbId ${this.observationVariable_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first observationvariable.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.plate - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.plate = async function({
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
                        `Not unique "to_one" association Error: Found > 1 plates matching externalreference with externalReferenceDbId ${this.plate_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first plate.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.person - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.person = async function({
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
                        `Not unique "to_one" association Error: Found > 1 people matching externalreference with externalReferenceDbId ${this.person_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first person.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.pedigreeNode - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.pedigreeNode = async function({
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
                        `Not unique "to_one" association Error: Found > 1 pedigreenodes matching externalreference with externalReferenceDbId ${this.pedigreeNode_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first pedigreenode.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.plannedCross - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.plannedCross = async function({
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
                        `Not unique "to_one" association Error: Found > 1 plannedcrosses matching externalreference with externalReferenceDbId ${this.plannedCross_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first plannedcross.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.program - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.program = async function({
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
                        `Not unique "to_one" association Error: Found > 1 programs matching externalreference with externalReferenceDbId ${this.program_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first program.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.reference - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.reference = async function({
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
                        `Not unique "to_one" association Error: Found > 1 references matching externalreference with externalReferenceDbId ${this.reference_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first reference.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.referenceset - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.referenceset = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.referenceset_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneReferenceset({
                [models.referenceset.idAttribute()]: this.referenceset_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.referenceset.idAttribute(),
                "value": this.referenceset_ID,
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
                        `Not unique "to_one" association Error: Found > 1 referencesets matching externalreference with externalReferenceDbId ${this.referenceset_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first referenceset.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.sample - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.sample = async function({
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
                        `Not unique "to_one" association Error: Found > 1 samples matching externalreference with externalReferenceDbId ${this.sample_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first sample.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.scale - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.scale = async function({
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
                        `Not unique "to_one" association Error: Found > 1 scales matching externalreference with externalReferenceDbId ${this.scale_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first scale.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.seedLot - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.seedLot = async function({
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
                        `Not unique "to_one" association Error: Found > 1 seedlots matching externalreference with externalReferenceDbId ${this.seedLot_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first seedlot.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.seedLotTransaction - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.seedLotTransaction = async function({
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
                        `Not unique "to_one" association Error: Found > 1 seedlottransactions matching externalreference with externalReferenceDbId ${this.seedLotTransaction_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first seedlottransaction.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.study - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.study = async function({
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
                        `Not unique "to_one" association Error: Found > 1 studies matching externalreference with externalReferenceDbId ${this.study_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first study.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.trait - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.trait = async function({
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
                        `Not unique "to_one" association Error: Found > 1 traits matching externalreference with externalReferenceDbId ${this.trait_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first trait.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.trial - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.trial = async function({
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
                        `Not unique "to_one" association Error: Found > 1 trials matching externalreference with externalReferenceDbId ${this.trial_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first trial.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.variant - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.variant = async function({
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
                        `Not unique "to_one" association Error: Found > 1 variants matching externalreference with externalReferenceDbId ${this.variant_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first variant.`
                    ));
                }
                return found[0].node;
            }
            return null;
        }
    }
}
/**
 * externalreference.prototype.variantset - Return associated record
 *
 * @param  {object} search       Search argument to match the associated record
 * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
 * @return {type}         Associated record
 */
externalreference.prototype.variantset = async function({
    search
}, context) {

    if (helper.isNotUndefinedAndNotNull(this.variantset_ID)) {
        if (search === undefined || search === null) {
            return resolvers.readOneVariantset({
                [models.variantset.idAttribute()]: this.variantset_ID
            }, context)
        } else {

            //build new search filter
            let nsearch = helper.addSearchField({
                "search": search,
                "field": models.variantset.idAttribute(),
                "value": this.variantset_ID,
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
                        `Not unique "to_one" association Error: Found > 1 variantsets matching externalreference with externalReferenceDbId ${this.variantset_ID}. 
                Consider making this a "to_many" association, or using unique constraints, or moving the foreign key into the externalreference model. Returning first variantset.`
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
externalreference.prototype.handleAssociations = async function(input, benignErrorReporter, token) {

    let promises_add = [];

    if (helper.isNotUndefinedAndNotNull(input.addCallset)) {
        promises_add.push(this.add_callset(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addCross)) {
        promises_add.push(this.add_cross(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addCrossingProject)) {
        promises_add.push(this.add_crossingProject(input, benignErrorReporter, token));
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
    if (helper.isNotUndefinedAndNotNull(input.addMethod)) {
        promises_add.push(this.add_method(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addList)) {
        promises_add.push(this.add_list(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addLocation)) {
        promises_add.push(this.add_location(input, benignErrorReporter, token));
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
    if (helper.isNotUndefinedAndNotNull(input.addPlate)) {
        promises_add.push(this.add_plate(input, benignErrorReporter, token));
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
    if (helper.isNotUndefinedAndNotNull(input.addProgram)) {
        promises_add.push(this.add_program(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addReference)) {
        promises_add.push(this.add_reference(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.addReferenceset)) {
        promises_add.push(this.add_referenceset(input, benignErrorReporter, token));
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
    if (helper.isNotUndefinedAndNotNull(input.addVariantset)) {
        promises_add.push(this.add_variantset(input, benignErrorReporter, token));
    }

    await Promise.all(promises_add);
    let promises_remove = [];

    if (helper.isNotUndefinedAndNotNull(input.removeCallset)) {
        promises_remove.push(this.remove_callset(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeCross)) {
        promises_remove.push(this.remove_cross(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeCrossingProject)) {
        promises_remove.push(this.remove_crossingProject(input, benignErrorReporter, token));
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
    if (helper.isNotUndefinedAndNotNull(input.removeMethod)) {
        promises_remove.push(this.remove_method(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeList)) {
        promises_remove.push(this.remove_list(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeLocation)) {
        promises_remove.push(this.remove_location(input, benignErrorReporter, token));
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
    if (helper.isNotUndefinedAndNotNull(input.removePlate)) {
        promises_remove.push(this.remove_plate(input, benignErrorReporter, token));
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
    if (helper.isNotUndefinedAndNotNull(input.removeProgram)) {
        promises_remove.push(this.remove_program(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeReference)) {
        promises_remove.push(this.remove_reference(input, benignErrorReporter, token));
    }
    if (helper.isNotUndefinedAndNotNull(input.removeReferenceset)) {
        promises_remove.push(this.remove_referenceset(input, benignErrorReporter, token));
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
    if (helper.isNotUndefinedAndNotNull(input.removeVariantset)) {
        promises_remove.push(this.remove_variantset(input, benignErrorReporter, token));
    }

    await Promise.all(promises_remove);

}
/**
 * add_callset - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_callset = async function(input, benignErrorReporter, token) {
    await externalreference.add_callset_ID(this.getIdValue(), input.addCallset, benignErrorReporter, token);
    this.callset_ID = input.addCallset;
}

/**
 * add_cross - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_cross = async function(input, benignErrorReporter, token) {
    await externalreference.add_cross_ID(this.getIdValue(), input.addCross, benignErrorReporter, token);
    this.cross_ID = input.addCross;
}

/**
 * add_crossingProject - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_crossingProject = async function(input, benignErrorReporter, token) {
    await externalreference.add_crossingProject_ID(this.getIdValue(), input.addCrossingProject, benignErrorReporter, token);
    this.crossingProject_ID = input.addCrossingProject;
}

/**
 * add_germplasm - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_germplasm = async function(input, benignErrorReporter, token) {
    await externalreference.add_germplasm_ID(this.getIdValue(), input.addGermplasm, benignErrorReporter, token);
    this.germplasm_ID = input.addGermplasm;
}

/**
 * add_germplasmAttribute - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_germplasmAttribute = async function(input, benignErrorReporter, token) {
    await externalreference.add_germplasmAttribute_ID(this.getIdValue(), input.addGermplasmAttribute, benignErrorReporter, token);
    this.germplasmAttribute_ID = input.addGermplasmAttribute;
}

/**
 * add_germplasmAttributeValue - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_germplasmAttributeValue = async function(input, benignErrorReporter, token) {
    await externalreference.add_germplasmAttributeValue_ID(this.getIdValue(), input.addGermplasmAttributeValue, benignErrorReporter, token);
    this.germplasmAttributeValue_ID = input.addGermplasmAttributeValue;
}

/**
 * add_image - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_image = async function(input, benignErrorReporter, token) {
    await externalreference.add_image_ID(this.getIdValue(), input.addImage, benignErrorReporter, token);
    this.image_ID = input.addImage;
}

/**
 * add_method - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_method = async function(input, benignErrorReporter, token) {
    await externalreference.add_method_ID(this.getIdValue(), input.addMethod, benignErrorReporter, token);
    this.method_ID = input.addMethod;
}

/**
 * add_list - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_list = async function(input, benignErrorReporter, token) {
    await externalreference.add_list_ID(this.getIdValue(), input.addList, benignErrorReporter, token);
    this.list_ID = input.addList;
}

/**
 * add_location - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_location = async function(input, benignErrorReporter, token) {
    await externalreference.add_location_ID(this.getIdValue(), input.addLocation, benignErrorReporter, token);
    this.location_ID = input.addLocation;
}

/**
 * add_observation - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_observation = async function(input, benignErrorReporter, token) {
    await externalreference.add_observation_ID(this.getIdValue(), input.addObservation, benignErrorReporter, token);
    this.observation_ID = input.addObservation;
}

/**
 * add_observationUnit - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_observationUnit = async function(input, benignErrorReporter, token) {
    await externalreference.add_observationUnit_ID(this.getIdValue(), input.addObservationUnit, benignErrorReporter, token);
    this.observationUnit_ID = input.addObservationUnit;
}

/**
 * add_observationVariable - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_observationVariable = async function(input, benignErrorReporter, token) {
    await externalreference.add_observationVariable_ID(this.getIdValue(), input.addObservationVariable, benignErrorReporter, token);
    this.observationVariable_ID = input.addObservationVariable;
}

/**
 * add_plate - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_plate = async function(input, benignErrorReporter, token) {
    await externalreference.add_plate_ID(this.getIdValue(), input.addPlate, benignErrorReporter, token);
    this.plate_ID = input.addPlate;
}

/**
 * add_person - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_person = async function(input, benignErrorReporter, token) {
    await externalreference.add_person_ID(this.getIdValue(), input.addPerson, benignErrorReporter, token);
    this.person_ID = input.addPerson;
}

/**
 * add_pedigreeNode - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_pedigreeNode = async function(input, benignErrorReporter, token) {
    await externalreference.add_pedigreeNode_ID(this.getIdValue(), input.addPedigreeNode, benignErrorReporter, token);
    this.pedigreeNode_ID = input.addPedigreeNode;
}

/**
 * add_plannedCross - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_plannedCross = async function(input, benignErrorReporter, token) {
    await externalreference.add_plannedCross_ID(this.getIdValue(), input.addPlannedCross, benignErrorReporter, token);
    this.plannedCross_ID = input.addPlannedCross;
}

/**
 * add_program - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_program = async function(input, benignErrorReporter, token) {
    await externalreference.add_program_ID(this.getIdValue(), input.addProgram, benignErrorReporter, token);
    this.program_ID = input.addProgram;
}

/**
 * add_reference - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_reference = async function(input, benignErrorReporter, token) {
    await externalreference.add_reference_ID(this.getIdValue(), input.addReference, benignErrorReporter, token);
    this.reference_ID = input.addReference;
}

/**
 * add_referenceset - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_referenceset = async function(input, benignErrorReporter, token) {
    await externalreference.add_referenceset_ID(this.getIdValue(), input.addReferenceset, benignErrorReporter, token);
    this.referenceset_ID = input.addReferenceset;
}

/**
 * add_sample - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_sample = async function(input, benignErrorReporter, token) {
    await externalreference.add_sample_ID(this.getIdValue(), input.addSample, benignErrorReporter, token);
    this.sample_ID = input.addSample;
}

/**
 * add_scale - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_scale = async function(input, benignErrorReporter, token) {
    await externalreference.add_scale_ID(this.getIdValue(), input.addScale, benignErrorReporter, token);
    this.scale_ID = input.addScale;
}

/**
 * add_seedLot - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_seedLot = async function(input, benignErrorReporter, token) {
    await externalreference.add_seedLot_ID(this.getIdValue(), input.addSeedLot, benignErrorReporter, token);
    this.seedLot_ID = input.addSeedLot;
}

/**
 * add_seedLotTransaction - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_seedLotTransaction = async function(input, benignErrorReporter, token) {
    await externalreference.add_seedLotTransaction_ID(this.getIdValue(), input.addSeedLotTransaction, benignErrorReporter, token);
    this.seedLotTransaction_ID = input.addSeedLotTransaction;
}

/**
 * add_study - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_study = async function(input, benignErrorReporter, token) {
    await externalreference.add_study_ID(this.getIdValue(), input.addStudy, benignErrorReporter, token);
    this.study_ID = input.addStudy;
}

/**
 * add_trait - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_trait = async function(input, benignErrorReporter, token) {
    await externalreference.add_trait_ID(this.getIdValue(), input.addTrait, benignErrorReporter, token);
    this.trait_ID = input.addTrait;
}

/**
 * add_trial - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_trial = async function(input, benignErrorReporter, token) {
    await externalreference.add_trial_ID(this.getIdValue(), input.addTrial, benignErrorReporter, token);
    this.trial_ID = input.addTrial;
}

/**
 * add_variant - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_variant = async function(input, benignErrorReporter, token) {
    await externalreference.add_variant_ID(this.getIdValue(), input.addVariant, benignErrorReporter, token);
    this.variant_ID = input.addVariant;
}

/**
 * add_variantset - field Mutation for to_one associations to add
 *
 * @param {object} input   Info of input Ids to add  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.add_variantset = async function(input, benignErrorReporter, token) {
    await externalreference.add_variantset_ID(this.getIdValue(), input.addVariantset, benignErrorReporter, token);
    this.variantset_ID = input.addVariantset;
}

/**
 * remove_callset - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.remove_callset = async function(input, benignErrorReporter, token) {
    if (input.removeCallset == this.callset_ID) {
        await externalreference.remove_callset_ID(this.getIdValue(), input.removeCallset, benignErrorReporter, token);
        this.callset_ID = null;
    }
}

/**
 * remove_cross - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.remove_cross = async function(input, benignErrorReporter, token) {
    if (input.removeCross == this.cross_ID) {
        await externalreference.remove_cross_ID(this.getIdValue(), input.removeCross, benignErrorReporter, token);
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
externalreference.prototype.remove_crossingProject = async function(input, benignErrorReporter, token) {
    if (input.removeCrossingProject == this.crossingProject_ID) {
        await externalreference.remove_crossingProject_ID(this.getIdValue(), input.removeCrossingProject, benignErrorReporter, token);
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
externalreference.prototype.remove_germplasm = async function(input, benignErrorReporter, token) {
    if (input.removeGermplasm == this.germplasm_ID) {
        await externalreference.remove_germplasm_ID(this.getIdValue(), input.removeGermplasm, benignErrorReporter, token);
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
externalreference.prototype.remove_germplasmAttribute = async function(input, benignErrorReporter, token) {
    if (input.removeGermplasmAttribute == this.germplasmAttribute_ID) {
        await externalreference.remove_germplasmAttribute_ID(this.getIdValue(), input.removeGermplasmAttribute, benignErrorReporter, token);
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
externalreference.prototype.remove_germplasmAttributeValue = async function(input, benignErrorReporter, token) {
    if (input.removeGermplasmAttributeValue == this.germplasmAttributeValue_ID) {
        await externalreference.remove_germplasmAttributeValue_ID(this.getIdValue(), input.removeGermplasmAttributeValue, benignErrorReporter, token);
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
externalreference.prototype.remove_image = async function(input, benignErrorReporter, token) {
    if (input.removeImage == this.image_ID) {
        await externalreference.remove_image_ID(this.getIdValue(), input.removeImage, benignErrorReporter, token);
        this.image_ID = null;
    }
}

/**
 * remove_method - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.remove_method = async function(input, benignErrorReporter, token) {
    if (input.removeMethod == this.method_ID) {
        await externalreference.remove_method_ID(this.getIdValue(), input.removeMethod, benignErrorReporter, token);
        this.method_ID = null;
    }
}

/**
 * remove_list - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.remove_list = async function(input, benignErrorReporter, token) {
    if (input.removeList == this.list_ID) {
        await externalreference.remove_list_ID(this.getIdValue(), input.removeList, benignErrorReporter, token);
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
externalreference.prototype.remove_location = async function(input, benignErrorReporter, token) {
    if (input.removeLocation == this.location_ID) {
        await externalreference.remove_location_ID(this.getIdValue(), input.removeLocation, benignErrorReporter, token);
        this.location_ID = null;
    }
}

/**
 * remove_observation - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.remove_observation = async function(input, benignErrorReporter, token) {
    if (input.removeObservation == this.observation_ID) {
        await externalreference.remove_observation_ID(this.getIdValue(), input.removeObservation, benignErrorReporter, token);
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
externalreference.prototype.remove_observationUnit = async function(input, benignErrorReporter, token) {
    if (input.removeObservationUnit == this.observationUnit_ID) {
        await externalreference.remove_observationUnit_ID(this.getIdValue(), input.removeObservationUnit, benignErrorReporter, token);
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
externalreference.prototype.remove_observationVariable = async function(input, benignErrorReporter, token) {
    if (input.removeObservationVariable == this.observationVariable_ID) {
        await externalreference.remove_observationVariable_ID(this.getIdValue(), input.removeObservationVariable, benignErrorReporter, token);
        this.observationVariable_ID = null;
    }
}

/**
 * remove_plate - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.remove_plate = async function(input, benignErrorReporter, token) {
    if (input.removePlate == this.plate_ID) {
        await externalreference.remove_plate_ID(this.getIdValue(), input.removePlate, benignErrorReporter, token);
        this.plate_ID = null;
    }
}

/**
 * remove_person - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.remove_person = async function(input, benignErrorReporter, token) {
    if (input.removePerson == this.person_ID) {
        await externalreference.remove_person_ID(this.getIdValue(), input.removePerson, benignErrorReporter, token);
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
externalreference.prototype.remove_pedigreeNode = async function(input, benignErrorReporter, token) {
    if (input.removePedigreeNode == this.pedigreeNode_ID) {
        await externalreference.remove_pedigreeNode_ID(this.getIdValue(), input.removePedigreeNode, benignErrorReporter, token);
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
externalreference.prototype.remove_plannedCross = async function(input, benignErrorReporter, token) {
    if (input.removePlannedCross == this.plannedCross_ID) {
        await externalreference.remove_plannedCross_ID(this.getIdValue(), input.removePlannedCross, benignErrorReporter, token);
        this.plannedCross_ID = null;
    }
}

/**
 * remove_program - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.remove_program = async function(input, benignErrorReporter, token) {
    if (input.removeProgram == this.program_ID) {
        await externalreference.remove_program_ID(this.getIdValue(), input.removeProgram, benignErrorReporter, token);
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
externalreference.prototype.remove_reference = async function(input, benignErrorReporter, token) {
    if (input.removeReference == this.reference_ID) {
        await externalreference.remove_reference_ID(this.getIdValue(), input.removeReference, benignErrorReporter, token);
        this.reference_ID = null;
    }
}

/**
 * remove_referenceset - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.remove_referenceset = async function(input, benignErrorReporter, token) {
    if (input.removeReferenceset == this.referenceset_ID) {
        await externalreference.remove_referenceset_ID(this.getIdValue(), input.removeReferenceset, benignErrorReporter, token);
        this.referenceset_ID = null;
    }
}

/**
 * remove_sample - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.remove_sample = async function(input, benignErrorReporter, token) {
    if (input.removeSample == this.sample_ID) {
        await externalreference.remove_sample_ID(this.getIdValue(), input.removeSample, benignErrorReporter, token);
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
externalreference.prototype.remove_scale = async function(input, benignErrorReporter, token) {
    if (input.removeScale == this.scale_ID) {
        await externalreference.remove_scale_ID(this.getIdValue(), input.removeScale, benignErrorReporter, token);
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
externalreference.prototype.remove_seedLot = async function(input, benignErrorReporter, token) {
    if (input.removeSeedLot == this.seedLot_ID) {
        await externalreference.remove_seedLot_ID(this.getIdValue(), input.removeSeedLot, benignErrorReporter, token);
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
externalreference.prototype.remove_seedLotTransaction = async function(input, benignErrorReporter, token) {
    if (input.removeSeedLotTransaction == this.seedLotTransaction_ID) {
        await externalreference.remove_seedLotTransaction_ID(this.getIdValue(), input.removeSeedLotTransaction, benignErrorReporter, token);
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
externalreference.prototype.remove_study = async function(input, benignErrorReporter, token) {
    if (input.removeStudy == this.study_ID) {
        await externalreference.remove_study_ID(this.getIdValue(), input.removeStudy, benignErrorReporter, token);
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
externalreference.prototype.remove_trait = async function(input, benignErrorReporter, token) {
    if (input.removeTrait == this.trait_ID) {
        await externalreference.remove_trait_ID(this.getIdValue(), input.removeTrait, benignErrorReporter, token);
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
externalreference.prototype.remove_trial = async function(input, benignErrorReporter, token) {
    if (input.removeTrial == this.trial_ID) {
        await externalreference.remove_trial_ID(this.getIdValue(), input.removeTrial, benignErrorReporter, token);
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
externalreference.prototype.remove_variant = async function(input, benignErrorReporter, token) {
    if (input.removeVariant == this.variant_ID) {
        await externalreference.remove_variant_ID(this.getIdValue(), input.removeVariant, benignErrorReporter, token);
        this.variant_ID = null;
    }
}

/**
 * remove_variantset - field Mutation for to_one associations to remove
 *
 * @param {object} input   Info of input Ids to remove  the association
 * @param {BenignErrorReporter} benignErrorReporter Error Reporter used for reporting Errors from remote zendro services
 * @param {string} token The token used for authorization
 */
externalreference.prototype.remove_variantset = async function(input, benignErrorReporter, token) {
    if (input.removeVariantset == this.variantset_ID) {
        await externalreference.remove_variantset_ID(this.getIdValue(), input.removeVariantset, benignErrorReporter, token);
        this.variantset_ID = null;
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

    let externalreference = await resolvers.readOneExternalreference({
        externalReferenceDbId: id
    }, context);
    //check that record actually exists
    if (externalreference === null) throw new Error(`Record with ID = ${id} does not exist`);
    let promises_to_many = [];
    let promises_to_one = [];
    let get_to_many_associated_fk = 0;
    let get_to_one_associated_fk = 0;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.callset_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.cross_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.crossingProject_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.germplasm_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.germplasmAttribute_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.germplasmAttributeValue_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.image_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.method_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.list_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.location_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.observation_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.observationUnit_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.observationVariable_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.plate_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.person_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.pedigreeNode_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.plannedCross_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.program_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.reference_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.referenceset_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.sample_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.scale_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.seedLot_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.seedLotTransaction_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.study_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.trait_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.trial_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.variant_ID) ? 0 : 1;

    get_to_one_associated_fk += [null, undefined].includes(externalreference.variantset_ID) ? 0 : 1;


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
        throw new Error(`externalreference with externalReferenceDbId ${id} has associated records with 'reject' reaction and is NOT valid for deletion. Please clean up before you delete.`);
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
    const externalreference_record = await resolvers.readOneExternalreference({
            externalReferenceDbId: id
        },
        context
    );
    const pagi_first = globals.LIMIT_RECORDS;



}
module.exports = {
    /**
     * externalreferences - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Offset and limit to get the records from and to respectively
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records holding conditions specified by search, order and pagination argument
     */
    externalreferences: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'externalreference', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(pagination.limit, context, "externalreferences");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await externalreference.readAll(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * externalreferencesConnection - Check user authorization and return certain number, specified in pagination argument, of records that
     * holds the condition of search argument, all of them sorted as specified by the order argument.
     *
     * @param  {object} search     Search argument for filtering records
     * @param  {array} order       Type of sorting (ASC, DESC) for each field
     * @param  {object} pagination Cursor and first(indicatig the number of records to retrieve) arguments to apply cursor-based pagination.
     * @param  {object} context     Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {array}             Array of records as grapqhql connections holding conditions specified by search, order and pagination argument
     */
    externalreferencesConnection: async function({
        search,
        order,
        pagination
    }, context) {
        if (await checkAuthorization(context, 'externalreference', 'read') === true) {
            helper.checkCursorBasedPaginationArgument(pagination);
            let limit = helper.isNotUndefinedAndNotNull(pagination.first) ? pagination.first : pagination.last;
            helper.checkCountAndReduceRecordsLimit(limit, context, "externalreferencesConnection");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await externalreference.readAllCursor(search, order, pagination, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * readOneExternalreference - Check user authorization and return one record with the specified externalReferenceDbId in the externalReferenceDbId argument.
     *
     * @param  {number} {externalReferenceDbId}    externalReferenceDbId of the record to retrieve
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Record with externalReferenceDbId requested
     */
    readOneExternalreference: async function({
        externalReferenceDbId
    }, context) {
        if (await checkAuthorization(context, 'externalreference', 'read') === true) {
            helper.checkCountAndReduceRecordsLimit(1, context, "readOneExternalreference");
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await externalreference.readById(externalReferenceDbId, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * countExternalreferences - Counts number of records that holds the conditions specified in the search argument
     *
     * @param  {object} {search} Search argument for filtering records
     * @param  {object} context  Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {number}          Number of records that holds the conditions specified in the search argument
     */
    countExternalreferences: async function({
        search
    }, context) {
        if (await checkAuthorization(context, 'externalreference', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return await externalreference.countRecords(search, context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateExternalreferenceForCreation - Check user authorization and validate input argument for creation.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateExternalreferenceForCreation: async (input, context) => {
        let authorization = await checkAuthorization(context, 'externalreference', 'read');
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
                    externalreference,
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
     * validateExternalreferenceForUpdating - Check user authorization and validate input argument for updating.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateExternalreferenceForUpdating: async (input, context) => {
        let authorization = await checkAuthorization(context, 'externalreference', 'read');
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
                    externalreference,
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
     * validateExternalreferenceForDeletion - Check user authorization and validate record by ID for deletion.
     *
     * @param  {string} {externalReferenceDbId} externalReferenceDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateExternalreferenceForDeletion: async ({
        externalReferenceDbId
    }, context) => {
        if ((await checkAuthorization(context, 'externalreference', 'read')) === true) {
            try {
                await validForDeletion(externalReferenceDbId, context);
                await validatorUtil.validateData(
                    "validateForDelete",
                    externalreference,
                    externalReferenceDbId);
                return true;
            } catch (error) {
                error.input = {
                    externalReferenceDbId: externalReferenceDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * validateExternalreferenceAfterReading - Check user authorization and validate record by ID after reading.
     *
     * @param  {string} {externalReferenceDbId} externalReferenceDbId of the record to be validated
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info
     * @return {boolean}        Validation result
     */
    validateExternalreferenceAfterReading: async ({
        externalReferenceDbId
    }, context) => {
        if ((await checkAuthorization(context, 'externalreference', 'read')) === true) {
            try {
                await validatorUtil.validateData(
                    "validateAfterRead",
                    externalreference,
                    externalReferenceDbId);
                return true;
            } catch (error) {
                error.input = {
                    externalReferenceDbId: externalReferenceDbId
                };
                context.benignErrors.push(error);
                return false;
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },
    /**
     * addExternalreference - Check user authorization and creates a new record with data specified in the input argument.
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   Info of each field to create the new record
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         New record created
     */
    addExternalreference: async function(input, context) {
        let authorization = await checkAuthorization(context, 'externalreference', 'create');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.externalreference.definition);
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
            let createdExternalreference = await externalreference.addOne(inputSanitized, context.benignErrors, token);
            await createdExternalreference.handleAssociations(inputSanitized, context.benignErrors, token);
            return createdExternalreference;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * deleteExternalreference - Check user authorization and delete a record with the specified externalReferenceDbId in the externalReferenceDbId argument.
     *
     * @param  {number} {externalReferenceDbId}    externalReferenceDbId of the record to delete
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {string}         Message indicating if deletion was successfull.
     */
    deleteExternalreference: async function({
        externalReferenceDbId
    }, context) {
        if (await checkAuthorization(context, 'externalreference', 'delete') === true) {
            if (await validForDeletion(externalReferenceDbId, context)) {
                await updateAssociations(externalReferenceDbId, context);
                let token = context.request ?
                    context.request.headers ?
                    context.request.headers.authorization :
                    undefined :
                    undefined;
                return externalreference.deleteOne(externalReferenceDbId, context.benignErrors, token);
            }
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * updateExternalreference - Check user authorization and update the record specified in the input argument
     * This function only handles attributes, not associations.
     * @see handleAssociations for further information.
     *
     * @param  {object} input   record to update and new info to update
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {object}         Updated record
     */
    updateExternalreference: async function(input, context) {
        let authorization = await checkAuthorization(context, 'externalreference', 'update');
        if (authorization === true) {
            let inputSanitized = helper.sanitizeAssociationArguments(input, [Object.keys(associationArgsDef)]);
            inputSanitized = helper.castIdentifierToCorrectType(inputSanitized, models.externalreference.definition);
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
            let updatedExternalreference = await externalreference.updateOne(inputSanitized, context.benignErrors, token);
            await updatedExternalreference.handleAssociations(inputSanitized, context.benignErrors, token);
            return updatedExternalreference;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },


    /**
     * csvTableTemplateExternalreference - Returns table's template
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {Array}         Strings, one for header and one columns types
     */
    csvTableTemplateExternalreference: async function(_, context) {
        if (await checkAuthorization(context, 'externalreference', 'read') === true) {
            let token = context.request ?
                context.request.headers ?
                context.request.headers.authorization :
                undefined :
                undefined;
            return externalreference.csvTableTemplate(context.benignErrors, token);
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

    /**
     * externalreferencesZendroDefinition - Return data model definition
     *
     * @param  {string} _       First parameter is not used
     * @param  {object} context Provided to every resolver holds contextual information like the resquest query and user info.
     * @return {GraphQLJSONObject}        Data model definition
     */
    externalreferencesZendroDefinition: async function(_, context) {
        if ((await checkAuthorization(context, "externalreference", "read")) === true) {
            return externalreference.definition;
        } else {
            throw new Error("You don't have authorization to perform this action");
        }
    },

}