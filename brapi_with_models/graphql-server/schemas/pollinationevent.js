module.exports = `
  type pollinationevent{
    """
    @original-field
    """
    pollinationEventDbId: ID
    """
    @original-field
    True if the pollination was successful
    """
    pollinationSuccessful: Boolean

    """
    @original-field
    The timestamp when the pollination took place
    """
    pollinationTimeStamp: String

    """
    @original-field
    
    """
    cross_ID: String

    cross(search: searchCrossInput): cross
    
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type PollinationeventConnection{
  edges: [PollinationeventEdge]
  pollinationevents: [pollinationevent]
  pageInfo: pageInfo!
}

type PollinationeventEdge{
  cursor: String!
  node: pollinationevent!
}

  enum pollinationeventField {
    pollinationEventDbId
    pollinationSuccessful
    pollinationTimeStamp
    cross_ID
  }
  
  input searchPollinationeventInput {
    field: pollinationeventField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchPollinationeventInput]
  }

  input orderPollinationeventInput{
    field: pollinationeventField
    order: Order
  }



  type Query {
    pollinationevents(search: searchPollinationeventInput, order: [ orderPollinationeventInput ], pagination: paginationInput! ): [pollinationevent]
    readOnePollinationevent(pollinationEventDbId: ID!): pollinationevent
    countPollinationevents(search: searchPollinationeventInput ): Int
    csvTableTemplatePollinationevent: [String]
    pollinationeventsConnection(search:searchPollinationeventInput, order: [ orderPollinationeventInput ], pagination: paginationCursorInput! ): PollinationeventConnection
    validatePollinationeventForCreation(pollinationEventDbId: ID!, pollinationSuccessful: Boolean, pollinationTimeStamp: String, cross_ID: String , addCross:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validatePollinationeventForUpdating(pollinationEventDbId: ID!, pollinationSuccessful: Boolean, pollinationTimeStamp: String, cross_ID: String , addCross:ID, removeCross:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validatePollinationeventForDeletion(pollinationEventDbId: ID!): Boolean!
    validatePollinationeventAfterReading(pollinationEventDbId: ID!): Boolean!
    """
    pollinationeventsZendroDefinition would return the static Zendro data model definition
    """
    pollinationeventsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addPollinationevent(pollinationEventDbId: ID!, pollinationSuccessful: Boolean, pollinationTimeStamp: String, cross_ID: String , addCross:ID   , skipAssociationsExistenceChecks:Boolean = false): pollinationevent!
    updatePollinationevent(pollinationEventDbId: ID!, pollinationSuccessful: Boolean, pollinationTimeStamp: String, cross_ID: String , addCross:ID, removeCross:ID    , skipAssociationsExistenceChecks:Boolean = false): pollinationevent!
    deletePollinationevent(pollinationEventDbId: ID!): String!
      }
`;