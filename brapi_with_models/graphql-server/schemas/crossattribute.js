module.exports = `
  type crossattribute{
    """
    @original-field
    """
    crossAttributeDbId: ID
    """
    @original-field
    the human readable name of a cross attribute
    """
    crossAttributeName: String

    """
    @original-field
    the value of a cross attribute
    """
    crossAttributeValue: String

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
type CrossattributeConnection{
  edges: [CrossattributeEdge]
  crossattributes: [crossattribute]
  pageInfo: pageInfo!
}

type CrossattributeEdge{
  cursor: String!
  node: crossattribute!
}

  enum crossattributeField {
    crossAttributeDbId
    crossAttributeName
    crossAttributeValue
    cross_ID
  }
  
  input searchCrossattributeInput {
    field: crossattributeField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchCrossattributeInput]
  }

  input orderCrossattributeInput{
    field: crossattributeField
    order: Order
  }



  type Query {
    crossattributes(search: searchCrossattributeInput, order: [ orderCrossattributeInput ], pagination: paginationInput! ): [crossattribute]
    readOneCrossattribute(crossAttributeDbId: ID!): crossattribute
    countCrossattributes(search: searchCrossattributeInput ): Int
    csvTableTemplateCrossattribute: [String]
    crossattributesConnection(search:searchCrossattributeInput, order: [ orderCrossattributeInput ], pagination: paginationCursorInput! ): CrossattributeConnection
    validateCrossattributeForCreation(crossAttributeDbId: ID!, crossAttributeName: String, crossAttributeValue: String, cross_ID: String , addCross:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateCrossattributeForUpdating(crossAttributeDbId: ID!, crossAttributeName: String, crossAttributeValue: String, cross_ID: String , addCross:ID, removeCross:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateCrossattributeForDeletion(crossAttributeDbId: ID!): Boolean!
    validateCrossattributeAfterReading(crossAttributeDbId: ID!): Boolean!
    """
    crossattributesZendroDefinition would return the static Zendro data model definition
    """
    crossattributesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addCrossattribute(crossAttributeDbId: ID!, crossAttributeName: String, crossAttributeValue: String, cross_ID: String , addCross:ID   , skipAssociationsExistenceChecks:Boolean = false): crossattribute!
    updateCrossattribute(crossAttributeDbId: ID!, crossAttributeName: String, crossAttributeValue: String, cross_ID: String , addCross:ID, removeCross:ID    , skipAssociationsExistenceChecks:Boolean = false): crossattribute!
    deleteCrossattribute(crossAttributeDbId: ID!): String!
      }
`;