// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(donor) {

    donor.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    donor.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "donorDbId": {
                "type": ["array"]
            },
            "donorAccessionNumber": {
                "type": ["string", "null"]
            },
            "donorInstituteCode": {
                "type": ["string", "null"]
            },
            "germplasms_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    donor.prototype.asyncValidate = ajv.compile(
        donor.prototype.validatorSchema
    )

    donor.prototype.validateForCreate = async function(record) {
        return await donor.prototype.asyncValidate(record)
    }

    donor.prototype.validateForUpdate = async function(record) {
        return await donor.prototype.asyncValidate(record)
    }

    donor.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    donor.prototype.validateAfterRead = async function(record) {
        return await donor.prototype.asyncValidate(record)
    }

    return donor
}