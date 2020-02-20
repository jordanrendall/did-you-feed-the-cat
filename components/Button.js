import styled from 'styled-components';
import { sizes, colours, elevation } from './Utilities';
const ButtonStyles = styled.button`
  background: ${props =>
    props.primary
      ? colours(props.danger ? 1 : 0, 0)
      : colours(props.danger ? 1 : 0, 2)};
  color: ${props =>
    props.primary
      ? colours(props.danger ? 1 : 0, 2)
      : colours(props.danger ? 1 : 0, 0)};
  box-shadow: ${elevation[1]};
  border-radius: ${sizes(2)};
  border-style: none;
  border: 1px solid ${colours(0, 0)};
  padding-left: ${sizes(2)};
  padding-right: ${sizes(2)};
  padding-top: ${sizes(1)};
  padding-bottom: ${sizes(1)};
  font-size: ${sizes(3)};
  :hover {
    text-decoration: underline;
    transition: text-decoration 0.3s;
  }
`;

const Button = props => {
  return <ButtonStyles {...props}>{props.children}</ButtonStyles>;
};

export default Button;
