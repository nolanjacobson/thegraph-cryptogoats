import React, { Component } from "react";
import { gql } from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider, Query } from "react-apollo";
import {
  Grid,
  LinearProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import Error from "../components/Error/Error";
import CryptoGoats from "../components/CryptoGoats/CryptoGoats";
import { HttpLink } from "apollo-link-http";

if (!process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT) {
  throw new Error(
    "NEXT_PUBLIC_GRAPHQL_ENDPOINT environment variable not defined"
  );
}

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT }),
  cache: new InMemoryCache(),
});

const CRYPTOGOATS_QUERY = gql`
  {
    cryptoGoats {
      id
      owner
      goatName
      goatMetadata
      goatRandomness
    }
  }
`;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      withImage: false,
      withName: false,
      orderBy: "displayName",
      showHelpDialog: false,
    };
  }

  toggleHelpDialog = () => {
    this.setState((state) => ({
      ...state,
      showHelpDialog: !state.showHelpDialog,
    }));
  };

  gotoQuickStartGuide = () => {
    window.location.href = "https://thegraph.com/docs/quick-start";
  };

  render() {

    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Grid container direction="column">
            <Query query={CRYPTOGOATS_QUERY}>
              {({ data, error, loading }) => {
                return loading ? (
                  <LinearProgress variant="query" style={{ width: "100%" }} />
                ) : error ? (
                  <Error error={error} />
                ) : (
                  <>
                    <CryptoGoats cryptoGoats={data.cryptoGoats} />
                  </>
                );
              }}
            </Query>
          </Grid>
        </div>
      </ApolloProvider>
    );
  }
}
