import React from 'react'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '';
import Signup from '';
import Login from '';
import Profile from '';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
    uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authlink = setContext((_, { Headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('id_token')
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...Headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
    link: authlink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
    return(
        <ApolloProvider client={client}>
            <Router>
                <div className="flex-colum justify-flex-start min-100-vh">
                    <Header />
                    <div className="container">
                        <Routes>
                            <Route
                            path="/"
                            element={<Home />}
                            />
                            <Route 
                            path="/login"
                            element={<Login />}
                            />
                            <Route
                            path="/signup"
                            element={<Signup />}
                            />
                            <Route
                            path="/profile"
                            element={<Profile />}
                            />

                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;