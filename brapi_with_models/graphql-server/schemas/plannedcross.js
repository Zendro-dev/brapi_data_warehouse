module.exports = `
  type plannedcross{
    """
    @original-field
    """
    plannedCrossDbId: ID
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
    the human readable name for a planned cross
    """
    plannedCrossName: String

    """
    @original-field
    The status of this planned cross. Is it waiting to be performed (&#39;TODO&#39;), has it been completed successfully (&#39;DONE&#39;), or has it not been done on purpose (&#39;SKIPPED&#39;).
    """
    status: String

    """
    @original-field
    
    """
    crosses_IDs: [String]

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
    parents_IDs: [String]

    crossingProject(search: searchCrossingprojectInput): crossingproject
    
    """
    @search-request
    """
    crossesFilter(search: searchCrossInput, order: [ orderCrossInput ], pagination: paginationInput!): [cross]


    """
    @search-request
    """
    crossesConnection(search: searchCrossInput, order: [ orderCrossInput ], pagination: paginationCursorInput!): CrossConnection

    """
    @count-request
    """
    countFilteredCrosses(search: searchCrossInput) : Int
  
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
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type PlannedcrossConnection{
  edges: [PlannedcrossEdge]
  plannedcrosses: [plannedcross]
  pageInfo: pageInfo!
}

type PlannedcrossEdge{
  cursor: String!
  node: plannedcross!
}

  enum plannedcrossField {
    plannedCrossDbId
    crossType
    crossingProject_ID
    plannedCrossName
    status
    crosses_IDs
    additionalInfo_IDs
    externalReferences_IDs
    parents_IDs
  }
  
  input searchPlannedcrossInput {
    field: plannedcrossField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchPlannedcrossInput]
  }

  input orderPlannedcrossInput{
    field: plannedcrossField
    order: Order
  }



  type Query {
    plannedcrosses(search: searchPlannedcrossInput, order: [ orderPlannedcrossInput ], pagination: paginationInput! ): [plannedcross]
    readOnePlannedcross(plannedCrossDbId: ID!): plannedcross
    countPlannedcrosses(search: searchPlannedcrossInput ): Int
    csvTableTemplatePlannedcross: [String]
    plannedcrossesConnection(search:searchPlannedcrossInput, order: [ orderPlannedcrossInput ], pagination: paginationCursorInput! ): PlannedcrossConnection
    validatePlannedcrossForCreation(plannedCrossDbId: ID!, crossType: String, crossingProject_ID: String, plannedCrossName: String, status: String, crosses_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String] , addCrossingProject:ID  , addCrosses:[ID], addAdditionalInfo:[ID], addExternalReferences:[ID], addParents:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validatePlannedcrossForUpdating(plannedCrossDbId: ID!, crossType: String, crossingProject_ID: String, plannedCrossName: String, status: String, crosses_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String] , addCrossingProject:ID, removeCrossingProject:ID   , addCrosses:[ID], removeCrosses:[ID] , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addParents:[ID], removeParents:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validatePlannedcrossForDeletion(plannedCrossDbId: ID!): Boolean!
    validatePlannedcrossAfterReading(plannedCrossDbId: ID!): Boolean!
    """
    plannedcrossesZendroDefinition would return the static Zendro data model definition
    """
    plannedcrossesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addPlannedcross(plannedCrossDbId: ID!, crossType: String, crossingProject_ID: String, plannedCrossName: String, status: String, crosses_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String] , addCrossingProject:ID  , addCrosses:[ID], addAdditionalInfo:[ID], addExternalReferences:[ID], addParents:[ID] , skipAssociationsExistenceChecks:Boolean = false): plannedcross!
    updatePlannedcross(plannedCrossDbId: ID!, crossType: String, crossingProject_ID: String, plannedCrossName: String, status: String, crosses_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String] , addCrossingProject:ID, removeCrossingProject:ID   , addCrosses:[ID], removeCrosses:[ID] , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addParents:[ID], removeParents:[ID]  , skipAssociationsExistenceChecks:Boolean = false): plannedcross!
    deletePlannedcross(plannedCrossDbId: ID!): String!
      }
`;