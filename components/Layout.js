import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { Menu, Icon, message } from 'antd';
const { SubMenu } = Menu;
import { getChannelList, userLogOut } from '../api';
import {connect} from 'react-redux';
import Router from 'next/router';
import Cookies from 'js-cookie';
import './Layout.less';



class Layout extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    channelList: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired
  };
  
  static defaultProps = {
    channelList: []
  }
  constructor(props){
    super(props);
    this.handleChangeCollapsed = this.handleChangeCollapsed.bind(this);
    this.handleSelectMenu = this.handleSelectMenu.bind(this);
    this.handleSelectUserItem = this.handleSelectUserItem.bind(this);
    this.state = {
      collapsed: true,
      channelList: []
    };
  }
  async componentWillMount () {
    const {data} = await getChannelList();
    if (data.list.length > 0) {
      this.setState({
        channelList: data.list
      });
    }
    const _userCode = Cookies.get('username');
    if (_userCode) {
      this.props.dispatch({
        type: 'GET_USER_INFO',
        payload: {
          username: _userCode
        }
      });
    }
   
    
  }
  handleChangeCollapsed() {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  }
  handleSelectMenu(e) {
    const {dispatch} = this.props;
    if (e.key === 'home') {
      Router.push('/');
     
    } else {
      dispatch({
        type: 'FETCH_TOPIC_LIST',
        payload: {_id: e.key}
      });
    }
   
  }
  async handleSelectUserItem(e) {
    const {dispatch} = this.props;
    switch (e.key) {
      case 'signOut':
        var res = await userLogOut();
        if (res.success) {
          message.success(res.message);
          dispatch({
            type: 'USER_SIGN_OUT'
          });
        }
        Cookies.remove('username');
        break;
      case 'modifyPass':
        Router.push('/ModifyPass');
        break;
      
    }
  }
  
  
  render() {
    return (
      <Fragment>
        <div style={{display: 'flex'}}>
          <Menu 
            className='menu-group-left'
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode='inline'
            theme='light'
            onClick={this.handleSelectMenu}
            inlineCollapsed={this.state.collapsed}>
            <Menu.Item 
              key='home'>
              <Icon type='home' />
              <span>首页</span>
            </Menu.Item>
            <SubMenu
              key='topic'
              title={
                <span>
                  <Icon type='notification' />
                  <span>主题</span>
                </span>
              }>
              {
                this.state.channelList.map(e => {
                  return (
                    <Menu.Item  
                      key={e._id}
                    >{e.categoryName}</Menu.Item>
                  );
                })
              }

            </SubMenu>
          </Menu>
          
          <div style={{width: '100%'}}>
            <Header 
              title={this.props.title} 
              onToggle={this.handleChangeCollapsed}
              isCollapsed={this.state.collapsed}
              channelList={this.state.channelList}
              userInfo={this.props.userInfo}
              onMenuClick={this.handleSelectMenu}
              onUserClick={this.handleSelectUserItem}/>
            <div className='main-container'>
              {this.props.children}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}



export default connect(state => ({
  userInfo: state.user.userInfo
}))(Layout);
