import React, { useEffect } from "react";

const ShowAvatars = ({ avatars, setSelectedAvatar }) => {
    useEffect(() => {
        console.log(avatars);
    }, []);
    return (
        <div>
            {avatars.map((avatar, index) => {
                return (
                    <div key={index}>
                        {/* <h4>avatarrr</h4> */}
                        <img
                            src={`data:image/svg+xml;base64,${avatar}`}
                            alt={"avatar"}
                            onClick={() => setSelectedAvatar(index)}
                        ></img>
                    </div>
                );
            })}
        </div>
    );
};
export default ShowAvatars;
