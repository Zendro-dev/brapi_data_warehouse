module.exports = `
  type sourcegermplasm{
    """
    @original-field
    """
    sourceGermplasmDbId: ID
    """
    @original-field
    The ID which uniquely identifies a \`Germplasm\` within the given database server
    """
    germplasmDbId: String

    """
    @original-field
    The human readable name of a \`Germplasm\`
    """
    germplasmName: String

    """
    @original-field
    
    """
    referenceset_ID: String

    """
    @original-field
    
    """
    reference_ID: String

    referenceset(search: searchReferencesetInput): referenceset
  reference(search: searchReferenceInput): reference
    
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type SourcegermplasmConnection{
  edges: [SourcegermplasmEdge]
  sourcegermplasms: [sourcegermplasm]
  pageInfo: pageInfo!
}

type SourcegermplasmEdge{
  cursor: String!
  node: sourcegermplasm!
}

  enum sourcegermplasmField {
    sourceGermplasmDbId
    germplasmDbId
    germplasmName
    referenceset_ID
    reference_ID
  }
  
  input searchSourcegermplasmInput {
    field: sourcegermplasmField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchSourcegermplasmInput]
  }

  input orderSourcegermplasmInput{
    field: sourcegermplasmField
    order: Order
  }



  type Query {
    sourcegermplasms(search: searchSourcegermplasmInput, order: [ orderSourcegermplasmInput ], pagination: paginationInput! ): [sourcegermplasm]
    readOneSourcegermplasm(sourceGermplasmDbId: ID!): sourcegermplasm
    countSourcegermplasms(search: searchSourcegermplasmInput ): Int
    csvTableTemplateSourcegermplasm: [String]
    sourcegermplasmsConnection(search:searchSourcegermplasmInput, order: [ orderSourcegermplasmInput ], pagination: paginationCursorInput! ): SourcegermplasmConnection
    validateSourcegermplasmForCreation(sourceGermplasmDbId: ID!, germplasmDbId: String, germplasmName: String, referenceset_ID: String, reference_ID: String , addReferenceset:ID, addReference:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateSourcegermplasmForUpdating(sourceGermplasmDbId: ID!, germplasmDbId: String, germplasmName: String, referenceset_ID: String, reference_ID: String , addReferenceset:ID, removeReferenceset:ID , addReference:ID, removeReference:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateSourcegermplasmForDeletion(sourceGermplasmDbId: ID!): Boolean!
    validateSourcegermplasmAfterReading(sourceGermplasmDbId: ID!): Boolean!
    """
    sourcegermplasmsZendroDefinition would return the static Zendro data model definition
    """
    sourcegermplasmsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addSourcegermplasm(sourceGermplasmDbId: ID!, germplasmDbId: String, germplasmName: String, referenceset_ID: String, reference_ID: String , addReferenceset:ID, addReference:ID   , skipAssociationsExistenceChecks:Boolean = false): sourcegermplasm!
    updateSourcegermplasm(sourceGermplasmDbId: ID!, germplasmDbId: String, germplasmName: String, referenceset_ID: String, reference_ID: String , addReferenceset:ID, removeReferenceset:ID , addReference:ID, removeReference:ID    , skipAssociationsExistenceChecks:Boolean = false): sourcegermplasm!
    deleteSourcegermplasm(sourceGermplasmDbId: ID!): String!
      }
`;