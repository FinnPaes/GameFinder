export default defineEventHandler(async (event) => {
    const body = await useBody(event);

    const TwitchClientID = useRuntimeConfig().TWITCH_CLIENT_ID;
    const TwitchClientSecret = useRuntimeConfig().TWITCH_CLIENT_SECRET;

    // Get bearer token from Twitch
    let BearerToken;
    await $fetch(`https://id.twitch.tv/oauth2/token?client_id=${TwitchClientID}&client_secret=${TwitchClientSecret}&grant_type=client_credentials`, {
        method: "POST",
    }).then((response) => {
        BearerToken = response.access_token;
    })


    // Get all games with search term
    let GameData;
    await $fetch(`https://api.igdb.com/v4/games`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${BearerToken}`,
            "Client-ID": TwitchClientID
        },
        body: `fields name, cover.*, slug; search "${body.query}";`
    }).then((response) => {
        GameData = response;
    })



    return GameData;
})