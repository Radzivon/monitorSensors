import {Unit} from '../unit/unit';
import {Type} from '../type/type';

export class Sensor {
  id: number;
  name: string;
  model: string;
  rangeFrom: number;
  rangeTo: number;
  unit: Unit;
  type: Type;
  location: string;
  description: string;

  // constructor(name: string, model: string, rangeFrom: number, rangeTo: number, unit: Unit, type: Type, location: string, description: string) {
  //   this.name = name;
  //   this.model = model;
  //   this.rangeFrom = rangeFrom;
  //   this.rangeTo = rangeTo;
  //   this.unit = unit;
  //   this.type = type;
  //   this.location = location;
  //   this.description = description;
  // }
}
