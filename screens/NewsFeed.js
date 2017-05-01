// @flow
import React from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    Text
} from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Colors from '../constants/Colors';
import NewsList from './NewsList';
import Router from 'newsfeed/navigation/Router';



class NewsFeed extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            allPosts: []
        };
    }

    static route = {
        navigationBar: {
            backgroundColor: Colors.navbar,
            tintColor: '#fff',
            title: (route) => {
                return <Text>{'News'}</Text>;
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        const {loading, error, allPosts} = nextProps.data;
        // Only change the rows if some data is comming
        if (!loading && !error) {
            this.setState({
                allPosts: allPosts
            });
        }
    }

    render() {
          const {loading, error} = this.props.data;
          if (error) {
              console.error("Error rendering NewsList:", error);
              return (
                  <View style={styles.container}>
                      <Text>Error!!!</Text>
                  </View>
              );
          }

          if (loading) {
              return (
                  <View style={styles.container}>
                      <ActivityIndicator />
                  </View>
              );
          }
          const {allPosts} = this.state;
          console.log("posts:", allPosts);
          return (
              <NewsList allPosts={allPosts} onGoToDetail={this._goToDetail.bind(this)}/>
          )
    }

    _goToDetail(newsItem){
        this.props.navigation
            .getNavigator('newsFeed')
            .push(Router.getRoute('newsDetail', { newsItem}));
    }
}

const NewsQuery = gql`
  query Posts {
    allPosts(orderBy: createdAt_DESC){
      id
      title
    }
  }
`;

export const NewsFeedWithData = graphql(NewsQuery)(NewsFeed);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});