// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(availableformat) {

    availableformat.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    availableformat.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "availableFormatDbId": {
                "type": ["array"]
            },
            "dataFormat": {
                "type": ["string", "null"]
            },
            "expandHomozygotes": {
                "type": ["boolean", "null"]
            },
            "fileFormat": {
                "type": ["string", "null"]
            },
            "fileURL": {
                "type": ["string", "null"]
            },
            "sepPhased": {
                "type": ["string", "null"]
            },
            "sepUnphased": {
                "type": ["string", "null"]
            },
            "unknownString": {
                "type": ["string", "null"]
            },
            "variantset_ID": {
                "type": ["string", "null"]
            }
        }
    }

    availableformat.prototype.asyncValidate = ajv.compile(
        availableformat.prototype.validatorSchema
    )

    availableformat.prototype.validateForCreate = async function(record) {
        return await availableformat.prototype.asyncValidate(record)
    }

    availableformat.prototype.validateForUpdate = async function(record) {
        return await availableformat.prototype.asyncValidate(record)
    }

    availableformat.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    availableformat.prototype.validateAfterRead = async function(record) {
        return await availableformat.prototype.asyncValidate(record)
    }

    return availableformat
}