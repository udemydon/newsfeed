
import React, {Component, PropTypes} from 'react';
import Expo from 'expo';
import {AsyncStorage} from 'react-native';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Permissions, Notifications } from 'expo';
import registerForPushNotificationsAsync from './RegisterPushToken';

import {
    View,
    Text
} from 'react-native';



class CreatePushToken extends Component {


    componentDidMount(){
        try{
            this._registerDeviceAsync();
        }
        catch (e){
            console.log(e);
        }

    }

    async _registerDeviceAsync() {
        //console.log("Proceeding to create push token");
        let token = await registerForPushNotificationsAsync();
        //console.log("Token created:", token);
        this.saveToken(token)
    }

    render() {
        return (
            <View>
            </View>
        );
    }

    saveToken(token){
        //console.log("Saving token to backend:", token);
        var self = this;
        this.props.mutate({variables: {token}})
            .then((data) => {
                //console.log("Saved Push token to backend.. now saving on device", data);
                AsyncStorage.setItem("GST_PUSH_TOKEN", token)
                    .then((val)=> {
                        
                    })
                    .catch((e) => {
                        console.log(e);
                    })
            },
                (err) => {
                    //console.log("Error saving push token to backend. Might have already been saved!", err);
                    if(token){
                        AsyncStorage.setItem("GST_PUSH_TOKEN", token)
                            .then((val)=> {
                                //No op
                                
                            })
                            .catch((e) => {
                                console.log(e);
                            })
                    }

                }
            )

    }    
}

const createPushTokenMutation = gql`
  mutation createPushToken($token: String!) {
    createPushToken(token: $token) {
      id
    }
  }
`

const CreatePushTokenWithMutation = graphql(createPushTokenMutation)(CreatePushToken);

export default CreatePushTokenWithMutation;