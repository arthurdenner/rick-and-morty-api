import axios from 'axios';

const baseURL = 'https://rickandmortyapi.com/api';

const api = axios.create({
  baseURL,
});

const resolvers = {
  Query: {
    character(_, { id }) {
      return api.get(`character/${id}`).then(({ data }) => data);
    },
    characters(_, { page = 1 }) {
      // TODO: add pagination info?
      return api
        .get(`character/?page=${page}`)
        .then(({ data }) => data.results);
    },
    episode(_, { id }) {
      return api.get(`episode/${id}`).then(({ data }) => data);
    },
    episodes(_, { page = 1 }) {
      // TODO: add pagination info?
      return api.get(`episode/?page=${page}`).then(({ data }) => data.results);
    },
    location(_, { id }) {
      return api.get(`location/${id}`).then(({ data }) => data);
    },
    locations(_, { page = 1 }) {
      // missing pagination info
      return api.get(`location/?page=${page}`).then(({ data }) => data.results);
    },
  },
  Character: {
    episodes({ episode }) {
      const urls = episode.map(url => axios.get(url).then(({ data }) => data));

      return axios.all(urls).then(axios.spread((...episodes) => episodes));
    },
    location({ location }) {
      if (!location.url) {
        return location;
      }

      return axios.get(location.url).then(({ data }) => data);
    },
    origin({ origin }) {
      if (!origin.url) {
        return origin;
      }

      return axios.get(origin.url).then(({ data }) => data);
    },
  },
  Episode: {
    characters({ characters }) {
      const urls = characters.map(url =>
        axios.get(url).then(({ data }) => data)
      );

      return axios.all(urls).then(axios.spread((...chars) => chars));
    },
  },
  Location: {
    residents({ residents }) {
      const urls = residents.map(url =>
        axios.get(url).then(({ data }) => data)
      );

      return axios.all(urls).then(axios.spread((...chars) => chars));
    },
  },
};

export default resolvers;
