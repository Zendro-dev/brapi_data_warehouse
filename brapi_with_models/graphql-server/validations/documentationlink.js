// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(documentationlink) {

    documentationlink.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    documentationlink.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "documentationLinkDbId": {
                "type": ["array"]
            },
            "URL": {
                "type": ["string", "null"]
            },
            "type": {
                "type": ["string", "null"]
            },
            "ontologyReference_ID": {
                "type": ["string", "null"]
            }
        }
    }

    documentationlink.prototype.asyncValidate = ajv.compile(
        documentationlink.prototype.validatorSchema
    )

    documentationlink.prototype.validateForCreate = async function(record) {
        return await documentationlink.prototype.asyncValidate(record)
    }

    documentationlink.prototype.validateForUpdate = async function(record) {
        return await documentationlink.prototype.asyncValidate(record)
    }

    documentationlink.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    documentationlink.prototype.validateAfterRead = async function(record) {
        return await documentationlink.prototype.asyncValidate(record)
    }

    return documentationlink
}