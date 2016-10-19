/**
 * Created by kevin on 15/12/17.
 */
'use strict';

import React from 'react';
import Toast from '@remobile/react-native-toast'
import PhotoBrower from '@bjyas/react-native-photo-browser'
import ActionSheet from 'react-native-actionsheet';

import {
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
  CameraRoll,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  View,
  Text,
  Modal
} from 'react-native';


module.exports = React.createClass({

  propTypes: {
    photos: React.PropTypes.array.isRequired,
    enableGrid: React.PropTypes.bool,
    actions: React.PropTypes.array,
    saveAs: React.PropTypes.func
  },
  getDefaultProps(){
    return {
      enableGrid: false
    }
  },
  getInitialState() {
    return {
      show: false,
      activePage: 0,
    };
  },

  handleChangePage(page) {
    this.setState({
      activePage: page
    }, () => {
      //after active page changed
    })

  },

  open(initialPage) {
    if (this.props.photos && this.props.photos.length > 0) {
      this.setState({
        show: true,
        activePage: initialPage < 0 ? 0 : initialPage
      });
      if (StatusBar) {
        StatusBar.setHidden(true, 'fade');
      }
    } else {
      Toast.show('没有可浏览的照片')
    }
  },

  close() {
    this.setState({
      show: false
    });
    if(this.props.setPhotos){
      this.props.setPhotos();
    }
    if (StatusBar) {
      StatusBar.setHidden(false, 'fade');
    }
  },

  saveAs(item) {
    let uri = this.props.photos[item];
    if (typeof uri == 'object') uri = uri.photo;
    if (this.props.saveAs){
      var task = this.props.saveAs(uri);
    }else{
      var task = CameraRoll.saveToCameraRoll(uri, 'photo');
    }
    task.then(res => {
      Toast.show('已成功地保存到本地相册');
    });
  },

  handleAction(m, index){
    this.ActionSheet.show();
    this.setState({activePage: index})
  },

  _handleActionPress(index){
    if (index == 0){
      //cancel
    }
    else if (index == 1){
      this.saveAs(this.state.activePage);
    }else{
      let action = this.props.actions[index - 2];
      if (action.func){
        action.func(this.state.activePage)
      }
    }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen != undefined) {
      if (nextProps.isOpen) {
        this.open();
      } else {
        this.close();
      }
    }
  },

  render() {
    const {
      actions,
      photos
      } = this.props;

    if (!photos || photos.length == 0){
      return null;
    }

    let medias = [];
    for(let p of photos){
      if (typeof p == 'object'){
        medias.push(p);
      }else{
        medias.push({photo: p})
      }
    }

    let buttons = ['取消', "保存到本地相册"];
    if (actions) {
      actions.forEach((action, key) => buttons.push(action.text));
    }

    return (
      <Modal
        visible={this.state.show}
        onRequestClose={this.close}
        style={{
         top: 0,
         bottom: 0,
         right: 0,
         left: 0,
        }}>
        <View style={{flex: 1}}>
          <StatusBar animated={true} hidden={Platform.OS == 'ios' ? true : false} backgroundColor="black"/>
          <PhotoBrower mediaList={medias}
                       enableGrid={this.props.enableGrid}
                       initialIndex={this.state.activePage}
                       displayActionButton={true}
                       onBack={this.close}
                       onActionButton={this.handleAction}/>
          <ActionSheet
            ref={(o) => this.ActionSheet = o}
            title="选择操作"
            options={buttons}
            cancelButtonIndex={0}
            onPress={this._handleActionPress.bind(this)}
          />
        </View>
      </Modal>
    );
  }
});

