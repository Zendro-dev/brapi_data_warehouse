module.exports = `
  type crossingproject{
    """
    @original-field
    """
    crossingProjectDbId: ID
    """
    @original-field
    the common name of a crop (for multi-crop systems)
    """
    commonCropName: String

    """
    @original-field
    the description for a crossing project
    """
    crossingProjectDescription: String

    """
    @original-field
    The human readable name for a crossing project
    """
    crossingProjectName: String

    """
    @original-field
    
    """
    program_ID: String

    """
    @original-field
    
    """
    crosses_IDs: [String]

    """
    @original-field
    
    """
    plannedCrosses_IDs: [String]

    """
    @original-field
    
    """
    pedigreeNodes_IDs: [String]

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
    potentialParents_IDs: [String]

    program(search: searchProgramInput): program
    
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
    @search-request
    """
    pedigreeNodesFilter(search: searchPedigreenodeInput, order: [ orderPedigreenodeInput ], pagination: paginationInput!): [pedigreenode]


    """
    @search-request
    """
    pedigreeNodesConnection(search: searchPedigreenodeInput, order: [ orderPedigreenodeInput ], pagination: paginationCursorInput!): PedigreenodeConnection

    """
    @count-request
    """
    countFilteredPedigreeNodes(search: searchPedigreenodeInput) : Int
  
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
    potentialParentsFilter(search: searchParentInput, order: [ orderParentInput ], pagination: paginationInput!): [parent]


    """
    @search-request
    """
    potentialParentsConnection(search: searchParentInput, order: [ orderParentInput ], pagination: paginationCursorInput!): ParentConnection

    """
    @count-request
    """
    countFilteredPotentialParents(search: searchParentInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type CrossingprojectConnection{
  edges: [CrossingprojectEdge]
  crossingprojects: [crossingproject]
  pageInfo: pageInfo!
}

type CrossingprojectEdge{
  cursor: String!
  node: crossingproject!
}

  enum crossingprojectField {
    crossingProjectDbId
    commonCropName
    crossingProjectDescription
    crossingProjectName
    program_ID
    crosses_IDs
    plannedCrosses_IDs
    pedigreeNodes_IDs
    additionalInfo_IDs
    externalReferences_IDs
    potentialParents_IDs
  }
  
  input searchCrossingprojectInput {
    field: crossingprojectField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchCrossingprojectInput]
  }

  input orderCrossingprojectInput{
    field: crossingprojectField
    order: Order
  }



  type Query {
    crossingprojects(search: searchCrossingprojectInput, order: [ orderCrossingprojectInput ], pagination: paginationInput! ): [crossingproject]
    readOneCrossingproject(crossingProjectDbId: ID!): crossingproject
    countCrossingprojects(search: searchCrossingprojectInput ): Int
    csvTableTemplateCrossingproject: [String]
    crossingprojectsConnection(search:searchCrossingprojectInput, order: [ orderCrossingprojectInput ], pagination: paginationCursorInput! ): CrossingprojectConnection
    validateCrossingprojectForCreation(crossingProjectDbId: ID!, commonCropName: String, crossingProjectDescription: String, crossingProjectName: String, program_ID: String, crosses_IDs: [String], plannedCrosses_IDs: [String], pedigreeNodes_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String] , addProgram:ID  , addCrosses:[ID], addPlannedCrosses:[ID], addPedigreeNodes:[ID], addAdditionalInfo:[ID], addExternalReferences:[ID], addPotentialParents:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateCrossingprojectForUpdating(crossingProjectDbId: ID!, commonCropName: String, crossingProjectDescription: String, crossingProjectName: String, program_ID: String, crosses_IDs: [String], plannedCrosses_IDs: [String], pedigreeNodes_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String] , addProgram:ID, removeProgram:ID   , addCrosses:[ID], removeCrosses:[ID] , addPlannedCrosses:[ID], removePlannedCrosses:[ID] , addPedigreeNodes:[ID], removePedigreeNodes:[ID] , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addPotentialParents:[ID], removePotentialParents:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateCrossingprojectForDeletion(crossingProjectDbId: ID!): Boolean!
    validateCrossingprojectAfterReading(crossingProjectDbId: ID!): Boolean!
    """
    crossingprojectsZendroDefinition would return the static Zendro data model definition
    """
    crossingprojectsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addCrossingproject(crossingProjectDbId: ID!, commonCropName: String, crossingProjectDescription: String, crossingProjectName: String, program_ID: String, crosses_IDs: [String], plannedCrosses_IDs: [String], pedigreeNodes_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String] , addProgram:ID  , addCrosses:[ID], addPlannedCrosses:[ID], addPedigreeNodes:[ID], addAdditionalInfo:[ID], addExternalReferences:[ID], addPotentialParents:[ID] , skipAssociationsExistenceChecks:Boolean = false): crossingproject!
    updateCrossingproject(crossingProjectDbId: ID!, commonCropName: String, crossingProjectDescription: String, crossingProjectName: String, program_ID: String, crosses_IDs: [String], plannedCrosses_IDs: [String], pedigreeNodes_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String] , addProgram:ID, removeProgram:ID   , addCrosses:[ID], removeCrosses:[ID] , addPlannedCrosses:[ID], removePlannedCrosses:[ID] , addPedigreeNodes:[ID], removePedigreeNodes:[ID] , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addPotentialParents:[ID], removePotentialParents:[ID]  , skipAssociationsExistenceChecks:Boolean = false): crossingproject!
    deleteCrossingproject(crossingProjectDbId: ID!): String!
      }
`;