import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;
import { getChannelList } from '../api';
import './Layout.less';
import {connect} from 'react-redux';



// const NLayout = ({ title, children }) => (
//   <Fragment>
//     <style jsx>{`
//       .main-container {
//         display: flex;
//         justify-content: center;
//       }
//     `}</style>
//     <div style={{display: 'flex'}}>
//       <Menu 
//         className='menu-group-left'
//         defaultSelectedKeys={['1']}
//         defaultOpenKeys={['sub1']}
//         mode='inline'
//         theme='light'
//         inlineIndent={0}
//         inlineCollapsed={false}>
//         <Menu.Item 
//           key='home'>
//           <Icon type='home' />
//                 首页 
//         </Menu.Item>
//         <SubMenu
//           key='topic'
//           title={
//             <span>
//               <Icon type='notification' />
//               <span>主题</span>
//             </span>
//           }>
//           <Menu.Item key='2'>Option 2</Menu.Item>
//           <Menu.Item key='3'>Option 3</Menu.Item>
//         </SubMenu>
//       </Menu>
//       <div>
//         <Header title={title} />
//         <div className='main-container'>
//           {children}
//         </div>
//       </div>
//     </div>
   
    
//   </Fragment>
// );
// export default NLayout;
class Layout extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    channelList: PropTypes.array,
    dispatch: PropTypes.func.isRequired
  };
  static defaultProps = {
    channelList: []
  }
  constructor(props){
    super(props);
    this.handleChangeCollapsed = this.handleChangeCollapsed.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);
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
    
  }
  handleChangeCollapsed() {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  }
  handleSelectItem(e) {
    const {dispatch} = this.props;
    dispatch({
      type: 'FETCH_TOPIC_LIST',
      payload: {_id: e.key}
    });
  }
  
  render() {
    return (
      <Fragment>
        <style jsx>{`
          .main-container {
            display: flex;
            justify-content: center;
          }
        `}</style>
        <div style={{display: 'flex'}}>
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
                      onClick={this.handleSelectItem}
                    >{e.categoryName}</Menu.Item>
                  );
                })
              }

            </SubMenu>
          </Menu>
          
          <div>
            <Header 
              title={this.props.title} 
              onToggle={this.handleChangeCollapsed}
              channelList={this.state.channelList}/>
            <div className='main-container'>
              {this.props.children}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}



export default connect(state => state)(Layout);
