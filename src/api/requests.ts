import { AuthenticatedGetRequest, AuthenticatedPostRequest } from "./fetch"
import type {
    GetChatResponse,
    PostChatRequest, PostChatResponse,
    GetUserFriendRequestsResponse,
    PostUserFriendRequest, PostUserFriendResponse,
    PostUserPulseRequest, PostUserPulseResponse
} from "./types"


export function GetChat(token: string, clientID: number): Promise<GetChatResponse> {
    return AuthenticatedGetRequest(token, `/chat/${clientID}/`)
}

export function PostChat(token: string, clientID: number, body: PostChatRequest): Promise<PostChatResponse> {
    return AuthenticatedPostRequest(token, `/chat/${clientID}/`, body)
}

export function GetUserFriendRequests(token: string, clientID: number, page: number = 1, count: number = 6): Promise<GetUserFriendRequestsResponse> {
    return AuthenticatedGetRequest(token, `/user/${clientID}/friend/requests/?page=${page}&count=${count}`)
}

export function PostUserFriend(token: string, clientID: number, body: PostUserFriendRequest): Promise<PostUserFriendResponse> {
    return AuthenticatedPostRequest(token, `/user/${clientID}/friend/`, body)
}

export function PostUserPulse(token: string, clientID: number, body: PostUserPulseRequest): Promise<PostUserPulseResponse> {
    return AuthenticatedPostRequest(token, `/user/${clientID}/pulse/`, body)
}
