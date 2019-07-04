import {  PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import NoAvatar from '../components/NoAvatar';
import CommentList from '../components/CommentList';
import { getTopicList, getCommentList } from '../api';
import timer from '../utils/timer';


class TopicDetail extends PureComponent {
    static propTypes = {
      topicInfo: PropTypes.object.isRequired,
      commentList: PropTypes.array.isRequired
    };
    static async getInitialProps ({ ctx}) {
      
      const _topic = await getTopicList({
        _id: ctx.query.id
      });
    
      const _comment = await getCommentList({
        topicCode: ctx.query.id
      });
      return {
        topicInfo: _topic.data.list[0],
        commentList: _comment.data.list
      };
    }
    constructor(props) {
      super(props);
    }
    render() {
      const { topicInfo} = this.props;
      return (
        <Fragment>
          <div className='main-inside-container topic-detail-container'>
            <h1 className='detail-title'>{topicInfo.topicTitle}</h1>
            <div className='user-info-container'>
              <div className='user-avatar'>
                <NoAvatar
                  avatar={topicInfo.userAvatar}
                  userName={topicInfo.userName}
                ></NoAvatar>
              </div>
              <div className='user-info'>
                <div className='topic-info-container'>{topicInfo.userName} {timer(Date.parse(topicInfo.updateTime))}</div>
                <div className='topic-content-container' dangerouslySetInnerHTML={{__html: topicInfo.content}}></div>
              </div>
            </div>
            <CommentList
              topicTitle={topicInfo.topicTitle}
            />
          </div>
        </Fragment>
       
      );
    }
}
export default TopicDetail;