module.exports = `
  type growthfacility{
    """
    @original-field
    """
    growthFacilityDbId: ID
    """
    @original-field
    MIAPPE V1.1 (DM-23) Type of experimental design - Type of experimental  design of the study, in the form of an accession number from the Crop Ontology.
    """
    PUI: String

    """
    @original-field
    MIAPPE V1.1 (DM-22) Description of the experimental design - Short description of the experimental design, possibly including statistical design. In specific cases, e.g. legacy datasets or data computed from several studies, the experimental design can be &#34;unknown&#34;/&#34;NA&#34;, &#34;aggregated/reduced data&#34;, or simply &#39;none&#39;.
    """
    description: String

    """
    @original-field
    
    """
    study_ID: String

    study(search: searchStudyInput): study
    
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type GrowthfacilityConnection{
  edges: [GrowthfacilityEdge]
  growthfacilities: [growthfacility]
  pageInfo: pageInfo!
}

type GrowthfacilityEdge{
  cursor: String!
  node: growthfacility!
}

  enum growthfacilityField {
    growthFacilityDbId
    PUI
    description
    study_ID
  }
  
  input searchGrowthfacilityInput {
    field: growthfacilityField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchGrowthfacilityInput]
  }

  input orderGrowthfacilityInput{
    field: growthfacilityField
    order: Order
  }



  type Query {
    growthfacilities(search: searchGrowthfacilityInput, order: [ orderGrowthfacilityInput ], pagination: paginationInput! ): [growthfacility]
    readOneGrowthfacility(growthFacilityDbId: ID!): growthfacility
    countGrowthfacilities(search: searchGrowthfacilityInput ): Int
    csvTableTemplateGrowthfacility: [String]
    growthfacilitiesConnection(search:searchGrowthfacilityInput, order: [ orderGrowthfacilityInput ], pagination: paginationCursorInput! ): GrowthfacilityConnection
    validateGrowthfacilityForCreation(growthFacilityDbId: ID!, PUI: String, description: String, study_ID: String , addStudy:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateGrowthfacilityForUpdating(growthFacilityDbId: ID!, PUI: String, description: String, study_ID: String , addStudy:ID, removeStudy:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateGrowthfacilityForDeletion(growthFacilityDbId: ID!): Boolean!
    validateGrowthfacilityAfterReading(growthFacilityDbId: ID!): Boolean!
    """
    growthfacilitiesZendroDefinition would return the static Zendro data model definition
    """
    growthfacilitiesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addGrowthfacility(growthFacilityDbId: ID!, PUI: String, description: String, study_ID: String , addStudy:ID   , skipAssociationsExistenceChecks:Boolean = false): growthfacility!
    updateGrowthfacility(growthFacilityDbId: ID!, PUI: String, description: String, study_ID: String , addStudy:ID, removeStudy:ID    , skipAssociationsExistenceChecks:Boolean = false): growthfacility!
    deleteGrowthfacility(growthFacilityDbId: ID!): String!
      }
`;