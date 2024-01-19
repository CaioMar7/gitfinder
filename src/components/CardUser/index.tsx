import { FaRegStar, FaStar } from "react-icons/fa";

import { Link } from "react-router-dom";

import { UserProps } from "../../types/UserProps";
import { useState, useEffect } from "react";

export const CardUser = ({id, name, avatar_url, followers, following} : UserProps) => {

    const [ favoriteList, setFavoriteList ] = useState<number[]>([])
    const isFavorited = favoriteList.includes(id)

    const handleFavoriteUser = ( ) => {
        setFavoriteList((prevList) => {
            if (!prevList.includes(id)) {
                return [...prevList, id];
            } else {
                return prevList.filter(userId => userId !== id);
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
        <div className={`flex flex-col items-center gap-2 border-2 p-6 relative shadow-md ${isFavorited ? "border-black border-dashed" : ""}`}>
            <div className="flex flex-col justify-center items-center gap-2">
                <img className={`rounded-full`} src={avatar_url} alt={`Imagem do usuário ${name}`}/>
                <span className="italic text-sm"> Id. {id}</span>
                <span className="font-bold text-2xl"> {name} </span>
                <div className="flex gap-2">
                    <span className="bg-gray-600 p-2 font-bold text-white"> Following {following} </span>
                    <span className="bg-gray-600 p-2 font-bold text-white"> Followers {followers} </span>
                </div>
                <div className="absolute top-4 -right-3 md:right-4 text-2xl md:text-5xl"> 

                    <button onClick={handleFavoriteUser} className="flex flex-col items-center w-24">

                        {
                            favoriteList.includes(id) 
                            ? 
                            <>  
                                <FaStar/>
                                <span className="text-xs italic"> Remove to favorites </span>
                            </>
                            :
                            <>
                                <FaRegStar/>
                                <span className="text-xs italic">  Add to favorites </span>
                            </>
                        }

                    </button>
                </div>

                <Link to="/"> Ver seus melhores repos </Link>
            </div>
        </div>
        
    )
}