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
  TouchableOpacity
} from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Colors from 'newsfeed/constants/Colors';
import Router from 'newsfeed/navigation/Router';

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
        super(props)
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
                        >
              
                  <Text>{newsItem.content}</Text>
        
            </ScrollView>
        );
    }

    
}



const NewsDetailQuery = gql`
  query NewsDetailQuery($id: ID!) {
    Post(id: $id) {
      id
      title
      content
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
  }
});