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
            const storageHandler = await zendro.models.trait.storageHandler;
            await storageHandler.getQueryInterface()
                .createTable('traits', {
                    traitDbId: {
                        type: Sequelize[dict['[String]']],
                        primaryKey: true
                    },

                    createdAt: {
                        type: Sequelize.DATE
                    },

                    updatedAt: {
                        type: Sequelize.DATE
                    },

                    alternativeAbbreviations: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    attribute: {
                        type: Sequelize[dict['String']]
                    },
                    attributePUI: {
                        type: Sequelize[dict['String']]
                    },
                    entity: {
                        type: Sequelize[dict['String']]
                    },
                    entityPUI: {
                        type: Sequelize[dict['String']]
                    },
                    mainAbbreviation: {
                        type: Sequelize[dict['String']]
                    },
                    status: {
                        type: Sequelize[dict['String']]
                    },
                    synonyms: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    traitClass: {
                        type: Sequelize[dict['String']]
                    },
                    traitDescription: {
                        type: Sequelize[dict['String']]
                    },
                    traitName: {
                        type: Sequelize[dict['String']]
                    },
                    traitPUI: {
                        type: Sequelize[dict['String']]
                    },
                    additionalInfo_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    externalReferences_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    ontologyReference_ID: {
                        type: Sequelize[dict['String']]
                    },
                    germplasmAttribute_ID: {
                        type: Sequelize[dict['String']]
                    },
                    observationVariables_IDs: {
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
            const storageHandler = await zendro.models.trait.storageHandler;
            const recordsExists = await zendro.models.trait.count();
            if (recordsExists && !DOWN_MIGRATION) {
                throw new Error(`You are trying to delete all records of trait and its associations. 
            If you are sure about this, set environment variable 'DOWN_MIGRATION' to 'true' 
            and re-execute this down-migration.`);
            }
            await storageHandler.getQueryInterface().dropTable('traits');
        } catch (error) {
            throw new Error(error);
        }
    }
};