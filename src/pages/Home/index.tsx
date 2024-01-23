import { useState} from "react";

import axios from "axios"

import { UserProps } from "../../types/UserProps"

import { Loader } from "../../components/Loader";
import { CardUser } from "../../components/CardUser";
import { SearchInput } from "../../components/SearchInput";

export const Home = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState<UserProps | null>(null)
    const [userNotFound, setUserNotFound ] = useState<boolean | null>(null)


    const handleSearchUser = async(username : string | undefined) => {
        setIsLoading(true)
        setUser(null)
        setUserNotFound(null)
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`)
            const { id, name, login, avatar_url, followers, following } = response.data

            setUser({id, name, login, avatar_url, followers, following})
        } catch(error) {
            setUserNotFound(true)
        }
        setIsLoading(false)
    }

    return (
        <>
        <div className="bg-gray-900 min-h-screen">
            <section className="md:w-4/12 my-0 mx-auto bg-gray-800">
                <div className="flex flex-col gap-6 p-4">
                    <SearchInput loadUser={handleSearchUser}/>
                    {isLoading ? <Loader/> : ""}
                    {user && <CardUser {...user} />}
                    {userNotFound && <h1> Usuário não encontrado </h1>}
                </div>

            </section>
        </div>
        </>
    )
}