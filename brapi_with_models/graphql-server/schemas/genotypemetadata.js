module.exports = `
  type genotypemetadata{
    """
    @original-field
    """
    genotypeMetadataDbId: ID
    """
    @original-field
    The type of field represented in this Genotype Field. This is intended to help parse the data out of JSON.
    """
    dataType: String

    """
    @original-field
    The abbreviated code of the field represented in this Genotype Field. These codes should match the VCF standard when possible. Examples include: &#34;GQ&#34;, &#34;RD&#34;, and &#34;HQ&#34;
&lt;br&gt; This maps to a FORMAT field in the VCF file standard.
    """
    fieldAbbreviation: String

    """
    @original-field
    The name of the field represented in this Genotype Field. Examples include: &#34;Genotype Quality&#34;, &#34;Read Depth&#34;, and &#34;Haplotype Quality&#34;
&lt;br&gt; This maps to a FORMAT field in the VCF file standard.
    """
    fieldName: String

    """
    @original-field
    The additional metadata value associated with this genotype call
    """
    fieldValue: String

    """
    @original-field
    
    """
    call_ID: String

    call(search: searchCallInput): call
    
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type GenotypemetadataConnection{
  edges: [GenotypemetadataEdge]
  genotypemetadata: [genotypemetadata]
  pageInfo: pageInfo!
}

type GenotypemetadataEdge{
  cursor: String!
  node: genotypemetadata!
}

  enum genotypemetadataField {
    genotypeMetadataDbId
    dataType
    fieldAbbreviation
    fieldName
    fieldValue
    call_ID
  }
  
  input searchGenotypemetadataInput {
    field: genotypemetadataField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchGenotypemetadataInput]
  }

  input orderGenotypemetadataInput{
    field: genotypemetadataField
    order: Order
  }



  type Query {
    genotypemetadata(search: searchGenotypemetadataInput, order: [ orderGenotypemetadataInput ], pagination: paginationInput! ): [genotypemetadata]
    readOneGenotypemetadata(genotypeMetadataDbId: ID!): genotypemetadata
    countGenotypemetadata(search: searchGenotypemetadataInput ): Int
    csvTableTemplateGenotypemetadata: [String]
    genotypemetadataConnection(search:searchGenotypemetadataInput, order: [ orderGenotypemetadataInput ], pagination: paginationCursorInput! ): GenotypemetadataConnection
    validateGenotypemetadataForCreation(genotypeMetadataDbId: ID!, dataType: String, fieldAbbreviation: String, fieldName: String, fieldValue: String, call_ID: String , addCall:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateGenotypemetadataForUpdating(genotypeMetadataDbId: ID!, dataType: String, fieldAbbreviation: String, fieldName: String, fieldValue: String, call_ID: String , addCall:ID, removeCall:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateGenotypemetadataForDeletion(genotypeMetadataDbId: ID!): Boolean!
    validateGenotypemetadataAfterReading(genotypeMetadataDbId: ID!): Boolean!
    """
    genotypemetadataZendroDefinition would return the static Zendro data model definition
    """
    genotypemetadataZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addGenotypemetadata(genotypeMetadataDbId: ID!, dataType: String, fieldAbbreviation: String, fieldName: String, fieldValue: String, call_ID: String , addCall:ID   , skipAssociationsExistenceChecks:Boolean = false): genotypemetadata!
    updateGenotypemetadata(genotypeMetadataDbId: ID!, dataType: String, fieldAbbreviation: String, fieldName: String, fieldValue: String, call_ID: String , addCall:ID, removeCall:ID    , skipAssociationsExistenceChecks:Boolean = false): genotypemetadata!
    deleteGenotypemetadata(genotypeMetadataDbId: ID!): String!
      }
`;