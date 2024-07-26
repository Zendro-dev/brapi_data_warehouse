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
            const storageHandler = await zendro.models.genomemap.storageHandler;
            await storageHandler.getQueryInterface()
                .createTable('genomemaps', {
                    genomeMapDbId: {
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
                    comments: {
                        type: Sequelize[dict['String']]
                    },
                    commonCropName: {
                        type: Sequelize[dict['String']]
                    },
                    documentationURL: {
                        type: Sequelize[dict['String']]
                    },
                    linkageGroupCount: {
                        type: Sequelize[dict['Int']]
                    },
                    mapName: {
                        type: Sequelize[dict['String']]
                    },
                    mapPUI: {
                        type: Sequelize[dict['String']]
                    },
                    markerCount: {
                        type: Sequelize[dict['Int']]
                    },
                    publishedDate: {
                        type: Sequelize[dict['String']]
                    },
                    scientificName: {
                        type: Sequelize[dict['String']]
                    },
                    type: {
                        type: Sequelize[dict['String']]
                    },
                    unit: {
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
            const storageHandler = await zendro.models.genomemap.storageHandler;
            const recordsExists = await zendro.models.genomemap.count();
            if (recordsExists && !DOWN_MIGRATION) {
                throw new Error(`You are trying to delete all records of genomemap and its associations. 
            If you are sure about this, set environment variable 'DOWN_MIGRATION' to 'true' 
            and re-execute this down-migration.`);
            }
            await storageHandler.getQueryInterface().dropTable('genomemaps');
        } catch (error) {
            throw new Error(error);
        }
    }
};