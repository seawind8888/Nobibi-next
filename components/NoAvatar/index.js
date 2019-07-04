import { Avatar } from 'antd';
import PropTypes from 'prop-types';

const NoAvatar = (props) => {
  if (!props.avatar) {
    return (
      <Avatar icon='user' size={52} />
    );
  } 
  if (props.avatar.length > 7) {
    return (
      <Avatar icon='user' size={52} />
    );
  } 
  return (
    <Avatar 
      style={{
        backgroundColor: props.avatar,
        verticalAlign: 'middle', 
        textTransform: 'capitalize',
        fontSize: 32
      }}
      size={52}
    >{props.userName.slice(0, 1)}</Avatar>
  );
};
NoAvatar.propTypes = {
  avatar:PropTypes.string,
  userName: PropTypes.string.isRequired,
};

NoAvatar.defaultProps = {
  avatar: ''
};
export default NoAvatar;