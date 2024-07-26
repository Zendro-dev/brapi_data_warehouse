// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(crossingproject) {

    crossingproject.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    crossingproject.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "crossingProjectDbId": {
                "type": ["array"]
            },
            "commonCropName": {
                "type": ["string", "null"]
            },
            "crossingProjectDescription": {
                "type": ["string", "null"]
            },
            "crossingProjectName": {
                "type": ["string", "null"]
            },
            "program_ID": {
                "type": ["string", "null"]
            },
            "crosses_IDs": {
                "type": ["array", "null"]
            },
            "plannedCrosses_IDs": {
                "type": ["array", "null"]
            },
            "pedigreeNodes_IDs": {
                "type": ["array", "null"]
            },
            "additionalInfo_IDs": {
                "type": ["array", "null"]
            },
            "externalReferences_IDs": {
                "type": ["array", "null"]
            },
            "potentialParents_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    crossingproject.prototype.asyncValidate = ajv.compile(
        crossingproject.prototype.validatorSchema
    )

    crossingproject.prototype.validateForCreate = async function(record) {
        return await crossingproject.prototype.asyncValidate(record)
    }

    crossingproject.prototype.validateForUpdate = async function(record) {
        return await crossingproject.prototype.asyncValidate(record)
    }

    crossingproject.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    crossingproject.prototype.validateAfterRead = async function(record) {
        return await crossingproject.prototype.asyncValidate(record)
    }

    return crossingproject
}