<script>
import { store } from "../data/store.js";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.css';

export default {
    name: "AppHeader",
    data() {
        return {
            store,
            queryFilm: "",
            querySeries: "",
        };
    },
    computed: {
        searchBoth() {
            if (this.queryFilm === "" && this.querySeries === "") {
                return store.movies;
            } else if (this.queryFilm !== "") {
                return store.movies;
            } else {
                return store.series;
            }
        },
    },
    methods: {
        searchMovies() {
            if (this.queryFilm === "") {
                this.getTopMovies();
            } else {
                const url = `${store.url}api_key=${store.apiKey}&query=${this.queryFilm}`;
                axios.get(url).then((risposta) => {
                    this.store.movies = risposta.data.results;
                    console.log('film', this.store.movies);

                });
            }
        },
        searchSeries() {
            if (this.querySeries === "") {
                this.getTopMovies();
            } else {
                const url = `https://api.themoviedb.org/3/search/tv?api_key=${store.apiKey}&query=${this.querySeries}`;
                axios.get(url).then((risposta) => {
                    this.store.series = risposta.data.results;
                    console.log('serie', this.store.series);
                });
            }
        },
        getTopMovies() {
            const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${store.apiKey}`;
            axios.get(url).then((risposta) => {
                this.store.movies = risposta.data.results;
            });
        }
    },
    mounted() {
        this.getTopMovies();
    }
};
</script>


<template>
    <header>
        <div class="container">
            <div class="titolo">
                <h1>BoolFlix</h1>
            </div>
            <div class="boxSearch">
                <div class="input">
                    <input type="text" v-model="queryFilm" @keyup="searchMovies" placeholder="Cerca film " />
                    <button @click="searchMovies">Cerca film</button>
                </div>
                <div class="button">
                    <input type="text" v-model="querySeries" @keyup="searchSeries" placeholder="Cerca serie tv" />
                    <button @click="searchSeries">Cerca Serie tv</button>
                </div>
            </div>
            <div class="boxFilm">
                <div class="cardsArea">
                    <div v-for="movie in searchBoth" class="card">
                        <div class="cardImg">
                            <img v-if="movie.poster_path == null"
                                src="https://th.bing.com/th/id/R.ae0fc67b38f2d8fee7b3976df6ec8acc?rik=7wdWtRhFfNGMhQ&pid=ImgRaw&r=0" />
                            <img v-else :src="`${store.imgPath}${movie.poster_path}`" />
                        </div>
                        <div class="cardInfo">
                            <h2>{{ movie.title }}</h2>
                            <p>Titolo originale: {{ movie.original_title }}</p>
                            <div class="iconBox">
                                <img :alt="movie.original_language"
                                    :src="`https://unpkg.com/language-icons/icons/${movie.original_language}.svg`">
                            </div>
                            <p>Voto: {{ movie.vote_average }}</p>
                            <div class="stars">
                                <i v-for="n in Math.ceil(movie.vote_average / 2)" class="fas fa-star"></i>
                                <i v-for="n in 5 - Math.ceil(movie.vote_average / 2)" class="far fa-star"></i>
                            </div>
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
    padding-bottom: 20px;

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
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .iconBox {
                width: 2rem;
                height: 2rem;

                img {
                    width: 100%;
                    height: 100%;
                }

            }
        }
    }

}
</style>
