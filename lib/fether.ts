import axios, { AxiosResponse } from 'axios'
export type QueryResponse<T> = [error: string | null, data: T | null]
import { getError } from './error'
import { AxiosError } from 'axios'

export const refreshTokens = async () => {
    await axios.post(`https://itchy-houses-production.up.railway.app/auth/refresh`, undefined, { withCredentials: true })
}


const handleRequest = async (request: () => Promise<AxiosResponse>): Promise<AxiosResponse> => {
    try {
        return await request()
    } catch (err: any) {
        if (err instanceof AxiosError) {
            if (err.response?.status === 401) {
                try {
                    await refreshTokens()
                    return await request()
                } catch (innerError:any) {
                    throw getError(innerError)
                }

            }
        }

        throw getError(err)
    }
}

export const fetcher = async <T>(url: string): Promise<QueryResponse<T>> => {
    try {
        const request = () => axios.get(url, { withCredentials: true })
        const { data } = await handleRequest(request)
        return [null, data]
    } catch (error: any) {
        return [error, null]
    }
}
