// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(variant) {

    variant.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    variant.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "additionalInfo_IDs": {
                "type": ["array", "null"]
            },
            "markerPositions_IDs": {
                "type": ["array", "null"]
            },
            "alleleMatrices_IDs": {
                "type": ["array", "null"]
            },
            "calls_IDs": {
                "type": ["array", "null"]
            },
            "analysis": {
                "type": ["array", "null"]
            },
            "ciend": {
                "type": ["array", "null"]
            },
            "cipos": {
                "type": ["array", "null"]
            },
            "created": {
                "type": ["string", "null"]
            },
            "end": {
                "type": ["integer", "null"]
            },
            "externalReferences_IDs": {
                "type": ["array", "null"]
            },
            "filtersApplied": {
                "type": ["boolean", "null"]
            },
            "filtersFailed": {
                "type": ["array", "null"]
            },
            "filtersPassed": {
                "type": ["boolean", "null"]
            },
            "reference_ID": {
                "type": ["string", "null"]
            },
            "referenceBases": {
                "type": ["string", "null"]
            },
            "referenceSet_ID": {
                "type": ["string", "null"]
            },
            "start": {
                "type": ["integer", "null"]
            },
            "svlen": {
                "type": ["integer", "null"]
            },
            "updated": {
                "type": ["string", "null"]
            },
            "variantDbId": {
                "type": ["array"]
            },
            "variantNames": {
                "type": ["array", "null"]
            },
            "variantSet_ID": {
                "type": ["string", "null"]
            },
            "variantType": {
                "type": ["string", "null"]
            }
        }
    }

    variant.prototype.asyncValidate = ajv.compile(
        variant.prototype.validatorSchema
    )

    variant.prototype.validateForCreate = async function(record) {
        return await variant.prototype.asyncValidate(record)
    }

    variant.prototype.validateForUpdate = async function(record) {
        return await variant.prototype.asyncValidate(record)
    }

    variant.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    variant.prototype.validateAfterRead = async function(record) {
        return await variant.prototype.asyncValidate(record)
    }

    return variant
}