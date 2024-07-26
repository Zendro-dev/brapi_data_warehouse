// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(sibling) {

    sibling.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    sibling.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "siblingDbId": {
                "type": ["array"]
            },
            "siblingGermplasm_ID": {
                "type": ["string", "null"]
            },
            "pedigreeNode_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    sibling.prototype.asyncValidate = ajv.compile(
        sibling.prototype.validatorSchema
    )

    sibling.prototype.validateForCreate = async function(record) {
        return await sibling.prototype.asyncValidate(record)
    }

    sibling.prototype.validateForUpdate = async function(record) {
        return await sibling.prototype.asyncValidate(record)
    }

    sibling.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    sibling.prototype.validateAfterRead = async function(record) {
        return await sibling.prototype.asyncValidate(record)
    }

    return sibling
}