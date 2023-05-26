<script>
import { store } from "../data/store.js"
import axios from 'axios'

export default {
    name: 'AppHeader',
    data() {
        return {
            store,
            query: "",
        }
    },
    methods: {
        searchMovies() {
            const url = `${store.url}api_key=${store.apiKey}&query=${this.query}`;
            axios.get(url)
                .then(risposta => {
                    this.store.movies = risposta.data.results;
                    console.log(risposta.data)
                });
        },
    }
}
</script>

<template>
    <header>
        <div class="container">
            <div class="titolo">
                <h1>BoolFlix</h1>
            </div>
            <div class="boxSearch">
                <div class="input">
                    <input type="text" v-model="query" @keyup="searchMovies" placeholder="Cerca film">
                </div>
                <div class="button">
                    <button @click="searchMovies">Cerca</button>
                </div>
            </div>
            <div class="boxFilm">
                <div class="cardsArea">
                    <div v-for="movie in store.movies" class="card">
                        <div class="cardImg">
                            <img :src="`${store.imgPath}${movie.poster_path}`" />
                        </div>
                        <div class="cardInfo">
                            <h2>{{ movie.title }}</h2>
                            <p>Titolo originale: {{ movie.original_title }}</p>
                            <p>Lingua: {{ movie.original_language }}</p>
                            <p>Voto: {{ movie.vote_average }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
}

.titolo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
}

.boxSearch {
    display: flex;

    .input {
        padding-right: 20px;
    }
}

.cardsArea {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .card {
        width: calc(100% / 5);
        padding: 5px;

        .cardImg {
            height: 60%;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .cardInfo {
            height: 40%;
        }
    }
}
</style>
