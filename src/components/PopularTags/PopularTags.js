import React, {useEffect} from "react";
import Loading from "../Loading/Loading";
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import useFetch from "../../Hooks/useFetch";
import { NavLink } from "react-router-dom";

const PopularTags = () => {
    const [{response, isLoading, error}, doFetch] = useFetch('/tags');

    useEffect(() => {
        doFetch();
    }, [doFetch])

    if (isLoading || !response) {
        return <Loading />
    }

    if (error) {
        return <ErrorMessage />
    }

    return (
        <div className="sidebar">
            <p>Popular tags</p>
            <div className="tag-list">
                {response.tags.map((tag, index) => (
                    <NavLink to={`/tags/${tag}`} className='tag-default tag-pill' key={index}>
                        {tag}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default PopularTags;
