import React, { Component } from "react";
import ApolloClient, { gql, InMemoryCache } from "apollo-boost";
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
import Header from "./components/Header/Header";
import Error from "./components/Error/Error";
import CryptoGoats from "./components/CryptoGoats/CryptoGoats";
import Filter from "./components/Filter/Filter";

if (!process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT) {
  throw new Error('NEXT_PUBLIC_GRAPHQL_ENDPOINT environment variable not defined')
}

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  fetchOptions: {
    mode: 'no-cors'
  }
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
    const { withImage, withName, orderBy, showHelpDialog } = this.state;

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
