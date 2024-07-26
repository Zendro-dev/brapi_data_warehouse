// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(observationlevelrelationship) {

    observationlevelrelationship.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    observationlevelrelationship.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "observationLevelRelationshipDbId": {
                "type": ["array"]
            },
            "levelCode": {
                "type": ["string", "null"]
            },
            "levelName": {
                "type": ["string", "null"]
            },
            "levelOrder": {
                "type": ["integer", "null"]
            },
            "observationUnitDbId": {
                "type": ["string", "null"]
            },
            "observationUnitPositions_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    observationlevelrelationship.prototype.asyncValidate = ajv.compile(
        observationlevelrelationship.prototype.validatorSchema
    )

    observationlevelrelationship.prototype.validateForCreate = async function(record) {
        return await observationlevelrelationship.prototype.asyncValidate(record)
    }

    observationlevelrelationship.prototype.validateForUpdate = async function(record) {
        return await observationlevelrelationship.prototype.asyncValidate(record)
    }

    observationlevelrelationship.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    observationlevelrelationship.prototype.validateAfterRead = async function(record) {
        return await observationlevelrelationship.prototype.asyncValidate(record)
    }

    return observationlevelrelationship
}