// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(coordinate) {

    coordinate.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    coordinate.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "coordinateDbId": {
                "type": ["array"]
            },
            "geometry": {
                "type": ["string", "null"]
            },
            "type": {
                "type": ["string", "null"]
            },
            "germplasmOrigin_IDs": {
                "type": ["array", "null"]
            },
            "location_ID": {
                "type": ["string", "null"]
            },
            "observations_IDs": {
                "type": ["array", "null"]
            },
            "observationUnitPosition_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    coordinate.prototype.asyncValidate = ajv.compile(
        coordinate.prototype.validatorSchema
    )

    coordinate.prototype.validateForCreate = async function(record) {
        return await coordinate.prototype.asyncValidate(record)
    }

    coordinate.prototype.validateForUpdate = async function(record) {
        return await coordinate.prototype.asyncValidate(record)
    }

    coordinate.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    coordinate.prototype.validateAfterRead = async function(record) {
        return await coordinate.prototype.asyncValidate(record)
    }

    return coordinate
}