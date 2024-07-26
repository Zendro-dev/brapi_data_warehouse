// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(environmentparameter) {

    environmentparameter.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    environmentparameter.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "environmentParameterDbId": {
                "type": ["array"]
            },
            "description": {
                "type": ["string", "null"]
            },
            "parameterName": {
                "type": ["string", "null"]
            },
            "parameterPUI": {
                "type": ["string", "null"]
            },
            "unit": {
                "type": ["string", "null"]
            },
            "unitPUI": {
                "type": ["string", "null"]
            },
            "value": {
                "type": ["string", "null"]
            },
            "valuePUI": {
                "type": ["string", "null"]
            },
            "study_ID": {
                "type": ["string", "null"]
            }
        }
    }

    environmentparameter.prototype.asyncValidate = ajv.compile(
        environmentparameter.prototype.validatorSchema
    )

    environmentparameter.prototype.validateForCreate = async function(record) {
        return await environmentparameter.prototype.asyncValidate(record)
    }

    environmentparameter.prototype.validateForUpdate = async function(record) {
        return await environmentparameter.prototype.asyncValidate(record)
    }

    environmentparameter.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    environmentparameter.prototype.validateAfterRead = async function(record) {
        return await environmentparameter.prototype.asyncValidate(record)
    }

    return environmentparameter
}