import { useRef, KeyboardEvent, useEffect } from "react"

import { FaSearch } from "react-icons/fa";


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
        <div className="flex flex-col items-center gap-2 border-2 p-6 shadow-md">
            <label htmlFor="gituser"> Insira o usuário do GitHub </label>
            <div className="flex gap-2">
                <input autoFocus onKeyDown={handleKeyDown} type="text" ref={userInputRef} name="gituser" placeholder="Usuário do GitHub" id="gituser" className="border-2 border-gray-300 px-1 rounded-md outline-1 outline-gray-400"/> 
                <button onClick={() => loadUser(userInputRef.current?.value)}> <FaSearch /> </button>
            </div>
        </div>
    )
}