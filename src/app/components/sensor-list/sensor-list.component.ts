import {Component, OnInit} from '@angular/core';
import {Sensor} from '../../model/sensor/sensor';
import {SensorService} from '../../services/sensor/sensor.service';
import {faEdit, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.css']
})
export class SensorListComponent implements OnInit {
  pageNumber = 0;
  pageSize = 4;
  sortBy = 'id';
  sortDirection = 'asc';
  sensors: Array<Sensor>;
  pages: Array<number>;
  faEdit = faEdit;
  faTimes = faTimes;

  constructor(private sensorService: SensorService, private router: Router) {
    this.sensors = new Array<Sensor>();
  }

  ngOnInit(): void {
    this.getSensors();
  }

  getSensors() {
    this.sensorService.getSensorAll(this.pageNumber, this.pageSize, this.sortBy, this.sortDirection).subscribe(data => {
        const pageOrders = JSON.parse(data);
        this.sensors = pageOrders.content;
        this.pages = new Array<number>(pageOrders.totalPages);
      }, error => {
      }
    );
  }

  setPageNumber(i, event: any) {
    event.preventDefault();
    this.pageNumber = i;
    this.getSensors();
  }

  setPageSize(pageSize, event: any) {
    event.preventDefault();
    this.pageSize = pageSize;
    this.getSensors();
  }

  setSortBy(sortBy, event: any) {
    event.preventDefault();
    this.sortBy = sortBy;
    this.getSensors();
  }

  setSortDirection(sortDir, event: any) {
    event.preventDefault();
    this.sortDirection = sortDir;
    this.getSensors();
  }

  redirectToPageEditSensor(sensorId: number) {
    this.router.navigate(['sensor', sensorId]);
  }
  redirectToPageNewSensor() {
    this.router.navigate(['sensor/new']);
  }
}
