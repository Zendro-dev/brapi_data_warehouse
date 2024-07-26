// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(germplasmattributevalue) {

    germplasmattributevalue.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    germplasmattributevalue.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "germplasmAttributeValueDbId": {
                "type": ["array"]
            },
            "attribute_IDs": {
                "type": ["array", "null"]
            },
            "determinedDate": {
                "type": ["string", "null"]
            },
            "germplasm_ID": {
                "type": ["string", "null"]
            },
            "value": {
                "type": ["string", "null"]
            },
            "additionalInfo_IDs": {
                "type": ["array", "null"]
            },
            "externalReferences_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    germplasmattributevalue.prototype.asyncValidate = ajv.compile(
        germplasmattributevalue.prototype.validatorSchema
    )

    germplasmattributevalue.prototype.validateForCreate = async function(record) {
        return await germplasmattributevalue.prototype.asyncValidate(record)
    }

    germplasmattributevalue.prototype.validateForUpdate = async function(record) {
        return await germplasmattributevalue.prototype.asyncValidate(record)
    }

    germplasmattributevalue.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    germplasmattributevalue.prototype.validateAfterRead = async function(record) {
        return await germplasmattributevalue.prototype.asyncValidate(record)
    }

    return germplasmattributevalue
}