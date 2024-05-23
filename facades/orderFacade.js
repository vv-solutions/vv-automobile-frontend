import {useRouter} from "next/router";
import {makeOptions} from "../util/fetchUtil";

function orderFacade() {

    const URL = '/api/order/';


    async function createOrder(order) {
        const opts = makeOptions('POST',order);
        return await fetch(URL , opts).then((r) =>  r.json());
    }

    async function getAll(count,page) {
        const opts = makeOptions('GET');
        return await fetch(URL+"all"+"/"+count+"/"+page, opts).then((r) =>  r.json());
    }

    async function getById(id) {
        const opts = makeOptions('GET');
        return await fetch(URL+id, opts).then((r) =>  r.json());
    }

    async function searchOrders(query) {
        const opts = makeOptions('GET');

        const path = "search?query="+query
        return await fetch(URL  +path, opts).then((r) =>  r.json());
    }


    return {
        createOrder,
        getAll,
        getById,
        searchOrders
    };
}

const facade = orderFacade();
export default facade;