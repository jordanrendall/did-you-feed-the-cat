import styled from 'styled-components';
import Button from '../Button';
import { colours, sizes } from '../Utilities';

const Form = styled.form`
  padding: ${sizes(3)};
  height: 100%;
  border-radius: ${sizes(3)};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: ${colours(0, 2)};
  
  input{

  margin: ${sizes(2)};
  } 
  input:not([type='submit']) {
    border-radius: ${sizes(3)};
    border-style: none;
    background: ${colours(0, 1)};
    /* height: ${sizes(5)}; */
    font-size: ${sizes(3)};
    padding: ${sizes(2)};
    /* background-color: rgba(232, 240, 254, 1); */
  }
 
  /* input[type='submit'] {
    padding: 0.5rem;
    border-radius: 
    background-color: rgba(0, 0, 0, 0.2);
  } */
`;

export default Form;
