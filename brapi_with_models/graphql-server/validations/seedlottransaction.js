// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(seedlottransaction) {

    seedlottransaction.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    seedlottransaction.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "seedLotTransactionDbId": {
                "type": ["array"]
            },
            "amount": {
                "type": ["number", "null"]
            },
            "fromSeedLot_ID": {
                "type": ["string", "null"]
            },
            "toSeedLot_ID": {
                "type": ["string", "null"]
            },
            "transactionDescription": {
                "type": ["string", "null"]
            },
            "transactionTimestamp": {
                "type": ["string", "null"]
            },
            "units": {
                "type": ["string", "null"]
            },
            "additionalInfo_IDs": {
                "type": ["array", "null"]
            },
            "externalReferences_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    seedlottransaction.prototype.asyncValidate = ajv.compile(
        seedlottransaction.prototype.validatorSchema
    )

    seedlottransaction.prototype.validateForCreate = async function(record) {
        return await seedlottransaction.prototype.asyncValidate(record)
    }

    seedlottransaction.prototype.validateForUpdate = async function(record) {
        return await seedlottransaction.prototype.asyncValidate(record)
    }

    seedlottransaction.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    seedlottransaction.prototype.validateAfterRead = async function(record) {
        return await seedlottransaction.prototype.asyncValidate(record)
    }

    return seedlottransaction
}