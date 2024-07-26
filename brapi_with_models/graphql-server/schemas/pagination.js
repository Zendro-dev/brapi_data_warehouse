module.exports = `
  type pagination{
    """
    @original-field
    """
    paginationDbId: ID
    """
    @original-field
    The dimension of the matrix being paginated
    """
    dimension: String

    """
    @original-field
    the requested page number (zero indexed)
    """
    page: Int

    """
    @original-field
    the maximum number of elements per page in this dimension of the matrix
    """
    pageSize: Int

    """
    @original-field
    The total number of elements that are available on the server and match the requested query parameters.
    """
    totalCount: Int

    """
    @original-field
    The total number of pages of elements available on the server. This should be calculated with the following formula. 
&lt;br/&gt;totalPages = CEILING( totalCount / requested_page_size)
    """
    totalPages: Int

    """
    @original-field
    
    """
    alleleMatrices_ID: String

    alleleMatrices(search: searchAllelematrixInput): allelematrix
    
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type PaginationConnection{
  edges: [PaginationEdge]
  paginations: [pagination]
  pageInfo: pageInfo!
}

type PaginationEdge{
  cursor: String!
  node: pagination!
}

  enum paginationField {
    paginationDbId
    dimension
    page
    pageSize
    totalCount
    totalPages
    alleleMatrices_ID
  }
  
  input searchPaginationInput {
    field: paginationField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchPaginationInput]
  }

  input orderPaginationInput{
    field: paginationField
    order: Order
  }



  type Query {
    paginations(search: searchPaginationInput, order: [ orderPaginationInput ], pagination: paginationInput! ): [pagination]
    readOnePagination(paginationDbId: ID!): pagination
    countPaginations(search: searchPaginationInput ): Int
    csvTableTemplatePagination: [String]
    paginationsConnection(search:searchPaginationInput, order: [ orderPaginationInput ], pagination: paginationCursorInput! ): PaginationConnection
    validatePaginationForCreation(paginationDbId: ID!, dimension: String, page: Int, pageSize: Int, totalCount: Int, totalPages: Int, alleleMatrices_ID: String , addAlleleMatrices:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validatePaginationForUpdating(paginationDbId: ID!, dimension: String, page: Int, pageSize: Int, totalCount: Int, totalPages: Int, alleleMatrices_ID: String , addAlleleMatrices:ID, removeAlleleMatrices:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validatePaginationForDeletion(paginationDbId: ID!): Boolean!
    validatePaginationAfterReading(paginationDbId: ID!): Boolean!
    """
    paginationsZendroDefinition would return the static Zendro data model definition
    """
    paginationsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addPagination(paginationDbId: ID!, dimension: String, page: Int, pageSize: Int, totalCount: Int, totalPages: Int, alleleMatrices_ID: String , addAlleleMatrices:ID   , skipAssociationsExistenceChecks:Boolean = false): pagination!
    updatePagination(paginationDbId: ID!, dimension: String, page: Int, pageSize: Int, totalCount: Int, totalPages: Int, alleleMatrices_ID: String , addAlleleMatrices:ID, removeAlleleMatrices:ID    , skipAssociationsExistenceChecks:Boolean = false): pagination!
    deletePagination(paginationDbId: ID!): String!
      }
`;