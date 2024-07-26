// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(crossattribute) {

    crossattribute.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    crossattribute.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "crossAttributeDbId": {
                "type": ["array"]
            },
            "crossAttributeName": {
                "type": ["string", "null"]
            },
            "crossAttributeValue": {
                "type": ["string", "null"]
            },
            "cross_ID": {
                "type": ["string", "null"]
            }
        }
    }

    crossattribute.prototype.asyncValidate = ajv.compile(
        crossattribute.prototype.validatorSchema
    )

    crossattribute.prototype.validateForCreate = async function(record) {
        return await crossattribute.prototype.asyncValidate(record)
    }

    crossattribute.prototype.validateForUpdate = async function(record) {
        return await crossattribute.prototype.asyncValidate(record)
    }

    crossattribute.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    crossattribute.prototype.validateAfterRead = async function(record) {
        return await crossattribute.prototype.asyncValidate(record)
    }

    return crossattribute
}