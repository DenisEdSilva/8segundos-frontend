import Router from 'next/router';
import { destroyCookie, setCookie } from 'nookies';
import { createContext, ReactNode } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/apiClient';


type AuthContextProps = {
	signIn: (credentials: SignInProps) => Promise<void>
	signUp: (credentials: SignUpProps) => Promise<void>
	signOut: () => void;
}

type AuthProviderProps = {
	children: ReactNode;
}

type UserProps = {
	id: string,
	name: string,
	email: string,
}

type SignInProps = {
	email: string,
	password: string,
}
type SignUpProps = {
	name: string,
	email: string,
	password: string,
}

type CategoryProps = {
    name: string
}


export const AuthContext = createContext({} as AuthContextProps);

export function signOut() {
	try {
		destroyCookie(undefined, '@techlib.token')
		Router.push('/')

	} catch (error) {
		toast.error("Falha ao deslogar")
		console.log(error)
	}
}

export function AuthProvider({ children }: AuthProviderProps) {


	async function signIn({ email, password }: SignInProps) {
		try {
			const response = await api.post('/users', {
				email,
				password
			})
	
			const { id, name, token } = response.data;
	
			setCookie(undefined, '@techlib.token', token, {
				maxAge: 60 * 60 * 24 * 30,
				Path: '/',
			})
	
			api.defaults.headers['Authorization'] = `Bearer ${token}`
	
			toast.success('Login realizado com sucesso')
	
			// Router.push('/home')

		} catch (error) {
			toast.error('Erro ao acessar')
			console.log(error)
		}

	}

	async function signUp({ name, email, password }: SignUpProps) {
		try {
			const response = await api.post('/users', {
				name, 
				email, 
				password
			})

			toast.success('Cadastro realizado com sucesso')

			Router.push('/')
		} catch (error) {
			toast.error('Erro ao cadastrar')
			console.log(error)
		}
	}


	return(
		<AuthContext.Provider value={{ signIn, signOut, signUp }} >
			{ children }
		</AuthContext.Provider>
	)
}