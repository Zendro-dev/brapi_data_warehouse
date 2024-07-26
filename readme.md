# How to set up a BrAPI data warehouse?

In this repo you can find a way to quickly set up a Zendro instance using the BrAPI schema V2.1.


## Ready to use BrAPI-Zendro instance
In `brapi_with_models` folder you can find a ready to use Zendro instance using the latest schema of BrAPI. For this, we used a converter to translate BrAPI JSON model schemas to Zendro models. For details please see the next section.

Please follow the steps in [readme file](https://github.com/Zendro-dev/brapi_data_warehouse/tree/main/brapi_with_models) to set up the instance.

## Convert BrAPI schemas to Zendro type models
In `brapi_without_models` folder you can find a ready to use Zendro instance without models. This means you have to generate your own json data models, generate migrations for zendro and run the instance. 

For doing so, you must have the BrAPI schema without nested JSON objects, so you have to convert this kind of arrays:

```
"crossAttributes": {
    "description": "Set of custom attributes associated with a cross",
    "items": {
        "description": "a custom attributes associated with a cross",
        "properties": {
            "crossAttributeName": {
                "description": "the human readable name of a cross attribute",
                "type": [
                    "null",
                    "string"
                ]
            },
            "crossAttributeValue": {
                "description": "the value of a cross attribute",
                "type": [
                    "null",
                    "string"
                ]
            }
        },
        "type": "object"
    },
    "type": [
        "null",
        "array"
    ]
}
```
to an extra model called crossAttributes with keys crossAttributeDbId, crossAttributeName and crossAttributeValue:
```
"CrossAttribute": {
    "properties": {
        "crossAttributeDbId": {
            "description": "the unique identifier for a custom attributes associated with a cross",
            "type": "string"
        },
        "crossAttributeName": {
            "description": "the human readable name of a cross attribute",
            "type": [
                "null",
                "string"
            ]
        },
        "crossAttributeValue": {
            "description": "the value of a cross attribute",
            "type": [
                "null",
                "string"
            ]
        }
    },
    "required": [
        "crossAttributeDbId"
    ],
    "title": "CrossAttribute",
    "type": "object"
}
```

Then you can use the [Zendro converter](https://github.com/LzLang/Zendro-Converter.git) to convert BrAPI models to files that Zendro can understand (see details in [readme file](https://github.com/Zendro-dev/brapi_data_warehouse/tree/main/brapi_without_models)).

When your Zendro models are ready, you can make the migrations and finally set up Zendro.

Please follow the steps in [readme file](https://github.com/Zendro-dev/brapi_data_warehouse/tree/main/brapi_without_models) to set up the instance.