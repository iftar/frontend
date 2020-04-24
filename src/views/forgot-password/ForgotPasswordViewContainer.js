import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { forgotPassword } from "../../store/password/actions";
import ForgotPasswordView from "./ForgotPasswordView";

const mapStateToProps = state => ({
  success: state.password.success,
  loading: state.password.loading,
  error: state.password.error
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ forgotPassword }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordView);
