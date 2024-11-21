import {Button as StyledButton} from "./styles.jsx";


const Button = ({label, onClick}) => {
return (

<StyledButton onClick = {onClick}>
{label}
</StyledButton >

)


}


export default Button;