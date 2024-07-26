module.exports = `
  type additionalinfo{
    """
    @original-field
    """
    additionalInfoDbId: ID
    """
    @original-field
    A free space containing any additional information related to a particular object. A data source may provide any JSON object, unrestricted by the BrAPI specification.
    """
    additionalProperties: String

    """
    @original-field
    
    """
    call_ID: String

    """
    @original-field
    
    """
    callSet_ID: String

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
    event_ID: String

    """
    @original-field
    
    """
    genomeMap_ID: String

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
    list_ID: String

    """
    @original-field
    
    """
    location_ID: String

    """
    @original-field
    
    """
    markerPosition_ID: String

    """
    @original-field
    
    """
    method_ID: String

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
    ontology_ID: String

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
    plate_ID: String

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
    referenceSet_ID: String

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
    variantSet_ID: String

    call(search: searchCallInput): call
  callSet(search: searchCallsetInput): callset
  cross(search: searchCrossInput): cross
  crossingProject(search: searchCrossingprojectInput): crossingproject
  event(search: searchEventInput): event
  genomeMap(search: searchGenomemapInput): genomemap
  germplasm(search: searchGermplasmInput): germplasm
  germplasmAttribute(search: searchGermplasmattributeInput): germplasmattribute
  germplasmAttributeValue(search: searchGermplasmattributevalueInput): germplasmattributevalue
  image(search: searchImageInput): image
  list(search: searchListInput): list
  location(search: searchLocationInput): location
  markerPosition(search: searchMarkerpositionInput): markerposition
  method(search: searchMethodInput): method
  observation(search: searchObservationInput): observation
  observationUnit(search: searchObservationunitInput): observationunit
  observationVariable(search: searchObservationvariableInput): observationvariable
  ontology(search: searchOntologyInput): ontology
  person(search: searchPersonInput): person
  pedigreeNode(search: searchPedigreenodeInput): pedigreenode
  plannedCross(search: searchPlannedcrossInput): plannedcross
  plate(search: searchPlateInput): plate
  program(search: searchProgramInput): program
  reference(search: searchReferenceInput): reference
  referenceSet(search: searchReferencesetInput): referenceset
  sample(search: searchSampleInput): sample
  scale(search: searchScaleInput): scale
  seedLot(search: searchSeedlotInput): seedlot
  seedLotTransaction(search: searchSeedlottransactionInput): seedlottransaction
  study(search: searchStudyInput): study
  trait(search: searchTraitInput): trait
  trial(search: searchTrialInput): trial
  variant(search: searchVariantInput): variant
  variantSet(search: searchVariantsetInput): variantset
    
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type AdditionalinfoConnection{
  edges: [AdditionalinfoEdge]
  additionalinfos: [additionalinfo]
  pageInfo: pageInfo!
}

type AdditionalinfoEdge{
  cursor: String!
  node: additionalinfo!
}

  enum additionalinfoField {
    additionalInfoDbId
    additionalProperties
    call_ID
    callSet_ID
    cross_ID
    crossingProject_ID
    event_ID
    genomeMap_ID
    germplasm_ID
    germplasmAttribute_ID
    germplasmAttributeValue_ID
    image_ID
    list_ID
    location_ID
    markerPosition_ID
    method_ID
    observation_ID
    observationUnit_ID
    observationVariable_ID
    ontology_ID
    person_ID
    pedigreeNode_ID
    plannedCross_ID
    plate_ID
    program_ID
    reference_ID
    referenceSet_ID
    sample_ID
    scale_ID
    seedLot_ID
    seedLotTransaction_ID
    study_ID
    trait_ID
    trial_ID
    variant_ID
    variantSet_ID
  }
  
  input searchAdditionalinfoInput {
    field: additionalinfoField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchAdditionalinfoInput]
  }

  input orderAdditionalinfoInput{
    field: additionalinfoField
    order: Order
  }



  type Query {
    additionalinfos(search: searchAdditionalinfoInput, order: [ orderAdditionalinfoInput ], pagination: paginationInput! ): [additionalinfo]
    readOneAdditionalinfo(additionalInfoDbId: ID!): additionalinfo
    countAdditionalinfos(search: searchAdditionalinfoInput ): Int
    csvTableTemplateAdditionalinfo: [String]
    additionalinfosConnection(search:searchAdditionalinfoInput, order: [ orderAdditionalinfoInput ], pagination: paginationCursorInput! ): AdditionalinfoConnection
    validateAdditionalinfoForCreation(additionalInfoDbId: ID!, additionalProperties: String, call_ID: String, callSet_ID: String, cross_ID: String, crossingProject_ID: String, event_ID: String, genomeMap_ID: String, germplasm_ID: String, germplasmAttribute_ID: String, germplasmAttributeValue_ID: String, image_ID: String, list_ID: String, location_ID: String, markerPosition_ID: String, method_ID: String, observation_ID: String, observationUnit_ID: String, observationVariable_ID: String, ontology_ID: String, person_ID: String, pedigreeNode_ID: String, plannedCross_ID: String, plate_ID: String, program_ID: String, reference_ID: String, referenceSet_ID: String, sample_ID: String, scale_ID: String, seedLot_ID: String, seedLotTransaction_ID: String, study_ID: String, trait_ID: String, trial_ID: String, variant_ID: String, variantSet_ID: String , addCall:ID, addCallSet:ID, addCross:ID, addCrossingProject:ID, addEvent:ID, addGenomeMap:ID, addGermplasm:ID, addGermplasmAttribute:ID, addGermplasmAttributeValue:ID, addImage:ID, addList:ID, addLocation:ID, addMarkerPosition:ID, addMethod:ID, addObservation:ID, addObservationUnit:ID, addObservationVariable:ID, addOntology:ID, addPerson:ID, addPedigreeNode:ID, addPlannedCross:ID, addPlate:ID, addProgram:ID, addReference:ID, addReferenceSet:ID, addSample:ID, addScale:ID, addSeedLot:ID, addSeedLotTransaction:ID, addStudy:ID, addTrait:ID, addTrial:ID, addVariant:ID, addVariantSet:ID   , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateAdditionalinfoForUpdating(additionalInfoDbId: ID!, additionalProperties: String, call_ID: String, callSet_ID: String, cross_ID: String, crossingProject_ID: String, event_ID: String, genomeMap_ID: String, germplasm_ID: String, germplasmAttribute_ID: String, germplasmAttributeValue_ID: String, image_ID: String, list_ID: String, location_ID: String, markerPosition_ID: String, method_ID: String, observation_ID: String, observationUnit_ID: String, observationVariable_ID: String, ontology_ID: String, person_ID: String, pedigreeNode_ID: String, plannedCross_ID: String, plate_ID: String, program_ID: String, reference_ID: String, referenceSet_ID: String, sample_ID: String, scale_ID: String, seedLot_ID: String, seedLotTransaction_ID: String, study_ID: String, trait_ID: String, trial_ID: String, variant_ID: String, variantSet_ID: String , addCall:ID, removeCall:ID , addCallSet:ID, removeCallSet:ID , addCross:ID, removeCross:ID , addCrossingProject:ID, removeCrossingProject:ID , addEvent:ID, removeEvent:ID , addGenomeMap:ID, removeGenomeMap:ID , addGermplasm:ID, removeGermplasm:ID , addGermplasmAttribute:ID, removeGermplasmAttribute:ID , addGermplasmAttributeValue:ID, removeGermplasmAttributeValue:ID , addImage:ID, removeImage:ID , addList:ID, removeList:ID , addLocation:ID, removeLocation:ID , addMarkerPosition:ID, removeMarkerPosition:ID , addMethod:ID, removeMethod:ID , addObservation:ID, removeObservation:ID , addObservationUnit:ID, removeObservationUnit:ID , addObservationVariable:ID, removeObservationVariable:ID , addOntology:ID, removeOntology:ID , addPerson:ID, removePerson:ID , addPedigreeNode:ID, removePedigreeNode:ID , addPlannedCross:ID, removePlannedCross:ID , addPlate:ID, removePlate:ID , addProgram:ID, removeProgram:ID , addReference:ID, removeReference:ID , addReferenceSet:ID, removeReferenceSet:ID , addSample:ID, removeSample:ID , addScale:ID, removeScale:ID , addSeedLot:ID, removeSeedLot:ID , addSeedLotTransaction:ID, removeSeedLotTransaction:ID , addStudy:ID, removeStudy:ID , addTrait:ID, removeTrait:ID , addTrial:ID, removeTrial:ID , addVariant:ID, removeVariant:ID , addVariantSet:ID, removeVariantSet:ID    , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateAdditionalinfoForDeletion(additionalInfoDbId: ID!): Boolean!
    validateAdditionalinfoAfterReading(additionalInfoDbId: ID!): Boolean!
    """
    additionalinfosZendroDefinition would return the static Zendro data model definition
    """
    additionalinfosZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addAdditionalinfo(additionalInfoDbId: ID!, additionalProperties: String, call_ID: String, callSet_ID: String, cross_ID: String, crossingProject_ID: String, event_ID: String, genomeMap_ID: String, germplasm_ID: String, germplasmAttribute_ID: String, germplasmAttributeValue_ID: String, image_ID: String, list_ID: String, location_ID: String, markerPosition_ID: String, method_ID: String, observation_ID: String, observationUnit_ID: String, observationVariable_ID: String, ontology_ID: String, person_ID: String, pedigreeNode_ID: String, plannedCross_ID: String, plate_ID: String, program_ID: String, reference_ID: String, referenceSet_ID: String, sample_ID: String, scale_ID: String, seedLot_ID: String, seedLotTransaction_ID: String, study_ID: String, trait_ID: String, trial_ID: String, variant_ID: String, variantSet_ID: String , addCall:ID, addCallSet:ID, addCross:ID, addCrossingProject:ID, addEvent:ID, addGenomeMap:ID, addGermplasm:ID, addGermplasmAttribute:ID, addGermplasmAttributeValue:ID, addImage:ID, addList:ID, addLocation:ID, addMarkerPosition:ID, addMethod:ID, addObservation:ID, addObservationUnit:ID, addObservationVariable:ID, addOntology:ID, addPerson:ID, addPedigreeNode:ID, addPlannedCross:ID, addPlate:ID, addProgram:ID, addReference:ID, addReferenceSet:ID, addSample:ID, addScale:ID, addSeedLot:ID, addSeedLotTransaction:ID, addStudy:ID, addTrait:ID, addTrial:ID, addVariant:ID, addVariantSet:ID   , skipAssociationsExistenceChecks:Boolean = false): additionalinfo!
    updateAdditionalinfo(additionalInfoDbId: ID!, additionalProperties: String, call_ID: String, callSet_ID: String, cross_ID: String, crossingProject_ID: String, event_ID: String, genomeMap_ID: String, germplasm_ID: String, germplasmAttribute_ID: String, germplasmAttributeValue_ID: String, image_ID: String, list_ID: String, location_ID: String, markerPosition_ID: String, method_ID: String, observation_ID: String, observationUnit_ID: String, observationVariable_ID: String, ontology_ID: String, person_ID: String, pedigreeNode_ID: String, plannedCross_ID: String, plate_ID: String, program_ID: String, reference_ID: String, referenceSet_ID: String, sample_ID: String, scale_ID: String, seedLot_ID: String, seedLotTransaction_ID: String, study_ID: String, trait_ID: String, trial_ID: String, variant_ID: String, variantSet_ID: String , addCall:ID, removeCall:ID , addCallSet:ID, removeCallSet:ID , addCross:ID, removeCross:ID , addCrossingProject:ID, removeCrossingProject:ID , addEvent:ID, removeEvent:ID , addGenomeMap:ID, removeGenomeMap:ID , addGermplasm:ID, removeGermplasm:ID , addGermplasmAttribute:ID, removeGermplasmAttribute:ID , addGermplasmAttributeValue:ID, removeGermplasmAttributeValue:ID , addImage:ID, removeImage:ID , addList:ID, removeList:ID , addLocation:ID, removeLocation:ID , addMarkerPosition:ID, removeMarkerPosition:ID , addMethod:ID, removeMethod:ID , addObservation:ID, removeObservation:ID , addObservationUnit:ID, removeObservationUnit:ID , addObservationVariable:ID, removeObservationVariable:ID , addOntology:ID, removeOntology:ID , addPerson:ID, removePerson:ID , addPedigreeNode:ID, removePedigreeNode:ID , addPlannedCross:ID, removePlannedCross:ID , addPlate:ID, removePlate:ID , addProgram:ID, removeProgram:ID , addReference:ID, removeReference:ID , addReferenceSet:ID, removeReferenceSet:ID , addSample:ID, removeSample:ID , addScale:ID, removeScale:ID , addSeedLot:ID, removeSeedLot:ID , addSeedLotTransaction:ID, removeSeedLotTransaction:ID , addStudy:ID, removeStudy:ID , addTrait:ID, removeTrait:ID , addTrial:ID, removeTrial:ID , addVariant:ID, removeVariant:ID , addVariantSet:ID, removeVariantSet:ID    , skipAssociationsExistenceChecks:Boolean = false): additionalinfo!
    deleteAdditionalinfo(additionalInfoDbId: ID!): String!
      }
`;