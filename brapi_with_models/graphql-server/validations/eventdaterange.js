// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(eventdaterange) {

    eventdaterange.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    eventdaterange.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "eventDateRangeDbId": {
                "type": ["array"]
            },
            "discreteDates": {
                "type": ["array", "null"]
            },
            "endDate": {
                "type": ["string", "null"]
            },
            "startDate": {
                "type": ["string", "null"]
            },
            "event_ID": {
                "type": ["string", "null"]
            }
        }
    }

    eventdaterange.prototype.asyncValidate = ajv.compile(
        eventdaterange.prototype.validatorSchema
    )

    eventdaterange.prototype.validateForCreate = async function(record) {
        return await eventdaterange.prototype.asyncValidate(record)
    }

    eventdaterange.prototype.validateForUpdate = async function(record) {
        return await eventdaterange.prototype.asyncValidate(record)
    }

    eventdaterange.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    eventdaterange.prototype.validateAfterRead = async function(record) {
        return await eventdaterange.prototype.asyncValidate(record)
    }

    return eventdaterange
}