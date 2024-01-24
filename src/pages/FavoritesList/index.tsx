import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import axios from "axios"

import { Loader } from "../../components/Loader"
import { FavCard } from "../../components/FavCard"

import { MdOutlineArrowBackIos } from "react-icons/md";


import { UserProps } from "../../types/UserProps"

export function FavoritesList() {

    const navigate = useNavigate()
 
    const [isLoading, setIsLoading] = useState(false)
    const [favoriteList, setFavoriteList] = useState<UserProps[] | null>(null)
    const [userNotFound, setUserNotFound ] = useState<boolean | null>(null)

    const handleBackPage = () => {
        navigate(-1)
    }

    useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true);
          setUserNotFound(null);
      
          try {
            const storedFavoriteList = localStorage.getItem('@Gitfinder-favoriteList');
            const parsedList = storedFavoriteList ? JSON.parse(storedFavoriteList) : [];
      
            const promises = parsedList.map(async (favoritedUser: string) => {
              try {
                const response = await axios.get(`https://api.github.com/users/${favoritedUser}`);
                const { id, name, login, avatar_url, followers, following } = response.data;
                
                return { id, name, login, avatar_url, followers, following };
              } catch (error) {
                console.error(`Erro ao buscar dados para ${favoritedUser}:`, error);
                return null;
              }
            });
      
            const userList = await Promise.all(promises);
            setFavoriteList(userList.filter((user) => user !== null) as UserProps[]);
          } catch (error) {
            setUserNotFound(true);
          } finally {
            setIsLoading(false);
          }
        };
      
        fetchData();
      }, [])

    return (
        <>
            <div className="bg-gray-900">
                <section className="md:w-4/12 my-0 mx-auto shadow-md bg-gray-800 max-h-screen min-h-screen overflow-y-auto">
                    <div className="flex flex-col gap-6 p-4">
                        <h1 className="font-bold text-3xl text-white flex items-center gap-4"> <button onClick={handleBackPage}> <MdOutlineArrowBackIos/> </button> Lista de usuários favoritos </h1>
                        {isLoading ? <Loader/> : ""}
                        {userNotFound && <h1> Usuário não encontrado </h1>}

                        <ul className="flex flex-col gap-6 p-4 overflow-y-auto">
                            {favoriteList?.map((favUser) => 
                              <FavCard data={favUser}/>
                            )}
                        </ul> 
                    </div>
                </section>
            </div>
    </>
    )
}