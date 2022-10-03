<template>
    <section class="main">
        <h1>Zoek je game!</h1>
        <p class="description">Wil jij alle informatie over een game? Zoek hieronder de game via de naam op waar je informatie van wilt hebben, voer minimaal 3 karakters in.</p>

        <input type="text" placeholder="GTA V" :class="{ 'rounded-input':Object.keys(searchResults).length||searching }" @input="searchGame()" v-model="searchInput">
        <div class="results-wrapper" v-if="Object.keys(searchResults).length > 0 || searching">
            <nuxt-link
                v-for="(value, index) in searchResults"
                :key="index"
                :to="`/game/${value.slug}`"
            >
                <img :src="value.cover.url" width="50" height="50" alt="" v-if="value.cover">
                <img src="/images/placeholder.png" width="50" height="50" alt="" v-else>
                <span>{{ value.name }}</span>
            </nuxt-link>
            <p v-if="Object.keys(searchResults).length < 1 && !searching" class="no-results">Geen resultaten gevonden...</p>
            <p v-if="searching" class="no-results">Zoeken...</p>
        </div>
    </section>
</template>

<style scoped>
/* Main styling */
.main {
    width: 100%;
    min-height: 100vh;
    padding: 50px;
    background-color: var(--background);
}

.main h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 30px;
    text-align: center;
    color: #FAF4D3;
}

.main .description {
    font-size: 1.3rem;
    line-height: 24px;
    font-weight: 300;
    text-align: center;
    margin-bottom: 50px;
    color: #FAF4D3;
}

.main input[type="text"] {
    outline: none;
    border: none;
    padding: 10px;
    width: 400px;
    font-size: 1.1rem;
    height: 40px;
    background-color: var(--white);
    border-radius: 10px;
    margin: auto;
    display: block;
}
.main input[type="text"].rounded-input {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
}

/* Results */
.main .results-wrapper {
    width: 400px;
    background-color: var(--white);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    transition: .55s ease-in-out;
    margin: auto;
    display: block;
    padding: 10px;
}

.main .results-wrapper a {
    text-decoration: none;
    color: var(--black);
    width: 100%;
    display: flex;
    align-items: center;
    margin: 10px 0px;
    line-height: 24px;
    font-size: 1rem;
    font-weight: 400;
    border-radius: 10px;
    transition: .2s ease-in-out;
}
.main .results-wrapper a:hover {
    background-color: #FAF4D3;
}

.main .results-wrapper a img {
    border-radius: 10px;
    margin-right: 10px;
}

.main .no-results {
    text-align: center;
    margin: auto;
    opacity: .7;
    font-size: 1.1rem;
    font-weight: 400;
}

/* Media queries */
@media only screen and (max-width: 500px) {
    .main input[type="text"] {
        width: 90%;
    }
    .main .results-wrapper {
        width: 90%;
    }
}
</style>

<script>
export default {
    data() {
        return {
            searchInput: "",
            searchResults: {},
            abortController: null,
            searching: false
        }
    },
    head: {
        title: "GameFinder - Een project door Finn Paes"
    },
    methods: {
        // Handle incoming keyUP strokes
        searchGame() {
            if (this.searchInput.length === 0) this.searchResults = {}; // Make the results disappear
            if (this.searchInput.length < 3) return; // Do not execute fetch request
            if (this.abortController) this.abortController.abort(); // If the abort controller isn't empty, cancel previous API request so no double requests
            this.searching = true; // Show search status text

            // Make a new abort controller (https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
            this.abortController = new AbortController();
            const signal = this.abortController.signal;

            // Execute the fetch
            $fetch(`/api/search`, {
                method: "POST",
                body: {
                    query: this.searchInput
                },
                signal
            })
            .then((response) => {
                // Set the response into the results
                this.searching = false;
                this.searchResults = response;
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
}
</script>