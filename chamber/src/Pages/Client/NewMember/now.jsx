import React, { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Now = () => {
    const csrf = Cookies.get("csrftoken");

    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const response = await axios.get("http://192.168.169.82:8000/approval/",{
                    withCredentials: true,
                    headers:{
                        "X-CSRFToken": csrf,
                    }
                })
                console.log(response.data);
            }catch(error){
                console.log(error);
            }
        }
        fetchData();
    })

    return (
        <div>
            <h1 style={{ backgroundColor: "black" , color:"white"}}>Now</h1>
        </div>
    );
}

export default Now;