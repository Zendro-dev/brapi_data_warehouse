module.exports = `
  type observationlevel{
    """
    @original-field
    """
    observationLevelDbId: ID
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
    
    """
    observationUnitPosition_ID: String

    """
    @original-field
    
    """
    study_ID: String

    observationUnitPosition(search: searchObservationunitpositionInput): observationunitposition
  study(search: searchStudyInput): study
    
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type ObservationlevelConnection{
  edges: [ObservationlevelEdge]
  observationlevels: [observationlevel]
  pageInfo: pageInfo!
}

type ObservationlevelEdge{
  cursor: String!
  node: observationlevel!
}

  enum observationlevelField {
    observationLevelDbId
    levelCode
    levelName
    levelOrder
    observationUnitPosition_ID
    study_ID
  }
  
  input searchObservationlevelInput {
    field: observationlevelField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchObservationlevelInput]
  }

  input orderObservationlevelInput{
    field: observationlevelField
    order: Order
  }



  type Query {
    observationlevels(search: searchObservationlevelInput, order: [ orderObservationlevelInput ], pagination: paginationInput! ): [observationlevel]
    readOneObservationlevel(observationLevelDbId: ID!): observationlevel
    countObservationlevels(search: searchObservationlevelInput ): Int
    csvTableTemplateObservationlevel: [String]
    observationlevelsConnection(search:searchObservationlevelInput, order: [ orderObservationlevelInput ], pagination: paginationCursorInput! ): ObservationlevelConnection
    validateObservationlevelForCreation(observationLevelDbId: ID!, levelCode: String, levelName: String, levelOrder: Int, observationUnitPosition_ID: String, study_ID: String , addObservationUnitPosition:ID, addStudy:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateObservationlevelForUpdating(observationLevelDbId: ID!, levelCode: String, levelName: String, levelOrder: Int, observationUnitPosition_ID: String, study_ID: String , addObservationUnitPosition:ID, removeObservationUnitPosition:ID , addStudy:ID, removeStudy:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateObservationlevelForDeletion(observationLevelDbId: ID!): Boolean!
    validateObservationlevelAfterReading(observationLevelDbId: ID!): Boolean!
    """
    observationlevelsZendroDefinition would return the static Zendro data model definition
    """
    observationlevelsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addObservationlevel(observationLevelDbId: ID!, levelCode: String, levelName: String, levelOrder: Int, observationUnitPosition_ID: String, study_ID: String , addObservationUnitPosition:ID, addStudy:ID   , skipAssociationsExistenceChecks:Boolean = false): observationlevel!
    updateObservationlevel(observationLevelDbId: ID!, levelCode: String, levelName: String, levelOrder: Int, observationUnitPosition_ID: String, study_ID: String , addObservationUnitPosition:ID, removeObservationUnitPosition:ID , addStudy:ID, removeStudy:ID    , skipAssociationsExistenceChecks:Boolean = false): observationlevel!
    deleteObservationlevel(observationLevelDbId: ID!): String!
      }
`;