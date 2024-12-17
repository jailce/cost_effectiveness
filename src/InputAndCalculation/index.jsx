import { useState } from "react";
import { GiSodaCan } from "react-icons/gi";
import { TbBottleFilled } from "react-icons/tb";
import {
  Container,
  Title,
  Input,
  ResultWrapper,
  ProductOne,
  ButtonWrapper,
  ProductTwo,
} from "./styles.jsx";
import Button from "./../Button";

export function InputAndCalculation() {
  const [state, setState] = useState({
    priceA: "",
    priceB: "",
    volumeA: "",
    volumeB: "",
    result: "",
    isBestDealOne: false,
    isBestDealTwo: false,
  });
  // const worthA = state.priceA / state.volumeA ;
  // const worthB = state.priceB / state.volumeB ;
  const worthA = state.priceA && state.volumeA ? parseFloat(state.priceA) / parseFloat(state.volumeA) : 0;
  const worthB = state.priceB && state.volumeB ? parseFloat(state.priceB) / parseFloat(state.volumeB) : 0;
  console.log(   state.priceA, state.priceB);


  const formatReais = (value) => {
    const rawValue = value.replace(/\D/g, "");
    const numericValue = (parseInt(rawValue, 10) / 100).toFixed(2);
    return numericValue.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const handleChange = (field, value) => {
 

    setState((prevState) => ({
      ...prevState,
      [field]: value ,
    }));
  };

  const getFormattedValue = (value) => {
    // Retorna o valor formatado para exibição no input
    return formatReais(value);
  };


  const handleCalc = () => {
    if (worthA > worthB) {
      setState((prevState) => ({
        ...prevState,
        result: (
          <span>
            compre o produto de {state.volumeB} ml por R$ {state.priceB}
          </span>
        ),
        isBestDealOne: false,
        isBestDealTwo: true,
      }));
    } else if (worthA < worthB) {
      setState((prevState) => ({
        ...prevState,
        result: (
          <span>
            compre o produto de {state.volumeA} ml por R$ {state.priceA}
          </span>
        ),
        IsBestDealOne: true,
        IsBestDealTwo: false,
      }));
    } else if (worthA === worthB) {
      setState((prevState) => ({
        ...prevState,
        result: <span>"Os produtos são equivalentes"</span>,

        IsBestDealOne: false,
        IsBestDealTwo: false,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        result: <span>"0"</span>,

        IsBestDealOne: false,
        IsBestDealTwo: false,
      }));
    }  
  };
  const handleFocus = (field) => {
    setState((prevState) => ({
      ...prevState,
      [field]: "0", 
    }));
  };
  const handleOnClear = () => {
    setState({
      priceA: "0",
      priceB: "0",
      volumeA: "",
      volumeB: "",
      result: "",
      isBestDealOne: false,
      isBestDealTwo: false,
    });
  };





  return (
    <Container>
      <Title>Qual o produto é mais barato?</Title>

      <ResultWrapper>{state.result}</ResultWrapper>
      <ProductOne isBestDeal={state.isBestDealOne}>
        <label>
        <GiSodaCan />
   
          <Input
            placeholder="0"
            value={state.volumeA}
            onChange={(e) => handleChange("volumeA", e.target.value)}
            onFocus={(e) => handleFocus("volumeA" , e.target.value)}
            type="number"
          />
          
          <em>ml</em>
        </label>

        <label>
          R$
          <Input
            placeholder="0"
            value={getFormattedValue(state.priceA)}
       
            
            onChange={(e) => handleChange("priceA", e.target.value)}
            onFocus={(e) => handleFocus("priceA", e.target.value)}
            type="text" 
          />
        </label>
      </ProductOne>

      <ProductTwo isBestDeal={state.isBestDealTwo}>
        <label>
        <GiSodaCan />
      
          <Input
            placeholder=""
            value={state.volumeB}
            onChange={(e) => handleChange("volumeB", e.target.value)}
            onFocus={(e) => handleChange("volumeB", e.target.value)}
            type="number"
          />
     <em>ml</em>
        </label>
        <label>
          R$
          <Input
            placeholder=""
            value={getFormattedValue(state.priceB)}
            onChange={(e) => handleChange("priceB", e.target.value)}
            onFocus={(e) => handleFocus("priceB", e.target.value)}
            type="text"
          />
        </label>
      </ProductTwo>

      <ButtonWrapper>
        <Button onClick={handleOnClear} variant="secondary" label="Limpar" />
        <Button onClick={handleCalc} label="Confirmar" />
      </ButtonWrapper>
    </Container>
  );
}
export default InputAndCalculation;
