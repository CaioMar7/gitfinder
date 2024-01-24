import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import axios from "axios"

import { MdOutlineArrowBackIos } from "react-icons/md";

import { UserReposProps } from "../../types/UserReposProps"

import { Loader } from "../../components/Loader"
import { RepoCard } from "../../components/RepoCard";


export function UserReposDetail() {

    const navigate = useNavigate()

    const { username } = useParams()

    
    const [isLoading, setIsLoading] = useState(false)
    const [userRepos, setUserRepos] = useState<UserReposProps[] | null>(null)
    const [userNotFound, setUserNotFound ] = useState<boolean | null>(null)

    const handleBackPage = () => {
        navigate(-1)
    }


    const handleSearchUser = async(username : string | undefined) => {
        setIsLoading(true)
        setUserRepos(null)
        setUserNotFound(null)

        try {
            const response = await axios.get(`https://api.github.com/users/${username}/repos`)

            const repositories = response.data.map((repo: UserReposProps) => (
                {
                id: repo.id,
                created_at: repo.created_at,
                full_name: repo.full_name,
                svn_url: repo.svn_url,
                language: repo.language
              }));

              console.log(response)
          
              setUserRepos((prevRepos) => (prevRepos ? [...repositories] : repositories));

        } catch(error) {
            setUserNotFound(true)
        }
        setIsLoading(false)
    }

    useEffect( () => {
        handleSearchUser(username)  

        console.log(userRepos)

    },[])

    

    return (
        <>
            <div className="bg-gray-900">

            <section className="md:w-4/12 my-0 mx-auto shadow-md bg-gray-800 max-h-screen min-h-screen overflow-y-auto">
                <div className="flex flex-col gap-6 p-4">
                    <h1 className="font-bold text-3xl text-white flex items-center gap-4"> <button onClick={handleBackPage}> <MdOutlineArrowBackIos/> </button> Melhores repositórios de {username} </h1>
                    {isLoading ? <Loader/> : ""}
                    {userNotFound && <h1> Usuário não encontrado </h1>}

                    <ul className="flex flex-col gap-4 p-4 overflow-y-auto">
                        {userRepos?.map((repo) =>     
                            <RepoCard data={repo} />
                        )}
                    </ul>
                    
                </div>
            </section>
            </div>
        </>
    )
}