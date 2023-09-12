import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/images/not-found2.svg";

const NotFound = () => {
    return (
        <div>
            <img src={img} alt="not found" />
            <h3>Ohh! Page Not Found</h3>
            <p>We can't seem to find the page your are looking for</p>
            <Link to="/">Home Page</Link>
        </div>
    );
};

export default NotFound;
