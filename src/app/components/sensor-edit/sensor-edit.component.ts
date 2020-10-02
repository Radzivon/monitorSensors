import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Sensor} from '../../model/sensor/sensor';
import {SensorService} from '../../services/sensor/sensor.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {Location} from '@angular/common';
import {SensorTypeService} from '../../services/sensor-type/sensor-type.service';

@Component({
  selector: 'app-sensor-edit',
  templateUrl: './sensor-edit.component.html',
  styleUrls: ['./sensor-edit.component.css']
})
export class SensorEditComponent implements OnInit {
  form: any;
  errorMessage: string;
  id: number;
  sensor: Sensor;
  private routeSubscription: Subscription;

  constructor(private sensorService: SensorService, private sensorTypeService: SensorTypeService, private formBuilder: FormBuilder,
              private route: ActivatedRoute, private router: Router, private location: Location) {
    this.routeSubscription = route.params.subscribe(params => this.id = params['id']);
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      model: new FormControl(0, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]),
      rangeFrom: new FormControl(0, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]),
      rangeTO: new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]),
      unit: new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]),
      type: new FormControl('', [Validators.required, Validators.pattern(/^[A-ZА-Я]{1}[a-zа-яё]+$/)]),
      location: new FormControl(0, [Validators.pattern(/^[0-9]+$/)]),
      description: new FormControl('', [Validators.pattern(/^[A-ZА-Я]{1}[a-zа-яё]+$/)]),
    });

    this.routeSubscription = route.params.subscribe(params => this.id = params['id']);

  }

  ngOnInit(): void {
    this.sensorTypeService.getSensorTypesAll().subscribe(data => {

    });
    if (this.id != undefined) {
      this.getSensor();
    }


  }

  setControlValues() {
    this.getNameControl().setValue(this.sensor.name);
    this.getModelControl().setValue(this.sensor.model);
    this.getLocationControl().setValue(this.sensor.location);
    this.getRangeFromControl().setValue(this.sensor.rangeFrom);
    this.getRangeToControl().setValue(this.sensor.rangeTo);
    this.getUnitControl().setValue(this.sensor.unit);
    this.getTypeControl().setValue(this.sensor.type);
    this.getDescriptionControl().setValue(this.sensor.description);
  }

  getSensor() {
    this.sensorService.getSensorById(this.id).subscribe(data => {
      this.sensor = JSON.parse(data);
      this.setControlValues();
    });
  }

  saveSensor() {
    const updatedSensor = new Sensor();
    updatedSensor.id = this.id;
    updatedSensor.name = this.getNameControl().value;
    updatedSensor.rangeFrom = this.getRangeFromControl().value;
    updatedSensor.rangeTo = this.getRangeToControl().value;
    updatedSensor.unit = this.getUnitControl().value;
    updatedSensor.model = this.getModelControl().value;
    updatedSensor.type = this.getTypeControl().value;
    updatedSensor.location = this.getLocationControl().value;
    updatedSensor.description = this.getDescriptionControl().value;
    this.sensorService.updateSensor(updatedSensor).subscribe();
    this.goBack();
  }

  goBack() {
    this.location.back();
  }

  getLocationControl() {
    return this.form.get('location');
  }

  getNameControl() {
    return this.form.get('name');
  }

  getRangeFromControl() {
    return this.form.get('rangeFrom');
  }

  getRangeToControl() {
    return this.form.get('rangeTo');
  }

  getUnitControl() {
    return this.form.get('unit');
  }

  getModelControl() {
    return this.form.get('model');
  }

  getDescriptionControl() {
    return this.form.get('description');
  }

  getTypeControl() {
    return this.form.get('type');
  }

  getAllControl() {
    return this.getNameControl().invalid || this.getLocationControl().invalid || this.getRangeFromControl().invalid
      || this.getUnitControl().invalid || this.getModelControl().invalid
      || this.getDescriptionControl().invalid || this.getTypeControl().invalid;
  }
}
