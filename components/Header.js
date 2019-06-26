import { Component } from 'react';
import PropTypes from 'prop-types';
import '../assets/header.less';

// Only holds serverRuntimeConfig and publicRuntimeConfig from next.config.js nothing else.


class Header extends Component {
  static propTypes = {
    title: PropTypes.string
  }
  static defaultProps = {
    title: ''
  }
  constructor(props) {
    super(props);
    const { title } = props;
    this.state = { title };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.title !== prevState.title) {
      return {
        title: nextProps.title
      };
    }
    return null;
  }

  render() {
    return (
      <div className='outside-container'>
        <div className='main-container'>
          <Menu 
            onClick={this.handleClick} 
            selectedKeys={[this.state.current]} 
            mode="horizontal">
              <Menu.Item key="home">
                <Icon type="home" />
                首页
              </Menu.Item>
              <SubMenu
                key="topic"
                title={
                  <span>
                    <Icon type="notification" />
                    <span>主题</span>
                  </span>
                }>
                  <Menu.Item key="3">Option 3</Menu.Item>
                  <Menu.Item key="3">Option 3</Menu.Item>
              </SubMenu>
          </Menu>
          
        </div>
      </div>
    );
  }
}

export default Header;
