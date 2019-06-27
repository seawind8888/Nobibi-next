import { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;
import './index.less';

// Only holds serverRuntimeConfig and publicRuntimeConfig from next.config.js nothing else.


class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
  }
  

  render() {
    const {onToggle, channelList} = this.props;
    return (
      <div className='header-outside'>
        <div className='header-main'>
          <Icon
            className='toggle-button'
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={onToggle}
          />
          <h1 className='header-title'>
            Nobibi
          </h1>
          <Menu 
            className='menu-group-header'
            onClick={this.handleClick} 
            selectedKeys={[this.state.current]} 
            mode='horizontal'>
            <Menu.Item 
              key='home'>
              <Icon type='home' />
                首页 
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
                channelList.map((e, i) => {
                  return (
                    <Menu.Item key={i}>{e.categoryName}</Menu.Item>
                  );
                })
              }
            </SubMenu>
          </Menu>
          
        </div>
      </div>
    );
  }
}

export default Header;
Header.propTypes = {
  onToggle: PropTypes.func.isRequired,
  channelList: PropTypes.array.isRequired
};

