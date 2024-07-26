// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(plate) {

    plate.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    plate.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "additionalInfo_IDs": {
                "type": ["array", "null"]
            },
            "externalReferences_IDs": {
                "type": ["array", "null"]
            },
            "plateBarcode": {
                "type": ["string", "null"]
            },
            "plateFormat": {
                "type": ["string", "null"]
            },
            "plateDbId": {
                "type": ["array"]
            },
            "plateName": {
                "type": ["string", "null"]
            },
            "program_ID": {
                "type": ["string", "null"]
            },
            "sampleType": {
                "type": ["string", "null"]
            },
            "study_ID": {
                "type": ["string", "null"]
            },
            "trial_ID": {
                "type": ["string", "null"]
            },
            "samples_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    plate.prototype.asyncValidate = ajv.compile(
        plate.prototype.validatorSchema
    )

    plate.prototype.validateForCreate = async function(record) {
        return await plate.prototype.asyncValidate(record)
    }

    plate.prototype.validateForUpdate = async function(record) {
        return await plate.prototype.asyncValidate(record)
    }

    plate.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    plate.prototype.validateAfterRead = async function(record) {
        return await plate.prototype.asyncValidate(record)
    }

    return plate
}