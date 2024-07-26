// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(trial) {

    trial.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    trial.prototype.validatorSchema = {
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
            "datasetAuthorships_IDs": {
                "type": ["array", "null"]
            },
            "documentationURL": {
                "type": ["string", "null"]
            },
            "endDate": {
                "type": ["string", "null"]
            },
            "externalReferences_IDs": {
                "type": ["array", "null"]
            },
            "program_ID": {
                "type": ["string", "null"]
            },
            "studies_IDs": {
                "type": ["array", "null"]
            },
            "publications_IDs": {
                "type": ["array", "null"]
            },
            "startDate": {
                "type": ["string", "null"]
            },
            "trialDbId": {
                "type": ["array"]
            },
            "trialDescription": {
                "type": ["string", "null"]
            },
            "trialName": {
                "type": ["string", "null"]
            },
            "trialPUI": {
                "type": ["string", "null"]
            },
            "plates_IDs": {
                "type": ["array", "null"]
            },
            "samples_IDs": {
                "type": ["array", "null"]
            },
            "observationUnits_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    trial.prototype.asyncValidate = ajv.compile(
        trial.prototype.validatorSchema
    )

    trial.prototype.validateForCreate = async function(record) {
        return await trial.prototype.asyncValidate(record)
    }

    trial.prototype.validateForUpdate = async function(record) {
        return await trial.prototype.asyncValidate(record)
    }

    trial.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    trial.prototype.validateAfterRead = async function(record) {
        return await trial.prototype.asyncValidate(record)
    }

    return trial
}