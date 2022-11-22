import { stringify } from "query-string";
import React, {useEffect, useState} from "react";
import {limit} from '../../../utils';
import useFetch from "../../../Hooks/useFetch";
import Loading from "../../../components/Loading/Loading";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import Feed from "../../../components/Feed/Feed";
import Pagination from "../../../components/Pagination/Pagination";

const getApiUrl = ({username, offset, isFavorites}) => {{
    const params = isFavorites
        ? {limit, offset, favorited: username}
        : {limit, offset, author: username}

    return `/articles?${stringify(params)}`;
}}

const UserArticles = ({username, isFavorites, url}) => {
    let [currentPage, setCurrentPage] = useState(1);
    const offset = currentPage * limit - limit;
    const apiUrl = getApiUrl({
        username,
        offset,
        isFavorites
    });
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl);

    useEffect(() => {
        doFetch();
    }, [doFetch, isFavorites])

    return (
        <div>
            {isLoading && <Loading />}
            {error && <ErrorMessage />}
            {!isLoading && response && (
                <>
                    <Feed articles={response.articles} />
                    <Pagination total={response.articlesCount} limit={limit} url={url} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </>
            )}
        </div>
    )
}

export default UserArticles;
