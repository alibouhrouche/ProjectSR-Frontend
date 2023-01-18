export interface RegisterRequest {
    codePostal: number
    rue: string
    ville: string
    email: string
    nom: string
    prenom: string
    password: string
}
export interface UserCreate {
    codePostal: number
    rue: string
    ville: string
    email: string
    nom: string
    prenom: string
    password: string
    role: "ADMIN"|"CLIENT"
}
export interface AuthenticationResponse {
    token: string
}
export interface AuthenticationRequest {
    email: string
    password: string
}
export interface Client {
    id: number
    codePostal: number
    rue: string
    ville: string
    email: string
    nom: string
    prenom: string
    role: string
    enabled: boolean
    credentialsNonExpired: boolean
    accountNonExpired: boolean
    accountNonLocked: boolean
    authorities: GrantedAuthority[]
    username: string
    isAdmin: boolean
}
export interface GrantedAuthority {
    authority: string
}
export interface TerrainData {
    id: number
    code: string
    surface: string
    sports: number[]
}
export interface Terrain {
    id: number
    code: string
    surface: string
    sportsNames: string[]
    sports: number[]
}
export interface SportData {
    id: number
    nom: string
    nombreJoueurs: number
    terrains: string[]
}
export interface Sport {
    id: number
    nom: string
    nombreJoueurs: number
    terrains: string[]
}
export interface CarnetUpdate {
    id: string
    nombreEntrees: number
    sport: number
    client: number
}
export interface Carnet {
    id: string
    nombreEntrees: number
    username: string
    sport: number
    client: number
    sportName: string
}
export interface Message {
    id: number
    dateEcriture: string
    message: string
    From: string
}
export interface MessageCreate {
    message: string
}
export interface InnerSport {
    sport: number
    terrain: string
}
export interface CarnetCreate {
    client: number
    sport: number
    nombreEntrees: number
}
