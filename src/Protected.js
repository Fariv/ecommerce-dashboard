import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
function Protected({Component}) {

    const history = useHistory();
    useEffect(() => {
        if (!localStorage.getItem("user_info")) {
            history.push("/signup");
        }
    });

    return <Component />
}

export default Protected;