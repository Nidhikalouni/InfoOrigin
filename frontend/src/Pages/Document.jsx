import React, { useState } from 'react'
import { Link } from "react-router-dom";

import { DocumentDetail } from '../assets/constant'


const Document = () => {
//  const[docData,setDocData]= new useState(DocumentDetail)
 
  
  return (
    <>
    <div>
      <h1> Welcome to the Document Page!</h1>
      <p>View Your all Document at one place!</p>
    
    {DocumentDetail.map((doc)=>(
      <div key={doc.id}>
        <h1>{doc.docData}</h1>
      </div>
    ))}
    </div>
   
<Link to = '/addDoc'
            className="bg-teal-400 text-slate-800 px-10 sm:px-16 "
            
              
            >
              AddDocument
            </Link>   

   
    
    </>
  

  )
}


export default Document


