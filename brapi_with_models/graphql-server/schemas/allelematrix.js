module.exports = `
  type allelematrix{
    """
    @original-field
    """
    alleleMatrixDbId: ID
    """
    @original-field
    
    """
    callSets_IDs: [String]

    """
    @original-field
    
    """
    dataMatrices_IDs: [String]

    """
    @original-field
    Should homozygotes be expanded (true) or collapsed into a single occurrence (false)
    """
    expandHomozygotes: Boolean

    """
    @original-field
    
    """
    pagination_IDs: [String]

    """
    @original-field
    The string used as a separator for phased allele calls.
    """
    sepPhased: String

    """
    @original-field
    The string used as a separator for unphased allele calls.
    """
    sepUnphased: String

    """
    @original-field
    The string used as a representation for missing data.
    """
    unknownString: String

    """
    @original-field
    
    """
    variantSets_IDs: [String]

    """
    @original-field
    
    """
    variants_IDs: [String]

      
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
    dataMatricesFilter(search: searchDatamatrixInput, order: [ orderDatamatrixInput ], pagination: paginationInput!): [datamatrix]


    """
    @search-request
    """
    dataMatricesConnection(search: searchDatamatrixInput, order: [ orderDatamatrixInput ], pagination: paginationCursorInput!): DatamatrixConnection

    """
    @count-request
    """
    countFilteredDataMatrices(search: searchDatamatrixInput) : Int
  
    """
    @search-request
    """
    paginationFilter(search: searchPaginationInput, order: [ orderPaginationInput ], pagination: paginationInput!): [pagination]


    """
    @search-request
    """
    paginationConnection(search: searchPaginationInput, order: [ orderPaginationInput ], pagination: paginationCursorInput!): PaginationConnection

    """
    @count-request
    """
    countFilteredPagination(search: searchPaginationInput) : Int
  
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
type AllelematrixConnection{
  edges: [AllelematrixEdge]
  allelematrices: [allelematrix]
  pageInfo: pageInfo!
}

type AllelematrixEdge{
  cursor: String!
  node: allelematrix!
}

  enum allelematrixField {
    alleleMatrixDbId
    callSets_IDs
    dataMatrices_IDs
    expandHomozygotes
    pagination_IDs
    sepPhased
    sepUnphased
    unknownString
    variantSets_IDs
    variants_IDs
  }
  
  input searchAllelematrixInput {
    field: allelematrixField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchAllelematrixInput]
  }

  input orderAllelematrixInput{
    field: allelematrixField
    order: Order
  }



  type Query {
    allelematrices(search: searchAllelematrixInput, order: [ orderAllelematrixInput ], pagination: paginationInput! ): [allelematrix]
    readOneAllelematrix(alleleMatrixDbId: ID!): allelematrix
    countAllelematrices(search: searchAllelematrixInput ): Int
    csvTableTemplateAllelematrix: [String]
    allelematricesConnection(search:searchAllelematrixInput, order: [ orderAllelematrixInput ], pagination: paginationCursorInput! ): AllelematrixConnection
    validateAllelematrixForCreation(alleleMatrixDbId: ID!, dataMatrices_IDs: [String], expandHomozygotes: Boolean, pagination_IDs: [String], sepPhased: String, sepUnphased: String, unknownString: String   , addCallSets:[ID], addDataMatrices:[ID], addPagination:[ID], addVariantSets:[ID], addVariants:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateAllelematrixForUpdating(alleleMatrixDbId: ID!, dataMatrices_IDs: [String], expandHomozygotes: Boolean, pagination_IDs: [String], sepPhased: String, sepUnphased: String, unknownString: String   , addCallSets:[ID], removeCallSets:[ID] , addDataMatrices:[ID], removeDataMatrices:[ID] , addPagination:[ID], removePagination:[ID] , addVariantSets:[ID], removeVariantSets:[ID] , addVariants:[ID], removeVariants:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateAllelematrixForDeletion(alleleMatrixDbId: ID!): Boolean!
    validateAllelematrixAfterReading(alleleMatrixDbId: ID!): Boolean!
    """
    allelematricesZendroDefinition would return the static Zendro data model definition
    """
    allelematricesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addAllelematrix(alleleMatrixDbId: ID!, dataMatrices_IDs: [String], expandHomozygotes: Boolean, pagination_IDs: [String], sepPhased: String, sepUnphased: String, unknownString: String   , addCallSets:[ID], addDataMatrices:[ID], addPagination:[ID], addVariantSets:[ID], addVariants:[ID] , skipAssociationsExistenceChecks:Boolean = false): allelematrix!
    updateAllelematrix(alleleMatrixDbId: ID!, dataMatrices_IDs: [String], expandHomozygotes: Boolean, pagination_IDs: [String], sepPhased: String, sepUnphased: String, unknownString: String   , addCallSets:[ID], removeCallSets:[ID] , addDataMatrices:[ID], removeDataMatrices:[ID] , addPagination:[ID], removePagination:[ID] , addVariantSets:[ID], removeVariantSets:[ID] , addVariants:[ID], removeVariants:[ID]  , skipAssociationsExistenceChecks:Boolean = false): allelematrix!
    deleteAllelematrix(alleleMatrixDbId: ID!): String!
      }
`;