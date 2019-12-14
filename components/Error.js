import React from 'react';

const Error = ({ error }) => {
  return <p>{error.message.replace('GraphQL error:', '')}</p>;
};

export default Error;
