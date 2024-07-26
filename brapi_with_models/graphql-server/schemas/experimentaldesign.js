module.exports = `
  type experimentaldesign{
    """
    @original-field
    """
    experimentalDesignDbId: ID
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
type ExperimentaldesignConnection{
  edges: [ExperimentaldesignEdge]
  experimentaldesigns: [experimentaldesign]
  pageInfo: pageInfo!
}

type ExperimentaldesignEdge{
  cursor: String!
  node: experimentaldesign!
}

  enum experimentaldesignField {
    experimentalDesignDbId
    PUI
    description
    study_ID
  }
  
  input searchExperimentaldesignInput {
    field: experimentaldesignField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchExperimentaldesignInput]
  }

  input orderExperimentaldesignInput{
    field: experimentaldesignField
    order: Order
  }



  type Query {
    experimentaldesigns(search: searchExperimentaldesignInput, order: [ orderExperimentaldesignInput ], pagination: paginationInput! ): [experimentaldesign]
    readOneExperimentaldesign(experimentalDesignDbId: ID!): experimentaldesign
    countExperimentaldesigns(search: searchExperimentaldesignInput ): Int
    csvTableTemplateExperimentaldesign: [String]
    experimentaldesignsConnection(search:searchExperimentaldesignInput, order: [ orderExperimentaldesignInput ], pagination: paginationCursorInput! ): ExperimentaldesignConnection
    validateExperimentaldesignForCreation(experimentalDesignDbId: ID!, PUI: String, description: String, study_ID: String , addStudy:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateExperimentaldesignForUpdating(experimentalDesignDbId: ID!, PUI: String, description: String, study_ID: String , addStudy:ID, removeStudy:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateExperimentaldesignForDeletion(experimentalDesignDbId: ID!): Boolean!
    validateExperimentaldesignAfterReading(experimentalDesignDbId: ID!): Boolean!
    """
    experimentaldesignsZendroDefinition would return the static Zendro data model definition
    """
    experimentaldesignsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addExperimentaldesign(experimentalDesignDbId: ID!, PUI: String, description: String, study_ID: String , addStudy:ID   , skipAssociationsExistenceChecks:Boolean = false): experimentaldesign!
    updateExperimentaldesign(experimentalDesignDbId: ID!, PUI: String, description: String, study_ID: String , addStudy:ID, removeStudy:ID    , skipAssociationsExistenceChecks:Boolean = false): experimentaldesign!
    deleteExperimentaldesign(experimentalDesignDbId: ID!): String!
      }
`;