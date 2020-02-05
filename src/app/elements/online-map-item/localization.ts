﻿import { ResourceManager } from 'devexpress-dashboard'

function getDefaultCustomLocalization() {
    return {
        // Binding Panel
        'DashboardWebCustomItemStringId.DefaultNameOnlineMap': "Vectorial Map",

        'DashboardWebCustomItemStringId.Latitude': "Latitude",
        'DashboardWebCustomItemStringId.Binding.SetLatitude': "Set Latitude",
        'DashboardWebCustomItemStringId.Binding.ConfigureLatitude': "Configure Latitude",

        'DashboardWebCustomItemStringId.Longitude': "Longitude",
        'DashboardWebCustomItemStringId.Binding.SetLongitude': "Set Longitude",
        'DashboardWebCustomItemStringId.Binding.ConfigureLongitude': "Configure Longitude",

        // Options
        'DashboardWebCustomItemStringId.OnlineMapProvider': "Provider",
        'DashboardWebCustomItemStringId.OnlineMapType': "Type",
        'DashboardWebCustomItemStringId.OnlineMapProviderGoogle': "Google",
        'DashboardWebCustomItemStringId.OnlineMapProviderBing': "Bing",
        'DashboardWebCustomItemStringId.OnlineMapTypeRoadMap': "RoadMap",
        'DashboardWebCustomItemStringId.OnlineMapTypeSatellite': "Satellite",
        'DashboardWebCustomItemStringId.OnlineMapTypeHybrid': "Hybrid",
        'DashboardWebCustomItemStringId.OnlineMapDisplayMode': "Display Mode",
        'DashboardWebCustomItemStringId.OnlineMapDisplayModeMarkers': "Markers",
        'DashboardWebCustomItemStringId.OnlineMapDisplayModeRoutes': "Routes",
        'DashboardWebCustomItemStringId.OnlineMapDisplayModeMarkersAndRoutes': "All",
        'DashboardWebCustomItemStringId.OnlineMapSectionName': "Custom Options"
    };
}
ResourceManager.setLocalizationMessages(getDefaultCustomLocalization());

