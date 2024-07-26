module.exports = `
  type reference{
    """
    @original-field
    """
    referenceDbId: ID
    """
    @original-field
    
    """
    additionalInfo_IDs: [String]

    """
    @original-field
    Common name for the crop
    """
    commonCropName: String

    """
    @original-field
    
    """
    externalReferences_IDs: [String]

    """
    @original-field
    A sequence X is said to be derived from source sequence Y, if X and Y are of the same length and the per-base sequence divergence at A/C/G/T bases is sufficiently small. Two sequences derived from the same official sequence share the same coordinates and annotations, and can be replaced with the official sequence for certain use cases.
    """
    isDerived: Boolean

    """
    @original-field
    The length of this \`Reference\` sequence.
    """
    length: Int

    """
    @original-field
    The MD5 checksum uniquely representing this \`Reference\` as a lower-case hexadecimal string, calculated as the MD5 of the upper-case sequence excluding all whitespace characters (this is equivalent to SQ:M5 in SAM).
    """
    md5checksum: String

    """
    @original-field
    The human readable name of a \`Reference\` within a \`ReferenceSet\`.
    """
    referenceName: String

    """
    @original-field
    
    """
    referenceSet_ID: String

    """
    @original-field
    All known corresponding accession IDs in INSDC (GenBank/ENA/DDBJ) which must include a version number, e.g. \`GCF_000001405.26\`.
    """
    sourceAccessions: [String]

    """
    @original-field
    The \`sourceDivergence\` is the fraction of non-indel bases that do not match the \`Reference\` this message was derived from.
    """
    sourceDivergence: Float

    """
    @original-field
    
    """
    sourceGermplasm_IDs: [String]

    """
    @original-field
    The URI from which the sequence was obtained. Specifies a FASTA format file/string with one name, sequence pair. In most cases, clients should call the \`getReferenceBases()\` method to obtain sequence bases for a \`Reference\` instead of attempting to retrieve this URI.
    """
    sourceURI: String

    """
    @original-field
    
    """
    species_ID: String

    """
    @original-field
    
    """
    variants_IDs: [String]

    referenceSet(search: searchReferencesetInput): referenceset
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
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type ReferenceConnection{
  edges: [ReferenceEdge]
  references: [reference]
  pageInfo: pageInfo!
}

type ReferenceEdge{
  cursor: String!
  node: reference!
}

  enum referenceField {
    referenceDbId
    additionalInfo_IDs
    commonCropName
    externalReferences_IDs
    isDerived
    length
    md5checksum
    referenceName
    referenceSet_ID
    sourceAccessions
    sourceDivergence
    sourceGermplasm_IDs
    sourceURI
    species_ID
    variants_IDs
  }
  
  input searchReferenceInput {
    field: referenceField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchReferenceInput]
  }

  input orderReferenceInput{
    field: referenceField
    order: Order
  }



  type Query {
    references(search: searchReferenceInput, order: [ orderReferenceInput ], pagination: paginationInput! ): [reference]
    readOneReference(referenceDbId: ID!): reference
    countReferences(search: searchReferenceInput ): Int
    csvTableTemplateReference: [String]
    referencesConnection(search:searchReferenceInput, order: [ orderReferenceInput ], pagination: paginationCursorInput! ): ReferenceConnection
    validateReferenceForCreation(referenceDbId: ID!, additionalInfo_IDs: [String], commonCropName: String, externalReferences_IDs: [String], isDerived: Boolean, length: Int, md5checksum: String, referenceName: String, referenceSet_ID: String, sourceAccessions: [String], sourceDivergence: Float, sourceGermplasm_IDs: [String], sourceURI: String, species_ID: String, variants_IDs: [String] , addReferenceSet:ID, addSpecies:ID  , addAdditionalInfo:[ID], addExternalReferences:[ID], addSourceGermplasm:[ID], addVariants:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateReferenceForUpdating(referenceDbId: ID!, additionalInfo_IDs: [String], commonCropName: String, externalReferences_IDs: [String], isDerived: Boolean, length: Int, md5checksum: String, referenceName: String, referenceSet_ID: String, sourceAccessions: [String], sourceDivergence: Float, sourceGermplasm_IDs: [String], sourceURI: String, species_ID: String, variants_IDs: [String] , addReferenceSet:ID, removeReferenceSet:ID , addSpecies:ID, removeSpecies:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addSourceGermplasm:[ID], removeSourceGermplasm:[ID] , addVariants:[ID], removeVariants:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateReferenceForDeletion(referenceDbId: ID!): Boolean!
    validateReferenceAfterReading(referenceDbId: ID!): Boolean!
    """
    referencesZendroDefinition would return the static Zendro data model definition
    """
    referencesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addReference(referenceDbId: ID!, additionalInfo_IDs: [String], commonCropName: String, externalReferences_IDs: [String], isDerived: Boolean, length: Int, md5checksum: String, referenceName: String, referenceSet_ID: String, sourceAccessions: [String], sourceDivergence: Float, sourceGermplasm_IDs: [String], sourceURI: String, species_ID: String, variants_IDs: [String] , addReferenceSet:ID, addSpecies:ID  , addAdditionalInfo:[ID], addExternalReferences:[ID], addSourceGermplasm:[ID], addVariants:[ID] , skipAssociationsExistenceChecks:Boolean = false): reference!
    updateReference(referenceDbId: ID!, additionalInfo_IDs: [String], commonCropName: String, externalReferences_IDs: [String], isDerived: Boolean, length: Int, md5checksum: String, referenceName: String, referenceSet_ID: String, sourceAccessions: [String], sourceDivergence: Float, sourceGermplasm_IDs: [String], sourceURI: String, species_ID: String, variants_IDs: [String] , addReferenceSet:ID, removeReferenceSet:ID , addSpecies:ID, removeSpecies:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addSourceGermplasm:[ID], removeSourceGermplasm:[ID] , addVariants:[ID], removeVariants:[ID]  , skipAssociationsExistenceChecks:Boolean = false): reference!
    deleteReference(referenceDbId: ID!): String!
      }
`;