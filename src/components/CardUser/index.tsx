import { FaRegStar, FaStar } from "react-icons/fa";

import { Link } from "react-router-dom";

import { UserProps } from "../../types/UserProps";

export const CardUser = ({id, name, avatar_url, followers, following} : UserProps) => {
    return (
        <div className="flex flex-col items-center gap-2 border-2 p-6">
            <div className="flex flex-col justify-center items-center gap-2">
                <img className="rounded-full" src={avatar_url} alt={`Imagem do usuário ${name}`}/>
                <span className="italic text-sm"> Id. {id}</span>
                <span className="font-bold text-2xl"> {name} </span>
                <div className="flex gap-2">
                    <span className="bg-gray-600 p-2 font-bold text-white"> Following {following} </span>
                    <span className="bg-gray-600 p-2 font-bold text-white"> Followers {followers} </span>
                </div>
                <div> 
                    <FaRegStar/>
                    <FaStar/>
                </div>

                <Link to="/"> Ver seus melhores repos </Link>
            </div>
        </div>
        
    )
}