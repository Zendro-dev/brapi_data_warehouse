// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(sample) {

    sample.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    sample.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "additionalInfo_IDs": {
                "type": ["array", "null"]
            },
            "callSets_IDs": {
                "type": ["array", "null"]
            },
            "column": {
                "type": ["integer", "null"]
            },
            "externalReferences_IDs": {
                "type": ["array", "null"]
            },
            "germplasm_ID": {
                "type": ["string", "null"]
            },
            "observationUnit_ID": {
                "type": ["string", "null"]
            },
            "plate_ID": {
                "type": ["string", "null"]
            },
            "program_ID": {
                "type": ["string", "null"]
            },
            "row": {
                "type": ["string", "null"]
            },
            "sampleBarcode": {
                "type": ["string", "null"]
            },
            "sampleDescription": {
                "type": ["string", "null"]
            },
            "sampleDbId": {
                "type": ["array"]
            },
            "sampleGroupId": {
                "type": ["string", "null"]
            },
            "sampleName": {
                "type": ["string", "null"]
            },
            "samplePUI": {
                "type": ["string", "null"]
            },
            "sampleTimestamp": {
                "type": ["string", "null"]
            },
            "sampleType": {
                "type": ["string", "null"]
            },
            "study_ID": {
                "type": ["string", "null"]
            },
            "takenBy": {
                "type": ["string", "null"]
            },
            "tissueType": {
                "type": ["string", "null"]
            },
            "trial_ID": {
                "type": ["string", "null"]
            },
            "well": {
                "type": ["string", "null"]
            }
        }
    }

    sample.prototype.asyncValidate = ajv.compile(
        sample.prototype.validatorSchema
    )

    sample.prototype.validateForCreate = async function(record) {
        return await sample.prototype.asyncValidate(record)
    }

    sample.prototype.validateForUpdate = async function(record) {
        return await sample.prototype.asyncValidate(record)
    }

    sample.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    sample.prototype.validateAfterRead = async function(record) {
        return await sample.prototype.asyncValidate(record)
    }

    return sample
}