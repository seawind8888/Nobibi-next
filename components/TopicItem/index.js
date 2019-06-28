
import { Avatar, Tag } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import './index.less';
import timer from '../../utils/timer';


const TopicItem = (props) => (
  <div className='topic-container'>
    <div className='left-item'>
      <Avatar 
        size={64} 
        icon='user'/>
    </div>
    <div className='right-item'>
      <h1>
        <Link 
          href='/topic/1'>
          <a>
            {props.title}
          </a>
          
        </Link>
      </h1>
      <div className='bottom-info'>
        <Tag>{props.category[0]}</Tag>·
        <span className='info-item'>{props.userName}</span>·
        <span className='info-item'>{timer(Date.parse(props.updateTime))}</span>
      </div>
    </div>
  </div>
);
TopicItem.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.array.isRequired,
  userName: PropTypes.string.isRequired,
  updateTime: PropTypes.string.isRequired
};
export default TopicItem;