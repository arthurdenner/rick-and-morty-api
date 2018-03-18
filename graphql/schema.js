import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
  type Query @cacheControl(maxAge: 86400) {
    character(id: Int!): Character
    characters(page: Int): [Character]
    episode(id: Int!): Episode
    episodes(page: Int): [Episode]
    location(id: Int!): Location
    locations(page: Int): [Location]
  }

  type Character @cacheControl(maxAge: 86400) {
    id: Int,
    name: String,
    species: String,
    type: String,
    status: String,
    location: Location,
    origin: Location,
    gender: String,
    episodes: [Episode],
    image: String,
  }

  type Episode @cacheControl(maxAge: 86400) {
    id: Int,
    name: String,
    episode: String,
    air_date: String,
    characters: [Character],
  }

  type Location @cacheControl(maxAge: 86400) {
    id: Int,
    name: String,
    type: String,
    dimension: String,
    residents: [Character],
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
