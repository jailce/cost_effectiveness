import {Button as StyledButton} from "./styles.jsx";


const Button = ({label, onClick, variant="primary"}) => {
return (

<StyledButton onClick = {onClick} variant={variant}>
{label}
</StyledButton >

)


}


export default Button;