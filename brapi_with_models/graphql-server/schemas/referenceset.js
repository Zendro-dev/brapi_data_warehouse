module.exports = `
  type referenceset{
    """
    @original-field
    """
    referenceSetDbId: ID
    """
    @original-field
    
    """
    additionalInfo_IDs: [String]

    """
    @original-field
    The remaining information is about the source of the sequences Public id of this reference set, such as \`GRCH_37\`.
    """
    assemblyPUI: String

    """
    @original-field
    Common name for the crop
    """
    commonCropName: String

    """
    @original-field
    Optional free text description of this reference set.
    """
    description: String

    """
    @original-field
    
    """
    externalReferences_IDs: [String]

    """
    @original-field
    A reference set may be derived from a source if it contains additional sequences, or some of the sequences within it are derived (see the definition of \`isDerived\` in \`Reference\`).
    """
    isDerived: Boolean

    """
    @original-field
    Order-independent MD5 checksum which identifies this \`ReferenceSet\`.

To compute this checksum, make a list of \`Reference.md5checksum\` for all
\`Reference\` s in this set. Then sort that list, and take the MD5 hash of
all the strings concatenated together. Express the hash as a lower-case
hexadecimal string.
    """
    md5checksum: String

    """
    @original-field
    The human readable name of a ReferenceSet
    """
    referenceSetName: String

    """
    @original-field
    All known corresponding accession IDs in INSDC (GenBank/ENA/DDBJ) ideally with a version number, e.g. \`NC_000001.11\`.
    """
    sourceAccessions: [String]

    """
    @original-field
    
    """
    sourceGermplasm_IDs: [String]

    """
    @original-field
    Specifies a FASTA format file/string.
    """
    sourceURI: String

    """
    @original-field
    
    """
    species_ID: String

    """
    @original-field
    
    """
    references_IDs: [String]

    """
    @original-field
    
    """
    variants_IDs: [String]

    """
    @original-field
    
    """
    variantSets_IDs: [String]

    species(search: searchSpeciesInput): species
    
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
    sourceGermplasmFilter(search: searchSourcegermplasmInput, order: [ orderSourcegermplasmInput ], pagination: paginationInput!): [sourcegermplasm]


    """
    @search-request
    """
    sourceGermplasmConnection(search: searchSourcegermplasmInput, order: [ orderSourcegermplasmInput ], pagination: paginationCursorInput!): SourcegermplasmConnection

    """
    @count-request
    """
    countFilteredSourceGermplasm(search: searchSourcegermplasmInput) : Int
  
    """
    @search-request
    """
    referencesFilter(search: searchReferenceInput, order: [ orderReferenceInput ], pagination: paginationInput!): [reference]


    """
    @search-request
    """
    referencesConnection(search: searchReferenceInput, order: [ orderReferenceInput ], pagination: paginationCursorInput!): ReferenceConnection

    """
    @count-request
    """
    countFilteredReferences(search: searchReferenceInput) : Int
  
    """
    @search-request
    """
    variantsFilter(search: searchVariantInput, order: [ orderVariantInput ], pagination: paginationInput!): [variant]


    """
    @search-request
    """
    variantsConnection(search: searchVariantInput, order: [ orderVariantInput ], pagination: paginationCursorInput!): VariantConnection

    """
    @count-request
    """
    countFilteredVariants(search: searchVariantInput) : Int
  
    """
    @search-request
    """
    variantSetsFilter(search: searchVariantsetInput, order: [ orderVariantsetInput ], pagination: paginationInput!): [variantset]


    """
    @search-request
    """
    variantSetsConnection(search: searchVariantsetInput, order: [ orderVariantsetInput ], pagination: paginationCursorInput!): VariantsetConnection

    """
    @count-request
    """
    countFilteredVariantSets(search: searchVariantsetInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type ReferencesetConnection{
  edges: [ReferencesetEdge]
  referencesets: [referenceset]
  pageInfo: pageInfo!
}

type ReferencesetEdge{
  cursor: String!
  node: referenceset!
}

  enum referencesetField {
    referenceSetDbId
    additionalInfo_IDs
    assemblyPUI
    commonCropName
    description
    externalReferences_IDs
    isDerived
    md5checksum
    referenceSetName
    sourceAccessions
    sourceGermplasm_IDs
    sourceURI
    species_ID
    references_IDs
    variants_IDs
    variantSets_IDs
  }
  
  input searchReferencesetInput {
    field: referencesetField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchReferencesetInput]
  }

  input orderReferencesetInput{
    field: referencesetField
    order: Order
  }



  type Query {
    referencesets(search: searchReferencesetInput, order: [ orderReferencesetInput ], pagination: paginationInput! ): [referenceset]
    readOneReferenceset(referenceSetDbId: ID!): referenceset
    countReferencesets(search: searchReferencesetInput ): Int
    csvTableTemplateReferenceset: [String]
    referencesetsConnection(search:searchReferencesetInput, order: [ orderReferencesetInput ], pagination: paginationCursorInput! ): ReferencesetConnection
    validateReferencesetForCreation(referenceSetDbId: ID!, additionalInfo_IDs: [String], assemblyPUI: String, commonCropName: String, description: String, externalReferences_IDs: [String], isDerived: Boolean, md5checksum: String, referenceSetName: String, sourceAccessions: [String], sourceGermplasm_IDs: [String], sourceURI: String, species_ID: String, references_IDs: [String], variants_IDs: [String], variantSets_IDs: [String] , addSpecies:ID  , addAdditionalInfo:[ID], addExternalReferences:[ID], addSourceGermplasm:[ID], addReferences:[ID], addVariants:[ID], addVariantSets:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateReferencesetForUpdating(referenceSetDbId: ID!, additionalInfo_IDs: [String], assemblyPUI: String, commonCropName: String, description: String, externalReferences_IDs: [String], isDerived: Boolean, md5checksum: String, referenceSetName: String, sourceAccessions: [String], sourceGermplasm_IDs: [String], sourceURI: String, species_ID: String, references_IDs: [String], variants_IDs: [String], variantSets_IDs: [String] , addSpecies:ID, removeSpecies:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addSourceGermplasm:[ID], removeSourceGermplasm:[ID] , addReferences:[ID], removeReferences:[ID] , addVariants:[ID], removeVariants:[ID] , addVariantSets:[ID], removeVariantSets:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateReferencesetForDeletion(referenceSetDbId: ID!): Boolean!
    validateReferencesetAfterReading(referenceSetDbId: ID!): Boolean!
    """
    referencesetsZendroDefinition would return the static Zendro data model definition
    """
    referencesetsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addReferenceset(referenceSetDbId: ID!, additionalInfo_IDs: [String], assemblyPUI: String, commonCropName: String, description: String, externalReferences_IDs: [String], isDerived: Boolean, md5checksum: String, referenceSetName: String, sourceAccessions: [String], sourceGermplasm_IDs: [String], sourceURI: String, species_ID: String, references_IDs: [String], variants_IDs: [String], variantSets_IDs: [String] , addSpecies:ID  , addAdditionalInfo:[ID], addExternalReferences:[ID], addSourceGermplasm:[ID], addReferences:[ID], addVariants:[ID], addVariantSets:[ID] , skipAssociationsExistenceChecks:Boolean = false): referenceset!
    updateReferenceset(referenceSetDbId: ID!, additionalInfo_IDs: [String], assemblyPUI: String, commonCropName: String, description: String, externalReferences_IDs: [String], isDerived: Boolean, md5checksum: String, referenceSetName: String, sourceAccessions: [String], sourceGermplasm_IDs: [String], sourceURI: String, species_ID: String, references_IDs: [String], variants_IDs: [String], variantSets_IDs: [String] , addSpecies:ID, removeSpecies:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addSourceGermplasm:[ID], removeSourceGermplasm:[ID] , addReferences:[ID], removeReferences:[ID] , addVariants:[ID], removeVariants:[ID] , addVariantSets:[ID], removeVariantSets:[ID]  , skipAssociationsExistenceChecks:Boolean = false): referenceset!
    deleteReferenceset(referenceSetDbId: ID!): String!
      }
`;