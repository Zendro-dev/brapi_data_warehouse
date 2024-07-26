// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(trait) {

    trait.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    trait.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "traitDbId": {
                "type": ["array"]
            },
            "alternativeAbbreviations": {
                "type": ["array", "null"]
            },
            "attribute": {
                "type": ["string", "null"]
            },
            "attributePUI": {
                "type": ["string", "null"]
            },
            "entity": {
                "type": ["string", "null"]
            },
            "entityPUI": {
                "type": ["string", "null"]
            },
            "mainAbbreviation": {
                "type": ["string", "null"]
            },
            "status": {
                "type": ["string", "null"]
            },
            "synonyms": {
                "type": ["array", "null"]
            },
            "traitClass": {
                "type": ["string", "null"]
            },
            "traitDescription": {
                "type": ["string", "null"]
            },
            "traitName": {
                "type": ["string", "null"]
            },
            "traitPUI": {
                "type": ["string", "null"]
            },
            "additionalInfo_IDs": {
                "type": ["array", "null"]
            },
            "externalReferences_IDs": {
                "type": ["array", "null"]
            },
            "ontologyReference_ID": {
                "type": ["string", "null"]
            },
            "germplasmAttribute_ID": {
                "type": ["string", "null"]
            },
            "observationVariables_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    trait.prototype.asyncValidate = ajv.compile(
        trait.prototype.validatorSchema
    )

    trait.prototype.validateForCreate = async function(record) {
        return await trait.prototype.asyncValidate(record)
    }

    trait.prototype.validateForUpdate = async function(record) {
        return await trait.prototype.asyncValidate(record)
    }

    trait.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    trait.prototype.validateAfterRead = async function(record) {
        return await trait.prototype.asyncValidate(record)
    }

    return trait
}