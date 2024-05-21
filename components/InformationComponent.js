import {useRouter} from "next/router";

function InformationComponent({nextPage, prevPage}) {
    return (
        <>
            <div>
                <div className="order-steps-menu hidden-print mb-5">
                    <h5 className={"text-start w-75 m-auto"} onClick={prevPage} style={{cursor:"pointer"}}>Go Back</h5>
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
            {/*<h2 className="text-center my-4">Information</h2>*/}
            <form className="w-75 m-auto">
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="firstName" className="form-label">
                            First name<span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" id="firstName" required/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">
                            Last name<span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" id="lastName" required/>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="mobile" className="form-label">
                            Phone.<span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" id="mobile" required/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">
                            E-mail<span className="text-danger">*</span>
                        </label>
                        <input type="email" className="form-control" id="email" required/>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="street" className="form-label">Street</label>
                        <input type="text" className="form-control" id="street"/>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="houseNumber" className="form-label">House number</label>
                        <input type="text" className="form-control" id="houseNumber"/>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="apartment" className="form-label">
                            Letter / Floor / Apartment.
                        </label>
                        <input type="text" className="form-control" id="apartment"/>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-3">
                        <label htmlFor="postalCode" className="form-label">Postal code</label>
                        <input type="text" className="form-control" id="postalCode"/>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" className="form-control disabled" id="city"/>
                    </div>
                </div>
                <div className="w-50 m-auto mt-5">
                    <button onClick={nextPage} className="btn btn-success w-100 text-center p-3">
                        Confirm and pay
                    </button>
                </div>
            </form>

        </>
    );
};

export default InformationComponent;