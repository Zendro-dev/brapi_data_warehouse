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
            const storageHandler = await zendro.models.image.storageHandler;
            await storageHandler.getQueryInterface()
                .createTable('images', {
                    imageDbId: {
                        type: Sequelize[dict['[String]']],
                        primaryKey: true
                    },

                    createdAt: {
                        type: Sequelize.DATE
                    },

                    updatedAt: {
                        type: Sequelize.DATE
                    },

                    copyright: {
                        type: Sequelize[dict['String']]
                    },
                    description: {
                        type: Sequelize[dict['String']]
                    },
                    descriptiveOntologyTerms: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    imageFileName: {
                        type: Sequelize[dict['String']]
                    },
                    imageFileSize: {
                        type: Sequelize[dict['Int']]
                    },
                    imageHeight: {
                        type: Sequelize[dict['Int']]
                    },
                    imageName: {
                        type: Sequelize[dict['String']]
                    },
                    imageTimeStamp: {
                        type: Sequelize[dict['String']]
                    },
                    imageURL: {
                        type: Sequelize[dict['String']]
                    },
                    imageWidth: {
                        type: Sequelize[dict['Int']]
                    },
                    mimeType: {
                        type: Sequelize[dict['String']]
                    },
                    observationUnit_ID: {
                        type: Sequelize[dict['String']]
                    },
                    observations_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    additionalInfo_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    externalReferences_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    imageLocation_ID: {
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
            const storageHandler = await zendro.models.image.storageHandler;
            const recordsExists = await zendro.models.image.count();
            if (recordsExists && !DOWN_MIGRATION) {
                throw new Error(`You are trying to delete all records of image and its associations. 
            If you are sure about this, set environment variable 'DOWN_MIGRATION' to 'true' 
            and re-execute this down-migration.`);
            }
            await storageHandler.getQueryInterface().dropTable('images');
        } catch (error) {
            throw new Error(error);
        }
    }
};