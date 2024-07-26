// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(ontology) {

    ontology.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    ontology.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "ontologyDbId": {
                "type": ["array"]
            },
            "authors": {
                "type": ["string", "null"]
            },
            "copyright": {
                "type": ["string", "null"]
            },
            "description": {
                "type": ["string", "null"]
            },
            "documentationURL": {
                "type": ["string", "null"]
            },
            "licence": {
                "type": ["string", "null"]
            },
            "ontologyName": {
                "type": ["string", "null"]
            },
            "version": {
                "type": ["string", "null"]
            },
            "additionalInfo_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    ontology.prototype.asyncValidate = ajv.compile(
        ontology.prototype.validatorSchema
    )

    ontology.prototype.validateForCreate = async function(record) {
        return await ontology.prototype.asyncValidate(record)
    }

    ontology.prototype.validateForUpdate = async function(record) {
        return await ontology.prototype.asyncValidate(record)
    }

    ontology.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    ontology.prototype.validateAfterRead = async function(record) {
        return await ontology.prototype.asyncValidate(record)
    }

    return ontology
}