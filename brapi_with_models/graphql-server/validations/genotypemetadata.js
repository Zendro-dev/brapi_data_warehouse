// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(genotypemetadata) {

    genotypemetadata.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    genotypemetadata.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "genotypeMetadataDbId": {
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
            "fieldValue": {
                "type": ["string", "null"]
            },
            "call_ID": {
                "type": ["string", "null"]
            }
        }
    }

    genotypemetadata.prototype.asyncValidate = ajv.compile(
        genotypemetadata.prototype.validatorSchema
    )

    genotypemetadata.prototype.validateForCreate = async function(record) {
        return await genotypemetadata.prototype.asyncValidate(record)
    }

    genotypemetadata.prototype.validateForUpdate = async function(record) {
        return await genotypemetadata.prototype.asyncValidate(record)
    }

    genotypemetadata.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    genotypemetadata.prototype.validateAfterRead = async function(record) {
        return await genotypemetadata.prototype.asyncValidate(record)
    }

    return genotypemetadata
}