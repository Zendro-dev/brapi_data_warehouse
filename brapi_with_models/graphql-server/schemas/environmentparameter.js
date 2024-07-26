module.exports = `
  type environmentparameter{
    """
    @original-field
    """
    environmentParameterDbId: ID
    """
    @original-field
    Human-readable value of the environment parameter (defined above) constant within the experiment
    """
    description: String

    """
    @original-field
    Name of the environment parameter constant within the experiment

MIAPPE V1.1 (DM-58) Environment parameter - Name of the environment parameter constant within the experiment. 
    """
    parameterName: String

    """
    @original-field
    URI pointing to an ontology class for the parameter
    """
    parameterPUI: String

    """
    @original-field
    Unit of the value for this parameter
    """
    unit: String

    """
    @original-field
    URI pointing to an ontology class for the unit
    """
    unitPUI: String

    """
    @original-field
    Numerical or categorical value

MIAPPE V1.1 (DM-59) Environment parameter value - Value of the environment parameter (defined above) constant within the experiment.
    """
    value: String

    """
    @original-field
    URI pointing to an ontology class for the parameter value
    """
    valuePUI: String

    """
    @original-field
    
    """
    study_ID: String

    study(search: searchStudyInput): study
    
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type EnvironmentparameterConnection{
  edges: [EnvironmentparameterEdge]
  environmentparameters: [environmentparameter]
  pageInfo: pageInfo!
}

type EnvironmentparameterEdge{
  cursor: String!
  node: environmentparameter!
}

  enum environmentparameterField {
    environmentParameterDbId
    description
    parameterName
    parameterPUI
    unit
    unitPUI
    value
    valuePUI
    study_ID
  }
  
  input searchEnvironmentparameterInput {
    field: environmentparameterField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchEnvironmentparameterInput]
  }

  input orderEnvironmentparameterInput{
    field: environmentparameterField
    order: Order
  }



  type Query {
    environmentparameters(search: searchEnvironmentparameterInput, order: [ orderEnvironmentparameterInput ], pagination: paginationInput! ): [environmentparameter]
    readOneEnvironmentparameter(environmentParameterDbId: ID!): environmentparameter
    countEnvironmentparameters(search: searchEnvironmentparameterInput ): Int
    csvTableTemplateEnvironmentparameter: [String]
    environmentparametersConnection(search:searchEnvironmentparameterInput, order: [ orderEnvironmentparameterInput ], pagination: paginationCursorInput! ): EnvironmentparameterConnection
    validateEnvironmentparameterForCreation(environmentParameterDbId: ID!, description: String, parameterName: String, parameterPUI: String, unit: String, unitPUI: String, value: String, valuePUI: String, study_ID: String , addStudy:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateEnvironmentparameterForUpdating(environmentParameterDbId: ID!, description: String, parameterName: String, parameterPUI: String, unit: String, unitPUI: String, value: String, valuePUI: String, study_ID: String , addStudy:ID, removeStudy:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateEnvironmentparameterForDeletion(environmentParameterDbId: ID!): Boolean!
    validateEnvironmentparameterAfterReading(environmentParameterDbId: ID!): Boolean!
    """
    environmentparametersZendroDefinition would return the static Zendro data model definition
    """
    environmentparametersZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addEnvironmentparameter(environmentParameterDbId: ID!, description: String, parameterName: String, parameterPUI: String, unit: String, unitPUI: String, value: String, valuePUI: String, study_ID: String , addStudy:ID   , skipAssociationsExistenceChecks:Boolean = false): environmentparameter!
    updateEnvironmentparameter(environmentParameterDbId: ID!, description: String, parameterName: String, parameterPUI: String, unit: String, unitPUI: String, value: String, valuePUI: String, study_ID: String , addStudy:ID, removeStudy:ID    , skipAssociationsExistenceChecks:Boolean = false): environmentparameter!
    deleteEnvironmentparameter(environmentParameterDbId: ID!): String!
      }
`;