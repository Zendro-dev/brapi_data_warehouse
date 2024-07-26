// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(eventparameter) {

    eventparameter.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    eventparameter.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "eventParameterDbId": {
                "type": ["array"]
            },
            "code": {
                "type": ["string", "null"]
            },
            "description": {
                "type": ["string", "null"]
            },
            "name": {
                "type": ["string", "null"]
            },
            "units": {
                "type": ["string", "null"]
            },
            "value": {
                "type": ["string", "null"]
            },
            "valueDescription": {
                "type": ["string", "null"]
            },
            "valuesByDate": {
                "type": ["array", "null"]
            },
            "event_ID": {
                "type": ["string", "null"]
            }
        }
    }

    eventparameter.prototype.asyncValidate = ajv.compile(
        eventparameter.prototype.validatorSchema
    )

    eventparameter.prototype.validateForCreate = async function(record) {
        return await eventparameter.prototype.asyncValidate(record)
    }

    eventparameter.prototype.validateForUpdate = async function(record) {
        return await eventparameter.prototype.asyncValidate(record)
    }

    eventparameter.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    eventparameter.prototype.validateAfterRead = async function(record) {
        return await eventparameter.prototype.asyncValidate(record)
    }

    return eventparameter
}