
import {  PureComponent, Fragment } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { createTopic } from '../api';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Router from 'next/router';
import TopicEditor from '../components/TopicEditor';

class TopicEdit extends PureComponent {
    static propTypes = {
      form: PropTypes.object.isRequired,
      channelList: PropTypes.array,
      userInfo: PropTypes.object.isRequired
    }
    static defaultProps = {
      channelList: []
    }
    state = {
      content: null
    }
    handleSubmit = async (e) => {
      const {form} = this.props;
      e.preventDefault();
      form.validateFields(async (err, values) => {
        if (err) {
          return;
       
        }
        const { userInfo } = this.props;
        const { content } = this.state;
     
        const _params = values;
        _params.category = [_params.category];
        _params.userName = userInfo.userName;
        _params.userAvatar = userInfo.avatar;
        _params.status = "PUBLISH";
        if (!content) {
          message.error('请输入内容');
          return;
        }
        _params.content = content.toHTML();
        const {success} = await createTopic(_params);
        if (success) {
          message.success('发布成功');
          Router.push('/');
        }
        
      });
     
    }
    handleEditorChange = (e) => {
      this.setState({ content: e });
    }
    render() {
      const { form, channelList } = this.props;
      const { getFieldDecorator } = form;
      const { content } = this.state;
      return (
        <Fragment>
          <Form onSubmit={this.handleSubmit}  className='editer-container'>
            <Form.Item label='标题'>
              {getFieldDecorator('topicTitle', {
                rules: [{ required: true, message: '请输入标题!' }],
              })(
                <Input
                  
                  placeholder='输入标题'
                />,
              )}
            </Form.Item>
            <Form.Item label='频道'>
              {getFieldDecorator('category', {
                rules: [
                  {
                    required: true,
                    message: '请选择频道!'
                  },
                ],
              })(
                <Select 
                  onChange={this.handleSelectName}>
                  {channelList.map(e => (
                    <Select.Option 
                      value={e.categoryName}
                      placeholder='选择频道'
                      key={e._id}>
                      {e.categoryName}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label='内容'>
              <TopicEditor
                editorValue={content}
                editorChange={this.handleEditorChange}
              />
      
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' className='login-form-button'>
                发了啊！
              </Button>
            </Form.Item>
          </Form>
        </Fragment>
       
      );
    }
}

export default Form.create({ name: 'topic_edit' })(connect(state => ({
  channelList: state.channel.list,
  userInfo: state.user.userInfo
}))(TopicEdit));