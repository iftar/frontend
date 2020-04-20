import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {login} from '../../store/auth/actions';
import LoginView from './LoginView';


const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({login}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginView)