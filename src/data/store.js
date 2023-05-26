import { reactive } from "vue";

export const store = reactive({
  apiKey: "1c2a1c94a669f2c00dc661ebc0a13765",
  language: "",
  movies: [],
  url: `https://api.themoviedb.org/3/search/movie?`,
  imgPath: "https://image.tmdb.org/t/p/w500",
});
