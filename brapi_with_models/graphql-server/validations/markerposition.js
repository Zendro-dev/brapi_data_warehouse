// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(markerposition) {

    markerposition.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    markerposition.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "additionalInfo_IDs": {
                "type": ["array", "null"]
            },
            "linkageGroupName": {
                "type": ["string", "null"]
            },
            "map_ID": {
                "type": ["string", "null"]
            },
            "markerPositionDbId": {
                "type": ["array"]
            },
            "position": {
                "type": ["integer", "null"]
            },
            "variant_ID": {
                "type": ["string", "null"]
            }
        }
    }

    markerposition.prototype.asyncValidate = ajv.compile(
        markerposition.prototype.validatorSchema
    )

    markerposition.prototype.validateForCreate = async function(record) {
        return await markerposition.prototype.asyncValidate(record)
    }

    markerposition.prototype.validateForUpdate = async function(record) {
        return await markerposition.prototype.asyncValidate(record)
    }

    markerposition.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    markerposition.prototype.validateAfterRead = async function(record) {
        return await markerposition.prototype.asyncValidate(record)
    }

    return markerposition
}