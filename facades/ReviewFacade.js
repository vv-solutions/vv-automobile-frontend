import {useRouter} from "next/router";
import {makeOptions} from "../util/fetchUtil";

function reviewFacade() {

    const URL = '/api/review/';


    async function getReviewsByProductId(id) {
        const opts = makeOptions('GET');
        return await fetch(URL  + id, opts).then((r) =>  r.json());
    }

    async function createReview(review) {
        const opts = makeOptions('POST',review);
        return await fetch(URL+"create", opts).then((r) =>  r.json());
    }

    async function getRecommendedById(id) {
        const opts = makeOptions('GET');
        return await fetch(URL+"recommended/"+id, opts).then((r) =>  r.json());
    }

    return {
        getReviewsByProductId,
        createReview,
        getRecommendedById,
    };
}

const facade = reviewFacade();
export default facade;