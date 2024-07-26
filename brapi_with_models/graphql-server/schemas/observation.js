module.exports = `
  type observation{
    """
    @original-field
    """
    observationDbId: ID
    """
    @original-field
    The name or identifier of the entity which collected the observation
    """
    collector: String

    """
    @original-field
    
    """
    germplasm_ID: String

    """
    @original-field
    The date and time when this observation was made
    """
    observationTimeStamp: String

    """
    @original-field
    
    """
    observationUnit_ID: String

    """
    @original-field
    
    """
    observationVariable_ID: String

    """
    @original-field
    
    """
    study_ID: String

    """
    @original-field
    The name or id of the user who uploaded the observation to the database system
    """
    uploadedBy: String

    """
    @original-field
    The value of the data collected as an observation
    """
    value: String

    """
    @original-field
    
    """
    images_IDs: [String]

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
    geoCoordinates_ID: String

    """
    @original-field
    
    """
    season_ID: String

    germplasm(search: searchGermplasmInput): germplasm
  observationUnit(search: searchObservationunitInput): observationunit
  observationVariable(search: searchObservationvariableInput): observationvariable
  study(search: searchStudyInput): study
  geoCoordinates(search: searchCoordinateInput): coordinate
  season(search: searchSeasonInput): season
    
    """
    @search-request
    """
    imagesFilter(search: searchImageInput, order: [ orderImageInput ], pagination: paginationInput!): [image]


    """
    @search-request
    """
    imagesConnection(search: searchImageInput, order: [ orderImageInput ], pagination: paginationCursorInput!): ImageConnection

    """
    @count-request
    """
    countFilteredImages(search: searchImageInput) : Int
  
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
type ObservationConnection{
  edges: [ObservationEdge]
  observations: [observation]
  pageInfo: pageInfo!
}

type ObservationEdge{
  cursor: String!
  node: observation!
}

  enum observationField {
    observationDbId
    collector
    germplasm_ID
    observationTimeStamp
    observationUnit_ID
    observationVariable_ID
    study_ID
    uploadedBy
    value
    images_IDs
    additionalInfo_IDs
    externalReferences_IDs
    geoCoordinates_ID
    season_ID
  }
  
  input searchObservationInput {
    field: observationField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchObservationInput]
  }

  input orderObservationInput{
    field: observationField
    order: Order
  }



  type Query {
    observations(search: searchObservationInput, order: [ orderObservationInput ], pagination: paginationInput! ): [observation]
    readOneObservation(observationDbId: ID!): observation
    countObservations(search: searchObservationInput ): Int
    csvTableTemplateObservation: [String]
    observationsConnection(search:searchObservationInput, order: [ orderObservationInput ], pagination: paginationCursorInput! ): ObservationConnection
    validateObservationForCreation(observationDbId: ID!, collector: String, germplasm_ID: String, observationTimeStamp: String, observationUnit_ID: String, observationVariable_ID: String, study_ID: String, uploadedBy: String, value: String, additionalInfo_IDs: [String], externalReferences_IDs: [String], geoCoordinates_ID: String, season_ID: String , addGermplasm:ID, addObservationUnit:ID, addObservationVariable:ID, addStudy:ID, addGeoCoordinates:ID, addSeason:ID  , addImages:[ID], addAdditionalInfo:[ID], addExternalReferences:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateObservationForUpdating(observationDbId: ID!, collector: String, germplasm_ID: String, observationTimeStamp: String, observationUnit_ID: String, observationVariable_ID: String, study_ID: String, uploadedBy: String, value: String, additionalInfo_IDs: [String], externalReferences_IDs: [String], geoCoordinates_ID: String, season_ID: String , addGermplasm:ID, removeGermplasm:ID , addObservationUnit:ID, removeObservationUnit:ID , addObservationVariable:ID, removeObservationVariable:ID , addStudy:ID, removeStudy:ID , addGeoCoordinates:ID, removeGeoCoordinates:ID , addSeason:ID, removeSeason:ID   , addImages:[ID], removeImages:[ID] , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateObservationForDeletion(observationDbId: ID!): Boolean!
    validateObservationAfterReading(observationDbId: ID!): Boolean!
    """
    observationsZendroDefinition would return the static Zendro data model definition
    """
    observationsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addObservation(observationDbId: ID!, collector: String, germplasm_ID: String, observationTimeStamp: String, observationUnit_ID: String, observationVariable_ID: String, study_ID: String, uploadedBy: String, value: String, additionalInfo_IDs: [String], externalReferences_IDs: [String], geoCoordinates_ID: String, season_ID: String , addGermplasm:ID, addObservationUnit:ID, addObservationVariable:ID, addStudy:ID, addGeoCoordinates:ID, addSeason:ID  , addImages:[ID], addAdditionalInfo:[ID], addExternalReferences:[ID] , skipAssociationsExistenceChecks:Boolean = false): observation!
    updateObservation(observationDbId: ID!, collector: String, germplasm_ID: String, observationTimeStamp: String, observationUnit_ID: String, observationVariable_ID: String, study_ID: String, uploadedBy: String, value: String, additionalInfo_IDs: [String], externalReferences_IDs: [String], geoCoordinates_ID: String, season_ID: String , addGermplasm:ID, removeGermplasm:ID , addObservationUnit:ID, removeObservationUnit:ID , addObservationVariable:ID, removeObservationVariable:ID , addStudy:ID, removeStudy:ID , addGeoCoordinates:ID, removeGeoCoordinates:ID , addSeason:ID, removeSeason:ID   , addImages:[ID], removeImages:[ID] , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID]  , skipAssociationsExistenceChecks:Boolean = false): observation!
    deleteObservation(observationDbId: ID!): String!
      }
`;