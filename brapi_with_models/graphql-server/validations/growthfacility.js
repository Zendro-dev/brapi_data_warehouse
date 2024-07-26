// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(growthfacility) {

    growthfacility.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    growthfacility.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "growthFacilityDbId": {
                "type": ["array"]
            },
            "PUI": {
                "type": ["string", "null"]
            },
            "description": {
                "type": ["string", "null"]
            },
            "study_ID": {
                "type": ["string", "null"]
            }
        }
    }

    growthfacility.prototype.asyncValidate = ajv.compile(
        growthfacility.prototype.validatorSchema
    )

    growthfacility.prototype.validateForCreate = async function(record) {
        return await growthfacility.prototype.asyncValidate(record)
    }

    growthfacility.prototype.validateForUpdate = async function(record) {
        return await growthfacility.prototype.asyncValidate(record)
    }

    growthfacility.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    growthfacility.prototype.validateAfterRead = async function(record) {
        return await growthfacility.prototype.asyncValidate(record)
    }

    return growthfacility
}