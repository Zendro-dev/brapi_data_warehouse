module.exports = `
  type variant{
    """
    @original-field
    """
    variantDbId: ID
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
    
    """
    alleleMatrices_IDs: [String]

    """
    @original-field
    
    """
    calls_IDs: [String]

    """
    @original-field
    Set of Analysis descriptors for this VariantSet
    """
    analysis: [String]

    """
    @original-field
    Similar to &#34;cipos&#34;, but for the variant&#39;s end position (which is derived from start + svlen).
    """
    ciend: [Int]

    """
    @original-field
    In the case of structural variants, start and end of the variant may not
be known with an exact base position. &#34;cipos&#34; provides an interval with
high confidence for the start position. The interval is provided by 0 or
2 signed integers which are added to the start position.
Based on the use in VCF v4.2
    """
    cipos: [Int]

    """
    @original-field
    The timestamp when this variant was created.
    """
    created: String

    """
    @original-field
    This field is optional and may be ignored if there is no relevant map or reference to be associated with.
&lt;br&gt;The end position (exclusive), resulting in [start, end) closed-open interval. This is typically calculated 
by \`start + referenceBases.length\`.
    """
    end: Int

    """
    @original-field
    
    """
    externalReferences_IDs: [String]

    """
    @original-field
    True if filters were applied for this variant. VCF column 7 &#34;FILTER&#34; any value other than the missing value.
    """
    filtersApplied: Boolean

    """
    @original-field
    Zero or more filters that failed for this variant. VCF column 7 &#34;FILTER&#34; shared across all alleles in the same VCF record.
    """
    filtersFailed: [String]

    """
    @original-field
    True if all filters for this variant passed. VCF column 7 &#34;FILTER&#34; value PASS.
    """
    filtersPassed: Boolean

    """
    @original-field
    
    """
    reference_ID: String

    """
    @original-field
    The reference bases for this variant. They start at the given start position.
    """
    referenceBases: String

    """
    @original-field
    
    """
    referenceSet_ID: String

    """
    @original-field
    This field is optional and may be ignored if there is no relevant map or reference to be associated with.
&lt;br&gt; The start position at which this variant occurs (0-based). This corresponds to the first base of the string 
of reference bases. Genomic positions are non-negative integers less than reference length. Variants spanning 
the join of circular genomes are represented as two variants one on each side of the join (position 0).
    """
    start: Int

    """
    @original-field
    Length of the - if labeled as such in variant_type - structural variation. Based on the use in VCF v4.2
    """
    svlen: Int

    """
    @original-field
    The time at which this variant was last updated.
    """
    updated: String

    """
    @original-field
    A human readable name associated with a \`Variant\`
    """
    variantNames: [String]

    """
    @original-field
    
    """
    variantSet_ID: String

    """
    @original-field
    The &#34;variant_type&#34; is used to denote e.g. structural variants.
Examples:
  DUP  : duplication of sequence following &#34;start&#34;
  DEL  : deletion of sequence following &#34;start&#34;
    """
    variantType: String

    reference(search: searchReferenceInput): reference
  referenceSet(search: searchReferencesetInput): referenceset
  variantSet(search: searchVariantsetInput): variantset
    
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
    @search-request
    """
    alleleMatricesFilter(search: searchAllelematrixInput, order: [ orderAllelematrixInput ], pagination: paginationInput!): [allelematrix]


    """
    @search-request
    """
    alleleMatricesConnection(search: searchAllelematrixInput, order: [ orderAllelematrixInput ], pagination: paginationCursorInput!): AllelematrixConnection

    """
    @count-request
    """
    countFilteredAlleleMatrices(search: searchAllelematrixInput) : Int
  
    """
    @search-request
    """
    callsFilter(search: searchCallInput, order: [ orderCallInput ], pagination: paginationInput!): [call]


    """
    @search-request
    """
    callsConnection(search: searchCallInput, order: [ orderCallInput ], pagination: paginationCursorInput!): CallConnection

    """
    @count-request
    """
    countFilteredCalls(search: searchCallInput) : Int
  
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
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type VariantConnection{
  edges: [VariantEdge]
  variants: [variant]
  pageInfo: pageInfo!
}

type VariantEdge{
  cursor: String!
  node: variant!
}

  enum variantField {
    variantDbId
    additionalInfo_IDs
    markerPositions_IDs
    alleleMatrices_IDs
    calls_IDs
    analysis
    ciend
    cipos
    created
    end
    externalReferences_IDs
    filtersApplied
    filtersFailed
    filtersPassed
    reference_ID
    referenceBases
    referenceSet_ID
    start
    svlen
    updated
    variantNames
    variantSet_ID
    variantType
  }
  
  input searchVariantInput {
    field: variantField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchVariantInput]
  }

  input orderVariantInput{
    field: variantField
    order: Order
  }



  type Query {
    variants(search: searchVariantInput, order: [ orderVariantInput ], pagination: paginationInput! ): [variant]
    readOneVariant(variantDbId: ID!): variant
    countVariants(search: searchVariantInput ): Int
    csvTableTemplateVariant: [String]
    variantsConnection(search:searchVariantInput, order: [ orderVariantInput ], pagination: paginationCursorInput! ): VariantConnection
    validateVariantForCreation(variantDbId: ID!, additionalInfo_IDs: [String], markerPositions_IDs: [String], calls_IDs: [String], analysis: [String], ciend: [Int], cipos: [Int], created: String, end: Int, externalReferences_IDs: [String], filtersApplied: Boolean, filtersFailed: [String], filtersPassed: Boolean, reference_ID: String, referenceBases: String, referenceSet_ID: String, start: Int, svlen: Int, updated: String, variantNames: [String], variantSet_ID: String, variantType: String , addReference:ID, addReferenceSet:ID, addVariantSet:ID  , addAdditionalInfo:[ID], addMarkerPositions:[ID], addAlleleMatrices:[ID], addCalls:[ID], addExternalReferences:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateVariantForUpdating(variantDbId: ID!, additionalInfo_IDs: [String], markerPositions_IDs: [String], calls_IDs: [String], analysis: [String], ciend: [Int], cipos: [Int], created: String, end: Int, externalReferences_IDs: [String], filtersApplied: Boolean, filtersFailed: [String], filtersPassed: Boolean, reference_ID: String, referenceBases: String, referenceSet_ID: String, start: Int, svlen: Int, updated: String, variantNames: [String], variantSet_ID: String, variantType: String , addReference:ID, removeReference:ID , addReferenceSet:ID, removeReferenceSet:ID , addVariantSet:ID, removeVariantSet:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addMarkerPositions:[ID], removeMarkerPositions:[ID] , addAlleleMatrices:[ID], removeAlleleMatrices:[ID] , addCalls:[ID], removeCalls:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateVariantForDeletion(variantDbId: ID!): Boolean!
    validateVariantAfterReading(variantDbId: ID!): Boolean!
    """
    variantsZendroDefinition would return the static Zendro data model definition
    """
    variantsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addVariant(variantDbId: ID!, additionalInfo_IDs: [String], markerPositions_IDs: [String], calls_IDs: [String], analysis: [String], ciend: [Int], cipos: [Int], created: String, end: Int, externalReferences_IDs: [String], filtersApplied: Boolean, filtersFailed: [String], filtersPassed: Boolean, reference_ID: String, referenceBases: String, referenceSet_ID: String, start: Int, svlen: Int, updated: String, variantNames: [String], variantSet_ID: String, variantType: String , addReference:ID, addReferenceSet:ID, addVariantSet:ID  , addAdditionalInfo:[ID], addMarkerPositions:[ID], addAlleleMatrices:[ID], addCalls:[ID], addExternalReferences:[ID] , skipAssociationsExistenceChecks:Boolean = false): variant!
    updateVariant(variantDbId: ID!, additionalInfo_IDs: [String], markerPositions_IDs: [String], calls_IDs: [String], analysis: [String], ciend: [Int], cipos: [Int], created: String, end: Int, externalReferences_IDs: [String], filtersApplied: Boolean, filtersFailed: [String], filtersPassed: Boolean, reference_ID: String, referenceBases: String, referenceSet_ID: String, start: Int, svlen: Int, updated: String, variantNames: [String], variantSet_ID: String, variantType: String , addReference:ID, removeReference:ID , addReferenceSet:ID, removeReferenceSet:ID , addVariantSet:ID, removeVariantSet:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addMarkerPositions:[ID], removeMarkerPositions:[ID] , addAlleleMatrices:[ID], removeAlleleMatrices:[ID] , addCalls:[ID], removeCalls:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID]  , skipAssociationsExistenceChecks:Boolean = false): variant!
    deleteVariant(variantDbId: ID!): String!
      }
`;