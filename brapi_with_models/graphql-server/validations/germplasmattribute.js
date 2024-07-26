// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(germplasmattribute) {

    germplasmattribute.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    germplasmattribute.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "germplasmAttributeDbId": {
                "type": ["array"]
            },
            "attributeName": {
                "type": ["string", "null"]
            },
            "attributeCategory": {
                "type": ["string", "null"]
            },
            "attributeDescription": {
                "type": ["string", "null"]
            },
            "attributePUI": {
                "type": ["string", "null"]
            },
            "commonCropName": {
                "type": ["string", "null"]
            },
            "contextOfUse": {
                "type": ["array", "null"]
            },
            "defaultValue": {
                "type": ["string", "null"]
            },
            "documentationURL": {
                "type": ["string", "null"]
            },
            "growthStage": {
                "type": ["string", "null"]
            },
            "institution": {
                "type": ["string", "null"]
            },
            "language": {
                "type": ["string", "null"]
            },
            "scientist": {
                "type": ["string", "null"]
            },
            "status": {
                "type": ["string", "null"]
            },
            "submissionTimestamp": {
                "type": ["string", "null"]
            },
            "synonyms": {
                "type": ["array", "null"]
            },
            "germplasmAttributeValues_IDs": {
                "type": ["array", "null"]
            },
            "additionalInfo_IDs": {
                "type": ["array", "null"]
            },
            "externalReferences_IDs": {
                "type": ["array", "null"]
            },
            "method_ID": {
                "type": ["string", "null"]
            },
            "ontologyReference_ID": {
                "type": ["string", "null"]
            },
            "scale_ID": {
                "type": ["string", "null"]
            },
            "trait_ID": {
                "type": ["string", "null"]
            }
        }
    }

    germplasmattribute.prototype.asyncValidate = ajv.compile(
        germplasmattribute.prototype.validatorSchema
    )

    germplasmattribute.prototype.validateForCreate = async function(record) {
        return await germplasmattribute.prototype.asyncValidate(record)
    }

    germplasmattribute.prototype.validateForUpdate = async function(record) {
        return await germplasmattribute.prototype.asyncValidate(record)
    }

    germplasmattribute.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    germplasmattribute.prototype.validateAfterRead = async function(record) {
        return await germplasmattribute.prototype.asyncValidate(record)
    }

    return germplasmattribute
}