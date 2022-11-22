import React from "react";
import useFetch from "../../../Hooks/useFetch";

const AddToFavorites = ({isFavorited, favoritesCount, articleSlug}) => {
    const apiUrl = `/articles/${articleSlug}/favorite`;
    const [{response}, doFetch] = useFetch(apiUrl);
    const favoritesCountWithResponse = response ? response.article.favoritesCount : favoritesCount;
    const isFavoritedWithResponse = response ? response.article.favorited : isFavorited;
    const cls = [
        'btn',
        'btn-sm',
        isFavoritedWithResponse ? 'btn-primary' : 'btn-outline-primary'
    ];

    const handleLike = (e) => {
        e.preventDefault();
        doFetch({
            method: isFavoritedWithResponse ? 'delete' : 'post',
        })
    }

    return (
        <button className={cls.join(' ')} onClick={handleLike}>
            <i className="ion-heart"></i>
            <span>&nbsp; {favoritesCountWithResponse}</span>
        </button>
    )
}

export default AddToFavorites;
