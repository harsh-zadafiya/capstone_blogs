import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import path from "../../constants/path";

const MyAccountsPage = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.userInfo);

    useEffect(() => {
        Object.values(user).length === 0 && navigate(path.APP);
    }, [user]);

    return <div>APPLICATION</div>;
};

export default MyAccountsPage;
