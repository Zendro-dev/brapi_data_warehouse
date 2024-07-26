// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(ontologyreference) {

    ontologyreference.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    ontologyreference.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "ontologyReferenceDbId": {
                "type": ["array"]
            },
            "ontologyName": {
                "type": ["string", "null"]
            },
            "version": {
                "type": ["string", "null"]
            },
            "germplasmAttribute_ID": {
                "type": ["string", "null"]
            },
            "method_ID": {
                "type": ["string", "null"]
            },
            "observationVariable_ID": {
                "type": ["string", "null"]
            },
            "scale_ID": {
                "type": ["string", "null"]
            },
            "trait_ID": {
                "type": ["string", "null"]
            },
            "documentationLinks_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    ontologyreference.prototype.asyncValidate = ajv.compile(
        ontologyreference.prototype.validatorSchema
    )

    ontologyreference.prototype.validateForCreate = async function(record) {
        return await ontologyreference.prototype.asyncValidate(record)
    }

    ontologyreference.prototype.validateForUpdate = async function(record) {
        return await ontologyreference.prototype.asyncValidate(record)
    }

    ontologyreference.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    ontologyreference.prototype.validateAfterRead = async function(record) {
        return await ontologyreference.prototype.asyncValidate(record)
    }

    return ontologyreference
}