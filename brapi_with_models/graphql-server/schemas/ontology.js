module.exports = `
  type ontology{
    """
    @original-field
    """
    ontologyDbId: ID
    """
    @original-field
    Ontology&#39;s list of authors (no specific format)
    """
    authors: String

    """
    @original-field
    Ontology copyright
    """
    copyright: String

    """
    @original-field
    Human readable description of Ontology
    """
    description: String

    """
    @original-field
    A URL to the human readable documentation of an object
    """
    documentationURL: String

    """
    @original-field
    Ontology licence
    """
    licence: String

    """
    @original-field
    Ontology name
    """
    ontologyName: String

    """
    @original-field
    Ontology version (no specific format)
    """
    version: String

    """
    @original-field
    
    """
    additionalInfo_IDs: [String]

      
    """
    @search-request
    """
    additionalInfoFilter(search: searchAdditionalinfoInput, order: [ orderAdditionalinfoInput ], pagination: paginationInput!): [additionalinfo]


    """
    @search-request
    """
    additionalInfoConnection(search: searchAdditionalinfoInput, order: [ orderAdditionalinfoInput ], pagination: paginationCursorInput!): AdditionalinfoConnection

    """
    @count-request
    """
    countFilteredAdditionalInfo(search: searchAdditionalinfoInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type OntologyConnection{
  edges: [OntologyEdge]
  ontologies: [ontology]
  pageInfo: pageInfo!
}

type OntologyEdge{
  cursor: String!
  node: ontology!
}

  enum ontologyField {
    ontologyDbId
    authors
    copyright
    description
    documentationURL
    licence
    ontologyName
    version
    additionalInfo_IDs
  }
  
  input searchOntologyInput {
    field: ontologyField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchOntologyInput]
  }

  input orderOntologyInput{
    field: ontologyField
    order: Order
  }



  type Query {
    ontologies(search: searchOntologyInput, order: [ orderOntologyInput ], pagination: paginationInput! ): [ontology]
    readOneOntology(ontologyDbId: ID!): ontology
    countOntologies(search: searchOntologyInput ): Int
    csvTableTemplateOntology: [String]
    ontologiesConnection(search:searchOntologyInput, order: [ orderOntologyInput ], pagination: paginationCursorInput! ): OntologyConnection
    validateOntologyForCreation(ontologyDbId: ID!, authors: String, copyright: String, description: String, documentationURL: String, licence: String, ontologyName: String, version: String, additionalInfo_IDs: [String]   , addAdditionalInfo:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateOntologyForUpdating(ontologyDbId: ID!, authors: String, copyright: String, description: String, documentationURL: String, licence: String, ontologyName: String, version: String, additionalInfo_IDs: [String]   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateOntologyForDeletion(ontologyDbId: ID!): Boolean!
    validateOntologyAfterReading(ontologyDbId: ID!): Boolean!
    """
    ontologiesZendroDefinition would return the static Zendro data model definition
    """
    ontologiesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addOntology(ontologyDbId: ID!, authors: String, copyright: String, description: String, documentationURL: String, licence: String, ontologyName: String, version: String, additionalInfo_IDs: [String]   , addAdditionalInfo:[ID] , skipAssociationsExistenceChecks:Boolean = false): ontology!
    updateOntology(ontologyDbId: ID!, authors: String, copyright: String, description: String, documentationURL: String, licence: String, ontologyName: String, version: String, additionalInfo_IDs: [String]   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID]  , skipAssociationsExistenceChecks:Boolean = false): ontology!
    deleteOntology(ontologyDbId: ID!): String!
      }
`;