import { useState } from 'react';
import { GiSodaCan } from "react-icons/gi";
import { TbBottleFilled } from "react-icons/tb";
import {Container, Input, ResultWrapper, ProductOne, ButtonWrapper, ProductTwo} from "./styles.jsx";
import Button from './../Button';




export function InputAndCalculation() {

const [priceA, setPriceA] = useState("0");
const [priceB, setPriceB] = useState("0");
const [volumeA, setVolumeA] = useState("ml");
const [volumeB, setVolumeB] = useState("ml");
const [result, setResult] = useState("");
const [isBestDealOne, setIsBestDealOne] = useState(false);
const [isBestDealTwo, setIsBestDealTwo] = useState(false);

const worthA = priceA / volumeA;
const worthB = priceB / volumeB;
console.log(worthA, worthB)

  const handleClick = () => {
    if (worthA > worthB ) {
      setResult( <span>compre o produto de   {volumeB}  ml por R$ {priceB} </span> );
      setIsBestDealOne(false);  
      setIsBestDealTwo(true);  
    } else if (worthA < worthB) {
     setResult("compre o A");
     setIsBestDealOne(true);  
     setIsBestDealTwo(false); 
    } else if (worthA === worthB) {
     setResult("Os produtos tem o mesmo valor");
     setIsBestDealOne(false);  
     setIsBestDealTwo(false); 
    } else {
       setResult(" ");
    }
  };

  const handleOnClear = () => {
    setPriceA('0')
 setPriceB('0')
setVolumeA('ml')
setVolumeB('ml')
  };

  return (
    <Container>
      <h1>Qual o produto é mais barato?</h1>
      <ResultWrapper>{result}</ResultWrapper>
      <ProductOne isBestDeal={isBestDealOne}>
      
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

      <ProductTwo isBestDeal={isBestDealTwo}>
     
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
      <Button onClick={handleOnClear} label = "Limpar"/>  
      </ButtonWrapper>
    </Container>
  );
}
export default InputAndCalculation;
