import { ApolloServer, gql } from "apollo-server";

// Toda request é POST
// Toda requeste bate no MESMO endpoint (/graphql)

// Query -> Obter informações (GET)
// Mutation -> Manipular dados (POST/PUT/PATCH/DELETE)
// Scalar Types -> String, Int, Boolean, Float e ID

const users = [
    { _id: String(Math.random()), name: "Adriano", email: "poquedinho@teste.com", active: true },
    { _id: String(Math.random()), name: "Yohan", email: "kinjhin@teste.com", active: true },
    { _id: String(Math.random()), name: "Paulo", email: "pcgusmao@teste.com", active: false }
]

const typeDefs = gql`
    type User {
        _id: ID!
        name: String!
        email: String!
        active: Boolean!
    }

    type Post {
        _id: ID!
        title: String!
        content: String!
        author: User!
    }

    type Query {
        hello: String
        users: [User!]!
        posts: [Post!]!
        getUserByEmail(email: String!): User!
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hellow world',
        users: () => users,
        getUserByEmail: (_, args) => {
            return users.find((user) => user.email === args.email);
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url}) => console.log(`Server running at ${url}`));