// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(synonym) {

    synonym.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    synonym.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "synonymDbId": {
                "type": ["array"]
            },
            "synonym": {
                "type": ["string", "null"]
            },
            "type": {
                "type": ["string", "null"]
            },
            "germplasm_ID": {
                "type": ["string", "null"]
            }
        }
    }

    synonym.prototype.asyncValidate = ajv.compile(
        synonym.prototype.validatorSchema
    )

    synonym.prototype.validateForCreate = async function(record) {
        return await synonym.prototype.asyncValidate(record)
    }

    synonym.prototype.validateForUpdate = async function(record) {
        return await synonym.prototype.asyncValidate(record)
    }

    synonym.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    synonym.prototype.validateAfterRead = async function(record) {
        return await synonym.prototype.asyncValidate(record)
    }

    return synonym
}