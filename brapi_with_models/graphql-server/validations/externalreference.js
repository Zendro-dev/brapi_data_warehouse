// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(externalreference) {

    externalreference.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    externalreference.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "externalReferenceDbId": {
                "type": ["array"]
            },
            "externalID": {
                "type": ["string", "null"]
            },
            "referenceSource": {
                "type": ["string", "null"]
            },
            "callset_ID": {
                "type": ["string", "null"]
            },
            "cross_ID": {
                "type": ["string", "null"]
            },
            "crossingProject_ID": {
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
            "method_ID": {
                "type": ["string", "null"]
            },
            "list_ID": {
                "type": ["string", "null"]
            },
            "location_ID": {
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
            "plate_ID": {
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
            "program_ID": {
                "type": ["string", "null"]
            },
            "reference_ID": {
                "type": ["string", "null"]
            },
            "referenceset_ID": {
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
            "variantset_ID": {
                "type": ["string", "null"]
            }
        }
    }

    externalreference.prototype.asyncValidate = ajv.compile(
        externalreference.prototype.validatorSchema
    )

    externalreference.prototype.validateForCreate = async function(record) {
        return await externalreference.prototype.asyncValidate(record)
    }

    externalreference.prototype.validateForUpdate = async function(record) {
        return await externalreference.prototype.asyncValidate(record)
    }

    externalreference.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    externalreference.prototype.validateAfterRead = async function(record) {
        return await externalreference.prototype.asyncValidate(record)
    }

    return externalreference
}