import {makeOptions} from "../util/fetchUtil";

function productFacade() {

    const URL = '/api/product/';

    async function getProductsByCategory(category,count,page,brands,orderBy) {

        const opts = makeOptions('GET');

        const path = `category?category=${category}&count=${count}&page=${page}${brands.map(b => "&brands="+b).join("")}&orderBy=${orderBy}`
        console.log(path)
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

    async function searchProducts(query) {
        const opts = makeOptions('GET');

    const path = "search?query="+query
        return await fetch(URL  +path, opts).then((r) =>  r.json());
    }

    async function getAll() {
        const opts = makeOptions('GET');
        return await fetch(URL+"all", opts).then((r) =>  r.json());
    }



    return {
        getProductsByCategory,
        getProductById,
        getPopular,
        searchProducts,
        getAll
    };
}

const facade = productFacade();
export default facade;