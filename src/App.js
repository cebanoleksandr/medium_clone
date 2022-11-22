import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TopBar from "./components/topBar/TopBar";
import Article from "./Pages/Article/Article";
import Authentification from "./Pages/Authentification/Authentification";
import GlobalFeed from "./Pages/GlobalFeed/GlobalFeed";
import { CurrentUserProvider } from './contexts/currentUser';
import CurrentUserChecker from "./components/topBar/CurrentUserChecker/CurrentUserChecker";
import TagFeed from "./Pages/TagFeed/TagFeed";
import YourFeed from "./components/YourFeed/YourFeed";
import CreateArticle from "./Pages/CreateArticle/CreateArticle";
import EditArticle from './Pages/EditArticle/EditArticle';
import Settings from "./Pages/Settings/Settings";
import UserProfile from "./Pages/UserProfile/UserProfile";

function App() {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <BrowserRouter>
          <div className="App">
            <TopBar />

            <Routes>
              <Route path="/" element={<GlobalFeed />} />
              <Route path="/profiles/:slug" element={<UserProfile isFavorites={false} />} />
              <Route path="/profiles/:slug/favorites" element={<UserProfile isFavorites={true} />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/articles/new" element={<CreateArticle />} />
              <Route path="/articles/:slug/edit" element={<EditArticle />} />
              <Route path="/tags/:slug" element={<TagFeed />} />
              <Route path="/feed" element={<YourFeed />} />
              <Route path="/articles/:slug" element={<Article />} />
              <Route path="/login" element={<Authentification matchPath='/login' />} />
              <Route path="/register" element={<Authentification matchPath='/register' />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
}

export default App;
