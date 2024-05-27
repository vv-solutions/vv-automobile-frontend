import {useRouter} from "next/router";
import productFacade from "../../facades/productFacade";
import React, {useState} from "react";
import CartComponent from "../../components/CartComponent";
import OrderComponent from "../../components/OrderComponent";
import categoryFacade from "../../facades/categoryFacade";
import ConfirmationComponent from "../../components/ConfirmationComponent";
import {Button, Divider, Form, Input, Steps, Typography, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
const { Title } = Typography;
const { Step } = Steps;
function CartPage() {
    const router = useRouter();

    const [showPage, setShowPage] = useState(0)

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


    const steps = [
        {
            title: 'Cart',
            content: <CartComponent nextPage={nextPage} order={order} setOrder={setOrder}/>
        },
        {  title: 'Information',
            content: (<OrderComponent nextPage={nextPage} prevPage={prevPage} order={order} setOrder={setOrder}
                                           setCreatedOrder={setCreatedOrder}/>)
        },
        {  title: 'Confirmation',
            content: (<ConfirmationComponent order={createdOrder}/>)
        },
    ]

    return (
        <>
            <div className="contentContainer shadow-sm p-3 mb-5 bg-white rounded">
                <Steps current={showPage} className={"w-50 m-auto mb-5 mt-5"}>
                    {steps.map((step, index) => (
                        <Step key={index} title={step.title}/>
                    ))}
                </Steps>
                <div style={{margin: '2rem 0'}}>
                    {steps[showPage].content}
                </div>
                {/*{showPage == 1 &&*/}
                {/*    <CartComponent nextPage={nextPage} order={order} setOrder={setOrder}/>*/}
                {/*}*/}
                {/*{showPage == 2 &&*/}
                {/*    <OrderComponent nextPage={nextPage} prevPage={prevPage} order={order} setOrder={setOrder}*/}
                {/*                    setCreatedOrder={setCreatedOrder}/>*/}
                {/*}*/}
                {/*{(showPage == 3 && createdOrder) &&*/}
                {/*    <ConfirmationComponent order={createdOrder}/>*/}
                {/*}*/}

            </div>

        </>
    )
}

export default CartPage;