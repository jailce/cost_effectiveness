import styled from "styled-components";


export const Container = styled.div`
border: 1px solid #ffffff20;  
padding: 1rem;
border-radius: 8px;
color: #daedde;
`

export const ProductOne = styled.div`
  background: ${(props) => props.isBestDeal  ? '#236d23ad' : 'transparent'};   

display: flex ;
justify-content: center;
text-align  : center ;
border-radius: 8px;
`


export const ProductTwo = styled.div `
  background: ${(props) => props.isBestDeal  ? '#236d23ad' : 'transparent'};   
display: flex ;
justify-content: center;
border-radius: 8px;
`

export const Input = styled.input `
  max-width: 60px;
  font-family: "Poppins", sans-serif !important;
  margin: 10px;
  height: 40px;
  color: #fff;
  border-radius: 8px;
  border: 1px solid #fff;
  background: #333;   

  text-align  : center ;

  
`
export const ButtonWrapper = styled.div `
display: flex ;
justify-content: center;

  
`


export const ResultWrapper = styled.p `
display: flex ;
justify-content: center;
font-family: "Poppins", sans-serif !important;

  
`

export const Title = styled.h1 `
font-size: 1.5rem;
font-weight: 600;
color: #daedde;

  
`