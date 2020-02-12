    export const MAP_EXTENSION_NAME = 'Map';

    export const MapMeta: any = {
        bindings:[{
            propertyName: 'Latitude',
            dataItemType: 'Dimension',
            array: false,
            enableInteractivity: true,
            displayName: "Latitude",
            emptyPlaceholder: 'SetLatitude',
            selectedPlaceholder: "ConfigureLatitude",
            constraints: {
                allowedTypes: ['Integer', 'Float', 'Double', 'Decimal']
            }
        },  {
            propertyName: 'Longitude',
            dataItemType: 'Dimension',
            array: false,
            enableInteractivity: true,
            displayName: "Longitude",
            emptyPlaceholder: 'SetLongitude',
            selectedPlaceholder: "ConfigureLongitude",
            constraints: {
                allowedTypes: ['Integer', 'Float', 'Double', 'Decimal']
            }
        }],
        
        interactivity: {
            filter: true,
            drillDown: false
        },
        icon: MAP_EXTENSION_NAME,
        title: "Leaflet map",
        index: 1
    };
