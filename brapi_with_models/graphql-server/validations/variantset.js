// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(variantset) {

    variantset.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    variantset.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "additionalInfo_IDs": {
                "type": ["array", "null"]
            },
            "alleleMatrices_IDs": {
                "type": ["array", "null"]
            },
            "calls_IDs": {
                "type": ["array", "null"]
            },
            "callSets_IDs": {
                "type": ["array", "null"]
            },
            "analysis_IDs": {
                "type": ["array", "null"]
            },
            "availableFormats_IDs": {
                "type": ["array", "null"]
            },
            "callSetCount": {
                "type": ["integer", "null"]
            },
            "externalReferences_IDs": {
                "type": ["array", "null"]
            },
            "metadataFields_IDs": {
                "type": ["array", "null"]
            },
            "referenceSet_ID": {
                "type": ["string", "null"]
            },
            "study_ID": {
                "type": ["string", "null"]
            },
            "variantCount": {
                "type": ["integer", "null"]
            },
            "variantSetDbId": {
                "type": ["array"]
            },
            "variantSetName": {
                "type": ["string", "null"]
            },
            "variants_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    variantset.prototype.asyncValidate = ajv.compile(
        variantset.prototype.validatorSchema
    )

    variantset.prototype.validateForCreate = async function(record) {
        return await variantset.prototype.asyncValidate(record)
    }

    variantset.prototype.validateForUpdate = async function(record) {
        return await variantset.prototype.asyncValidate(record)
    }

    variantset.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    variantset.prototype.validateAfterRead = async function(record) {
        return await variantset.prototype.asyncValidate(record)
    }

    return variantset
}