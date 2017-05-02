import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@expo/ex-navigation';
import { FontAwesome } from '@expo/vector-icons';

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import registerForPushNotificationsAsync
  from '../api/registerForPushNotificationsAsync';

import CreatePushTokenWithMutation from 'newsfeed/utilities/CreatePushToken';  

export default class RootNavigation extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        registerPushToken : false
    }
  }

  componentWillMount() {
    this._notificationSubscription = Notifications.addListener(this._handleNotification.bind(this));
    AsyncStorage.getItem("GST_PUSH_TOKEN").
        then((value)=> {
          //console.log("Push Token:", value);
          if(!value){
            this.setState({
              registerPushToken: true
            })
          }
          else{
            console.log("Push Token found in AsyncStorage, NEED NOT create push token");
          }
    })
  }


  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return (
      <View style={styles.container}>
            {
              this.state.registerPushToken?  <CreatePushTokenWithMutation handleNotification={this._handleNotification.bind(this)}/>: <View></View>
            }
              <TabNavigation tabBarHeight={56} initialTab="home">
                <TabNavigationItem
                  id="home"
                  title="News"
                  renderIcon={isSelected => this._renderIcon('newspaper-o', isSelected)}>
                  <StackNavigation id="newsFeed" initialRoute="newsFeed" />
                </TabNavigationItem>

                <TabNavigationItem
                  id="links"
                  renderIcon={isSelected => this._renderIcon('book', isSelected)}>
                  <StackNavigation initialRoute="links" />
                </TabNavigationItem>

                <TabNavigationItem
                  id="settings"
                  renderIcon={isSelected => this._renderIcon('cog', isSelected)}>
                  <StackNavigation initialRoute="settings" />
                </TabNavigationItem>
              </TabNavigation>
       </View>
    );
  }

  _renderIcon(name, isSelected) {
    return (
      <FontAwesome
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }

  _handleNotification = ({ origin, data }) => {
        
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectedTab: {
    color: Colors.tabIconSelected,
  },
});

