import {useRouter} from "next/router";

function ProductGrid({products}) {

    const router = useRouter();

    const clickCard = (pid) =>{

       router.push({
           pathname: '/product/'+pid
       })
    }

return(
        products.map((product) => (

            <div id={product.id} key={product.id} onClick={() => clickCard(product.id)} style={{zIndex:5}}  className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4 d-flex align-items-stretch">
                <div id={product.id} className="card h-100 box-shadow position-relative" style={{zIndex:4}}>
                    <img src={product.imgUrl} className="card-img-top" alt={product.name} style={{zIndex:4}}/>
                    <div className="card-body d-flex flex-column" style={{zIndex:4}}>
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description}</p>
                        <p className="card-text">Price: {product.price} DKK</p>
                    </div>
                    <div className="add-to-cart-overlay">
                        <button type="button" className="btn btn-lg btn-block btn-outline-primary" onClick={() => console.log("hello")}>Add to Cart</button>
                    </div>
                </div>
            </div>
        ))
)

} export default ProductGrid