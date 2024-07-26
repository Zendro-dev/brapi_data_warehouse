// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(location) {

    location.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    location.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "abbreviation": {
                "type": ["string", "null"]
            },
            "additionalInfo_IDs": {
                "type": ["array", "null"]
            },
            "coordinateDescription": {
                "type": ["string", "null"]
            },
            "coordinateUncertainty": {
                "type": ["string", "null"]
            },
            "coordinates_ID": {
                "type": ["string", "null"]
            },
            "countryCode": {
                "type": ["string", "null"]
            },
            "countryName": {
                "type": ["string", "null"]
            },
            "documentationURL": {
                "type": ["string", "null"]
            },
            "environmentType": {
                "type": ["string", "null"]
            },
            "exposure": {
                "type": ["string", "null"]
            },
            "externalReferences_IDs": {
                "type": ["array", "null"]
            },
            "instituteAddress": {
                "type": ["string", "null"]
            },
            "instituteName": {
                "type": ["string", "null"]
            },
            "locationDbId": {
                "type": ["array"]
            },
            "locationName": {
                "type": ["string", "null"]
            },
            "locationType": {
                "type": ["string", "null"]
            },
            "parentLocation_ID": {
                "type": ["string", "null"]
            },
            "childLocations_IDs": {
                "type": ["array", "null"]
            },
            "studies_IDs": {
                "type": ["array", "null"]
            },
            "siteStatus": {
                "type": ["string", "null"]
            },
            "slope": {
                "type": ["string", "null"]
            },
            "topography": {
                "type": ["string", "null"]
            },
            "seedLots_IDs": {
                "type": ["array", "null"]
            },
            "observationUnits_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    location.prototype.asyncValidate = ajv.compile(
        location.prototype.validatorSchema
    )

    location.prototype.validateForCreate = async function(record) {
        return await location.prototype.asyncValidate(record)
    }

    location.prototype.validateForUpdate = async function(record) {
        return await location.prototype.asyncValidate(record)
    }

    location.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    location.prototype.validateAfterRead = async function(record) {
        return await location.prototype.asyncValidate(record)
    }

    return location
}