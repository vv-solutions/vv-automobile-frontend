import {makeOptions} from "../util/fetchUtil";

function productFacade() {

    const URL = 'http://localhost:8081/product/';

    async function getProductsByCategory(category,count,page,brands,orderBy) {

        const opts = makeOptions('GET');

        const path = `category?category=${category}&count=${count}&page=${page}${brands.map(b => "&brands="+b).join("")}&orderBy=${orderBy}`
        return await fetch(URL + path, opts).then((r) => r.json());
    }

    async function getProductsByIds(productIds) {
        console.log("hello")
        const opts = makeOptions('GET');
        const path = `list?${productIds.map(p => "&id="+p).join("")}`
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

    async function getAll(count,page) {
        const opts = makeOptions('GET');
        return await fetch(URL+"all/"+count+"/"+page, opts).then((r) =>  r.json());
    }

    async function getProductAvailability(productId) {
        const opts = makeOptions('GET');
        return await fetch(URL  +"availability/"+ productId, opts).then((r) =>  r.json());
    }

    async function update(product) {
        const opts = makeOptions('PUT',product);
        return await fetch(URL, opts).then((r) =>  r.json());
    }

    async function create(product) {
        const opts = makeOptions('POST',product);
        return await fetch(URL , opts).then((r) =>  r.json());
    }

    async function updateAvailability(productAvailability) {
        const opts = makeOptions('PUT',productAvailability);
        return await fetch(URL+"/updateAvailability", opts).then((r) =>  r.json());
    }
    async function deleteProduct(id) {
        const opts = makeOptions('PUT');
        return await fetch(URL+"/delete/"+id, opts);
    }

    return {
        getProductsByCategory,
        getProductById,
        getPopular,
        searchProducts,
        getAll,
        update,
        getProductAvailability,
        create,
        getProductsByIds,
        updateAvailability,
        deleteProduct
    };
}

const facade = productFacade();
export default facade;