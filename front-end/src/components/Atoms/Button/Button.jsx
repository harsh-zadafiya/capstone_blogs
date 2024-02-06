import button from "./constant";
import { Button as Btn } from "./Button";

const Button = ({ children, animation = true, variant, size, ...otherProps }) => (
    <Btn variant={variant ? variant : button.variant.PRIMARY} size={size ? size : button.size.NORMAL} animation={animation} {...otherProps}>
        {children}
    </Btn>
);

export default Button;
