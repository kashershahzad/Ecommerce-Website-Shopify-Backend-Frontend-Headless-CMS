import { ApolloClient,InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri:`https://graphql.contentful.com/content/v1/spaces/suzzj95a076o `,
    headers:{
        'Authorization': `Bearer 9LmoiBPgB5Y80mVsOp19aCqtAcEaV5GrHNzQEQKnaKw`
    },
    cache: new InMemoryCache(),
})

export default client;