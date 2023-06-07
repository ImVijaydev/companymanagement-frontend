import { Component, Input, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() companyData:any;
  latitude!:any;
  longitude!:any;
  map!: Map;

  ngOnInit(): void {
    this.latitude= this.companyData.latitude;
    this.longitude= this.companyData.longitude;
    this.initMap();
    this.addMarker();
  }

  initMap(): void {
    // Create the map
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([this.longitude, this.latitude]),
        zoom: 12
      })
    });
  }

  addMarker(): void {
    const markerElement = document.getElementById('marker')!;
    const markerOverlay = new Overlay({
      position: fromLonLat([this.longitude, this.latitude]),
      positioning: 'center-center',
      element: markerElement,
      stopEvent: false
    });
    this.map.addOverlay(markerOverlay);
  }
}
