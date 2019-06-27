import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TopicItem from '../../components/TopicItem';
import './index.less';
import {connect} from 'react-redux';

class Home extends Component {
  static propTypes = {
    topicListInfo: PropTypes.array.isRequired,
  }

  
  constructor (props) {
    super(props);
  }
  
  render() {
    const {topicListInfo = []} = this.props;
    return (
      <Fragment>
        <div className='home-container'>
          <div className='list-item-container'>
            {topicListInfo.map((e, i) => {
              return (
                <TopicItem
                  key={i}
                  title={e.topicTitle}
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

Home.getInitialProps = async ({ctx}) => {
  const { store } = ctx;
  store.dispatch({
    type: 'FETCH_TOPIC_LIST'
  });
  return {};
};
const mapStateToProps = state => ({
  topicListInfo: state.topic.list
});





export default connect(mapStateToProps)(Home);

