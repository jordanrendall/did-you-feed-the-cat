import React from 'react';
import styled from 'styled-components';

const StyledError = styled.p`
  color: red;
  text-align: center;
`;

const Error = ({ error }) => {
  return (
    <StyledError className='error-message'>
      {error.message.replace('GraphQL error:', '')}
    </StyledError>
  );
};

export default Error;
