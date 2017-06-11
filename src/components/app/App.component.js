// @flow

import React from 'react';
import styled, { keyframes } from 'styled-components';

import logo from '../../assets/images/rtl-logo.png';

const AppWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex: 1 1 auto;
  width: 100%;
`;

const animatedLogo = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const AppLogo = styled.img`
  animation: ${animatedLogo} infinite 20s linear;
  height: 80px;
`;

const AppHeader = styled.div`
  flex: 1 1 auto;
  text-align: center;
  background-color: hsla(58, 90%, 53%, 0.63);
  height: 150px;
  padding: 20px;
  color: #292622;
`;

const AppContent = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex: 1 1 auto;
  width: 100%;
`;

const App = ({
  children
}: { 
  children: any
}) => (
  <AppWrapper>
    <AppHeader>
      <AppLogo src={logo} alt="logo" />
      <h2>Recipes to List - Yummy!</h2>
    </AppHeader>
    <AppContent>
      { children }
    </AppContent>
  </AppWrapper>
)

export default App;
