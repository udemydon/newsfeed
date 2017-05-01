// @flow
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  WebView,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Colors from 'newsfeed/constants/Colors';
import Router from 'newsfeed/navigation/Router';

const height = Dimensions.get('window').height;

class NewsDetail extends React.Component {
  static route = {
    navigationBar: {
      backgroundColor: Colors.navbar,
      tintColor: '#fff',
      title: (params) => {
        return <Text>{"Detail"}</Text>
      },
    }
  }

   constructor(props){
        super(props);
        this.state = {
            refreshing: false
        }
        this._onRefresh = this._onRefresh.bind(this);
  }

  render(){
      if (this.props.data.error) {
          return (
              <View style={styles.container} >
                <Text>
                  The requested News item does not exist!
                </Text>
              </View>
          );
      }

      if (this.props.data.loading) {
          return (
              <View style={styles.container} >
                <ActivityIndicator />
              </View>
          );
      }

      const newsItem = this.props.data.Post;
      console.log("News Item:", newsItem);
        return (
            <ScrollView style={{flex: 1}}
                        scrollEnabled={true}
                        refreshControl={<RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />}
                        >
              
                <View style={styles.webViewContainer}>
                  <WebView
                      source={{html: newsItem.contentHTML}}/>
                </View>
        
            </ScrollView>
        );
    }

    _onRefresh() {
        var self = this;
        this.setState({
            refreshing: true
        })
        this.props.data.refetch().then((res)=> {
            self.setState({
                refreshing: false
            })
        }, (err) => {
            self.setState({
                refreshing: false
            })
        });
    }

    
}



const NewsDetailQuery = gql`
  query NewsDetailQuery($id: ID!) {
    Post(id: $id) {
      id
      title
      content
      contentHTML
    }
  }
`

let NewsDetailWithData = graphql(NewsDetailQuery, {
  options: ({ newsItem }) => {
    return {
      variables: {
        id: newsItem.id
      }
    }
  }
})(NewsDetail)

export default NewsDetailWithData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: '#fff',
    height
  },
});