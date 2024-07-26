// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(imagelocation) {

    imagelocation.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    imagelocation.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "imageLocationDbId": {
                "type": ["array"]
            },
            "geometry": {
                "type": ["string", "null"]
            },
            "type": {
                "type": ["string", "null"]
            },
            "images_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    imagelocation.prototype.asyncValidate = ajv.compile(
        imagelocation.prototype.validatorSchema
    )

    imagelocation.prototype.validateForCreate = async function(record) {
        return await imagelocation.prototype.asyncValidate(record)
    }

    imagelocation.prototype.validateForUpdate = async function(record) {
        return await imagelocation.prototype.asyncValidate(record)
    }

    imagelocation.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    imagelocation.prototype.validateAfterRead = async function(record) {
        return await imagelocation.prototype.asyncValidate(record)
    }

    return imagelocation
}