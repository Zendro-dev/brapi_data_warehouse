module.exports = `
  type seedlot{
    """
    @original-field
    """
    seedLotDbId: ID
    """
    @original-field
    The current balance of the amount of material in a SeedLot. Could be a count (seeds, bulbs, etc) or a weight (kg of seed).
    """
    amount: Float

    """
    @original-field
    The time stamp for when this seed lot was created
    """
    createdDate: String

    """
    @original-field
    The timestamp for the last update to this Seed Lot (including transactions)
    """
    lastUpdated: String

    """
    @original-field
    
    """
    location_ID: String

    """
    @original-field
    
    """
    program_ID: String

    """
    @original-field
    A general description of this Seed Lot
    """
    seedLotDescription: String

    """
    @original-field
    A human readable name for this Seed Lot
    """
    seedLotName: String

    """
    @original-field
    The description of the source where this material was originally collected (wild, nursery, etc)
    """
    sourceCollection: String

    """
    @original-field
    Description the storage location
    """
    storageLocation: String

    """
    @original-field
    A description of the things being counted in a SeedLot (seeds, bulbs, kg, tree, etc)
    """
    units: String

    """
    @original-field
    
    """
    fromSeedLotTransactions_IDs: [String]

    """
    @original-field
    
    """
    toSeedLotTransactions_IDs: [String]

    """
    @original-field
    
    """
    observationUnits_IDs: [String]

    """
    @original-field
    
    """
    additionalInfo_IDs: [String]

    """
    @original-field
    
    """
    externalReferences_IDs: [String]

    """
    @original-field
    
    """
    contentMixture_IDs: [String]

    location(search: searchLocationInput): location
  program(search: searchProgramInput): program
    
    """
    @search-request
    """
    fromSeedLotTransactionsFilter(search: searchSeedlottransactionInput, order: [ orderSeedlottransactionInput ], pagination: paginationInput!): [seedlottransaction]


    """
    @search-request
    """
    fromSeedLotTransactionsConnection(search: searchSeedlottransactionInput, order: [ orderSeedlottransactionInput ], pagination: paginationCursorInput!): SeedlottransactionConnection

    """
    @count-request
    """
    countFilteredFromSeedLotTransactions(search: searchSeedlottransactionInput) : Int
  
    """
    @search-request
    """
    toSeedLotTransactionsFilter(search: searchSeedlottransactionInput, order: [ orderSeedlottransactionInput ], pagination: paginationInput!): [seedlottransaction]


    """
    @search-request
    """
    toSeedLotTransactionsConnection(search: searchSeedlottransactionInput, order: [ orderSeedlottransactionInput ], pagination: paginationCursorInput!): SeedlottransactionConnection

    """
    @count-request
    """
    countFilteredToSeedLotTransactions(search: searchSeedlottransactionInput) : Int
  
    """
    @search-request
    """
    observationUnitsFilter(search: searchObservationunitInput, order: [ orderObservationunitInput ], pagination: paginationInput!): [observationunit]


    """
    @search-request
    """
    observationUnitsConnection(search: searchObservationunitInput, order: [ orderObservationunitInput ], pagination: paginationCursorInput!): ObservationunitConnection

    """
    @count-request
    """
    countFilteredObservationUnits(search: searchObservationunitInput) : Int
  
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
    @search-request
    """
    contentMixtureFilter(search: searchContentmixtureInput, order: [ orderContentmixtureInput ], pagination: paginationInput!): [contentmixture]


    """
    @search-request
    """
    contentMixtureConnection(search: searchContentmixtureInput, order: [ orderContentmixtureInput ], pagination: paginationCursorInput!): ContentmixtureConnection

    """
    @count-request
    """
    countFilteredContentMixture(search: searchContentmixtureInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type SeedlotConnection{
  edges: [SeedlotEdge]
  seedlots: [seedlot]
  pageInfo: pageInfo!
}

type SeedlotEdge{
  cursor: String!
  node: seedlot!
}

  enum seedlotField {
    seedLotDbId
    amount
    createdDate
    lastUpdated
    location_ID
    program_ID
    seedLotDescription
    seedLotName
    sourceCollection
    storageLocation
    units
    fromSeedLotTransactions_IDs
    toSeedLotTransactions_IDs
    observationUnits_IDs
    additionalInfo_IDs
    externalReferences_IDs
    contentMixture_IDs
  }
  
  input searchSeedlotInput {
    field: seedlotField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchSeedlotInput]
  }

  input orderSeedlotInput{
    field: seedlotField
    order: Order
  }



  type Query {
    seedlots(search: searchSeedlotInput, order: [ orderSeedlotInput ], pagination: paginationInput! ): [seedlot]
    readOneSeedlot(seedLotDbId: ID!): seedlot
    countSeedlots(search: searchSeedlotInput ): Int
    csvTableTemplateSeedlot: [String]
    seedlotsConnection(search:searchSeedlotInput, order: [ orderSeedlotInput ], pagination: paginationCursorInput! ): SeedlotConnection
    validateSeedlotForCreation(seedLotDbId: ID!, amount: Float, createdDate: String, lastUpdated: String, location_ID: String, program_ID: String, seedLotDescription: String, seedLotName: String, sourceCollection: String, storageLocation: String, units: String, fromSeedLotTransactions_IDs: [String], toSeedLotTransactions_IDs: [String], observationUnits_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String] , addLocation:ID, addProgram:ID  , addFromSeedLotTransactions:[ID], addToSeedLotTransactions:[ID], addObservationUnits:[ID], addAdditionalInfo:[ID], addExternalReferences:[ID], addContentMixture:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateSeedlotForUpdating(seedLotDbId: ID!, amount: Float, createdDate: String, lastUpdated: String, location_ID: String, program_ID: String, seedLotDescription: String, seedLotName: String, sourceCollection: String, storageLocation: String, units: String, fromSeedLotTransactions_IDs: [String], toSeedLotTransactions_IDs: [String], observationUnits_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String] , addLocation:ID, removeLocation:ID , addProgram:ID, removeProgram:ID   , addFromSeedLotTransactions:[ID], removeFromSeedLotTransactions:[ID] , addToSeedLotTransactions:[ID], removeToSeedLotTransactions:[ID] , addObservationUnits:[ID], removeObservationUnits:[ID] , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addContentMixture:[ID], removeContentMixture:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateSeedlotForDeletion(seedLotDbId: ID!): Boolean!
    validateSeedlotAfterReading(seedLotDbId: ID!): Boolean!
    """
    seedlotsZendroDefinition would return the static Zendro data model definition
    """
    seedlotsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addSeedlot(seedLotDbId: ID!, amount: Float, createdDate: String, lastUpdated: String, location_ID: String, program_ID: String, seedLotDescription: String, seedLotName: String, sourceCollection: String, storageLocation: String, units: String, fromSeedLotTransactions_IDs: [String], toSeedLotTransactions_IDs: [String], observationUnits_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String] , addLocation:ID, addProgram:ID  , addFromSeedLotTransactions:[ID], addToSeedLotTransactions:[ID], addObservationUnits:[ID], addAdditionalInfo:[ID], addExternalReferences:[ID], addContentMixture:[ID] , skipAssociationsExistenceChecks:Boolean = false): seedlot!
    updateSeedlot(seedLotDbId: ID!, amount: Float, createdDate: String, lastUpdated: String, location_ID: String, program_ID: String, seedLotDescription: String, seedLotName: String, sourceCollection: String, storageLocation: String, units: String, fromSeedLotTransactions_IDs: [String], toSeedLotTransactions_IDs: [String], observationUnits_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String] , addLocation:ID, removeLocation:ID , addProgram:ID, removeProgram:ID   , addFromSeedLotTransactions:[ID], removeFromSeedLotTransactions:[ID] , addToSeedLotTransactions:[ID], removeToSeedLotTransactions:[ID] , addObservationUnits:[ID], removeObservationUnits:[ID] , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addContentMixture:[ID], removeContentMixture:[ID]  , skipAssociationsExistenceChecks:Boolean = false): seedlot!
    deleteSeedlot(seedLotDbId: ID!): String!
      }
`;