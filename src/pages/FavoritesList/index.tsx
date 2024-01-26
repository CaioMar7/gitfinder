import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { IoFilterOutline } from "react-icons/io5";

import axios from "axios"

import { Loader } from "../../components/Loader"
import { FavCard } from "../../components/FavCard"

import { MdOutlineArrowBackIos } from "react-icons/md";


import { UserProps } from "../../types/UserProps"

import {  } from "react";


export function FavoritesList() {

  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()

  //const [sortOption, setSortOption] = useState<string | undefined>(undefined);

  const handleSortChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    //setSortOption(e.target.value)
    //console.log(sortOption)

    setSearchParams({sort: String(e.target.value)})
  };


  const [isLoading, setIsLoading] = useState(false)
  const [favoriteList, setFavoriteList] = useState<UserProps[] | null>(null)
  const [userNotFound, setUserNotFound] = useState<boolean | null>(null)

  const handleBackPage = () => {
    navigate(-1)
  }

  const handleUnFav = (login: string): React.MouseEventHandler<HTMLButtonElement> => {
    return () => {
      setFavoriteList((prevList) => {
        if (prevList) {
          const updatedList = prevList.filter((prev: UserProps) => login !== prev.login);
          return updatedList;
        }
        return prevList;
      });
    };
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

  useEffect(() => {
    let usersLogin: string[] = []

    favoriteList?.map((favUser) => usersLogin.push(favUser.login))
    localStorage.setItem('@Gitfinder-favoriteList', JSON.stringify(usersLogin));

  }, [favoriteList])

  useEffect(() => {

    const sortOption = searchParams.get('sort')

    if(sortOption == "asc") {
      const sortedList = favoriteList?.sort((a,b) => {
        return b.name.localeCompare(a.name)
      })
      if(sortedList) {
        setFavoriteList(sortedList)
      }
    }

    if(sortOption == "desc") {
      const sortedList = favoriteList?.sort((a,b) => {
        return a.name.localeCompare(b.name)
      })
      if(sortedList) {
        setFavoriteList(sortedList)
      }
    }

  }, [searchParams])

  return (
    <>
      <div className="bg-gray-900">
        <section className="md:w-4/12 my-0 mx-auto shadow-md bg-gray-800 max-h-screen min-h-screen overflow-y-auto">
          <div className="flex flex-col gap-6 p-4">
            <h1 className="font-bold text-3xl text-white flex items-center gap-4"> <button onClick={handleBackPage}> <MdOutlineArrowBackIos /> </button> Lista de usuários favoritos </h1>
            {isLoading ? <Loader /> : ""}
            {userNotFound && <h1> Usuário não encontrado </h1>}
            <div className="flex flex-col items-center justify-end gap-2 text-white p-4">
              <div className="w-full flex items-center justify-end gap-2 text-white">
                <span> Filter</span>
                <IoFilterOutline />
              </div>
              <div className="w-full flex items-center justify-end gap-2 text-white">
                <select className="relative text-black" onChange={handleSortChange}>
                  <option value="none"></option>
                  <option value="asc">A-Z</option>
                  <option value="desc">Z-A</option>
                </select>
              </div>
            </div>
            <ul className="flex flex-col gap-6 p-4 overflow-y-auto">
              {favoriteList?.map((favUser) =>
                <FavCard key={favUser.id} data={favUser} unFavUser={handleUnFav(favUser.login)} />
              )}
            </ul>
          </div>
        </section>
      </div>
    </>
  )
}