module.exports = `
  type trait{
    """
    @original-field
    """
    traitDbId: ID
    """
    @original-field
    A list of shortened, human readable, names for a Trait. These abbreviations are acceptable alternatives to the mainAbbreviation and do not need to follow any formatting convention.
    """
    alternativeAbbreviations: [String]

    """
    @original-field
    A trait can be decomposed as &#34;Trait&#34; = &#34;Entity&#34; + &#34;Attribute&#34;, the attribute is the observed feature (or characteristic) of the entity e.g., for &#34;grain colour&#34;, attribute = &#34;colour&#34;
    """
    attribute: String

    """
    @original-field
    The Permanent Unique Identifier of a Trait Attribute, usually in the form of a URI
&lt;br/&gt;A trait can be decomposed as &#34;Trait&#34; = &#34;Entity&#34; + &#34;Attribute&#34;, the attribute is the observed feature (or characteristic) of the entity e.g., for &#34;grain colour&#34;, attribute = &#34;colour&#34;
    """
    attributePUI: String

    """
    @original-field
    A trait can be decomposed as &#34;Trait&#34; = &#34;Entity&#34; + &#34;Attribute&#34;, the entity is the part of the plant that the trait refers to e.g., for &#34;grain colour&#34;, entity = &#34;grain&#34;
    """
    entity: String

    """
    @original-field
    The Permanent Unique Identifier of a Trait Entity, usually in the form of a URI
&lt;br/&gt;A Trait can be decomposed as &#34;Trait&#34; = &#34;Entity&#34; + &#34;Attribute&#34;, the Entity is the part of the plant that the trait refers to e.g., for &#34;grain colour&#34;, entity = &#34;grain&#34; 
    """
    entityPUI: String

    """
    @original-field
    A shortened version of the human readable name for a Trait
    """
    mainAbbreviation: String

    """
    @original-field
    Trait status (examples: &#34;recommended&#34;, &#34;obsolete&#34;, &#34;legacy&#34;, etc.)
    """
    status: String

    """
    @original-field
    Other trait names
    """
    synonyms: [String]

    """
    @original-field
    A classification to describe the type of trait and the context it should be considered in.
&lt;br/&gt; examples- &#34;morphological&#34;, &#34;phenological&#34;, &#34;agronomical&#34;, &#34;physiological&#34;, &#34;abiotic stress&#34;, &#34;biotic stress&#34;, &#34;biochemical&#34;, &#34;quality traits&#34;, &#34;fertility&#34;, etc.
    """
    traitClass: String

    """
    @original-field
    The description of a trait
    """
    traitDescription: String

    """
    @original-field
    The human readable name of a trait
&lt;br/&gt;MIAPPE V1.1 (DM-86) Trait - Name of the (plant or environmental) trait under observation
    """
    traitName: String

    """
    @original-field
    The Permanent Unique Identifier of a Trait, usually in the form of a URI
    """
    traitPUI: String

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
    ontologyReference_ID: String

    """
    @original-field
    
    """
    germplasmAttribute_ID: String

    """
    @original-field
    
    """
    observationVariables_IDs: [String]

    ontologyReference(search: searchOntologyreferenceInput): ontologyreference
  germplasmAttribute(search: searchGermplasmattributeInput): germplasmattribute
    
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
    observationVariablesFilter(search: searchObservationvariableInput, order: [ orderObservationvariableInput ], pagination: paginationInput!): [observationvariable]


    """
    @search-request
    """
    observationVariablesConnection(search: searchObservationvariableInput, order: [ orderObservationvariableInput ], pagination: paginationCursorInput!): ObservationvariableConnection

    """
    @count-request
    """
    countFilteredObservationVariables(search: searchObservationvariableInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type TraitConnection{
  edges: [TraitEdge]
  traits: [trait]
  pageInfo: pageInfo!
}

type TraitEdge{
  cursor: String!
  node: trait!
}

  enum traitField {
    traitDbId
    alternativeAbbreviations
    attribute
    attributePUI
    entity
    entityPUI
    mainAbbreviation
    status
    synonyms
    traitClass
    traitDescription
    traitName
    traitPUI
    additionalInfo_IDs
    externalReferences_IDs
    ontologyReference_ID
    germplasmAttribute_ID
    observationVariables_IDs
  }
  
  input searchTraitInput {
    field: traitField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchTraitInput]
  }

  input orderTraitInput{
    field: traitField
    order: Order
  }



  type Query {
    traits(search: searchTraitInput, order: [ orderTraitInput ], pagination: paginationInput! ): [trait]
    readOneTrait(traitDbId: ID!): trait
    countTraits(search: searchTraitInput ): Int
    csvTableTemplateTrait: [String]
    traitsConnection(search:searchTraitInput, order: [ orderTraitInput ], pagination: paginationCursorInput! ): TraitConnection
    validateTraitForCreation(traitDbId: ID!, alternativeAbbreviations: [String], attribute: String, attributePUI: String, entity: String, entityPUI: String, mainAbbreviation: String, status: String, synonyms: [String], traitClass: String, traitDescription: String, traitName: String, traitPUI: String, additionalInfo_IDs: [String], externalReferences_IDs: [String], ontologyReference_ID: String, germplasmAttribute_ID: String, observationVariables_IDs: [String] , addOntologyReference:ID, addGermplasmAttribute:ID  , addAdditionalInfo:[ID], addExternalReferences:[ID], addObservationVariables:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateTraitForUpdating(traitDbId: ID!, alternativeAbbreviations: [String], attribute: String, attributePUI: String, entity: String, entityPUI: String, mainAbbreviation: String, status: String, synonyms: [String], traitClass: String, traitDescription: String, traitName: String, traitPUI: String, additionalInfo_IDs: [String], externalReferences_IDs: [String], ontologyReference_ID: String, germplasmAttribute_ID: String, observationVariables_IDs: [String] , addOntologyReference:ID, removeOntologyReference:ID , addGermplasmAttribute:ID, removeGermplasmAttribute:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addObservationVariables:[ID], removeObservationVariables:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateTraitForDeletion(traitDbId: ID!): Boolean!
    validateTraitAfterReading(traitDbId: ID!): Boolean!
    """
    traitsZendroDefinition would return the static Zendro data model definition
    """
    traitsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addTrait(traitDbId: ID!, alternativeAbbreviations: [String], attribute: String, attributePUI: String, entity: String, entityPUI: String, mainAbbreviation: String, status: String, synonyms: [String], traitClass: String, traitDescription: String, traitName: String, traitPUI: String, additionalInfo_IDs: [String], externalReferences_IDs: [String], ontologyReference_ID: String, germplasmAttribute_ID: String, observationVariables_IDs: [String] , addOntologyReference:ID, addGermplasmAttribute:ID  , addAdditionalInfo:[ID], addExternalReferences:[ID], addObservationVariables:[ID] , skipAssociationsExistenceChecks:Boolean = false): trait!
    updateTrait(traitDbId: ID!, alternativeAbbreviations: [String], attribute: String, attributePUI: String, entity: String, entityPUI: String, mainAbbreviation: String, status: String, synonyms: [String], traitClass: String, traitDescription: String, traitName: String, traitPUI: String, additionalInfo_IDs: [String], externalReferences_IDs: [String], ontologyReference_ID: String, germplasmAttribute_ID: String, observationVariables_IDs: [String] , addOntologyReference:ID, removeOntologyReference:ID , addGermplasmAttribute:ID, removeGermplasmAttribute:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addObservationVariables:[ID], removeObservationVariables:[ID]  , skipAssociationsExistenceChecks:Boolean = false): trait!
    deleteTrait(traitDbId: ID!): String!
      }
`;