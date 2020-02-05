﻿
/// See the DevExtreme documentation to learn more about the Map UI widget settings.
/// https://js.devexpress.com/Documentation/16_2/ApiReference/UI_Widgets/dxMap/

import { CustomItemViewer } from 'devexpress-dashboard/common'
import vectorMap from 'devextreme/viz/vector_map'
import { dxElement } from 'devextreme/core/element';
import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';


export class OnlineMapItem extends CustomItemViewer {
    private mapViewer: any;

    constructor(model: any, container, options) {
        super(model, container, options);
        this.mapViewer = null;        
    }

    setSize(width, height) {
        super.setSize(width, height);
        let contentWidth = this.contentWidth(),
            contentHeight = this.contentHeight();
        const size = {width: contentWidth, height: contentHeight};
        this.mapViewer.option('size', size);
    }
    setSelection(values: Array<Array<any>>) {
        super.setSelection(values);
        this._updateSelection();
    };

    clearSelection() {
        super.clearSelection();
        this._updateSelection();
    }

    renderContent(element: dxElement, changeExisting: boolean, afterRenderCallback?) {
        var markers = [],
            routes = [],
            mode = this.getPropertyValue('DisplayMode'),
            showMarkers = mode === 'Markers' || mode === 'MarkersAndRoutes' || this.canMasterFilter(),
            showRoutes = mode === 'Routes' || mode === 'MarkersAndRoutes';
        if(this.getBindingValue('Latitude').length > 0 && this.getBindingValue('Longitude').length > 0) {
            let cont = 0;
            this.iterateData(row => {
                var latitude = row.getValue('Latitude')[0];
                var longitude = row.getValue('Longitude')[0];
                if (latitude && longitude) {
                    if (showMarkers) {
                        markers.push({
                            coordinates: [longitude, latitude],  
                            attributes: {
                                name: 'Point' + (cont++)
                            }                          
                        });
                    }
                    if (showRoutes) {
                        routes.push([latitude, longitude]);
                    }
                }
            });
        }
        debugger;
        const    options = <any>{
            title: {
                text: "Sea Currents"
            },
            layers: [{
                dataSource: mapsData.world,
                hoverEnabled: false
            }, {
                dataSource: markers
            }],
            tooltip: {
                enabled: true,
                customizeTooltip: function (arg) {
                    if (arg.layer.type === "marker") {
                        return { text: arg.attribute("name") };
                    }
                }
            },
            legends: [{
                font: {
                    size: 14
                },
                horizontalAlignment: "right",
                verticalAlignment: "top",
                customizeText: function () {
                    if (this.color === "#3c20c8") {
                        return "Cold";
                    } else {
                        return "Warm";
                    }
                },
                source: { layer: "water", grouping: "color" }
            }],
            "export": {
                enabled: true
            },
            bounds: [-180, 85, 180, -75]
        };
        if(changeExisting && this.mapViewer) {
            this.mapViewer.option(options);
        } else {
            this.mapViewer = new (vectorMap || (<any>window).DevExpress.ui.dxVectorMap)(element, options);
        }
    }

    private _onClick(row) {
        this.setMasterFilter(row);
        this._updateSelection();
    }

    private _updateSelection() {
        /*var markers = this.mapViewer.option('markers');
        markers.forEach(marker => {
            marker.iconSrc = this.isSelected(marker.tag) ? "https://js.devexpress.com/Demos/RealtorApp/images/map-marker.png" : null;
        });
        this.mapViewer.option('autoAdjust', false);
        this.mapViewer.option('markers', markers);*/
    }
}