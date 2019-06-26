import { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

const Layout = ({ title, children }) => (
  <Fragment>
    <style jsx>{`
      .main-container {
        display: flex;
        justify-content: center;
      }
    `}</style>
    <Header title={title} />
    <div className='main-container'>
      {children}
    </div>
  </Fragment>
);
export default Layout;

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any
};

Layout.defaultProps = {
  title: '',
  children: null
};