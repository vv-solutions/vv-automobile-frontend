import {useRouter} from "next/router";
import {makeOptions} from "../util/fetchUtil";

function categoryId() {

    const URL = '/api/category/';


    async function getById(id) {
        const opts = makeOptions('GET');
        return await fetch(URL  + id, opts).then((r) =>  r.json());
    }

    async function getAll() {
        const opts = makeOptions('GET');
        return await fetch(URL+"all", opts).then((r) =>  r.json());
    }



    return {
        getById,
        getAll,
    };
}

const facade = categoryId();
export default facade;