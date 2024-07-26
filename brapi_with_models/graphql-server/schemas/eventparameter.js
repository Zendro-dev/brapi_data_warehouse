module.exports = `
  type eventparameter{
    """
    @original-field
    """
    eventParameterDbId: ID
    """
    @original-field
    The shortened code name of an event parameter
&lt;br&gt;ICASA &#34;Code_Display&#34;
    """
    code: String

    """
    @original-field
    A human readable description of this event parameter. This description is usually associated with the &#39;name&#39; and &#39;code&#39; of an event parameter.
    """
    description: String

    """
    @original-field
    The full name of an event parameter
&lt;br&gt;ICASA &#34;Variable_Name&#34;
    """
    name: String

    """
    @original-field
    The units or data type of the &#39;value&#39;. 
&lt;br&gt;If the &#39;value&#39; comes from a standardized vocabulary or an encoded list of values, then &#39;unit&#39; should be &#39;code&#39;. 
&lt;br&gt;If the &#39;value&#39; IS NOT a number, then &#39;unit&#39; should specify a data type eg. &#39;text&#39;, &#39;boolean&#39;, &#39;date&#39;, etc. 
&lt;br&gt;If the value IS a number, then &#39;unit&#39; should specify the units used eg. &#39;ml&#39;, &#39;cm&#39;, etc
&lt;br&gt;ICASA &#34;Unit_or_type&#34;
    """
    units: String

    """
    @original-field
    The single value of this event parameter. This single value is accurate for all the dates in the date range. If &#39;value&#39; is populated then &#39;valuesByDate&#39; should NOT be populated.
    """
    value: String

    """
    @original-field
    If the event parameter &#39;unit&#39; field is &#39;code&#39;, then use &#39;valueDescription&#39; to add a human readable description to the value.
    """
    valueDescription: String

    """
    @original-field
    An array of values corresponding to each timestamp in the &#39;discreteDates&#39; array of this event. The &#39;valuesByDate&#39; array should exactly match the size of the &#39;discreteDates&#39; array. If &#39;valuesByDate&#39; is populated then &#39;value&#39; should NOT be populated.
    """
    valuesByDate: [String]

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
type EventparameterConnection{
  edges: [EventparameterEdge]
  eventparameters: [eventparameter]
  pageInfo: pageInfo!
}

type EventparameterEdge{
  cursor: String!
  node: eventparameter!
}

  enum eventparameterField {
    eventParameterDbId
    code
    description
    name
    units
    value
    valueDescription
    valuesByDate
    event_ID
  }
  
  input searchEventparameterInput {
    field: eventparameterField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchEventparameterInput]
  }

  input orderEventparameterInput{
    field: eventparameterField
    order: Order
  }



  type Query {
    eventparameters(search: searchEventparameterInput, order: [ orderEventparameterInput ], pagination: paginationInput! ): [eventparameter]
    readOneEventparameter(eventParameterDbId: ID!): eventparameter
    countEventparameters(search: searchEventparameterInput ): Int
    csvTableTemplateEventparameter: [String]
    eventparametersConnection(search:searchEventparameterInput, order: [ orderEventparameterInput ], pagination: paginationCursorInput! ): EventparameterConnection
    validateEventparameterForCreation(eventParameterDbId: ID!, code: String, description: String, name: String, units: String, value: String, valueDescription: String, valuesByDate: [String], event_ID: String , addEvent:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateEventparameterForUpdating(eventParameterDbId: ID!, code: String, description: String, name: String, units: String, value: String, valueDescription: String, valuesByDate: [String], event_ID: String , addEvent:ID, removeEvent:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateEventparameterForDeletion(eventParameterDbId: ID!): Boolean!
    validateEventparameterAfterReading(eventParameterDbId: ID!): Boolean!
    """
    eventparametersZendroDefinition would return the static Zendro data model definition
    """
    eventparametersZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addEventparameter(eventParameterDbId: ID!, code: String, description: String, name: String, units: String, value: String, valueDescription: String, valuesByDate: [String], event_ID: String , addEvent:ID   , skipAssociationsExistenceChecks:Boolean = false): eventparameter!
    updateEventparameter(eventParameterDbId: ID!, code: String, description: String, name: String, units: String, value: String, valueDescription: String, valuesByDate: [String], event_ID: String , addEvent:ID, removeEvent:ID    , skipAssociationsExistenceChecks:Boolean = false): eventparameter!
    deleteEventparameter(eventParameterDbId: ID!): String!
      }
`;