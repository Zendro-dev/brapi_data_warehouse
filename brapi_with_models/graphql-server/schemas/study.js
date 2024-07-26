module.exports = `
  type study{
    """
    @original-field
    """
    studyDbId: ID
    """
    @original-field
    A flag to indicate if a Study is currently active and ongoing
    """
    active: Boolean

    """
    @original-field
    
    """
    additionalInfo_IDs: [String]

    """
    @original-field
    Common name for the crop associated with this study
    """
    commonCropName: String

    """
    @original-field
    
    """
    contacts_IDs: [String]

    """
    @original-field
    MIAPPE V1.1 (DM-28) Cultural practices - General description of the cultural practices of the study.
    """
    culturalPractices: String

    """
    @original-field
    
    """
    dataLinks_IDs: [String]

    """
    @original-field
    A URL to the human readable documentation of an object
    """
    documentationURL: String

    """
    @original-field
    The date the study ends

MIAPPE V1.1 (DM-15) End date of study - Date and, if relevant, time when the experiment ended
    """
    endDate: String

    """
    @original-field
    
    """
    environmentParameters_IDs: [String]

    """
    @original-field
    
    """
    experimentalDesign_ID: String

    """
    @original-field
    
    """
    externalReferences_IDs: [String]

    """
    @original-field
    
    """
    growthFacility_ID: String

    """
    @original-field
    
    """
    lastUpdate_ID: String

    """
    @original-field
    The usage license associated with the study data
    """
    license: String

    """
    @original-field
    
    """
    location_ID: String

    """
    @original-field
    
    """
    observationLevels_IDs: [String]

    """
    @original-field
    MIAPPE V1.1 (DM-25) Observation unit description - General description of the observation units in the study.
    """
    observationUnitsDescription: String

    """
    @original-field
    
    """
    observationVariables_IDs: [String]

    """
    @original-field
    List of seasons over which this study was performed.
    """
    seasons: [String]

    """
    @original-field
    The date this study started

MIAPPE V1.1 (DM-14) Start date of study - Date and, if relevant, time when the experiment started
    """
    startDate: String

    """
    @original-field
    A short human readable code for a study
    """
    studyCode: String

    """
    @original-field
    The description of this study

MIAPPE V1.1 (DM-13) Study description - Human-readable text describing the study
    """
    studyDescription: String

    """
    @original-field
    The human readable name for a study

MIAPPE V1.1 (DM-12) Study title - Human-readable text summarising the study
    """
    studyName: String

    """
    @original-field
    A permanent unique identifier associated with this study data. For example, a URI or DOI
    """
    studyPUI: String

    """
    @original-field
    The type of study being performed. ex. &#34;Yield Trial&#34;, etc
    """
    studyType: String

    """
    @original-field
    
    """
    trial_ID: String

    """
    @original-field
    
    """
    callSets_IDs: [String]

    """
    @original-field
    
    """
    plates_IDs: [String]

    """
    @original-field
    
    """
    samples_IDs: [String]

    """
    @original-field
    
    """
    variantSets_IDs: [String]

    """
    @original-field
    
    """
    events_IDs: [String]

    """
    @original-field
    
    """
    observations_IDs: [String]

    """
    @original-field
    
    """
    observationUnits_IDs: [String]

    experimentalDesign(search: searchExperimentaldesignInput): experimentaldesign
  growthFacility(search: searchGrowthfacilityInput): growthfacility
  lastUpdate(search: searchLastupdateInput): lastupdate
  location(search: searchLocationInput): location
  trial(search: searchTrialInput): trial
    
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
    contactsFilter(search: searchContactInput, order: [ orderContactInput ], pagination: paginationInput!): [contact]


    """
    @search-request
    """
    contactsConnection(search: searchContactInput, order: [ orderContactInput ], pagination: paginationCursorInput!): ContactConnection

    """
    @count-request
    """
    countFilteredContacts(search: searchContactInput) : Int
  
    """
    @search-request
    """
    dataLinksFilter(search: searchDatalinkInput, order: [ orderDatalinkInput ], pagination: paginationInput!): [datalink]


    """
    @search-request
    """
    dataLinksConnection(search: searchDatalinkInput, order: [ orderDatalinkInput ], pagination: paginationCursorInput!): DatalinkConnection

    """
    @count-request
    """
    countFilteredDataLinks(search: searchDatalinkInput) : Int
  
    """
    @search-request
    """
    environmentParametersFilter(search: searchEnvironmentparameterInput, order: [ orderEnvironmentparameterInput ], pagination: paginationInput!): [environmentparameter]


    """
    @search-request
    """
    environmentParametersConnection(search: searchEnvironmentparameterInput, order: [ orderEnvironmentparameterInput ], pagination: paginationCursorInput!): EnvironmentparameterConnection

    """
    @count-request
    """
    countFilteredEnvironmentParameters(search: searchEnvironmentparameterInput) : Int
  
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
    observationLevelsFilter(search: searchObservationlevelInput, order: [ orderObservationlevelInput ], pagination: paginationInput!): [observationlevel]


    """
    @search-request
    """
    observationLevelsConnection(search: searchObservationlevelInput, order: [ orderObservationlevelInput ], pagination: paginationCursorInput!): ObservationlevelConnection

    """
    @count-request
    """
    countFilteredObservationLevels(search: searchObservationlevelInput) : Int
  
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
    @search-request
    """
    callSetsFilter(search: searchCallsetInput, order: [ orderCallsetInput ], pagination: paginationInput!): [callset]


    """
    @search-request
    """
    callSetsConnection(search: searchCallsetInput, order: [ orderCallsetInput ], pagination: paginationCursorInput!): CallsetConnection

    """
    @count-request
    """
    countFilteredCallSets(search: searchCallsetInput) : Int
  
    """
    @search-request
    """
    platesFilter(search: searchPlateInput, order: [ orderPlateInput ], pagination: paginationInput!): [plate]


    """
    @search-request
    """
    platesConnection(search: searchPlateInput, order: [ orderPlateInput ], pagination: paginationCursorInput!): PlateConnection

    """
    @count-request
    """
    countFilteredPlates(search: searchPlateInput) : Int
  
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
    variantSetsFilter(search: searchVariantsetInput, order: [ orderVariantsetInput ], pagination: paginationInput!): [variantset]


    """
    @search-request
    """
    variantSetsConnection(search: searchVariantsetInput, order: [ orderVariantsetInput ], pagination: paginationCursorInput!): VariantsetConnection

    """
    @count-request
    """
    countFilteredVariantSets(search: searchVariantsetInput) : Int
  
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
    observationUnitsFilter(search: searchObservationunitInput, order: [ orderObservationunitInput ], pagination: paginationInput!): [observationunit]


    """
    @search-request
    """
    observationUnitsConnection(search: searchObservationunitInput, order: [ orderObservationunitInput ], pagination: paginationCursorInput!): ObservationunitConnection

    """
    @count-request
    """
    countFilteredObservationUnits(search: searchObservationunitInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type StudyConnection{
  edges: [StudyEdge]
  studies: [study]
  pageInfo: pageInfo!
}

type StudyEdge{
  cursor: String!
  node: study!
}

  enum studyField {
    studyDbId
    active
    additionalInfo_IDs
    commonCropName
    contacts_IDs
    culturalPractices
    dataLinks_IDs
    documentationURL
    endDate
    environmentParameters_IDs
    experimentalDesign_ID
    externalReferences_IDs
    growthFacility_ID
    lastUpdate_ID
    license
    location_ID
    observationLevels_IDs
    observationUnitsDescription
    observationVariables_IDs
    seasons
    startDate
    studyCode
    studyDescription
    studyName
    studyPUI
    studyType
    trial_ID
    callSets_IDs
    plates_IDs
    samples_IDs
    variantSets_IDs
    events_IDs
    observations_IDs
    observationUnits_IDs
  }
  
  input searchStudyInput {
    field: studyField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchStudyInput]
  }

  input orderStudyInput{
    field: studyField
    order: Order
  }



  type Query {
    studies(search: searchStudyInput, order: [ orderStudyInput ], pagination: paginationInput! ): [study]
    readOneStudy(studyDbId: ID!): study
    countStudies(search: searchStudyInput ): Int
    csvTableTemplateStudy: [String]
    studiesConnection(search:searchStudyInput, order: [ orderStudyInput ], pagination: paginationCursorInput! ): StudyConnection
    validateStudyForCreation(studyDbId: ID!, active: Boolean, additionalInfo_IDs: [String], commonCropName: String, contacts_IDs: [String], culturalPractices: String, dataLinks_IDs: [String], documentationURL: String, endDate: String, environmentParameters_IDs: [String], experimentalDesign_ID: String, externalReferences_IDs: [String], growthFacility_ID: String, lastUpdate_ID: String, license: String, location_ID: String, observationLevels_IDs: [String], observationUnitsDescription: String, seasons: [String], startDate: String, studyCode: String, studyDescription: String, studyName: String, studyPUI: String, studyType: String, trial_ID: String, callSets_IDs: [String], plates_IDs: [String], samples_IDs: [String], variantSets_IDs: [String], observations_IDs: [String], observationUnits_IDs: [String] , addExperimentalDesign:ID, addGrowthFacility:ID, addLastUpdate:ID, addLocation:ID, addTrial:ID  , addAdditionalInfo:[ID], addContacts:[ID], addDataLinks:[ID], addEnvironmentParameters:[ID], addExternalReferences:[ID], addObservationLevels:[ID], addObservationVariables:[ID], addCallSets:[ID], addPlates:[ID], addSamples:[ID], addVariantSets:[ID], addEvents:[ID], addObservations:[ID], addObservationUnits:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateStudyForUpdating(studyDbId: ID!, active: Boolean, additionalInfo_IDs: [String], commonCropName: String, contacts_IDs: [String], culturalPractices: String, dataLinks_IDs: [String], documentationURL: String, endDate: String, environmentParameters_IDs: [String], experimentalDesign_ID: String, externalReferences_IDs: [String], growthFacility_ID: String, lastUpdate_ID: String, license: String, location_ID: String, observationLevels_IDs: [String], observationUnitsDescription: String, seasons: [String], startDate: String, studyCode: String, studyDescription: String, studyName: String, studyPUI: String, studyType: String, trial_ID: String, callSets_IDs: [String], plates_IDs: [String], samples_IDs: [String], variantSets_IDs: [String], observations_IDs: [String], observationUnits_IDs: [String] , addExperimentalDesign:ID, removeExperimentalDesign:ID , addGrowthFacility:ID, removeGrowthFacility:ID , addLastUpdate:ID, removeLastUpdate:ID , addLocation:ID, removeLocation:ID , addTrial:ID, removeTrial:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addContacts:[ID], removeContacts:[ID] , addDataLinks:[ID], removeDataLinks:[ID] , addEnvironmentParameters:[ID], removeEnvironmentParameters:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addObservationLevels:[ID], removeObservationLevels:[ID] , addObservationVariables:[ID], removeObservationVariables:[ID] , addCallSets:[ID], removeCallSets:[ID] , addPlates:[ID], removePlates:[ID] , addSamples:[ID], removeSamples:[ID] , addVariantSets:[ID], removeVariantSets:[ID] , addEvents:[ID], removeEvents:[ID] , addObservations:[ID], removeObservations:[ID] , addObservationUnits:[ID], removeObservationUnits:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateStudyForDeletion(studyDbId: ID!): Boolean!
    validateStudyAfterReading(studyDbId: ID!): Boolean!
    """
    studiesZendroDefinition would return the static Zendro data model definition
    """
    studiesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addStudy(studyDbId: ID!, active: Boolean, additionalInfo_IDs: [String], commonCropName: String, contacts_IDs: [String], culturalPractices: String, dataLinks_IDs: [String], documentationURL: String, endDate: String, environmentParameters_IDs: [String], experimentalDesign_ID: String, externalReferences_IDs: [String], growthFacility_ID: String, lastUpdate_ID: String, license: String, location_ID: String, observationLevels_IDs: [String], observationUnitsDescription: String, seasons: [String], startDate: String, studyCode: String, studyDescription: String, studyName: String, studyPUI: String, studyType: String, trial_ID: String, callSets_IDs: [String], plates_IDs: [String], samples_IDs: [String], variantSets_IDs: [String], observations_IDs: [String], observationUnits_IDs: [String] , addExperimentalDesign:ID, addGrowthFacility:ID, addLastUpdate:ID, addLocation:ID, addTrial:ID  , addAdditionalInfo:[ID], addContacts:[ID], addDataLinks:[ID], addEnvironmentParameters:[ID], addExternalReferences:[ID], addObservationLevels:[ID], addObservationVariables:[ID], addCallSets:[ID], addPlates:[ID], addSamples:[ID], addVariantSets:[ID], addEvents:[ID], addObservations:[ID], addObservationUnits:[ID] , skipAssociationsExistenceChecks:Boolean = false): study!
    updateStudy(studyDbId: ID!, active: Boolean, additionalInfo_IDs: [String], commonCropName: String, contacts_IDs: [String], culturalPractices: String, dataLinks_IDs: [String], documentationURL: String, endDate: String, environmentParameters_IDs: [String], experimentalDesign_ID: String, externalReferences_IDs: [String], growthFacility_ID: String, lastUpdate_ID: String, license: String, location_ID: String, observationLevels_IDs: [String], observationUnitsDescription: String, seasons: [String], startDate: String, studyCode: String, studyDescription: String, studyName: String, studyPUI: String, studyType: String, trial_ID: String, callSets_IDs: [String], plates_IDs: [String], samples_IDs: [String], variantSets_IDs: [String], observations_IDs: [String], observationUnits_IDs: [String] , addExperimentalDesign:ID, removeExperimentalDesign:ID , addGrowthFacility:ID, removeGrowthFacility:ID , addLastUpdate:ID, removeLastUpdate:ID , addLocation:ID, removeLocation:ID , addTrial:ID, removeTrial:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addContacts:[ID], removeContacts:[ID] , addDataLinks:[ID], removeDataLinks:[ID] , addEnvironmentParameters:[ID], removeEnvironmentParameters:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addObservationLevels:[ID], removeObservationLevels:[ID] , addObservationVariables:[ID], removeObservationVariables:[ID] , addCallSets:[ID], removeCallSets:[ID] , addPlates:[ID], removePlates:[ID] , addSamples:[ID], removeSamples:[ID] , addVariantSets:[ID], removeVariantSets:[ID] , addEvents:[ID], removeEvents:[ID] , addObservations:[ID], removeObservations:[ID] , addObservationUnits:[ID], removeObservationUnits:[ID]  , skipAssociationsExistenceChecks:Boolean = false): study!
    deleteStudy(studyDbId: ID!): String!
      }
`;