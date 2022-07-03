import React from "react";

function InvalidDevice () {
    return (
        <div
            style={{
                padding: "20px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "90vw",
                fontSize: "24px",
            }}
        >
            Hey there... I haven't gotten to developing the mobile version of this app yet. So, you can't access this website from here.
            Please use a laptop or desktop. Thanks!
        </div>
    )
}

export default InvalidDevice;