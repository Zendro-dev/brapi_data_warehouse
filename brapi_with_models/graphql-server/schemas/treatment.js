module.exports = `
  type treatment{
    """
    @original-field
    """
    treatmentDbId: ID
    """
    @original-field
    The type of treatment/factor. ex. &#39;fertilizer&#39;, &#39;inoculation&#39;, &#39;irrigation&#39;, etc

MIAPPE V1.1 (DM-61) Experimental Factor type - Name/Acronym of the experimental factor.
    """
    factor: String

    """
    @original-field
    The treatment/factor description. ex. &#39;low fertilizer&#39;, &#39;yellow rust inoculation&#39;, &#39;high water&#39;, etc

MIAPPE V1.1 (DM-62) Experimental Factor description - Free text description of the experimental factor. This includes all relevant treatments planned and protocol planned for all the plants targeted by a given experimental factor. 
    """
    modality: String

    """
    @original-field
    
    """
    observationUnits_IDs: [String]

      
    """
    @search-request
    """
    observationUnitsFilter(search: searchObservationunitInput, order: [ orderObservationunitInput ], pagination: paginationInput!): [observationunit]


    """
    @search-request
    """
    observationUnitsConnection(search: searchObservationunitInput, order: [ orderObservationunitInput ], pagination: paginationCursorInput!): ObservationunitConnection

    """
    @count-request
    """
    countFilteredObservationUnits(search: searchObservationunitInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type TreatmentConnection{
  edges: [TreatmentEdge]
  treatments: [treatment]
  pageInfo: pageInfo!
}

type TreatmentEdge{
  cursor: String!
  node: treatment!
}

  enum treatmentField {
    treatmentDbId
    factor
    modality
    observationUnits_IDs
  }
  
  input searchTreatmentInput {
    field: treatmentField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchTreatmentInput]
  }

  input orderTreatmentInput{
    field: treatmentField
    order: Order
  }



  type Query {
    treatments(search: searchTreatmentInput, order: [ orderTreatmentInput ], pagination: paginationInput! ): [treatment]
    readOneTreatment(treatmentDbId: ID!): treatment
    countTreatments(search: searchTreatmentInput ): Int
    csvTableTemplateTreatment: [String]
    treatmentsConnection(search:searchTreatmentInput, order: [ orderTreatmentInput ], pagination: paginationCursorInput! ): TreatmentConnection
    validateTreatmentForCreation(treatmentDbId: ID!, factor: String, modality: String   , addObservationUnits:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateTreatmentForUpdating(treatmentDbId: ID!, factor: String, modality: String   , addObservationUnits:[ID], removeObservationUnits:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateTreatmentForDeletion(treatmentDbId: ID!): Boolean!
    validateTreatmentAfterReading(treatmentDbId: ID!): Boolean!
    """
    treatmentsZendroDefinition would return the static Zendro data model definition
    """
    treatmentsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addTreatment(treatmentDbId: ID!, factor: String, modality: String   , addObservationUnits:[ID] , skipAssociationsExistenceChecks:Boolean = false): treatment!
    updateTreatment(treatmentDbId: ID!, factor: String, modality: String   , addObservationUnits:[ID], removeObservationUnits:[ID]  , skipAssociationsExistenceChecks:Boolean = false): treatment!
    deleteTreatment(treatmentDbId: ID!): String!
      }
`;