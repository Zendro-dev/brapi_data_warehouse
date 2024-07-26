module.exports = `
  type scale{
    """
    @original-field
    """
    scaleDbId: ID
    """
    @original-field
    &lt;p&gt;Class of the scale, entries can be&lt;/p&gt;
&lt;p&gt;&#34;Code&#34; -  This scale class is exceptionally used to express complex traits. Code is a nominal scale that combines the expressions of the different traits composing the complex trait. For example a severity trait might be expressed by a 2 digit and 2 character code. The first 2 digits are the percentage of the plant covered by a fungus and the 2 characters refer to the delay in development, e.g. &#34;75VD&#34; means &#34;75 %&#34; of the plant is infected and the plant is very delayed.&lt;/p&gt;
&lt;p&gt;&#34;Date&#34; - The date class is for events expressed in a time format, See ISO 8601&lt;/p&gt;
&lt;p&gt;&#34;Duration&#34; - The Duration class is for time elapsed between two events expressed in a time format, e.g. days, hours, months&lt;/p&gt;
&lt;p&gt;&#34;Nominal&#34; - Categorical scale that can take one of a limited and fixed number of categories. There is no intrinsic ordering to the categories&lt;/p&gt;
&lt;p&gt;&#34;Numerical&#34; - Numerical scales express the trait with real numbers. The numerical scale defines the unit e.g. centimeter, ton per hectare, branches&lt;/p&gt;
&lt;p&gt;&#34;Ordinal&#34; - Ordinal scales are scales composed of ordered categories&lt;/p&gt;
&lt;p&gt;&#34;Text&#34; - A free text is used to express the trait.&lt;/p&gt;
    """
    dataType: String

    """
    @original-field
    For numerical, number of decimal places to be reported
    """
    decimalPlaces: Int

    """
    @original-field
    Name of the scale
&lt;br/&gt;MIAPPE V1.1 (DM-92) Scale Name of the scale associated with the variable
    """
    scaleName: String

    """
    @original-field
    The Permanent Unique Identifier of a Scale, usually in the form of a URI
    """
    scalePUI: String

    """
    @original-field
    This field can be used to describe the units used for this scale. This should be the abbreviated 
form of the units, intended to be displayed with every value using this scale. Usually this only 
applies when \`dataType\` is Numeric, but could also be included for other dataTypes when applicable.
    """
    units: String

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
    observationVariable_IDs: [String]

    """
    @original-field
    
    """
    validValues_ID: String

    ontologyReference(search: searchOntologyreferenceInput): ontologyreference
  germplasmAttribute(search: searchGermplasmattributeInput): germplasmattribute
  validValues(search: searchValidvalueInput): validvalue
    
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
    observationVariableFilter(search: searchObservationvariableInput, order: [ orderObservationvariableInput ], pagination: paginationInput!): [observationvariable]


    """
    @search-request
    """
    observationVariableConnection(search: searchObservationvariableInput, order: [ orderObservationvariableInput ], pagination: paginationCursorInput!): ObservationvariableConnection

    """
    @count-request
    """
    countFilteredObservationVariable(search: searchObservationvariableInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type ScaleConnection{
  edges: [ScaleEdge]
  scales: [scale]
  pageInfo: pageInfo!
}

type ScaleEdge{
  cursor: String!
  node: scale!
}

  enum scaleField {
    scaleDbId
    dataType
    decimalPlaces
    scaleName
    scalePUI
    units
    additionalInfo_IDs
    externalReferences_IDs
    ontologyReference_ID
    germplasmAttribute_ID
    observationVariable_IDs
    validValues_ID
  }
  
  input searchScaleInput {
    field: scaleField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchScaleInput]
  }

  input orderScaleInput{
    field: scaleField
    order: Order
  }



  type Query {
    scales(search: searchScaleInput, order: [ orderScaleInput ], pagination: paginationInput! ): [scale]
    readOneScale(scaleDbId: ID!): scale
    countScales(search: searchScaleInput ): Int
    csvTableTemplateScale: [String]
    scalesConnection(search:searchScaleInput, order: [ orderScaleInput ], pagination: paginationCursorInput! ): ScaleConnection
    validateScaleForCreation(scaleDbId: ID!, dataType: String, decimalPlaces: Int, scaleName: String, scalePUI: String, units: String, additionalInfo_IDs: [String], externalReferences_IDs: [String], ontologyReference_ID: String, germplasmAttribute_ID: String, observationVariable_IDs: [String], validValues_ID: String , addOntologyReference:ID, addGermplasmAttribute:ID, addValidValues:ID  , addAdditionalInfo:[ID], addExternalReferences:[ID], addObservationVariable:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateScaleForUpdating(scaleDbId: ID!, dataType: String, decimalPlaces: Int, scaleName: String, scalePUI: String, units: String, additionalInfo_IDs: [String], externalReferences_IDs: [String], ontologyReference_ID: String, germplasmAttribute_ID: String, observationVariable_IDs: [String], validValues_ID: String , addOntologyReference:ID, removeOntologyReference:ID , addGermplasmAttribute:ID, removeGermplasmAttribute:ID , addValidValues:ID, removeValidValues:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addObservationVariable:[ID], removeObservationVariable:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateScaleForDeletion(scaleDbId: ID!): Boolean!
    validateScaleAfterReading(scaleDbId: ID!): Boolean!
    """
    scalesZendroDefinition would return the static Zendro data model definition
    """
    scalesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addScale(scaleDbId: ID!, dataType: String, decimalPlaces: Int, scaleName: String, scalePUI: String, units: String, additionalInfo_IDs: [String], externalReferences_IDs: [String], ontologyReference_ID: String, germplasmAttribute_ID: String, observationVariable_IDs: [String], validValues_ID: String , addOntologyReference:ID, addGermplasmAttribute:ID, addValidValues:ID  , addAdditionalInfo:[ID], addExternalReferences:[ID], addObservationVariable:[ID] , skipAssociationsExistenceChecks:Boolean = false): scale!
    updateScale(scaleDbId: ID!, dataType: String, decimalPlaces: Int, scaleName: String, scalePUI: String, units: String, additionalInfo_IDs: [String], externalReferences_IDs: [String], ontologyReference_ID: String, germplasmAttribute_ID: String, observationVariable_IDs: [String], validValues_ID: String , addOntologyReference:ID, removeOntologyReference:ID , addGermplasmAttribute:ID, removeGermplasmAttribute:ID , addValidValues:ID, removeValidValues:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addObservationVariable:[ID], removeObservationVariable:[ID]  , skipAssociationsExistenceChecks:Boolean = false): scale!
    deleteScale(scaleDbId: ID!): String!
      }
`;