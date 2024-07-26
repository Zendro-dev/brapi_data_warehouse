module.exports = `
  type analysis{
    """
    @original-field
    """
    analysisDbId: ID
    """
    @original-field
    A human readable name for this analysis
    """
    analysisName: String

    """
    @original-field
    The time at which this record was created, in ISO 8601 format.
    """
    created: String

    """
    @original-field
    A human readable description of the analysis
    """
    description: String

    """
    @original-field
    The software run to generate this analysis.
    """
    software: [String]

    """
    @original-field
    The type of analysis.
    """
    type: String

    """
    @original-field
    The time at which this record was last updated, in ISO 8601 format.
    """
    updated: String

    """
    @original-field
    
    """
    variantset_ID: String

    variantset(search: searchVariantsetInput): variantset
    
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type AnalysisConnection{
  edges: [AnalysisEdge]
  analyses: [analysis]
  pageInfo: pageInfo!
}

type AnalysisEdge{
  cursor: String!
  node: analysis!
}

  enum analysisField {
    analysisDbId
    analysisName
    created
    description
    software
    type
    updated
    variantset_ID
  }
  
  input searchAnalysisInput {
    field: analysisField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchAnalysisInput]
  }

  input orderAnalysisInput{
    field: analysisField
    order: Order
  }



  type Query {
    analyses(search: searchAnalysisInput, order: [ orderAnalysisInput ], pagination: paginationInput! ): [analysis]
    readOneAnalysis(analysisDbId: ID!): analysis
    countAnalyses(search: searchAnalysisInput ): Int
    csvTableTemplateAnalysis: [String]
    analysesConnection(search:searchAnalysisInput, order: [ orderAnalysisInput ], pagination: paginationCursorInput! ): AnalysisConnection
    validateAnalysisForCreation(analysisDbId: ID!, analysisName: String, created: String, description: String, software: [String], type: String, updated: String, variantset_ID: String , addVariantset:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateAnalysisForUpdating(analysisDbId: ID!, analysisName: String, created: String, description: String, software: [String], type: String, updated: String, variantset_ID: String , addVariantset:ID, removeVariantset:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateAnalysisForDeletion(analysisDbId: ID!): Boolean!
    validateAnalysisAfterReading(analysisDbId: ID!): Boolean!
    """
    analysesZendroDefinition would return the static Zendro data model definition
    """
    analysesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addAnalysis(analysisDbId: ID!, analysisName: String, created: String, description: String, software: [String], type: String, updated: String, variantset_ID: String , addVariantset:ID   , skipAssociationsExistenceChecks:Boolean = false): analysis!
    updateAnalysis(analysisDbId: ID!, analysisName: String, created: String, description: String, software: [String], type: String, updated: String, variantset_ID: String , addVariantset:ID, removeVariantset:ID    , skipAssociationsExistenceChecks:Boolean = false): analysis!
    deleteAnalysis(analysisDbId: ID!): String!
      }
`;