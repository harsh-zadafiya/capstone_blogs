import { useLocation } from "react-router-dom";
import { NavLink } from "./NavigationLink";

const NavigationLink = ({ children, ...otherProps }) => {
    const location = useLocation();
    const active = location.pathname === otherProps.to ? "true" : undefined;

    return (
        <NavLink active={active} {...otherProps}>
            {children}
        </NavLink>
    );
};

export default NavigationLink;
