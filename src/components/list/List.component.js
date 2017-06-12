// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import type { State } from '../../types/State.type';
import type { Ingredient } from '../../types/Ingredient.type';
import IngredientElement from './Ingredient.component';
import {
  getIngredientListByDepartment,
  getIngredientsDepartments
} from './list.reducer';
import { computeIngredients } from '../../services/ingredient.service';
import listBackground from '../../assets/images/list-background.jpg';

const ListWrapper = styled.div`
  padding: 2rem;
  width: 90%;
  min-height: 300px;
  background: url(${listBackground}) center top repeat content-box;
`;

const ListContent = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-flow: column nowrap;
  justify-content: stretch;
  align-items: stretch;
  margin-top: 1.5rem;
  padding: 1rem;
`;

const Department = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

class List extends React.Component {
  props: {
    departments: Array<string>,
    ingredientsByDepartments: { [department: string]: Array<Ingredient> }
  };

  static defaultProps = {
    ingredientsByDepartments: []
  }

  render() {
    const { departments, ingredientsByDepartments } = this.props;

    return (
      <ListWrapper>
        <ListContent>
          { departments.length > 0 &&
            departments.map((department, index) => (
              <div key={index} >
                <Department>
                  { department }
                </Department>
                { computeIngredients(ingredientsByDepartments[department]).map((ingredient, index) => (
                  <IngredientElement
                    key={ index }
                    name={ ingredient.name }
                    quantity={ ingredient.quantity }
                    unit={ ingredient.unit }
                  />
                ))}
              </div>
            ))
          }
        </ListContent>
      </ListWrapper>
    )
  }
}

const mapStateToProps = (state: State) => {
  return {
    departments: getIngredientsDepartments(state),
    ingredientsByDepartments: getIngredientListByDepartment(state)
  }
}

export default connect(
  mapStateToProps,
  {}
)(List);
