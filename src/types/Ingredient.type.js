// @flow
import type { Department } from './Department.type';
import type { Unit } from './Unit.type';

export type Ingredient = {
  display_index: number,
  id: string,
  name: string,
  department: Department,
  quantity: number,
  unit: Unit
}
