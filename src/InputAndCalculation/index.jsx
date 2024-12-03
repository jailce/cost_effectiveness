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
    priceA: "0",
    priceB: "0",
    volumeA: "0",
    volumeB: "0",
    result: "",
    isBestDealOne: false,
    isBestDealTwo: false,
  });
  // const worthA = state.priceA / state.volumeA ;
  // const worthB = state.priceB / state.volumeB ;
  const worthA = parseFloat(state.priceA) / parseFloat(state.volumeA);
  const worthB = parseFloat(state.priceB) / parseFloat(state.volumeB);
  console.log(worthA, state.volumeA, state.priceA, worthB);

  const handleChange = (field, value) => {
    setState((prevState) => ({
      ...prevState,
      [field]: value, // Atualiza apenas o campo necessário
    }));
  };

  const handleClick = () => {
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
      [field]: "", // Limpa o campo específico
    }));
  };
  const handleOnClear = () => {
    setState({
      priceA: "0",
      priceB: "0",
      volumeA: "0",
      volumeB: "0",
      result: "",
      isBestDealOne: false,
      isBestDealTwo: false,
    });
  };

  // const Reais = new Intl.NumberFormat("pt-BR", {
  //   style: "currency",
  //   currency: "BRL",
  // });

  return (
    <Container>
      <Title>Qual o produto é mais barato?</Title>

      <ResultWrapper>{state.result}</ResultWrapper>
      <ProductOne isBestDeal={state.isBestDealOne}>
        <label>
        <GiSodaCan />
        <TbBottleFilled />
          <Input
            placeholder=""
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
            value={state.priceA}
            onChange={(e) => handleChange("priceA", e.target.value)}
            onFocus={(e) => handleFocus("priceA", e.target.value)}
            type="number"
          />
        </label>
      </ProductOne>

      <ProductTwo isBestDeal={state.isBestDealTwo}>
        <label>
        <GiSodaCan />
        <TbBottleFilled />
          <Input
            placeholder="0"
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
            placeholder="0,00"
            value={state.priceB}
            onChange={(e) => handleChange("priceB", e.target.value)}
            onFocus={(e) => handleFocus("priceB", e.target.value)}
            type="number"
          />
        </label>
      </ProductTwo>

      <ButtonWrapper>
        <Button onClick={handleOnClear} variant="secondary" label="Limpar" />
        <Button onClick={handleClick} label="Confirmar" />
      </ButtonWrapper>
    </Container>
  );
}
export default InputAndCalculation;
