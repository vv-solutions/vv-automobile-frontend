import {useRouter} from "next/router";
import orderFacade from "../facades/orderFacade";
import {log} from "next/dist/server/typescript/utils";
import cartFacade from "../facades/cartFacade";
import {useContext} from "react";
import {CartContext} from "../Context/CartContext";
import {message} from "antd";

function OrderComponent({nextPage, prevPage, order,setOrder, setCreatedOrder}) {
    const {updateCartQuantity } = useContext(CartContext);
    const handleChange = (e) => {
        const { id, value } = e.target;
        setOrder((order) => ({
            ...order,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create the order

            let cont = false
            await orderFacade.createOrder(order).then(async (res) => {
                    const r = await res.json();
                    if (res.status != 200) {
                        message.error(r.message, 5)
                    } else {
                        setCreatedOrder(r)
                        cont = true
                    }
                }
            )
            if(cont){
                // Clear the Redis cart
                await cartFacade.clearCart(); // Assuming you have a method to clear the cart in your cartFacade

                updateCartQuantity()
                // Proceed to the next page
                nextPage();
            }
        } catch (error) {
            console.error('Failed to create order:', error);
        }

    };

    return (
        <>
            <h5 className={"text-start w-75 m-auto mb-5"} onClick={prevPage} style={{cursor: "pointer"}}>Go Back</h5>
            <form className="w-75 m-auto" onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="firstName" className="form-label">
                            First name<span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" id="firstName" value={order.firstName}
                               onChange={handleChange} required/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">
                            Last name<span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" id="lastName" value={order.lastName}
                               onChange={handleChange} required/>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="mobile" className="form-label">
                            Phone.<span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" id="phone" value={order.phone}
                               onChange={handleChange} required/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">
                            E-mail<span className="text-danger">*</span>
                        </label>
                        <input type="email" className="form-control" id="email" value={order.email}
                               onChange={handleChange} required/>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-3">
                        <label htmlFor="street" className="form-label">Street <span
                            className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="street" value={order.street} required
                               onChange={handleChange}/>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="houseNumber" className="form-label ">House number<span
                            className="text-danger">*</span></label>
                        <input type="number" required className="form-control" id="houseNumber"
                               value={order.houseNumber}
                               onChange={handleChange}/>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="addressLine2" className="form-label">
                            Letter / Floor / Apartment.
                        </label>
                        <input type="text" className="form-control" id="addressLine2" value={order.addressLine2}
                               onChange={handleChange}/>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="zipcode" className="form-label">Zip code <span className="text-danger">*</span></label>
                        <input type="number" className="form-control" id="zipcode" value={order.zipcode}
                               onChange={handleChange} required/>
                    </div>
                </div>

                <div className="w-50 m-auto mt-5">
                    <button type="submit" className="btn btn-success w-100 text-center p-3">
                        Confirm and pay
                    </button>
                </div>
            </form>

        </>
    );
};

export default OrderComponent;