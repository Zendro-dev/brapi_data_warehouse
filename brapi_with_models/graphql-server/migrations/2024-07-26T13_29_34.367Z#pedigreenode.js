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
            const storageHandler = await zendro.models.pedigreenode.storageHandler;
            await storageHandler.getQueryInterface()
                .createTable('pedigreenodes', {
                    pedigreeNodeDbId: {
                        type: Sequelize[dict['[String]']],
                        primaryKey: true
                    },

                    createdAt: {
                        type: Sequelize.DATE
                    },

                    updatedAt: {
                        type: Sequelize.DATE
                    },

                    breedingMethod_ID: {
                        type: Sequelize[dict['String']]
                    },
                    crossingProject_ID: {
                        type: Sequelize[dict['String']]
                    },
                    crossingYear: {
                        type: Sequelize[dict['Int']]
                    },
                    defaultDisplayName: {
                        type: Sequelize[dict['String']]
                    },
                    familyCode: {
                        type: Sequelize[dict['String']]
                    },
                    germplasm_ID: {
                        type: Sequelize[dict['String']]
                    },
                    germplasmPUI: {
                        type: Sequelize[dict['String']]
                    },
                    pedigreeString: {
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
                    parents_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    progeny_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    siblings_IDs: {
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
            const storageHandler = await zendro.models.pedigreenode.storageHandler;
            const recordsExists = await zendro.models.pedigreenode.count();
            if (recordsExists && !DOWN_MIGRATION) {
                throw new Error(`You are trying to delete all records of pedigreenode and its associations. 
            If you are sure about this, set environment variable 'DOWN_MIGRATION' to 'true' 
            and re-execute this down-migration.`);
            }
            await storageHandler.getQueryInterface().dropTable('pedigreenodes');
        } catch (error) {
            throw new Error(error);
        }
    }
};