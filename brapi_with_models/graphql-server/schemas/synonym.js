module.exports = `
  type synonym{
    """
    @original-field
    """
    synonymDbId: ID
    """
    @original-field
    Alternative name or ID used to reference this germplasm
    """
    synonym: String

    """
    @original-field
    A descriptive classification for this synonym
    """
    type: String

    """
    @original-field
    
    """
    germplasm_ID: String

    germplasm(search: searchGermplasmInput): germplasm
    
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type SynonymConnection{
  edges: [SynonymEdge]
  synonyms: [synonym]
  pageInfo: pageInfo!
}

type SynonymEdge{
  cursor: String!
  node: synonym!
}

  enum synonymField {
    synonymDbId
    synonym
    type
    germplasm_ID
  }
  
  input searchSynonymInput {
    field: synonymField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchSynonymInput]
  }

  input orderSynonymInput{
    field: synonymField
    order: Order
  }



  type Query {
    synonyms(search: searchSynonymInput, order: [ orderSynonymInput ], pagination: paginationInput! ): [synonym]
    readOneSynonym(synonymDbId: ID!): synonym
    countSynonyms(search: searchSynonymInput ): Int
    csvTableTemplateSynonym: [String]
    synonymsConnection(search:searchSynonymInput, order: [ orderSynonymInput ], pagination: paginationCursorInput! ): SynonymConnection
    validateSynonymForCreation(synonymDbId: ID!, synonym: String, type: String, germplasm_ID: String , addGermplasm:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateSynonymForUpdating(synonymDbId: ID!, synonym: String, type: String, germplasm_ID: String , addGermplasm:ID, removeGermplasm:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateSynonymForDeletion(synonymDbId: ID!): Boolean!
    validateSynonymAfterReading(synonymDbId: ID!): Boolean!
    """
    synonymsZendroDefinition would return the static Zendro data model definition
    """
    synonymsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addSynonym(synonymDbId: ID!, synonym: String, type: String, germplasm_ID: String , addGermplasm:ID   , skipAssociationsExistenceChecks:Boolean = false): synonym!
    updateSynonym(synonymDbId: ID!, synonym: String, type: String, germplasm_ID: String , addGermplasm:ID, removeGermplasm:ID    , skipAssociationsExistenceChecks:Boolean = false): synonym!
    deleteSynonym(synonymDbId: ID!): String!
      }
`;