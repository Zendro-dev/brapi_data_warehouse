// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(pollinationevent) {

    pollinationevent.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    pollinationevent.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "pollinationEventDbId": {
                "type": ["array"]
            },
            "pollinationSuccessful": {
                "type": ["boolean", "null"]
            },
            "pollinationTimeStamp": {
                "type": ["string", "null"]
            },
            "cross_ID": {
                "type": ["string", "null"]
            }
        }
    }

    pollinationevent.prototype.asyncValidate = ajv.compile(
        pollinationevent.prototype.validatorSchema
    )

    pollinationevent.prototype.validateForCreate = async function(record) {
        return await pollinationevent.prototype.asyncValidate(record)
    }

    pollinationevent.prototype.validateForUpdate = async function(record) {
        return await pollinationevent.prototype.asyncValidate(record)
    }

    pollinationevent.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    pollinationevent.prototype.validateAfterRead = async function(record) {
        return await pollinationevent.prototype.asyncValidate(record)
    }

    return pollinationevent
}