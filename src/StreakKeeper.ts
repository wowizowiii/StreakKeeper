import responses from "./responses.txt" with { type: "text" }
import {
    GetChat, PostChat,
    GetUserFriendRequests,
    PostUserFriend,
    PostUserPulse
} from "./api/requests"
import { formatMessage, randomEntry } from "./utils"


if (typeof process.env.SESSION_TOKEN !== "string") {
    throw new TypeError("Missing SESSION_TOKEN environment variable")
}

if (typeof process.env.CLIENT_ID !== "string" || isNaN(parseInt(process.env.CLIENT_ID, 10))) {
    throw new TypeError("CLIENT_ID environment variable is not a valid number")
}

if (typeof process.env.USER_AGENT !== "string") {
    console.warn("No USER_AGENT environment variable set")
}

const SESSION_TOKEN = process.env.SESSION_TOKEN
const CLIENT_ID = parseInt(process.env.CLIENT_ID, 10)
const responseList = responses.split('\n').filter(line => line[0] !== '#' && line.trim().length > 0)


async function ProcessChatMessages() {
    // Get a list of newly-active conversations
    const response = await GetChat(SESSION_TOKEN, CLIENT_ID)
    // Go through each conversation in the list
    // We go through conversations rather than messages
    // to avoid spamming the chat in response to a spamming user
    for (const profileID of Object.keys(response.data)) {
        // Get the first message to retrieve response variables
        const userMessage = response.data[profileID][0]
        // Get a random response from the list and substitute the variables with actual values
        const botMessage = formatMessage(randomEntry(responseList), userMessage.from_username, userMessage.from_profile_id)
        // Send a single response per conversation
        await PostChat(SESSION_TOKEN, CLIENT_ID, {
            message: botMessage,
            to_profile_id: parseInt(profileID, 10)
        })
    }
}

async function ProcessFriendRequests() {
    // Retrieve a list of new friend requests
    const response = await GetUserFriendRequests(SESSION_TOKEN, CLIENT_ID)
    // Go through each request in the list
    for (const request of response.data) {
        // Send a friend request back
        // KoGaMa will automatically accept friend requests if one is sent back
        // 
        // The official method requires a PUT request, but last I tried using them (2017),
        // they were finicky and prone to breakage if values were not what the server expected
        // 
        // TODO: look into using PUT requests to accept friend requests
        await PostUserFriend(SESSION_TOKEN, CLIENT_ID, {
            user_id: request.profile_id
        })
    }
}

async function AppearOnline() {
    // Appear active on the website
    PostUserPulse(SESSION_TOKEN, CLIENT_ID, {
        location: "/",
        status: "active"
    })
}

// Process chat messages every five seconds
setInterval(ProcessChatMessages, 5_000)
// Process friend requests every fifteen minutes
setInterval(ProcessFriendRequests, 60_000 * 15)
// Appear online every three minutes
setInterval(AppearOnline, 60_000 * 3)
