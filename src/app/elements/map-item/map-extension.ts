import { MAP_EXTENSION_NAME, MapMeta } from "./meta";
import { MapItem } from "./map-viewer";
import { ONLINE_MAP_ICON } from "./icon";
import { ICustomItemExtension } from "devexpress-dashboard/common";

import { dxElement } from "devextreme/core/element";



export class MapItemExtension implements ICustomItemExtension {
    name = MAP_EXTENSION_NAME;
    metaData = MapMeta;

    constructor(dashboardControl: any) {
        dashboardControl.registerIcon(ONLINE_MAP_ICON);
    }

    createViewerItem(model: any, element: dxElement, content: any) {
        return new MapItem(model, element, content);
    };
}
