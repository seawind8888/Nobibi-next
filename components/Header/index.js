import { Component } from 'react';
import { Menu, Icon } from 'antd';
import './index.less';

const { SubMenu } = Menu;

// Only holds serverRuntimeConfig and publicRuntimeConfig from next.config.js nothing else.


class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  handleChangeCollapsed() {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  }
  

  render() {
    return (
      <div className='header-outside'>
        <div className='header-main'>
          <Menu 
            className='menu-group-left'
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode='inline'
            theme='light'
            inlineCollapsed={this.state.collapsed}>
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
              <Menu.Item key='2'>Option 2</Menu.Item>
              <Menu.Item key='3'>Option 3</Menu.Item>
            </SubMenu>
          </Menu>
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
              <Menu.Item key='2'>Option 2</Menu.Item>
              <Menu.Item key='3'>Option 3</Menu.Item>
            </SubMenu>
          </Menu>
          
        </div>
      </div>
    );
  }
}

export default Header;
