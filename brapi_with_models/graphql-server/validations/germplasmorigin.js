// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(germplasmorigin) {

    germplasmorigin.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    germplasmorigin.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "germplasmOriginDbId": {
                "type": ["array"]
            },
            "coordinateUncertainty": {
                "type": ["string", "null"]
            },
            "coordinates_ID": {
                "type": ["string", "null"]
            },
            "germplasms_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    germplasmorigin.prototype.asyncValidate = ajv.compile(
        germplasmorigin.prototype.validatorSchema
    )

    germplasmorigin.prototype.validateForCreate = async function(record) {
        return await germplasmorigin.prototype.asyncValidate(record)
    }

    germplasmorigin.prototype.validateForUpdate = async function(record) {
        return await germplasmorigin.prototype.asyncValidate(record)
    }

    germplasmorigin.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    germplasmorigin.prototype.validateAfterRead = async function(record) {
        return await germplasmorigin.prototype.asyncValidate(record)
    }

    return germplasmorigin
}