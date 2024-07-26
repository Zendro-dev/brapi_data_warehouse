module.exports = `
  type taxon{
    """
    @original-field
    """
    taxonDbId: ID
    """
    @original-field
    The human readable name of the taxonomy provider
    """
    sourceName: String

    """
    @original-field
    The identifier (name, ID, URI) of a particular taxonomy within the source provider
    """
    taxonId: String

    """
    @original-field
    
    """
    germplasm_ID: String

    germplasm(search: searchGermplasmInput): germplasm
    
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type TaxonConnection{
  edges: [TaxonEdge]
  taxons: [taxon]
  pageInfo: pageInfo!
}

type TaxonEdge{
  cursor: String!
  node: taxon!
}

  enum taxonField {
    taxonDbId
    sourceName
    taxonId
    germplasm_ID
  }
  
  input searchTaxonInput {
    field: taxonField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchTaxonInput]
  }

  input orderTaxonInput{
    field: taxonField
    order: Order
  }



  type Query {
    taxons(search: searchTaxonInput, order: [ orderTaxonInput ], pagination: paginationInput! ): [taxon]
    readOneTaxon(taxonDbId: ID!): taxon
    countTaxons(search: searchTaxonInput ): Int
    csvTableTemplateTaxon: [String]
    taxonsConnection(search:searchTaxonInput, order: [ orderTaxonInput ], pagination: paginationCursorInput! ): TaxonConnection
    validateTaxonForCreation(taxonDbId: ID!, sourceName: String, taxonId: String, germplasm_ID: String , addGermplasm:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateTaxonForUpdating(taxonDbId: ID!, sourceName: String, taxonId: String, germplasm_ID: String , addGermplasm:ID, removeGermplasm:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateTaxonForDeletion(taxonDbId: ID!): Boolean!
    validateTaxonAfterReading(taxonDbId: ID!): Boolean!
    """
    taxonsZendroDefinition would return the static Zendro data model definition
    """
    taxonsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addTaxon(taxonDbId: ID!, sourceName: String, taxonId: String, germplasm_ID: String , addGermplasm:ID   , skipAssociationsExistenceChecks:Boolean = false): taxon!
    updateTaxon(taxonDbId: ID!, sourceName: String, taxonId: String, germplasm_ID: String , addGermplasm:ID, removeGermplasm:ID    , skipAssociationsExistenceChecks:Boolean = false): taxon!
    deleteTaxon(taxonDbId: ID!): String!
      }
`;