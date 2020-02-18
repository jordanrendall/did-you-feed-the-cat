import styled from 'styled-components';
import Button from '../Button';
import { colours, sizes } from '../Utilities';

const Form = styled.form`
  padding: 0.5rem;
  height: auto;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: ${colours(0, 2)};
  .form-input {
    padding: 0.5rem;
    /* border-radius: 0.5rem; */
    margin: 0.5rem;
  }
  input:not([type='submit']) {
    border-radius: 0.5rem;
    border-style: none;
    background: ${colours(0, 1)};
    /* background-color: rgba(232, 240, 254, 1); */
  }
  input[type='submit'] {
    padding: 0.5rem;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export default Form;
