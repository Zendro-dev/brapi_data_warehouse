module.exports = `
  type trial{
    """
    @original-field
    """
    trialDbId: ID
    """
    @original-field
    A flag to indicate if a Trial is currently active and ongoing
    """
    active: Boolean

    """
    @original-field
    
    """
    additionalInfo_IDs: [String]

    """
    @original-field
    Common name for the crop associated with this trial
    """
    commonCropName: String

    """
    @original-field
    
    """
    contacts_IDs: [String]

    """
    @original-field
    
    """
    datasetAuthorships_IDs: [String]

    """
    @original-field
    A URL to the human readable documentation of an object
    """
    documentationURL: String

    """
    @original-field
    The date this trial ends
    """
    endDate: String

    """
    @original-field
    
    """
    externalReferences_IDs: [String]

    """
    @original-field
    
    """
    program_ID: String

    """
    @original-field
    
    """
    studies_IDs: [String]

    """
    @original-field
    
    """
    publications_IDs: [String]

    """
    @original-field
    The date this trial started
    """
    startDate: String

    """
    @original-field
    The human readable description of a trial

MIAPPE V1.1 (DM-4) Investigation description - Human-readable text describing the investigation in more detail.
    """
    trialDescription: String

    """
    @original-field
    The human readable name of a trial

MIAPPE V1.1 (DM-3) Investigation title - Human-readable string summarising the investigation.
    """
    trialName: String

    """
    @original-field
    A permanent identifier for a trial. Could be DOI or other URI formatted identifier.
    """
    trialPUI: String

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
    observationUnits_IDs: [String]

    program(search: searchProgramInput): program
    
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
    datasetAuthorshipsFilter(search: searchDatasetauthorshipInput, order: [ orderDatasetauthorshipInput ], pagination: paginationInput!): [datasetauthorship]


    """
    @search-request
    """
    datasetAuthorshipsConnection(search: searchDatasetauthorshipInput, order: [ orderDatasetauthorshipInput ], pagination: paginationCursorInput!): DatasetauthorshipConnection

    """
    @count-request
    """
    countFilteredDatasetAuthorships(search: searchDatasetauthorshipInput) : Int
  
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
    publicationsFilter(search: searchPublicationInput, order: [ orderPublicationInput ], pagination: paginationInput!): [publication]


    """
    @search-request
    """
    publicationsConnection(search: searchPublicationInput, order: [ orderPublicationInput ], pagination: paginationCursorInput!): PublicationConnection

    """
    @count-request
    """
    countFilteredPublications(search: searchPublicationInput) : Int
  
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
type TrialConnection{
  edges: [TrialEdge]
  trials: [trial]
  pageInfo: pageInfo!
}

type TrialEdge{
  cursor: String!
  node: trial!
}

  enum trialField {
    trialDbId
    active
    additionalInfo_IDs
    commonCropName
    contacts_IDs
    datasetAuthorships_IDs
    documentationURL
    endDate
    externalReferences_IDs
    program_ID
    studies_IDs
    publications_IDs
    startDate
    trialDescription
    trialName
    trialPUI
    plates_IDs
    samples_IDs
    observationUnits_IDs
  }
  
  input searchTrialInput {
    field: trialField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchTrialInput]
  }

  input orderTrialInput{
    field: trialField
    order: Order
  }



  type Query {
    trials(search: searchTrialInput, order: [ orderTrialInput ], pagination: paginationInput! ): [trial]
    readOneTrial(trialDbId: ID!): trial
    countTrials(search: searchTrialInput ): Int
    csvTableTemplateTrial: [String]
    trialsConnection(search:searchTrialInput, order: [ orderTrialInput ], pagination: paginationCursorInput! ): TrialConnection
    validateTrialForCreation(trialDbId: ID!, active: Boolean, additionalInfo_IDs: [String], commonCropName: String, contacts_IDs: [String], datasetAuthorships_IDs: [String], documentationURL: String, endDate: String, externalReferences_IDs: [String], program_ID: String, studies_IDs: [String], publications_IDs: [String], startDate: String, trialDescription: String, trialName: String, trialPUI: String, plates_IDs: [String], samples_IDs: [String], observationUnits_IDs: [String] , addProgram:ID  , addAdditionalInfo:[ID], addContacts:[ID], addDatasetAuthorships:[ID], addExternalReferences:[ID], addStudies:[ID], addPublications:[ID], addPlates:[ID], addSamples:[ID], addObservationUnits:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateTrialForUpdating(trialDbId: ID!, active: Boolean, additionalInfo_IDs: [String], commonCropName: String, contacts_IDs: [String], datasetAuthorships_IDs: [String], documentationURL: String, endDate: String, externalReferences_IDs: [String], program_ID: String, studies_IDs: [String], publications_IDs: [String], startDate: String, trialDescription: String, trialName: String, trialPUI: String, plates_IDs: [String], samples_IDs: [String], observationUnits_IDs: [String] , addProgram:ID, removeProgram:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addContacts:[ID], removeContacts:[ID] , addDatasetAuthorships:[ID], removeDatasetAuthorships:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addStudies:[ID], removeStudies:[ID] , addPublications:[ID], removePublications:[ID] , addPlates:[ID], removePlates:[ID] , addSamples:[ID], removeSamples:[ID] , addObservationUnits:[ID], removeObservationUnits:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateTrialForDeletion(trialDbId: ID!): Boolean!
    validateTrialAfterReading(trialDbId: ID!): Boolean!
    """
    trialsZendroDefinition would return the static Zendro data model definition
    """
    trialsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addTrial(trialDbId: ID!, active: Boolean, additionalInfo_IDs: [String], commonCropName: String, contacts_IDs: [String], datasetAuthorships_IDs: [String], documentationURL: String, endDate: String, externalReferences_IDs: [String], program_ID: String, studies_IDs: [String], publications_IDs: [String], startDate: String, trialDescription: String, trialName: String, trialPUI: String, plates_IDs: [String], samples_IDs: [String], observationUnits_IDs: [String] , addProgram:ID  , addAdditionalInfo:[ID], addContacts:[ID], addDatasetAuthorships:[ID], addExternalReferences:[ID], addStudies:[ID], addPublications:[ID], addPlates:[ID], addSamples:[ID], addObservationUnits:[ID] , skipAssociationsExistenceChecks:Boolean = false): trial!
    updateTrial(trialDbId: ID!, active: Boolean, additionalInfo_IDs: [String], commonCropName: String, contacts_IDs: [String], datasetAuthorships_IDs: [String], documentationURL: String, endDate: String, externalReferences_IDs: [String], program_ID: String, studies_IDs: [String], publications_IDs: [String], startDate: String, trialDescription: String, trialName: String, trialPUI: String, plates_IDs: [String], samples_IDs: [String], observationUnits_IDs: [String] , addProgram:ID, removeProgram:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addContacts:[ID], removeContacts:[ID] , addDatasetAuthorships:[ID], removeDatasetAuthorships:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addStudies:[ID], removeStudies:[ID] , addPublications:[ID], removePublications:[ID] , addPlates:[ID], removePlates:[ID] , addSamples:[ID], removeSamples:[ID] , addObservationUnits:[ID], removeObservationUnits:[ID]  , skipAssociationsExistenceChecks:Boolean = false): trial!
    deleteTrial(trialDbId: ID!): String!
      }
`;