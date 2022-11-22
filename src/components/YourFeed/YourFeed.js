import React, { useEffect, useState } from 'react';
import useFetch from '../../Hooks/useFetch'
import Feed from '../../components/Feed/Feed';
import Pagination from '../../components/Pagination/Pagination';
import PopularTags from '../../components/PopularTags/PopularTags';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import FeedToggler from '../../components/FeedToggler/FeedToggler';
import { limit } from '../../utils';

const YourFeed = () => {
    let [currentPage, setCurrentPage] = useState(1);
    const offset = currentPage * limit - limit;
    
    const apiUrl = `/articles/feed?limit=${limit}&offset=${offset}`;
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl);

    useEffect(() => {
        doFetch();
    }, [doFetch, currentPage])

    return (
        <div className='home-page'>
            <div className='banner'>
                <div className='container'>
                    <h1>Medium clone</h1>
                    <p>A place to share knowledge</p>
                </div>
            </div>
            <div className='container page'>
                <div className='row'>
                    <div className='col-md-9'>
                        <FeedToggler />
                        {isLoading && <Loading />}
                        {error && <ErrorMessage />}
                        {!isLoading && response && (
                            <>
                                <Feed articles={response.articles} />
                                <Pagination total={response.articlesCount} limit={limit} url={'/'} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                            </>
                        )}
                    </div>
                    <div className='col-md-3'>
                        <PopularTags />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YourFeed;
