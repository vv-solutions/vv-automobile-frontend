import {useRouter} from "next/router";
import {makeOptions} from "../util/fetchUtil";

function orderFacade() {

    const URL = '/api/order/';


    async function createOrder(order) {
        const opts = makeOptions('POST',order);
        return await fetch(URL , opts).then((r) =>  r.json());
    }

    async function getAll() {
        const opts = makeOptions('GET');
        return await fetch(URL+"all", opts).then((r) =>  r.json());
    }


    return {
        createOrder,
        getAll
    };
}

const facade = orderFacade();
export default facade;