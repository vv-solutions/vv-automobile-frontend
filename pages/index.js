import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Row} from "react-bootstrap";
import CategoryGrid from "../components/CategoryGrid";
import {useState} from "react";

export default function Home() {

  const [categories,setCategories] = useState([
      { id: 1, name: "Accessories" },
      { id: 2, name: "Interior" },
      { id: 3, name: "Electronic Parts" },
      { id: 4, name: "Lights" },
      { id: 5, name: "Radio" },
      { id: 6, name: "Tools" },
      { id: 7, name: "Styling" },
      { id: 8, name: "Paint" },
      { id: 9, name: "Wash" },
      { id: 10, name: "Maintenance" },
      { id: 11, name: "Polishing" },
      { id: 12, name: "Additives" },
      { id: 13, name: "Towing" },
      { id: 14, name: "Parts" }
  ])


  return (
   <>

     <Row>
       <div className="text-center">
        <h3>Search:</h3>
        <input type="text"/>
       </div>
     </Row>

     <Row>
         <div className="p-5">

       <CategoryGrid categories={categories}/>
         </div>
     </Row>


   </>
  )
}
