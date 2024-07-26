module.exports = `
  type image{
    """
    @original-field
    """
    imageDbId: ID
    """
    @original-field
    The copyright information of this image. Example &#39;Copyright 2018 Bob Robertson&#39;
    """
    copyright: String

    """
    @original-field
    The human readable description of an image.
    """
    description: String

    """
    @original-field
    A list of terms to formally describe the image. Each item could be a simple Tag, an Ontology reference Id, or a full ontology URL.
    """
    descriptiveOntologyTerms: [String]

    """
    @original-field
    The name of the image file. Might be the same as &#39;imageName&#39;, but could be different.
    """
    imageFileName: String

    """
    @original-field
    The size of the image in Bytes.
    """
    imageFileSize: Int

    """
    @original-field
    The height of the image in Pixels.
    """
    imageHeight: Int

    """
    @original-field
    The human readable name of an image. Might be the same as &#39;imageFileName&#39;, but could be different.
    """
    imageName: String

    """
    @original-field
    The date and time the image was taken
    """
    imageTimeStamp: String

    """
    @original-field
    The complete, absolute URI path to the image file. Images might be stored on a different host or path than the BrAPI web server.
    """
    imageURL: String

    """
    @original-field
    The width of the image in Pixels.
    """
    imageWidth: Int

    """
    @original-field
    The file type of the image. Examples &#39;image/jpeg&#39;, &#39;image/png&#39;, &#39;image/svg&#39;, etc
    """
    mimeType: String

    """
    @original-field
    
    """
    observationUnit_ID: String

    """
    @original-field
    
    """
    observations_IDs: [String]

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
    imageLocation_ID: String

    observationUnit(search: searchObservationunitInput): observationunit
  imageLocation(search: searchImagelocationInput): imagelocation
    
    """
    @search-request
    """
    observationsFilter(search: searchObservationInput, order: [ orderObservationInput ], pagination: paginationInput!): [observation]


    """
    @search-request
    """
    observationsConnection(search: searchObservationInput, order: [ orderObservationInput ], pagination: paginationCursorInput!): ObservationConnection

    """
    @count-request
    """
    countFilteredObservations(search: searchObservationInput) : Int
  
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
type ImageConnection{
  edges: [ImageEdge]
  images: [image]
  pageInfo: pageInfo!
}

type ImageEdge{
  cursor: String!
  node: image!
}

  enum imageField {
    imageDbId
    copyright
    description
    descriptiveOntologyTerms
    imageFileName
    imageFileSize
    imageHeight
    imageName
    imageTimeStamp
    imageURL
    imageWidth
    mimeType
    observationUnit_ID
    observations_IDs
    additionalInfo_IDs
    externalReferences_IDs
    imageLocation_ID
  }
  
  input searchImageInput {
    field: imageField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchImageInput]
  }

  input orderImageInput{
    field: imageField
    order: Order
  }



  type Query {
    images(search: searchImageInput, order: [ orderImageInput ], pagination: paginationInput! ): [image]
    readOneImage(imageDbId: ID!): image
    countImages(search: searchImageInput ): Int
    csvTableTemplateImage: [String]
    imagesConnection(search:searchImageInput, order: [ orderImageInput ], pagination: paginationCursorInput! ): ImageConnection
    validateImageForCreation(imageDbId: ID!, copyright: String, description: String, descriptiveOntologyTerms: [String], imageFileName: String, imageFileSize: Int, imageHeight: Int, imageName: String, imageTimeStamp: String, imageURL: String, imageWidth: Int, mimeType: String, observationUnit_ID: String, additionalInfo_IDs: [String], externalReferences_IDs: [String], imageLocation_ID: String , addObservationUnit:ID, addImageLocation:ID  , addObservations:[ID], addAdditionalInfo:[ID], addExternalReferences:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateImageForUpdating(imageDbId: ID!, copyright: String, description: String, descriptiveOntologyTerms: [String], imageFileName: String, imageFileSize: Int, imageHeight: Int, imageName: String, imageTimeStamp: String, imageURL: String, imageWidth: Int, mimeType: String, observationUnit_ID: String, additionalInfo_IDs: [String], externalReferences_IDs: [String], imageLocation_ID: String , addObservationUnit:ID, removeObservationUnit:ID , addImageLocation:ID, removeImageLocation:ID   , addObservations:[ID], removeObservations:[ID] , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateImageForDeletion(imageDbId: ID!): Boolean!
    validateImageAfterReading(imageDbId: ID!): Boolean!
    """
    imagesZendroDefinition would return the static Zendro data model definition
    """
    imagesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addImage(imageDbId: ID!, copyright: String, description: String, descriptiveOntologyTerms: [String], imageFileName: String, imageFileSize: Int, imageHeight: Int, imageName: String, imageTimeStamp: String, imageURL: String, imageWidth: Int, mimeType: String, observationUnit_ID: String, additionalInfo_IDs: [String], externalReferences_IDs: [String], imageLocation_ID: String , addObservationUnit:ID, addImageLocation:ID  , addObservations:[ID], addAdditionalInfo:[ID], addExternalReferences:[ID] , skipAssociationsExistenceChecks:Boolean = false): image!
    updateImage(imageDbId: ID!, copyright: String, description: String, descriptiveOntologyTerms: [String], imageFileName: String, imageFileSize: Int, imageHeight: Int, imageName: String, imageTimeStamp: String, imageURL: String, imageWidth: Int, mimeType: String, observationUnit_ID: String, additionalInfo_IDs: [String], externalReferences_IDs: [String], imageLocation_ID: String , addObservationUnit:ID, removeObservationUnit:ID , addImageLocation:ID, removeImageLocation:ID   , addObservations:[ID], removeObservations:[ID] , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID]  , skipAssociationsExistenceChecks:Boolean = false): image!
    deleteImage(imageDbId: ID!): String!
      }
`;