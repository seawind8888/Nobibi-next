import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TopicItem from '../../components/TopicItem';
import './index.less';
import {connect} from 'react-redux';
import { fetchTopicListData } from '../../redux/actions/home';

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
                  title={e.title}
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
  store.dispatch(fetchTopicListData());
  return {};
};

const mapStateToProps = state => ({
  topicListInfo: state.home.topic.list
});


export default connect(mapStateToProps)(Home);

