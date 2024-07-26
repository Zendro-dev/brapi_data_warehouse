// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(storagetype) {

    storagetype.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    storagetype.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "storageTypeDbId": {
                "type": ["array"]
            },
            "code": {
                "type": ["string", "null"]
            },
            "description": {
                "type": ["string", "null"]
            },
            "germplasms_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    storagetype.prototype.asyncValidate = ajv.compile(
        storagetype.prototype.validatorSchema
    )

    storagetype.prototype.validateForCreate = async function(record) {
        return await storagetype.prototype.asyncValidate(record)
    }

    storagetype.prototype.validateForUpdate = async function(record) {
        return await storagetype.prototype.asyncValidate(record)
    }

    storagetype.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    storagetype.prototype.validateAfterRead = async function(record) {
        return await storagetype.prototype.asyncValidate(record)
    }

    return storagetype
}