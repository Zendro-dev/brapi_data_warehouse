module.exports = `
  type program{
    """
    @original-field
    """
    programDbId: ID
    """
    @original-field
    A shortened version of the human readable name for a Program
    """
    abbreviation: String

    """
    @original-field
    
    """
    additionalInfo_IDs: [String]

    """
    @original-field
    Common name for the crop which this program is for
    """
    commonCropName: String

    """
    @original-field
    A URL to the human readable documentation of an object
    """
    documentationURL: String

    """
    @original-field
    
    """
    externalReferences_IDs: [String]

    """
    @original-field
    Information describing the grant or funding source for this program
    """
    fundingInformation: String

    """
    @original-field
    
    """
    leadPerson_ID: String

    """
    @original-field
    The primary objective of the program
    """
    objective: String

    """
    @original-field
    Human readable name of the program
    """
    programName: String

    """
    @original-field
    The type of program entity this object represents
&lt;br/&gt; &#39;STANDARD&#39; represents a standard, permenant breeding program
&lt;br/&gt; &#39;PROJECT&#39; represents a short term project, usually with a set time limit based on funding   
    """
    programType: String

    """
    @original-field
    
    """
    trials_IDs: [String]

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
    crossingProjects_IDs: [String]

    """
    @original-field
    
    """
    seedLots_IDs: [String]

    """
    @original-field
    
    """
    observationUnits_IDs: [String]

    leadPerson(search: searchPersonInput): person
    
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
    trialsFilter(search: searchTrialInput, order: [ orderTrialInput ], pagination: paginationInput!): [trial]


    """
    @search-request
    """
    trialsConnection(search: searchTrialInput, order: [ orderTrialInput ], pagination: paginationCursorInput!): TrialConnection

    """
    @count-request
    """
    countFilteredTrials(search: searchTrialInput) : Int
  
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
    crossingProjectsFilter(search: searchCrossingprojectInput, order: [ orderCrossingprojectInput ], pagination: paginationInput!): [crossingproject]


    """
    @search-request
    """
    crossingProjectsConnection(search: searchCrossingprojectInput, order: [ orderCrossingprojectInput ], pagination: paginationCursorInput!): CrossingprojectConnection

    """
    @count-request
    """
    countFilteredCrossingProjects(search: searchCrossingprojectInput) : Int
  
    """
    @search-request
    """
    seedLotsFilter(search: searchSeedlotInput, order: [ orderSeedlotInput ], pagination: paginationInput!): [seedlot]


    """
    @search-request
    """
    seedLotsConnection(search: searchSeedlotInput, order: [ orderSeedlotInput ], pagination: paginationCursorInput!): SeedlotConnection

    """
    @count-request
    """
    countFilteredSeedLots(search: searchSeedlotInput) : Int
  
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
type ProgramConnection{
  edges: [ProgramEdge]
  programs: [program]
  pageInfo: pageInfo!
}

type ProgramEdge{
  cursor: String!
  node: program!
}

  enum programField {
    programDbId
    abbreviation
    additionalInfo_IDs
    commonCropName
    documentationURL
    externalReferences_IDs
    fundingInformation
    leadPerson_ID
    objective
    programName
    programType
    trials_IDs
    plates_IDs
    samples_IDs
    crossingProjects_IDs
    seedLots_IDs
    observationUnits_IDs
  }
  
  input searchProgramInput {
    field: programField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchProgramInput]
  }

  input orderProgramInput{
    field: programField
    order: Order
  }



  type Query {
    programs(search: searchProgramInput, order: [ orderProgramInput ], pagination: paginationInput! ): [program]
    readOneProgram(programDbId: ID!): program
    countPrograms(search: searchProgramInput ): Int
    csvTableTemplateProgram: [String]
    programsConnection(search:searchProgramInput, order: [ orderProgramInput ], pagination: paginationCursorInput! ): ProgramConnection
    validateProgramForCreation(programDbId: ID!, abbreviation: String, additionalInfo_IDs: [String], commonCropName: String, documentationURL: String, externalReferences_IDs: [String], fundingInformation: String, leadPerson_ID: String, objective: String, programName: String, programType: String, trials_IDs: [String], plates_IDs: [String], samples_IDs: [String], crossingProjects_IDs: [String], seedLots_IDs: [String], observationUnits_IDs: [String] , addLeadPerson:ID  , addAdditionalInfo:[ID], addExternalReferences:[ID], addTrials:[ID], addPlates:[ID], addSamples:[ID], addCrossingProjects:[ID], addSeedLots:[ID], addObservationUnits:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateProgramForUpdating(programDbId: ID!, abbreviation: String, additionalInfo_IDs: [String], commonCropName: String, documentationURL: String, externalReferences_IDs: [String], fundingInformation: String, leadPerson_ID: String, objective: String, programName: String, programType: String, trials_IDs: [String], plates_IDs: [String], samples_IDs: [String], crossingProjects_IDs: [String], seedLots_IDs: [String], observationUnits_IDs: [String] , addLeadPerson:ID, removeLeadPerson:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addTrials:[ID], removeTrials:[ID] , addPlates:[ID], removePlates:[ID] , addSamples:[ID], removeSamples:[ID] , addCrossingProjects:[ID], removeCrossingProjects:[ID] , addSeedLots:[ID], removeSeedLots:[ID] , addObservationUnits:[ID], removeObservationUnits:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateProgramForDeletion(programDbId: ID!): Boolean!
    validateProgramAfterReading(programDbId: ID!): Boolean!
    """
    programsZendroDefinition would return the static Zendro data model definition
    """
    programsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addProgram(programDbId: ID!, abbreviation: String, additionalInfo_IDs: [String], commonCropName: String, documentationURL: String, externalReferences_IDs: [String], fundingInformation: String, leadPerson_ID: String, objective: String, programName: String, programType: String, trials_IDs: [String], plates_IDs: [String], samples_IDs: [String], crossingProjects_IDs: [String], seedLots_IDs: [String], observationUnits_IDs: [String] , addLeadPerson:ID  , addAdditionalInfo:[ID], addExternalReferences:[ID], addTrials:[ID], addPlates:[ID], addSamples:[ID], addCrossingProjects:[ID], addSeedLots:[ID], addObservationUnits:[ID] , skipAssociationsExistenceChecks:Boolean = false): program!
    updateProgram(programDbId: ID!, abbreviation: String, additionalInfo_IDs: [String], commonCropName: String, documentationURL: String, externalReferences_IDs: [String], fundingInformation: String, leadPerson_ID: String, objective: String, programName: String, programType: String, trials_IDs: [String], plates_IDs: [String], samples_IDs: [String], crossingProjects_IDs: [String], seedLots_IDs: [String], observationUnits_IDs: [String] , addLeadPerson:ID, removeLeadPerson:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addTrials:[ID], removeTrials:[ID] , addPlates:[ID], removePlates:[ID] , addSamples:[ID], removeSamples:[ID] , addCrossingProjects:[ID], removeCrossingProjects:[ID] , addSeedLots:[ID], removeSeedLots:[ID] , addObservationUnits:[ID], removeObservationUnits:[ID]  , skipAssociationsExistenceChecks:Boolean = false): program!
    deleteProgram(programDbId: ID!): String!
      }
`;