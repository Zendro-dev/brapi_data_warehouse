module.exports = `
  type observationvariable{
    """
    @original-field
    """
    observationVariableDbId: ID
    """
    @original-field
    Crop name (examples: &#34;Maize&#34;, &#34;Wheat&#34;)
    """
    commonCropName: String

    """
    @original-field
    Indication of how trait is routinely used. (examples: [&#34;Trial evaluation&#34;, &#34;Nursery evaluation&#34;])
    """
    contextOfUse: [String]

    """
    @original-field
    Variable default value. (examples: &#34;red&#34;, &#34;2.3&#34;, etc.)
    """
    defaultValue: String

    """
    @original-field
    A URL to the human readable documentation of an object
    """
    documentationURL: String

    """
    @original-field
    Growth stage at which measurement is made (examples: &#34;flowering&#34;)
    """
    growthStage: String

    """
    @original-field
    Name of institution submitting the variable
    """
    institution: String

    """
    @original-field
    2 letter ISO 639-1 code for the language of submission of the variable.
    """
    language: String

    """
    @original-field
    Variable name (usually a short name)

MIAPPE V1.1 (DM-84) Variable name - Name of the variable.
    """
    observationVariableName: String

    """
    @original-field
    The Permanent Unique Identifier of a Observation Variable, usually in the form of a URI
    """
    observationVariablePUI: String

    """
    @original-field
    Name of scientist submitting the variable.
    """
    scientist: String

    """
    @original-field
    Variable status. (examples: &#34;recommended&#34;, &#34;obsolete&#34;, &#34;legacy&#34;, etc.)
    """
    status: String

    """
    @original-field
    Timestamp when the Variable was added (ISO 8601)
    """
    submissionTimestamp: String

    """
    @original-field
    Other variable names
    """
    synonyms: [String]

    """
    @original-field
    
    """
    studies_IDs: [String]

    """
    @original-field
    
    """
    observations_IDs: [String]

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
    method_ID: String

    """
    @original-field
    
    """
    ontologyReference_ID: String

    """
    @original-field
    
    """
    scale_ID: String

    """
    @original-field
    
    """
    trait_ID: String

    method(search: searchMethodInput): method
  ontologyReference(search: searchOntologyreferenceInput): ontologyreference
  scale(search: searchScaleInput): scale
  trait(search: searchTraitInput): trait
    
    """
    @search-request
    """
    studiesFilter(search: searchStudyInput, order: [ orderStudyInput ], pagination: paginationInput!): [study]


    """
    @search-request
    """
    studiesConnection(search: searchStudyInput, order: [ orderStudyInput ], pagination: paginationCursorInput!): StudyConnection

    """
    @count-request
    """
    countFilteredStudies(search: searchStudyInput) : Int
  
    """
    @search-request
    """
    observationsFilter(search: searchObservationInput, order: [ orderObservationInput ], pagination: paginationInput!): [observation]


    """
    @search-request
    """
    observationsConnection(search: searchObservationInput, order: [ orderObservationInput ], pagination: paginationCursorInput!): ObservationConnection

    """
    @count-request
    """
    countFilteredObservations(search: searchObservationInput) : Int
  
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
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type ObservationvariableConnection{
  edges: [ObservationvariableEdge]
  observationvariables: [observationvariable]
  pageInfo: pageInfo!
}

type ObservationvariableEdge{
  cursor: String!
  node: observationvariable!
}

  enum observationvariableField {
    observationVariableDbId
    commonCropName
    contextOfUse
    defaultValue
    documentationURL
    growthStage
    institution
    language
    observationVariableName
    observationVariablePUI
    scientist
    status
    submissionTimestamp
    synonyms
    studies_IDs
    observations_IDs
    additionalInfo_IDs
    externalReferences_IDs
    method_ID
    ontologyReference_ID
    scale_ID
    trait_ID
  }
  
  input searchObservationvariableInput {
    field: observationvariableField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchObservationvariableInput]
  }

  input orderObservationvariableInput{
    field: observationvariableField
    order: Order
  }



  type Query {
    observationvariables(search: searchObservationvariableInput, order: [ orderObservationvariableInput ], pagination: paginationInput! ): [observationvariable]
    readOneObservationvariable(observationVariableDbId: ID!): observationvariable
    countObservationvariables(search: searchObservationvariableInput ): Int
    csvTableTemplateObservationvariable: [String]
    observationvariablesConnection(search:searchObservationvariableInput, order: [ orderObservationvariableInput ], pagination: paginationCursorInput! ): ObservationvariableConnection
    validateObservationvariableForCreation(observationVariableDbId: ID!, commonCropName: String, contextOfUse: [String], defaultValue: String, documentationURL: String, growthStage: String, institution: String, language: String, observationVariableName: String, observationVariablePUI: String, scientist: String, status: String, submissionTimestamp: String, synonyms: [String], observations_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String], method_ID: String, ontologyReference_ID: String, scale_ID: String, trait_ID: String , addMethod:ID, addOntologyReference:ID, addScale:ID, addTrait:ID  , addStudies:[ID], addObservations:[ID], addAdditionalInfo:[ID], addExternalReferences:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateObservationvariableForUpdating(observationVariableDbId: ID!, commonCropName: String, contextOfUse: [String], defaultValue: String, documentationURL: String, growthStage: String, institution: String, language: String, observationVariableName: String, observationVariablePUI: String, scientist: String, status: String, submissionTimestamp: String, synonyms: [String], observations_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String], method_ID: String, ontologyReference_ID: String, scale_ID: String, trait_ID: String , addMethod:ID, removeMethod:ID , addOntologyReference:ID, removeOntologyReference:ID , addScale:ID, removeScale:ID , addTrait:ID, removeTrait:ID   , addStudies:[ID], removeStudies:[ID] , addObservations:[ID], removeObservations:[ID] , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateObservationvariableForDeletion(observationVariableDbId: ID!): Boolean!
    validateObservationvariableAfterReading(observationVariableDbId: ID!): Boolean!
    """
    observationvariablesZendroDefinition would return the static Zendro data model definition
    """
    observationvariablesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addObservationvariable(observationVariableDbId: ID!, commonCropName: String, contextOfUse: [String], defaultValue: String, documentationURL: String, growthStage: String, institution: String, language: String, observationVariableName: String, observationVariablePUI: String, scientist: String, status: String, submissionTimestamp: String, synonyms: [String], observations_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String], method_ID: String, ontologyReference_ID: String, scale_ID: String, trait_ID: String , addMethod:ID, addOntologyReference:ID, addScale:ID, addTrait:ID  , addStudies:[ID], addObservations:[ID], addAdditionalInfo:[ID], addExternalReferences:[ID] , skipAssociationsExistenceChecks:Boolean = false): observationvariable!
    updateObservationvariable(observationVariableDbId: ID!, commonCropName: String, contextOfUse: [String], defaultValue: String, documentationURL: String, growthStage: String, institution: String, language: String, observationVariableName: String, observationVariablePUI: String, scientist: String, status: String, submissionTimestamp: String, synonyms: [String], observations_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String], method_ID: String, ontologyReference_ID: String, scale_ID: String, trait_ID: String , addMethod:ID, removeMethod:ID , addOntologyReference:ID, removeOntologyReference:ID , addScale:ID, removeScale:ID , addTrait:ID, removeTrait:ID   , addStudies:[ID], removeStudies:[ID] , addObservations:[ID], removeObservations:[ID] , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID]  , skipAssociationsExistenceChecks:Boolean = false): observationvariable!
    deleteObservationvariable(observationVariableDbId: ID!): String!
      }
`;