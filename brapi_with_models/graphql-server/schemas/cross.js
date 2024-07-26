module.exports = `
  type cross{
    """
    @original-field
    """
    crossDbId: ID
    """
    @original-field
    the human readable name for a cross
    """
    crossName: String

    """
    @original-field
    the type of cross
    """
    crossType: String

    """
    @original-field
    
    """
    crossingProject_ID: String

    """
    @original-field
    
    """
    plannedCross_ID: String

    """
    @original-field
    
    """
    observationUnits_IDs: [String]

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
    crossAttributes_IDs: [String]

    """
    @original-field
    
    """
    parents_IDs: [String]

    """
    @original-field
    
    """
    pollinationEvents_IDs: [String]

    crossingProject(search: searchCrossingprojectInput): crossingproject
  plannedCross(search: searchPlannedcrossInput): plannedcross
    
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
    crossAttributesFilter(search: searchCrossattributeInput, order: [ orderCrossattributeInput ], pagination: paginationInput!): [crossattribute]


    """
    @search-request
    """
    crossAttributesConnection(search: searchCrossattributeInput, order: [ orderCrossattributeInput ], pagination: paginationCursorInput!): CrossattributeConnection

    """
    @count-request
    """
    countFilteredCrossAttributes(search: searchCrossattributeInput) : Int
  
    """
    @search-request
    """
    parentsFilter(search: searchParentInput, order: [ orderParentInput ], pagination: paginationInput!): [parent]


    """
    @search-request
    """
    parentsConnection(search: searchParentInput, order: [ orderParentInput ], pagination: paginationCursorInput!): ParentConnection

    """
    @count-request
    """
    countFilteredParents(search: searchParentInput) : Int
  
    """
    @search-request
    """
    pollinationEventsFilter(search: searchPollinationeventInput, order: [ orderPollinationeventInput ], pagination: paginationInput!): [pollinationevent]


    """
    @search-request
    """
    pollinationEventsConnection(search: searchPollinationeventInput, order: [ orderPollinationeventInput ], pagination: paginationCursorInput!): PollinationeventConnection

    """
    @count-request
    """
    countFilteredPollinationEvents(search: searchPollinationeventInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type CrossConnection{
  edges: [CrossEdge]
  crosses: [cross]
  pageInfo: pageInfo!
}

type CrossEdge{
  cursor: String!
  node: cross!
}

  enum crossField {
    crossDbId
    crossName
    crossType
    crossingProject_ID
    plannedCross_ID
    observationUnits_IDs
    additionalInfo_IDs
    externalReferences_IDs
    crossAttributes_IDs
    parents_IDs
    pollinationEvents_IDs
  }
  
  input searchCrossInput {
    field: crossField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchCrossInput]
  }

  input orderCrossInput{
    field: crossField
    order: Order
  }



  type Query {
    crosses(search: searchCrossInput, order: [ orderCrossInput ], pagination: paginationInput! ): [cross]
    readOneCross(crossDbId: ID!): cross
    countCrosses(search: searchCrossInput ): Int
    csvTableTemplateCross: [String]
    crossesConnection(search:searchCrossInput, order: [ orderCrossInput ], pagination: paginationCursorInput! ): CrossConnection
    validateCrossForCreation(crossDbId: ID!, crossName: String, crossType: String, crossingProject_ID: String, plannedCross_ID: String, observationUnits_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String], crossAttributes_IDs: [String], pollinationEvents_IDs: [String] , addCrossingProject:ID, addPlannedCross:ID  , addObservationUnits:[ID], addAdditionalInfo:[ID], addExternalReferences:[ID], addCrossAttributes:[ID], addParents:[ID], addPollinationEvents:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateCrossForUpdating(crossDbId: ID!, crossName: String, crossType: String, crossingProject_ID: String, plannedCross_ID: String, observationUnits_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String], crossAttributes_IDs: [String], pollinationEvents_IDs: [String] , addCrossingProject:ID, removeCrossingProject:ID , addPlannedCross:ID, removePlannedCross:ID   , addObservationUnits:[ID], removeObservationUnits:[ID] , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addCrossAttributes:[ID], removeCrossAttributes:[ID] , addParents:[ID], removeParents:[ID] , addPollinationEvents:[ID], removePollinationEvents:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateCrossForDeletion(crossDbId: ID!): Boolean!
    validateCrossAfterReading(crossDbId: ID!): Boolean!
    """
    crossesZendroDefinition would return the static Zendro data model definition
    """
    crossesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addCross(crossDbId: ID!, crossName: String, crossType: String, crossingProject_ID: String, plannedCross_ID: String, observationUnits_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String], crossAttributes_IDs: [String], pollinationEvents_IDs: [String] , addCrossingProject:ID, addPlannedCross:ID  , addObservationUnits:[ID], addAdditionalInfo:[ID], addExternalReferences:[ID], addCrossAttributes:[ID], addParents:[ID], addPollinationEvents:[ID] , skipAssociationsExistenceChecks:Boolean = false): cross!
    updateCross(crossDbId: ID!, crossName: String, crossType: String, crossingProject_ID: String, plannedCross_ID: String, observationUnits_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String], crossAttributes_IDs: [String], pollinationEvents_IDs: [String] , addCrossingProject:ID, removeCrossingProject:ID , addPlannedCross:ID, removePlannedCross:ID   , addObservationUnits:[ID], removeObservationUnits:[ID] , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addCrossAttributes:[ID], removeCrossAttributes:[ID] , addParents:[ID], removeParents:[ID] , addPollinationEvents:[ID], removePollinationEvents:[ID]  , skipAssociationsExistenceChecks:Boolean = false): cross!
    deleteCross(crossDbId: ID!): String!
      }
`;