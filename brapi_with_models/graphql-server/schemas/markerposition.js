module.exports = `
  type markerposition{
    """
    @original-field
    """
    markerPositionDbId: ID
    """
    @original-field
    
    """
    additionalInfo_IDs: [String]

    """
    @original-field
    The Uniquely Identifiable name of a \`LinkageGroup\`
&lt;br&gt; This might be a chromosome identifier or the generic linkage group identifier if the chromosome is not applicable.
    """
    linkageGroupName: String

    """
    @original-field
    
    """
    map_ID: String

    """
    @original-field
    The position of a marker or variant within a \`LinkageGroup\`
    """
    position: Int

    """
    @original-field
    
    """
    variant_ID: String

    map(search: searchGenomemapInput): genomemap
  variant(search: searchVariantInput): variant
    
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
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type MarkerpositionConnection{
  edges: [MarkerpositionEdge]
  markerpositions: [markerposition]
  pageInfo: pageInfo!
}

type MarkerpositionEdge{
  cursor: String!
  node: markerposition!
}

  enum markerpositionField {
    markerPositionDbId
    additionalInfo_IDs
    linkageGroupName
    map_ID
    position
    variant_ID
  }
  
  input searchMarkerpositionInput {
    field: markerpositionField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchMarkerpositionInput]
  }

  input orderMarkerpositionInput{
    field: markerpositionField
    order: Order
  }



  type Query {
    markerpositions(search: searchMarkerpositionInput, order: [ orderMarkerpositionInput ], pagination: paginationInput! ): [markerposition]
    readOneMarkerposition(markerPositionDbId: ID!): markerposition
    countMarkerpositions(search: searchMarkerpositionInput ): Int
    csvTableTemplateMarkerposition: [String]
    markerpositionsConnection(search:searchMarkerpositionInput, order: [ orderMarkerpositionInput ], pagination: paginationCursorInput! ): MarkerpositionConnection
    validateMarkerpositionForCreation(markerPositionDbId: ID!, additionalInfo_IDs: [String], linkageGroupName: String, map_ID: String, position: Int, variant_ID: String , addMap:ID, addVariant:ID  , addAdditionalInfo:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateMarkerpositionForUpdating(markerPositionDbId: ID!, additionalInfo_IDs: [String], linkageGroupName: String, map_ID: String, position: Int, variant_ID: String , addMap:ID, removeMap:ID , addVariant:ID, removeVariant:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateMarkerpositionForDeletion(markerPositionDbId: ID!): Boolean!
    validateMarkerpositionAfterReading(markerPositionDbId: ID!): Boolean!
    """
    markerpositionsZendroDefinition would return the static Zendro data model definition
    """
    markerpositionsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addMarkerposition(markerPositionDbId: ID!, additionalInfo_IDs: [String], linkageGroupName: String, map_ID: String, position: Int, variant_ID: String , addMap:ID, addVariant:ID  , addAdditionalInfo:[ID] , skipAssociationsExistenceChecks:Boolean = false): markerposition!
    updateMarkerposition(markerPositionDbId: ID!, additionalInfo_IDs: [String], linkageGroupName: String, map_ID: String, position: Int, variant_ID: String , addMap:ID, removeMap:ID , addVariant:ID, removeVariant:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID]  , skipAssociationsExistenceChecks:Boolean = false): markerposition!
    deleteMarkerposition(markerPositionDbId: ID!): String!
      }
`;