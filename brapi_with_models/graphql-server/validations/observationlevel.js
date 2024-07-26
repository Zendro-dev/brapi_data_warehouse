// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(observationlevel) {

    observationlevel.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    observationlevel.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "observationLevelDbId": {
                "type": ["array"]
            },
            "levelCode": {
                "type": ["string", "null"]
            },
            "levelName": {
                "type": ["string", "null"]
            },
            "levelOrder": {
                "type": ["integer", "null"]
            },
            "observationUnitPosition_ID": {
                "type": ["string", "null"]
            },
            "study_ID": {
                "type": ["string", "null"]
            }
        }
    }

    observationlevel.prototype.asyncValidate = ajv.compile(
        observationlevel.prototype.validatorSchema
    )

    observationlevel.prototype.validateForCreate = async function(record) {
        return await observationlevel.prototype.asyncValidate(record)
    }

    observationlevel.prototype.validateForUpdate = async function(record) {
        return await observationlevel.prototype.asyncValidate(record)
    }

    observationlevel.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    observationlevel.prototype.validateAfterRead = async function(record) {
        return await observationlevel.prototype.asyncValidate(record)
    }

    return observationlevel
}