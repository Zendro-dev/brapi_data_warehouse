module.exports = `
  type publication{
    """
    @original-field
    """
    publicationDbId: ID
    """
    @original-field
    
    """
    publicationReference: String

    """
    @original-field
    
    """
    trial_ID: String

    trial(search: searchTrialInput): trial
    
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type PublicationConnection{
  edges: [PublicationEdge]
  publications: [publication]
  pageInfo: pageInfo!
}

type PublicationEdge{
  cursor: String!
  node: publication!
}

  enum publicationField {
    publicationDbId
    publicationReference
    trial_ID
  }
  
  input searchPublicationInput {
    field: publicationField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchPublicationInput]
  }

  input orderPublicationInput{
    field: publicationField
    order: Order
  }



  type Query {
    publications(search: searchPublicationInput, order: [ orderPublicationInput ], pagination: paginationInput! ): [publication]
    readOnePublication(publicationDbId: ID!): publication
    countPublications(search: searchPublicationInput ): Int
    csvTableTemplatePublication: [String]
    publicationsConnection(search:searchPublicationInput, order: [ orderPublicationInput ], pagination: paginationCursorInput! ): PublicationConnection
    validatePublicationForCreation(publicationDbId: ID!, publicationReference: String, trial_ID: String , addTrial:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validatePublicationForUpdating(publicationDbId: ID!, publicationReference: String, trial_ID: String , addTrial:ID, removeTrial:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validatePublicationForDeletion(publicationDbId: ID!): Boolean!
    validatePublicationAfterReading(publicationDbId: ID!): Boolean!
    """
    publicationsZendroDefinition would return the static Zendro data model definition
    """
    publicationsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addPublication(publicationDbId: ID!, publicationReference: String, trial_ID: String , addTrial:ID   , skipAssociationsExistenceChecks:Boolean = false): publication!
    updatePublication(publicationDbId: ID!, publicationReference: String, trial_ID: String , addTrial:ID, removeTrial:ID    , skipAssociationsExistenceChecks:Boolean = false): publication!
    deletePublication(publicationDbId: ID!): String!
      }
`;