// Delete this file, if you do not want or need any validations.
const validatorUtil = require('../utils/validatorUtil')
const Ajv = require('ajv')
const ajv = validatorUtil.addValidatorFunc(validatorUtil.addDateTimeAjvKeywords(new Ajv({
    allErrors: true
})))

// Dear user, edit the schema to adjust it to your model
module.exports.validator_patch = function(seedlot) {

    seedlot.prototype.validationControl = {
        validateForCreate: true,
        validateForUpdate: true,
        validateForDelete: false,
        validateAfterRead: false
    }

    seedlot.prototype.validatorSchema = {
        "$async": true,
        "type": "object",
        "properties": {
            "seedLotDbId": {
                "type": ["array"]
            },
            "amount": {
                "type": ["number", "null"]
            },
            "createdDate": {
                "type": ["string", "null"]
            },
            "lastUpdated": {
                "type": ["string", "null"]
            },
            "location_ID": {
                "type": ["string", "null"]
            },
            "program_ID": {
                "type": ["string", "null"]
            },
            "seedLotDescription": {
                "type": ["string", "null"]
            },
            "seedLotName": {
                "type": ["string", "null"]
            },
            "sourceCollection": {
                "type": ["string", "null"]
            },
            "storageLocation": {
                "type": ["string", "null"]
            },
            "units": {
                "type": ["string", "null"]
            },
            "fromSeedLotTransactions_IDs": {
                "type": ["array", "null"]
            },
            "toSeedLotTransactions_IDs": {
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
            "contentMixture_IDs": {
                "type": ["array", "null"]
            }
        }
    }

    seedlot.prototype.asyncValidate = ajv.compile(
        seedlot.prototype.validatorSchema
    )

    seedlot.prototype.validateForCreate = async function(record) {
        return await seedlot.prototype.asyncValidate(record)
    }

    seedlot.prototype.validateForUpdate = async function(record) {
        return await seedlot.prototype.asyncValidate(record)
    }

    seedlot.prototype.validateForDelete = async function(id) {

        //TODO: on the input you have the id of the record to be deleted, no generic
        // validation checks are available. You might need to import the correspondant model
        // in order to read the whole record info and the do the validation.

        return {
            error: null
        }
    }

    seedlot.prototype.validateAfterRead = async function(record) {
        return await seedlot.prototype.asyncValidate(record)
    }

    return seedlot
}