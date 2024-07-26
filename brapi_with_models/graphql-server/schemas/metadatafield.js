module.exports = `
  type metadatafield{
    """
    @original-field
    """
    metadataFieldDbId: ID
    """
    @original-field
    The type of field represented in this Genotype Field. This is intended to help parse the data out of JSON.
    """
    dataType: String

    """
    @original-field
    The abbreviated code of the field represented in this Genotype Field. These codes should match the VCF standard when possible. Examples include: &#34;GQ&#34;, &#34;RD&#34;, and &#34;HQ&#34;
    """
    fieldAbbreviation: String

    """
    @original-field
    The name of the field represented in this Genotype Field. Examples include: &#34;Genotype Quality&#34;, &#34;Read Depth&#34;, and &#34;Haplotype Quality&#34;
    """
    fieldName: String

    """
    @original-field
    
    """
    variantset_ID: String

    variantset(search: searchVariantsetInput): variantset
    
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type MetadatafieldConnection{
  edges: [MetadatafieldEdge]
  metadatafields: [metadatafield]
  pageInfo: pageInfo!
}

type MetadatafieldEdge{
  cursor: String!
  node: metadatafield!
}

  enum metadatafieldField {
    metadataFieldDbId
    dataType
    fieldAbbreviation
    fieldName
    variantset_ID
  }
  
  input searchMetadatafieldInput {
    field: metadatafieldField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchMetadatafieldInput]
  }

  input orderMetadatafieldInput{
    field: metadatafieldField
    order: Order
  }



  type Query {
    metadatafields(search: searchMetadatafieldInput, order: [ orderMetadatafieldInput ], pagination: paginationInput! ): [metadatafield]
    readOneMetadatafield(metadataFieldDbId: ID!): metadatafield
    countMetadatafields(search: searchMetadatafieldInput ): Int
    csvTableTemplateMetadatafield: [String]
    metadatafieldsConnection(search:searchMetadatafieldInput, order: [ orderMetadatafieldInput ], pagination: paginationCursorInput! ): MetadatafieldConnection
    validateMetadatafieldForCreation(metadataFieldDbId: ID!, dataType: String, fieldAbbreviation: String, fieldName: String, variantset_ID: String , addVariantset:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateMetadatafieldForUpdating(metadataFieldDbId: ID!, dataType: String, fieldAbbreviation: String, fieldName: String, variantset_ID: String , addVariantset:ID, removeVariantset:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateMetadatafieldForDeletion(metadataFieldDbId: ID!): Boolean!
    validateMetadatafieldAfterReading(metadataFieldDbId: ID!): Boolean!
    """
    metadatafieldsZendroDefinition would return the static Zendro data model definition
    """
    metadatafieldsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addMetadatafield(metadataFieldDbId: ID!, dataType: String, fieldAbbreviation: String, fieldName: String, variantset_ID: String , addVariantset:ID   , skipAssociationsExistenceChecks:Boolean = false): metadatafield!
    updateMetadatafield(metadataFieldDbId: ID!, dataType: String, fieldAbbreviation: String, fieldName: String, variantset_ID: String , addVariantset:ID, removeVariantset:ID    , skipAssociationsExistenceChecks:Boolean = false): metadatafield!
    deleteMetadatafield(metadataFieldDbId: ID!): String!
      }
`;