
import { Avatar, Tag } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import './index.less';


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
          {props.title}
        </Link>
      </h1>
      
      {/* <p className='desc'>dwadwaddwawadawdawdawdawdawdawdawadawdawdawdawdawdawdawadawdawdawdawdawdawdawdawd</p> */}
      <div className='bottom-info'>
        <Tag>Tag 1</Tag>·
        <span>dwad</span>·
        <span>dwad</span>
      </div>
    </div>
  </div>
);
TopicItem.propTypes = {
  title: PropTypes.string.isRequired
};
export default TopicItem;