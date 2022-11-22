import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import UserArticles from "./UserArticles/UserArticles";

const UserProfile = ({isFavorites}) => {
    const params = useParams();
    const apiUrl = `/profiles/${params.slug}`;
    const [{response}, doFetch] = useFetch(apiUrl);
    const url = isFavorites ? `/profiles/${params.slug}/favorites` : `/profiles/${params.slug}`;

    useEffect(() => {
        doFetch();
    }, [doFetch])

    if (!response) {
        return null;
    }

    return (
        <div className="profile-page">
            <div className="user-info">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <img className="user-image" alt="" src={response.profile.image} />
                            <h4>{response.profile.username}</h4>
                            <p>{response.profile.bio}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-10 offset-md-1">
                        <div className="articles-toggle">
                            <ul className='nav nav-pills outline-active'>
                                <li className="nav-item">
                                    <NavLink to={`/profiles/${response.profile.username}`} exact className='nav-link'>
                                        My Posts
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={`/profiles/${response.profile.username}/favorites`} className='nav-link'>
                                        Favorites Posts
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <UserArticles username={response.profile.username} isFavorites={isFavorites} url={url} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;
