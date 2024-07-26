// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(datasetauthorship) {

    datasetauthorship.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    datasetauthorship.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "datasetAuthorshipDbId": {
                "type": ["array"]
            },
            "license": {
                "type": ["string", "null"]
            },
            "publicReleaseDate": {
                "type": ["string", "null"]
            },
            "submissionDate": {
                "type": ["string", "null"]
            },
            "trial_ID": {
                "type": ["string", "null"]
            }
        }
    }

    datasetauthorship.prototype.asyncValidate = ajv.compile(
        datasetauthorship.prototype.validatorSchema
    )

    datasetauthorship.prototype.validateForCreate = async function(record) {
        return await datasetauthorship.prototype.asyncValidate(record)
    }

    datasetauthorship.prototype.validateForUpdate = async function(record) {
        return await datasetauthorship.prototype.asyncValidate(record)
    }

    datasetauthorship.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    datasetauthorship.prototype.validateAfterRead = async function(record) {
        return await datasetauthorship.prototype.asyncValidate(record)
    }

    return datasetauthorship
}