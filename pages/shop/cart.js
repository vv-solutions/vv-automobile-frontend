import {useRouter} from "next/router";
import productFacade from "../../facades/productFacade";
import {useState} from "react";
import CartComponent from "../../components/CartComponent";
import OrderComponent from "../../components/OrderComponent";
import categoryFacade from "../../facades/categoryFacade";
import ConfirmationComponent from "../../components/ConfirmationComponent";

function CartPage() {
    const router = useRouter();

    const [showPage, setShowPage] = useState(1)

    const [order, setOrder] = useState({
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            street: "",
            houseNumber: "",
            addressLine2: "",
            zipcode: "",
            orderLines:
                []
        }
    )
    const [createdOrder, setCreatedOrder] = useState()


    const nextPage = () => {
        setShowPage(showPage + 1)
    }
    const prevPage = () => {
        setShowPage(showPage - 1)
    }

    return (
        <>
            <div className="contentContainer shadow-sm p-3 mb-5 bg-white rounded">
                {showPage == 1 &&
                    <CartComponent nextPage={nextPage} order={order} setOrder={setOrder}/>
                }
                {showPage == 2 &&
                    <OrderComponent nextPage={nextPage} prevPage={prevPage} order={order} setOrder={setOrder}
                                    setCreatedOrder={setCreatedOrder}/>
                }
                {(showPage == 3 && createdOrder) &&
                    <ConfirmationComponent order={createdOrder}/>
                }

            </div>

        </>
    )
}

export default CartPage;