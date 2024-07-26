module.exports = `
  type callset{
    """
    @original-field
    """
    callSetDbId: ID
    """
    @original-field
    
    """
    additionalInfo_IDs: [String]

    """
    @original-field
    
    """
    alleleMatrices_IDs: [String]

    """
    @original-field
    
    """
    calls_IDs: [String]

    """
    @original-field
    The human readable name which identifies a germplasm within the given database server
    """
    callSetName: String

    """
    @original-field
    The date this call set was created
    """
    created: String

    """
    @original-field
    
    """
    externalReferences_IDs: [String]

    """
    @original-field
    
    """
    sample_ID: String

    """
    @original-field
    
    """
    study_ID: String

    """
    @original-field
    The time at which this call set was last updated
    """
    updated: String

    """
    @original-field
    
    """
    variantSets_IDs: [String]

    sample(search: searchSampleInput): sample
  study(search: searchStudyInput): study
    
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
    alleleMatricesFilter(search: searchAllelematrixInput, order: [ orderAllelematrixInput ], pagination: paginationInput!): [allelematrix]


    """
    @search-request
    """
    alleleMatricesConnection(search: searchAllelematrixInput, order: [ orderAllelematrixInput ], pagination: paginationCursorInput!): AllelematrixConnection

    """
    @count-request
    """
    countFilteredAlleleMatrices(search: searchAllelematrixInput) : Int
  
    """
    @search-request
    """
    callsFilter(search: searchCallInput, order: [ orderCallInput ], pagination: paginationInput!): [call]


    """
    @search-request
    """
    callsConnection(search: searchCallInput, order: [ orderCallInput ], pagination: paginationCursorInput!): CallConnection

    """
    @count-request
    """
    countFilteredCalls(search: searchCallInput) : Int
  
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
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type CallsetConnection{
  edges: [CallsetEdge]
  callsets: [callset]
  pageInfo: pageInfo!
}

type CallsetEdge{
  cursor: String!
  node: callset!
}

  enum callsetField {
    callSetDbId
    additionalInfo_IDs
    alleleMatrices_IDs
    calls_IDs
    callSetName
    created
    externalReferences_IDs
    sample_ID
    study_ID
    updated
    variantSets_IDs
  }
  
  input searchCallsetInput {
    field: callsetField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchCallsetInput]
  }

  input orderCallsetInput{
    field: callsetField
    order: Order
  }



  type Query {
    callsets(search: searchCallsetInput, order: [ orderCallsetInput ], pagination: paginationInput! ): [callset]
    readOneCallset(callSetDbId: ID!): callset
    countCallsets(search: searchCallsetInput ): Int
    csvTableTemplateCallset: [String]
    callsetsConnection(search:searchCallsetInput, order: [ orderCallsetInput ], pagination: paginationCursorInput! ): CallsetConnection
    validateCallsetForCreation(callSetDbId: ID!, additionalInfo_IDs: [String], calls_IDs: [String], callSetName: String, created: String, externalReferences_IDs: [String], sample_ID: String, study_ID: String, updated: String , addSample:ID, addStudy:ID  , addAdditionalInfo:[ID], addAlleleMatrices:[ID], addCalls:[ID], addExternalReferences:[ID], addVariantSets:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateCallsetForUpdating(callSetDbId: ID!, additionalInfo_IDs: [String], calls_IDs: [String], callSetName: String, created: String, externalReferences_IDs: [String], sample_ID: String, study_ID: String, updated: String , addSample:ID, removeSample:ID , addStudy:ID, removeStudy:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addAlleleMatrices:[ID], removeAlleleMatrices:[ID] , addCalls:[ID], removeCalls:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addVariantSets:[ID], removeVariantSets:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateCallsetForDeletion(callSetDbId: ID!): Boolean!
    validateCallsetAfterReading(callSetDbId: ID!): Boolean!
    """
    callsetsZendroDefinition would return the static Zendro data model definition
    """
    callsetsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addCallset(callSetDbId: ID!, additionalInfo_IDs: [String], calls_IDs: [String], callSetName: String, created: String, externalReferences_IDs: [String], sample_ID: String, study_ID: String, updated: String , addSample:ID, addStudy:ID  , addAdditionalInfo:[ID], addAlleleMatrices:[ID], addCalls:[ID], addExternalReferences:[ID], addVariantSets:[ID] , skipAssociationsExistenceChecks:Boolean = false): callset!
    updateCallset(callSetDbId: ID!, additionalInfo_IDs: [String], calls_IDs: [String], callSetName: String, created: String, externalReferences_IDs: [String], sample_ID: String, study_ID: String, updated: String , addSample:ID, removeSample:ID , addStudy:ID, removeStudy:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addAlleleMatrices:[ID], removeAlleleMatrices:[ID] , addCalls:[ID], removeCalls:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addVariantSets:[ID], removeVariantSets:[ID]  , skipAssociationsExistenceChecks:Boolean = false): callset!
    deleteCallset(callSetDbId: ID!): String!
      }
`;