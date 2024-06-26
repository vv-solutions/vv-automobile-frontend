import {useRouter} from "next/router";
import {makeOptions} from "../util/fetchUtil";

function brandFacade() {

    const URL = 'http://localhost:8081/brand/';


    async function getBrandById(id) {
        const opts = makeOptions('GET');
        return await fetch(URL  + id, opts).then((r) =>  r.json());
    }

    async function getAll() {
        const opts = makeOptions('GET');
        return await fetch(URL+"all", opts).then((r) =>  r.json());
    }

    async function update(category) {
        const opts = makeOptions('PUT',category);
        return await fetch(URL, opts).then((r) =>  r.json());
    }

    async function create(brand) {
        const opts = makeOptions('POST',brand);
        return await fetch(URL , opts).then((r) =>  r.json());
    }

    return {
        getBrandById,
        getAll,
        update,
        create
    };
}

const facade = brandFacade();
export default facade;