import {useRouter} from "next/router";
import {makeOptions} from "../util/fetchUtil";

function predictionFacade() {

    const URL = 'http://localhost:8081/prediction/';


    async function getPrediction(data) {
        const formData = new FormData();
        if(data.image){
            formData.append('image', data.image);
        }

        if(data.numberplate){
            formData.append('numberplate', data.numberplate);
        }

        if(data.km){
            formData.append('km', data.km);
        }


        console.log(formData)
        const opts =  makeOptions('POST', formData);
        opts.body = formData;
        delete opts.headers['Content-type']

        return await fetch(URL, opts).then((r) =>  r.json());
    }


    return {
        getPrediction,
    };
}

const facade = predictionFacade();
export default facade;