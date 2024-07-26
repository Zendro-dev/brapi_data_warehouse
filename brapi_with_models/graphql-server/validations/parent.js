// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(parent) {

    parent.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    parent.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "parentDbId": {
                "type": ["array"]
            },
            "parentGermplasm_ID": {
                "type": ["string", "null"]
            },
            "germplasmName": {
                "type": ["string", "null"]
            },
            "observationUnitID": {
                "type": ["string", "null"]
            },
            "observationUnitName": {
                "type": ["string", "null"]
            },
            "parentType": {
                "type": ["string", "null"]
            },
            "crosses_IDs": {
                "type": ["array", "null"]
            },
            "crossingProjects_IDs": {
                "type": ["array", "null"]
            },
            "pedigreeNode_IDs": {
                "type": ["array", "null"]
            },
            "plannedCrosses_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    parent.prototype.asyncValidate = ajv.compile(
        parent.prototype.validatorSchema
    )

    parent.prototype.validateForCreate = async function(record) {
        return await parent.prototype.asyncValidate(record)
    }

    parent.prototype.validateForUpdate = async function(record) {
        return await parent.prototype.asyncValidate(record)
    }

    parent.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    parent.prototype.validateAfterRead = async function(record) {
        return await parent.prototype.asyncValidate(record)
    }

    return parent
}