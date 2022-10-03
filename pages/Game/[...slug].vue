<template>
    <section class="main">
        <!-- Game data -->
        <div
            v-if="gameData"
            class="game-wrapper"
        >
            <nuxt-link to="/" class="go-back"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M109.3 288L480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288z"/></svg> Terug</nuxt-link>
            <div class="introduction">
                <div>
                    <img :src="gameCover()" width="180" height="240" :alt="gameData.name">
                </div>
                <div>
                    <!-- Title & Description -->
                    <h1>{{ gameData.name }}</h1>
                    <p>{{ gameData.summary }}</p>

                    <!-- Genres -->
                    <div class="genres">
                        <div v-for="(value, index) in gameData.genres" :key="index" class="genre">{{ value.name }}</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Not found -->
        <div
            v-else
            class="not-found"
        >
            <h1>Game niet gevonden!</h1>
        </div>
    </section>
</template>

<style scoped>
.main {
    width: 100%;
    min-height: 100vh;
    padding: 50px;
    background-color: var(--background);
}

.game-wrapper {
    width: 100%;
    background-color: #FAF4D3;
    padding: 10px;
    border-radius: 10px;
}

/* Introduction/top */
.go-back {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-weight: 600;
    text-decoration: none;
    color: var(--black);
}
.go-back svg {
    margin-right: 10px;
}

.game-wrapper .introduction {
    display: flex;
}
.game-wrapper .introduction img {
    border-radius: 5px;
    margin-right: 30px;
}

.game-wrapper .introduction h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--black);
    margin-bottom: 10px;
}

.game-wrapper .introduction p {
    font-size: 1rem;
    font-weight: 400;
    line-height: 21px;
}

.game-wrapper .introduction .genres {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    margin-top: 20px;
}

.game-wrapper .introduction .genres .genre {
    background-color: #005377;
    font-size: 1rem;
    font-weight: 300;
    color: var(--white);
    padding: 5px 10px;
    border-radius: 10px;
    margin-right: 10px;
}

/* Not found styling */
.not-found {
    width: 100%;
}

.not-found h1 {
    font-size: 3rem;
    text-align: center;
    color: #FAF4D3;
}

/* Media queries */
@media only screen and (max-width: 888px) {
    .game-wrapper .introduction {
        flex-direction: column;
    }
    .game-wrapper .introduction h1 {
        margin-top: 30px;
    }
}
</style>

<script>
export default {
    async setup() {
        const gameSlug = useRoute().params.slug[0];
        let gameData = null;
        await $fetch(`/api/game`, {
            method: "POST",
            body: {
                gameSlug: gameSlug
            }
        })
        .then((response) => {
            if (response[0]) {
                gameData = response[0];
            }
        })
        .catch((error) => {
            console.log(error);
        })

        useHead({
            title: gameData.name
        })

        return {
            gameData
        }
    },

    methods: {
        gameCover() {
            if (this.gameData.cover) {
                return this.gameData.cover.url.replace("t_thumb", "t_cover_small_2x");
            } else {
                return "/images/placeholder.png";
            }
        }
    }
}
</script>