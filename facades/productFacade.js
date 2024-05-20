import {useRouter} from "next/router";
import {makeOptions} from "../util/fetchUtil";

function productFacade() {

    const URL = '/api/product/';

    async function getProductsByCategory(category,count,page,brands) {
        const opts = makeOptions('GET');

        const path = `category?category=${category}&count=${count}&page=${page}${brands.map(b => "&brands="+b).join("")}`

        return fetch(URL + path, await opts).then((r) => r.text());
    }

    async function getProductById(id) {
        const opts = makeOptions('GET');
        return await fetch(URL  + id, opts).then((r) =>  r.json());
    }



    return {
        getProductsByCategory,
        getProductById,
    };
}

const facade = productFacade();
export default facade;