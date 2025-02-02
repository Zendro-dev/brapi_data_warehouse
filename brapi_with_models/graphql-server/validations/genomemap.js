// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(genomemap) {

    genomemap.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    genomemap.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "additionalInfo_IDs": {
                "type": ["array", "null"]
            },
            "markerPositions_IDs": {
                "type": ["array", "null"]
            },
            "comments": {
                "type": ["string", "null"]
            },
            "commonCropName": {
                "type": ["string", "null"]
            },
            "documentationURL": {
                "type": ["string", "null"]
            },
            "linkageGroupCount": {
                "type": ["integer", "null"]
            },
            "genomeMapDbId": {
                "type": ["array"]
            },
            "mapName": {
                "type": ["string", "null"]
            },
            "mapPUI": {
                "type": ["string", "null"]
            },
            "markerCount": {
                "type": ["integer", "null"]
            },
            "publishedDate": {
                "type": ["string", "null"]
            },
            "scientificName": {
                "type": ["string", "null"]
            },
            "type": {
                "type": ["string", "null"]
            },
            "unit": {
                "type": ["string", "null"]
            }
        }
    }

    genomemap.prototype.asyncValidate = ajv.compile(
        genomemap.prototype.validatorSchema
    )

    genomemap.prototype.validateForCreate = async function(record) {
        return await genomemap.prototype.asyncValidate(record)
    }

    genomemap.prototype.validateForUpdate = async function(record) {
        return await genomemap.prototype.asyncValidate(record)
    }

    genomemap.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    genomemap.prototype.validateAfterRead = async function(record) {
        return await genomemap.prototype.asyncValidate(record)
    }

    return genomemap
}