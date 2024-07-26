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
            const storageHandler = await zendro.models.eventdaterange.storageHandler;
            await storageHandler.getQueryInterface()
                .createTable('eventdateranges', {
                    eventDateRangeDbId: {
                        type: Sequelize[dict['[String]']],
                        primaryKey: true
                    },

                    createdAt: {
                        type: Sequelize.DATE
                    },

                    updatedAt: {
                        type: Sequelize.DATE
                    },

                    discreteDates: {
                        type: Sequelize[dict['[String]']],
                        defaultValue: '[]'
                    },
                    endDate: {
                        type: Sequelize[dict['String']]
                    },
                    startDate: {
                        type: Sequelize[dict['String']]
                    },
                    event_ID: {
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
            const storageHandler = await zendro.models.eventdaterange.storageHandler;
            const recordsExists = await zendro.models.eventdaterange.count();
            if (recordsExists && !DOWN_MIGRATION) {
                throw new Error(`You are trying to delete all records of eventdaterange and its associations. 
            If you are sure about this, set environment variable 'DOWN_MIGRATION' to 'true' 
            and re-execute this down-migration.`);
            }
            await storageHandler.getQueryInterface().dropTable('eventdateranges');
        } catch (error) {
            throw new Error(error);
        }
    }
};