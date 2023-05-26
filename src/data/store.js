import { reactive } from "vue";

export const store = reactive({
  apiKey: "1c2a1c94a669f2c00dc661ebc0a13765",
  query: "",
  language: "",
  url: `https://api.themoviedb.org/3/search/movie?`,
});
