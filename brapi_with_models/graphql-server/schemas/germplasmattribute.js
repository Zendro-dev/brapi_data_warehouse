module.exports = `
  type germplasmattribute{
    """
    @original-field
    """
    germplasmAttributeDbId: ID
    """
    @original-field
    The human readable identifier of a germplasm attribute
    """
    attributeName: String

    """
    @original-field
    General category for the attribute. very similar to Trait class.
    """
    attributeCategory: String

    """
    @original-field
    A human readable description of this attribute
    """
    attributeDescription: String

    """
    @original-field
    The Permanent Unique Identifier of an Attribute, usually in the form of a URI
    """
    attributePUI: String

    """
    @original-field
    Crop name (examples: &#34;Maize&#34;, &#34;Wheat&#34;)
    """
    commonCropName: String

    """
    @original-field
    Indication of how trait is routinely used. (examples: [&#34;Trial evaluation&#34;, &#34;Nursery evaluation&#34;])
    """
    contextOfUse: [String]

    """
    @original-field
    Variable default value. (examples: &#34;red&#34;, &#34;2.3&#34;, etc.)
    """
    defaultValue: String

    """
    @original-field
    A URL to the human readable documentation of an object
    """
    documentationURL: String

    """
    @original-field
    Growth stage at which measurement is made (examples: &#34;flowering&#34;)
    """
    growthStage: String

    """
    @original-field
    Name of institution submitting the variable
    """
    institution: String

    """
    @original-field
    2 letter ISO 639-1 code for the language of submission of the variable.
    """
    language: String

    """
    @original-field
    Name of scientist submitting the variable.
    """
    scientist: String

    """
    @original-field
    Variable status. (examples: &#34;recommended&#34;, &#34;obsolete&#34;, &#34;legacy&#34;, etc.)
    """
    status: String

    """
    @original-field
    Timestamp when the Variable was added (ISO 8601)
    """
    submissionTimestamp: String

    """
    @original-field
    Other variable names
    """
    synonyms: [String]

    """
    @original-field
    
    """
    germplasmAttributeValues_IDs: [String]

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
    method_ID: String

    """
    @original-field
    
    """
    ontologyReference_ID: String

    """
    @original-field
    
    """
    scale_ID: String

    """
    @original-field
    
    """
    trait_ID: String

    method(search: searchMethodInput): method
  ontologyReference(search: searchOntologyreferenceInput): ontologyreference
  scale(search: searchScaleInput): scale
  trait(search: searchTraitInput): trait
    
    """
    @search-request
    """
    germplasmAttributeValuesFilter(search: searchGermplasmattributevalueInput, order: [ orderGermplasmattributevalueInput ], pagination: paginationInput!): [germplasmattributevalue]


    """
    @search-request
    """
    germplasmAttributeValuesConnection(search: searchGermplasmattributevalueInput, order: [ orderGermplasmattributevalueInput ], pagination: paginationCursorInput!): GermplasmattributevalueConnection

    """
    @count-request
    """
    countFilteredGermplasmAttributeValues(search: searchGermplasmattributevalueInput) : Int
  
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
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type GermplasmattributeConnection{
  edges: [GermplasmattributeEdge]
  germplasmattributes: [germplasmattribute]
  pageInfo: pageInfo!
}

type GermplasmattributeEdge{
  cursor: String!
  node: germplasmattribute!
}

  enum germplasmattributeField {
    germplasmAttributeDbId
    attributeName
    attributeCategory
    attributeDescription
    attributePUI
    commonCropName
    contextOfUse
    defaultValue
    documentationURL
    growthStage
    institution
    language
    scientist
    status
    submissionTimestamp
    synonyms
    germplasmAttributeValues_IDs
    additionalInfo_IDs
    externalReferences_IDs
    method_ID
    ontologyReference_ID
    scale_ID
    trait_ID
  }
  
  input searchGermplasmattributeInput {
    field: germplasmattributeField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchGermplasmattributeInput]
  }

  input orderGermplasmattributeInput{
    field: germplasmattributeField
    order: Order
  }



  type Query {
    germplasmattributes(search: searchGermplasmattributeInput, order: [ orderGermplasmattributeInput ], pagination: paginationInput! ): [germplasmattribute]
    readOneGermplasmattribute(germplasmAttributeDbId: ID!): germplasmattribute
    countGermplasmattributes(search: searchGermplasmattributeInput ): Int
    csvTableTemplateGermplasmattribute: [String]
    germplasmattributesConnection(search:searchGermplasmattributeInput, order: [ orderGermplasmattributeInput ], pagination: paginationCursorInput! ): GermplasmattributeConnection
    validateGermplasmattributeForCreation(germplasmAttributeDbId: ID!, attributeName: String, attributeCategory: String, attributeDescription: String, attributePUI: String, commonCropName: String, contextOfUse: [String], defaultValue: String, documentationURL: String, growthStage: String, institution: String, language: String, scientist: String, status: String, submissionTimestamp: String, synonyms: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String], method_ID: String, ontologyReference_ID: String, scale_ID: String, trait_ID: String , addMethod:ID, addOntologyReference:ID, addScale:ID, addTrait:ID  , addGermplasmAttributeValues:[ID], addAdditionalInfo:[ID], addExternalReferences:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateGermplasmattributeForUpdating(germplasmAttributeDbId: ID!, attributeName: String, attributeCategory: String, attributeDescription: String, attributePUI: String, commonCropName: String, contextOfUse: [String], defaultValue: String, documentationURL: String, growthStage: String, institution: String, language: String, scientist: String, status: String, submissionTimestamp: String, synonyms: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String], method_ID: String, ontologyReference_ID: String, scale_ID: String, trait_ID: String , addMethod:ID, removeMethod:ID , addOntologyReference:ID, removeOntologyReference:ID , addScale:ID, removeScale:ID , addTrait:ID, removeTrait:ID   , addGermplasmAttributeValues:[ID], removeGermplasmAttributeValues:[ID] , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateGermplasmattributeForDeletion(germplasmAttributeDbId: ID!): Boolean!
    validateGermplasmattributeAfterReading(germplasmAttributeDbId: ID!): Boolean!
    """
    germplasmattributesZendroDefinition would return the static Zendro data model definition
    """
    germplasmattributesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addGermplasmattribute(germplasmAttributeDbId: ID!, attributeName: String, attributeCategory: String, attributeDescription: String, attributePUI: String, commonCropName: String, contextOfUse: [String], defaultValue: String, documentationURL: String, growthStage: String, institution: String, language: String, scientist: String, status: String, submissionTimestamp: String, synonyms: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String], method_ID: String, ontologyReference_ID: String, scale_ID: String, trait_ID: String , addMethod:ID, addOntologyReference:ID, addScale:ID, addTrait:ID  , addGermplasmAttributeValues:[ID], addAdditionalInfo:[ID], addExternalReferences:[ID] , skipAssociationsExistenceChecks:Boolean = false): germplasmattribute!
    updateGermplasmattribute(germplasmAttributeDbId: ID!, attributeName: String, attributeCategory: String, attributeDescription: String, attributePUI: String, commonCropName: String, contextOfUse: [String], defaultValue: String, documentationURL: String, growthStage: String, institution: String, language: String, scientist: String, status: String, submissionTimestamp: String, synonyms: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String], method_ID: String, ontologyReference_ID: String, scale_ID: String, trait_ID: String , addMethod:ID, removeMethod:ID , addOntologyReference:ID, removeOntologyReference:ID , addScale:ID, removeScale:ID , addTrait:ID, removeTrait:ID   , addGermplasmAttributeValues:[ID], removeGermplasmAttributeValues:[ID] , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID]  , skipAssociationsExistenceChecks:Boolean = false): germplasmattribute!
    deleteGermplasmattribute(germplasmAttributeDbId: ID!): String!
      }
`;