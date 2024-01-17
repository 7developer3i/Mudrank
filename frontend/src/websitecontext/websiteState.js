import { useState } from "react";
import { WebsiteContext } from "./websiteContext";

const WebsiteState = (props) => {

    // FUNDRAISING STATE
  const [fundraisingData, setFundraisingData] = useState([]);
  const [showimage, setShowimage] = useState("");
  const [title, setShowTitle] = useState("");
  const [paragraph, setParagraph] = useState("");


//   ABOUT STATE

const [AboutData,setAboutData]=useState([])
const [openEditModal,setOpenEditModal] = useState(false)
const [openDeleteMOdal,setDeleteModal] = useState(false)
const [textone,setTextone] = useState("")
const [heading,setHeading] = useState("")
const [paratext,setParatext] = useState("")
const [id,setId] = useState("")

// PRIVACY STATE
    const [privacyData ,setPrivacyData] = useState([]);
    const [paraitem,setParaitem]= useState("");
    const [content,setContent]= useState("");

    

  return (
    <WebsiteContext.Provider
      value={{
        id,
        setId,
        paragraph,
        setParagraph,
        title,
        setShowTitle,
        showimage,
        setShowimage,
        openEditModal,
        setOpenEditModal,
        AboutData,
        setAboutData,
        openDeleteMOdal,
        setDeleteModal,
        fundraisingData, 
        setFundraisingData,
        textone,
        setTextone,
        heading,
        setHeading,
        paratext,
        setParatext,
        privacyData ,
        setPrivacyData,
        paraitem,
        setParaitem,
        content,
        setContent


      }}
    >
      {props.children}
    </WebsiteContext.Provider>
  );
};
export default WebsiteState;
