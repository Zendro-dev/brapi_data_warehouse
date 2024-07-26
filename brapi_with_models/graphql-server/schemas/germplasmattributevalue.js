module.exports = `
  type germplasmattributevalue{
    """
    @original-field
    """
    germplasmAttributeValueDbId: ID
    """
    @original-field
    
    """
    attribute_IDs: [String]

    """
    @original-field
    The date the value of this attribute was determined for a given germplasm
    """
    determinedDate: String

    """
    @original-field
    
    """
    germplasm_ID: String

    """
    @original-field
    The value of this attribute for a given germplasm
    """
    value: String

    """
    @original-field
    
    """
    additionalInfo_IDs: [String]

    """
    @original-field
    
    """
    externalReferences_IDs: [String]

    germplasm(search: searchGermplasmInput): germplasm
    
    """
    @search-request
    """
    attributeFilter(search: searchGermplasmattributeInput, order: [ orderGermplasmattributeInput ], pagination: paginationInput!): [germplasmattribute]


    """
    @search-request
    """
    attributeConnection(search: searchGermplasmattributeInput, order: [ orderGermplasmattributeInput ], pagination: paginationCursorInput!): GermplasmattributeConnection

    """
    @count-request
    """
    countFilteredAttribute(search: searchGermplasmattributeInput) : Int
  
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
type GermplasmattributevalueConnection{
  edges: [GermplasmattributevalueEdge]
  germplasmattributevalues: [germplasmattributevalue]
  pageInfo: pageInfo!
}

type GermplasmattributevalueEdge{
  cursor: String!
  node: germplasmattributevalue!
}

  enum germplasmattributevalueField {
    germplasmAttributeValueDbId
    attribute_IDs
    determinedDate
    germplasm_ID
    value
    additionalInfo_IDs
    externalReferences_IDs
  }
  
  input searchGermplasmattributevalueInput {
    field: germplasmattributevalueField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchGermplasmattributevalueInput]
  }

  input orderGermplasmattributevalueInput{
    field: germplasmattributevalueField
    order: Order
  }



  type Query {
    germplasmattributevalues(search: searchGermplasmattributevalueInput, order: [ orderGermplasmattributevalueInput ], pagination: paginationInput! ): [germplasmattributevalue]
    readOneGermplasmattributevalue(germplasmAttributeValueDbId: ID!): germplasmattributevalue
    countGermplasmattributevalues(search: searchGermplasmattributevalueInput ): Int
    csvTableTemplateGermplasmattributevalue: [String]
    germplasmattributevaluesConnection(search:searchGermplasmattributevalueInput, order: [ orderGermplasmattributevalueInput ], pagination: paginationCursorInput! ): GermplasmattributevalueConnection
    validateGermplasmattributevalueForCreation(germplasmAttributeValueDbId: ID!, determinedDate: String, germplasm_ID: String, value: String, additionalInfo_IDs: [String], externalReferences_IDs: [String] , addGermplasm:ID  , addAttribute:[ID], addAdditionalInfo:[ID], addExternalReferences:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateGermplasmattributevalueForUpdating(germplasmAttributeValueDbId: ID!, determinedDate: String, germplasm_ID: String, value: String, additionalInfo_IDs: [String], externalReferences_IDs: [String] , addGermplasm:ID, removeGermplasm:ID   , addAttribute:[ID], removeAttribute:[ID] , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateGermplasmattributevalueForDeletion(germplasmAttributeValueDbId: ID!): Boolean!
    validateGermplasmattributevalueAfterReading(germplasmAttributeValueDbId: ID!): Boolean!
    """
    germplasmattributevaluesZendroDefinition would return the static Zendro data model definition
    """
    germplasmattributevaluesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addGermplasmattributevalue(germplasmAttributeValueDbId: ID!, determinedDate: String, germplasm_ID: String, value: String, additionalInfo_IDs: [String], externalReferences_IDs: [String] , addGermplasm:ID  , addAttribute:[ID], addAdditionalInfo:[ID], addExternalReferences:[ID] , skipAssociationsExistenceChecks:Boolean = false): germplasmattributevalue!
    updateGermplasmattributevalue(germplasmAttributeValueDbId: ID!, determinedDate: String, germplasm_ID: String, value: String, additionalInfo_IDs: [String], externalReferences_IDs: [String] , addGermplasm:ID, removeGermplasm:ID   , addAttribute:[ID], removeAttribute:[ID] , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID]  , skipAssociationsExistenceChecks:Boolean = false): germplasmattributevalue!
    deleteGermplasmattributevalue(germplasmAttributeValueDbId: ID!): String!
      }
`;