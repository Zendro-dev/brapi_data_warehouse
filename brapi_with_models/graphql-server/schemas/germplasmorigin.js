module.exports = `
  type germplasmorigin{
    """
    @original-field
    """
    germplasmOriginDbId: ID
    """
    @original-field
    Uncertainty associated with the coordinates in meters. Leave the value empty if the uncertainty is unknown.
    """
    coordinateUncertainty: String

    """
    @original-field
    
    """
    coordinates_ID: String

    """
    @original-field
    
    """
    germplasms_IDs: [String]

    coordinates(search: searchCoordinateInput): coordinate
    
    """
    @search-request
    """
    germplasmsFilter(search: searchGermplasmInput, order: [ orderGermplasmInput ], pagination: paginationInput!): [germplasm]


    """
    @search-request
    """
    germplasmsConnection(search: searchGermplasmInput, order: [ orderGermplasmInput ], pagination: paginationCursorInput!): GermplasmConnection

    """
    @count-request
    """
    countFilteredGermplasms(search: searchGermplasmInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type GermplasmoriginConnection{
  edges: [GermplasmoriginEdge]
  germplasmorigins: [germplasmorigin]
  pageInfo: pageInfo!
}

type GermplasmoriginEdge{
  cursor: String!
  node: germplasmorigin!
}

  enum germplasmoriginField {
    germplasmOriginDbId
    coordinateUncertainty
    coordinates_ID
    germplasms_IDs
  }
  
  input searchGermplasmoriginInput {
    field: germplasmoriginField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchGermplasmoriginInput]
  }

  input orderGermplasmoriginInput{
    field: germplasmoriginField
    order: Order
  }



  type Query {
    germplasmorigins(search: searchGermplasmoriginInput, order: [ orderGermplasmoriginInput ], pagination: paginationInput! ): [germplasmorigin]
    readOneGermplasmorigin(germplasmOriginDbId: ID!): germplasmorigin
    countGermplasmorigins(search: searchGermplasmoriginInput ): Int
    csvTableTemplateGermplasmorigin: [String]
    germplasmoriginsConnection(search:searchGermplasmoriginInput, order: [ orderGermplasmoriginInput ], pagination: paginationCursorInput! ): GermplasmoriginConnection
    validateGermplasmoriginForCreation(germplasmOriginDbId: ID!, coordinateUncertainty: String, coordinates_ID: String, germplasms_IDs: [String] , addCoordinates:ID  , addGermplasms:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateGermplasmoriginForUpdating(germplasmOriginDbId: ID!, coordinateUncertainty: String, coordinates_ID: String, germplasms_IDs: [String] , addCoordinates:ID, removeCoordinates:ID   , addGermplasms:[ID], removeGermplasms:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateGermplasmoriginForDeletion(germplasmOriginDbId: ID!): Boolean!
    validateGermplasmoriginAfterReading(germplasmOriginDbId: ID!): Boolean!
    """
    germplasmoriginsZendroDefinition would return the static Zendro data model definition
    """
    germplasmoriginsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addGermplasmorigin(germplasmOriginDbId: ID!, coordinateUncertainty: String, coordinates_ID: String, germplasms_IDs: [String] , addCoordinates:ID  , addGermplasms:[ID] , skipAssociationsExistenceChecks:Boolean = false): germplasmorigin!
    updateGermplasmorigin(germplasmOriginDbId: ID!, coordinateUncertainty: String, coordinates_ID: String, germplasms_IDs: [String] , addCoordinates:ID, removeCoordinates:ID   , addGermplasms:[ID], removeGermplasms:[ID]  , skipAssociationsExistenceChecks:Boolean = false): germplasmorigin!
    deleteGermplasmorigin(germplasmOriginDbId: ID!): String!
      }
`;