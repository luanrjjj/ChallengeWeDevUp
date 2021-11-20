import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;
  .Title {
    color:#fff;
    text-decoration: none;
    font-size:24px;
    font-weight:800;
  }
  a {
    transition: opacity 0.2s;
    text-decoration:none;
    &:hover {
      opacity: 0.7;
    }
  }
`;
export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  div {
    text-align: right;
    margin-right: 10px;
    strong {
      display: block;
      color: #fff;
    }
    span {
      font-size: 12px;
      color: #999;
    }
  }
`;
