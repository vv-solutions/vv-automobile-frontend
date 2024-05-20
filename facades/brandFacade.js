import {useRouter} from "next/router";
import {makeOptions} from "../util/fetchUtil";

function brandFacade() {

    const URL = '/api/brand/';


    async function getBrandById(id) {
        const opts = makeOptions('GET');
        return await fetch(URL  + id, opts).then((r) =>  r.json());
    }

    async function getAll() {
        const opts = makeOptions('GET');
        return await fetch(URL, opts).then((r) =>  r.json());
    }



    return {
        getBrandById,
        getAll,
    };
}

const facade = brandFacade();
export default facade;