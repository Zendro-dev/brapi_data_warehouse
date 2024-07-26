// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(observationunitposition) {

    observationunitposition.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    observationunitposition.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "observationUnitPositionDbId": {
                "type": ["array"]
            },
            "entryType": {
                "type": ["string", "null"]
            },
            "positionCoordinateX": {
                "type": ["string", "null"]
            },
            "positionCoordinateXType": {
                "type": ["string", "null"]
            },
            "positionCoordinateY": {
                "type": ["string", "null"]
            },
            "positionCoordinateYType": {
                "type": ["string", "null"]
            },
            "observationUnit_ID": {
                "type": ["string", "null"]
            },
            "geoCoordinates_ID": {
                "type": ["string", "null"]
            },
            "observationLevel_IDs": {
                "type": ["array", "null"]
            },
            "observationLevelRelationships_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    observationunitposition.prototype.asyncValidate = ajv.compile(
        observationunitposition.prototype.validatorSchema
    )

    observationunitposition.prototype.validateForCreate = async function(record) {
        return await observationunitposition.prototype.asyncValidate(record)
    }

    observationunitposition.prototype.validateForUpdate = async function(record) {
        return await observationunitposition.prototype.asyncValidate(record)
    }

    observationunitposition.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    observationunitposition.prototype.validateAfterRead = async function(record) {
        return await observationunitposition.prototype.asyncValidate(record)
    }

    return observationunitposition
}