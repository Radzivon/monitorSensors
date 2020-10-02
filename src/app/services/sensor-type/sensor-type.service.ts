import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorTypeService {
  private baseUrl = 'http://localhost:8080/';
  private sensorTypeAllUrl = 'type/all';
  constructor(private http: HttpClient) { }
  getSensorTypesAll(): Observable<string> {
    return this.http.get(this.baseUrl + this.sensorTypeAllUrl, {responseType: 'text'});
  }
}
