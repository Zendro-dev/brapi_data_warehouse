// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(list) {

    list.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    list.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "additionalInfo_IDs": {
                "type": ["array", "null"]
            },
            "data": {
                "type": ["array", "null"]
            },
            "dateCreated": {
                "type": ["string", "null"]
            },
            "dateModified": {
                "type": ["string", "null"]
            },
            "externalReferences_IDs": {
                "type": ["array", "null"]
            },
            "listDbId": {
                "type": ["array"]
            },
            "listDescription": {
                "type": ["string", "null"]
            },
            "listName": {
                "type": ["string", "null"]
            },
            "listOwnerName": {
                "type": ["string", "null"]
            },
            "listOwnerPerson_ID": {
                "type": ["string", "null"]
            },
            "listSize": {
                "type": ["integer", "null"]
            },
            "listSource": {
                "type": ["string", "null"]
            },
            "listType": {
                "type": ["string", "null"]
            }
        }
    }

    list.prototype.asyncValidate = ajv.compile(
        list.prototype.validatorSchema
    )

    list.prototype.validateForCreate = async function(record) {
        return await list.prototype.asyncValidate(record)
    }

    list.prototype.validateForUpdate = async function(record) {
        return await list.prototype.asyncValidate(record)
    }

    list.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    list.prototype.validateAfterRead = async function(record) {
        return await list.prototype.asyncValidate(record)
    }

    return list
}