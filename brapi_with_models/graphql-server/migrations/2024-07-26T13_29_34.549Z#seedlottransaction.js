'use strict';
const dict = require('../utils/graphql-sequelize-types');
const {
    Sequelize
} = require("sequelize");
const {
    DOWN_MIGRATION
} = require('../config/globals');
/**
 * @module - Migrations to create or to drop a table correpondant to a sequelize model.
 */
module.exports = {

    /**
     * up - Creates a table with the fields specified in the the createTable function.
     *
     * @param  {object} zendro initialized zendro object which provides the access to different APIs
     * in zendro layers (resolvers, models, adapters) and enables graphql queries.
     */
    up: async (zendro) => {
        try {
            const storageHandler = await zendro.models.seedlottransaction.storageHandler;
            await storageHandler.getQueryInterface()
                .createTable('seedlottransactions', {
                    seedLotTransactionDbId: {
                        type: Sequelize[dict['[String]']],
                        primaryKey: true
                    },

                    createdAt: {
                        type: Sequelize.DATE
                    },

                    updatedAt: {
                        type: Sequelize.DATE
                    },

                    amount: {
                        type: Sequelize[dict['Float']]
                    },
                    fromSeedLot_ID: {
                        type: Sequelize[dict['String']]
                    },
                    toSeedLot_ID: {
                        type: Sequelize[dict['String']]
                    },
                    transactionDescription: {
                        type: Sequelize[dict['String']]
                    },
                    transactionTimestamp: {
                        type: Sequelize[dict['String']]
                    },
                    units: {
                        type: Sequelize[dict['String']]
                    },
                    additionalInfo_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    externalReferences_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    }

                });
        } catch (error) {
            throw new Error(error);
        }
    },

    /**
     * down - Drop a table.
     *
     * @param  {object} zendro initialized zendro object which provides the access to different APIs
     * in zendro layers (resolvers, models, adapters) and enables graphql queries.
     */
    down: async (zendro) => {
        try {
            const storageHandler = await zendro.models.seedlottransaction.storageHandler;
            const recordsExists = await zendro.models.seedlottransaction.count();
            if (recordsExists && !DOWN_MIGRATION) {
                throw new Error(`You are trying to delete all records of seedlottransaction and its associations. 
            If you are sure about this, set environment variable 'DOWN_MIGRATION' to 'true' 
            and re-execute this down-migration.`);
            }
            await storageHandler.getQueryInterface().dropTable('seedlottransactions');
        } catch (error) {
            throw new Error(error);
        }
    }
};