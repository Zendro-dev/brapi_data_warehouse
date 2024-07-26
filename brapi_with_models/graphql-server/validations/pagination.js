// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(pagination) {

    pagination.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    pagination.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "paginationDbId": {
                "type": ["array"]
            },
            "dimension": {
                "type": ["string", "null"]
            },
            "page": {
                "type": ["integer", "null"]
            },
            "pageSize": {
                "type": ["integer", "null"]
            },
            "totalCount": {
                "type": ["integer", "null"]
            },
            "totalPages": {
                "type": ["integer", "null"]
            },
            "alleleMatrices_ID": {
                "type": ["string", "null"]
            }
        }
    }

    pagination.prototype.asyncValidate = ajv.compile(
        pagination.prototype.validatorSchema
    )

    pagination.prototype.validateForCreate = async function(record) {
        return await pagination.prototype.asyncValidate(record)
    }

    pagination.prototype.validateForUpdate = async function(record) {
        return await pagination.prototype.asyncValidate(record)
    }

    pagination.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    pagination.prototype.validateAfterRead = async function(record) {
        return await pagination.prototype.asyncValidate(record)
    }

    return pagination
}