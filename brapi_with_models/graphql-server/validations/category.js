// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(category) {

    category.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    category.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "categoryDbId": {
                "type": ["array"]
            },
            "label": {
                "type": ["string", "null"]
            },
            "value": {
                "type": ["string", "null"]
            },
            "validValues_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    category.prototype.asyncValidate = ajv.compile(
        category.prototype.validatorSchema
    )

    category.prototype.validateForCreate = async function(record) {
        return await category.prototype.asyncValidate(record)
    }

    category.prototype.validateForUpdate = async function(record) {
        return await category.prototype.asyncValidate(record)
    }

    category.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    category.prototype.validateAfterRead = async function(record) {
        return await category.prototype.asyncValidate(record)
    }

    return category
}