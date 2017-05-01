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

const ITEMS_PER_PAGE = 25;



class NewsFeed extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            allPosts: [],
            refreshing: false,
            totalPosts: 0
        };
        this._getNewsTitles = this._getNewsTitles.bind(this);
        this._loadMore = this._loadMore.bind(this);
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
        const {loading, error, allPosts, _allPostsMeta} = nextProps;
        // Only change the rows if some data is comming
        if (!loading && !error) {
            this.setState({
                allPosts: allPosts,
                totalPosts: _allPostsMeta.count
            });
        }
    }

    render() {
          const {loading, error} = this.props;
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
          const {allPosts, totalPosts} = this.state;
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
              <NewsList allPosts={posts} allPostsLength={allPosts.length} totalPosts={totalPosts} onLoadMore={this._loadMore} onGoToDetail={this._goToDetail.bind(this)} refreshing={this.state.refreshing} onRefresh={this._getNewsTitles} />
          )
    }

    _goToDetail(newsItem){
        this.props.navigation
            .getNavigator('newsFeed')
            .push(Router.getRoute('newsDetail', { newsItem}));
    }

    _loadMore(){
        this.props.fetchMore();
    }

    _getNewsTitles(){
        var self = this;
        this.setState({
            refreshing: true
        })
        this.props.refetch().then((res)=> {
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
  query Posts ($skip: Int, $first: Int) {
    _allPostsMeta{
      count  
    }
    allPosts(skip: $skip, first: $first, orderBy: createdAt_DESC){
      id
      title
      createdAt
    }
  }
`

export const NewsFeedWithData = graphql(NewsQuery, {
    options: (ownProps) => {
        return {
            variables: {
                skip: 0,
                first: ITEMS_PER_PAGE,
            },
            //forceFetch: true
        }
    },
    props: ({ ownProps, data: { loading, allPosts, _allPostsMeta, error, refetch, fetchMore } }) => ({
        loading,
        allPosts,
        _allPostsMeta,
        error,
        refetch,
        fetchMore: () => fetchMore({
            variables: {
                skip: allPosts.length,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) { return prev; }
                return Object.assign({}, prev, {
                    allPosts: [...prev.allPosts, ...fetchMoreResult.allPosts],
                });
            },
        }),
    })
})(NewsFeed)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});