module.exports = `
  type observationunit{
    """
    @original-field
    """
    observationUnitDbId: ID
    """
    @original-field
    
    """
    cross_ID: String

    """
    @original-field
    
    """
    germplasm_ID: String

    """
    @original-field
    
    """
    location_ID: String

    """
    @original-field
    A human readable name for an observation unit
    """
    observationUnitName: String

    """
    @original-field
    A Permanent Unique Identifier for an observation unit

MIAPPE V1.1 (DM-72) External ID - Identifier for the observation unit in a persistent repository, comprises the name of the repository and the identifier of the observation unit therein. The EBI Biosamples repository can be used. URI are recommended when possible.
    """
    observationUnitPUI: String

    """
    @original-field
    
    """
    program_ID: String

    """
    @original-field
    
    """
    seedLot_ID: String

    """
    @original-field
    
    """
    study_ID: String

    """
    @original-field
    
    """
    trial_ID: String

    """
    @original-field
    
    """
    samples_IDs: [String]

    """
    @original-field
    
    """
    events_IDs: [String]

    """
    @original-field
    
    """
    images_IDs: [String]

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
    observationUnitPosition_ID: String

    """
    @original-field
    
    """
    treatments_IDs: [String]

    cross(search: searchCrossInput): cross
  germplasm(search: searchGermplasmInput): germplasm
  location(search: searchLocationInput): location
  program(search: searchProgramInput): program
  seedLot(search: searchSeedlotInput): seedlot
  study(search: searchStudyInput): study
  trial(search: searchTrialInput): trial
  observationUnitPosition(search: searchObservationunitpositionInput): observationunitposition
    
    """
    @search-request
    """
    samplesFilter(search: searchSampleInput, order: [ orderSampleInput ], pagination: paginationInput!): [sample]


    """
    @search-request
    """
    samplesConnection(search: searchSampleInput, order: [ orderSampleInput ], pagination: paginationCursorInput!): SampleConnection

    """
    @count-request
    """
    countFilteredSamples(search: searchSampleInput) : Int
  
    """
    @search-request
    """
    eventsFilter(search: searchEventInput, order: [ orderEventInput ], pagination: paginationInput!): [event]


    """
    @search-request
    """
    eventsConnection(search: searchEventInput, order: [ orderEventInput ], pagination: paginationCursorInput!): EventConnection

    """
    @count-request
    """
    countFilteredEvents(search: searchEventInput) : Int
  
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
    @search-request
    """
    treatmentsFilter(search: searchTreatmentInput, order: [ orderTreatmentInput ], pagination: paginationInput!): [treatment]


    """
    @search-request
    """
    treatmentsConnection(search: searchTreatmentInput, order: [ orderTreatmentInput ], pagination: paginationCursorInput!): TreatmentConnection

    """
    @count-request
    """
    countFilteredTreatments(search: searchTreatmentInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type ObservationunitConnection{
  edges: [ObservationunitEdge]
  observationunits: [observationunit]
  pageInfo: pageInfo!
}

type ObservationunitEdge{
  cursor: String!
  node: observationunit!
}

  enum observationunitField {
    observationUnitDbId
    cross_ID
    germplasm_ID
    location_ID
    observationUnitName
    observationUnitPUI
    program_ID
    seedLot_ID
    study_ID
    trial_ID
    samples_IDs
    events_IDs
    images_IDs
    observations_IDs
    additionalInfo_IDs
    externalReferences_IDs
    observationUnitPosition_ID
    treatments_IDs
  }
  
  input searchObservationunitInput {
    field: observationunitField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchObservationunitInput]
  }

  input orderObservationunitInput{
    field: observationunitField
    order: Order
  }



  type Query {
    observationunits(search: searchObservationunitInput, order: [ orderObservationunitInput ], pagination: paginationInput! ): [observationunit]
    readOneObservationunit(observationUnitDbId: ID!): observationunit
    countObservationunits(search: searchObservationunitInput ): Int
    csvTableTemplateObservationunit: [String]
    observationunitsConnection(search:searchObservationunitInput, order: [ orderObservationunitInput ], pagination: paginationCursorInput! ): ObservationunitConnection
    validateObservationunitForCreation(observationUnitDbId: ID!, cross_ID: String, germplasm_ID: String, location_ID: String, observationUnitName: String, observationUnitPUI: String, program_ID: String, seedLot_ID: String, study_ID: String, trial_ID: String, samples_IDs: [String], images_IDs: [String], observations_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String], observationUnitPosition_ID: String , addCross:ID, addGermplasm:ID, addLocation:ID, addProgram:ID, addSeedLot:ID, addStudy:ID, addTrial:ID, addObservationUnitPosition:ID  , addSamples:[ID], addEvents:[ID], addImages:[ID], addObservations:[ID], addAdditionalInfo:[ID], addExternalReferences:[ID], addTreatments:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateObservationunitForUpdating(observationUnitDbId: ID!, cross_ID: String, germplasm_ID: String, location_ID: String, observationUnitName: String, observationUnitPUI: String, program_ID: String, seedLot_ID: String, study_ID: String, trial_ID: String, samples_IDs: [String], images_IDs: [String], observations_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String], observationUnitPosition_ID: String , addCross:ID, removeCross:ID , addGermplasm:ID, removeGermplasm:ID , addLocation:ID, removeLocation:ID , addProgram:ID, removeProgram:ID , addSeedLot:ID, removeSeedLot:ID , addStudy:ID, removeStudy:ID , addTrial:ID, removeTrial:ID , addObservationUnitPosition:ID, removeObservationUnitPosition:ID   , addSamples:[ID], removeSamples:[ID] , addEvents:[ID], removeEvents:[ID] , addImages:[ID], removeImages:[ID] , addObservations:[ID], removeObservations:[ID] , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addTreatments:[ID], removeTreatments:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateObservationunitForDeletion(observationUnitDbId: ID!): Boolean!
    validateObservationunitAfterReading(observationUnitDbId: ID!): Boolean!
    """
    observationunitsZendroDefinition would return the static Zendro data model definition
    """
    observationunitsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addObservationunit(observationUnitDbId: ID!, cross_ID: String, germplasm_ID: String, location_ID: String, observationUnitName: String, observationUnitPUI: String, program_ID: String, seedLot_ID: String, study_ID: String, trial_ID: String, samples_IDs: [String], images_IDs: [String], observations_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String], observationUnitPosition_ID: String , addCross:ID, addGermplasm:ID, addLocation:ID, addProgram:ID, addSeedLot:ID, addStudy:ID, addTrial:ID, addObservationUnitPosition:ID  , addSamples:[ID], addEvents:[ID], addImages:[ID], addObservations:[ID], addAdditionalInfo:[ID], addExternalReferences:[ID], addTreatments:[ID] , skipAssociationsExistenceChecks:Boolean = false): observationunit!
    updateObservationunit(observationUnitDbId: ID!, cross_ID: String, germplasm_ID: String, location_ID: String, observationUnitName: String, observationUnitPUI: String, program_ID: String, seedLot_ID: String, study_ID: String, trial_ID: String, samples_IDs: [String], images_IDs: [String], observations_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String], observationUnitPosition_ID: String , addCross:ID, removeCross:ID , addGermplasm:ID, removeGermplasm:ID , addLocation:ID, removeLocation:ID , addProgram:ID, removeProgram:ID , addSeedLot:ID, removeSeedLot:ID , addStudy:ID, removeStudy:ID , addTrial:ID, removeTrial:ID , addObservationUnitPosition:ID, removeObservationUnitPosition:ID   , addSamples:[ID], removeSamples:[ID] , addEvents:[ID], removeEvents:[ID] , addImages:[ID], removeImages:[ID] , addObservations:[ID], removeObservations:[ID] , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addTreatments:[ID], removeTreatments:[ID]  , skipAssociationsExistenceChecks:Boolean = false): observationunit!
    deleteObservationunit(observationUnitDbId: ID!): String!
      }
`;