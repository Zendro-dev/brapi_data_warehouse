module.exports = `
  type availableformat{
    """
    @original-field
    """
    availableFormatDbId: ID
    """
    @original-field
    dataFormat defines the structure of the data within a file (ie DartSeq, VCF, Hapmap, tabular, etc)
    """
    dataFormat: String

    """
    @original-field
    Should homozygotes be expanded (true) or collapsed into a single occurrence (false)
    """
    expandHomozygotes: Boolean

    """
    @original-field
    fileFormat defines the MIME type of the file (ie text/csv, application/excel, application/zip). This should also be reflected in the Accept and ContentType HTTP headers for every relevant request and response.
    """
    fileFormat: String

    """
    @original-field
    A URL which indicates the location of the file version of this VariantSet. Could be a static file URL or an API endpoint which generates the file.
    """
    fileURL: String

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
    variantset_ID: String

    variantset(search: searchVariantsetInput): variantset
    
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type AvailableformatConnection{
  edges: [AvailableformatEdge]
  availableformats: [availableformat]
  pageInfo: pageInfo!
}

type AvailableformatEdge{
  cursor: String!
  node: availableformat!
}

  enum availableformatField {
    availableFormatDbId
    dataFormat
    expandHomozygotes
    fileFormat
    fileURL
    sepPhased
    sepUnphased
    unknownString
    variantset_ID
  }
  
  input searchAvailableformatInput {
    field: availableformatField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchAvailableformatInput]
  }

  input orderAvailableformatInput{
    field: availableformatField
    order: Order
  }



  type Query {
    availableformats(search: searchAvailableformatInput, order: [ orderAvailableformatInput ], pagination: paginationInput! ): [availableformat]
    readOneAvailableformat(availableFormatDbId: ID!): availableformat
    countAvailableformats(search: searchAvailableformatInput ): Int
    csvTableTemplateAvailableformat: [String]
    availableformatsConnection(search:searchAvailableformatInput, order: [ orderAvailableformatInput ], pagination: paginationCursorInput! ): AvailableformatConnection
    validateAvailableformatForCreation(availableFormatDbId: ID!, dataFormat: String, expandHomozygotes: Boolean, fileFormat: String, fileURL: String, sepPhased: String, sepUnphased: String, unknownString: String, variantset_ID: String , addVariantset:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateAvailableformatForUpdating(availableFormatDbId: ID!, dataFormat: String, expandHomozygotes: Boolean, fileFormat: String, fileURL: String, sepPhased: String, sepUnphased: String, unknownString: String, variantset_ID: String , addVariantset:ID, removeVariantset:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateAvailableformatForDeletion(availableFormatDbId: ID!): Boolean!
    validateAvailableformatAfterReading(availableFormatDbId: ID!): Boolean!
    """
    availableformatsZendroDefinition would return the static Zendro data model definition
    """
    availableformatsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addAvailableformat(availableFormatDbId: ID!, dataFormat: String, expandHomozygotes: Boolean, fileFormat: String, fileURL: String, sepPhased: String, sepUnphased: String, unknownString: String, variantset_ID: String , addVariantset:ID   , skipAssociationsExistenceChecks:Boolean = false): availableformat!
    updateAvailableformat(availableFormatDbId: ID!, dataFormat: String, expandHomozygotes: Boolean, fileFormat: String, fileURL: String, sepPhased: String, sepUnphased: String, unknownString: String, variantset_ID: String , addVariantset:ID, removeVariantset:ID    , skipAssociationsExistenceChecks:Boolean = false): availableformat!
    deleteAvailableformat(availableFormatDbId: ID!): String!
      }
`;