import {useRouter} from "next/router";

function OrderComponent({nextPage, prevPage, order,setOrder}) {

    const handleChange = (e) => {
        const { id, value } = e.target;
        setOrder((order) => ({
            ...order,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', order);
    };

    return (
        <>
            <div>
                <div className="order-steps-menu hidden-print mb-5">
                    <h5 className={"text-start w-75 m-auto"} onClick={prevPage} style={{cursor: "pointer"}}>Go Back</h5>
                    <ul className="steps-list">
                        <li className="">
                            Cart
                        </li>
                        <li className="active">
                            Information
                        </li>
                        <li className="disabled">
                            Confirmation
                        </li>
                    </ul>
                </div>
            </div>
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
                        <input type="text" className="form-control" id="mobile" value={order.mobile}
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
                        <label htmlFor="zipcode" className="form-label">Zip code <span className="text-danger">*</span></label>
                        <input type="number" className="form-control" id="zipcode" value={order.zipcode}
                               onChange={handleChange} required/>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="houseNumber" className="form-label ">House number<span
                            className="text-danger">*</span></label>
                        <input type="number" required className="form-control" id="houseNumber" value={order.houseNumber}
                               onChange={handleChange}/>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="addressLine2" className="form-label">
                            Letter / Floor / Apartment.
                        </label>
                        <input type="text" className="form-control" id="addressLine2" value={order.addressLine2}
                               onChange={handleChange}/>
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