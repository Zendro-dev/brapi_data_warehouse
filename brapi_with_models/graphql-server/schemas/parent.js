module.exports = `
  type parent{
    """
    @original-field
    """
    parentDbId: ID
    """
    @original-field
    
    """
    parentGermplasm_ID: String

    """
    @original-field
    the human readable name for a germplasm
    """
    germplasmName: String

    """
    @original-field
    the unique identifier for an observation unit
    """
    observationUnitID: String

    """
    @original-field
    the human readable name for an observation unit
    """
    observationUnitName: String

    """
    @original-field
    The type of parent ex. &#39;MALE&#39;, &#39;FEMALE&#39;, &#39;SELF&#39;, &#39;POPULATION&#39;, etc.
    """
    parentType: String

    """
    @original-field
    
    """
    crosses_IDs: [String]

    """
    @original-field
    
    """
    crossingProjects_IDs: [String]

    """
    @original-field
    
    """
    pedigreeNode_IDs: [String]

    """
    @original-field
    
    """
    plannedCrosses_IDs: [String]

    parentGermplasm(search: searchGermplasmInput): germplasm
    
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
    crossingProjectsFilter(search: searchCrossingprojectInput, order: [ orderCrossingprojectInput ], pagination: paginationInput!): [crossingproject]


    """
    @search-request
    """
    crossingProjectsConnection(search: searchCrossingprojectInput, order: [ orderCrossingprojectInput ], pagination: paginationCursorInput!): CrossingprojectConnection

    """
    @count-request
    """
    countFilteredCrossingProjects(search: searchCrossingprojectInput) : Int
  
    """
    @search-request
    """
    pedigreeNodeFilter(search: searchPedigreenodeInput, order: [ orderPedigreenodeInput ], pagination: paginationInput!): [pedigreenode]


    """
    @search-request
    """
    pedigreeNodeConnection(search: searchPedigreenodeInput, order: [ orderPedigreenodeInput ], pagination: paginationCursorInput!): PedigreenodeConnection

    """
    @count-request
    """
    countFilteredPedigreeNode(search: searchPedigreenodeInput) : Int
  
    """
    @search-request
    """
    plannedCrossesFilter(search: searchPlannedcrossInput, order: [ orderPlannedcrossInput ], pagination: paginationInput!): [plannedcross]


    """
    @search-request
    """
    plannedCrossesConnection(search: searchPlannedcrossInput, order: [ orderPlannedcrossInput ], pagination: paginationCursorInput!): PlannedcrossConnection

    """
    @count-request
    """
    countFilteredPlannedCrosses(search: searchPlannedcrossInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type ParentConnection{
  edges: [ParentEdge]
  parents: [parent]
  pageInfo: pageInfo!
}

type ParentEdge{
  cursor: String!
  node: parent!
}

  enum parentField {
    parentDbId
    parentGermplasm_ID
    germplasmName
    observationUnitID
    observationUnitName
    parentType
    crosses_IDs
    crossingProjects_IDs
    pedigreeNode_IDs
    plannedCrosses_IDs
  }
  
  input searchParentInput {
    field: parentField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchParentInput]
  }

  input orderParentInput{
    field: parentField
    order: Order
  }



  type Query {
    parents(search: searchParentInput, order: [ orderParentInput ], pagination: paginationInput! ): [parent]
    readOneParent(parentDbId: ID!): parent
    countParents(search: searchParentInput ): Int
    csvTableTemplateParent: [String]
    parentsConnection(search:searchParentInput, order: [ orderParentInput ], pagination: paginationCursorInput! ): ParentConnection
    validateParentForCreation(parentDbId: ID!, parentGermplasm_ID: String, germplasmName: String, observationUnitID: String, observationUnitName: String, parentType: String , addParentGermplasm:ID  , addCrosses:[ID], addCrossingProjects:[ID], addPedigreeNode:[ID], addPlannedCrosses:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateParentForUpdating(parentDbId: ID!, parentGermplasm_ID: String, germplasmName: String, observationUnitID: String, observationUnitName: String, parentType: String , addParentGermplasm:ID, removeParentGermplasm:ID   , addCrosses:[ID], removeCrosses:[ID] , addCrossingProjects:[ID], removeCrossingProjects:[ID] , addPedigreeNode:[ID], removePedigreeNode:[ID] , addPlannedCrosses:[ID], removePlannedCrosses:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateParentForDeletion(parentDbId: ID!): Boolean!
    validateParentAfterReading(parentDbId: ID!): Boolean!
    """
    parentsZendroDefinition would return the static Zendro data model definition
    """
    parentsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addParent(parentDbId: ID!, parentGermplasm_ID: String, germplasmName: String, observationUnitID: String, observationUnitName: String, parentType: String , addParentGermplasm:ID  , addCrosses:[ID], addCrossingProjects:[ID], addPedigreeNode:[ID], addPlannedCrosses:[ID] , skipAssociationsExistenceChecks:Boolean = false): parent!
    updateParent(parentDbId: ID!, parentGermplasm_ID: String, germplasmName: String, observationUnitID: String, observationUnitName: String, parentType: String , addParentGermplasm:ID, removeParentGermplasm:ID   , addCrosses:[ID], removeCrosses:[ID] , addCrossingProjects:[ID], removeCrossingProjects:[ID] , addPedigreeNode:[ID], removePedigreeNode:[ID] , addPlannedCrosses:[ID], removePlannedCrosses:[ID]  , skipAssociationsExistenceChecks:Boolean = false): parent!
    deleteParent(parentDbId: ID!): String!
      }
`;