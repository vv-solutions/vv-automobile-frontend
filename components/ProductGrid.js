import {useRouter} from "next/router";
import AddToCart from "./AddToCart";

function ProductGrid({products}) {

    const router = useRouter();

    const clickCard = (pid) =>{

       router.push({
           pathname: '/product/'+pid
       })
    }

return(
    <>
        {products.map(product => (

            <div id={product.id} key={product.id} onClick={() => clickCard(product.id)} style={{zIndex:5, width:250}}  className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4 d-flex align-items-stretch border-0">
                <div id={product.id} className="card h-100 box-shadow position-relative border-0" style={{zIndex:4}}>
                    <img src={product.imgUrl} className="card-img-top" alt={product.name} style={{zIndex:4}}/>
                    <div className="card-body d-flex flex-column" style={{zIndex:4}}>
                        <h5 className="card-title fs-6 fw-normal text-center " style={{minHeight:50}}>{product.name}</h5>

                        <p className="card-text text-center fw-bolder mt-1 mb-1" >{product.price.toFixed(2)} DKK</p>
                        <AddToCart product={product} />
                    </div>

                </div>
            </div>
        ))}
    </>
)

} export default ProductGrid