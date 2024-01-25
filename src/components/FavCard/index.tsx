import { MouseEventHandler } from "react";

import { UserProps } from "../../types/UserProps"

import { MdFavorite } from "react-icons/md";

type FavCardProps = {
    data: UserProps,
    unFavUser: MouseEventHandler<HTMLButtonElement>;
}

export const FavCard : React.FC<FavCardProps> = ({data, unFavUser} : FavCardProps) => {

    return (
        <>
            <li className="w-full flex items-center gap-4 border-x-2 p-2 relative">
                <div className="w-20">
                    <img src={data.avatar_url} className="rounded-full" />
                </div>
                <div className="flex flex-col flex-1">
                    <h2 className="text-gray-100"> {data.name} </h2>
                    <a className="text-gray-400" href={`/${data.login}`}> Ver melhores repositórios </a>
                </div>
                <button className="justify-self-end" onClick={unFavUser}>
                    <span className="text-3xl text-white"> <MdFavorite/> </span>
                </button>
            </li>
        </>
    )
}
