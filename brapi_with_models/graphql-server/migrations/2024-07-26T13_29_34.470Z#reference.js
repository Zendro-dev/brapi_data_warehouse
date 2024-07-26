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
            const storageHandler = await zendro.models.reference.storageHandler;
            await storageHandler.getQueryInterface()
                .createTable('references', {
                    referenceDbId: {
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
                    commonCropName: {
                        type: Sequelize[dict['String']]
                    },
                    externalReferences_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    isDerived: {
                        type: Sequelize[dict['Boolean']]
                    },
                    length: {
                        type: Sequelize[dict['Int']]
                    },
                    md5checksum: {
                        type: Sequelize[dict['String']]
                    },
                    referenceName: {
                        type: Sequelize[dict['String']]
                    },
                    referenceSet_ID: {
                        type: Sequelize[dict['String']]
                    },
                    sourceAccessions: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    sourceDivergence: {
                        type: Sequelize[dict['Float']]
                    },
                    sourceGermplasm_IDs: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    sourceURI: {
                        type: Sequelize[dict['String']]
                    },
                    species_ID: {
                        type: Sequelize[dict['String']]
                    },
                    variants_IDs: {
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
            const storageHandler = await zendro.models.reference.storageHandler;
            const recordsExists = await zendro.models.reference.count();
            if (recordsExists && !DOWN_MIGRATION) {
                throw new Error(`You are trying to delete all records of reference and its associations. 
            If you are sure about this, set environment variable 'DOWN_MIGRATION' to 'true' 
            and re-execute this down-migration.`);
            }
            await storageHandler.getQueryInterface().dropTable('references');
        } catch (error) {
            throw new Error(error);
        }
    }
};