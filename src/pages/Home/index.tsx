import { MdSavedSearch } from "react-icons/md";

export const Home = () => {
    return (
        <>
            <section className="md:w-6/12 my-0 mx-auto">
                <div>
                    <div className="flex flex-col items-center gap-2 border-2 border-yellow-500">
                        <label htmlFor="gituser"> Insira o usuário do GitHub </label>
                        <div className="flex gap-2">
                            <input type="text" name="gituser" id="gituser" className="border-2 border-gray-300 px-1 rounded-md outline-1 outline-gray-400"/> 
                            <button>
                                <MdSavedSearch/>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col items-center border-2 border-red-500">
                        <h1> Nome do Usuário </h1>
                        <h1> Foto do usuário </h1>
                        <h1> Seguidores </h1>
                        <h1> Seguindo </h1>
                        <h1> Adicionar como favorito </h1>
                    </div>
                </div>

            </section>
        </>
    )
}