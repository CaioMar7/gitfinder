import { useState, useRef, useEffect } from "react";
import axios from "axios"

import { MdSavedSearch } from "react-icons/md";
import { ImSpinner9 } from "react-icons/im";

interface UserInfos {
    name: string,
    avatar_url: string,
    followers: number,
    following: number,
    isFavorited?: boolean
}


export const Home = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<UserInfos>()
    const userInputRef = useRef<HTMLInputElement | null>(null)

    const handleSearchUser = async() => {
        try {
            const response = await axios.get(`https://api.github.com/users/${userInputRef.current?.value}`)
            const { name, avatar_url, followers, following } = response.data

            setUser({name, avatar_url, followers, following})
            setIsLoading(false)
        } catch(error) {
            console.error(error)
        }
    }

    useEffect( () => {
        console.log(user)
    }, [user])

    return (
        <>
            <section className="md:w-4/12 my-0 mx-auto">
                <div className="flex flex-col gap-6 p-4">
                    <div className="flex flex-col items-center gap-2 border-2 p-6">
                        <label htmlFor="gituser"> Insira o usuário do GitHub </label>
                        <div className="flex gap-2">
                            <input type="text" ref={userInputRef} name="gituser" placeholder="Usuário do GitHub" id="gituser" className="border-2 border-gray-300 px-1 rounded-md outline-1 outline-gray-400"/> 
                            <button onClick={handleSearchUser} className="text-2xl text-gray-400">
                                <MdSavedSearch/>
                            </button>
                        </div>
                    </div>


                    {
                        isLoading 
                        ? 
                            <div className="flex justify-center items-center gap-4">
                                <p className="italic text-sm"> Buscando usuário... </p>
                                <ImSpinner9 className="animate-spin"/>
                            </div>
                        : 
                        <div className="flex flex-col items-center border-2 rounded-md p-6">
                            <span> {user?.avatar_url}</span>
                            <h1> Seguidores </h1>
                            <h1> Nome do Usuário </h1>
                            <span> {user?.name}</span>
                            <h1> Foto do usuário </h1>
                            <span> {user?.followers}</span>
                            <h1> Seguindo </h1>
                            <span> {user?.following}</span>
                            <h1> Adicionar como favorito </h1>
                            <span> {user?.isFavorited}</span>
                        </div>
                    }
               
                </div>

            </section>
        </>
    )
}