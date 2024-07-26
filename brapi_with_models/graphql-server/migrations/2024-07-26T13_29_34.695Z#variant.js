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
            const storageHandler = await zendro.models.variant.storageHandler;
            await storageHandler.getQueryInterface()
                .createTable('variants', {
                    variantDbId: {
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
                    markerPositions_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    alleleMatrices_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    calls_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    analysis: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    ciend: {
                        type: Sequelize[dict['[Int]']],
                        defaultValue: '[]'
                    },
                    cipos: {
                        type: Sequelize[dict['[Int]']],
                        defaultValue: '[]'
                    },
                    created: {
                        type: Sequelize[dict['String']]
                    },
                    end: {
                        type: Sequelize[dict['Int']]
                    },
                    externalReferences_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    filtersApplied: {
                        type: Sequelize[dict['Boolean']]
                    },
                    filtersFailed: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    filtersPassed: {
                        type: Sequelize[dict['Boolean']]
                    },
                    reference_ID: {
                        type: Sequelize[dict['String']]
                    },
                    referenceBases: {
                        type: Sequelize[dict['String']]
                    },
                    referenceSet_ID: {
                        type: Sequelize[dict['String']]
                    },
                    start: {
                        type: Sequelize[dict['Int']]
                    },
                    svlen: {
                        type: Sequelize[dict['Int']]
                    },
                    updated: {
                        type: Sequelize[dict['String']]
                    },
                    variantNames: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    variantSet_ID: {
                        type: Sequelize[dict['String']]
                    },
                    variantType: {
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
            const storageHandler = await zendro.models.variant.storageHandler;
            const recordsExists = await zendro.models.variant.count();
            if (recordsExists && !DOWN_MIGRATION) {
                throw new Error(`You are trying to delete all records of variant and its associations. 
            If you are sure about this, set environment variable 'DOWN_MIGRATION' to 'true' 
            and re-execute this down-migration.`);
            }
            await storageHandler.getQueryInterface().dropTable('variants');
        } catch (error) {
            throw new Error(error);
        }
    }
};