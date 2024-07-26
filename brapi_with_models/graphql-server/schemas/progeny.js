module.exports = `
  type progeny{
    """
    @original-field
    """
    progenyDbId: ID
    """
    @original-field
    
    """
    progenyGermplasm_ID: String

    """
    @original-field
    The type of parent used during crossing. Accepted values for this field are &#39;MALE&#39;, &#39;FEMALE&#39;, &#39;SELF&#39;, &#39;POPULATION&#39;, and &#39;CLONAL&#39;. 

In a pedigree record, the &#39;parentType&#39; describes each parent of a particular germplasm. 

In a progeny record, the &#39;parentType&#39; is used to describe how this germplasm was crossed to generate a particular progeny. 
For example, given a record for germplasm A, having a progeny B and C. The &#39;parentType&#39; field for progeny B item refers 
to the &#39;parentType&#39; of A toward B. The &#39;parentType&#39; field for progeny C item refers to the &#39;parentType&#39; of A toward C.
In this way, A could be a male parent to B, but a female parent to C. 
    """
    parentType: String

    """
    @original-field
    
    """
    pedigreeNode_ID: String

    progenyGermplasm(search: searchGermplasmInput): germplasm
  pedigreeNode(search: searchPedigreenodeInput): pedigreenode
    
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type ProgenyConnection{
  edges: [ProgenyEdge]
  progenies: [progeny]
  pageInfo: pageInfo!
}

type ProgenyEdge{
  cursor: String!
  node: progeny!
}

  enum progenyField {
    progenyDbId
    progenyGermplasm_ID
    parentType
    pedigreeNode_ID
  }
  
  input searchProgenyInput {
    field: progenyField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchProgenyInput]
  }

  input orderProgenyInput{
    field: progenyField
    order: Order
  }



  type Query {
    progenies(search: searchProgenyInput, order: [ orderProgenyInput ], pagination: paginationInput! ): [progeny]
    readOneProgeny(progenyDbId: ID!): progeny
    countProgenies(search: searchProgenyInput ): Int
    csvTableTemplateProgeny: [String]
    progeniesConnection(search:searchProgenyInput, order: [ orderProgenyInput ], pagination: paginationCursorInput! ): ProgenyConnection
    validateProgenyForCreation(progenyDbId: ID!, progenyGermplasm_ID: String, parentType: String, pedigreeNode_ID: String , addProgenyGermplasm:ID, addPedigreeNode:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateProgenyForUpdating(progenyDbId: ID!, progenyGermplasm_ID: String, parentType: String, pedigreeNode_ID: String , addProgenyGermplasm:ID, removeProgenyGermplasm:ID , addPedigreeNode:ID, removePedigreeNode:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateProgenyForDeletion(progenyDbId: ID!): Boolean!
    validateProgenyAfterReading(progenyDbId: ID!): Boolean!
    """
    progeniesZendroDefinition would return the static Zendro data model definition
    """
    progeniesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addProgeny(progenyDbId: ID!, progenyGermplasm_ID: String, parentType: String, pedigreeNode_ID: String , addProgenyGermplasm:ID, addPedigreeNode:ID   , skipAssociationsExistenceChecks:Boolean = false): progeny!
    updateProgeny(progenyDbId: ID!, progenyGermplasm_ID: String, parentType: String, pedigreeNode_ID: String , addProgenyGermplasm:ID, removeProgenyGermplasm:ID , addPedigreeNode:ID, removePedigreeNode:ID    , skipAssociationsExistenceChecks:Boolean = false): progeny!
    deleteProgeny(progenyDbId: ID!): String!
      }
`;