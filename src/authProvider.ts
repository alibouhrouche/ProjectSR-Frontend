import { AuthProvider } from "@pankod/refine-core";
import { auth, registerUser } from "Auth";
import { RegisterRequest } from "interfaces";
import md5 from "md5";
import { getJSON } from "utils";

export const TOKEN_KEY = "user-auth";
export const ROLE_KEY = "user-role";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    if (email && password) {
      const { token } = await auth(email,password)
      let role = JSON.parse(atob(token.split(".")?.[1]))?.Role
      if(Array.isArray(role))
        role = role.map(x => x?.["authority"])
      localStorage.setItem(TOKEN_KEY, token)
      localStorage.setItem(ROLE_KEY, JSON.stringify(role))
      return Promise.resolve();
    }
    return Promise.reject(new Error("Wrong email or password"));
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const role = localStorage.getItem(ROLE_KEY);
    if (token && role) {
      return Promise.resolve();
    }

    return Promise.reject();
  },
  getPermissions: () => Promise.resolve(),
  getUserIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return Promise.reject();
    }
    const data = await getJSON<{
      nom: string,
      prenom: string,
      email: string
    }>(`auth/currentUser`)
    return Promise.resolve({
      name: `${data.prenom} ${data.nom}`,
      avatar: `https://www.gravatar.com/avatar/${md5(data.email)}?d=mp`
    });
  },
  async register({email,password,codePostal,nom,prenom,rue,ville}:RegisterRequest) {
      if (email && password && codePostal && nom && prenom && rue && ville) {
        const { token } = await registerUser({
          email,
          password,
          codePostal,
          nom,
          prenom,
          rue,
          ville
        })
        let role = JSON.parse(atob(token.split(".")?.[1]))?.Role
        if(Array.isArray(role))
          role = role.map(x => x?.["authority"])
        localStorage.setItem(TOKEN_KEY, token)
        localStorage.setItem(ROLE_KEY, JSON.stringify(role))
        return Promise.resolve();
      }
      return Promise.reject("Unable To Register")
  },
};
