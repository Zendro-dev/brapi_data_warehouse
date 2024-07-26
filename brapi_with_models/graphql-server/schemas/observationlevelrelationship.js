module.exports = `
  type observationlevelrelationship{
    """
    @original-field
    """
    observationLevelRelationshipDbId: ID
    """
    @original-field
    An ID code or number to represent a real thing that may or may not be an an observation unit.
&lt;br/&gt;For example, if the &#39;levelName&#39; is &#39;plot&#39;, then the &#39;levelCode&#39; would be the plot number or plot barcode. If this plot is also considered an ObservationUnit, then the appropriate observationUnitDbId should also be recorded.
&lt;br/&gt;If the &#39;levelName&#39; is &#39;field&#39;, then the &#39;levelCode&#39; might be something like &#39;3&#39; or &#39;F3&#39; to indicate the third field at a research station. 
    """
    levelCode: String

    """
    @original-field
    A name for this level 

**Standard Level Names: study, field, entry, rep, block, sub-block, plot, sub-plot, plant, pot, sample** 

For more information on Observation Levels, please review the &lt;a target=&#34;_blank&#34; href=&#34;https://wiki.brapi.org/index.php/Observation_Levels&#34;&gt;Observation Levels documentation&lt;/a&gt;. 
    """
    levelName: String

    """
    @original-field
    \`levelOrder\` defines where that level exists in the hierarchy of levels. \`levelOrder\`&#39;s lower numbers 
are at the top of the hierarchy (ie field -&gt; 1) and higher numbers are at the bottom of the hierarchy (ie plant -&gt; 9). 

For more information on Observation Levels, please review the &lt;a target=&#34;_blank&#34; href=&#34;https://wiki.brapi.org/index.php/Observation_Levels&#34;&gt;Observation Levels documentation&lt;/a&gt;. 
    """
    levelOrder: Int

    """
    @original-field
    The ID which uniquely identifies an observation unit
&lt;br/&gt;If this level has on ObservationUnit associated with it, record the observationUnitDbId here. This is intended to construct a strict hierarchy of observationUnits. 
&lt;br/&gt;If there is no ObservationUnit associated with this level, this field can set to NULL or omitted from the response.
    """
    observationUnitDbId: String

    """
    @original-field
    
    """
    observationUnitPositions_IDs: [String]

      
    """
    @search-request
    """
    observationUnitPositionsFilter(search: searchObservationunitpositionInput, order: [ orderObservationunitpositionInput ], pagination: paginationInput!): [observationunitposition]


    """
    @search-request
    """
    observationUnitPositionsConnection(search: searchObservationunitpositionInput, order: [ orderObservationunitpositionInput ], pagination: paginationCursorInput!): ObservationunitpositionConnection

    """
    @count-request
    """
    countFilteredObservationUnitPositions(search: searchObservationunitpositionInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type ObservationlevelrelationshipConnection{
  edges: [ObservationlevelrelationshipEdge]
  observationlevelrelationships: [observationlevelrelationship]
  pageInfo: pageInfo!
}

type ObservationlevelrelationshipEdge{
  cursor: String!
  node: observationlevelrelationship!
}

  enum observationlevelrelationshipField {
    observationLevelRelationshipDbId
    levelCode
    levelName
    levelOrder
    observationUnitDbId
    observationUnitPositions_IDs
  }
  
  input searchObservationlevelrelationshipInput {
    field: observationlevelrelationshipField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchObservationlevelrelationshipInput]
  }

  input orderObservationlevelrelationshipInput{
    field: observationlevelrelationshipField
    order: Order
  }



  type Query {
    observationlevelrelationships(search: searchObservationlevelrelationshipInput, order: [ orderObservationlevelrelationshipInput ], pagination: paginationInput! ): [observationlevelrelationship]
    readOneObservationlevelrelationship(observationLevelRelationshipDbId: ID!): observationlevelrelationship
    countObservationlevelrelationships(search: searchObservationlevelrelationshipInput ): Int
    csvTableTemplateObservationlevelrelationship: [String]
    observationlevelrelationshipsConnection(search:searchObservationlevelrelationshipInput, order: [ orderObservationlevelrelationshipInput ], pagination: paginationCursorInput! ): ObservationlevelrelationshipConnection
    validateObservationlevelrelationshipForCreation(observationLevelRelationshipDbId: ID!, levelCode: String, levelName: String, levelOrder: Int, observationUnitDbId: String   , addObservationUnitPositions:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateObservationlevelrelationshipForUpdating(observationLevelRelationshipDbId: ID!, levelCode: String, levelName: String, levelOrder: Int, observationUnitDbId: String   , addObservationUnitPositions:[ID], removeObservationUnitPositions:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateObservationlevelrelationshipForDeletion(observationLevelRelationshipDbId: ID!): Boolean!
    validateObservationlevelrelationshipAfterReading(observationLevelRelationshipDbId: ID!): Boolean!
    """
    observationlevelrelationshipsZendroDefinition would return the static Zendro data model definition
    """
    observationlevelrelationshipsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addObservationlevelrelationship(observationLevelRelationshipDbId: ID!, levelCode: String, levelName: String, levelOrder: Int, observationUnitDbId: String   , addObservationUnitPositions:[ID] , skipAssociationsExistenceChecks:Boolean = false): observationlevelrelationship!
    updateObservationlevelrelationship(observationLevelRelationshipDbId: ID!, levelCode: String, levelName: String, levelOrder: Int, observationUnitDbId: String   , addObservationUnitPositions:[ID], removeObservationUnitPositions:[ID]  , skipAssociationsExistenceChecks:Boolean = false): observationlevelrelationship!
    deleteObservationlevelrelationship(observationLevelRelationshipDbId: ID!): String!
      }
`;