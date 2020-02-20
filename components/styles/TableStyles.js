import styled from 'styled-components';
import { sizes, colours } from '../Utilities';

const Table = styled.table`
  padding: ${sizes(2)};
  border-collapse: collapse;
  height: auto;
  border-radius: ${sizes(3)};
  /* display: grid; */  
  /* border-spacing: 0; */

  justify-content: center;
  align-items: center;
  /* grid-gap: ${sizes(2)}; */
  background: ${colours(0, 2)};
  td{
      padding: ${sizes(2)};
  }
  th,
  td {
    border-bottom: 1px solid ${colours(0, 0)};
  }
  tr{
      padding: ${sizes(3)};
  }
  tr:hover {
    background-color: ${colours(0, 1)};
  }
`;

export default Table;
