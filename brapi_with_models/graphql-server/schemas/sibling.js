module.exports = `
  type sibling{
    """
    @original-field
    """
    siblingDbId: ID
    """
    @original-field
    
    """
    siblingGermplasm_ID: String

    """
    @original-field
    
    """
    pedigreeNode_IDs: [String]

    siblingGermplasm(search: searchGermplasmInput): germplasm
    
    """
    @search-request
    """
    pedigreeNodeFilter(search: searchPedigreenodeInput, order: [ orderPedigreenodeInput ], pagination: paginationInput!): [pedigreenode]


    """
    @search-request
    """
    pedigreeNodeConnection(search: searchPedigreenodeInput, order: [ orderPedigreenodeInput ], pagination: paginationCursorInput!): PedigreenodeConnection

    """
    @count-request
    """
    countFilteredPedigreeNode(search: searchPedigreenodeInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type SiblingConnection{
  edges: [SiblingEdge]
  siblings: [sibling]
  pageInfo: pageInfo!
}

type SiblingEdge{
  cursor: String!
  node: sibling!
}

  enum siblingField {
    siblingDbId
    siblingGermplasm_ID
    pedigreeNode_IDs
  }
  
  input searchSiblingInput {
    field: siblingField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchSiblingInput]
  }

  input orderSiblingInput{
    field: siblingField
    order: Order
  }



  type Query {
    siblings(search: searchSiblingInput, order: [ orderSiblingInput ], pagination: paginationInput! ): [sibling]
    readOneSibling(siblingDbId: ID!): sibling
    countSiblings(search: searchSiblingInput ): Int
    csvTableTemplateSibling: [String]
    siblingsConnection(search:searchSiblingInput, order: [ orderSiblingInput ], pagination: paginationCursorInput! ): SiblingConnection
    validateSiblingForCreation(siblingDbId: ID!, siblingGermplasm_ID: String , addSiblingGermplasm:ID  , addPedigreeNode:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateSiblingForUpdating(siblingDbId: ID!, siblingGermplasm_ID: String , addSiblingGermplasm:ID, removeSiblingGermplasm:ID   , addPedigreeNode:[ID], removePedigreeNode:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateSiblingForDeletion(siblingDbId: ID!): Boolean!
    validateSiblingAfterReading(siblingDbId: ID!): Boolean!
    """
    siblingsZendroDefinition would return the static Zendro data model definition
    """
    siblingsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addSibling(siblingDbId: ID!, siblingGermplasm_ID: String , addSiblingGermplasm:ID  , addPedigreeNode:[ID] , skipAssociationsExistenceChecks:Boolean = false): sibling!
    updateSibling(siblingDbId: ID!, siblingGermplasm_ID: String , addSiblingGermplasm:ID, removeSiblingGermplasm:ID   , addPedigreeNode:[ID], removePedigreeNode:[ID]  , skipAssociationsExistenceChecks:Boolean = false): sibling!
    deleteSibling(siblingDbId: ID!): String!
      }
`;