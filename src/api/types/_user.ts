// Types for interacting with the `/user/$userID/**/*/` endpoint

import type { Images, ResponsePaging } from "./shared"


//#region `/user/$userID/pulse/`

// POST `/user/$userID/pulse/` Request Body
export type PostUserPulseRequest = {
    // The `location` property is a pathname to the homepage (`"/"`),
    // a game page (`"/games/play/$gameID/"`),
    // or a project page (`"/build/$clientID/project/$projectID/"`)
    // Any other location is treated as the homepage to protect user privacy
    location: string
    status: "active"
}

// POST `/user/$userID/pulse/` Response Body
export type PostUserPulseResponse = {
    // Yes, the response is an empty JSON object
}

//#endregion

//#region `/user/$clientID/friend/**/*/`

// Shared type for `/user/$clientID/friend/**/*/` endpoint
export type FriendRequest = {
    id: number
    friend_status: "pending"
    profile_id: number
    profile_username: string
    friend_profile_id: number
    friend_username: string
    friend_images: Pick<Images, "micro" | "small" | "medium" | "large">
    friend_avatar_id: number
    profile_images: Pick<Images, "micro" | "small" | "medium" | "large">
    profile_avatar_id: number
}

// GET `/user/$userID/friend/requests/` Response Body
export type GetUserFriendRequestsResponse = {
    data: FriendRequest[]
    paging: ResponsePaging
}

// POST `/user/$userID/friend/` Request Body
export type PostUserFriendRequest = {
    user_id: number
}

// POST `/user/$userID/friend/` Response Body
export type PostUserFriendResponse = {
    data: Omit<FriendRequest, "friend_images" | "friend_avatar_id" | "profile_images" | "profile_avatar_id">
        & { is_subscriber: boolean }
}

//#endregion
