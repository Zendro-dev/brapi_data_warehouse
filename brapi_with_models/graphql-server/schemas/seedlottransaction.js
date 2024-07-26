module.exports = `
  type seedlottransaction{
    """
    @original-field
    """
    seedLotTransactionDbId: ID
    """
    @original-field
    The number of units being transfered between SeedLots. Could be a count (seeds, bulbs, etc) or a weight (kg of seed).
    """
    amount: Float

    """
    @original-field
    
    """
    fromSeedLot_ID: String

    """
    @original-field
    
    """
    toSeedLot_ID: String

    """
    @original-field
    A general description of this Seed Lot Transaction
    """
    transactionDescription: String

    """
    @original-field
    The time stamp for when the transaction occurred
    """
    transactionTimestamp: String

    """
    @original-field
    A description of the things being transfered between SeedLots in a transaction (seeds, bulbs, kg, etc)
    """
    units: String

    """
    @original-field
    
    """
    additionalInfo_IDs: [String]

    """
    @original-field
    
    """
    externalReferences_IDs: [String]

    fromSeedLot(search: searchSeedlotInput): seedlot
  toSeedLot(search: searchSeedlotInput): seedlot
    
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
    @search-request
    """
    externalReferencesFilter(search: searchExternalreferenceInput, order: [ orderExternalreferenceInput ], pagination: paginationInput!): [externalreference]


    """
    @search-request
    """
    externalReferencesConnection(search: searchExternalreferenceInput, order: [ orderExternalreferenceInput ], pagination: paginationCursorInput!): ExternalreferenceConnection

    """
    @count-request
    """
    countFilteredExternalReferences(search: searchExternalreferenceInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type SeedlottransactionConnection{
  edges: [SeedlottransactionEdge]
  seedlottransactions: [seedlottransaction]
  pageInfo: pageInfo!
}

type SeedlottransactionEdge{
  cursor: String!
  node: seedlottransaction!
}

  enum seedlottransactionField {
    seedLotTransactionDbId
    amount
    fromSeedLot_ID
    toSeedLot_ID
    transactionDescription
    transactionTimestamp
    units
    additionalInfo_IDs
    externalReferences_IDs
  }
  
  input searchSeedlottransactionInput {
    field: seedlottransactionField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchSeedlottransactionInput]
  }

  input orderSeedlottransactionInput{
    field: seedlottransactionField
    order: Order
  }



  type Query {
    seedlottransactions(search: searchSeedlottransactionInput, order: [ orderSeedlottransactionInput ], pagination: paginationInput! ): [seedlottransaction]
    readOneSeedlottransaction(seedLotTransactionDbId: ID!): seedlottransaction
    countSeedlottransactions(search: searchSeedlottransactionInput ): Int
    csvTableTemplateSeedlottransaction: [String]
    seedlottransactionsConnection(search:searchSeedlottransactionInput, order: [ orderSeedlottransactionInput ], pagination: paginationCursorInput! ): SeedlottransactionConnection
    validateSeedlottransactionForCreation(seedLotTransactionDbId: ID!, amount: Float, fromSeedLot_ID: String, toSeedLot_ID: String, transactionDescription: String, transactionTimestamp: String, units: String, additionalInfo_IDs: [String], externalReferences_IDs: [String] , addFromSeedLot:ID, addToSeedLot:ID  , addAdditionalInfo:[ID], addExternalReferences:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateSeedlottransactionForUpdating(seedLotTransactionDbId: ID!, amount: Float, fromSeedLot_ID: String, toSeedLot_ID: String, transactionDescription: String, transactionTimestamp: String, units: String, additionalInfo_IDs: [String], externalReferences_IDs: [String] , addFromSeedLot:ID, removeFromSeedLot:ID , addToSeedLot:ID, removeToSeedLot:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateSeedlottransactionForDeletion(seedLotTransactionDbId: ID!): Boolean!
    validateSeedlottransactionAfterReading(seedLotTransactionDbId: ID!): Boolean!
    """
    seedlottransactionsZendroDefinition would return the static Zendro data model definition
    """
    seedlottransactionsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addSeedlottransaction(seedLotTransactionDbId: ID!, amount: Float, fromSeedLot_ID: String, toSeedLot_ID: String, transactionDescription: String, transactionTimestamp: String, units: String, additionalInfo_IDs: [String], externalReferences_IDs: [String] , addFromSeedLot:ID, addToSeedLot:ID  , addAdditionalInfo:[ID], addExternalReferences:[ID] , skipAssociationsExistenceChecks:Boolean = false): seedlottransaction!
    updateSeedlottransaction(seedLotTransactionDbId: ID!, amount: Float, fromSeedLot_ID: String, toSeedLot_ID: String, transactionDescription: String, transactionTimestamp: String, units: String, additionalInfo_IDs: [String], externalReferences_IDs: [String] , addFromSeedLot:ID, removeFromSeedLot:ID , addToSeedLot:ID, removeToSeedLot:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID]  , skipAssociationsExistenceChecks:Boolean = false): seedlottransaction!
    deleteSeedlottransaction(seedLotTransactionDbId: ID!): String!
      }
`;