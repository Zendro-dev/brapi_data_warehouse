// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(call) {

    call.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    call.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "additionalInfo_IDs": {
                "type": ["array", "null"]
            },
            "callDbId": {
                "type": ["array"]
            },
            "callSet_ID": {
                "type": ["string", "null"]
            },
            "genotypeMetadata_IDs": {
                "type": ["array", "null"]
            },
            "genotypeValue": {
                "type": ["string", "null"]
            },
            "phaseSet": {
                "type": ["string", "null"]
            },
            "variant_ID": {
                "type": ["string", "null"]
            },
            "variantSet_ID": {
                "type": ["string", "null"]
            }
        }
    }

    call.prototype.asyncValidate = ajv.compile(
        call.prototype.validatorSchema
    )

    call.prototype.validateForCreate = async function(record) {
        return await call.prototype.asyncValidate(record)
    }

    call.prototype.validateForUpdate = async function(record) {
        return await call.prototype.asyncValidate(record)
    }

    call.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    call.prototype.validateAfterRead = async function(record) {
        return await call.prototype.asyncValidate(record)
    }

    return call
}