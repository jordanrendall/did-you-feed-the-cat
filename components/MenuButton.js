import React from 'react';
import styled from 'styled-components';
import { colours, sizes } from './Utilities';

const StyledMenuButton = styled.button`
  /* position: absolute; */
  /* top: 5%; */
  /* left: 2rem; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: ${sizes(5)};
  height: ${sizes(5)};
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  span {
    width: ${sizes(5)};
    height: ${sizes(0)};
    background: ${colours(0, 0)};
    border-radius: ${sizes(3)};
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
  }
`;
const MenuButton = () => {
  return (
    <StyledMenuButton className='menu-button'>
      <span />
      <span />
      <span />
    </StyledMenuButton>
  );
};

export default MenuButton;
