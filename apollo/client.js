import ApolloClient, { createNetworkInterface } from 'apollo-client';

// Replace http://my-api.graphql.com with your GraphQL API’s URL.
const client = new ApolloClient({
    networkInterface: createNetworkInterface({ uri:  "https://api.graph.cool/simple/v1/cj1drhkuur9oc01132pj4a9j6"}),
});

export default client;