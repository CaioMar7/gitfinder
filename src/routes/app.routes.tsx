import { Routes, Route} from "react-router-dom";
import { Home } from "../pages/Home";
import { UserReposDetail } from "../pages/UserReposDetail";
import { FavoritesList } from "../pages/FavoritesList";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/:username" element={<UserReposDetail/>}/>
            <Route path="/favoriteslist" element={<FavoritesList/>}/>
        </Routes>
    )
}