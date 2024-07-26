module.exports = `
  type germplasm{
    """
    @original-field
    """
    germplasmDbId: ID
    """
    @original-field
    The unique identifier for a material or germplasm within a genebank

MCPD (v2.1) (ACCENUMB) 2. This is the unique identifier for accessions within a genebank, and is assigned when a sample is entered into the genebank collection (e.g. &#34;PI 113869&#34;).
    """
    accessionNumber: String

    """
    @original-field
    The date a material or germplasm was acquired by the genebank 

MCPD (v2.1) (ACQDATE) 12. Date on which the accession entered the collection [YYYYMMDD] where YYYY is the year, MM is the month and DD is the day. Missing data (MM or DD) should be indicated with hyphens or &#34;00&#34; [double zero].
    """
    acquisitionDate: String

    """
    @original-field
    MCPD (v2.1) (SAMPSTAT) 19. The coding scheme proposed can be used at 3 different levels of detail: either by using the general codes such as 100, 200, 300, 400, or by using the more specific codes such as 110, 120, etc. 

100) Wild 
110) Natural 
120) Semi-natural/wild 
130) Semi-natural/sown 
200) Weedy 
300) Traditional cultivar/landrace 
400) Breeding/research material 
410) Breeders line 
411) Synthetic population 
412) Hybrid 
413) Founder stock/base population 
414) Inbred line (parent of hybrid cultivar) 
415) Segregating population 
416) Clonal selection 
420) Genetic stock 
421) Mutant (e.g. induced/insertion mutants, tilling populations) 
422) Cytogenetic stocks (e.g. chromosome addition/substitution, aneuploids,  amphiploids) 
423) Other genetic stocks (e.g. mapping populations) 
500) Advanced or improved cultivar (conventional breeding methods) 
600) GMO (by genetic engineering) 
999) Other (Elaborate in REMARKS field)
    """
    biologicalStatusOfAccessionCode: String

    """
    @original-field
    Supplemental text description for &#39;biologicalStatusOfAccessionCode&#39;
    """
    biologicalStatusOfAccessionDescription: String

    """
    @original-field
    
    """
    breedingMethod_ID: String

    """
    @original-field
    
    """
    pedigreeNode_ID: String

    """
    @original-field
    A specific panel/collection/population name this germplasm belongs to.
    """
    collection: String

    """
    @original-field
    Common name for the crop 

MCPD (v2.1) (CROPNAME) 10. Common name of the crop. Example: &#34;malting barley&#34;, &#34;mas&#34;.
    """
    commonCropName: String

    """
    @original-field
    3-letter ISO 3166-1 code of the country in which the sample was originally collected 

MCPD (v2.1) (ORIGCTY) 13. 3-letter ISO 3166-1 code of the country in which the sample was originally collected (e.g. landrace, crop wild relative, farmers variety), bred or selected (breeding lines, GMOs, segregating populations, hybrids, modern cultivars, etc.). Note- Descriptors 14 to 16 below should be completed accordingly only if it was &#34;collected&#34;.
    """
    countryOfOriginCode: String

    """
    @original-field
    Human readable name used for display purposes
    """
    defaultDisplayName: String

    """
    @original-field
    A URL to the human readable documentation of an object
    """
    documentationURL: String

    """
    @original-field
    Genus name for taxon. Initial uppercase letter required.

MCPD (v2.1) (GENUS) 5. Genus name for taxon. Initial uppercase letter required.

MIAPPE V1.1 (DM-43) Genus - Genus name for the organism under study, according to standard scientific nomenclature.
    """
    genus: String

    """
    @original-field
    Name of the germplasm. It can be the preferred name and does not have to be unique.

MCPD (v2.1) (ACCENAME) 11. Either a registered or other designation given to the material received, other than the donors accession number (23) or collecting number (3). First letter uppercase. Multiple names are separated by a semicolon without space.
    """
    germplasmName: String

    """
    @original-field
    The Permanent Unique Identifier which represents a germplasm

MIAPPE V1.1 (DM-41) Biological material ID - Code used to identify the biological material in the data file. Should be unique within the Investigation. Can correspond to experimental plant ID, seed lot ID, etc This material identification is different from a BiosampleID which corresponds to Observation Unit or Samples sections below.

MIAPPE V1.1 (DM-51) Material source DOI - Digital Object Identifier (DOI) of the material source

MCPD (v2.1) (PUID) 0. Any persistent, unique identifier assigned to the accession so it can be unambiguously referenced at the global level and the information associated with it harvested through automated means. Report one PUID for each accession. The Secretariat of the International Treaty on Plant Genetic Resources for Food and Agriculture (PGRFA) is facilitating the assignment of a persistent unique identifier (PUID), in the form of a DOI, to PGRFA at the accession level. Genebanks not applying a true PUID to their accessions should use, and request recipients to use, the concatenation of INSTCODE, ACCENUMB, and GENUS as a globally unique identifier similar in most respects to the PUID whenever they exchange information on accessions with third parties.
    """
    germplasmPUI: String

    """
    @original-field
    Description of any process or treatment applied uniformly to the germplasm, prior to the study itself. Can be provided as free text or as an accession number from a suitable controlled vocabulary.
    """
    germplasmPreprocessing: String

    """
    @original-field
    The code for the institute that maintains the material. 

MCPD (v2.1) (INSTCODE) 1. FAO WIEWS code of the institute where the accession is maintained. The codes consist of the 3-letter ISO 3166 country code of the country where the institute is located plus a number (e.g. PER001). The current set of institute codes is available from http://www.fao.org/wiews. For those institutes not yet having an FAO Code, or for those with &#34;obsolete&#34; codes, see &#34;Common formatting rules (v)&#34;.
    """
    instituteCode: String

    """
    @original-field
    The name of the institute that maintains the material
    """
    instituteName: String

    """
    @original-field
    The cross name and optional selection history.

MCPD (v2.1) (ANCEST) 20. Information about either pedigree or other description of ancestral information (e.g. parent variety in case of mutant or selection). For example a pedigree &#39;Hanna/7*Atlas//Turk/8*Atlas&#39; or a description &#39;mutation found in Hanna&#39;, &#39;selection from Irene&#39; or &#39;cross involving amongst others Hanna and Irene&#39;.
    """
    pedigree: String

    """
    @original-field
    An identifier for the source of the biological material
&lt;br/&gt;MIAPPE V1.1 (DM-50) Material source ID (Holding institute/stock centre, accession) - An identifier for the source of the biological material, in the form of a key-value pair comprising the name/identifier of the repository from which the material was sourced plus the accession number of the repository for that material. Where an accession number has not been assigned, but the material has been derived from the crossing of known accessions, the material can be defined as follows: &#34;mother_accession X father_accession&#34;, or, if father is unknown, as &#34;mother_accession X UNKNOWN&#34;. For in situ material, the region of provenance may be used when an accession is not available.
    """
    seedSource: String

    """
    @original-field
    Description of the material source

MIAPPE V1.1 (DM-56) Material source description - Description of the material source
    """
    seedSourceDescription: String

    """
    @original-field
    Specific epithet portion of the scientific name in lowercase letters.

MCPD (v2.1) (SPECIES) 6. Specific epithet portion of the scientific name in lowercase letters. Only the following abbreviation is allowed: &#34;sp.&#34; 

MIAPPE V1.1 (DM-44) Species - Species name (formally: specific epithet) for the organism under study, according to standard scientific nomenclature.
    """
    species: String

    """
    @original-field
    The authority organization responsible for tracking and maintaining the species name 

MCPD (v2.1) (SPAUTHOR) 7. Provide the authority for the species name.
    """
    speciesAuthority: String

    """
    @original-field
    Subtaxon can be used to store any additional taxonomic identifier.

MCPD (v2.1) (SUBTAXA) 8. Subtaxon can be used to store any additional taxonomic identifier. The following abbreviations are allowed: &#34;subsp.&#34; (for subspecies); &#34;convar.&#34; (for convariety); &#34;var.&#34; (for variety); &#34;f.&#34; (for form); &#34;Group&#34; (for &#34;cultivar group&#34;).

MIAPPE V1.1 (DM-44) Infraspecific name - Name of any subtaxa level, including variety, crossing name, etc. It can be used to store any additional taxonomic identifier. Either free text description or key-value pair list format (the key is the name of the rank and the value is the value of  the rank). Ranks can be among the following terms: subspecies, cultivar, variety, subvariety, convariety, group, subgroup, hybrid, line, form, subform. For MCPD compliance, the following abbreviations are allowed: subsp. (subspecies); convar. (convariety); var. (variety); f. (form); Group (cultivar group).
    """
    subtaxa: String

    """
    @original-field
    The authority organization responsible for tracking and maintaining the subtaxon information

MCPD (v2.1) (SUBTAUTHOR) 9. Provide the subtaxon authority at the most detailed taxonomic level.
    """
    subtaxaAuthority: String

    """
    @original-field
    
    """
    samples_IDs: [String]

    """
    @original-field
    
    """
    attributeValues_IDs: [String]

    """
    @original-field
    
    """
    progenyPedigreeNodes_IDs: [String]

    """
    @original-field
    
    """
    parentPedigreeNodes_IDs: [String]

    """
    @original-field
    
    """
    siblingPedigreeNodes_IDs: [String]

    """
    @original-field
    
    """
    observations_IDs: [String]

    """
    @original-field
    
    """
    observationUnits_IDs: [String]

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
    donors_IDs: [String]

    """
    @original-field
    
    """
    germplasmOrigin_ID: String

    """
    @original-field
    
    """
    storageTypes_ID: String

    """
    @original-field
    
    """
    synonyms_IDs: [String]

    """
    @original-field
    
    """
    taxonIds_IDs: [String]

    breedingMethod(search: searchBreedingmethodInput): breedingmethod
  pedigreeNode(search: searchPedigreenodeInput): pedigreenode
  germplasmOrigin(search: searchGermplasmoriginInput): germplasmorigin
  storageTypes(search: searchStoragetypeInput): storagetype
    
    """
    @search-request
    """
    samplesFilter(search: searchSampleInput, order: [ orderSampleInput ], pagination: paginationInput!): [sample]


    """
    @search-request
    """
    samplesConnection(search: searchSampleInput, order: [ orderSampleInput ], pagination: paginationCursorInput!): SampleConnection

    """
    @count-request
    """
    countFilteredSamples(search: searchSampleInput) : Int
  
    """
    @search-request
    """
    attributeValuesFilter(search: searchGermplasmattributevalueInput, order: [ orderGermplasmattributevalueInput ], pagination: paginationInput!): [germplasmattributevalue]


    """
    @search-request
    """
    attributeValuesConnection(search: searchGermplasmattributevalueInput, order: [ orderGermplasmattributevalueInput ], pagination: paginationCursorInput!): GermplasmattributevalueConnection

    """
    @count-request
    """
    countFilteredAttributeValues(search: searchGermplasmattributevalueInput) : Int
  
    """
    @search-request
    """
    progenyPedigreeNodesFilter(search: searchParentInput, order: [ orderParentInput ], pagination: paginationInput!): [parent]


    """
    @search-request
    """
    progenyPedigreeNodesConnection(search: searchParentInput, order: [ orderParentInput ], pagination: paginationCursorInput!): ParentConnection

    """
    @count-request
    """
    countFilteredProgenyPedigreeNodes(search: searchParentInput) : Int
  
    """
    @search-request
    """
    parentPedigreeNodesFilter(search: searchProgenyInput, order: [ orderProgenyInput ], pagination: paginationInput!): [progeny]


    """
    @search-request
    """
    parentPedigreeNodesConnection(search: searchProgenyInput, order: [ orderProgenyInput ], pagination: paginationCursorInput!): ProgenyConnection

    """
    @count-request
    """
    countFilteredParentPedigreeNodes(search: searchProgenyInput) : Int
  
    """
    @search-request
    """
    siblingPedigreeNodesFilter(search: searchSiblingInput, order: [ orderSiblingInput ], pagination: paginationInput!): [sibling]


    """
    @search-request
    """
    siblingPedigreeNodesConnection(search: searchSiblingInput, order: [ orderSiblingInput ], pagination: paginationCursorInput!): SiblingConnection

    """
    @count-request
    """
    countFilteredSiblingPedigreeNodes(search: searchSiblingInput) : Int
  
    """
    @search-request
    """
    observationsFilter(search: searchObservationInput, order: [ orderObservationInput ], pagination: paginationInput!): [observation]


    """
    @search-request
    """
    observationsConnection(search: searchObservationInput, order: [ orderObservationInput ], pagination: paginationCursorInput!): ObservationConnection

    """
    @count-request
    """
    countFilteredObservations(search: searchObservationInput) : Int
  
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
    donorsFilter(search: searchDonorInput, order: [ orderDonorInput ], pagination: paginationInput!): [donor]


    """
    @search-request
    """
    donorsConnection(search: searchDonorInput, order: [ orderDonorInput ], pagination: paginationCursorInput!): DonorConnection

    """
    @count-request
    """
    countFilteredDonors(search: searchDonorInput) : Int
  
    """
    @search-request
    """
    synonymsFilter(search: searchSynonymInput, order: [ orderSynonymInput ], pagination: paginationInput!): [synonym]


    """
    @search-request
    """
    synonymsConnection(search: searchSynonymInput, order: [ orderSynonymInput ], pagination: paginationCursorInput!): SynonymConnection

    """
    @count-request
    """
    countFilteredSynonyms(search: searchSynonymInput) : Int
  
    """
    @search-request
    """
    taxonIdsFilter(search: searchTaxonInput, order: [ orderTaxonInput ], pagination: paginationInput!): [taxon]


    """
    @search-request
    """
    taxonIdsConnection(search: searchTaxonInput, order: [ orderTaxonInput ], pagination: paginationCursorInput!): TaxonConnection

    """
    @count-request
    """
    countFilteredTaxonIds(search: searchTaxonInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type GermplasmConnection{
  edges: [GermplasmEdge]
  germplasms: [germplasm]
  pageInfo: pageInfo!
}

type GermplasmEdge{
  cursor: String!
  node: germplasm!
}

  enum germplasmField {
    germplasmDbId
    accessionNumber
    acquisitionDate
    biologicalStatusOfAccessionCode
    biologicalStatusOfAccessionDescription
    breedingMethod_ID
    pedigreeNode_ID
    collection
    commonCropName
    countryOfOriginCode
    defaultDisplayName
    documentationURL
    genus
    germplasmName
    germplasmPUI
    germplasmPreprocessing
    instituteCode
    instituteName
    pedigree
    seedSource
    seedSourceDescription
    species
    speciesAuthority
    subtaxa
    subtaxaAuthority
    samples_IDs
    attributeValues_IDs
    progenyPedigreeNodes_IDs
    parentPedigreeNodes_IDs
    siblingPedigreeNodes_IDs
    observations_IDs
    observationUnits_IDs
    additionalInfo_IDs
    externalReferences_IDs
    donors_IDs
    germplasmOrigin_ID
    storageTypes_ID
    synonyms_IDs
    taxonIds_IDs
  }
  
  input searchGermplasmInput {
    field: germplasmField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchGermplasmInput]
  }

  input orderGermplasmInput{
    field: germplasmField
    order: Order
  }



  type Query {
    germplasms(search: searchGermplasmInput, order: [ orderGermplasmInput ], pagination: paginationInput! ): [germplasm]
    readOneGermplasm(germplasmDbId: ID!): germplasm
    countGermplasms(search: searchGermplasmInput ): Int
    csvTableTemplateGermplasm: [String]
    germplasmsConnection(search:searchGermplasmInput, order: [ orderGermplasmInput ], pagination: paginationCursorInput! ): GermplasmConnection
    validateGermplasmForCreation(germplasmDbId: ID!, accessionNumber: String, acquisitionDate: String, biologicalStatusOfAccessionCode: String, biologicalStatusOfAccessionDescription: String, breedingMethod_ID: String, pedigreeNode_ID: String, collection: String, commonCropName: String, countryOfOriginCode: String, defaultDisplayName: String, documentationURL: String, genus: String, germplasmName: String, germplasmPUI: String, germplasmPreprocessing: String, instituteCode: String, instituteName: String, pedigree: String, seedSource: String, seedSourceDescription: String, species: String, speciesAuthority: String, subtaxa: String, subtaxaAuthority: String, samples_IDs: [String], attributeValues_IDs: [String], progenyPedigreeNodes_IDs: [String], parentPedigreeNodes_IDs: [String], siblingPedigreeNodes_IDs: [String], observations_IDs: [String], observationUnits_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String], germplasmOrigin_ID: String, storageTypes_ID: String, synonyms_IDs: [String], taxonIds_IDs: [String] , addBreedingMethod:ID, addPedigreeNode:ID, addGermplasmOrigin:ID, addStorageTypes:ID  , addSamples:[ID], addAttributeValues:[ID], addProgenyPedigreeNodes:[ID], addParentPedigreeNodes:[ID], addSiblingPedigreeNodes:[ID], addObservations:[ID], addObservationUnits:[ID], addAdditionalInfo:[ID], addExternalReferences:[ID], addDonors:[ID], addSynonyms:[ID], addTaxonIds:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateGermplasmForUpdating(germplasmDbId: ID!, accessionNumber: String, acquisitionDate: String, biologicalStatusOfAccessionCode: String, biologicalStatusOfAccessionDescription: String, breedingMethod_ID: String, pedigreeNode_ID: String, collection: String, commonCropName: String, countryOfOriginCode: String, defaultDisplayName: String, documentationURL: String, genus: String, germplasmName: String, germplasmPUI: String, germplasmPreprocessing: String, instituteCode: String, instituteName: String, pedigree: String, seedSource: String, seedSourceDescription: String, species: String, speciesAuthority: String, subtaxa: String, subtaxaAuthority: String, samples_IDs: [String], attributeValues_IDs: [String], progenyPedigreeNodes_IDs: [String], parentPedigreeNodes_IDs: [String], siblingPedigreeNodes_IDs: [String], observations_IDs: [String], observationUnits_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String], germplasmOrigin_ID: String, storageTypes_ID: String, synonyms_IDs: [String], taxonIds_IDs: [String] , addBreedingMethod:ID, removeBreedingMethod:ID , addPedigreeNode:ID, removePedigreeNode:ID , addGermplasmOrigin:ID, removeGermplasmOrigin:ID , addStorageTypes:ID, removeStorageTypes:ID   , addSamples:[ID], removeSamples:[ID] , addAttributeValues:[ID], removeAttributeValues:[ID] , addProgenyPedigreeNodes:[ID], removeProgenyPedigreeNodes:[ID] , addParentPedigreeNodes:[ID], removeParentPedigreeNodes:[ID] , addSiblingPedigreeNodes:[ID], removeSiblingPedigreeNodes:[ID] , addObservations:[ID], removeObservations:[ID] , addObservationUnits:[ID], removeObservationUnits:[ID] , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addDonors:[ID], removeDonors:[ID] , addSynonyms:[ID], removeSynonyms:[ID] , addTaxonIds:[ID], removeTaxonIds:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateGermplasmForDeletion(germplasmDbId: ID!): Boolean!
    validateGermplasmAfterReading(germplasmDbId: ID!): Boolean!
    """
    germplasmsZendroDefinition would return the static Zendro data model definition
    """
    germplasmsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addGermplasm(germplasmDbId: ID!, accessionNumber: String, acquisitionDate: String, biologicalStatusOfAccessionCode: String, biologicalStatusOfAccessionDescription: String, breedingMethod_ID: String, pedigreeNode_ID: String, collection: String, commonCropName: String, countryOfOriginCode: String, defaultDisplayName: String, documentationURL: String, genus: String, germplasmName: String, germplasmPUI: String, germplasmPreprocessing: String, instituteCode: String, instituteName: String, pedigree: String, seedSource: String, seedSourceDescription: String, species: String, speciesAuthority: String, subtaxa: String, subtaxaAuthority: String, samples_IDs: [String], attributeValues_IDs: [String], progenyPedigreeNodes_IDs: [String], parentPedigreeNodes_IDs: [String], siblingPedigreeNodes_IDs: [String], observations_IDs: [String], observationUnits_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String], germplasmOrigin_ID: String, storageTypes_ID: String, synonyms_IDs: [String], taxonIds_IDs: [String] , addBreedingMethod:ID, addPedigreeNode:ID, addGermplasmOrigin:ID, addStorageTypes:ID  , addSamples:[ID], addAttributeValues:[ID], addProgenyPedigreeNodes:[ID], addParentPedigreeNodes:[ID], addSiblingPedigreeNodes:[ID], addObservations:[ID], addObservationUnits:[ID], addAdditionalInfo:[ID], addExternalReferences:[ID], addDonors:[ID], addSynonyms:[ID], addTaxonIds:[ID] , skipAssociationsExistenceChecks:Boolean = false): germplasm!
    updateGermplasm(germplasmDbId: ID!, accessionNumber: String, acquisitionDate: String, biologicalStatusOfAccessionCode: String, biologicalStatusOfAccessionDescription: String, breedingMethod_ID: String, pedigreeNode_ID: String, collection: String, commonCropName: String, countryOfOriginCode: String, defaultDisplayName: String, documentationURL: String, genus: String, germplasmName: String, germplasmPUI: String, germplasmPreprocessing: String, instituteCode: String, instituteName: String, pedigree: String, seedSource: String, seedSourceDescription: String, species: String, speciesAuthority: String, subtaxa: String, subtaxaAuthority: String, samples_IDs: [String], attributeValues_IDs: [String], progenyPedigreeNodes_IDs: [String], parentPedigreeNodes_IDs: [String], siblingPedigreeNodes_IDs: [String], observations_IDs: [String], observationUnits_IDs: [String], additionalInfo_IDs: [String], externalReferences_IDs: [String], germplasmOrigin_ID: String, storageTypes_ID: String, synonyms_IDs: [String], taxonIds_IDs: [String] , addBreedingMethod:ID, removeBreedingMethod:ID , addPedigreeNode:ID, removePedigreeNode:ID , addGermplasmOrigin:ID, removeGermplasmOrigin:ID , addStorageTypes:ID, removeStorageTypes:ID   , addSamples:[ID], removeSamples:[ID] , addAttributeValues:[ID], removeAttributeValues:[ID] , addProgenyPedigreeNodes:[ID], removeProgenyPedigreeNodes:[ID] , addParentPedigreeNodes:[ID], removeParentPedigreeNodes:[ID] , addSiblingPedigreeNodes:[ID], removeSiblingPedigreeNodes:[ID] , addObservations:[ID], removeObservations:[ID] , addObservationUnits:[ID], removeObservationUnits:[ID] , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addDonors:[ID], removeDonors:[ID] , addSynonyms:[ID], removeSynonyms:[ID] , addTaxonIds:[ID], removeTaxonIds:[ID]  , skipAssociationsExistenceChecks:Boolean = false): germplasm!
    deleteGermplasm(germplasmDbId: ID!): String!
      }
`;