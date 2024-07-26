// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(contact) {

    contact.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    contact.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "contactDbId": {
                "type": ["array"]
            },
            "email": {
                "type": ["string", "null"]
            },
            "instituteName": {
                "type": ["string", "null"]
            },
            "name": {
                "type": ["string", "null"]
            },
            "orcid": {
                "type": ["string", "null"]
            },
            "type": {
                "type": ["string", "null"]
            },
            "study_ID": {
                "type": ["string", "null"]
            },
            "trial_ID": {
                "type": ["string", "null"]
            }
        }
    }

    contact.prototype.asyncValidate = ajv.compile(
        contact.prototype.validatorSchema
    )

    contact.prototype.validateForCreate = async function(record) {
        return await contact.prototype.asyncValidate(record)
    }

    contact.prototype.validateForUpdate = async function(record) {
        return await contact.prototype.asyncValidate(record)
    }

    contact.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    contact.prototype.validateAfterRead = async function(record) {
        return await contact.prototype.asyncValidate(record)
    }

    return contact
}