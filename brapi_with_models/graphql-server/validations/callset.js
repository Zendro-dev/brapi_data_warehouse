// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(callset) {

    callset.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    callset.prototype.validatorSchema = {
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
            "callSetDbId": {
                "type": ["array"]
            },
            "callSetName": {
                "type": ["string", "null"]
            },
            "created": {
                "type": ["string", "null"]
            },
            "externalReferences_IDs": {
                "type": ["array", "null"]
            },
            "sample_ID": {
                "type": ["string", "null"]
            },
            "study_ID": {
                "type": ["string", "null"]
            },
            "updated": {
                "type": ["string", "null"]
            },
            "variantSets_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    callset.prototype.asyncValidate = ajv.compile(
        callset.prototype.validatorSchema
    )

    callset.prototype.validateForCreate = async function(record) {
        return await callset.prototype.asyncValidate(record)
    }

    callset.prototype.validateForUpdate = async function(record) {
        return await callset.prototype.asyncValidate(record)
    }

    callset.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    callset.prototype.validateAfterRead = async function(record) {
        return await callset.prototype.asyncValidate(record)
    }

    return callset
}