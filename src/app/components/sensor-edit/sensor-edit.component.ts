import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Sensor} from '../../model/sensor/sensor';
import {SensorService} from '../../services/sensor/sensor.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {Location} from '@angular/common';
import {SensorTypeService} from '../../services/sensor-type/sensor-type.service';
import {Type} from '../../model/type/type';
import {Unit} from '../../model/unit/unit';

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
  types: Array<Type> = new Array<Type>();
  units: Array<Unit> = new Array<Unit>();
  private routeSubscription: Subscription;
  selectedTypeValue: Type;
  selectedUnitValue: Unit;

  constructor(private sensorService: SensorService, private sensorTypeService: SensorTypeService, private formBuilder: FormBuilder,
              private route: ActivatedRoute, private router: Router, private location: Location) {
    this.routeSubscription = route.params.subscribe(params => this.id = params['id']);
    this.form = this.formBuilder.group({
      name: new FormControl('Name', [Validators.required, Validators.minLength(1)]),
      model: new FormControl('Model', [Validators.required, Validators.minLength(1)]),
      rangeFrom: new FormControl(0, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]),
      rangeTo: new FormControl(0, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]),
      unit: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      location: new FormControl('Location', [Validators.required, Validators.minLength(1)]),
      description: new FormControl('Description', [Validators.required, Validators.minLength(1)]),
    });

    this.routeSubscription = route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit(): void {
    this.getSensorTypes();
    if (this.id != undefined) {
      this.getSensor();
    }
  }

  selectTypeSensor(temp: Type) {
    this.units = temp.units;
  }

  onChange($event) {
    this.units = this.selectedTypeValue.units;
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

  getSensorTypes() {
    this.sensorTypeService.getSensorTypesAll().subscribe(data => {
      this.types = JSON.parse(data);
    });
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
