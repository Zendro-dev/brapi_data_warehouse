module.exports = `
  type season{
    """
    @original-field
    """
    seasonDbId: ID
    """
    @original-field
    Name of the season. ex. &#39;Spring&#39;, &#39;Q2&#39;, &#39;Season A&#39;, etc.
    """
    seasonName: String

    """
    @original-field
    The 4 digit year of the season.
    """
    year: Int

    """
    @original-field
    
    """
    observations_IDs: [String]

      
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
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type SeasonConnection{
  edges: [SeasonEdge]
  seasons: [season]
  pageInfo: pageInfo!
}

type SeasonEdge{
  cursor: String!
  node: season!
}

  enum seasonField {
    seasonDbId
    seasonName
    year
    observations_IDs
  }
  
  input searchSeasonInput {
    field: seasonField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchSeasonInput]
  }

  input orderSeasonInput{
    field: seasonField
    order: Order
  }



  type Query {
    seasons(search: searchSeasonInput, order: [ orderSeasonInput ], pagination: paginationInput! ): [season]
    readOneSeason(seasonDbId: ID!): season
    countSeasons(search: searchSeasonInput ): Int
    csvTableTemplateSeason: [String]
    seasonsConnection(search:searchSeasonInput, order: [ orderSeasonInput ], pagination: paginationCursorInput! ): SeasonConnection
    validateSeasonForCreation(seasonDbId: ID!, seasonName: String, year: Int, observations_IDs: [String]   , addObservations:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateSeasonForUpdating(seasonDbId: ID!, seasonName: String, year: Int, observations_IDs: [String]   , addObservations:[ID], removeObservations:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateSeasonForDeletion(seasonDbId: ID!): Boolean!
    validateSeasonAfterReading(seasonDbId: ID!): Boolean!
    """
    seasonsZendroDefinition would return the static Zendro data model definition
    """
    seasonsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addSeason(seasonDbId: ID!, seasonName: String, year: Int, observations_IDs: [String]   , addObservations:[ID] , skipAssociationsExistenceChecks:Boolean = false): season!
    updateSeason(seasonDbId: ID!, seasonName: String, year: Int, observations_IDs: [String]   , addObservations:[ID], removeObservations:[ID]  , skipAssociationsExistenceChecks:Boolean = false): season!
    deleteSeason(seasonDbId: ID!): String!
      }
`;