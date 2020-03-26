import React, { useContext, useState } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { UserContext, userType } from '../context/UserContext';
import { GET_PETS } from './GetPets';
import Button from './Button';
import Form from './styles/FormStyles';
import { sizes, colours } from './Utilities';

const StyledAddPet = styled.article`
  /* form { */
  display: flex;
  flex-direction: column;
  border: 2px solid ${colours(0, 0)};
  border-radius: ${sizes(2)};
  margin-top: ${sizes(4)};
  /* grid-template-columns: auto auto auto; */
  /* grid-gap: ${sizes(2)}; */
  justify-content: center;
  align-items: center;
  width: auto;
  padding: ${sizes(4)};
  /* .add-pet-button {
      grid-row: 2/3;
      grid-column: 1/-1;
    } */
  /* } */
`;

const ADD_PET_MUTATION = gql`
  mutation ADD_PET_MUTATION($userId: ID!, $name: String!) {
    addPet(userId: $userId, name: $name) {
      _id
    }
  }
`;
type formStateType = {
  name: string;
};
const AddPet = () => {
  const [{ user }] = useContext<React.Context>(UserContext);

  const defaultState: formStateType = {
    name: '',
  };
  const [formState, setFormState] = useState<formStateType | null>(
    defaultState
  );
  const [addPet] = useMutation(ADD_PET_MUTATION, {
    variables: { userId: user._id, ...formState },
    refetchQueries: [{ query: GET_PETS, variables: { userId: user._id } }],
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const submitPet = async e => {
    await addPet().catch();
    setFormState(defaultState);
  };
  return (
    <StyledAddPet>
      <Form
        method='POST'
        onSubmit={e => {
          e.preventDefault();
          // addPet();
          submitPet();
        }}
      >
        <label htmlFor='name'>Pet Name</label>
        <input
          type='text'
          name='name'
          value={formState.name}
          onChange={changeHandler}
          required
        />
        <Button primary type='submit'>
          Add Pet
        </Button>
      </Form>
    </StyledAddPet>
  );
};

export default AddPet;
