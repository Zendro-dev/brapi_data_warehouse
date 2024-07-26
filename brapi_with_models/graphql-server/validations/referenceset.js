// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(referenceset) {

    referenceset.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    referenceset.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "additionalInfo_IDs": {
                "type": ["array", "null"]
            },
            "assemblyPUI": {
                "type": ["string", "null"]
            },
            "commonCropName": {
                "type": ["string", "null"]
            },
            "description": {
                "type": ["string", "null"]
            },
            "externalReferences_IDs": {
                "type": ["array", "null"]
            },
            "isDerived": {
                "type": ["boolean", "null"]
            },
            "md5checksum": {
                "type": ["string", "null"]
            },
            "referenceSetDbId": {
                "type": ["array"]
            },
            "referenceSetName": {
                "type": ["string", "null"]
            },
            "sourceAccessions": {
                "type": ["array", "null"]
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
            "references_IDs": {
                "type": ["array", "null"]
            },
            "variants_IDs": {
                "type": ["array", "null"]
            },
            "variantSets_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    referenceset.prototype.asyncValidate = ajv.compile(
        referenceset.prototype.validatorSchema
    )

    referenceset.prototype.validateForCreate = async function(record) {
        return await referenceset.prototype.asyncValidate(record)
    }

    referenceset.prototype.validateForUpdate = async function(record) {
        return await referenceset.prototype.asyncValidate(record)
    }

    referenceset.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    referenceset.prototype.validateAfterRead = async function(record) {
        return await referenceset.prototype.asyncValidate(record)
    }

    return referenceset
}