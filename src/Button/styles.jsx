import styled, {css} from 'styled-components';


export const Button = styled.button `
  min-width: 120px;
  width: auto;
  margin: 10px;
  font-weight: 100px;
  padding: 10px 20px;
  height: 40px;
  color: #fff;
  font-family: "Poppins", sans-serif !important;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 8px;
  border: none;
  background: #2e2d6d;   
  cursor: pointer;



  &:hover{
    background: #141430; 
    transition  :  all 200ms;
  }

  ${({variant}) => variant === "secondary" && css` 

  background: transparent;   
  border: 1px solid #2e2d6d;
  
  `
  
  
  }
`