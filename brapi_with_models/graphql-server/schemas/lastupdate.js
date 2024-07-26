module.exports = `
  type lastupdate{
    """
    @original-field
    """
    lastUpdateDbId: ID
    """
    @original-field
    
    """
    timestamp: String

    """
    @original-field
    
    """
    version: String

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
type LastupdateConnection{
  edges: [LastupdateEdge]
  lastupdates: [lastupdate]
  pageInfo: pageInfo!
}

type LastupdateEdge{
  cursor: String!
  node: lastupdate!
}

  enum lastupdateField {
    lastUpdateDbId
    timestamp
    version
    study_ID
  }
  
  input searchLastupdateInput {
    field: lastupdateField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchLastupdateInput]
  }

  input orderLastupdateInput{
    field: lastupdateField
    order: Order
  }



  type Query {
    lastupdates(search: searchLastupdateInput, order: [ orderLastupdateInput ], pagination: paginationInput! ): [lastupdate]
    readOneLastupdate(lastUpdateDbId: ID!): lastupdate
    countLastupdates(search: searchLastupdateInput ): Int
    csvTableTemplateLastupdate: [String]
    lastupdatesConnection(search:searchLastupdateInput, order: [ orderLastupdateInput ], pagination: paginationCursorInput! ): LastupdateConnection
    validateLastupdateForCreation(lastUpdateDbId: ID!, timestamp: String, version: String, study_ID: String , addStudy:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateLastupdateForUpdating(lastUpdateDbId: ID!, timestamp: String, version: String, study_ID: String , addStudy:ID, removeStudy:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateLastupdateForDeletion(lastUpdateDbId: ID!): Boolean!
    validateLastupdateAfterReading(lastUpdateDbId: ID!): Boolean!
    """
    lastupdatesZendroDefinition would return the static Zendro data model definition
    """
    lastupdatesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addLastupdate(lastUpdateDbId: ID!, timestamp: String, version: String, study_ID: String , addStudy:ID   , skipAssociationsExistenceChecks:Boolean = false): lastupdate!
    updateLastupdate(lastUpdateDbId: ID!, timestamp: String, version: String, study_ID: String , addStudy:ID, removeStudy:ID    , skipAssociationsExistenceChecks:Boolean = false): lastupdate!
    deleteLastupdate(lastUpdateDbId: ID!): String!
      }
`;