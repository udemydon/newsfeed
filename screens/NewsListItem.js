// @flow
import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


export default class NewsListItem extends React.Component {

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
      >
        <View style={{flexDirection: 'row'}}>
          <View style={styles.text}>
            <Text>
                {this.props.newsItem.title}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <MaterialIcons name="chevron-right" size={30} color="#b8c3c9" />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 15,
    paddingVertical: 5,
    alignSelf: 'stretch',
    height: 70,
    overflow: 'hidden'
  },
  text: {
    flex: 1,
    marginLeft: 0,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  image: {
    width: 50,
    height: 50
  },
  buttonContainer: {
    paddingRight: 5,
    justifyContent: 'center'
  }
});
