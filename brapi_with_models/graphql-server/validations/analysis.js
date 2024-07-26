// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(analysis) {

    analysis.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    analysis.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "analysisDbId": {
                "type": ["array"]
            },
            "analysisName": {
                "type": ["string", "null"]
            },
            "created": {
                "type": ["string", "null"]
            },
            "description": {
                "type": ["string", "null"]
            },
            "software": {
                "type": ["array", "null"]
            },
            "type": {
                "type": ["string", "null"]
            },
            "updated": {
                "type": ["string", "null"]
            },
            "variantset_ID": {
                "type": ["string", "null"]
            }
        }
    }

    analysis.prototype.asyncValidate = ajv.compile(
        analysis.prototype.validatorSchema
    )

    analysis.prototype.validateForCreate = async function(record) {
        return await analysis.prototype.asyncValidate(record)
    }

    analysis.prototype.validateForUpdate = async function(record) {
        return await analysis.prototype.asyncValidate(record)
    }

    analysis.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    analysis.prototype.validateAfterRead = async function(record) {
        return await analysis.prototype.asyncValidate(record)
    }

    return analysis
}