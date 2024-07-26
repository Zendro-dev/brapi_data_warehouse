module.exports = `
  type person{
    """
    @original-field
    """
    personDbId: ID
    """
    @original-field
    
    """
    additionalInfo_IDs: [String]

    """
    @original-field
    description of this person
    """
    description: String

    """
    @original-field
    email address for this person
    """
    emailAddress: String

    """
    @original-field
    
    """
    externalReferences_IDs: [String]

    """
    @original-field
    Persons first name
    """
    firstName: String

    """
    @original-field
    Persons last name
    """
    lastName: String

    """
    @original-field
    physical address of this person
    """
    mailingAddress: String

    """
    @original-field
    Persons middle name
    """
    middleName: String

    """
    @original-field
    phone number of this person
    """
    phoneNumber: String

    """
    @original-field
    A systems user ID associated with this person. Different from personDbId because you could have a person who is not a user of the system.
    """
    userID: String

    """
    @original-field
    
    """
    lists_IDs: [String]

    """
    @original-field
    
    """
    programs_IDs: [String]

      
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
    @search-request
    """
    listsFilter(search: searchListInput, order: [ orderListInput ], pagination: paginationInput!): [list]


    """
    @search-request
    """
    listsConnection(search: searchListInput, order: [ orderListInput ], pagination: paginationCursorInput!): ListConnection

    """
    @count-request
    """
    countFilteredLists(search: searchListInput) : Int
  
    """
    @search-request
    """
    programsFilter(search: searchProgramInput, order: [ orderProgramInput ], pagination: paginationInput!): [program]


    """
    @search-request
    """
    programsConnection(search: searchProgramInput, order: [ orderProgramInput ], pagination: paginationCursorInput!): ProgramConnection

    """
    @count-request
    """
    countFilteredPrograms(search: searchProgramInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type PersonConnection{
  edges: [PersonEdge]
  people: [person]
  pageInfo: pageInfo!
}

type PersonEdge{
  cursor: String!
  node: person!
}

  enum personField {
    personDbId
    additionalInfo_IDs
    description
    emailAddress
    externalReferences_IDs
    firstName
    lastName
    mailingAddress
    middleName
    phoneNumber
    userID
    lists_IDs
    programs_IDs
  }
  
  input searchPersonInput {
    field: personField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchPersonInput]
  }

  input orderPersonInput{
    field: personField
    order: Order
  }



  type Query {
    people(search: searchPersonInput, order: [ orderPersonInput ], pagination: paginationInput! ): [person]
    readOnePerson(personDbId: ID!): person
    countPeople(search: searchPersonInput ): Int
    csvTableTemplatePerson: [String]
    peopleConnection(search:searchPersonInput, order: [ orderPersonInput ], pagination: paginationCursorInput! ): PersonConnection
    validatePersonForCreation(personDbId: ID!, additionalInfo_IDs: [String], description: String, emailAddress: String, externalReferences_IDs: [String], firstName: String, lastName: String, mailingAddress: String, middleName: String, phoneNumber: String, userID: String, lists_IDs: [String], programs_IDs: [String]   , addAdditionalInfo:[ID], addExternalReferences:[ID], addLists:[ID], addPrograms:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validatePersonForUpdating(personDbId: ID!, additionalInfo_IDs: [String], description: String, emailAddress: String, externalReferences_IDs: [String], firstName: String, lastName: String, mailingAddress: String, middleName: String, phoneNumber: String, userID: String, lists_IDs: [String], programs_IDs: [String]   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addLists:[ID], removeLists:[ID] , addPrograms:[ID], removePrograms:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validatePersonForDeletion(personDbId: ID!): Boolean!
    validatePersonAfterReading(personDbId: ID!): Boolean!
    """
    peopleZendroDefinition would return the static Zendro data model definition
    """
    peopleZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addPerson(personDbId: ID!, additionalInfo_IDs: [String], description: String, emailAddress: String, externalReferences_IDs: [String], firstName: String, lastName: String, mailingAddress: String, middleName: String, phoneNumber: String, userID: String, lists_IDs: [String], programs_IDs: [String]   , addAdditionalInfo:[ID], addExternalReferences:[ID], addLists:[ID], addPrograms:[ID] , skipAssociationsExistenceChecks:Boolean = false): person!
    updatePerson(personDbId: ID!, additionalInfo_IDs: [String], description: String, emailAddress: String, externalReferences_IDs: [String], firstName: String, lastName: String, mailingAddress: String, middleName: String, phoneNumber: String, userID: String, lists_IDs: [String], programs_IDs: [String]   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addLists:[ID], removeLists:[ID] , addPrograms:[ID], removePrograms:[ID]  , skipAssociationsExistenceChecks:Boolean = false): person!
    deletePerson(personDbId: ID!): String!
      }
`;