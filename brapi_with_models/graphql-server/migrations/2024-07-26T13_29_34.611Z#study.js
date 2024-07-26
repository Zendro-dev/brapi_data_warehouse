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
            const storageHandler = await zendro.models.study.storageHandler;
            await storageHandler.getQueryInterface()
                .createTable('studies', {
                    studyDbId: {
                        type: Sequelize[dict['[String]']],
                        primaryKey: true
                    },

                    createdAt: {
                        type: Sequelize.DATE
                    },

                    updatedAt: {
                        type: Sequelize.DATE
                    },

                    active: {
                        type: Sequelize[dict['Boolean']]
                    },
                    additionalInfo_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    commonCropName: {
                        type: Sequelize[dict['String']]
                    },
                    contacts_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    culturalPractices: {
                        type: Sequelize[dict['String']]
                    },
                    dataLinks_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    documentationURL: {
                        type: Sequelize[dict['String']]
                    },
                    endDate: {
                        type: Sequelize[dict['String']]
                    },
                    environmentParameters_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    experimentalDesign_ID: {
                        type: Sequelize[dict['String']]
                    },
                    externalReferences_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    growthFacility_ID: {
                        type: Sequelize[dict['String']]
                    },
                    lastUpdate_ID: {
                        type: Sequelize[dict['String']]
                    },
                    license: {
                        type: Sequelize[dict['String']]
                    },
                    location_ID: {
                        type: Sequelize[dict['String']]
                    },
                    observationLevels_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    observationUnitsDescription: {
                        type: Sequelize[dict['String']]
                    },
                    observationVariables_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    seasons: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    startDate: {
                        type: Sequelize[dict['String']]
                    },
                    studyCode: {
                        type: Sequelize[dict['String']]
                    },
                    studyDescription: {
                        type: Sequelize[dict['String']]
                    },
                    studyName: {
                        type: Sequelize[dict['String']]
                    },
                    studyPUI: {
                        type: Sequelize[dict['String']]
                    },
                    studyType: {
                        type: Sequelize[dict['String']]
                    },
                    trial_ID: {
                        type: Sequelize[dict['String']]
                    },
                    callSets_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    plates_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    samples_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    variantSets_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    events_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    observations_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    observationUnits_IDs: {
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
            const storageHandler = await zendro.models.study.storageHandler;
            const recordsExists = await zendro.models.study.count();
            if (recordsExists && !DOWN_MIGRATION) {
                throw new Error(`You are trying to delete all records of study and its associations. 
            If you are sure about this, set environment variable 'DOWN_MIGRATION' to 'true' 
            and re-execute this down-migration.`);
            }
            await storageHandler.getQueryInterface().dropTable('studies');
        } catch (error) {
            throw new Error(error);
        }
    }
};