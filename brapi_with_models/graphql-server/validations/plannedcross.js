// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(plannedcross) {

    plannedcross.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    plannedcross.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "plannedCrossDbId": {
                "type": ["array"]
            },
            "crossType": {
                "type": ["string", "null"]
            },
            "crossingProject_ID": {
                "type": ["string", "null"]
            },
            "plannedCrossName": {
                "type": ["string", "null"]
            },
            "status": {
                "type": ["string", "null"]
            },
            "crosses_IDs": {
                "type": ["array", "null"]
            },
            "additionalInfo_IDs": {
                "type": ["array", "null"]
            },
            "externalReferences_IDs": {
                "type": ["array", "null"]
            },
            "parents_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    plannedcross.prototype.asyncValidate = ajv.compile(
        plannedcross.prototype.validatorSchema
    )

    plannedcross.prototype.validateForCreate = async function(record) {
        return await plannedcross.prototype.asyncValidate(record)
    }

    plannedcross.prototype.validateForUpdate = async function(record) {
        return await plannedcross.prototype.asyncValidate(record)
    }

    plannedcross.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    plannedcross.prototype.validateAfterRead = async function(record) {
        return await plannedcross.prototype.asyncValidate(record)
    }

    return plannedcross
}