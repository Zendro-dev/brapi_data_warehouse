module.exports = `
  type eventdaterange{
    """
    @original-field
    """
    eventDateRangeDbId: ID
    """
    @original-field
    A list of dates when the event occurred
&lt;br/&gt;MIAPPE V1.1 (DM-68) Event date - Date and time of the event.
    """
    discreteDates: [String]

    """
    @original-field
    The end of a continous or regularly repetitive event
&lt;br/&gt;MIAPPE V1.1 (DM-68) Event date - Date and time of the event.
    """
    endDate: String

    """
    @original-field
    The begining of a continous or regularly repetitive event
&lt;br/&gt;MIAPPE V1.1 (DM-68) Event date - Date and time of the event.
    """
    startDate: String

    """
    @original-field
    
    """
    event_ID: String

    event(search: searchEventInput): event
    
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type EventdaterangeConnection{
  edges: [EventdaterangeEdge]
  eventdateranges: [eventdaterange]
  pageInfo: pageInfo!
}

type EventdaterangeEdge{
  cursor: String!
  node: eventdaterange!
}

  enum eventdaterangeField {
    eventDateRangeDbId
    discreteDates
    endDate
    startDate
    event_ID
  }
  
  input searchEventdaterangeInput {
    field: eventdaterangeField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchEventdaterangeInput]
  }

  input orderEventdaterangeInput{
    field: eventdaterangeField
    order: Order
  }



  type Query {
    eventdateranges(search: searchEventdaterangeInput, order: [ orderEventdaterangeInput ], pagination: paginationInput! ): [eventdaterange]
    readOneEventdaterange(eventDateRangeDbId: ID!): eventdaterange
    countEventdateranges(search: searchEventdaterangeInput ): Int
    csvTableTemplateEventdaterange: [String]
    eventdaterangesConnection(search:searchEventdaterangeInput, order: [ orderEventdaterangeInput ], pagination: paginationCursorInput! ): EventdaterangeConnection
    validateEventdaterangeForCreation(eventDateRangeDbId: ID!, discreteDates: [String], endDate: String, startDate: String, event_ID: String , addEvent:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateEventdaterangeForUpdating(eventDateRangeDbId: ID!, discreteDates: [String], endDate: String, startDate: String, event_ID: String , addEvent:ID, removeEvent:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateEventdaterangeForDeletion(eventDateRangeDbId: ID!): Boolean!
    validateEventdaterangeAfterReading(eventDateRangeDbId: ID!): Boolean!
    """
    eventdaterangesZendroDefinition would return the static Zendro data model definition
    """
    eventdaterangesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addEventdaterange(eventDateRangeDbId: ID!, discreteDates: [String], endDate: String, startDate: String, event_ID: String , addEvent:ID   , skipAssociationsExistenceChecks:Boolean = false): eventdaterange!
    updateEventdaterange(eventDateRangeDbId: ID!, discreteDates: [String], endDate: String, startDate: String, event_ID: String , addEvent:ID, removeEvent:ID    , skipAssociationsExistenceChecks:Boolean = false): eventdaterange!
    deleteEventdaterange(eventDateRangeDbId: ID!): String!
      }
`;