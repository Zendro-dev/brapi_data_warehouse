module.exports = `
  type plate{
    """
    @original-field
    """
    plateDbId: ID
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
    A unique identifier physically attached to a \`Plate\`
    """
    plateBarcode: String

    """
    @original-field
    Enum for plate formats, usually &#34;PLATE_96&#34; for a 96 well plate or &#34;TUBES&#34; for plateless format
    """
    plateFormat: String

    """
    @original-field
    A human readable name for a \`Plate\`
    """
    plateName: String

    """
    @original-field
    
    """
    program_ID: String

    """
    @original-field
    The type of samples taken. ex. &#39;DNA&#39;, &#39;RNA&#39;, &#39;Tissue&#39;, etc
    """
    sampleType: String

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

    program(search: searchProgramInput): program
  study(search: searchStudyInput): study
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
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type PlateConnection{
  edges: [PlateEdge]
  plates: [plate]
  pageInfo: pageInfo!
}

type PlateEdge{
  cursor: String!
  node: plate!
}

  enum plateField {
    plateDbId
    additionalInfo_IDs
    externalReferences_IDs
    plateBarcode
    plateFormat
    plateName
    program_ID
    sampleType
    study_ID
    trial_ID
    samples_IDs
  }
  
  input searchPlateInput {
    field: plateField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchPlateInput]
  }

  input orderPlateInput{
    field: plateField
    order: Order
  }



  type Query {
    plates(search: searchPlateInput, order: [ orderPlateInput ], pagination: paginationInput! ): [plate]
    readOnePlate(plateDbId: ID!): plate
    countPlates(search: searchPlateInput ): Int
    csvTableTemplatePlate: [String]
    platesConnection(search:searchPlateInput, order: [ orderPlateInput ], pagination: paginationCursorInput! ): PlateConnection
    validatePlateForCreation(plateDbId: ID!, additionalInfo_IDs: [String], externalReferences_IDs: [String], plateBarcode: String, plateFormat: String, plateName: String, program_ID: String, sampleType: String, study_ID: String, trial_ID: String, samples_IDs: [String] , addProgram:ID, addStudy:ID, addTrial:ID  , addAdditionalInfo:[ID], addExternalReferences:[ID], addSamples:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validatePlateForUpdating(plateDbId: ID!, additionalInfo_IDs: [String], externalReferences_IDs: [String], plateBarcode: String, plateFormat: String, plateName: String, program_ID: String, sampleType: String, study_ID: String, trial_ID: String, samples_IDs: [String] , addProgram:ID, removeProgram:ID , addStudy:ID, removeStudy:ID , addTrial:ID, removeTrial:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addSamples:[ID], removeSamples:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validatePlateForDeletion(plateDbId: ID!): Boolean!
    validatePlateAfterReading(plateDbId: ID!): Boolean!
    """
    platesZendroDefinition would return the static Zendro data model definition
    """
    platesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addPlate(plateDbId: ID!, additionalInfo_IDs: [String], externalReferences_IDs: [String], plateBarcode: String, plateFormat: String, plateName: String, program_ID: String, sampleType: String, study_ID: String, trial_ID: String, samples_IDs: [String] , addProgram:ID, addStudy:ID, addTrial:ID  , addAdditionalInfo:[ID], addExternalReferences:[ID], addSamples:[ID] , skipAssociationsExistenceChecks:Boolean = false): plate!
    updatePlate(plateDbId: ID!, additionalInfo_IDs: [String], externalReferences_IDs: [String], plateBarcode: String, plateFormat: String, plateName: String, program_ID: String, sampleType: String, study_ID: String, trial_ID: String, samples_IDs: [String] , addProgram:ID, removeProgram:ID , addStudy:ID, removeStudy:ID , addTrial:ID, removeTrial:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addSamples:[ID], removeSamples:[ID]  , skipAssociationsExistenceChecks:Boolean = false): plate!
    deletePlate(plateDbId: ID!): String!
      }
`;