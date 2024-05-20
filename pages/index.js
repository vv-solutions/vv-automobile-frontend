import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Row} from "react-bootstrap";
import CategoryGrid from "../components/CategoryGrid";
import {useEffect, useState} from "react";
import categoryFacade from "../facades/categoryFacade";
import ProductCarousel from "../components/ProductCarousel";
import productFacade from "../facades/productFacade";
import {useRouter} from "next/router";

export default function Home() {

  const [categories,setCategories] = useState([])
    const test = async () =>{
      console.log(await categoryFacade.getAll())
    }

    const router = useRouter()

    useEffect (() => {
        const fetchData = async () => {
            await categoryFacade.getAll().then(setCategories)
            await productFacade.getPopular(20).then(setProducts)
        }
        console.log(router.query.test);
        fetchData();
    },[router.isReady])
    const[products,setProducts] = useState([])


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

       <Row className="p-5">
           <div className="w-75 m-auto">
    <div className="text-center mb-5">
        <h3>Popular products right now: </h3>
    </div>
               {products &&
            <ProductCarousel products={products}/>
               }
           </div>
       </Row>

<button onClick={test}>test</button>
   </>
  )
}
