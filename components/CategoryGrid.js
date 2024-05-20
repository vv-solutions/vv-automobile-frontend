import {useRouter} from "next/router";


function CategoryGrid ({categories}) {

    const router = useRouter();


    const clickCategory = (e) =>{

        const url = {
            pathname: "shop",
            query: { ...router.query, category: e.target.id }
        }

        //router.query.category = e.target.id;
        router.push(url)
    }

    return (
        <div className="grid-container">
            {categories.map(category => (
                <div id={category.id} key={category.id} onClick={clickCategory} className="grid-item">
                    {category.name}
                </div>
            ))}
        </div>
    );
};

export default CategoryGrid;