module.exports = `
  type breedingmethod{
    """
    @original-field
    """
    breedingMethodDbId: ID
    """
    @original-field
    A shortened version of the human readable name for a Breeding Method
    """
    abbreviation: String

    """
    @original-field
    the human readable identifier for this breeding method
    """
    breedingMethodName: String

    """
    @original-field
    human readable description of the breeding method
    """
    description: String

    """
    @original-field
    
    """
    germplasm_IDs: [String]

    """
    @original-field
    
    """
    pedigreeNodes_IDs: [String]

      
    """
    @search-request
    """
    germplasmFilter(search: searchGermplasmInput, order: [ orderGermplasmInput ], pagination: paginationInput!): [germplasm]


    """
    @search-request
    """
    germplasmConnection(search: searchGermplasmInput, order: [ orderGermplasmInput ], pagination: paginationCursorInput!): GermplasmConnection

    """
    @count-request
    """
    countFilteredGermplasm(search: searchGermplasmInput) : Int
  
    """
    @search-request
    """
    pedigreeNodesFilter(search: searchPedigreenodeInput, order: [ orderPedigreenodeInput ], pagination: paginationInput!): [pedigreenode]


    """
    @search-request
    """
    pedigreeNodesConnection(search: searchPedigreenodeInput, order: [ orderPedigreenodeInput ], pagination: paginationCursorInput!): PedigreenodeConnection

    """
    @count-request
    """
    countFilteredPedigreeNodes(search: searchPedigreenodeInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type BreedingmethodConnection{
  edges: [BreedingmethodEdge]
  breedingmethods: [breedingmethod]
  pageInfo: pageInfo!
}

type BreedingmethodEdge{
  cursor: String!
  node: breedingmethod!
}

  enum breedingmethodField {
    breedingMethodDbId
    abbreviation
    breedingMethodName
    description
    germplasm_IDs
    pedigreeNodes_IDs
  }
  
  input searchBreedingmethodInput {
    field: breedingmethodField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchBreedingmethodInput]
  }

  input orderBreedingmethodInput{
    field: breedingmethodField
    order: Order
  }



  type Query {
    breedingmethods(search: searchBreedingmethodInput, order: [ orderBreedingmethodInput ], pagination: paginationInput! ): [breedingmethod]
    readOneBreedingmethod(breedingMethodDbId: ID!): breedingmethod
    countBreedingmethods(search: searchBreedingmethodInput ): Int
    csvTableTemplateBreedingmethod: [String]
    breedingmethodsConnection(search:searchBreedingmethodInput, order: [ orderBreedingmethodInput ], pagination: paginationCursorInput! ): BreedingmethodConnection
    validateBreedingmethodForCreation(breedingMethodDbId: ID!, abbreviation: String, breedingMethodName: String, description: String, germplasm_IDs: [String], pedigreeNodes_IDs: [String]   , addGermplasm:[ID], addPedigreeNodes:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateBreedingmethodForUpdating(breedingMethodDbId: ID!, abbreviation: String, breedingMethodName: String, description: String, germplasm_IDs: [String], pedigreeNodes_IDs: [String]   , addGermplasm:[ID], removeGermplasm:[ID] , addPedigreeNodes:[ID], removePedigreeNodes:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateBreedingmethodForDeletion(breedingMethodDbId: ID!): Boolean!
    validateBreedingmethodAfterReading(breedingMethodDbId: ID!): Boolean!
    """
    breedingmethodsZendroDefinition would return the static Zendro data model definition
    """
    breedingmethodsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addBreedingmethod(breedingMethodDbId: ID!, abbreviation: String, breedingMethodName: String, description: String, germplasm_IDs: [String], pedigreeNodes_IDs: [String]   , addGermplasm:[ID], addPedigreeNodes:[ID] , skipAssociationsExistenceChecks:Boolean = false): breedingmethod!
    updateBreedingmethod(breedingMethodDbId: ID!, abbreviation: String, breedingMethodName: String, description: String, germplasm_IDs: [String], pedigreeNodes_IDs: [String]   , addGermplasm:[ID], removeGermplasm:[ID] , addPedigreeNodes:[ID], removePedigreeNodes:[ID]  , skipAssociationsExistenceChecks:Boolean = false): breedingmethod!
    deleteBreedingmethod(breedingMethodDbId: ID!): String!
      }
`;