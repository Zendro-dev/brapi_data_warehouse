module.exports = `
  type location{
    """
    @original-field
    """
    locationDbId: ID
    """
    @original-field
    A shortened version of the human readable name for a Location
    """
    abbreviation: String

    """
    @original-field
    
    """
    additionalInfo_IDs: [String]

    """
    @original-field
    Describes the precision and landmarks of the coordinate values used for a Location. (ex. the site, the nearest town, a 10 kilometers radius circle, +/- 20 meters, etc)
    """
    coordinateDescription: String

    """
    @original-field
    Uncertainty associated with the coordinates in meters. Leave the value empty if the uncertainty is unknown.
    """
    coordinateUncertainty: String

    """
    @original-field
    
    """
    coordinates_ID: String

    """
    @original-field
    [ISO_3166-1_alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) spec
&lt;br/&gt; MIAPPE V1.1 (DM-17) Geographic location (country) - The country where the experiment took place, either as a full name or preferably as a 2-letter code.&#39;
    """
    countryCode: String

    """
    @original-field
    The full name of the country where a Location is located
&lt;br/&gt; MIAPPE V1.1 (DM-17) Geographic location (country) - The country where the experiment took place, either as a full name or preferably as a 2-letter code.
    """
    countryName: String

    """
    @original-field
    A URL to the human readable documentation of an object
    """
    documentationURL: String

    """
    @original-field
    Describes the general type of environment of a Location. (ex. forest, field, nursery, etc)
    """
    environmentType: String

    """
    @original-field
    Describes the level of protection/exposure for things like sun light and wind at a particular Location
    """
    exposure: String

    """
    @original-field
    
    """
    externalReferences_IDs: [String]

    """
    @original-field
    The street address of the institute at a particular Location
&lt;br/&gt; MIAPPE V1.1 (DM-16) Contact institution - Name and address of the institution responsible for the study.
    """
    instituteAddress: String

    """
    @original-field
    The full name of the institute at a particular Location
&lt;br/&gt; MIAPPE V1.1 (DM-16) Contact institution - Name and address of the institution responsible for the study.
    """
    instituteName: String

    """
    @original-field
    A human readable name for a Location
&lt;br/&gt; MIAPPE V1.1 (DM-18) Experimental site name - The name of the natural site, experimental field, greenhouse, phenotyping facility, etc. where the experiment took place.
    """
    locationName: String

    """
    @original-field
    A short description of a type of Location (ex. Field Station, Breeding Location, Storage Location, etc)
    """
    locationType: String

    """
    @original-field
    
    """
    parentLocation_ID: String

    """
    @original-field
    
    """
    childLocations_IDs: [String]

    """
    @original-field
    
    """
    studies_IDs: [String]

    """
    @original-field
    Description of the accessibility of the location (ex. Public, Private)
    """
    siteStatus: String

    """
    @original-field
    Describes the approximate slope (height/distance) of a Location.
    """
    slope: String

    """
    @original-field
    Describes the topography of the land at a Location. (ex. Plateau, Cirque, Hill, Valley, etc)
    """
    topography: String

    """
    @original-field
    
    """
    seedLots_IDs: [String]

    """
    @original-field
    
    """
    observationUnits_IDs: [String]

    coordinates(search: searchCoordinateInput): coordinate
  parentLocation(search: searchLocationInput): location
    
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
    childLocationsFilter(search: searchLocationInput, order: [ orderLocationInput ], pagination: paginationInput!): [location]


    """
    @search-request
    """
    childLocationsConnection(search: searchLocationInput, order: [ orderLocationInput ], pagination: paginationCursorInput!): LocationConnection

    """
    @count-request
    """
    countFilteredChildLocations(search: searchLocationInput) : Int
  
    """
    @search-request
    """
    studiesFilter(search: searchStudyInput, order: [ orderStudyInput ], pagination: paginationInput!): [study]


    """
    @search-request
    """
    studiesConnection(search: searchStudyInput, order: [ orderStudyInput ], pagination: paginationCursorInput!): StudyConnection

    """
    @count-request
    """
    countFilteredStudies(search: searchStudyInput) : Int
  
    """
    @search-request
    """
    seedLotsFilter(search: searchSeedlotInput, order: [ orderSeedlotInput ], pagination: paginationInput!): [seedlot]


    """
    @search-request
    """
    seedLotsConnection(search: searchSeedlotInput, order: [ orderSeedlotInput ], pagination: paginationCursorInput!): SeedlotConnection

    """
    @count-request
    """
    countFilteredSeedLots(search: searchSeedlotInput) : Int
  
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
type LocationConnection{
  edges: [LocationEdge]
  locations: [location]
  pageInfo: pageInfo!
}

type LocationEdge{
  cursor: String!
  node: location!
}

  enum locationField {
    locationDbId
    abbreviation
    additionalInfo_IDs
    coordinateDescription
    coordinateUncertainty
    coordinates_ID
    countryCode
    countryName
    documentationURL
    environmentType
    exposure
    externalReferences_IDs
    instituteAddress
    instituteName
    locationName
    locationType
    parentLocation_ID
    childLocations_IDs
    studies_IDs
    siteStatus
    slope
    topography
    seedLots_IDs
    observationUnits_IDs
  }
  
  input searchLocationInput {
    field: locationField
    value: String
    valueType: InputType
    operator: GenericPrestoSqlOperator 
    search: [searchLocationInput]
  }

  input orderLocationInput{
    field: locationField
    order: Order
  }



  type Query {
    locations(search: searchLocationInput, order: [ orderLocationInput ], pagination: paginationInput! ): [location]
    readOneLocation(locationDbId: ID!): location
    countLocations(search: searchLocationInput ): Int
    csvTableTemplateLocation: [String]
    locationsConnection(search:searchLocationInput, order: [ orderLocationInput ], pagination: paginationCursorInput! ): LocationConnection
    validateLocationForCreation(locationDbId: ID!, abbreviation: String, additionalInfo_IDs: [String], coordinateDescription: String, coordinateUncertainty: String, coordinates_ID: String, countryCode: String, countryName: String, documentationURL: String, environmentType: String, exposure: String, externalReferences_IDs: [String], instituteAddress: String, instituteName: String, locationName: String, locationType: String, parentLocation_ID: String, childLocations_IDs: [String], studies_IDs: [String], siteStatus: String, slope: String, topography: String, seedLots_IDs: [String], observationUnits_IDs: [String] , addCoordinates:ID, addParentLocation:ID  , addAdditionalInfo:[ID], addExternalReferences:[ID], addChildLocations:[ID], addStudies:[ID], addSeedLots:[ID], addObservationUnits:[ID] , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateLocationForUpdating(locationDbId: ID!, abbreviation: String, additionalInfo_IDs: [String], coordinateDescription: String, coordinateUncertainty: String, coordinates_ID: String, countryCode: String, countryName: String, documentationURL: String, environmentType: String, exposure: String, externalReferences_IDs: [String], instituteAddress: String, instituteName: String, locationName: String, locationType: String, parentLocation_ID: String, childLocations_IDs: [String], studies_IDs: [String], siteStatus: String, slope: String, topography: String, seedLots_IDs: [String], observationUnits_IDs: [String] , addCoordinates:ID, removeCoordinates:ID , addParentLocation:ID, removeParentLocation:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addChildLocations:[ID], removeChildLocations:[ID] , addStudies:[ID], removeStudies:[ID] , addSeedLots:[ID], removeSeedLots:[ID] , addObservationUnits:[ID], removeObservationUnits:[ID]  , skipAssociationsExistenceChecks:Boolean = false): Boolean!
    validateLocationForDeletion(locationDbId: ID!): Boolean!
    validateLocationAfterReading(locationDbId: ID!): Boolean!
    """
    locationsZendroDefinition would return the static Zendro data model definition
    """
    locationsZendroDefinition: GraphQLJSONObject
  }

  type Mutation {
    addLocation(locationDbId: ID!, abbreviation: String, additionalInfo_IDs: [String], coordinateDescription: String, coordinateUncertainty: String, coordinates_ID: String, countryCode: String, countryName: String, documentationURL: String, environmentType: String, exposure: String, externalReferences_IDs: [String], instituteAddress: String, instituteName: String, locationName: String, locationType: String, parentLocation_ID: String, childLocations_IDs: [String], studies_IDs: [String], siteStatus: String, slope: String, topography: String, seedLots_IDs: [String], observationUnits_IDs: [String] , addCoordinates:ID, addParentLocation:ID  , addAdditionalInfo:[ID], addExternalReferences:[ID], addChildLocations:[ID], addStudies:[ID], addSeedLots:[ID], addObservationUnits:[ID] , skipAssociationsExistenceChecks:Boolean = false): location!
    updateLocation(locationDbId: ID!, abbreviation: String, additionalInfo_IDs: [String], coordinateDescription: String, coordinateUncertainty: String, coordinates_ID: String, countryCode: String, countryName: String, documentationURL: String, environmentType: String, exposure: String, externalReferences_IDs: [String], instituteAddress: String, instituteName: String, locationName: String, locationType: String, parentLocation_ID: String, childLocations_IDs: [String], studies_IDs: [String], siteStatus: String, slope: String, topography: String, seedLots_IDs: [String], observationUnits_IDs: [String] , addCoordinates:ID, removeCoordinates:ID , addParentLocation:ID, removeParentLocation:ID   , addAdditionalInfo:[ID], removeAdditionalInfo:[ID] , addExternalReferences:[ID], removeExternalReferences:[ID] , addChildLocations:[ID], removeChildLocations:[ID] , addStudies:[ID], removeStudies:[ID] , addSeedLots:[ID], removeSeedLots:[ID] , addObservationUnits:[ID], removeObservationUnits:[ID]  , skipAssociationsExistenceChecks:Boolean = false): location!
    deleteLocation(locationDbId: ID!): String!
      }
`;