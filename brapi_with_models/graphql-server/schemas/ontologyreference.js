module.exports = `
  type ontologyreference{
    """
    @original-field
    """
    ontologyReferenceDbId: ID
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
    germplasmAttribute_ID: String

    """
    @original-field
    
    """
    method_ID: String

    """
    @original-field
    
    """
    observationVariable_ID: String

    """
    @original-field
    
    """
    scale_ID: String

    """
    @original-field
    
    """
    trait_ID: String

    """
    @original-field
    
    """
    documentationLinks_IDs: [String]

    germplasmAttribute(search: searchGermplasmattributeInput): germplasmattribute
  method(search: searchMethodInput): method
  observationVariable(search: searchObservationvariableInput): observationvariable
  scale(search: searchScaleInput): scale
  trait(search: searchTraitInput): trait
    
    """
    @search-request
    """
    documentationLinksFilter(search: searchDocumentationlinkInput, order: [ orderDocumentationlinkInput ], pagination: paginationInput!): [documentationlink]


    """
    @search-request
    """
    documentationLinksConnection(search: searchDocumentationlinkInput, order: [ orderDocumentationlinkInput ], pagination: paginationCursorInput!): DocumentationlinkConnection

    """
    @count-request
    """
    countFilteredDocumentationLinks(search: searchDocumentationlinkInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type OntologyreferenceConnection{
  edges: [OntologyreferenceEdge]
  ontologyreferences: [ontologyreference]
  pageInfo: pageInfo!
}

type OntologyreferenceEdge{
  cursor: String!
  node: ontologyreference!
}

  enum ontologyreferenceField {
    ontologyReferenceDbId
    ontologyName
    version
    germplasmAttribute_ID
    method_ID
    observationVariable_ID
    scale_ID
    trait_ID
    documentationLinks_IDs
  }
  
  input searchOntologyreferenceInput {
    field: ontologyreferenceField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchOntologyreferenceInput]
  }

  input orderOntologyreferenceInput{
    field: ontologyreferenceField
    order: Order
  }



  type Query {
    ontologyreferences(search: searchOntologyreferenceInput, order: [ orderOntologyreferenceInput ], pagination: paginationInput! ): [ontologyreference]
    readOneOntologyreference(ontologyReferenceDbId: ID!): ontologyreference
    countOntologyreferences(search: searchOntologyreferenceInput ): Int
    csvTableTemplateOntologyreference: [String]
    ontologyreferencesConnection(search:searchOntologyreferenceInput, order: [ orderOntologyreferenceInput ], pagination: paginationCursorInput! ): OntologyreferenceConnection
    validateOntologyreferenceForCreation(ontologyReferenceDbId: ID!, ontologyName: String, version: String, germplasmAttribute_ID: String, method_ID: String, observationVariable_ID: String, scale_ID: String, trait_ID: String, documentationLinks_IDs: [String] , addGermplasmAttribute:ID, addMethod:ID, addObservationVariable:ID, addScale:ID, addTrait:ID  , addDocumentationLinks:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateOntologyreferenceForUpdating(ontologyReferenceDbId: ID!, ontologyName: String, version: String, germplasmAttribute_ID: String, method_ID: String, observationVariable_ID: String, scale_ID: String, trait_ID: String, documentationLinks_IDs: [String] , addGermplasmAttribute:ID, removeGermplasmAttribute:ID , addMethod:ID, removeMethod:ID , addObservationVariable:ID, removeObservationVariable:ID , addScale:ID, removeScale:ID , addTrait:ID, removeTrait:ID   , addDocumentationLinks:[ID], removeDocumentationLinks:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateOntologyreferenceForDeletion(ontologyReferenceDbId: ID!): Boolean!
    validateOntologyreferenceAfterReading(ontologyReferenceDbId: ID!): Boolean!
    """
    ontologyreferencesZendroDefinition would return the static Zendro data model definition
    """
    ontologyreferencesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addOntologyreference(ontologyReferenceDbId: ID!, ontologyName: String, version: String, germplasmAttribute_ID: String, method_ID: String, observationVariable_ID: String, scale_ID: String, trait_ID: String, documentationLinks_IDs: [String] , addGermplasmAttribute:ID, addMethod:ID, addObservationVariable:ID, addScale:ID, addTrait:ID  , addDocumentationLinks:[ID] , skipAssociationsExistenceChecks:Boolean = false): ontologyreference!
    updateOntologyreference(ontologyReferenceDbId: ID!, ontologyName: String, version: String, germplasmAttribute_ID: String, method_ID: String, observationVariable_ID: String, scale_ID: String, trait_ID: String, documentationLinks_IDs: [String] , addGermplasmAttribute:ID, removeGermplasmAttribute:ID , addMethod:ID, removeMethod:ID , addObservationVariable:ID, removeObservationVariable:ID , addScale:ID, removeScale:ID , addTrait:ID, removeTrait:ID   , addDocumentationLinks:[ID], removeDocumentationLinks:[ID]  , skipAssociationsExistenceChecks:Boolean = false): ontologyreference!
    deleteOntologyreference(ontologyReferenceDbId: ID!): String!
      }
`;