module.exports = `
  type validvalue{
    """
    @original-field
    """
    validValueDbId: ID
    """
    @original-field
    Maximum value for numerical, date, and time scales. Typically used for data capture control and QC.
    """
    maximumValue: String

    """
    @original-field
    Minimum value for numerical, date, and time scales. Typically used for data capture control and QC.
    """
    minimumValue: String

    """
    @original-field
    
    """
    categories_IDs: [String]

    """
    @original-field
    
    """
    scales_IDs: [String]

      
    """
    @search-request
    """
    categoriesFilter(search: searchCategoryInput, order: [ orderCategoryInput ], pagination: paginationInput!): [category]


    """
    @search-request
    """
    categoriesConnection(search: searchCategoryInput, order: [ orderCategoryInput ], pagination: paginationCursorInput!): CategoryConnection

    """
    @count-request
    """
    countFilteredCategories(search: searchCategoryInput) : Int
  
    """
    @search-request
    """
    scalesFilter(search: searchScaleInput, order: [ orderScaleInput ], pagination: paginationInput!): [scale]


    """
    @search-request
    """
    scalesConnection(search: searchScaleInput, order: [ orderScaleInput ], pagination: paginationCursorInput!): ScaleConnection

    """
    @count-request
    """
    countFilteredScales(search: searchScaleInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type ValidvalueConnection{
  edges: [ValidvalueEdge]
  validvalues: [validvalue]
  pageInfo: pageInfo!
}

type ValidvalueEdge{
  cursor: String!
  node: validvalue!
}

  enum validvalueField {
    validValueDbId
    maximumValue
    minimumValue
    categories_IDs
    scales_IDs
  }
  
  input searchValidvalueInput {
    field: validvalueField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchValidvalueInput]
  }

  input orderValidvalueInput{
    field: validvalueField
    order: Order
  }



  type Query {
    validvalues(search: searchValidvalueInput, order: [ orderValidvalueInput ], pagination: paginationInput! ): [validvalue]
    readOneValidvalue(validValueDbId: ID!): validvalue
    countValidvalues(search: searchValidvalueInput ): Int
    csvTableTemplateValidvalue: [String]
    validvaluesConnection(search:searchValidvalueInput, order: [ orderValidvalueInput ], pagination: paginationCursorInput! ): ValidvalueConnection
    validateValidvalueForCreation(validValueDbId: ID!, maximumValue: String, minimumValue: String, scales_IDs: [String]   , addCategories:[ID], addScales:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateValidvalueForUpdating(validValueDbId: ID!, maximumValue: String, minimumValue: String, scales_IDs: [String]   , addCategories:[ID], removeCategories:[ID] , addScales:[ID], removeScales:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateValidvalueForDeletion(validValueDbId: ID!): Boolean!
    validateValidvalueAfterReading(validValueDbId: ID!): Boolean!
    """
    validvaluesZendroDefinition would return the static Zendro data model definition
    """
    validvaluesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addValidvalue(validValueDbId: ID!, maximumValue: String, minimumValue: String, scales_IDs: [String]   , addCategories:[ID], addScales:[ID] , skipAssociationsExistenceChecks:Boolean = false): validvalue!
    updateValidvalue(validValueDbId: ID!, maximumValue: String, minimumValue: String, scales_IDs: [String]   , addCategories:[ID], removeCategories:[ID] , addScales:[ID], removeScales:[ID]  , skipAssociationsExistenceChecks:Boolean = false): validvalue!
    deleteValidvalue(validValueDbId: ID!): String!
      }
`;