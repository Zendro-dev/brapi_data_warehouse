module.exports = `
  type coordinate{
    """
    @original-field
    """
    coordinateDbId: ID
    """
    @original-field
    A free space containing any additional information related to a coordinate.
    """
    geometry: String

    """
    @original-field
    The literal string &#34;Feature&#34;
    """
    type: String

    """
    @original-field
    
    """
    germplasmOrigin_IDs: [String]

    """
    @original-field
    
    """
    location_ID: String

    """
    @original-field
    
    """
    observations_IDs: [String]

    """
    @original-field
    
    """
    observationUnitPosition_IDs: [String]

    location(search: searchLocationInput): location
    
    """
    @search-request
    """
    germplasmOriginFilter(search: searchGermplasmoriginInput, order: [ orderGermplasmoriginInput ], pagination: paginationInput!): [germplasmorigin]


    """
    @search-request
    """
    germplasmOriginConnection(search: searchGermplasmoriginInput, order: [ orderGermplasmoriginInput ], pagination: paginationCursorInput!): GermplasmoriginConnection

    """
    @count-request
    """
    countFilteredGermplasmOrigin(search: searchGermplasmoriginInput) : Int
  
    """
    @search-request
    """
    observationsFilter(search: searchObservationInput, order: [ orderObservationInput ], pagination: paginationInput!): [observation]


    """
    @search-request
    """
    observationsConnection(search: searchObservationInput, order: [ orderObservationInput ], pagination: paginationCursorInput!): ObservationConnection

    """
    @count-request
    """
    countFilteredObservations(search: searchObservationInput) : Int
  
    """
    @search-request
    """
    observationUnitPositionFilter(search: searchObservationunitpositionInput, order: [ orderObservationunitpositionInput ], pagination: paginationInput!): [observationunitposition]


    """
    @search-request
    """
    observationUnitPositionConnection(search: searchObservationunitpositionInput, order: [ orderObservationunitpositionInput ], pagination: paginationCursorInput!): ObservationunitpositionConnection

    """
    @count-request
    """
    countFilteredObservationUnitPosition(search: searchObservationunitpositionInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type CoordinateConnection{
  edges: [CoordinateEdge]
  coordinates: [coordinate]
  pageInfo: pageInfo!
}

type CoordinateEdge{
  cursor: String!
  node: coordinate!
}

  enum coordinateField {
    coordinateDbId
    geometry
    type
    germplasmOrigin_IDs
    location_ID
    observations_IDs
    observationUnitPosition_IDs
  }
  
  input searchCoordinateInput {
    field: coordinateField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchCoordinateInput]
  }

  input orderCoordinateInput{
    field: coordinateField
    order: Order
  }



  type Query {
    coordinates(search: searchCoordinateInput, order: [ orderCoordinateInput ], pagination: paginationInput! ): [coordinate]
    readOneCoordinate(coordinateDbId: ID!): coordinate
    countCoordinates(search: searchCoordinateInput ): Int
    csvTableTemplateCoordinate: [String]
    coordinatesConnection(search:searchCoordinateInput, order: [ orderCoordinateInput ], pagination: paginationCursorInput! ): CoordinateConnection
    validateCoordinateForCreation(coordinateDbId: ID!, geometry: String, type: String, germplasmOrigin_IDs: [String], location_ID: String, observations_IDs: [String], observationUnitPosition_IDs: [String] , addLocation:ID  , addGermplasmOrigin:[ID], addObservations:[ID], addObservationUnitPosition:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateCoordinateForUpdating(coordinateDbId: ID!, geometry: String, type: String, germplasmOrigin_IDs: [String], location_ID: String, observations_IDs: [String], observationUnitPosition_IDs: [String] , addLocation:ID, removeLocation:ID   , addGermplasmOrigin:[ID], removeGermplasmOrigin:[ID] , addObservations:[ID], removeObservations:[ID] , addObservationUnitPosition:[ID], removeObservationUnitPosition:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateCoordinateForDeletion(coordinateDbId: ID!): Boolean!
    validateCoordinateAfterReading(coordinateDbId: ID!): Boolean!
    """
    coordinatesZendroDefinition would return the static Zendro data model definition
    """
    coordinatesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addCoordinate(coordinateDbId: ID!, geometry: String, type: String, germplasmOrigin_IDs: [String], location_ID: String, observations_IDs: [String], observationUnitPosition_IDs: [String] , addLocation:ID  , addGermplasmOrigin:[ID], addObservations:[ID], addObservationUnitPosition:[ID] , skipAssociationsExistenceChecks:Boolean = false): coordinate!
    updateCoordinate(coordinateDbId: ID!, geometry: String, type: String, germplasmOrigin_IDs: [String], location_ID: String, observations_IDs: [String], observationUnitPosition_IDs: [String] , addLocation:ID, removeLocation:ID   , addGermplasmOrigin:[ID], removeGermplasmOrigin:[ID] , addObservations:[ID], removeObservations:[ID] , addObservationUnitPosition:[ID], removeObservationUnitPosition:[ID]  , skipAssociationsExistenceChecks:Boolean = false): coordinate!
    deleteCoordinate(coordinateDbId: ID!): String!
      }
`;