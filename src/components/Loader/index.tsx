import { ImSpinner9 } from "react-icons/im";

export const Loader = () => {
    return (
        <>
            <div className="flex justify-center gap-4">
                <p className="italic text-sm"> Buscando usuário... </p>
                <ImSpinner9 className="animate-spin"/>
            </div>
        </>
    )
}