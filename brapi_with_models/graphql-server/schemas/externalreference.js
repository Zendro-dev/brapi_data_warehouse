module.exports = `
  type externalreference{
    """
    @original-field
    """
    externalReferenceDbId: ID
    """
    @original-field
    The external reference ID. Could be a simple string or a URI.
    """
    externalID: String

    """
    @original-field
    An identifier for the source system or database of this reference
    """
    referenceSource: String

    """
    @original-field
    
    """
    callset_ID: String

    """
    @original-field
    
    """
    cross_ID: String

    """
    @original-field
    
    """
    crossingProject_ID: String

    """
    @original-field
    
    """
    germplasm_ID: String

    """
    @original-field
    
    """
    germplasmAttribute_ID: String

    """
    @original-field
    
    """
    germplasmAttributeValue_ID: String

    """
    @original-field
    
    """
    image_ID: String

    """
    @original-field
    
    """
    method_ID: String

    """
    @original-field
    
    """
    list_ID: String

    """
    @original-field
    
    """
    location_ID: String

    """
    @original-field
    
    """
    observation_ID: String

    """
    @original-field
    
    """
    observationUnit_ID: String

    """
    @original-field
    
    """
    observationVariable_ID: String

    """
    @original-field
    
    """
    plate_ID: String

    """
    @original-field
    
    """
    person_ID: String

    """
    @original-field
    
    """
    pedigreeNode_ID: String

    """
    @original-field
    
    """
    plannedCross_ID: String

    """
    @original-field
    
    """
    program_ID: String

    """
    @original-field
    
    """
    reference_ID: String

    """
    @original-field
    
    """
    referenceset_ID: String

    """
    @original-field
    
    """
    sample_ID: String

    """
    @original-field
    
    """
    scale_ID: String

    """
    @original-field
    
    """
    seedLot_ID: String

    """
    @original-field
    
    """
    seedLotTransaction_ID: String

    """
    @original-field
    
    """
    study_ID: String

    """
    @original-field
    
    """
    trait_ID: String

    """
    @original-field
    
    """
    trial_ID: String

    """
    @original-field
    
    """
    variant_ID: String

    """
    @original-field
    
    """
    variantset_ID: String

    callset(search: searchCallsetInput): callset
  cross(search: searchCrossInput): cross
  crossingProject(search: searchCrossingprojectInput): crossingproject
  germplasm(search: searchGermplasmInput): germplasm
  germplasmAttribute(search: searchGermplasmattributeInput): germplasmattribute
  germplasmAttributeValue(search: searchGermplasmattributevalueInput): germplasmattributevalue
  image(search: searchImageInput): image
  method(search: searchMethodInput): method
  list(search: searchListInput): list
  location(search: searchLocationInput): location
  observation(search: searchObservationInput): observation
  observationUnit(search: searchObservationunitInput): observationunit
  observationVariable(search: searchObservationvariableInput): observationvariable
  plate(search: searchPlateInput): plate
  person(search: searchPersonInput): person
  pedigreeNode(search: searchPedigreenodeInput): pedigreenode
  plannedCross(search: searchPlannedcrossInput): plannedcross
  program(search: searchProgramInput): program
  reference(search: searchReferenceInput): reference
  referenceset(search: searchReferencesetInput): referenceset
  sample(search: searchSampleInput): sample
  scale(search: searchScaleInput): scale
  seedLot(search: searchSeedlotInput): seedlot
  seedLotTransaction(search: searchSeedlottransactionInput): seedlottransaction
  study(search: searchStudyInput): study
  trait(search: searchTraitInput): trait
  trial(search: searchTrialInput): trial
  variant(search: searchVariantInput): variant
  variantset(search: searchVariantsetInput): variantset
    
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type ExternalreferenceConnection{
  edges: [ExternalreferenceEdge]
  externalreferences: [externalreference]
  pageInfo: pageInfo!
}

type ExternalreferenceEdge{
  cursor: String!
  node: externalreference!
}

  enum externalreferenceField {
    externalReferenceDbId
    externalID
    referenceSource
    callset_ID
    cross_ID
    crossingProject_ID
    germplasm_ID
    germplasmAttribute_ID
    germplasmAttributeValue_ID
    image_ID
    method_ID
    list_ID
    location_ID
    observation_ID
    observationUnit_ID
    observationVariable_ID
    plate_ID
    person_ID
    pedigreeNode_ID
    plannedCross_ID
    program_ID
    reference_ID
    referenceset_ID
    sample_ID
    scale_ID
    seedLot_ID
    seedLotTransaction_ID
    study_ID
    trait_ID
    trial_ID
    variant_ID
    variantset_ID
  }
  
  input searchExternalreferenceInput {
    field: externalreferenceField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchExternalreferenceInput]
  }

  input orderExternalreferenceInput{
    field: externalreferenceField
    order: Order
  }



  type Query {
    externalreferences(search: searchExternalreferenceInput, order: [ orderExternalreferenceInput ], pagination: paginationInput! ): [externalreference]
    readOneExternalreference(externalReferenceDbId: ID!): externalreference
    countExternalreferences(search: searchExternalreferenceInput ): Int
    csvTableTemplateExternalreference: [String]
    externalreferencesConnection(search:searchExternalreferenceInput, order: [ orderExternalreferenceInput ], pagination: paginationCursorInput! ): ExternalreferenceConnection
    validateExternalreferenceForCreation(externalReferenceDbId: ID!, externalID: String, referenceSource: String, callset_ID: String, cross_ID: String, crossingProject_ID: String, germplasm_ID: String, germplasmAttribute_ID: String, germplasmAttributeValue_ID: String, image_ID: String, method_ID: String, list_ID: String, location_ID: String, observation_ID: String, observationUnit_ID: String, observationVariable_ID: String, plate_ID: String, person_ID: String, pedigreeNode_ID: String, plannedCross_ID: String, program_ID: String, reference_ID: String, referenceset_ID: String, sample_ID: String, scale_ID: String, seedLot_ID: String, seedLotTransaction_ID: String, study_ID: String, trait_ID: String, trial_ID: String, variant_ID: String, variantset_ID: String , addCallset:ID, addCross:ID, addCrossingProject:ID, addGermplasm:ID, addGermplasmAttribute:ID, addGermplasmAttributeValue:ID, addImage:ID, addMethod:ID, addList:ID, addLocation:ID, addObservation:ID, addObservationUnit:ID, addObservationVariable:ID, addPlate:ID, addPerson:ID, addPedigreeNode:ID, addPlannedCross:ID, addProgram:ID, addReference:ID, addReferenceset:ID, addSample:ID, addScale:ID, addSeedLot:ID, addSeedLotTransaction:ID, addStudy:ID, addTrait:ID, addTrial:ID, addVariant:ID, addVariantset:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateExternalreferenceForUpdating(externalReferenceDbId: ID!, externalID: String, referenceSource: String, callset_ID: String, cross_ID: String, crossingProject_ID: String, germplasm_ID: String, germplasmAttribute_ID: String, germplasmAttributeValue_ID: String, image_ID: String, method_ID: String, list_ID: String, location_ID: String, observation_ID: String, observationUnit_ID: String, observationVariable_ID: String, plate_ID: String, person_ID: String, pedigreeNode_ID: String, plannedCross_ID: String, program_ID: String, reference_ID: String, referenceset_ID: String, sample_ID: String, scale_ID: String, seedLot_ID: String, seedLotTransaction_ID: String, study_ID: String, trait_ID: String, trial_ID: String, variant_ID: String, variantset_ID: String , addCallset:ID, removeCallset:ID , addCross:ID, removeCross:ID , addCrossingProject:ID, removeCrossingProject:ID , addGermplasm:ID, removeGermplasm:ID , addGermplasmAttribute:ID, removeGermplasmAttribute:ID , addGermplasmAttributeValue:ID, removeGermplasmAttributeValue:ID , addImage:ID, removeImage:ID , addMethod:ID, removeMethod:ID , addList:ID, removeList:ID , addLocation:ID, removeLocation:ID , addObservation:ID, removeObservation:ID , addObservationUnit:ID, removeObservationUnit:ID , addObservationVariable:ID, removeObservationVariable:ID , addPlate:ID, removePlate:ID , addPerson:ID, removePerson:ID , addPedigreeNode:ID, removePedigreeNode:ID , addPlannedCross:ID, removePlannedCross:ID , addProgram:ID, removeProgram:ID , addReference:ID, removeReference:ID , addReferenceset:ID, removeReferenceset:ID , addSample:ID, removeSample:ID , addScale:ID, removeScale:ID , addSeedLot:ID, removeSeedLot:ID , addSeedLotTransaction:ID, removeSeedLotTransaction:ID , addStudy:ID, removeStudy:ID , addTrait:ID, removeTrait:ID , addTrial:ID, removeTrial:ID , addVariant:ID, removeVariant:ID , addVariantset:ID, removeVariantset:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateExternalreferenceForDeletion(externalReferenceDbId: ID!): Boolean!
    validateExternalreferenceAfterReading(externalReferenceDbId: ID!): Boolean!
    """
    externalreferencesZendroDefinition would return the static Zendro data model definition
    """
    externalreferencesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addExternalreference(externalReferenceDbId: ID!, externalID: String, referenceSource: String, callset_ID: String, cross_ID: String, crossingProject_ID: String, germplasm_ID: String, germplasmAttribute_ID: String, germplasmAttributeValue_ID: String, image_ID: String, method_ID: String, list_ID: String, location_ID: String, observation_ID: String, observationUnit_ID: String, observationVariable_ID: String, plate_ID: String, person_ID: String, pedigreeNode_ID: String, plannedCross_ID: String, program_ID: String, reference_ID: String, referenceset_ID: String, sample_ID: String, scale_ID: String, seedLot_ID: String, seedLotTransaction_ID: String, study_ID: String, trait_ID: String, trial_ID: String, variant_ID: String, variantset_ID: String , addCallset:ID, addCross:ID, addCrossingProject:ID, addGermplasm:ID, addGermplasmAttribute:ID, addGermplasmAttributeValue:ID, addImage:ID, addMethod:ID, addList:ID, addLocation:ID, addObservation:ID, addObservationUnit:ID, addObservationVariable:ID, addPlate:ID, addPerson:ID, addPedigreeNode:ID, addPlannedCross:ID, addProgram:ID, addReference:ID, addReferenceset:ID, addSample:ID, addScale:ID, addSeedLot:ID, addSeedLotTransaction:ID, addStudy:ID, addTrait:ID, addTrial:ID, addVariant:ID, addVariantset:ID   , skipAssociationsExistenceChecks:Boolean = false): externalreference!
    updateExternalreference(externalReferenceDbId: ID!, externalID: String, referenceSource: String, callset_ID: String, cross_ID: String, crossingProject_ID: String, germplasm_ID: String, germplasmAttribute_ID: String, germplasmAttributeValue_ID: String, image_ID: String, method_ID: String, list_ID: String, location_ID: String, observation_ID: String, observationUnit_ID: String, observationVariable_ID: String, plate_ID: String, person_ID: String, pedigreeNode_ID: String, plannedCross_ID: String, program_ID: String, reference_ID: String, referenceset_ID: String, sample_ID: String, scale_ID: String, seedLot_ID: String, seedLotTransaction_ID: String, study_ID: String, trait_ID: String, trial_ID: String, variant_ID: String, variantset_ID: String , addCallset:ID, removeCallset:ID , addCross:ID, removeCross:ID , addCrossingProject:ID, removeCrossingProject:ID , addGermplasm:ID, removeGermplasm:ID , addGermplasmAttribute:ID, removeGermplasmAttribute:ID , addGermplasmAttributeValue:ID, removeGermplasmAttributeValue:ID , addImage:ID, removeImage:ID , addMethod:ID, removeMethod:ID , addList:ID, removeList:ID , addLocation:ID, removeLocation:ID , addObservation:ID, removeObservation:ID , addObservationUnit:ID, removeObservationUnit:ID , addObservationVariable:ID, removeObservationVariable:ID , addPlate:ID, removePlate:ID , addPerson:ID, removePerson:ID , addPedigreeNode:ID, removePedigreeNode:ID , addPlannedCross:ID, removePlannedCross:ID , addProgram:ID, removeProgram:ID , addReference:ID, removeReference:ID , addReferenceset:ID, removeReferenceset:ID , addSample:ID, removeSample:ID , addScale:ID, removeScale:ID , addSeedLot:ID, removeSeedLot:ID , addSeedLotTransaction:ID, removeSeedLotTransaction:ID , addStudy:ID, removeStudy:ID , addTrait:ID, removeTrait:ID , addTrial:ID, removeTrial:ID , addVariant:ID, removeVariant:ID , addVariantset:ID, removeVariantset:ID    , skipAssociationsExistenceChecks:Boolean = false): externalreference!
    deleteExternalreference(externalReferenceDbId: ID!): String!
      }
`;