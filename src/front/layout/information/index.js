import React, { useEffect, useState } from "react";
import "./index.css"
import globalVariable from "../../variable";
import axios from "axios";
import { useParams } from "react-router-dom";

function FrontInformationPage() {

    const [pageInfo, setPageInfo] = useState(null)
    const params = useParams();

    useEffect(() => {
  
        axios.get(`${process.env.REACT_APP_API_ROOT}/api/page/${params.page_id_name}`, globalVariable.axiosConfigJson)
        .then(function (response) {
            console.log(response.data)
            setPageInfo(response.data.page)

        }).catch((error) => {
  
          console.log(error)
          window.location.assign(`/login?error=${error.response.data.message}`);
          // window.location.assign("/admin/login")
        })
  
    },[])

    if(pageInfo != null){

        return (
            <div className="p-3">
                <div dangerouslySetInnerHTML={{ __html: pageInfo.information_description_assoc && pageInfo.information_description_assoc[0].description.replace(/&lt;/g, "<").replace(/&gt;/g, ">") }}>
    
                </div>
            </div>
    
        )
    }

    else{
        return (
            <>
            </>
        )
    }
}

export default FrontInformationPage;