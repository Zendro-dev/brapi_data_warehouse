module.exports = `
  type contentmixture{
    """
    @original-field
    """
    contentMixtureDbId: ID
    """
    @original-field
    The unique DbId for a cross contained in this seed lot
    """
    crossDbId: String

    """
    @original-field
    The human readable name for a cross contained in this seed lot
    """
    crossName: String

    """
    @original-field
    The unique DbId of the Germplasm contained in this Seed Lot
    """
    germplasmDbId: String

    """
    @original-field
    The human readable name of the Germplasm contained in this Seed Lot
    """
    germplasmName: String

    """
    @original-field
    The percentage of the given germplasm in the seed lot mixture.
    """
    mixturePercentage: Int

    """
    @original-field
    
    """
    seedLot_IDs: [String]

      
    """
    @search-request
    """
    seedLotFilter(search: searchSeedlotInput, order: [ orderSeedlotInput ], pagination: paginationInput!): [seedlot]


    """
    @search-request
    """
    seedLotConnection(search: searchSeedlotInput, order: [ orderSeedlotInput ], pagination: paginationCursorInput!): SeedlotConnection

    """
    @count-request
    """
    countFilteredSeedLot(search: searchSeedlotInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type ContentmixtureConnection{
  edges: [ContentmixtureEdge]
  contentmixtures: [contentmixture]
  pageInfo: pageInfo!
}

type ContentmixtureEdge{
  cursor: String!
  node: contentmixture!
}

  enum contentmixtureField {
    contentMixtureDbId
    crossDbId
    crossName
    germplasmDbId
    germplasmName
    mixturePercentage
    seedLot_IDs
  }
  
  input searchContentmixtureInput {
    field: contentmixtureField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchContentmixtureInput]
  }

  input orderContentmixtureInput{
    field: contentmixtureField
    order: Order
  }



  type Query {
    contentmixtures(search: searchContentmixtureInput, order: [ orderContentmixtureInput ], pagination: paginationInput! ): [contentmixture]
    readOneContentmixture(contentMixtureDbId: ID!): contentmixture
    countContentmixtures(search: searchContentmixtureInput ): Int
    csvTableTemplateContentmixture: [String]
    contentmixturesConnection(search:searchContentmixtureInput, order: [ orderContentmixtureInput ], pagination: paginationCursorInput! ): ContentmixtureConnection
    validateContentmixtureForCreation(contentMixtureDbId: ID!, crossDbId: String, crossName: String, germplasmDbId: String, germplasmName: String, mixturePercentage: Int   , addSeedLot:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateContentmixtureForUpdating(contentMixtureDbId: ID!, crossDbId: String, crossName: String, germplasmDbId: String, germplasmName: String, mixturePercentage: Int   , addSeedLot:[ID], removeSeedLot:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateContentmixtureForDeletion(contentMixtureDbId: ID!): Boolean!
    validateContentmixtureAfterReading(contentMixtureDbId: ID!): Boolean!
    """
    contentmixturesZendroDefinition would return the static Zendro data model definition
    """
    contentmixturesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addContentmixture(contentMixtureDbId: ID!, crossDbId: String, crossName: String, germplasmDbId: String, germplasmName: String, mixturePercentage: Int   , addSeedLot:[ID] , skipAssociationsExistenceChecks:Boolean = false): contentmixture!
    updateContentmixture(contentMixtureDbId: ID!, crossDbId: String, crossName: String, germplasmDbId: String, germplasmName: String, mixturePercentage: Int   , addSeedLot:[ID], removeSeedLot:[ID]  , skipAssociationsExistenceChecks:Boolean = false): contentmixture!
    deleteContentmixture(contentMixtureDbId: ID!): String!
      }
`;