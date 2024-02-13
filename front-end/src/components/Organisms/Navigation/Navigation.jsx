import { Link, useNavigate } from "react-router-dom";

import path from "../../../constants/path";
import axios from "../../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/user/user.reducer";
import { Buttons, NavigationContainer, NavigationLinks, NavigationWrapper } from "./Navigation";
import { Button, Logo } from "../../";
import { NavigationLink } from "../../";
import button from "../../Atoms/Button/constant";
import { NavigationLinkPrimary, RedButton } from "../../Atoms/NavigationLink/NavigationLink";

const Navigation = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userInfo);

    return (
        <NavigationWrapper>
            <NavigationContainer>
                <Logo />

                <NavigationLinks>
                    {Object.keys(user).length !== 0 ? (
                        <>
                            <Link to={path.HOME}>
                                <Button animation={false} variant={button.variant.SECONDARY} size={button.size.SMALL}>
                                    Home
                                </Button>
                            </Link>
                            <Link to={path.LOGIN}>
                                <Button animation={false} variant={button.variant.SECONDARY} size={button.size.SMALL}>
                                    Login
                                </Button>
                            </Link>
                            <Link to={path.ADD_NEW_BLOG}>
                                <Button animation={false} variant={button.variant.SECONDARY} size={button.size.SMALL}>
                                    Add Blog
                                </Button>
                            </Link>
                            <Link to={path.MODIFY_USER_PROFILE}>
                                <Button animation={false} variant={button.variant.SECONDARY} size={button.size.SMALL}>
                                    Modify User
                                </Button>
                            </Link>
                            <Link to={path.USER_FEEDBACK}>
                                <Button animation={false} variant={button.variant.SECONDARY} size={button.size.SMALL}>
                                    User Feedback
                                </Button>
                            </Link>
                            <RedButton
                                onClick={async () => {
                                    await axios.get("/user/logout");
                                    dispatch(updateUser({}));
                                    navigate(path.SIGN_UP);
                                }}
                            >
                                Logout
                            </RedButton>

                        </>
                    ) : (
                        <Buttons>
                            <Link to={path.LOGIN}>
                                <Button animation={false} variant={button.variant.SECONDARY} size={button.size.SMALL}>
                                    Login
                                </Button>
                            </Link>
                            <Link to={path.SIGN_UP}>
                                <Button animation={false} size={button.size.SMALL}>
                                    Sign Up
                                </Button>
                            </Link>
                        </Buttons>
                        
                    )}
                </NavigationLinks>
            </NavigationContainer>
        </NavigationWrapper>
    );
};

export default Navigation;
