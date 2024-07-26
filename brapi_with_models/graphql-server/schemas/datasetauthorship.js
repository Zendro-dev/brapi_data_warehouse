module.exports = `
  type datasetauthorship{
    """
    @original-field
    """
    datasetAuthorshipDbId: ID
    """
    @original-field
    MIAPPE V1.1 (DM-7) License - License for the reuse of the data associated with this investigation. The Creative Commons licenses cover most use cases and are recommended.
    """
    license: String

    """
    @original-field
    MIAPPE V1.1 (DM-6) Public release date - Date of first public release of the dataset presently being described.
    """
    publicReleaseDate: String

    """
    @original-field
    MIAPPE V1.1 (DM-5) Submission date - Date of submission of the dataset presently being described to a host repository.
    """
    submissionDate: String

    """
    @original-field
    
    """
    trial_ID: String

    trial(search: searchTrialInput): trial
    
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type DatasetauthorshipConnection{
  edges: [DatasetauthorshipEdge]
  datasetauthorships: [datasetauthorship]
  pageInfo: pageInfo!
}

type DatasetauthorshipEdge{
  cursor: String!
  node: datasetauthorship!
}

  enum datasetauthorshipField {
    datasetAuthorshipDbId
    license
    publicReleaseDate
    submissionDate
    trial_ID
  }
  
  input searchDatasetauthorshipInput {
    field: datasetauthorshipField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchDatasetauthorshipInput]
  }

  input orderDatasetauthorshipInput{
    field: datasetauthorshipField
    order: Order
  }



  type Query {
    datasetauthorships(search: searchDatasetauthorshipInput, order: [ orderDatasetauthorshipInput ], pagination: paginationInput! ): [datasetauthorship]
    readOneDatasetauthorship(datasetAuthorshipDbId: ID!): datasetauthorship
    countDatasetauthorships(search: searchDatasetauthorshipInput ): Int
    csvTableTemplateDatasetauthorship: [String]
    datasetauthorshipsConnection(search:searchDatasetauthorshipInput, order: [ orderDatasetauthorshipInput ], pagination: paginationCursorInput! ): DatasetauthorshipConnection
    validateDatasetauthorshipForCreation(datasetAuthorshipDbId: ID!, license: String, publicReleaseDate: String, submissionDate: String, trial_ID: String , addTrial:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateDatasetauthorshipForUpdating(datasetAuthorshipDbId: ID!, license: String, publicReleaseDate: String, submissionDate: String, trial_ID: String , addTrial:ID, removeTrial:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateDatasetauthorshipForDeletion(datasetAuthorshipDbId: ID!): Boolean!
    validateDatasetauthorshipAfterReading(datasetAuthorshipDbId: ID!): Boolean!
    """
    datasetauthorshipsZendroDefinition would return the static Zendro data model definition
    """
    datasetauthorshipsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addDatasetauthorship(datasetAuthorshipDbId: ID!, license: String, publicReleaseDate: String, submissionDate: String, trial_ID: String , addTrial:ID   , skipAssociationsExistenceChecks:Boolean = false): datasetauthorship!
    updateDatasetauthorship(datasetAuthorshipDbId: ID!, license: String, publicReleaseDate: String, submissionDate: String, trial_ID: String , addTrial:ID, removeTrial:ID    , skipAssociationsExistenceChecks:Boolean = false): datasetauthorship!
    deleteDatasetauthorship(datasetAuthorshipDbId: ID!): String!
      }
`;