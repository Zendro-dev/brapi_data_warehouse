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
            const storageHandler = await zendro.models.additionalinfo.storageHandler;
            await storageHandler.getQueryInterface()
                .createTable('additionalinfos', {
                    additionalInfoDbId: {
                        type: Sequelize[dict['[String]']],
                        primaryKey: true
                    },

                    createdAt: {
                        type: Sequelize.DATE
                    },

                    updatedAt: {
                        type: Sequelize.DATE
                    },

                    additionalProperties: {
                        type: Sequelize[dict['String']]
                    },
                    call_ID: {
                        type: Sequelize[dict['String']]
                    },
                    callSet_ID: {
                        type: Sequelize[dict['String']]
                    },
                    cross_ID: {
                        type: Sequelize[dict['String']]
                    },
                    crossingProject_ID: {
                        type: Sequelize[dict['String']]
                    },
                    event_ID: {
                        type: Sequelize[dict['String']]
                    },
                    genomeMap_ID: {
                        type: Sequelize[dict['String']]
                    },
                    germplasm_ID: {
                        type: Sequelize[dict['String']]
                    },
                    germplasmAttribute_ID: {
                        type: Sequelize[dict['String']]
                    },
                    germplasmAttributeValue_ID: {
                        type: Sequelize[dict['String']]
                    },
                    image_ID: {
                        type: Sequelize[dict['String']]
                    },
                    list_ID: {
                        type: Sequelize[dict['String']]
                    },
                    location_ID: {
                        type: Sequelize[dict['String']]
                    },
                    markerPosition_ID: {
                        type: Sequelize[dict['String']]
                    },
                    method_ID: {
                        type: Sequelize[dict['String']]
                    },
                    observation_ID: {
                        type: Sequelize[dict['String']]
                    },
                    observationUnit_ID: {
                        type: Sequelize[dict['String']]
                    },
                    observationVariable_ID: {
                        type: Sequelize[dict['String']]
                    },
                    ontology_ID: {
                        type: Sequelize[dict['String']]
                    },
                    person_ID: {
                        type: Sequelize[dict['String']]
                    },
                    pedigreeNode_ID: {
                        type: Sequelize[dict['String']]
                    },
                    plannedCross_ID: {
                        type: Sequelize[dict['String']]
                    },
                    plate_ID: {
                        type: Sequelize[dict['String']]
                    },
                    program_ID: {
                        type: Sequelize[dict['String']]
                    },
                    reference_ID: {
                        type: Sequelize[dict['String']]
                    },
                    referenceSet_ID: {
                        type: Sequelize[dict['String']]
                    },
                    sample_ID: {
                        type: Sequelize[dict['String']]
                    },
                    scale_ID: {
                        type: Sequelize[dict['String']]
                    },
                    seedLot_ID: {
                        type: Sequelize[dict['String']]
                    },
                    seedLotTransaction_ID: {
                        type: Sequelize[dict['String']]
                    },
                    study_ID: {
                        type: Sequelize[dict['String']]
                    },
                    trait_ID: {
                        type: Sequelize[dict['String']]
                    },
                    trial_ID: {
                        type: Sequelize[dict['String']]
                    },
                    variant_ID: {
                        type: Sequelize[dict['String']]
                    },
                    variantSet_ID: {
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
            const storageHandler = await zendro.models.additionalinfo.storageHandler;
            const recordsExists = await zendro.models.additionalinfo.count();
            if (recordsExists && !DOWN_MIGRATION) {
                throw new Error(`You are trying to delete all records of additionalinfo and its associations. 
            If you are sure about this, set environment variable 'DOWN_MIGRATION' to 'true' 
            and re-execute this down-migration.`);
            }
            await storageHandler.getQueryInterface().dropTable('additionalinfos');
        } catch (error) {
            throw new Error(error);
        }
    }
};