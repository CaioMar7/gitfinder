import { MdFavorite, MdFavoriteBorder  } from "react-icons/md";

import { FaEye } from "react-icons/fa";

import { Link } from "react-router-dom";

import { UserProps } from "../../types/UserProps";
import { useState, useEffect } from "react";

export const CardUser = ({id, name, login, avatar_url, followers, following} : UserProps) => {

    const [ favoriteList, setFavoriteList ] = useState<string[]>([])
    const isFavorited = favoriteList.includes(login)

    const handleFavoriteUser = ( ) => {
        setFavoriteList((prevList) => {
            if (!prevList.includes(login)) {
                return [...prevList, login];
            } else {
                return prevList.filter(userLogin => userLogin !== login);
            }
        });
    }

    useEffect(() => {
        const storedFavoriteList = localStorage.getItem('@Gitfinder-favoriteList');
        const parsedList = storedFavoriteList ? JSON.parse(storedFavoriteList) : [];      
        
        setFavoriteList(parsedList)
    }, []);

    useEffect(() => {
        if(favoriteList.length > 0) {
            localStorage.setItem('@Gitfinder-favoriteList', JSON.stringify(favoriteList));
        }
    }, [favoriteList]);
 
    return (
        <div className={`flex flex-col items-center gap-2 border-2 p-6 relative shadow-md ${isFavorited ? "border-black border-dashed" : "border-gray-900"}`}>
            <div className="flex flex-col justify-center items-center gap-2">
                <img className={`rounded-full`} src={avatar_url} alt={`Imagem do usuário ${name}`}/>
                <span className="italic text-sm"> Id. {id}</span>
                <span className="font-bold text-2xl"> {name} </span>
                <div className="flex gap-2">
                    <span className="bg-gray-600 py-2 px-4 font-bold text-white"> Following {following} </span>
                    <span className="bg-gray-600 py-2 px-4 font-bold text-white"> Followers {followers} </span>
                </div>
                <div className="absolute top-4 -right-3 md:right-4 text-2xl md:text-5xl"> 

                    <button onClick={handleFavoriteUser} className="flex flex-col items-center w-24">

                        {
                            favoriteList.includes(login) 
                            ? 
                            <>  
                                <MdFavorite/>
                                <span className="text-xs italic text-gray-200"> Remove to favorites </span>
                            </>
                            :
                            <>
                                <MdFavoriteBorder/>
                                <span className="text-xs italic text-gray-200">  Add to favorites </span>
                            </>
                        }

                    </button>
                </div>

                <Link to={`/${login}`} className="flex items-center justify-center gap-2 bg-gray-600 py-2 px-4 font-bold text-white text-xl"> <FaEye/> Ver melhores repos </Link>
            </div>
        </div>
        
    )
}