import {useRouter} from "next/router";

function CartComponent({products, nextPage, order,setOrder}) {

    const handleNextPage = () => {

        //set order lines

        nextPage()
    }

    return (
        <>
            <div>
                <div className="order-steps-menu hidden-print mb-5">
                    <h5 className={"text-start w-75 m-auto" } style={{color:"white"}}>.</h5>
                    <ul className="steps-list">
                        <li className="active">
                            Cart
                        </li>
                        <li className="disabled">
                            Information
                        </li>
                        <li className="disabled">
                            Confirmation
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-75 m-auto">
                <div className="cart-headlines">
                    <div className="header-item description">
                        <h4>Product</h4>
                    </div>
                    <div className="header-item price">
                        <h4>Unit price</h4>
                    </div>
                    <div className="header-item amount">
                        <h4>Quantity</h4>
                    </div>
                    <div className="header-item delete">
                        <h4>&nbsp;</h4>
                    </div>
                    <div className="header-item total">
                        <h4>Price</h4>
                    </div>
                </div>
                {products.map((product) => (
                    <div className="cart-line" key={product.id}>
                        <div className="cart-line__description">
                            <strong className="title">
                                <img src={product.imgUrl} alt={product.name} style={{width: 110, paddingRight: 30}}/>
                                <a href={product.url} target="_top" title={product.name}>{product.name}
                                </a>
                            </strong>
                        </div>
                        <div className="cart-line__price">
                            Kr.&nbsp;{product.price}
                        </div>
                        <div className="cart-line__amount">
                            <button className="button button_minus">-</button>
                            <input type="text" value="1" className="amount-input" readOnly/>
                            <button className="button button_plus">+</button>
                        </div>
                        <div className="cart-line__delete">
                            <button className="button button_delete"><i className="fas fa-trash-alt"></i></button>
                        </div>
                        <div className="cart-line__total">
                            Kr.&nbsp;{product.price}
                        </div>
                    </div>
                ))}

                <div className="summary">
                    <div className="row">
                        <div className="main-content col-md-7 col-md-pull-5">

                        </div>

                        <div className="shopping-cart-summary col-md-5 col-md-push-7">
                            <div className="row total_price_row">
                                <div className="col-md-6 col-xs-7">
                                    <strong>Total</strong>
                                </div>
                                <div className="col-md-6 col-xs-5 price price-hidden">
                                    <span className="price">Kr.&nbsp;10,000.90</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <div className={"text-end"}>
                {products.length > 0 &&
                    <button onClick={handleNextPage} className="btn btn-success">To checkout</button>
                }</div>
            </div>
        </>
    )


};

export default CartComponent;