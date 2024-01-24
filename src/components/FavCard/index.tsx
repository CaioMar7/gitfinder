import { UserProps } from "../../types/UserProps"

type FavCardProps = {
    data: UserProps
}

export const FavCard : React.FC<FavCardProps> = ({data} : FavCardProps) => {

    return (
        <>
            <li key={data.id} className="w-full flex items-center gap-4 border-x-2 p-2 relative">
                <div className="w-20">
                    <img src={data.avatar_url} className="rounded-full" />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-gray-100"> {data.name} </h2>
                    <a className="text-gray-400" href={`/${data.login}`}> Ver melhores repositórios </a>
                </div>
            </li>
        </>
    )
}