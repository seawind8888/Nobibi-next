import {  PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Cookies from 'js-cookie';
import {changePassApi} from '../api';
import { Form, Input, Button, Icon, message } from 'antd';
import {connect} from 'react-redux';
import md5 from 'md5';

class changePass extends PureComponent {
    static propTypes = {
      form:PropTypes.object.isRequired,
      userInfo: PropTypes.string.isRequired,
      dispatch: PropTypes.func.isRequired,
    }
    handleSubmit = e => {
      const {form, userInfo, dispatch} = this.props;
      e.preventDefault();
      form.validateFields(async (err, values) => {
        if (err) {
          return;
          // console.log('Received values of form: ', values);
        }
        const _oldPass = md5(values.oldPass);
        const _newPass =  md5(values.newPass);
        const data = await changePassApi({
          oldPass: _oldPass,
          newPass: _newPass,
          userName: userInfo.userName
        });
        if (data.success) {
          message.success('修改成功，可以重新登陆bibi了');
          dispatch({
            type: 'USER_SIGN_OUT'
          });
          Cookies.remove('username');
          Router.push('/login');
        } else {
          message.error(data.message);
        }
        
      });
    };
    compareToFirstPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue('newPass')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    };
    render() {
      const { form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Fragment>
          <Form onSubmit={this.handleSubmit}  className='login-form'>
            <Form.Item>
              {getFieldDecorator('oldPass', {
                rules: [{ required: true, message: '输入旧密码!' }],
              })(
                <Input.Password 
                  prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type='password'
                  placeholder='输入旧密码'
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('newPass', {
                rules: [{ required: true, message: '输入新密码!' }],
              })(
                <Input.Password 
                  prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type='password'
                  placeholder='输入新密码'
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('confirm', {
                rules: [{ required: true, message: 'Please input your Password!' },
                  {
                    validator: this.compareToFirstPassword,
                  }],
              })(
                <Input.Password 
                  prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type='confirm'
                  placeholder='确认新密码'
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' className='login-form-button'>
                修改密码
              </Button>
            </Form.Item>
          </Form>
        </Fragment>
      );
    }

}

export default Form.create({ name: 'nobibi_forgetPass' })(connect(state => ({
  userInfo: state.user.userInfo
}))(changePass));