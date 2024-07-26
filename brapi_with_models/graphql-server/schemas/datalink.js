module.exports = `
  type datalink{
    """
    @original-field
    """
    dataLinkDbId: ID
    """
    @original-field
    The structure of the data within a file. For example - VCF, table, image archive, multispectral image archives in EDAM ontology (used in Galaxy)

MIAPPE V1.1 (DM-38) Data file description - Description of the format of the data file. May be a standard file format name, or a description of organization of the data in a tabular file.
    """
    dataFormat: String

    """
    @original-field
    The general description of this data link

MIAPPE V1.1 (DM-38) Data file description - Description of the format of the data file. May be a standard file format name, or a description of organization of the data in a tabular file.
    """
    description: String

    """
    @original-field
    The MIME type of the file (ie text/csv, application/excel, application/zip).

MIAPPE V1.1 (DM-38) Data file description - Description of the format of the data file. May be a standard file format name, or a description of organization of the data in a tabular file.
    """
    fileFormat: String

    """
    @original-field
    The name of the external data link

MIAPPE V1.1 (DM-38) Data file description - Description of the format of the data file. May be a standard file format name, or a description of organization of the data in a tabular file.
    """
    name: String

    """
    @original-field
    The description of the origin or ownership of this linked data. Could be a formal reference to software, method, or workflow.
    """
    provenance: String

    """
    @original-field
    The general type of data. For example- Genotyping, Phenotyping raw data, Phenotyping reduced data, Environmental, etc
    """
    scientificType: String

    """
    @original-field
    URL describing the location of this data file to view or download

MIAPPE V1.1 (DM-37) Data file link - Link to the data file (or digital object) in a public database or in a persistent institutional repository; or identifier of the data file when submitted together with the MIAPPE submission.
    """
    url: String

    """
    @original-field
    The version number for this data 

MIAPPE V1.1 (DM-39) Data file version - The version of the dataset (the actual data).
    """
    version: String

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
type DatalinkConnection{
  edges: [DatalinkEdge]
  datalinks: [datalink]
  pageInfo: pageInfo!
}

type DatalinkEdge{
  cursor: String!
  node: datalink!
}

  enum datalinkField {
    dataLinkDbId
    dataFormat
    description
    fileFormat
    name
    provenance
    scientificType
    url
    version
    study_ID
  }
  
  input searchDatalinkInput {
    field: datalinkField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchDatalinkInput]
  }

  input orderDatalinkInput{
    field: datalinkField
    order: Order
  }



  type Query {
    datalinks(search: searchDatalinkInput, order: [ orderDatalinkInput ], pagination: paginationInput! ): [datalink]
    readOneDatalink(dataLinkDbId: ID!): datalink
    countDatalinks(search: searchDatalinkInput ): Int
    csvTableTemplateDatalink: [String]
    datalinksConnection(search:searchDatalinkInput, order: [ orderDatalinkInput ], pagination: paginationCursorInput! ): DatalinkConnection
    validateDatalinkForCreation(dataLinkDbId: ID!, dataFormat: String, description: String, fileFormat: String, name: String, provenance: String, scientificType: String, url: String, version: String, study_ID: String , addStudy:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateDatalinkForUpdating(dataLinkDbId: ID!, dataFormat: String, description: String, fileFormat: String, name: String, provenance: String, scientificType: String, url: String, version: String, study_ID: String , addStudy:ID, removeStudy:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateDatalinkForDeletion(dataLinkDbId: ID!): Boolean!
    validateDatalinkAfterReading(dataLinkDbId: ID!): Boolean!
    """
    datalinksZendroDefinition would return the static Zendro data model definition
    """
    datalinksZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addDatalink(dataLinkDbId: ID!, dataFormat: String, description: String, fileFormat: String, name: String, provenance: String, scientificType: String, url: String, version: String, study_ID: String , addStudy:ID   , skipAssociationsExistenceChecks:Boolean = false): datalink!
    updateDatalink(dataLinkDbId: ID!, dataFormat: String, description: String, fileFormat: String, name: String, provenance: String, scientificType: String, url: String, version: String, study_ID: String , addStudy:ID, removeStudy:ID    , skipAssociationsExistenceChecks:Boolean = false): datalink!
    deleteDatalink(dataLinkDbId: ID!): String!
      }
`;