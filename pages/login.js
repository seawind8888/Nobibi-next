import { PureComponent, Fragment } from 'react';
import { Form, Input, Icon, Checkbox, Button } from 'antd';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {userLogin} from '../api';
import Cookies from 'js-cookie';
import { message } from 'antd';
import Router from 'next/router';
import md5 from 'md5';

class Login extends PureComponent {
  
    static propTypes = {
      form:PropTypes.object.isRequired,
      dispatch:PropTypes.func.isRequired
    }
    constructor(props) {
      super(props);
    }
    handleSubmit = e => {
      const {form, dispatch} = this.props;
      e.preventDefault();
      form.validateFields(async (err, values) => {
        if (!err) {
          const _userInfo = values;
          _userInfo.password = md5(_userInfo.password);
          Cookies.set('username', _userInfo.username);
          const {success} = await userLogin(_userInfo);
          if (success) {
            message.success('来了，您呐');
            dispatch({
              type: 'GET_USER_INFO',
              payload: {
                username: _userInfo.username
              }
            });
            Router.push('/');
          }
          // console.log('Received values of form: ', values);
        }
        
      });
    };
    render() {
      const { form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Fragment>
          <Form onSubmit={this.handleSubmit}  className='login-form'>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input
                  prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='用户名'
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input
                  prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type='password'
                  placeholder='密码'
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <a className='login-form-forgot' href=''>
                Forgot password
              </a>
              <Button type='primary' htmlType='submit' className='login-form-button'>
                登录
              </Button>
          Or <a href=''>register now!</a>
            </Form.Item>
          </Form>
        </Fragment>
      );
    }
}
export default Form.create({ name: 'nobibi_login' })(connect(state => state)(Login));