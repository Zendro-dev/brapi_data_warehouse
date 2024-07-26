module.exports = `
  type category{
    """
    @original-field
    """
    categoryDbId: ID
    """
    @original-field
    A text label for a category
    """
    label: String

    """
    @original-field
    The actual value for a category
    """
    value: String

    """
    @original-field
    
    """
    validValues_IDs: [String]

      
    """
    @search-request
    """
    validValuesFilter(search: searchValidvalueInput, order: [ orderValidvalueInput ], pagination: paginationInput!): [validvalue]


    """
    @search-request
    """
    validValuesConnection(search: searchValidvalueInput, order: [ orderValidvalueInput ], pagination: paginationCursorInput!): ValidvalueConnection

    """
    @count-request
    """
    countFilteredValidValues(search: searchValidvalueInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type CategoryConnection{
  edges: [CategoryEdge]
  categories: [category]
  pageInfo: pageInfo!
}

type CategoryEdge{
  cursor: String!
  node: category!
}

  enum categoryField {
    categoryDbId
    label
    value
    validValues_IDs
  }
  
  input searchCategoryInput {
    field: categoryField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchCategoryInput]
  }

  input orderCategoryInput{
    field: categoryField
    order: Order
  }



  type Query {
    categories(search: searchCategoryInput, order: [ orderCategoryInput ], pagination: paginationInput! ): [category]
    readOneCategory(categoryDbId: ID!): category
    countCategories(search: searchCategoryInput ): Int
    csvTableTemplateCategory: [String]
    categoriesConnection(search:searchCategoryInput, order: [ orderCategoryInput ], pagination: paginationCursorInput! ): CategoryConnection
    validateCategoryForCreation(categoryDbId: ID!, label: String, value: String   , addValidValues:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateCategoryForUpdating(categoryDbId: ID!, label: String, value: String   , addValidValues:[ID], removeValidValues:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateCategoryForDeletion(categoryDbId: ID!): Boolean!
    validateCategoryAfterReading(categoryDbId: ID!): Boolean!
    """
    categoriesZendroDefinition would return the static Zendro data model definition
    """
    categoriesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addCategory(categoryDbId: ID!, label: String, value: String   , addValidValues:[ID] , skipAssociationsExistenceChecks:Boolean = false): category!
    updateCategory(categoryDbId: ID!, label: String, value: String   , addValidValues:[ID], removeValidValues:[ID]  , skipAssociationsExistenceChecks:Boolean = false): category!
    deleteCategory(categoryDbId: ID!): String!
      }
`;