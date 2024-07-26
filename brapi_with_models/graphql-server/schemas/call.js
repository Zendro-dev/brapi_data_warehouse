module.exports = `
  type call{
    """
    @original-field
    """
    callDbId: ID
    """
    @original-field
    
    """
    additionalInfo_IDs: [String]

    """
    @original-field
    
    """
    callSet_ID: String

    """
    @original-field
    
    """
    genotypeMetadata_IDs: [String]

    """
    @original-field
    The value of this genotype call
    """
    genotypeValue: String

    """
    @original-field
    If this field is populated, this variant call&#39;s genotype ordering implies the phase of the bases and 
is consistent with any other variant calls on the same contig which have the same phase set string.
    """
    phaseSet: String

    """
    @original-field
    
    """
    variant_ID: String

    """
    @original-field
    
    """
    variantSet_ID: String

    callSet(search: searchCallsetInput): callset
  variant(search: searchVariantInput): variant
  variantSet(search: searchVariantsetInput): variantset
    
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
    genotypeMetadataFilter(search: searchGenotypemetadataInput, order: [ orderGenotypemetadataInput ], pagination: paginationInput!): [genotypemetadata]


    """
    @search-request
    """
    genotypeMetadataConnection(search: searchGenotypemetadataInput, order: [ orderGenotypemetadataInput ], pagination: paginationCursorInput!): GenotypemetadataConnection

    """
    @count-request
    """
    countFilteredGenotypeMetadata(search: searchGenotypemetadataInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type CallConnection{
  edges: [CallEdge]
  calls: [call]
  pageInfo: pageInfo!
}

type CallEdge{
  cursor: String!
  node: call!
}

  enum callField {
    callDbId
    additionalInfo_IDs
    callSet_ID
    genotypeMetadata_IDs
    genotypeValue
    phaseSet
    variant_ID
    variantSet_ID
  }
  
  input searchCallInput {
    field: callField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchCallInput]
  }

  input orderCallInput{
    field: callField
    order: Order
  }



  type Query {
    calls(search: searchCallInput, order: [ orderCallInput ], pagination: paginationInput! ): [call]
    readOneCall(callDbId: ID!): call
    countCalls(search: searchCallInput ): Int
    csvTableTemplateCall: [String]
    callsConnection(search:searchCallInput, order: [ orderCallInput ], pagination: paginationCursorInput! ): CallConnection
    validateCallForCreation(callDbId: ID!, additionalInfo_IDs: [String], callSet_ID: String, genotypeMetadata_IDs: [String], genotypeValue: String, phaseSet: String, variant_ID: String, variantSet_ID: String , addCallSet:ID, addVariant:ID, addVariantSet:ID  , addAdditionalInfo:[ID], addGenotypeMetadata:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateCallForUpdating(callDbId: ID!, additionalInfo_IDs: [String], callSet_ID: String, genotypeMetadata_IDs: [String], genotypeValue: String, phaseSet: String, variant_ID: String, variantSet_ID: String , addCallSet:ID, removeCallSet:ID , addVariant:ID, removeVariant:ID , addVariantSet:ID, removeVariantSet:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addGenotypeMetadata:[ID], removeGenotypeMetadata:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateCallForDeletion(callDbId: ID!): Boolean!
    validateCallAfterReading(callDbId: ID!): Boolean!
    """
    callsZendroDefinition would return the static Zendro data model definition
    """
    callsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addCall(callDbId: ID!, additionalInfo_IDs: [String], callSet_ID: String, genotypeMetadata_IDs: [String], genotypeValue: String, phaseSet: String, variant_ID: String, variantSet_ID: String , addCallSet:ID, addVariant:ID, addVariantSet:ID  , addAdditionalInfo:[ID], addGenotypeMetadata:[ID] , skipAssociationsExistenceChecks:Boolean = false): call!
    updateCall(callDbId: ID!, additionalInfo_IDs: [String], callSet_ID: String, genotypeMetadata_IDs: [String], genotypeValue: String, phaseSet: String, variant_ID: String, variantSet_ID: String , addCallSet:ID, removeCallSet:ID , addVariant:ID, removeVariant:ID , addVariantSet:ID, removeVariantSet:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addGenotypeMetadata:[ID], removeGenotypeMetadata:[ID]  , skipAssociationsExistenceChecks:Boolean = false): call!
    deleteCall(callDbId: ID!): String!
      }
`;