<script>
import { store } from "../data/store.js"
import axios from 'axios'

export default {
    name: 'AppHeader',
    data() {
        return {
            store,
            query: "",
            movies: []
        }
    },
    methods: {
        searchMovies() {
            const url = `${store.url}&query=${this.query}`;

            axios.get(url)
                .then(risposta => {
                    this.movies = risposta.data.results;
                });
        }
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
                <div class="imgArea">
                    <div class="box">
                        <ul>
                            <li v-for="movie in movies">
                                <h2>{{ movie.title }}</h2>
                                <p>Titolo originale: {{ movie.original_title }}</p>
                                <p>Lingua: {{ movie.original_language }}</p>
                                <p>Voto: {{ movie.vote_average }}</p>
                            </li>
                        </ul>
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
</style>
