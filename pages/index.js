import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Row} from "react-bootstrap";
import CategoryGrid from "../components/CategoryGrid";
import {useEffect, useState} from "react";
import categoryFacade from "../facades/categoryFacade";

export default function Home() {

  const [categories,setCategories] = useState([])
    const test = async () =>{
      console.log(await categoryFacade.getAll())
    }


    useEffect (() => {
        const fetchCategories = async () => {
            await categoryFacade.getAll().then(setCategories)
        }

        fetchCategories();
    },[])


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

<button onClick={test}>test</button>
   </>
  )
}
