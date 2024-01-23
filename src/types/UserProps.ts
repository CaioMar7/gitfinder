export type UserProps = {
    id: number,
    name: string,
    login: string,
    avatar_url: string,
    followers: number,
    following: number,
    isFavorited?: boolean
}
