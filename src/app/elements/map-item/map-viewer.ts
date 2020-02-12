
/// See the DevExtreme documentation to learn more about the Map UI widget settings.
/// https://js.devexpress.com/Documentation/16_2/ApiReference/UI_Widgets/dxMap/

import { CustomItemViewer } from 'devexpress-dashboard/common'
import L from 'leaflet';
import { dxElement } from 'devextreme/core/element';


export class MapItem extends CustomItemViewer {
    private mapViewer: any;
    private containerMap: any;

    constructor(model: any, container, options) {
        super(model, container, options);
        this.mapViewer = null;        
    }

    setSize(width, height) {
        super.setSize(width, height);
        let contentWidth = this.contentWidth(),
            contentHeight = this.contentHeight();

        if ( this.containerMap && this.containerMap.element) {
            this.containerMap.element.style = "width: "+ contentWidth+"px; height: " + contentHeight+"px";
        }
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
        var markers = [];

        const coordLinesData = {
            type: "FeatureCollection",
            features: []
        };
        
        if(this.getBindingValue('Latitude').length > 0 && this.getBindingValue('Longitude').length > 0) {
            let cont = 0;
            let prev;
            this.iterateData(row => {
                var latitude = row.getValue('Latitude')[0];
                var longitude = row.getValue('Longitude')[0];
                if (latitude && longitude) {
                    
                    const point = [longitude, latitude];
                    markers.push({
                        coordinates: point,  
                        attributes: {
                            name: 'Point' + (cont++)
                        }                          
                    });

                    if(prev) {
                        coordLinesData.features.push({
                            geometry: {
                                type: "LineString",
                                coordinates: [prev, point]
                            },
                            properties: {
                                row: row
                            }
                        });
                    }

                    prev = point;
                    
                }
            });
        }

        this.createContainer(element, markers, coordLinesData);
        
    }

    private createContainer(element, markers, lines) {
        
        this.appendViewMap(element);
         
    }

    private appendViewMap(containerElement) {
        if (!this.containerMap) {
            this.containerMap = {};
            this.containerMap.element = document.createElement('div');
            this.containerMap.map = L.map(this.containerMap.element).setView([51.505, -0.09], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                renderer: L.canvas()
            }).addTo(this.containerMap.map);


            L.marker([51.5, -0.09]).addTo(this.containerMap.map)
                .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')     
                .openPopup();
        }

        containerElement.appendChild(this.containerMap.element);


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