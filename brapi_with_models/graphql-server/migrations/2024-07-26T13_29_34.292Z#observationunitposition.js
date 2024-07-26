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
            const storageHandler = await zendro.models.observationunitposition.storageHandler;
            await storageHandler.getQueryInterface()
                .createTable('observationunitpositions', {
                    observationUnitPositionDbId: {
                        type: Sequelize[dict['[String]']],
                        primaryKey: true
                    },

                    createdAt: {
                        type: Sequelize.DATE
                    },

                    updatedAt: {
                        type: Sequelize.DATE
                    },

                    entryType: {
                        type: Sequelize[dict['String']]
                    },
                    positionCoordinateX: {
                        type: Sequelize[dict['String']]
                    },
                    positionCoordinateXType: {
                        type: Sequelize[dict['String']]
                    },
                    positionCoordinateY: {
                        type: Sequelize[dict['String']]
                    },
                    positionCoordinateYType: {
                        type: Sequelize[dict['String']]
                    },
                    observationUnit_ID: {
                        type: Sequelize[dict['String']]
                    },
                    geoCoordinates_ID: {
                        type: Sequelize[dict['String']]
                    },
                    observationLevel_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    observationLevelRelationships_IDs: {
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
            const storageHandler = await zendro.models.observationunitposition.storageHandler;
            const recordsExists = await zendro.models.observationunitposition.count();
            if (recordsExists && !DOWN_MIGRATION) {
                throw new Error(`You are trying to delete all records of observationunitposition and its associations. 
            If you are sure about this, set environment variable 'DOWN_MIGRATION' to 'true' 
            and re-execute this down-migration.`);
            }
            await storageHandler.getQueryInterface().dropTable('observationunitpositions');
        } catch (error) {
            throw new Error(error);
        }
    }
};