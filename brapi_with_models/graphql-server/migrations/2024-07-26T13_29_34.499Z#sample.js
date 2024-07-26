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
            const storageHandler = await zendro.models.sample.storageHandler;
            await storageHandler.getQueryInterface()
                .createTable('samples', {
                    sampleDbId: {
                        type: Sequelize[dict['[String]']],
                        primaryKey: true
                    },

                    createdAt: {
                        type: Sequelize.DATE
                    },

                    updatedAt: {
                        type: Sequelize.DATE
                    },

                    additionalInfo_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    callSets_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    column: {
                        type: Sequelize[dict['Int']]
                    },
                    externalReferences_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    germplasm_ID: {
                        type: Sequelize[dict['String']]
                    },
                    observationUnit_ID: {
                        type: Sequelize[dict['String']]
                    },
                    plate_ID: {
                        type: Sequelize[dict['String']]
                    },
                    program_ID: {
                        type: Sequelize[dict['String']]
                    },
                    row: {
                        type: Sequelize[dict['String']]
                    },
                    sampleBarcode: {
                        type: Sequelize[dict['String']]
                    },
                    sampleDescription: {
                        type: Sequelize[dict['String']]
                    },
                    sampleGroupId: {
                        type: Sequelize[dict['String']]
                    },
                    sampleName: {
                        type: Sequelize[dict['String']]
                    },
                    samplePUI: {
                        type: Sequelize[dict['String']]
                    },
                    sampleTimestamp: {
                        type: Sequelize[dict['String']]
                    },
                    sampleType: {
                        type: Sequelize[dict['String']]
                    },
                    study_ID: {
                        type: Sequelize[dict['String']]
                    },
                    takenBy: {
                        type: Sequelize[dict['String']]
                    },
                    tissueType: {
                        type: Sequelize[dict['String']]
                    },
                    trial_ID: {
                        type: Sequelize[dict['String']]
                    },
                    well: {
                        type: Sequelize[dict['String']]
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
            const storageHandler = await zendro.models.sample.storageHandler;
            const recordsExists = await zendro.models.sample.count();
            if (recordsExists && !DOWN_MIGRATION) {
                throw new Error(`You are trying to delete all records of sample and its associations. 
            If you are sure about this, set environment variable 'DOWN_MIGRATION' to 'true' 
            and re-execute this down-migration.`);
            }
            await storageHandler.getQueryInterface().dropTable('samples');
        } catch (error) {
            throw new Error(error);
        }
    }
};