
import { Avatar, Tag } from 'antd';
import Link from 'next/link';
import './index.less';

const TopicItem = () => (
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
          dwadwaddwadwadwawadawdawdawdawdawdawdawadawdawdawdawdawdawdadwadawdawdwad
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
export default TopicItem;