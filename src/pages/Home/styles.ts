import styled from 'styled-components'
import { darken } from "polished";

export const Content = styled.div `

max-width:1050px;
display:flex;
flex-direction: column;
align-items:center;
justify-content:center;
`

export const FiltersSection = styled.div `
    max-width:1050px;

  .form {
    justify-content:center;
    align-items:center;
    margin:auto;
    width:600px;
    
  }

    label {
      color:#fff;
      font-size:24px;
      font-weight:700;
    }
    
    input {
      width:700px;
      padding:10px;
      margin-top:10px;
    }
  
  button {
    background: #7159c1;
    color: #fff;
    border: 0;
    border-radius: 4px;
    padding: 6px 20px;
    font-weight: bold;
    text-transform: uppercase;
    transition: background 0.2s;
    min-width:150px;
    &:hover {
      background: ${darken(0.06, "#7159c1")};
    }
    margin-top:10px;
  }

`

export const CardsSection = styled.div `
max-width:1050px;
margin-top:50px;

`

export const Cards = styled.ul `
    display:grid;
    grid-template-columns: repeat(3,1fr);
    grid-gap:20px;
    list-style:none;  
    margin:auto;
    max-width:1050px;

    li {

      max-width:350px;
        h1 {
            color:#FFF;
        }

        


    img {
      align-self: center;
      max-width: 350px;
    }



    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;
      display: flex;
      align-items: center;
      transition: background 0.2s;
      width:350px;
      padding:4px;
      &:hover {
        background: ${darken(0.06, "#7159c1")};
      }
      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);
        svg {
          margin-right: 5px;
        }
      }
      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
    }

    p {
      color:#FFF;
      font-weight:700;
      font-size:16px;
      margin-top:10px;
    }

 

`