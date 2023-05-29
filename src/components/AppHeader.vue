<script>
import { store } from "../data/store.js";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.css';

export default {
    name: "AppHeader",
    data() {
        return {
            store,
            query: ""
        };
    },
    computed: {
        searchBoth() {
            if (this.query == "") {
                return store.movies;
            } else {
                return store.movies.concat(store.series);
            }
        },
    },
    methods: {
        search() {
            if (this.query === "") {
                this.getTopMovies();
            } else {
                // chiamata Film
                const movieUrl = `${store.url}api_key=${store.apiKey}&query=${this.query}`;
                axios.get(movieUrl).then((response) => {
                    this.store.movies = response.data.results;
                    console.log('film', this.store.movies)
                });
                // chiamata Serie
                const seriesUrl = `https://api.themoviedb.org/3/search/tv?api_key=${store.apiKey}&query=${this.query}`;
                axios.get(seriesUrl).then((response) => {
                    this.store.series = response.data.results;
                    console.log('serie', this.store.movies)
                });
            }
        },
        getTopMovies() {
            const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${store.apiKey}`;
            axios.get(url).then((response) => {
                this.store.movies = response.data.results;
            });
        }
    },
    getTopMovies() {
        const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${store.apiKey}`;
        axios.get(url).then((risposta) => {
            this.store.movies = risposta.data.results;
        });
    },
    mounted() {
        this.getTopMovies();
    }
};
</script>


<template>
    <header>
        <div class="container">
            <div class="containerHeader">
                <div class="titolo">
                    <img src="https://th.bing.com/th/id/R.4d30a09d38e6dfe3feaa31920a680108?rik=GnWkgmKvj5nwNg&riu=http%3a%2f%2fwww.cultjer.com%2fimg%2fug_photo%2f2016_09%2f76248820160921034356.jpg&ehk=grD%2fdqb%2b43FMvO3KHmAdPwgUvOikuZkwrJQwMPdCHUM%3d&risl=&pid=ImgRaw&r=0"
                        alt="">
                </div>
                <div class="boxSearch">
                    <div class="input">
                        <input type="text" v-model="query" @keyup="search" placeholder="Cerca film o serie tv" />
                        <button @click="search">Cerca</button>
                    </div>
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
                            <p v-if="movie.original_title || movie.name">Titolo originale: {{ movie.original_title ||
                                movie.name }}</p>
                            <div class="iconBox">
                                <img :alt="movie.original_language"
                                    :src="`https://unpkg.com/language-icons/icons/${movie.original_language}.svg`">
                            </div>
                            <div class="stars">
                                <i v-for="n in Math.round(movie.vote_average / 2)" class="fas fa-star"></i>
                                <i v-for="n in 5 - Math.round(movie.vote_average / 2)" class="far fa-star"></i>
                            </div>
                            <div class="description">
                                <span>Overview: {{ movie.overview }}</span>
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

.containerHeader {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100px;
}

.titolo {
    height: 50px;
    width: 100px;

    img {
        width: 100%;
        height: 100%;
    }
}

.boxSearch {
    display: flex;

    input {
        margin-right: 20px;
    }

    button {
        background-color: transparent;
        color: white;
        padding: 5px;
    }
}

.cardsArea {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .card {
        width: calc(100% / 5);
        padding: 5px;
        position: relative;
        height: 400px;
        perspective: 1000px;

        .cardImg,
        .cardInfo {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            transition: transform 0.8s;
        }

        .cardImg {
            z-index: 1;

            img {
                width: 100%;
                height: 100%;
                position: absolute;
                padding: 5px
            }
        }

        .cardInfo {
            color: #aaa;
            transform: rotateY(180deg);

            padding: 2px
        }

        .iconBox {
            width: 2rem;

            height: 2rem;

            img {
                width: 100%;
                height: 100%
            }
        }

        &:hover .cardImg {
            transform: rotateY(180deg)
        }

        &:hover .cardInfo {
            transform: rotateY(360deg);
            background-color: black
        }
    }
}
</style>
