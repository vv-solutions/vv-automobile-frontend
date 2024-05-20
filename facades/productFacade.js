import {makeOptions} from "../util/fetchUtil";

function productFacade() {

    const URL = '/api/product/';

    async function getProductsByCategory(category,count,page,brands,orderBy,direction) {
        const opts = makeOptions('GET');

        const path = `category?category=${category}&count=${count}&page=${page}${brands.map(b => "&brands="+b).join("")}&orderBy=${orderBy}&direction=${direction}`

        return await fetch(URL + path, opts).then((r) => r.json());
    }

    async function getProductById(id) {
        const opts = makeOptions('GET');
        return await fetch(URL  + id, opts).then((r) =>  r.json());
    }
    async function getPopular(count) {
        const opts = makeOptions('GET');
        return await fetch(URL  + "popular/"+count, opts).then((r) =>  r.json());
    }


    return {
        getProductsByCategory,
        getProductById,
        getPopular
    };
}

const facade = productFacade();
export default facade;