import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledNavLink = styled(NavLink)`
  padding: 15px 25px;
  text-decoration: none;
  color: black;
  display: inline-block;

  font-size: 22px;
  border: 1px solid blue;
  border-radius: 8px;

  transition: all 0.3s;
  
  &.active {
    background-color: rgba(0, 0, 0, 0.3);
    border-color: yellow;
  }
`;
