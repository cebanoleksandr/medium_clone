import React, { useEffect, useContext, useState } from 'react';
import { Navigate, NavLink, useParams } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from '../../components/Loading/Loading';
import TagList from '../../components/TagList/TagList';
import useFetch from '../../Hooks/useFetch';
import { CurrentUserContext } from '../../contexts/currentUser';

const Article = () => {
    const params = useParams();
    const apiUrl = `/articles/${params.slug}`;
    const [{
        response: fetchArticleResponse, 
        error: fetchArticleError, 
        isLoading: fetchArticleIsLoading
    }, doFetch] = useFetch(apiUrl);
    const [{response: deleteArticleResponse}, doDeleteArticle] = useFetch(apiUrl);
    const [currentUserState] = useContext(CurrentUserContext);
    const [isSuccessfulDelete, setIsSuccessfulDelete] = useState(false);

    const isAuthor = () => {
        if (!fetchArticleResponse || !currentUserState.isLoggedIn) {
            return false;
        }

        return fetchArticleResponse.article.author.username === currentUserState.currentUser.username;
    }

    const deleteArticle = () => {
        doDeleteArticle({
            method: 'delete',
        })
    }

    useEffect(() => {
        doFetch();
    }, [doFetch])

    useEffect(() => {
        if (!deleteArticleResponse) {
            return;
        }
        setIsSuccessfulDelete(true);
    }, [deleteArticleResponse])

    if (isSuccessfulDelete) {
        return <Navigate to={'/'} />
    }

    return (
        <div className='article-page'>
            <div className='banner'>
                {!fetchArticleIsLoading && fetchArticleResponse && (
                    <div className='container'>
                        <h1>
                            {fetchArticleResponse.article.title}
                        </h1>
                        <div className='article-meta'>
                            <NavLink to={`/profiles/${fetchArticleResponse.article.author.username}`}>
                                <img src={fetchArticleResponse.article.author.image} alt='' /> 
                            </NavLink>
                            <div className='info'>
                                <NavLink to={`/profiles/${fetchArticleResponse.article.author.username}`}>
                                    {fetchArticleResponse.article.author.username}
                                </NavLink>
                                <span className='date'>{fetchArticleResponse.article.createdAt}</span>
                            </div>
                            {isAuthor() && (
                                <span>
                                    <NavLink 
                                        className='btn btn-outline-secondary btn-sm' 
                                        to={`/articles/${fetchArticleResponse.article.slug}/edit`}
                                    >
                                        <i className='ion-edit'></i>
                                        Edit Article
                                    </NavLink>
                                    <button className='btn btn-outline-danger btn-sm' onClick={deleteArticle}>
                                        <i className='ion-trash-a'></i>
                                        Delete article
                                    </button>
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className='container page'>
                {fetchArticleIsLoading && <Loading />}
                {fetchArticleError && <ErrorMessage />}
                {!fetchArticleIsLoading && fetchArticleResponse && (
                    <div className='row article-content'>
                        <div className='col-xs-12'>
                            <div>
                                <p>{fetchArticleResponse.article.body}</p>
                            </div>
                            <TagList tags={fetchArticleResponse.article.tagList} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Article;
