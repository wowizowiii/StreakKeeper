const BASE_URL = "https://www.kogama.com"
const USER_AGENT = process.env.USER_AGENT ?? navigator.userAgent


export async function AuthenticatedGetRequest<T>(token: string, endpoint: string): Promise<T> {
    const response = await fetch(BASE_URL + endpoint, {
        method: "GET",
        headers: {
            "Cookie": "session=" + token,
            "User-Agent": USER_AGENT,
        }
    })

    const responseBody = await response.json() as T

    return responseBody
}

export async function AuthenticatedPostRequest<T, U>(token: string, endpoint: string, payload: T): Promise<U> {
    const response = await fetch(BASE_URL + endpoint, {
        method: "POST",
        headers: {
            "Cookie": "session=" + token,
            "Content-Type": "application/json;charset=utf-8",
            "User-Agent": USER_AGENT,
        },
        body: JSON.stringify(payload)
    })

    const responseBody = await response.json() as U

    return responseBody
}
