// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(allelematrix) {

    allelematrix.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    allelematrix.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "alleleMatrixDbId": {
                "type": ["array"]
            },
            "callSets_IDs": {
                "type": ["array", "null"]
            },
            "dataMatrices_IDs": {
                "type": ["array", "null"]
            },
            "expandHomozygotes": {
                "type": ["boolean", "null"]
            },
            "pagination_IDs": {
                "type": ["array", "null"]
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
            "variantSets_IDs": {
                "type": ["array", "null"]
            },
            "variants_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    allelematrix.prototype.asyncValidate = ajv.compile(
        allelematrix.prototype.validatorSchema
    )

    allelematrix.prototype.validateForCreate = async function(record) {
        return await allelematrix.prototype.asyncValidate(record)
    }

    allelematrix.prototype.validateForUpdate = async function(record) {
        return await allelematrix.prototype.asyncValidate(record)
    }

    allelematrix.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    allelematrix.prototype.validateAfterRead = async function(record) {
        return await allelematrix.prototype.asyncValidate(record)
    }

    return allelematrix
}