import { useState } from 'react';
import { GiSodaCan } from "react-icons/gi";
import { TbBottleFilled } from "react-icons/tb";
import {Container, Input, ResultWrapper, ProductOne, ButtonWrapper, ProductTwo} from "./styles.jsx";
import {Button} from "./../Button";




export function InputAndCalculation() {

const [priceA, setPriceA] = useState("");
const [priceB, setPriceB] = useState("");
const [volumeA, setVolumeA] = useState("");
const [volumeB, setVolumeB] = useState("");
const [result, setResult] = useState("");

const worthA = priceA / volumeA;
const worthB = priceB / volumeB;
console.log(worthA, worthB)

  const handleClick = () => {
    if (worthA > worthB) {
      return setResult("compre o B");
    } else if (worthA < worthB) {
      return setResult("compre o A");
    } else if (worthA === worthB) {
      return setResult("compre o A");
    } else {
      return setResult("a");
    }
  };

  return (
    <Container>
      <h1>Qual o produto é mais barato?</h1>
      <ResultWrapper>{result}</ResultWrapper>
      <ProductOne>
      
        <label>
        
    
          <Input
           placeholder="ml"
            value={volumeA}
            onChange={(x) => setVolumeA(x.target.value)}
            type="number" 
          />
          <GiSodaCan />
          <TbBottleFilled />
        </label>

        <label>
        R$
          <Input
            placeholder="0,00"
            value={priceA}
            onChange={(x) => setPriceA(x.target.value)}
            type="number"
          />
        </label>
      </ProductOne>

      <ProductTwo>
     
        <label>
       
          <Input
            placeholder="ml"
            value={volumeB}
            onChange={(x) => setVolumeB(x.target.value)}
            type="number"
          />
          <GiSodaCan />
          <TbBottleFilled />
        </label>
        <label>
          R$
          <Input
            placeholder="0,00"
            value={priceB}
            onChange={(x) => setPriceB(x.target.value)}
            type="number"
          />
        </label>
    
      </ProductTwo>

  
      <ButtonWrapper>
      <Button onClick={handleClick} label = "Confirmar"/>  
      </ButtonWrapper>
    </Container>
  );
}
export default InputAndCalculation;
