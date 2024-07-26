// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(study) {

    study.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    study.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "active": {
                "type": ["boolean", "null"]
            },
            "additionalInfo_IDs": {
                "type": ["array", "null"]
            },
            "commonCropName": {
                "type": ["string", "null"]
            },
            "contacts_IDs": {
                "type": ["array", "null"]
            },
            "culturalPractices": {
                "type": ["string", "null"]
            },
            "dataLinks_IDs": {
                "type": ["array", "null"]
            },
            "documentationURL": {
                "type": ["string", "null"]
            },
            "endDate": {
                "type": ["string", "null"]
            },
            "environmentParameters_IDs": {
                "type": ["array", "null"]
            },
            "experimentalDesign_ID": {
                "type": ["string", "null"]
            },
            "externalReferences_IDs": {
                "type": ["array", "null"]
            },
            "growthFacility_ID": {
                "type": ["string", "null"]
            },
            "lastUpdate_ID": {
                "type": ["string", "null"]
            },
            "license": {
                "type": ["string", "null"]
            },
            "location_ID": {
                "type": ["string", "null"]
            },
            "observationLevels_IDs": {
                "type": ["array", "null"]
            },
            "observationUnitsDescription": {
                "type": ["string", "null"]
            },
            "observationVariables_IDs": {
                "type": ["array", "null"]
            },
            "seasons": {
                "type": ["array", "null"]
            },
            "startDate": {
                "type": ["string", "null"]
            },
            "studyCode": {
                "type": ["string", "null"]
            },
            "studyDbId": {
                "type": ["array"]
            },
            "studyDescription": {
                "type": ["string", "null"]
            },
            "studyName": {
                "type": ["string", "null"]
            },
            "studyPUI": {
                "type": ["string", "null"]
            },
            "studyType": {
                "type": ["string", "null"]
            },
            "trial_ID": {
                "type": ["string", "null"]
            },
            "callSets_IDs": {
                "type": ["array", "null"]
            },
            "plates_IDs": {
                "type": ["array", "null"]
            },
            "samples_IDs": {
                "type": ["array", "null"]
            },
            "variantSets_IDs": {
                "type": ["array", "null"]
            },
            "events_IDs": {
                "type": ["array", "null"]
            },
            "observations_IDs": {
                "type": ["array", "null"]
            },
            "observationUnits_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    study.prototype.asyncValidate = ajv.compile(
        study.prototype.validatorSchema
    )

    study.prototype.validateForCreate = async function(record) {
        return await study.prototype.asyncValidate(record)
    }

    study.prototype.validateForUpdate = async function(record) {
        return await study.prototype.asyncValidate(record)
    }

    study.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    study.prototype.validateAfterRead = async function(record) {
        return await study.prototype.asyncValidate(record)
    }

    return study
}