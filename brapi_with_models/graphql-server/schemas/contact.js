module.exports = `
  type contact{
    """
    @original-field
    """
    contactDbId: ID
    """
    @original-field
    The contacts email address

MIAPPE V1.1 (DM-32) Person email - The electronic mail address of the person.
    """
    email: String

    """
    @original-field
    The name of the institution which this contact is part of

MIAPPE V1.1 (DM-35) Person affiliation - The institution the person belongs to
    """
    instituteName: String

    """
    @original-field
    The full name of this contact person

MIAPPE V1.1 (DM-31) Person name - The name of the person (either full name or as used in scientific publications)
    """
    name: String

    """
    @original-field
    The Open Researcher and Contributor ID for this contact person (orcid.org)

MIAPPE V1.1 (DM-33) Person ID - An identifier for the data submitter. If that submitter is an individual, ORCID identifiers are recommended.
    """
    orcid: String

    """
    @original-field
    The type of person this contact represents (ex: Coordinator, Scientist, PI, etc.)

MIAPPE V1.1 (DM-34) Person role - Type of contribution of the person to the investigation
    """
    type: String

    """
    @original-field
    
    """
    study_ID: String

    """
    @original-field
    
    """
    trial_ID: String

    study(search: searchStudyInput): study
  trial(search: searchTrialInput): trial
    
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type ContactConnection{
  edges: [ContactEdge]
  contacts: [contact]
  pageInfo: pageInfo!
}

type ContactEdge{
  cursor: String!
  node: contact!
}

  enum contactField {
    contactDbId
    email
    instituteName
    name
    orcid
    type
    study_ID
    trial_ID
  }
  
  input searchContactInput {
    field: contactField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchContactInput]
  }

  input orderContactInput{
    field: contactField
    order: Order
  }



  type Query {
    contacts(search: searchContactInput, order: [ orderContactInput ], pagination: paginationInput! ): [contact]
    readOneContact(contactDbId: ID!): contact
    countContacts(search: searchContactInput ): Int
    csvTableTemplateContact: [String]
    contactsConnection(search:searchContactInput, order: [ orderContactInput ], pagination: paginationCursorInput! ): ContactConnection
    validateContactForCreation(contactDbId: ID!, email: String, instituteName: String, name: String, orcid: String, type: String, study_ID: String, trial_ID: String , addStudy:ID, addTrial:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateContactForUpdating(contactDbId: ID!, email: String, instituteName: String, name: String, orcid: String, type: String, study_ID: String, trial_ID: String , addStudy:ID, removeStudy:ID , addTrial:ID, removeTrial:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateContactForDeletion(contactDbId: ID!): Boolean!
    validateContactAfterReading(contactDbId: ID!): Boolean!
    """
    contactsZendroDefinition would return the static Zendro data model definition
    """
    contactsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addContact(contactDbId: ID!, email: String, instituteName: String, name: String, orcid: String, type: String, study_ID: String, trial_ID: String , addStudy:ID, addTrial:ID   , skipAssociationsExistenceChecks:Boolean = false): contact!
    updateContact(contactDbId: ID!, email: String, instituteName: String, name: String, orcid: String, type: String, study_ID: String, trial_ID: String , addStudy:ID, removeStudy:ID , addTrial:ID, removeTrial:ID    , skipAssociationsExistenceChecks:Boolean = false): contact!
    deleteContact(contactDbId: ID!): String!
      }
`;