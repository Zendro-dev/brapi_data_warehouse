// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(datalink) {

    datalink.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    datalink.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "dataLinkDbId": {
                "type": ["array"]
            },
            "dataFormat": {
                "type": ["string", "null"]
            },
            "description": {
                "type": ["string", "null"]
            },
            "fileFormat": {
                "type": ["string", "null"]
            },
            "name": {
                "type": ["string", "null"]
            },
            "provenance": {
                "type": ["string", "null"]
            },
            "scientificType": {
                "type": ["string", "null"]
            },
            "url": {
                "type": ["string", "null"]
            },
            "version": {
                "type": ["string", "null"]
            },
            "study_ID": {
                "type": ["string", "null"]
            }
        }
    }

    datalink.prototype.asyncValidate = ajv.compile(
        datalink.prototype.validatorSchema
    )

    datalink.prototype.validateForCreate = async function(record) {
        return await datalink.prototype.asyncValidate(record)
    }

    datalink.prototype.validateForUpdate = async function(record) {
        return await datalink.prototype.asyncValidate(record)
    }

    datalink.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    datalink.prototype.validateAfterRead = async function(record) {
        return await datalink.prototype.asyncValidate(record)
    }

    return datalink
}