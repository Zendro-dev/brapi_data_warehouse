module.exports = `
  type species{
    """
    @original-field
    """
    speciesDbId: ID
    """
    @original-field
    Ontology term - the label of the ontology term the termId is pointing to.
    """
    term: String

    """
    @original-field
    Ontology term identifier - the CURIE for an ontology term. It differs from the standard GA4GH schema&#39;s :ref:\`id \` in that it is a CURIE pointing to an information resource outside of the scope of the schema or its resource implementation.
    """
    termURI: String

    """
    @original-field
    
    """
    referenceset_ID: String

    """
    @original-field
    
    """
    reference_ID: String

    referenceset(search: searchReferencesetInput): referenceset
  reference(search: searchReferenceInput): reference
    
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type SpeciesConnection{
  edges: [SpeciesEdge]
  species: [species]
  pageInfo: pageInfo!
}

type SpeciesEdge{
  cursor: String!
  node: species!
}

  enum speciesField {
    speciesDbId
    term
    termURI
    referenceset_ID
    reference_ID
  }
  
  input searchSpeciesInput {
    field: speciesField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchSpeciesInput]
  }

  input orderSpeciesInput{
    field: speciesField
    order: Order
  }



  type Query {
    species(search: searchSpeciesInput, order: [ orderSpeciesInput ], pagination: paginationInput! ): [species]
    readOneSpecies(speciesDbId: ID!): species
    countSpecies(search: searchSpeciesInput ): Int
    csvTableTemplateSpecies: [String]
    speciesConnection(search:searchSpeciesInput, order: [ orderSpeciesInput ], pagination: paginationCursorInput! ): SpeciesConnection
    validateSpeciesForCreation(speciesDbId: ID!, term: String, termURI: String, referenceset_ID: String, reference_ID: String , addReferenceset:ID, addReference:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateSpeciesForUpdating(speciesDbId: ID!, term: String, termURI: String, referenceset_ID: String, reference_ID: String , addReferenceset:ID, removeReferenceset:ID , addReference:ID, removeReference:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateSpeciesForDeletion(speciesDbId: ID!): Boolean!
    validateSpeciesAfterReading(speciesDbId: ID!): Boolean!
    """
    speciesZendroDefinition would return the static Zendro data model definition
    """
    speciesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addSpecies(speciesDbId: ID!, term: String, termURI: String, referenceset_ID: String, reference_ID: String , addReferenceset:ID, addReference:ID   , skipAssociationsExistenceChecks:Boolean = false): species!
    updateSpecies(speciesDbId: ID!, term: String, termURI: String, referenceset_ID: String, reference_ID: String , addReferenceset:ID, removeReferenceset:ID , addReference:ID, removeReference:ID    , skipAssociationsExistenceChecks:Boolean = false): species!
    deleteSpecies(speciesDbId: ID!): String!
      }
`;