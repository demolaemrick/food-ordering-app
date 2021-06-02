import { ApolloServer, gql } from "apollo-server";

const typeDefs = `
    type Book {
        title: String
        author: String
    }

    type Query {
        books: [Book]
    }
`;

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 3000 || process.env.PORT }).then(({ url }) => {
  console.log(`Server running on port ${url}`);
});
