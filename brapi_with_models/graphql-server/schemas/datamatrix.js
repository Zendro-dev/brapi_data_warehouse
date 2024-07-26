module.exports = `
  type datamatrix{
    """
    @original-field
    """
    dataMatrixDbId: ID
    """
    @original-field
    The two dimensional array of data, providing the allele matrix or an additional layer of metadata associated with each genotype value. Each matrix should be the same size and orientation, aligned with the &#34;callSetDbIds&#34; as columns and the &#34;variantDbIds&#34; as rows.
    """
    dataMatrix: [String]

    """
    @original-field
    The abbreviated code of the field represented in this data matrix. These codes should match the VCF standard when possible and the key word &#34;GT&#34; is reserved for the allele matrix. Examples of other metadata matrices include: &#34;GQ&#34;, &#34;RD&#34;, and &#34;HQ&#34;
&lt;br&gt; This maps to a FORMAT field in the VCF file standard.
    """
    dataMatrixAbbreviation: String

    """
    @original-field
    The name of the field represented in this data matrix. The key word &#34;Genotype&#34; is reserved for the allele matrix. Examples of other metadata matrices include: &#34;Genotype Quality&#34;, &#34;Read Depth&#34;, and &#34;Haplotype Quality&#34;
&lt;br&gt; This maps to a FORMAT field in the VCF file standard.
    """
    dataMatrixName: String

    """
    @original-field
    The type of field represented in this data matrix. This is intended to help parse the data out of JSON.
    """
    dataType: String

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
type DatamatrixConnection{
  edges: [DatamatrixEdge]
  datamatrices: [datamatrix]
  pageInfo: pageInfo!
}

type DatamatrixEdge{
  cursor: String!
  node: datamatrix!
}

  enum datamatrixField {
    dataMatrixDbId
    dataMatrix
    dataMatrixAbbreviation
    dataMatrixName
    dataType
    alleleMatrices_ID
  }
  
  input searchDatamatrixInput {
    field: datamatrixField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchDatamatrixInput]
  }

  input orderDatamatrixInput{
    field: datamatrixField
    order: Order
  }



  type Query {
    datamatrices(search: searchDatamatrixInput, order: [ orderDatamatrixInput ], pagination: paginationInput! ): [datamatrix]
    readOneDatamatrix(dataMatrixDbId: ID!): datamatrix
    countDatamatrices(search: searchDatamatrixInput ): Int
    csvTableTemplateDatamatrix: [String]
    datamatricesConnection(search:searchDatamatrixInput, order: [ orderDatamatrixInput ], pagination: paginationCursorInput! ): DatamatrixConnection
    validateDatamatrixForCreation(dataMatrixDbId: ID!, dataMatrix: [String], dataMatrixAbbreviation: String, dataMatrixName: String, dataType: String, alleleMatrices_ID: String , addAlleleMatrices:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateDatamatrixForUpdating(dataMatrixDbId: ID!, dataMatrix: [String], dataMatrixAbbreviation: String, dataMatrixName: String, dataType: String, alleleMatrices_ID: String , addAlleleMatrices:ID, removeAlleleMatrices:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateDatamatrixForDeletion(dataMatrixDbId: ID!): Boolean!
    validateDatamatrixAfterReading(dataMatrixDbId: ID!): Boolean!
    """
    datamatricesZendroDefinition would return the static Zendro data model definition
    """
    datamatricesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addDatamatrix(dataMatrixDbId: ID!, dataMatrix: [String], dataMatrixAbbreviation: String, dataMatrixName: String, dataType: String, alleleMatrices_ID: String , addAlleleMatrices:ID   , skipAssociationsExistenceChecks:Boolean = false): datamatrix!
    updateDatamatrix(dataMatrixDbId: ID!, dataMatrix: [String], dataMatrixAbbreviation: String, dataMatrixName: String, dataType: String, alleleMatrices_ID: String , addAlleleMatrices:ID, removeAlleleMatrices:ID    , skipAssociationsExistenceChecks:Boolean = false): datamatrix!
    deleteDatamatrix(dataMatrixDbId: ID!): String!
      }
`;