// @flow
import { connect } from 'react-redux';
import Home from '../components/Home';

const mapStateToProps = state => {
  const current = state.tasks.rows.find(
    row => row.id === state.tasks.currentId
  );
  return {
    counting: state.tasks.counting,
    current
  };
};

export default connect(mapStateToProps)(Home);
