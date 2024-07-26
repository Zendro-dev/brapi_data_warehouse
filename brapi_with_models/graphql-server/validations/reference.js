// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(reference) {

    reference.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    reference.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "additionalInfo_IDs": {
                "type": ["array", "null"]
            },
            "commonCropName": {
                "type": ["string", "null"]
            },
            "externalReferences_IDs": {
                "type": ["array", "null"]
            },
            "isDerived": {
                "type": ["boolean", "null"]
            },
            "length": {
                "type": ["integer", "null"]
            },
            "md5checksum": {
                "type": ["string", "null"]
            },
            "referenceDbId": {
                "type": ["array"]
            },
            "referenceName": {
                "type": ["string", "null"]
            },
            "referenceSet_ID": {
                "type": ["string", "null"]
            },
            "sourceAccessions": {
                "type": ["array", "null"]
            },
            "sourceDivergence": {
                "type": ["number", "null"]
            },
            "sourceGermplasm_IDs": {
                "type": ["array", "null"]
            },
            "sourceURI": {
                "type": ["string", "null"]
            },
            "species_ID": {
                "type": ["string", "null"]
            },
            "variants_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    reference.prototype.asyncValidate = ajv.compile(
        reference.prototype.validatorSchema
    )

    reference.prototype.validateForCreate = async function(record) {
        return await reference.prototype.asyncValidate(record)
    }

    reference.prototype.validateForUpdate = async function(record) {
        return await reference.prototype.asyncValidate(record)
    }

    reference.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    reference.prototype.validateAfterRead = async function(record) {
        return await reference.prototype.asyncValidate(record)
    }

    return reference
}