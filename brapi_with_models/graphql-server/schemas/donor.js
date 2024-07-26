module.exports = `
  type donor{
    """
    @original-field
    """
    donorDbId: ID
    """
    @original-field
    The accession number assigned by the donor

MCPD (v2.1) (DONORNUMB) 23. Identifier assigned to an accession by the donor. Follows ACCENUMB standard.
    """
    donorAccessionNumber: String

    """
    @original-field
    The institute code for the donor institute
&lt;br/&gt;MCPD (v2.1) (DONORCODE) 22. FAO WIEWS code of the donor institute. Follows INSTCODE standard.
    """
    donorInstituteCode: String

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
type DonorConnection{
  edges: [DonorEdge]
  donors: [donor]
  pageInfo: pageInfo!
}

type DonorEdge{
  cursor: String!
  node: donor!
}

  enum donorField {
    donorDbId
    donorAccessionNumber
    donorInstituteCode
    germplasms_IDs
  }
  
  input searchDonorInput {
    field: donorField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchDonorInput]
  }

  input orderDonorInput{
    field: donorField
    order: Order
  }



  type Query {
    donors(search: searchDonorInput, order: [ orderDonorInput ], pagination: paginationInput! ): [donor]
    readOneDonor(donorDbId: ID!): donor
    countDonors(search: searchDonorInput ): Int
    csvTableTemplateDonor: [String]
    donorsConnection(search:searchDonorInput, order: [ orderDonorInput ], pagination: paginationCursorInput! ): DonorConnection
    validateDonorForCreation(donorDbId: ID!, donorAccessionNumber: String, donorInstituteCode: String   , addGermplasms:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateDonorForUpdating(donorDbId: ID!, donorAccessionNumber: String, donorInstituteCode: String   , addGermplasms:[ID], removeGermplasms:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateDonorForDeletion(donorDbId: ID!): Boolean!
    validateDonorAfterReading(donorDbId: ID!): Boolean!
    """
    donorsZendroDefinition would return the static Zendro data model definition
    """
    donorsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addDonor(donorDbId: ID!, donorAccessionNumber: String, donorInstituteCode: String   , addGermplasms:[ID] , skipAssociationsExistenceChecks:Boolean = false): donor!
    updateDonor(donorDbId: ID!, donorAccessionNumber: String, donorInstituteCode: String   , addGermplasms:[ID], removeGermplasms:[ID]  , skipAssociationsExistenceChecks:Boolean = false): donor!
    deleteDonor(donorDbId: ID!): String!
      }
`;