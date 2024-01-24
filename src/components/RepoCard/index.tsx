import { UserReposProps } from "../../types/UserReposProps";


import { SiTypescript } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io";

type RepoCardProps = {
    data: UserReposProps,
}

export const RepoCard : React.FC<RepoCardProps> = ({data} : RepoCardProps) => {

    const getLangIcon = (lang : string ) => {
        if (lang == "TypeScript") {
            return <SiTypescript/>
        }
        if (lang == "JavaScript") {
            return <IoLogoJavascript/>
        }
    }

    return (
        <>
            <li key={data.id} className="w-full flex flex-col border-x-2 p-2 relative">
                <h2 className="text-gray-100"> {data.full_name} </h2>
                <span className=" absolute top-1 right-4 text-gray-100"> {getLangIcon(data.language)} </span>
                <a className="text-gray-400" href={data.svn_url}> Ver repositório no GitHub </a>
            </li >
        </>
    )
}