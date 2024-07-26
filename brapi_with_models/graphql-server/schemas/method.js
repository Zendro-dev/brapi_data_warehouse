module.exports = `
  type method{
    """
    @original-field
    """
    methodDbId: ID
    """
    @original-field
    Bibliographical reference describing the method.
&lt;br/&gt;MIAPPE V1.1 (DM-91) Reference associated to the method - URI/DOI of reference describing the method.
    """
    bibliographicalReference: String

    """
    @original-field
    Method description
&lt;br/&gt;MIAPPE V1.1 (DM-90) Method description - Textual description of the method, which may extend a method defined in an external reference with specific parameters, e.g. growth stage, inoculation precise organ (leaf number)
    """
    description: String

    """
    @original-field
    For computational methods i.e., when the method consists in assessing the trait by computing measurements, write the generic formula used for the calculation
    """
    formula: String

    """
    @original-field
    Method class (examples: &#34;Measurement&#34;, &#34;Counting&#34;, &#34;Estimation&#34;, &#34;Computation&#34;, etc.)
    """
    methodClass: String

    """
    @original-field
    Human readable name for the method
&lt;br/&gt;MIAPPE V1.1 (DM-88) Method  Name of the method of observation
    """
    methodName: String

    """
    @original-field
    The Permanent Unique Identifier of a Method, usually in the form of a URI
    """
    methodPUI: String

    """
    @original-field
    
    """
    additionalInfo_IDs: [String]

    """
    @original-field
    
    """
    externalReferences_IDs: [String]

    """
    @original-field
    
    """
    ontologyReference_ID: String

    """
    @original-field
    
    """
    germplasmAttributes_IDs: [String]

    """
    @original-field
    
    """
    observationVariables_IDs: [String]

    ontologyReference(search: searchOntologyreferenceInput): ontologyreference
    
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
    @search-request
    """
    externalReferencesFilter(search: searchExternalreferenceInput, order: [ orderExternalreferenceInput ], pagination: paginationInput!): [externalreference]


    """
    @search-request
    """
    externalReferencesConnection(search: searchExternalreferenceInput, order: [ orderExternalreferenceInput ], pagination: paginationCursorInput!): ExternalreferenceConnection

    """
    @count-request
    """
    countFilteredExternalReferences(search: searchExternalreferenceInput) : Int
  
    """
    @search-request
    """
    germplasmAttributesFilter(search: searchGermplasmattributeInput, order: [ orderGermplasmattributeInput ], pagination: paginationInput!): [germplasmattribute]


    """
    @search-request
    """
    germplasmAttributesConnection(search: searchGermplasmattributeInput, order: [ orderGermplasmattributeInput ], pagination: paginationCursorInput!): GermplasmattributeConnection

    """
    @count-request
    """
    countFilteredGermplasmAttributes(search: searchGermplasmattributeInput) : Int
  
    """
    @search-request
    """
    observationVariablesFilter(search: searchObservationvariableInput, order: [ orderObservationvariableInput ], pagination: paginationInput!): [observationvariable]


    """
    @search-request
    """
    observationVariablesConnection(search: searchObservationvariableInput, order: [ orderObservationvariableInput ], pagination: paginationCursorInput!): ObservationvariableConnection

    """
    @count-request
    """
    countFilteredObservationVariables(search: searchObservationvariableInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type MethodConnection{
  edges: [MethodEdge]
  methods: [method]
  pageInfo: pageInfo!
}

type MethodEdge{
  cursor: String!
  node: method!
}

  enum methodField {
    methodDbId
    bibliographicalReference
    description
    formula
    methodClass
    methodName
    methodPUI
    additionalInfo_IDs
    externalReferences_IDs
    ontologyReference_ID
    germplasmAttributes_IDs
    observationVariables_IDs
  }
  
  input searchMethodInput {
    field: methodField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchMethodInput]
  }

  input orderMethodInput{
    field: methodField
    order: Order
  }



  type Query {
    methods(search: searchMethodInput, order: [ orderMethodInput ], pagination: paginationInput! ): [method]
    readOneMethod(methodDbId: ID!): method
    countMethods(search: searchMethodInput ): Int
    csvTableTemplateMethod: [String]
    methodsConnection(search:searchMethodInput, order: [ orderMethodInput ], pagination: paginationCursorInput! ): MethodConnection
    validateMethodForCreation(methodDbId: ID!, bibliographicalReference: String, description: String, formula: String, methodClass: String, methodName: String, methodPUI: String, additionalInfo_IDs: [String], externalReferences_IDs: [String], ontologyReference_ID: String, germplasmAttributes_IDs: [String], observationVariables_IDs: [String] , addOntologyReference:ID  , addAdditionalInfo:[ID], addExternalReferences:[ID], addGermplasmAttributes:[ID], addObservationVariables:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateMethodForUpdating(methodDbId: ID!, bibliographicalReference: String, description: String, formula: String, methodClass: String, methodName: String, methodPUI: String, additionalInfo_IDs: [String], externalReferences_IDs: [String], ontologyReference_ID: String, germplasmAttributes_IDs: [String], observationVariables_IDs: [String] , addOntologyReference:ID, removeOntologyReference:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addGermplasmAttributes:[ID], removeGermplasmAttributes:[ID] , addObservationVariables:[ID], removeObservationVariables:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateMethodForDeletion(methodDbId: ID!): Boolean!
    validateMethodAfterReading(methodDbId: ID!): Boolean!
    """
    methodsZendroDefinition would return the static Zendro data model definition
    """
    methodsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addMethod(methodDbId: ID!, bibliographicalReference: String, description: String, formula: String, methodClass: String, methodName: String, methodPUI: String, additionalInfo_IDs: [String], externalReferences_IDs: [String], ontologyReference_ID: String, germplasmAttributes_IDs: [String], observationVariables_IDs: [String] , addOntologyReference:ID  , addAdditionalInfo:[ID], addExternalReferences:[ID], addGermplasmAttributes:[ID], addObservationVariables:[ID] , skipAssociationsExistenceChecks:Boolean = false): method!
    updateMethod(methodDbId: ID!, bibliographicalReference: String, description: String, formula: String, methodClass: String, methodName: String, methodPUI: String, additionalInfo_IDs: [String], externalReferences_IDs: [String], ontologyReference_ID: String, germplasmAttributes_IDs: [String], observationVariables_IDs: [String] , addOntologyReference:ID, removeOntologyReference:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addGermplasmAttributes:[ID], removeGermplasmAttributes:[ID] , addObservationVariables:[ID], removeObservationVariables:[ID]  , skipAssociationsExistenceChecks:Boolean = false): method!
    deleteMethod(methodDbId: ID!): String!
      }
`;