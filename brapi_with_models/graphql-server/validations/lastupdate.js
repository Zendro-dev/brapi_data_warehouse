// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(lastupdate) {

    lastupdate.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    lastupdate.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "lastUpdateDbId": {
                "type": ["array"]
            },
            "timestamp": {
                "type": ["string", "null"]
            },
            "version": {
                "type": ["string", "null"]
            },
            "study_ID": {
                "type": ["string", "null"]
            }
        }
    }

    lastupdate.prototype.asyncValidate = ajv.compile(
        lastupdate.prototype.validatorSchema
    )

    lastupdate.prototype.validateForCreate = async function(record) {
        return await lastupdate.prototype.asyncValidate(record)
    }

    lastupdate.prototype.validateForUpdate = async function(record) {
        return await lastupdate.prototype.asyncValidate(record)
    }

    lastupdate.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    lastupdate.prototype.validateAfterRead = async function(record) {
        return await lastupdate.prototype.asyncValidate(record)
    }

    return lastupdate
}