import {useRouter} from "next/router";
import {makeOptions} from "../util/fetchUtil";

function chatFacade() {

    const URL = '/api/chat/';


    async function getChatResponse(message) {
        const opts = makeOptions('GET');
        return await fetch(URL+message, opts).then((r) =>  r.json());
    }

    return {
        getChatResponse,
    };
}

const facade = chatFacade();
export default facade;