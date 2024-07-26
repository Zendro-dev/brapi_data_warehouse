module.exports = `
  type storagetype{
    """
    @original-field
    """
    storageTypeDbId: ID
    """
    @original-field
    The 2 digit code representing the type of storage this germplasm is kept in at a genebank. 

MCPD (v2.1) (STORAGE) 26. If germplasm is maintained under different types of storage, multiple choices are allowed, separated by a semicolon (e.g. 20;30). (Refer to FAO/IPGRI Genebank Standards 1994 for details on storage type.) 

10) Seed collection 
11) Short term 
12) Medium term 
13) Long term 
20) Field collection 
30) In vitro collection 
40) Cryo-preserved collection 
50) DNA collection 
99) Other (elaborate in REMARKS field)
    """
    code: String

    """
    @original-field
    A supplemental text description of the storage type
    """
    description: String

    """
    @original-field
    
    """
    germplasms_IDs: [String]

      
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
type StoragetypeConnection{
  edges: [StoragetypeEdge]
  storagetypes: [storagetype]
  pageInfo: pageInfo!
}

type StoragetypeEdge{
  cursor: String!
  node: storagetype!
}

  enum storagetypeField {
    storageTypeDbId
    code
    description
    germplasms_IDs
  }
  
  input searchStoragetypeInput {
    field: storagetypeField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchStoragetypeInput]
  }

  input orderStoragetypeInput{
    field: storagetypeField
    order: Order
  }



  type Query {
    storagetypes(search: searchStoragetypeInput, order: [ orderStoragetypeInput ], pagination: paginationInput! ): [storagetype]
    readOneStoragetype(storageTypeDbId: ID!): storagetype
    countStoragetypes(search: searchStoragetypeInput ): Int
    csvTableTemplateStoragetype: [String]
    storagetypesConnection(search:searchStoragetypeInput, order: [ orderStoragetypeInput ], pagination: paginationCursorInput! ): StoragetypeConnection
    validateStoragetypeForCreation(storageTypeDbId: ID!, code: String, description: String, germplasms_IDs: [String]   , addGermplasms:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateStoragetypeForUpdating(storageTypeDbId: ID!, code: String, description: String, germplasms_IDs: [String]   , addGermplasms:[ID], removeGermplasms:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateStoragetypeForDeletion(storageTypeDbId: ID!): Boolean!
    validateStoragetypeAfterReading(storageTypeDbId: ID!): Boolean!
    """
    storagetypesZendroDefinition would return the static Zendro data model definition
    """
    storagetypesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addStoragetype(storageTypeDbId: ID!, code: String, description: String, germplasms_IDs: [String]   , addGermplasms:[ID] , skipAssociationsExistenceChecks:Boolean = false): storagetype!
    updateStoragetype(storageTypeDbId: ID!, code: String, description: String, germplasms_IDs: [String]   , addGermplasms:[ID], removeGermplasms:[ID]  , skipAssociationsExistenceChecks:Boolean = false): storagetype!
    deleteStoragetype(storageTypeDbId: ID!): String!
      }
`;