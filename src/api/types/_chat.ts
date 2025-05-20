// Types for interacting with the `/chat/$userID/**/*/` endpoint

//#region Endpoint: `/chat/$userID/`

// Shared type for `/chat/$userID/` endpoint
export type ChatMessage = {
    id: number
    from_profile_id: number
    from_username: string
    to_profile_id: number
    message: string
    created: string
}

// GET `/chat/$userID/` Response Body
export type GetChatResponse = {
    data: { [profileID: string]: ChatMessage[] }
}

// POST `/chat/$userID/` Request Body
export type PostChatRequest = {
    message: string
    to_profile_id: number
}

// POST `/chat/$userID/` Response Body
export type PostChatResponse = {
    data: ChatMessage
    seen_sent: null
    seen_received: null
}

//#endregion
