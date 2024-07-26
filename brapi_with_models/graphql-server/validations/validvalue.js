// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(validvalue) {

    validvalue.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    validvalue.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "validValueDbId": {
                "type": ["array"]
            },
            "maximumValue": {
                "type": ["string", "null"]
            },
            "minimumValue": {
                "type": ["string", "null"]
            },
            "categories_IDs": {
                "type": ["array", "null"]
            },
            "scales_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    validvalue.prototype.asyncValidate = ajv.compile(
        validvalue.prototype.validatorSchema
    )

    validvalue.prototype.validateForCreate = async function(record) {
        return await validvalue.prototype.asyncValidate(record)
    }

    validvalue.prototype.validateForUpdate = async function(record) {
        return await validvalue.prototype.asyncValidate(record)
    }

    validvalue.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    validvalue.prototype.validateAfterRead = async function(record) {
        return await validvalue.prototype.asyncValidate(record)
    }

    return validvalue
}