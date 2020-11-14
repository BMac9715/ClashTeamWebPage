import React from "react";
import SideNavBar from "../sidenavbar/sidenavbar";
import Navbar from "../navbar/Navbar";

const Dashboard = props => {
    return (
        <div>
            <Navbar/>
            <SideNavBar props={props}/>   
        </div>  
    );
};

export default Dashboard;