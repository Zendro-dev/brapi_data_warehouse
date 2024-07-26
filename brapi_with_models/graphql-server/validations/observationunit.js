// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(observationunit) {

    observationunit.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    observationunit.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "observationUnitDbId": {
                "type": ["array"]
            },
            "cross_ID": {
                "type": ["string", "null"]
            },
            "germplasm_ID": {
                "type": ["string", "null"]
            },
            "location_ID": {
                "type": ["string", "null"]
            },
            "observationUnitName": {
                "type": ["string", "null"]
            },
            "observationUnitPUI": {
                "type": ["string", "null"]
            },
            "program_ID": {
                "type": ["string", "null"]
            },
            "seedLot_ID": {
                "type": ["string", "null"]
            },
            "study_ID": {
                "type": ["string", "null"]
            },
            "trial_ID": {
                "type": ["string", "null"]
            },
            "samples_IDs": {
                "type": ["array", "null"]
            },
            "events_IDs": {
                "type": ["array", "null"]
            },
            "images_IDs": {
                "type": ["array", "null"]
            },
            "observations_IDs": {
                "type": ["array", "null"]
            },
            "additionalInfo_IDs": {
                "type": ["array", "null"]
            },
            "externalReferences_IDs": {
                "type": ["array", "null"]
            },
            "observationUnitPosition_ID": {
                "type": ["string", "null"]
            },
            "treatments_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    observationunit.prototype.asyncValidate = ajv.compile(
        observationunit.prototype.validatorSchema
    )

    observationunit.prototype.validateForCreate = async function(record) {
        return await observationunit.prototype.asyncValidate(record)
    }

    observationunit.prototype.validateForUpdate = async function(record) {
        return await observationunit.prototype.asyncValidate(record)
    }

    observationunit.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    observationunit.prototype.validateAfterRead = async function(record) {
        return await observationunit.prototype.asyncValidate(record)
    }

    return observationunit
}