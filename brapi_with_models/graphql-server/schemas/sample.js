module.exports = `
  type sample{
    """
    @original-field
    """
    sampleDbId: ID
    """
    @original-field
    
    """
    additionalInfo_IDs: [String]

    """
    @original-field
    
    """
    callSets_IDs: [String]

    """
    @original-field
    The Column identifier for this \`Sample\` location in the \`Plate\`
    """
    column: Int

    """
    @original-field
    
    """
    externalReferences_IDs: [String]

    """
    @original-field
    
    """
    germplasm_ID: String

    """
    @original-field
    
    """
    observationUnit_ID: String

    """
    @original-field
    
    """
    plate_ID: String

    """
    @original-field
    
    """
    program_ID: String

    """
    @original-field
    The Row identifier for this \`Sample\` location in the \`Plate\`
    """
    row: String

    """
    @original-field
    A unique identifier physically attached to the \`Sample\`
    """
    sampleBarcode: String

    """
    @original-field
    Description of a \`Sample\`
&lt;br&gt;MIAPPE V1.1 (DM-79) Sample description - Any information not captured by the other sample fields, including quantification, sample treatments and processing.
    """
    sampleDescription: String

    """
    @original-field
    The ID which uniquely identifies a group of \`Samples\`
    """
    sampleGroupId: String

    """
    @original-field
    The human readable name of the \`Sample\`
    """
    sampleName: String

    """
    @original-field
    A permanent unique identifier for the \`Sample\` (DOI, URL, UUID, etc)
&lt;br&gt; MIAPPE V1.1 (DM-81) External ID - An identifier for the sample in a persistent repository, comprising the name of the repository and the accession number of the observation unit therein. Submission to the EBI Biosamples repository is recommended. URI are recommended when possible. 
    """
    samplePUI: String

    """
    @original-field
    The date and time a \`Sample\` was collected from the field
&lt;br&gt; MIAPPE V1.1 (DM-80) Collection date - The date and time when the sample was collected / harvested
    """
    sampleTimestamp: String

    """
    @original-field
    The type of \`Sample\` taken. ex. &#39;DNA&#39;, &#39;RNA&#39;, &#39;Tissue&#39;, etc
    """
    sampleType: String

    """
    @original-field
    
    """
    study_ID: String

    """
    @original-field
    The name or identifier of the entity which took the \`Sample\` from the field
    """
    takenBy: String

    """
    @original-field
    The type of tissue sampled. ex. &#39;Leaf&#39;, &#39;Root&#39;, etc.
&lt;br&gt; MIAPPE V1.1 (DM-78) Plant anatomical entity - A description of  the plant part (e.g. leaf) or the plant product (e.g. resin) from which the sample was taken, in the form of an accession number to a suitable controlled vocabulary (Plant Ontology).
    """
    tissueType: String

    """
    @original-field
    
    """
    trial_ID: String

    """
    @original-field
    The Well identifier for this \`Sample\` location in the \`Plate\`. Usually a concatenation of Row and Column, or just a number if the \`Samples\` are not part of an ordered \`Plate\`.
    """
    well: String

    germplasm(search: searchGermplasmInput): germplasm
  observationUnit(search: searchObservationunitInput): observationunit
  plate(search: searchPlateInput): plate
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
type SampleConnection{
  edges: [SampleEdge]
  samples: [sample]
  pageInfo: pageInfo!
}

type SampleEdge{
  cursor: String!
  node: sample!
}

  enum sampleField {
    sampleDbId
    additionalInfo_IDs
    callSets_IDs
    column
    externalReferences_IDs
    germplasm_ID
    observationUnit_ID
    plate_ID
    program_ID
    row
    sampleBarcode
    sampleDescription
    sampleGroupId
    sampleName
    samplePUI
    sampleTimestamp
    sampleType
    study_ID
    takenBy
    tissueType
    trial_ID
    well
  }
  
  input searchSampleInput {
    field: sampleField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchSampleInput]
  }

  input orderSampleInput{
    field: sampleField
    order: Order
  }



  type Query {
    samples(search: searchSampleInput, order: [ orderSampleInput ], pagination: paginationInput! ): [sample]
    readOneSample(sampleDbId: ID!): sample
    countSamples(search: searchSampleInput ): Int
    csvTableTemplateSample: [String]
    samplesConnection(search:searchSampleInput, order: [ orderSampleInput ], pagination: paginationCursorInput! ): SampleConnection
    validateSampleForCreation(sampleDbId: ID!, additionalInfo_IDs: [String], callSets_IDs: [String], column: Int, externalReferences_IDs: [String], germplasm_ID: String, observationUnit_ID: String, plate_ID: String, program_ID: String, row: String, sampleBarcode: String, sampleDescription: String, sampleGroupId: String, sampleName: String, samplePUI: String, sampleTimestamp: String, sampleType: String, study_ID: String, takenBy: String, tissueType: String, trial_ID: String, well: String , addGermplasm:ID, addObservationUnit:ID, addPlate:ID, addProgram:ID, addStudy:ID, addTrial:ID  , addAdditionalInfo:[ID], addCallSets:[ID], addExternalReferences:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateSampleForUpdating(sampleDbId: ID!, additionalInfo_IDs: [String], callSets_IDs: [String], column: Int, externalReferences_IDs: [String], germplasm_ID: String, observationUnit_ID: String, plate_ID: String, program_ID: String, row: String, sampleBarcode: String, sampleDescription: String, sampleGroupId: String, sampleName: String, samplePUI: String, sampleTimestamp: String, sampleType: String, study_ID: String, takenBy: String, tissueType: String, trial_ID: String, well: String , addGermplasm:ID, removeGermplasm:ID , addObservationUnit:ID, removeObservationUnit:ID , addPlate:ID, removePlate:ID , addProgram:ID, removeProgram:ID , addStudy:ID, removeStudy:ID , addTrial:ID, removeTrial:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addCallSets:[ID], removeCallSets:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateSampleForDeletion(sampleDbId: ID!): Boolean!
    validateSampleAfterReading(sampleDbId: ID!): Boolean!
    """
    samplesZendroDefinition would return the static Zendro data model definition
    """
    samplesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addSample(sampleDbId: ID!, additionalInfo_IDs: [String], callSets_IDs: [String], column: Int, externalReferences_IDs: [String], germplasm_ID: String, observationUnit_ID: String, plate_ID: String, program_ID: String, row: String, sampleBarcode: String, sampleDescription: String, sampleGroupId: String, sampleName: String, samplePUI: String, sampleTimestamp: String, sampleType: String, study_ID: String, takenBy: String, tissueType: String, trial_ID: String, well: String , addGermplasm:ID, addObservationUnit:ID, addPlate:ID, addProgram:ID, addStudy:ID, addTrial:ID  , addAdditionalInfo:[ID], addCallSets:[ID], addExternalReferences:[ID] , skipAssociationsExistenceChecks:Boolean = false): sample!
    updateSample(sampleDbId: ID!, additionalInfo_IDs: [String], callSets_IDs: [String], column: Int, externalReferences_IDs: [String], germplasm_ID: String, observationUnit_ID: String, plate_ID: String, program_ID: String, row: String, sampleBarcode: String, sampleDescription: String, sampleGroupId: String, sampleName: String, samplePUI: String, sampleTimestamp: String, sampleType: String, study_ID: String, takenBy: String, tissueType: String, trial_ID: String, well: String , addGermplasm:ID, removeGermplasm:ID , addObservationUnit:ID, removeObservationUnit:ID , addPlate:ID, removePlate:ID , addProgram:ID, removeProgram:ID , addStudy:ID, removeStudy:ID , addTrial:ID, removeTrial:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addCallSets:[ID], removeCallSets:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID]  , skipAssociationsExistenceChecks:Boolean = false): sample!
    deleteSample(sampleDbId: ID!): String!
      }
`;