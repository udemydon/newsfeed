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
import {formatDate} from 'newsfeed/utilities/date';



class NewsFeed extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            allPosts: [],
            refreshing: false
        };
        this._getNewsTitles = this._getNewsTitles.bind(this);
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
          //console.log("All Posts:", allPosts);

          let distinctPostDates = [];
          let postDate;
          for (let i=0;i<allPosts.length; i++)
          {
                postDate = formatDate(allPosts[i].createdAt);
                let exists = (distinctPostDates.indexOf(postDate) !=  -1);
                if(!exists){
                    distinctPostDates.push(postDate);
                }

           }

          const posts = {};
          for(let i of distinctPostDates){
                posts[i] = allPosts.filter((post) => {
                    return i==formatDate(post.createdAt);
                });
          }

          console.log("Posts:", posts);

          return (
              <NewsList allPosts={posts} onGoToDetail={this._goToDetail.bind(this)} refreshing={this.state.refreshing} onRefresh={this._getNewsTitles} />
          )
    }

    _goToDetail(newsItem){
        this.props.navigation
            .getNavigator('newsFeed')
            .push(Router.getRoute('newsDetail', { newsItem}));
    }

    _getNewsTitles(){
        var self = this;
        this.setState({
            refreshing: true
        })
        this.props.data.refetch().then((res)=> {
            self.setState({
                allPosts: res.data.allPosts,
                refreshing: false
            })
        }, (err) => {
            self.setState({
                refreshing: false
            })
        });
    }
}

const NewsQuery = gql`
  query Posts {
    allPosts(orderBy: createdAt_DESC){
      id
      title
      createdAt
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