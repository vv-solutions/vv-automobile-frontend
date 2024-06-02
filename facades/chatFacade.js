import {useRouter} from "next/router";
import {makeOptions} from "../util/fetchUtil";

function chatFacade() {

    const URL = '/api/chat';


    async function getChatResponse(message) {

        console.log(message)
        const opts = makeOptions('POST',message);
        return await fetch(URL, opts).then((r) =>  r.json());
    }

    return {
        getChatResponse,
    };
}

const facade = chatFacade();
export default facade;