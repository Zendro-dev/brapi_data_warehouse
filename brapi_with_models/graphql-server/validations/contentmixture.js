// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(contentmixture) {

    contentmixture.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    contentmixture.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "contentMixtureDbId": {
                "type": ["array"]
            },
            "crossDbId": {
                "type": ["string", "null"]
            },
            "crossName": {
                "type": ["string", "null"]
            },
            "germplasmDbId": {
                "type": ["string", "null"]
            },
            "germplasmName": {
                "type": ["string", "null"]
            },
            "mixturePercentage": {
                "type": ["integer", "null"]
            },
            "seedLot_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    contentmixture.prototype.asyncValidate = ajv.compile(
        contentmixture.prototype.validatorSchema
    )

    contentmixture.prototype.validateForCreate = async function(record) {
        return await contentmixture.prototype.asyncValidate(record)
    }

    contentmixture.prototype.validateForUpdate = async function(record) {
        return await contentmixture.prototype.asyncValidate(record)
    }

    contentmixture.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    contentmixture.prototype.validateAfterRead = async function(record) {
        return await contentmixture.prototype.asyncValidate(record)
    }

    return contentmixture
}