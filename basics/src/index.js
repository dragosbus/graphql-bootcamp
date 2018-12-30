import { GraphQLServer } from "graphql-yoga";

//Scalar types - String, Boolean, Int, Float, ID

//Type definitions(schema)
const typeDefs = `
  type Query {
    sum(nums: [Float!]!): Float!
    grades: [Int!]!
    user: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Int!
  }
`;

//Resolvers
const resolvers = {
  Query: {
    user() {
      return {
        id: "1",
        name: "dragos",
        email: "dragos@mail.com"
      };
    },
    post() {
      return {
        id: "222",
        title: "This the first post",
        body: "This is the body of the post",
        published: 2018
      };
    },
    grades(parent, args, ctx, info) {
      return [99,80,93]
    },
    sum(_, args) {
      if(args.nums.length) {
        return args.nums.reduce((sum ,c) => sum + c, 0)
      }
    },
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("The server is up");
});
