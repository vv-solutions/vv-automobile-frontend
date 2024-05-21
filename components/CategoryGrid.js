import {useRouter} from "next/router";


function CategoryGrid ({categories}) {

    const router = useRouter();


    const clickCategory = (e) =>{

        const url = {
            pathname: "shop",
            query: { ...router.query, category: e.target.id }
        }


        console.log(url)
        //router.query.category = e.target.id;
        router.push(url)
    }

    return (
        <div className="grid-container">
            {categories.map(category => (
                <div style={{zIndex:5}} id={category.id} key={category.id} onClick={clickCategory} className="grid-item">
                    <h4  id={category.id}>{category.name}</h4>
                </div>
            ))}
        </div>
    );
};

export default CategoryGrid;