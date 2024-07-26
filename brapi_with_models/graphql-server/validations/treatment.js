// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(treatment) {

    treatment.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    treatment.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "treatmentDbId": {
                "type": ["array"]
            },
            "factor": {
                "type": ["string", "null"]
            },
            "modality": {
                "type": ["string", "null"]
            },
            "observationUnits_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    treatment.prototype.asyncValidate = ajv.compile(
        treatment.prototype.validatorSchema
    )

    treatment.prototype.validateForCreate = async function(record) {
        return await treatment.prototype.asyncValidate(record)
    }

    treatment.prototype.validateForUpdate = async function(record) {
        return await treatment.prototype.asyncValidate(record)
    }

    treatment.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    treatment.prototype.validateAfterRead = async function(record) {
        return await treatment.prototype.asyncValidate(record)
    }

    return treatment
}