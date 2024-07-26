module.exports = `
  type pedigreenode{
    """
    @original-field
    """
    pedigreeNodeDbId: ID
    """
    @original-field
    
    """
    breedingMethod_ID: String

    """
    @original-field
    
    """
    crossingProject_ID: String

    """
    @original-field
    The year the parents were originally crossed
    """
    crossingYear: Int

    """
    @original-field
    Human readable name used for display purposes
    """
    defaultDisplayName: String

    """
    @original-field
    The code representing the family of this germplasm
    """
    familyCode: String

    """
    @original-field
    
    """
    germplasm_ID: String

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
    The string representation of the pedigree for this germplasm in PURDY notation
    """
    pedigreeString: String

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
    parents_IDs: [String]

    """
    @original-field
    
    """
    progeny_IDs: [String]

    """
    @original-field
    
    """
    siblings_IDs: [String]

    breedingMethod(search: searchBreedingmethodInput): breedingmethod
  crossingProject(search: searchCrossingprojectInput): crossingproject
  germplasm(search: searchGermplasmInput): germplasm
    
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
    parentsFilter(search: searchParentInput, order: [ orderParentInput ], pagination: paginationInput!): [parent]


    """
    @search-request
    """
    parentsConnection(search: searchParentInput, order: [ orderParentInput ], pagination: paginationCursorInput!): ParentConnection

    """
    @count-request
    """
    countFilteredParents(search: searchParentInput) : Int
  
    """
    @search-request
    """
    progenyFilter(search: searchProgenyInput, order: [ orderProgenyInput ], pagination: paginationInput!): [progeny]


    """
    @search-request
    """
    progenyConnection(search: searchProgenyInput, order: [ orderProgenyInput ], pagination: paginationCursorInput!): ProgenyConnection

    """
    @count-request
    """
    countFilteredProgeny(search: searchProgenyInput) : Int
  
    """
    @search-request
    """
    siblingsFilter(search: searchSiblingInput, order: [ orderSiblingInput ], pagination: paginationInput!): [sibling]


    """
    @search-request
    """
    siblingsConnection(search: searchSiblingInput, order: [ orderSiblingInput ], pagination: paginationCursorInput!): SiblingConnection

    """
    @count-request
    """
    countFilteredSiblings(search: searchSiblingInput) : Int
  
    
    """
    @record as base64 encoded cursor for paginated connections
    """
    asCursor: String!
}
type PedigreenodeConnection{
  edges: [PedigreenodeEdge]
  pedigreenodes: [pedigreenode]
  pageInfo: pageInfo!
}

type PedigreenodeEdge{
  cursor: String!
  node: pedigreenode!
}

  enum pedigreenodeField {
    pedigreeNodeDbId
    breedingMethod_ID
    crossingProject_ID
    crossingYear
    defaultDisplayName
    familyCode
    germplasm_ID
    germplasmPUI
    pedigreeString
    additionalInfo_IDs
    externalReferences_IDs
    parents_IDs
    progeny_IDs
    siblings_IDs
  }
  
  input searchPedigreenodeInput {
    field: pedigreenodeField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchPedigreenodeInput]
  }

  input orderPedigreenodeInput{
    field: pedigreenodeField
    order: Order
  }



  type Query {
    pedigreenodes(search: searchPedigreenodeInput, order: [ orderPedigreenodeInput ], pagination: paginationInput! ): [pedigreenode]
    readOnePedigreenode(pedigreeNodeDbId: ID!): pedigreenode
    countPedigreenodes(search: searchPedigreenodeInput ): Int
    csvTableTemplatePedigreenode: [String]
    pedigreenodesConnection(search:searchPedigreenodeInput, order: [ orderPedigreenodeInput ], pagination: paginationCursorInput! ): PedigreenodeConnection
    validatePedigreenodeForCreation(pedigreeNodeDbId: ID!, breedingMethod_ID: String, crossingProject_ID: String, crossingYear: Int, defaultDisplayName: String, familyCode: String, germplasm_ID: String, germplasmPUI: String, pedigreeString: String, additionalInfo_IDs: [String], externalReferences_IDs: [String], progeny_IDs: [String] , addBreedingMethod:ID, addCrossingProject:ID, addGermplasm:ID  , addAdditionalInfo:[ID], addExternalReferences:[ID], addParents:[ID], addProgeny:[ID], addSiblings:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validatePedigreenodeForUpdating(pedigreeNodeDbId: ID!, breedingMethod_ID: String, crossingProject_ID: String, crossingYear: Int, defaultDisplayName: String, familyCode: String, germplasm_ID: String, germplasmPUI: String, pedigreeString: String, additionalInfo_IDs: [String], externalReferences_IDs: [String], progeny_IDs: [String] , addBreedingMethod:ID, removeBreedingMethod:ID , addCrossingProject:ID, removeCrossingProject:ID , addGermplasm:ID, removeGermplasm:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addParents:[ID], removeParents:[ID] , addProgeny:[ID], removeProgeny:[ID] , addSiblings:[ID], removeSiblings:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validatePedigreenodeForDeletion(pedigreeNodeDbId: ID!): Boolean!
    validatePedigreenodeAfterReading(pedigreeNodeDbId: ID!): Boolean!
    """
    pedigreenodesZendroDefinition would return the static Zendro data model definition
    """
    pedigreenodesZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addPedigreenode(pedigreeNodeDbId: ID!, breedingMethod_ID: String, crossingProject_ID: String, crossingYear: Int, defaultDisplayName: String, familyCode: String, germplasm_ID: String, germplasmPUI: String, pedigreeString: String, additionalInfo_IDs: [String], externalReferences_IDs: [String], progeny_IDs: [String] , addBreedingMethod:ID, addCrossingProject:ID, addGermplasm:ID  , addAdditionalInfo:[ID], addExternalReferences:[ID], addParents:[ID], addProgeny:[ID], addSiblings:[ID] , skipAssociationsExistenceChecks:Boolean = false): pedigreenode!
    updatePedigreenode(pedigreeNodeDbId: ID!, breedingMethod_ID: String, crossingProject_ID: String, crossingYear: Int, defaultDisplayName: String, familyCode: String, germplasm_ID: String, germplasmPUI: String, pedigreeString: String, additionalInfo_IDs: [String], externalReferences_IDs: [String], progeny_IDs: [String] , addBreedingMethod:ID, removeBreedingMethod:ID , addCrossingProject:ID, removeCrossingProject:ID , addGermplasm:ID, removeGermplasm:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addParents:[ID], removeParents:[ID] , addProgeny:[ID], removeProgeny:[ID] , addSiblings:[ID], removeSiblings:[ID]  , skipAssociationsExistenceChecks:Boolean = false): pedigreenode!
    deletePedigreenode(pedigreeNodeDbId: ID!): String!
      }
`;