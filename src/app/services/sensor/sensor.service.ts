import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Sensor} from '../../model/sensor/sensor';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  private baseUrl = 'http://localhost:8080/';
  private sensorAllUrl = 'sensor/all';
  private sensorUpdateUrl = 'sensor/update/';
  private sensorSaveUrl = 'sensor/save';
  private sensorUrl = 'sensor/';
  private pageStr = 'page=';
  private pageSizeStr = 'pageSize=';
  private sortByStr = 'sortBy=';
  private order = 'order=';
  private and = '&';

  constructor(private http: HttpClient) {
  }

  getSensorAll(page: number, pageSize: number, sortBy: string, sortDir: string): Observable<string> {
    return this.http.get(this.baseUrl + this.sensorAllUrl
      + '?' + this.pageStr + page + this.and + this.pageSizeStr + pageSize + this.and + this.sortByStr + sortBy
      + this.and + this.order + sortDir, {responseType: 'text'});
  }

  getSensorById(sensorId: number) {
    return this.http.get(this.baseUrl + this.sensorUrl + sensorId, {responseType: 'text'});
  }

  updateSensor(sensor: Sensor) {
    return this.http.put(this.baseUrl + this.sensorUpdateUrl + sensor.id, JSON.stringify(sensor), httpOptions);
  }

  saveSensor(sensor: Sensor) {
    return this.http.post(this.baseUrl + this.sensorSaveUrl, JSON.stringify(sensor), httpOptions);
  }
}
