# Streak Keeper for KoGaMa

Streak Keeper is an automated KoGaMa account, designed to help players maintain their streaks

> [!NOTE]
> This project uses [Bun](https://bun.sh) as its Javascript runtime. Refer to the official documentation on installing it.

## Features
- Replies to any chat messages sent to it
- Accepts friend requests every 15 minutes
- Appears online on the friends list for easy access
- Customizable responses

## Configuration

The bot requires two environment variables be set: `SESSION_TOKEN` and `CLIENT_ID`.
- `SESSION_TOKEN` is your KoGaMa account's session authentication token, which you can find in your browser's cookies
- `CLIENT_ID` is your KoGaMa account's profile ID, visible in the address bar

Additionally, `USER_AGENT` is an optional (but highly recommended) environment variable, identifying your bot to the KoGaMa server.  
Give your bot an identifier and list some contact information. This allows the KoGaMa admins to contact you if your bot ever breaks and starts spamming their servers.

When using Bun, environment variables are automatically loaded from a file named `.env` at the root of the project directory.  
Simply create this file and follow the format below.

> [!TIP]
> The example below uses a KoGaMa profile URL as contact information, but better details could be provided, such as an email address or even your Discord tag.  
> Additionally, if your project is open source, you could provide a link to the repository.

```ini
SESSION_TOKEN=YOUR-TOKEN-HERE
CLIENT_ID=670350173
USER_AGENT=BotName/1.0 (https://www.kogama.com/profile/670350173/)
```

### Responses

Responses are stored in [`/src/responses.txt`](/src/responses.txt) and follow a basic format.
- `#` at the start of a line denotes a comment and is ignored by the bot, allowing for documentation
- Empty lines are ignored by the bot, allowing for better legibility
- Two variables are available: `$NAME` for the player's username, and `$ID` for the player's profile ID
- Variables can have a modifier in the format `$VARIABLE.modifier`, where `modifier` is one of
    - `l` to transform text to lowercase
    - `u` to transform text to uppercase
    - `f` to format a number with spaces

The example below helps illustrate the above.

```txt
# Because this line starts with #, it'll be ignored
# The line directly below is empty, so it will also be ignored

This line will be used as a response!

This line will show the player their name: $NAME
This line will show the player their profile ID: $ID

This line will have the player's name in UPPERCASE: $NAME.u
# For example, if a player named "Shimimi" messaged, the line would use "SHIMIMI"

This line will have the player's name in lowercase: $NAME.l
# For example, if a player named "Shimimi" messaged, the line would use "shimimi"

This line will have the player's profile ID spaced out: $ID.f
# For example, if a player with an ID of 669312073 messaged, the line would use "669 312 073"
```

## Running

With the above configuration in place, running the project is as simple as:
```bash
bun start
```

Happy streak farming!

## Contributing

Wish to help the project by contributing? Here are a few things that'll be worked on!
- Retrieve the bot's profile ID from the `SESSION_TOKEN`
- Experiment with using PUT requests to accept friend requests
- Expand the list of available API functions and types
    - Look into creating a library for ease-of-use
