import {useRouter} from "next/router";
import orderFacade from "../facades/orderFacade";
import {log} from "next/dist/server/typescript/utils";

function ConfirmationComponent({order}) {


    return (
        <>
            <div>
                <div className="order-steps-menu hidden-print mb-5">
                    <ul className="steps-list">
                        <li className="">
                            Cart
                        </li>
                        <li className="">
                            Information
                        </li>
                        <li className="active">
                            Confirmation
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container my-5">
                <h1 className="text-center mb-4">Order Confirmation</h1>
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">Order ID: {order.id}</h2>
                        <p><strong>Date:</strong> {new Date(order.create).toLocaleString('da')}</p>
                        <p><strong>Total Price:</strong> {order.totalPrice.toFixed(2)} DKK</p>
                        <h3>Customer Details</h3>
                        <p><strong>Name:</strong> {order.firstName} {order.lastName}</p>
                        <p><strong>Phone:</strong> {order.phone}</p>
                        <p><strong>Email:</strong> {order.email}</p>
                        <p>
                            <strong>Address:</strong> {order.street} {order.houseNumber}, {order.addressLine2}, {order.zipcode}
                        </p>


                    </div>
                </div>
            </div>

        </>
    );
};

export default ConfirmationComponent;