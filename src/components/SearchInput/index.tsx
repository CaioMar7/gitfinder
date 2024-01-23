import { useRef, KeyboardEvent, useEffect } from "react"

import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

import { MdFavorite } from "react-icons/md";



type SearchProps = {
    loadUser: (userName: string | undefined) => Promise<void>
}

export const SearchInput = ({loadUser} : SearchProps) => {
    const userInputRef = useRef<HTMLInputElement | null>(null)

    const handleKeyDown = (e:KeyboardEvent) => {
        if(e.key === "Enter") {
            loadUser(userInputRef.current?.value)
        }
        
    }

    useEffect( () => {
        userInputRef.current?.focus
    }, [])

    return (
        <div className="flex flex-col items-center gap-2 border-2 border-gray-900 p-6 shadow-md">
            <label htmlFor="gituser" className="text-white"> Insira o usuário do GitHub </label>
            <div className="flex gap-2">
                <input autoFocus onKeyDown={handleKeyDown} type="text" ref={userInputRef} name="gituser" placeholder="Usuário do GitHub" id="gituser" className="border-2 border-gray-200 px-1 rounded-md outline-1 outline-gray-200"/> 
                <button onClick={() => loadUser(userInputRef.current?.value)}> <FaSearch /> </button>
            </div>
            <Link to="/favoriteslist" className="bg-gray-500 py-2 px-6 text-white flex items-center gap-2"> <MdFavorite/> Ver lista de favoritos </Link>
        </div>
    )
}