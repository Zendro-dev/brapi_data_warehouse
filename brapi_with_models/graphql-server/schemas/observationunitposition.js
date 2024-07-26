module.exports = `
  type observationunitposition{
    """
    @original-field
    """
    observationUnitPositionDbId: ID
    """
    @original-field
    The type of entry for this observation unit. ex. &#34;CHECK&#34;, &#34;TEST&#34;, &#34;FILLER&#34;
    """
    entryType: String

    """
    @original-field
    The X position coordinate for an observation unit. Different systems may use different coordinate systems.
    """
    positionCoordinateX: String

    """
    @original-field
    The type of positional coordinate used. Must be one of the following values 

LONGITUDE - ISO 6709 standard, WGS84 geodetic datum. See &#39;Location Coordinate Encoding&#39; for details 

LATITUDE - ISO 6709 standard, WGS84 geodetic datum. See &#39;Location Coordinate Encoding&#39; for details 

PLANTED_ROW - The physical planted row number 

PLANTED_INDIVIDUAL - The physical counted number, could be independant or within a planted row 

GRID_ROW - The row index number of a square grid overlay 

GRID_COL - The column index number of a square grid overlay 

MEASURED_ROW - The distance in meters from a defined 0-th row 

MEASURED_COL - The distance in meters from a defined 0-th column 
    """
    positionCoordinateXType: String

    """
    @original-field
    The Y position coordinate for an observation unit. Different systems may use different coordinate systems.
    """
    positionCoordinateY: String

    """
    @original-field
    The type of positional coordinate used. Must be one of the following values 

LONGITUDE - ISO 6709 standard, WGS84 geodetic datum. See &#39;Location Coordinate Encoding&#39; for details 

LATITUDE - ISO 6709 standard, WGS84 geodetic datum. See &#39;Location Coordinate Encoding&#39; for details 

PLANTED_ROW - The physical planted row number  

PLANTED_INDIVIDUAL - The physical counted number, could be independant or within a planted row 

GRID_ROW - The row index number of a square grid overlay 

GRID_COL - The column index number of a square grid overlay 

MEASURED_ROW - The distance in meters from a defined 0-th row 

MEASURED_COL - The distance in meters from a defined 0-th column 
    """
    positionCoordinateYType: String

    """
    @original-field
    
    """
    observationUnit_ID: String

    """
    @original-field
    
    """
    geoCoordinates_ID: String

    """
    @original-field
    
    """
    observationLevel_IDs: [String]

    """
    @original-field
    
    """
    observationLevelRelationships_IDs: [String]

    observationUnit(search: searchObservationunitInput): observationunit
  geoCoordinates(search: searchCoordinateInput): coordinate
    
    """
    @search-request
    """
    observationLevelFilter(search: searchObservationlevelInput, order: [ orderObservationlevelInput ], pagination: paginationInput!): [observationlevel]


    """
    @search-request
    """
    observationLevelConnection(search: searchObservationlevelInput, order: [ orderObservationlevelInput ], pagination: paginationCursorInput!): ObservationlevelConnection

    """
    @count-request
    """
    countFilteredObservationLevel(search: searchObservationlevelInput) : Int
  
    """
    @search-request
    """
    observationLevelRelationshipsFilter(search: searchObservationlevelrelationshipInput, order: [ orderObservationlevelrelationshipInput ], pagination: paginationInput!): [observationlevelrelationship]


    """
    @search-request
    """
    observationLevelRelationshipsConnection(search: searchObservationlevelrelationshipInput, order: [ orderObservationlevelrelationshipInput ], pagination: paginationCursorInput!): ObservationlevelrelationshipConnection

    """
    @count-request
    """
    countFilteredObservationLevelRelationships(search: searchObservationlevelrelationshipInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type ObservationunitpositionConnection{
  edges: [ObservationunitpositionEdge]
  observationunitpositions: [observationunitposition]
  pageInfo: pageInfo!
}

type ObservationunitpositionEdge{
  cursor: String!
  node: observationunitposition!
}

  enum observationunitpositionField {
    observationUnitPositionDbId
    entryType
    positionCoordinateX
    positionCoordinateXType
    positionCoordinateY
    positionCoordinateYType
    observationUnit_ID
    geoCoordinates_ID
    observationLevel_IDs
    observationLevelRelationships_IDs
  }
  
  input searchObservationunitpositionInput {
    field: observationunitpositionField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchObservationunitpositionInput]
  }

  input orderObservationunitpositionInput{
    field: observationunitpositionField
    order: Order
  }



  type Query {
    observationunitpositions(search: searchObservationunitpositionInput, order: [ orderObservationunitpositionInput ], pagination: paginationInput! ): [observationunitposition]
    readOneObservationunitposition(observationUnitPositionDbId: ID!): observationunitposition
    countObservationunitpositions(search: searchObservationunitpositionInput ): Int
    csvTableTemplateObservationunitposition: [String]
    observationunitpositionsConnection(search:searchObservationunitpositionInput, order: [ orderObservationunitpositionInput ], pagination: paginationCursorInput! ): ObservationunitpositionConnection
    validateObservationunitpositionForCreation(observationUnitPositionDbId: ID!, entryType: String, positionCoordinateX: String, positionCoordinateXType: String, positionCoordinateY: String, positionCoordinateYType: String, observationUnit_ID: String, geoCoordinates_ID: String, observationLevel_IDs: [String] , addObservationUnit:ID, addGeoCoordinates:ID  , addObservationLevel:[ID], addObservationLevelRelationships:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateObservationunitpositionForUpdating(observationUnitPositionDbId: ID!, entryType: String, positionCoordinateX: String, positionCoordinateXType: String, positionCoordinateY: String, positionCoordinateYType: String, observationUnit_ID: String, geoCoordinates_ID: String, observationLevel_IDs: [String] , addObservationUnit:ID, removeObservationUnit:ID , addGeoCoordinates:ID, removeGeoCoordinates:ID   , addObservationLevel:[ID], removeObservationLevel:[ID] , addObservationLevelRelationships:[ID], removeObservationLevelRelationships:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateObservationunitpositionForDeletion(observationUnitPositionDbId: ID!): Boolean!
    validateObservationunitpositionAfterReading(observationUnitPositionDbId: ID!): Boolean!
    """
    observationunitpositionsZendroDefinition would return the static Zendro data model definition
    """
    observationunitpositionsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addObservationunitposition(observationUnitPositionDbId: ID!, entryType: String, positionCoordinateX: String, positionCoordinateXType: String, positionCoordinateY: String, positionCoordinateYType: String, observationUnit_ID: String, geoCoordinates_ID: String, observationLevel_IDs: [String] , addObservationUnit:ID, addGeoCoordinates:ID  , addObservationLevel:[ID], addObservationLevelRelationships:[ID] , skipAssociationsExistenceChecks:Boolean = false): observationunitposition!
    updateObservationunitposition(observationUnitPositionDbId: ID!, entryType: String, positionCoordinateX: String, positionCoordinateXType: String, positionCoordinateY: String, positionCoordinateYType: String, observationUnit_ID: String, geoCoordinates_ID: String, observationLevel_IDs: [String] , addObservationUnit:ID, removeObservationUnit:ID , addGeoCoordinates:ID, removeGeoCoordinates:ID   , addObservationLevel:[ID], removeObservationLevel:[ID] , addObservationLevelRelationships:[ID], removeObservationLevelRelationships:[ID]  , skipAssociationsExistenceChecks:Boolean = false): observationunitposition!
    deleteObservationunitposition(observationUnitPositionDbId: ID!): String!
      }
`;