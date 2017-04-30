import React, { Component } from 'react';
import {
    ListView,
    Text,
    View
} from 'react-native';
import NewsListItem from './NewsListItem';

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1.id !== r2.id
});


export default class NewsList extends Component {

    constructor(props){
        super(props);
        this._renderItem = this._renderItem.bind(this)
    }

    render() {
        const newsItems = [{title:"News Item1"}, {title: "News Item2"}];
        return (
            <ListView
                enableEmptySections
                renderSeparator={this._renderSeparator}
                dataSource={ds.cloneWithRows(newsItems)}
                renderRow={this._renderItem}
            />
        );
    }

    _renderItem(newsItem) {
        return <NewsListItem newsItem={newsItem} />
    }

    _renderSeparator(sectionID, rowID) {
        return <View
            key={`${rowID}`}
            style={{height: 1, backgroundColor: '#CCCCCC'}}
        />
    }

}


