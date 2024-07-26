// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(experimentaldesign) {

    experimentaldesign.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    experimentaldesign.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "experimentalDesignDbId": {
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

    experimentaldesign.prototype.asyncValidate = ajv.compile(
        experimentaldesign.prototype.validatorSchema
    )

    experimentaldesign.prototype.validateForCreate = async function(record) {
        return await experimentaldesign.prototype.asyncValidate(record)
    }

    experimentaldesign.prototype.validateForUpdate = async function(record) {
        return await experimentaldesign.prototype.asyncValidate(record)
    }

    experimentaldesign.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    experimentaldesign.prototype.validateAfterRead = async function(record) {
        return await experimentaldesign.prototype.asyncValidate(record)
    }

    return experimentaldesign
}