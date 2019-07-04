import {  PureComponent } from 'react';
import { Comment,  List, Avatar, message} from 'antd';
import Editor from '../Editor';
import { getCommentList, addComment } from '../../api';
import PropTypes from 'prop-types';
import timer from '../../utils/timer';

class CommentList extends PureComponent {
  static propTypes = {
    topicTitle: PropTypes.string.isRequired
  };
  constructor(props) {
    super(props);
  }

  state = {
    comments: [],
    submitting: false,
    content: '',
  };
  async componentDidMount() {
    const { topicTitle } = this.props;
    const { data } = await getCommentList({
      topicTitle: topicTitle
    });
    if (data.list.length)
      this.setState({
        comments: this.initComment(data.list)
      });
    
  }
 

  handleSubmit = async () => {
    const { topicTitle } = this.props;
    if (!this.state.content) {
      return;
    }

    this.setState({
      submitting: true,
    });

    const { success } = await addComment({
      topicTitle: topicTitle,
      content: this.state.content
    });
    this.setState({
      submitting: false
    });
    if (success) {
      message('bibi成功啦!');
    }

    // setTimeout(() => {
    //   this.setState({
    //     submitting: false,
    //     content: '',
    //     comments: [
    //       {
    //         author: 'Han Solo',
    //         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //         content: <p>{this.state.content}</p>,
    //         datetime: moment().fromNow(),
    //       },
    //       ...this.state.comments,
    //     ],
    //   });
    // }, 1000);
  };

  initComment = (list) => {
    return list.map(e => {
      return {
        author: e.userName,
        avatar: e.avatar,
        content: e.content,
        datetime: timer(e.updateTime)
      };
    });
  }



  handleChange = e => {
    this.setState({
      content: e.target.value,
    });
  };

  render() {
    const { comments, submitting, content } = this.state;

    return (
      <div>
        {comments.length > 0 && <List
          dataSource={comments}
          header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
          itemLayout='horizontal'
          renderItem={props => <Comment {...props} />}
        />}
        <Comment
          avatar={
            <Avatar
              src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              alt='Han Solo'
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={content}
            />
          }
        />
      </div>
    );
  }
}
export default CommentList;