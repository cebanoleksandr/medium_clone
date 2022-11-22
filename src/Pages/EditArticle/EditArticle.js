import React, { useEffect, useState, useContext } from "react";
import ArticleForm from "../Article/ArticleForm/ArticleForm";
import useFetch from "../../Hooks/useFetch";
import { Navigate, useParams } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/currentUser";

const EditArticle = () => {
    const params = useParams();
    const [currentUserState] = useContext(CurrentUserContext);
    const apiUrl = `/articles/${params.slug}`;
    const [{response: fetchArticleResponse}, doFetchArticle] = useFetch(apiUrl);
    const [{response: updateArticleResponse, error: updateArticleError}, doUpdateArticle] = useFetch(apiUrl);

    const [initialValues, setInitialValues] = useState(null);
    const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);

    const handleSubmit = (article) => {
        doUpdateArticle({
            method: 'put',
            data: {
                article,
            }
        });
    }

    useEffect(() => {
        doFetchArticle();
    }, [doFetchArticle])

    useEffect(() => {
        if (!fetchArticleResponse) {
            return;
        }
        setInitialValues({
            title: fetchArticleResponse.article.title,
            description: fetchArticleResponse.article.description,
            body: fetchArticleResponse.article.body,
            tagList: fetchArticleResponse.article.tagList,
        });
    }, [fetchArticleResponse])

    useEffect(() => {
        if (!updateArticleResponse) {
            return;
        }

        setIsSuccessfulSubmit(true);
    }, [updateArticleResponse])

    if (currentUserState.isLoggedIn === false) {
        return <Navigate to='/' />
    }

    if (isSuccessfulSubmit) {
        return <Navigate to={`/articles/${params.slug}`} />
    }

    return (
        <ArticleForm 
            onSubmit={handleSubmit}
            errors={(updateArticleError && updateArticleError.errors) || {}}
            initialValues={initialValues}
        />
    )
}

export default EditArticle;
