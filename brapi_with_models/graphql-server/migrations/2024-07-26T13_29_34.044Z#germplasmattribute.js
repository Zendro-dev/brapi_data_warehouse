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
            const storageHandler = await zendro.models.germplasmattribute.storageHandler;
            await storageHandler.getQueryInterface()
                .createTable('germplasmattributes', {
                    germplasmAttributeDbId: {
                        type: Sequelize[dict['[String]']],
                        primaryKey: true
                    },

                    createdAt: {
                        type: Sequelize.DATE
                    },

                    updatedAt: {
                        type: Sequelize.DATE
                    },

                    attributeName: {
                        type: Sequelize[dict['String']]
                    },
                    attributeCategory: {
                        type: Sequelize[dict['String']]
                    },
                    attributeDescription: {
                        type: Sequelize[dict['String']]
                    },
                    attributePUI: {
                        type: Sequelize[dict['String']]
                    },
                    commonCropName: {
                        type: Sequelize[dict['String']]
                    },
                    contextOfUse: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    defaultValue: {
                        type: Sequelize[dict['String']]
                    },
                    documentationURL: {
                        type: Sequelize[dict['String']]
                    },
                    growthStage: {
                        type: Sequelize[dict['String']]
                    },
                    institution: {
                        type: Sequelize[dict['String']]
                    },
                    language: {
                        type: Sequelize[dict['String']]
                    },
                    scientist: {
                        type: Sequelize[dict['String']]
                    },
                    status: {
                        type: Sequelize[dict['String']]
                    },
                    submissionTimestamp: {
                        type: Sequelize[dict['String']]
                    },
                    synonyms: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    germplasmAttributeValues_IDs: {
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
                    method_ID: {
                        type: Sequelize[dict['String']]
                    },
                    ontologyReference_ID: {
                        type: Sequelize[dict['String']]
                    },
                    scale_ID: {
                        type: Sequelize[dict['String']]
                    },
                    trait_ID: {
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
            const storageHandler = await zendro.models.germplasmattribute.storageHandler;
            const recordsExists = await zendro.models.germplasmattribute.count();
            if (recordsExists && !DOWN_MIGRATION) {
                throw new Error(`You are trying to delete all records of germplasmattribute and its associations. 
            If you are sure about this, set environment variable 'DOWN_MIGRATION' to 'true' 
            and re-execute this down-migration.`);
            }
            await storageHandler.getQueryInterface().dropTable('germplasmattributes');
        } catch (error) {
            throw new Error(error);
        }
    }
};