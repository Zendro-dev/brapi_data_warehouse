module.exports = `
  type event{
    """
    @original-field
    """
    eventDbId: ID
    """
    @original-field
    A detailed, human-readable description of this event
&lt;br/&gt;MIAPPE V1.1 (DM-67) Event description - Description of the event, including details such as amount applied and possibly duration of the event. 
    """
    eventDescription: String

    """
    @original-field
    An identifier for this event type, in the form of an ontology class reference
&lt;br/&gt;ICASA Management events allow for the following types: planting, fertilizer, irrigation, tillage, organic_material, harvest, bed_prep, inorg_mulch, inorg_mul_rem, chemicals, mowing, observation, weeding, puddling, flood_level, other
&lt;br/&gt;MIAPPE V1.1 (DM-66) Event accession number - Accession number of the event type in a suitable controlled vocabulary (Crop Ontology).
    """
    eventType: String

    """
    @original-field
    An identifier for this event type, in the form of an ontology class reference
&lt;br/&gt;ICASA Management events allow for the following types: planting, fertilizer, irrigation, tillage, organic_material, harvest, bed_prep, inorg_mulch, inorg_mul_rem, chemicals, mowing, observation, weeding, puddling, flood_level, other
&lt;br/&gt;MIAPPE V1.1 (DM-66) Event accession number - Accession number of the event type in a suitable controlled vocabulary (Crop Ontology).
    """
    eventTypeDbId: String

    """
    @original-field
    
    """
    observationUnits_IDs: [String]

    """
    @original-field
    
    """
    study_IDs: [String]

    """
    @original-field
    
    """
    additionalInfo_IDs: [String]

    """
    @original-field
    
    """
    eventDateRange_ID: String

    """
    @original-field
    
    """
    eventParameters_IDs: [String]

    eventDateRange(search: searchEventdaterangeInput): eventdaterange
    
    """
    @search-request
    """
    observationUnitsFilter(search: searchObservationunitInput, order: [ orderObservationunitInput ], pagination: paginationInput!): [observationunit]


    """
    @search-request
    """
    observationUnitsConnection(search: searchObservationunitInput, order: [ orderObservationunitInput ], pagination: paginationCursorInput!): ObservationunitConnection

    """
    @count-request
    """
    countFilteredObservationUnits(search: searchObservationunitInput) : Int
  
    """
    @search-request
    """
    studyFilter(search: searchStudyInput, order: [ orderStudyInput ], pagination: paginationInput!): [study]


    """
    @search-request
    """
    studyConnection(search: searchStudyInput, order: [ orderStudyInput ], pagination: paginationCursorInput!): StudyConnection

    """
    @count-request
    """
    countFilteredStudy(search: searchStudyInput) : Int
  
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
    eventParametersFilter(search: searchEventparameterInput, order: [ orderEventparameterInput ], pagination: paginationInput!): [eventparameter]


    """
    @search-request
    """
    eventParametersConnection(search: searchEventparameterInput, order: [ orderEventparameterInput ], pagination: paginationCursorInput!): EventparameterConnection

    """
    @count-request
    """
    countFilteredEventParameters(search: searchEventparameterInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type EventConnection{
  edges: [EventEdge]
  events: [event]
  pageInfo: pageInfo!
}

type EventEdge{
  cursor: String!
  node: event!
}

  enum eventField {
    eventDbId
    eventDescription
    eventType
    eventTypeDbId
    observationUnits_IDs
    study_IDs
    additionalInfo_IDs
    eventDateRange_ID
    eventParameters_IDs
  }
  
  input searchEventInput {
    field: eventField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchEventInput]
  }

  input orderEventInput{
    field: eventField
    order: Order
  }



  type Query {
    events(search: searchEventInput, order: [ orderEventInput ], pagination: paginationInput! ): [event]
    readOneEvent(eventDbId: ID!): event
    countEvents(search: searchEventInput ): Int
    csvTableTemplateEvent: [String]
    eventsConnection(search:searchEventInput, order: [ orderEventInput ], pagination: paginationCursorInput! ): EventConnection
    validateEventForCreation(eventDbId: ID!, eventDescription: String, eventType: String, eventTypeDbId: String, additionalInfo_IDs: [String], eventDateRange_ID: String, eventParameters_IDs: [String] , addEventDateRange:ID  , addObservationUnits:[ID], addStudy:[ID], addAdditionalInfo:[ID], addEventParameters:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateEventForUpdating(eventDbId: ID!, eventDescription: String, eventType: String, eventTypeDbId: String, additionalInfo_IDs: [String], eventDateRange_ID: String, eventParameters_IDs: [String] , addEventDateRange:ID, removeEventDateRange:ID   , addObservationUnits:[ID], removeObservationUnits:[ID] , addStudy:[ID], removeStudy:[ID] , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addEventParameters:[ID], removeEventParameters:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateEventForDeletion(eventDbId: ID!): Boolean!
    validateEventAfterReading(eventDbId: ID!): Boolean!
    """
    eventsZendroDefinition would return the static Zendro data model definition
    """
    eventsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addEvent(eventDbId: ID!, eventDescription: String, eventType: String, eventTypeDbId: String, additionalInfo_IDs: [String], eventDateRange_ID: String, eventParameters_IDs: [String] , addEventDateRange:ID  , addObservationUnits:[ID], addStudy:[ID], addAdditionalInfo:[ID], addEventParameters:[ID] , skipAssociationsExistenceChecks:Boolean = false): event!
    updateEvent(eventDbId: ID!, eventDescription: String, eventType: String, eventTypeDbId: String, additionalInfo_IDs: [String], eventDateRange_ID: String, eventParameters_IDs: [String] , addEventDateRange:ID, removeEventDateRange:ID   , addObservationUnits:[ID], removeObservationUnits:[ID] , addStudy:[ID], removeStudy:[ID] , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addEventParameters:[ID], removeEventParameters:[ID]  , skipAssociationsExistenceChecks:Boolean = false): event!
    deleteEvent(eventDbId: ID!): String!
      }
`;