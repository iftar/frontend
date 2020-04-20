import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SignUpView from './SignUpView';
import {login} from '../../store/auth/actions';


const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({login}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(SignUpView)