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
            const storageHandler = await zendro.models.availableformat.storageHandler;
            await storageHandler.getQueryInterface()
                .createTable('availableformats', {
                    availableFormatDbId: {
                        type: Sequelize[dict['[String]']],
                        primaryKey: true
                    },

                    createdAt: {
                        type: Sequelize.DATE
                    },

                    updatedAt: {
                        type: Sequelize.DATE
                    },

                    dataFormat: {
                        type: Sequelize[dict['String']]
                    },
                    expandHomozygotes: {
                        type: Sequelize[dict['Boolean']]
                    },
                    fileFormat: {
                        type: Sequelize[dict['String']]
                    },
                    fileURL: {
                        type: Sequelize[dict['String']]
                    },
                    sepPhased: {
                        type: Sequelize[dict['String']]
                    },
                    sepUnphased: {
                        type: Sequelize[dict['String']]
                    },
                    unknownString: {
                        type: Sequelize[dict['String']]
                    },
                    variantset_ID: {
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
            const storageHandler = await zendro.models.availableformat.storageHandler;
            const recordsExists = await zendro.models.availableformat.count();
            if (recordsExists && !DOWN_MIGRATION) {
                throw new Error(`You are trying to delete all records of availableformat and its associations. 
            If you are sure about this, set environment variable 'DOWN_MIGRATION' to 'true' 
            and re-execute this down-migration.`);
            }
            await storageHandler.getQueryInterface().dropTable('availableformats');
        } catch (error) {
            throw new Error(error);
        }
    }
};