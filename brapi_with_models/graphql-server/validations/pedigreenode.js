// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(pedigreenode) {

    pedigreenode.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    pedigreenode.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "pedigreeNodeDbId": {
                "type": ["array"]
            },
            "breedingMethod_ID": {
                "type": ["string", "null"]
            },
            "crossingProject_ID": {
                "type": ["string", "null"]
            },
            "crossingYear": {
                "type": ["integer", "null"]
            },
            "defaultDisplayName": {
                "type": ["string", "null"]
            },
            "familyCode": {
                "type": ["string", "null"]
            },
            "germplasm_ID": {
                "type": ["string", "null"]
            },
            "germplasmPUI": {
                "type": ["string", "null"]
            },
            "pedigreeString": {
                "type": ["string", "null"]
            },
            "additionalInfo_IDs": {
                "type": ["array", "null"]
            },
            "externalReferences_IDs": {
                "type": ["array", "null"]
            },
            "parents_IDs": {
                "type": ["array", "null"]
            },
            "progeny_IDs": {
                "type": ["array", "null"]
            },
            "siblings_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    pedigreenode.prototype.asyncValidate = ajv.compile(
        pedigreenode.prototype.validatorSchema
    )

    pedigreenode.prototype.validateForCreate = async function(record) {
        return await pedigreenode.prototype.asyncValidate(record)
    }

    pedigreenode.prototype.validateForUpdate = async function(record) {
        return await pedigreenode.prototype.asyncValidate(record)
    }

    pedigreenode.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    pedigreenode.prototype.validateAfterRead = async function(record) {
        return await pedigreenode.prototype.asyncValidate(record)
    }

    return pedigreenode
}