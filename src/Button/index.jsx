import {Button as StyledButton} from "./styles.jsx";


export function Button({label, onClick}) {
return (

<StyledButton onClick = {onClick}>
{label}
</StyledButton >

)




}


export default Button();