import React, { Component } from 'react';
import {
    ListView,
    Text,
    View,
    RefreshControl,
    StyleSheet
} from 'react-native';
import NewsListItem from './NewsListItem';
import Footer from './Footer';

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1.id !== r2.id,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});


export default class NewsList extends Component {

    constructor(props){
        super(props);
        this._renderItem = this._renderItem.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this._renderSectionHeader = this._renderSectionHeader.bind(this);
    }

    render() {
        //const newsItems = [{title:"News Item1"}, {title: "News Item2"}];
        const newsItems = this.props.allPosts;
        const {allPostsLength, totalPosts} = this.props;
        const showFooter = allPostsLength < totalPosts;
        return (
            <ListView
                enableEmptySections
                renderSeparator={this._renderSeparator}
                dataSource={ds.cloneWithRowsAndSections(newsItems)}
                renderRow={this._renderItem}
                renderSectionHeader={this._renderSectionHeader}
                renderFooter={() => {
                    if(showFooter){
                        return (
                            <Footer onPress={this.props.onLoadMore}/>
                        )
                    }

                } }
                refreshControl={
                    <RefreshControl
                        refreshing={this.props.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
            />
        );
    }

    _renderItem(newsItem) {
        return <NewsListItem newsItem={newsItem} onPress={this.props.onGoToDetail.bind(this, newsItem)}/>
    }

    _renderSectionHeader(sectionData, category) {
        return (
            <View style={styles.section}>
                <Text>{category}</Text>
            </View>
        )
    }

    _renderSeparator(sectionID, rowID) {
        return <View
            key={`${rowID}`}
            style={{height: 1, backgroundColor: '#CCCCCC'}}
        />
    }

    _onRefresh() {
        this.props.onRefresh();
    }

}

const styles = StyleSheet.create({
    section : {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F0F0',
        height: 30
    },
});



