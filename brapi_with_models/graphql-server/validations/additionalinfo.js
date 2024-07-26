// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(additionalinfo) {

    additionalinfo.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    additionalinfo.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "additionalInfoDbId": {
                "type": ["array"]
            },
            "additionalProperties": {
                "type": ["string", "null"]
            },
            "call_ID": {
                "type": ["string", "null"]
            },
            "callSet_ID": {
                "type": ["string", "null"]
            },
            "cross_ID": {
                "type": ["string", "null"]
            },
            "crossingProject_ID": {
                "type": ["string", "null"]
            },
            "event_ID": {
                "type": ["string", "null"]
            },
            "genomeMap_ID": {
                "type": ["string", "null"]
            },
            "germplasm_ID": {
                "type": ["string", "null"]
            },
            "germplasmAttribute_ID": {
                "type": ["string", "null"]
            },
            "germplasmAttributeValue_ID": {
                "type": ["string", "null"]
            },
            "image_ID": {
                "type": ["string", "null"]
            },
            "list_ID": {
                "type": ["string", "null"]
            },
            "location_ID": {
                "type": ["string", "null"]
            },
            "markerPosition_ID": {
                "type": ["string", "null"]
            },
            "method_ID": {
                "type": ["string", "null"]
            },
            "observation_ID": {
                "type": ["string", "null"]
            },
            "observationUnit_ID": {
                "type": ["string", "null"]
            },
            "observationVariable_ID": {
                "type": ["string", "null"]
            },
            "ontology_ID": {
                "type": ["string", "null"]
            },
            "person_ID": {
                "type": ["string", "null"]
            },
            "pedigreeNode_ID": {
                "type": ["string", "null"]
            },
            "plannedCross_ID": {
                "type": ["string", "null"]
            },
            "plate_ID": {
                "type": ["string", "null"]
            },
            "program_ID": {
                "type": ["string", "null"]
            },
            "reference_ID": {
                "type": ["string", "null"]
            },
            "referenceSet_ID": {
                "type": ["string", "null"]
            },
            "sample_ID": {
                "type": ["string", "null"]
            },
            "scale_ID": {
                "type": ["string", "null"]
            },
            "seedLot_ID": {
                "type": ["string", "null"]
            },
            "seedLotTransaction_ID": {
                "type": ["string", "null"]
            },
            "study_ID": {
                "type": ["string", "null"]
            },
            "trait_ID": {
                "type": ["string", "null"]
            },
            "trial_ID": {
                "type": ["string", "null"]
            },
            "variant_ID": {
                "type": ["string", "null"]
            },
            "variantSet_ID": {
                "type": ["string", "null"]
            }
        }
    }

    additionalinfo.prototype.asyncValidate = ajv.compile(
        additionalinfo.prototype.validatorSchema
    )

    additionalinfo.prototype.validateForCreate = async function(record) {
        return await additionalinfo.prototype.asyncValidate(record)
    }

    additionalinfo.prototype.validateForUpdate = async function(record) {
        return await additionalinfo.prototype.asyncValidate(record)
    }

    additionalinfo.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    additionalinfo.prototype.validateAfterRead = async function(record) {
        return await additionalinfo.prototype.asyncValidate(record)
    }

    return additionalinfo
}