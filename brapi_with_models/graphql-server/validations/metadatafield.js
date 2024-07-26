// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(metadatafield) {

    metadatafield.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    metadatafield.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "metadataFieldDbId": {
                "type": ["array"]
            },
            "dataType": {
                "type": ["string", "null"]
            },
            "fieldAbbreviation": {
                "type": ["string", "null"]
            },
            "fieldName": {
                "type": ["string", "null"]
            },
            "variantset_ID": {
                "type": ["string", "null"]
            }
        }
    }

    metadatafield.prototype.asyncValidate = ajv.compile(
        metadatafield.prototype.validatorSchema
    )

    metadatafield.prototype.validateForCreate = async function(record) {
        return await metadatafield.prototype.asyncValidate(record)
    }

    metadatafield.prototype.validateForUpdate = async function(record) {
        return await metadatafield.prototype.asyncValidate(record)
    }

    metadatafield.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    metadatafield.prototype.validateAfterRead = async function(record) {
        return await metadatafield.prototype.asyncValidate(record)
    }

    return metadatafield
}