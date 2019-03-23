// @flow
import { connect } from 'react-redux';
import Tasks from '../components/Tasks';

const mapStateToProps = state => ({
  rows: state.tasks.rows
});

export default connect(mapStateToProps)(Tasks);
