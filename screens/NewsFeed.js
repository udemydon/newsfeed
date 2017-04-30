// @flow
import React from 'react';
import {
    View,
    Text
} from 'react-native';
import Colors from '../constants/Colors';


export default class NewsFeed extends React.Component {

    constructor(props){
        super(props);
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

    render() {
          return (
            <View>
              <Text>News Feed</Text>
            </View>
          )
    }
}



