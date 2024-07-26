module.exports = `
  type documentationlink{
    """
    @original-field
    """
    documentationLinkDbId: ID
    """
    @original-field
    
    """
    URL: String

    """
    @original-field
    
    """
    type: String

    """
    @original-field
    
    """
    ontologyReference_ID: String

    ontologyReference(search: searchOntologyreferenceInput): ontologyreference
    
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type DocumentationlinkConnection{
  edges: [DocumentationlinkEdge]
  documentationlinks: [documentationlink]
  pageInfo: pageInfo!
}

type DocumentationlinkEdge{
  cursor: String!
  node: documentationlink!
}

  enum documentationlinkField {
    documentationLinkDbId
    URL
    type
    ontologyReference_ID
  }
  
  input searchDocumentationlinkInput {
    field: documentationlinkField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchDocumentationlinkInput]
  }

  input orderDocumentationlinkInput{
    field: documentationlinkField
    order: Order
  }



  type Query {
    documentationlinks(search: searchDocumentationlinkInput, order: [ orderDocumentationlinkInput ], pagination: paginationInput! ): [documentationlink]
    readOneDocumentationlink(documentationLinkDbId: ID!): documentationlink
    countDocumentationlinks(search: searchDocumentationlinkInput ): Int
    csvTableTemplateDocumentationlink: [String]
    documentationlinksConnection(search:searchDocumentationlinkInput, order: [ orderDocumentationlinkInput ], pagination: paginationCursorInput! ): DocumentationlinkConnection
    validateDocumentationlinkForCreation(documentationLinkDbId: ID!, URL: String, type: String, ontologyReference_ID: String , addOntologyReference:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateDocumentationlinkForUpdating(documentationLinkDbId: ID!, URL: String, type: String, ontologyReference_ID: String , addOntologyReference:ID, removeOntologyReference:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateDocumentationlinkForDeletion(documentationLinkDbId: ID!): Boolean!
    validateDocumentationlinkAfterReading(documentationLinkDbId: ID!): Boolean!
    """
    documentationlinksZendroDefinition would return the static Zendro data model definition
    """
    documentationlinksZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addDocumentationlink(documentationLinkDbId: ID!, URL: String, type: String, ontologyReference_ID: String , addOntologyReference:ID   , skipAssociationsExistenceChecks:Boolean = false): documentationlink!
    updateDocumentationlink(documentationLinkDbId: ID!, URL: String, type: String, ontologyReference_ID: String , addOntologyReference:ID, removeOntologyReference:ID    , skipAssociationsExistenceChecks:Boolean = false): documentationlink!
    deleteDocumentationlink(documentationLinkDbId: ID!): String!
      }
`;