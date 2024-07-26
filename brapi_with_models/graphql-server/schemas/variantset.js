module.exports = `
  type variantset{
    """
    @original-field
    """
    variantSetDbId: ID
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
    
    """
    callSets_IDs: [String]

    """
    @original-field
    
    """
    analysis_IDs: [String]

    """
    @original-field
    
    """
    availableFormats_IDs: [String]

    """
    @original-field
    The number of CallSets included in this VariantSet
    """
    callSetCount: Int

    """
    @original-field
    
    """
    externalReferences_IDs: [String]

    """
    @original-field
    
    """
    metadataFields_IDs: [String]

    """
    @original-field
    
    """
    referenceSet_ID: String

    """
    @original-field
    
    """
    study_ID: String

    """
    @original-field
    The number of Variants included in this VariantSet
    """
    variantCount: Int

    """
    @original-field
    The human readable name for a VariantSet
    """
    variantSetName: String

    """
    @original-field
    
    """
    variants_IDs: [String]

    referenceSet(search: searchReferencesetInput): referenceset
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
    analysisFilter(search: searchAnalysisInput, order: [ orderAnalysisInput ], pagination: paginationInput!): [analysis]


    """
    @search-request
    """
    analysisConnection(search: searchAnalysisInput, order: [ orderAnalysisInput ], pagination: paginationCursorInput!): AnalysisConnection

    """
    @count-request
    """
    countFilteredAnalysis(search: searchAnalysisInput) : Int
  
    """
    @search-request
    """
    availableFormatsFilter(search: searchAvailableformatInput, order: [ orderAvailableformatInput ], pagination: paginationInput!): [availableformat]


    """
    @search-request
    """
    availableFormatsConnection(search: searchAvailableformatInput, order: [ orderAvailableformatInput ], pagination: paginationCursorInput!): AvailableformatConnection

    """
    @count-request
    """
    countFilteredAvailableFormats(search: searchAvailableformatInput) : Int
  
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
    metadataFieldsFilter(search: searchMetadatafieldInput, order: [ orderMetadatafieldInput ], pagination: paginationInput!): [metadatafield]


    """
    @search-request
    """
    metadataFieldsConnection(search: searchMetadatafieldInput, order: [ orderMetadatafieldInput ], pagination: paginationCursorInput!): MetadatafieldConnection

    """
    @count-request
    """
    countFilteredMetadataFields(search: searchMetadatafieldInput) : Int
  
    """
    @search-request
    """
    variantsFilter(search: searchVariantInput, order: [ orderVariantInput ], pagination: paginationInput!): [variant]


    """
    @search-request
    """
    variantsConnection(search: searchVariantInput, order: [ orderVariantInput ], pagination: paginationCursorInput!): VariantConnection

    """
    @count-request
    """
    countFilteredVariants(search: searchVariantInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type VariantsetConnection{
  edges: [VariantsetEdge]
  variantsets: [variantset]
  pageInfo: pageInfo!
}

type VariantsetEdge{
  cursor: String!
  node: variantset!
}

  enum variantsetField {
    variantSetDbId
    additionalInfo_IDs
    alleleMatrices_IDs
    calls_IDs
    callSets_IDs
    analysis_IDs
    availableFormats_IDs
    callSetCount
    externalReferences_IDs
    metadataFields_IDs
    referenceSet_ID
    study_ID
    variantCount
    variantSetName
    variants_IDs
  }
  
  input searchVariantsetInput {
    field: variantsetField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchVariantsetInput]
  }

  input orderVariantsetInput{
    field: variantsetField
    order: Order
  }



  type Query {
    variantsets(search: searchVariantsetInput, order: [ orderVariantsetInput ], pagination: paginationInput! ): [variantset]
    readOneVariantset(variantSetDbId: ID!): variantset
    countVariantsets(search: searchVariantsetInput ): Int
    csvTableTemplateVariantset: [String]
    variantsetsConnection(search:searchVariantsetInput, order: [ orderVariantsetInput ], pagination: paginationCursorInput! ): VariantsetConnection
    validateVariantsetForCreation(variantSetDbId: ID!, additionalInfo_IDs: [String], calls_IDs: [String], analysis_IDs: [String], availableFormats_IDs: [String], callSetCount: Int, externalReferences_IDs: [String], metadataFields_IDs: [String], referenceSet_ID: String, study_ID: String, variantCount: Int, variantSetName: String, variants_IDs: [String] , addReferenceSet:ID, addStudy:ID  , addAdditionalInfo:[ID], addAlleleMatrices:[ID], addCalls:[ID], addCallSets:[ID], addAnalysis:[ID], addAvailableFormats:[ID], addExternalReferences:[ID], addMetadataFields:[ID], addVariants:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateVariantsetForUpdating(variantSetDbId: ID!, additionalInfo_IDs: [String], calls_IDs: [String], analysis_IDs: [String], availableFormats_IDs: [String], callSetCount: Int, externalReferences_IDs: [String], metadataFields_IDs: [String], referenceSet_ID: String, study_ID: String, variantCount: Int, variantSetName: String, variants_IDs: [String] , addReferenceSet:ID, removeReferenceSet:ID , addStudy:ID, removeStudy:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addAlleleMatrices:[ID], removeAlleleMatrices:[ID] , addCalls:[ID], removeCalls:[ID] , addCallSets:[ID], removeCallSets:[ID] , addAnalysis:[ID], removeAnalysis:[ID] , addAvailableFormats:[ID], removeAvailableFormats:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addMetadataFields:[ID], removeMetadataFields:[ID] , addVariants:[ID], removeVariants:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateVariantsetForDeletion(variantSetDbId: ID!): Boolean!
    validateVariantsetAfterReading(variantSetDbId: ID!): Boolean!
    """
    variantsetsZendroDefinition would return the static Zendro data model definition
    """
    variantsetsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addVariantset(variantSetDbId: ID!, additionalInfo_IDs: [String], calls_IDs: [String], analysis_IDs: [String], availableFormats_IDs: [String], callSetCount: Int, externalReferences_IDs: [String], metadataFields_IDs: [String], referenceSet_ID: String, study_ID: String, variantCount: Int, variantSetName: String, variants_IDs: [String] , addReferenceSet:ID, addStudy:ID  , addAdditionalInfo:[ID], addAlleleMatrices:[ID], addCalls:[ID], addCallSets:[ID], addAnalysis:[ID], addAvailableFormats:[ID], addExternalReferences:[ID], addMetadataFields:[ID], addVariants:[ID] , skipAssociationsExistenceChecks:Boolean = false): variantset!
    updateVariantset(variantSetDbId: ID!, additionalInfo_IDs: [String], calls_IDs: [String], analysis_IDs: [String], availableFormats_IDs: [String], callSetCount: Int, externalReferences_IDs: [String], metadataFields_IDs: [String], referenceSet_ID: String, study_ID: String, variantCount: Int, variantSetName: String, variants_IDs: [String] , addReferenceSet:ID, removeReferenceSet:ID , addStudy:ID, removeStudy:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addAlleleMatrices:[ID], removeAlleleMatrices:[ID] , addCalls:[ID], removeCalls:[ID] , addCallSets:[ID], removeCallSets:[ID] , addAnalysis:[ID], removeAnalysis:[ID] , addAvailableFormats:[ID], removeAvailableFormats:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addMetadataFields:[ID], removeMetadataFields:[ID] , addVariants:[ID], removeVariants:[ID]  , skipAssociationsExistenceChecks:Boolean = false): variantset!
    deleteVariantset(variantSetDbId: ID!): String!
      }
`;