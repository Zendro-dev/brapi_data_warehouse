module.exports = `
  type imagelocation{
    """
    @original-field
    """
    imageLocationDbId: ID
    """
    @original-field
    A free space containing any additional information related to a coordinate.
    """
    geometry: String

    """
    @original-field
    The literal string &#34;Feature&#34;
    """
    type: String

    """
    @original-field
    
    """
    images_IDs: [String]

      
    """
    @search-request
    """
    imagesFilter(search: searchImageInput, order: [ orderImageInput ], pagination: paginationInput!): [image]


    """
    @search-request
    """
    imagesConnection(search: searchImageInput, order: [ orderImageInput ], pagination: paginationCursorInput!): ImageConnection

    """
    @count-request
    """
    countFilteredImages(search: searchImageInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type ImagelocationConnection{
  edges: [ImagelocationEdge]
  imagelocations: [imagelocation]
  pageInfo: pageInfo!
}

type ImagelocationEdge{
  cursor: String!
  node: imagelocation!
}

  enum imagelocationField {
    imageLocationDbId
    geometry
    type
    images_IDs
  }
  
  input searchImagelocationInput {
    field: imagelocationField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchImagelocationInput]
  }

  input orderImagelocationInput{
    field: imagelocationField
    order: Order
  }



  type Query {
    imagelocations(search: searchImagelocationInput, order: [ orderImagelocationInput ], pagination: paginationInput! ): [imagelocation]
    readOneImagelocation(imageLocationDbId: ID!): imagelocation
    countImagelocations(search: searchImagelocationInput ): Int
    csvTableTemplateImagelocation: [String]
    imagelocationsConnection(search:searchImagelocationInput, order: [ orderImagelocationInput ], pagination: paginationCursorInput! ): ImagelocationConnection
    validateImagelocationForCreation(imageLocationDbId: ID!, geometry: String, type: String, images_IDs: [String]   , addImages:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateImagelocationForUpdating(imageLocationDbId: ID!, geometry: String, type: String, images_IDs: [String]   , addImages:[ID], removeImages:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateImagelocationForDeletion(imageLocationDbId: ID!): Boolean!
    validateImagelocationAfterReading(imageLocationDbId: ID!): Boolean!
    """
    imagelocationsZendroDefinition would return the static Zendro data model definition
    """
    imagelocationsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addImagelocation(imageLocationDbId: ID!, geometry: String, type: String, images_IDs: [String]   , addImages:[ID] , skipAssociationsExistenceChecks:Boolean = false): imagelocation!
    updateImagelocation(imageLocationDbId: ID!, geometry: String, type: String, images_IDs: [String]   , addImages:[ID], removeImages:[ID]  , skipAssociationsExistenceChecks:Boolean = false): imagelocation!
    deleteImagelocation(imageLocationDbId: ID!): String!
      }
`;