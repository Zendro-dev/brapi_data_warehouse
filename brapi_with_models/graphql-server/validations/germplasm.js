// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(germplasm) {

    germplasm.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    germplasm.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "germplasmDbId": {
                "type": ["array"]
            },
            "accessionNumber": {
                "type": ["string", "null"]
            },
            "acquisitionDate": {
                "type": ["string", "null"]
            },
            "biologicalStatusOfAccessionCode": {
                "type": ["string", "null"]
            },
            "biologicalStatusOfAccessionDescription": {
                "type": ["string", "null"]
            },
            "breedingMethod_ID": {
                "type": ["string", "null"]
            },
            "pedigreeNode_ID": {
                "type": ["string", "null"]
            },
            "collection": {
                "type": ["string", "null"]
            },
            "commonCropName": {
                "type": ["string", "null"]
            },
            "countryOfOriginCode": {
                "type": ["string", "null"]
            },
            "defaultDisplayName": {
                "type": ["string", "null"]
            },
            "documentationURL": {
                "type": ["string", "null"]
            },
            "genus": {
                "type": ["string", "null"]
            },
            "germplasmName": {
                "type": ["string", "null"]
            },
            "germplasmPUI": {
                "type": ["string", "null"]
            },
            "germplasmPreprocessing": {
                "type": ["string", "null"]
            },
            "instituteCode": {
                "type": ["string", "null"]
            },
            "instituteName": {
                "type": ["string", "null"]
            },
            "pedigree": {
                "type": ["string", "null"]
            },
            "seedSource": {
                "type": ["string", "null"]
            },
            "seedSourceDescription": {
                "type": ["string", "null"]
            },
            "species": {
                "type": ["string", "null"]
            },
            "speciesAuthority": {
                "type": ["string", "null"]
            },
            "subtaxa": {
                "type": ["string", "null"]
            },
            "subtaxaAuthority": {
                "type": ["string", "null"]
            },
            "samples_IDs": {
                "type": ["array", "null"]
            },
            "attributeValues_IDs": {
                "type": ["array", "null"]
            },
            "progenyPedigreeNodes_IDs": {
                "type": ["array", "null"]
            },
            "parentPedigreeNodes_IDs": {
                "type": ["array", "null"]
            },
            "siblingPedigreeNodes_IDs": {
                "type": ["array", "null"]
            },
            "observations_IDs": {
                "type": ["array", "null"]
            },
            "observationUnits_IDs": {
                "type": ["array", "null"]
            },
            "additionalInfo_IDs": {
                "type": ["array", "null"]
            },
            "externalReferences_IDs": {
                "type": ["array", "null"]
            },
            "donors_IDs": {
                "type": ["array", "null"]
            },
            "germplasmOrigin_ID": {
                "type": ["string", "null"]
            },
            "storageTypes_ID": {
                "type": ["string", "null"]
            },
            "synonyms_IDs": {
                "type": ["array", "null"]
            },
            "taxonIds_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    germplasm.prototype.asyncValidate = ajv.compile(
        germplasm.prototype.validatorSchema
    )

    germplasm.prototype.validateForCreate = async function(record) {
        return await germplasm.prototype.asyncValidate(record)
    }

    germplasm.prototype.validateForUpdate = async function(record) {
        return await germplasm.prototype.asyncValidate(record)
    }

    germplasm.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    germplasm.prototype.validateAfterRead = async function(record) {
        return await germplasm.prototype.asyncValidate(record)
    }

    return germplasm
}