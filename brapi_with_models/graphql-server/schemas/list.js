module.exports = `
  type list{
    """
    @original-field
    """
    listDbId: ID
    """
    @original-field
    
    """
    additionalInfo_IDs: [String]

    """
    @original-field
    The array of DbIds of the BrAPI objects contained in a List
    """
    data: [String]

    """
    @original-field
    Timestamp when the entity was first created
    """
    dateCreated: String

    """
    @original-field
    Timestamp when the entity was last updated
    """
    dateModified: String

    """
    @original-field
    
    """
    externalReferences_IDs: [String]

    """
    @original-field
    Description of a List
    """
    listDescription: String

    """
    @original-field
    Human readable name of a List
    """
    listName: String

    """
    @original-field
    Human readable name of a List Owner. (usually a user or person)
    """
    listOwnerName: String

    """
    @original-field
    
    """
    listOwnerPerson_ID: String

    """
    @original-field
    The number of elements in a List
    """
    listSize: Int

    """
    @original-field
    The description of where a List originated from
    """
    listSource: String

    """
    @original-field
    A flag to indicate the type of objects that are referenced in a List
    """
    listType: String

    listOwnerPerson(search: searchPersonInput): person
    
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
type ListConnection{
  edges: [ListEdge]
  lists: [list]
  pageInfo: pageInfo!
}

type ListEdge{
  cursor: String!
  node: list!
}

  enum listField {
    listDbId
    additionalInfo_IDs
    data
    dateCreated
    dateModified
    externalReferences_IDs
    listDescription
    listName
    listOwnerName
    listOwnerPerson_ID
    listSize
    listSource
    listType
  }
  
  input searchListInput {
    field: listField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchListInput]
  }

  input orderListInput{
    field: listField
    order: Order
  }



  type Query {
    lists(search: searchListInput, order: [ orderListInput ], pagination: paginationInput! ): [list]
    readOneList(listDbId: ID!): list
    countLists(search: searchListInput ): Int
    csvTableTemplateList: [String]
    listsConnection(search:searchListInput, order: [ orderListInput ], pagination: paginationCursorInput! ): ListConnection
    validateListForCreation(listDbId: ID!, additionalInfo_IDs: [String], data: [String], dateCreated: String, dateModified: String, externalReferences_IDs: [String], listDescription: String, listName: String, listOwnerName: String, listOwnerPerson_ID: String, listSize: Int, listSource: String, listType: String , addListOwnerPerson:ID  , addAdditionalInfo:[ID], addExternalReferences:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateListForUpdating(listDbId: ID!, additionalInfo_IDs: [String], data: [String], dateCreated: String, dateModified: String, externalReferences_IDs: [String], listDescription: String, listName: String, listOwnerName: String, listOwnerPerson_ID: String, listSize: Int, listSource: String, listType: String , addListOwnerPerson:ID, removeListOwnerPerson:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateListForDeletion(listDbId: ID!): Boolean!
    validateListAfterReading(listDbId: ID!): Boolean!
    """
    listsZendroDefinition would return the static Zendro data model definition
    """
    listsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addList(listDbId: ID!, additionalInfo_IDs: [String], data: [String], dateCreated: String, dateModified: String, externalReferences_IDs: [String], listDescription: String, listName: String, listOwnerName: String, listOwnerPerson_ID: String, listSize: Int, listSource: String, listType: String , addListOwnerPerson:ID  , addAdditionalInfo:[ID], addExternalReferences:[ID] , skipAssociationsExistenceChecks:Boolean = false): list!
    updateList(listDbId: ID!, additionalInfo_IDs: [String], data: [String], dateCreated: String, dateModified: String, externalReferences_IDs: [String], listDescription: String, listName: String, listOwnerName: String, listOwnerPerson_ID: String, listSize: Int, listSource: String, listType: String , addListOwnerPerson:ID, removeListOwnerPerson:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID]  , skipAssociationsExistenceChecks:Boolean = false): list!
    deleteList(listDbId: ID!): String!
      }
`;