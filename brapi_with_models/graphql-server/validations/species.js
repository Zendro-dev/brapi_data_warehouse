// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(species) {

    species.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    species.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "speciesDbId": {
                "type": ["array"]
            },
            "term": {
                "type": ["string", "null"]
            },
            "termURI": {
                "type": ["string", "null"]
            },
            "referenceset_ID": {
                "type": ["string", "null"]
            },
            "reference_ID": {
                "type": ["string", "null"]
            }
        }
    }

    species.prototype.asyncValidate = ajv.compile(
        species.prototype.validatorSchema
    )

    species.prototype.validateForCreate = async function(record) {
        return await species.prototype.asyncValidate(record)
    }

    species.prototype.validateForUpdate = async function(record) {
        return await species.prototype.asyncValidate(record)
    }

    species.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    species.prototype.validateAfterRead = async function(record) {
        return await species.prototype.asyncValidate(record)
    }

    return species
}