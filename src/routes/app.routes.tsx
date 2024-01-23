import { Routes, Route} from "react-router-dom";
import { Home } from "../pages/Home";
import { UserReposDetail } from "../pages/UserReposDetail";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/:username" element={<UserReposDetail/>}/>
        </Routes>
    )
}