// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(breedingmethod) {

    breedingmethod.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    breedingmethod.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "breedingMethodDbId": {
                "type": ["array"]
            },
            "abbreviation": {
                "type": ["string", "null"]
            },
            "breedingMethodName": {
                "type": ["string", "null"]
            },
            "description": {
                "type": ["string", "null"]
            },
            "germplasm_IDs": {
                "type": ["array", "null"]
            },
            "pedigreeNodes_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    breedingmethod.prototype.asyncValidate = ajv.compile(
        breedingmethod.prototype.validatorSchema
    )

    breedingmethod.prototype.validateForCreate = async function(record) {
        return await breedingmethod.prototype.asyncValidate(record)
    }

    breedingmethod.prototype.validateForUpdate = async function(record) {
        return await breedingmethod.prototype.asyncValidate(record)
    }

    breedingmethod.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    breedingmethod.prototype.validateAfterRead = async function(record) {
        return await breedingmethod.prototype.asyncValidate(record)
    }

    return breedingmethod
}