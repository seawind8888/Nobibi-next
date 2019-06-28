import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TopicItem from '../../components/TopicItem';
import './index.less';
import {connect} from 'react-redux';

class Home extends Component {
  static propTypes = {
    topicListInfo: PropTypes.array.isRequired
  }
  static async getInitialProps ({ctx}) {
    const { store } = ctx;
    store.dispatch({
      type: 'FETCH_TOPIC_LIST'
    });
    return {};
  }

  
  constructor (props) {
    super(props);
  }
  
  render() {
    const {topicListInfo} = this.props;
    return (
      <Fragment>
        <div className='home-container'>
          <div className='list-item-container'>
            {topicListInfo.map((e, i) => {
              return (
                <TopicItem
                  key={i}
                  title={e.topicTitle}
                  category={e.category}
                  userName={e.userName}
                  updateTime={e.updateTime}
                ></TopicItem>
              );
            })
            }
          </div>
        </div>
      </Fragment>
    );
  }
}



export default connect(state => ({
  topicListInfo: state.topic.list
}))(Home);

