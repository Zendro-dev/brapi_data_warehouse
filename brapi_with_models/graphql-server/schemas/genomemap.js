module.exports = `
  type genomemap{
    """
    @original-field
    """
    genomeMapDbId: ID
    """
    @original-field
    
    """
    additionalInfo_IDs: [String]

    """
    @original-field
    
    """
    markerPositions_IDs: [String]

    """
    @original-field
    Additional comments about a \`GenomeMap\`
    """
    comments: String

    """
    @original-field
    The common name of the \`Crop\`
    """
    commonCropName: String

    """
    @original-field
    A URL to the human readable documentation of an object
    """
    documentationURL: String

    """
    @original-field
    The number of linkage groups present in a \`GenomeMap\`
    """
    linkageGroupCount: Int

    """
    @original-field
    The human readable identifier for a \`GenomeMap\`
    """
    mapName: String

    """
    @original-field
    The DOI or other permanent identifier for a \`GenomeMap\`
    """
    mapPUI: String

    """
    @original-field
    The number of markers present in a \`GenomeMap\`
    """
    markerCount: Int

    """
    @original-field
    The date this \`GenomeMap\` was published
    """
    publishedDate: String

    """
    @original-field
    Full scientific binomial format name. This includes Genus, Species, and Sub-species
    """
    scientificName: String

    """
    @original-field
    The type of map this represents, usually &#34;Genetic&#34; or &#34;Physical&#34;
    """
    type: String

    """
    @original-field
    The units used to describe the data in a \`GenomeMap\`
    """
    unit: String

      
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
    markerPositionsFilter(search: searchMarkerpositionInput, order: [ orderMarkerpositionInput ], pagination: paginationInput!): [markerposition]


    """
    @search-request
    """
    markerPositionsConnection(search: searchMarkerpositionInput, order: [ orderMarkerpositionInput ], pagination: paginationCursorInput!): MarkerpositionConnection

    """
    @count-request
    """
    countFilteredMarkerPositions(search: searchMarkerpositionInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type GenomemapConnection{
  edges: [GenomemapEdge]
  genomemaps: [genomemap]
  pageInfo: pageInfo!
}

type GenomemapEdge{
  cursor: String!
  node: genomemap!
}

  enum genomemapField {
    genomeMapDbId
    additionalInfo_IDs
    markerPositions_IDs
    comments
    commonCropName
    documentationURL
    linkageGroupCount
    mapName
    mapPUI
    markerCount
    publishedDate
    scientificName
    type
    unit
  }
  
  input searchGenomemapInput {
    field: genomemapField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchGenomemapInput]
  }

  input orderGenomemapInput{
    field: genomemapField
    order: Order
  }



  type Query {
    genomemaps(search: searchGenomemapInput, order: [ orderGenomemapInput ], pagination: paginationInput! ): [genomemap]
    readOneGenomemap(genomeMapDbId: ID!): genomemap
    countGenomemaps(search: searchGenomemapInput ): Int
    csvTableTemplateGenomemap: [String]
    genomemapsConnection(search:searchGenomemapInput, order: [ orderGenomemapInput ], pagination: paginationCursorInput! ): GenomemapConnection
    validateGenomemapForCreation(genomeMapDbId: ID!, additionalInfo_IDs: [String], markerPositions_IDs: [String], comments: String, commonCropName: String, documentationURL: String, linkageGroupCount: Int, mapName: String, mapPUI: String, markerCount: Int, publishedDate: String, scientificName: String, type: String, unit: String   , addAdditionalInfo:[ID], addMarkerPositions:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateGenomemapForUpdating(genomeMapDbId: ID!, additionalInfo_IDs: [String], markerPositions_IDs: [String], comments: String, commonCropName: String, documentationURL: String, linkageGroupCount: Int, mapName: String, mapPUI: String, markerCount: Int, publishedDate: String, scientificName: String, type: String, unit: String   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addMarkerPositions:[ID], removeMarkerPositions:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateGenomemapForDeletion(genomeMapDbId: ID!): Boolean!
    validateGenomemapAfterReading(genomeMapDbId: ID!): Boolean!
    """
    genomemapsZendroDefinition would return the static Zendro data model definition
    """
    genomemapsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addGenomemap(genomeMapDbId: ID!, additionalInfo_IDs: [String], markerPositions_IDs: [String], comments: String, commonCropName: String, documentationURL: String, linkageGroupCount: Int, mapName: String, mapPUI: String, markerCount: Int, publishedDate: String, scientificName: String, type: String, unit: String   , addAdditionalInfo:[ID], addMarkerPositions:[ID] , skipAssociationsExistenceChecks:Boolean = false): genomemap!
    updateGenomemap(genomeMapDbId: ID!, additionalInfo_IDs: [String], markerPositions_IDs: [String], comments: String, commonCropName: String, documentationURL: String, linkageGroupCount: Int, mapName: String, mapPUI: String, markerCount: Int, publishedDate: String, scientificName: String, type: String, unit: String   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addMarkerPositions:[ID], removeMarkerPositions:[ID]  , skipAssociationsExistenceChecks:Boolean = false): genomemap!
    deleteGenomemap(genomeMapDbId: ID!): String!
      }
`;