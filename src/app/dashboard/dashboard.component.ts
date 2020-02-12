import { Component, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { DashboardControl, ResourceManager } from 'devexpress-dashboard';
import { OnlineMapItemExtension } from '../elements/online-map-item/online-map-extension';
import { MapItemExtension } from '../elements/map-item/map-extension';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements AfterViewInit, OnDestroy {
  private dashboardControl!: DashboardControl;
  constructor(private element: ElementRef) {
    ResourceManager.embedBundledResources();
  }
  ngAfterViewInit(): void {
    this.dashboardControl = new DashboardControl(this.element.nativeElement.querySelector(".dashboard-container"), {
      // Specifies a URL of the Web Dashboard's server.
      // endpoint: "http://localhost:55730/api/dashboard",
      endpoint: "https://demos.devexpress.com/services/dashboard/api",
      workingMode: "Designer",
    });

    this.dashboardControl.registerExtension(new OnlineMapItemExtension(this.dashboardControl));
    this.dashboardControl.registerExtension(new MapItemExtension(this.dashboardControl));
    this.dashboardControl.render();
  }

  ngOnDestroy(): void {
    this.dashboardControl && this.dashboardControl.dispose();
  }
}
