// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(cross) {

    cross.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    cross.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "crossDbId": {
                "type": ["array"]
            },
            "crossName": {
                "type": ["string", "null"]
            },
            "crossType": {
                "type": ["string", "null"]
            },
            "crossingProject_ID": {
                "type": ["string", "null"]
            },
            "plannedCross_ID": {
                "type": ["string", "null"]
            },
            "observationUnits_IDs": {
                "type": ["array", "null"]
            },
            "additionalInfo_IDs": {
                "type": ["array", "null"]
            },
            "externalReferences_IDs": {
                "type": ["array", "null"]
            },
            "crossAttributes_IDs": {
                "type": ["array", "null"]
            },
            "parents_IDs": {
                "type": ["array", "null"]
            },
            "pollinationEvents_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    cross.prototype.asyncValidate = ajv.compile(
        cross.prototype.validatorSchema
    )

    cross.prototype.validateForCreate = async function(record) {
        return await cross.prototype.asyncValidate(record)
    }

    cross.prototype.validateForUpdate = async function(record) {
        return await cross.prototype.asyncValidate(record)
    }

    cross.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    cross.prototype.validateAfterRead = async function(record) {
        return await cross.prototype.asyncValidate(record)
    }

    return cross
}