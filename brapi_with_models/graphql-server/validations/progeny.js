// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(progeny) {

    progeny.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    progeny.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "progenyDbId": {
                "type": ["array"]
            },
            "progenyGermplasm_ID": {
                "type": ["string", "null"]
            },
            "parentType": {
                "type": ["string", "null"]
            },
            "pedigreeNode_ID": {
                "type": ["string", "null"]
            }
        }
    }

    progeny.prototype.asyncValidate = ajv.compile(
        progeny.prototype.validatorSchema
    )

    progeny.prototype.validateForCreate = async function(record) {
        return await progeny.prototype.asyncValidate(record)
    }

    progeny.prototype.validateForUpdate = async function(record) {
        return await progeny.prototype.asyncValidate(record)
    }

    progeny.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    progeny.prototype.validateAfterRead = async function(record) {
        return await progeny.prototype.asyncValidate(record)
    }

    return progeny
}