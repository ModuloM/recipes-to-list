// @flow
import React from 'react';
import styled from 'styled-components';

const IngredientWrapper = styled.div`
  flex: 1 1 auto;
  font-size: 1.3rem;
  padding: .5rem;
  cursor: pointer;
`;

// as styled component can't get state, must add a specific component
const IngredientUnchecked = styled.span`
  text-decoration: none;
`;
const IngredientChecked = styled.span`
  text-decoration: line-through;
`;

const CheckBox = styled.input.attrs({
  type: 'checkbox'
})`
  width: 1rem;
  height: 1rem;
`;


class IngredientElement extends React.Component {
  props: {
    name: string,
    quantity: number,
    unit: string
  };

  state = {
    checked: false
  }

  checkIngredient = () => {
    this.setState({
      checked: !this.state.checked
    });
  }

  render() {
    const { name, quantity, unit } = this.props;

    return (
      <IngredientWrapper
        onClick={ this.checkIngredient }
      >
        <CheckBox
          checked={ this.state.checked }
          onChange={ this.checkIngredient }
        />
        { !this.state.checked &&
          <IngredientUnchecked>
            { name } - { quantity > 0 &&
              <span>{ quantity } { unit }</span>
            } 
          </IngredientUnchecked>
        }
        { this.state.checked &&
          <IngredientChecked>
            { name } - { quantity > 0 &&
              <span>{ quantity } { unit }</span>
            }
          </IngredientChecked>
        }
      </IngredientWrapper>
    )
  }
}

export default IngredientElement;
