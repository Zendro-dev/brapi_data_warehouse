// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(datamatrix) {

    datamatrix.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    datamatrix.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "dataMatrixDbId": {
                "type": ["array"]
            },
            "dataMatrix": {
                "type": ["array", "null"]
            },
            "dataMatrixAbbreviation": {
                "type": ["string", "null"]
            },
            "dataMatrixName": {
                "type": ["string", "null"]
            },
            "dataType": {
                "type": ["string", "null"]
            },
            "alleleMatrices_ID": {
                "type": ["string", "null"]
            }
        }
    }

    datamatrix.prototype.asyncValidate = ajv.compile(
        datamatrix.prototype.validatorSchema
    )

    datamatrix.prototype.validateForCreate = async function(record) {
        return await datamatrix.prototype.asyncValidate(record)
    }

    datamatrix.prototype.validateForUpdate = async function(record) {
        return await datamatrix.prototype.asyncValidate(record)
    }

    datamatrix.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    datamatrix.prototype.validateAfterRead = async function(record) {
        return await datamatrix.prototype.asyncValidate(record)
    }

    return datamatrix
}