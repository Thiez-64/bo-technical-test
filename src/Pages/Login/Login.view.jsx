import React from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { PrimaryButton } from '../../widgets/Buttons/Buttons';
import RenderTextInput from '../../Renderers/RenderTextInput';
import { loginImagePath, legalText } from '../../config';
import { palette } from '../../muiTheme';

import styles from './login.module.scss';

const backGroundStyle = loginImagePath
  ? { backgroundImage: `url(${loginImagePath})` }
  : { backgroundColor: palette.primary.main };
function LoginView({ onSubmit, errorMsg, handleBack }) {
  console.log('backGroundStyle', backGroundStyle);
  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Can't be empty";
    }
    if (!values.password) {
      errors.password = "Can't be empty";
    }
    return errors;
  };

  return (
    <div className={styles.loginWrapper} style={backGroundStyle}>
      <Form onSubmit={onSubmit} validate={validate} initialValues={{ username: '', password: '' }}>
        {({ handleSubmit, invalid, values }) => {
          console.log('values', values);
          return (
            <form onSubmit={handleSubmit} className={styles.form}>
              <Field name="username" label="Username" type="input" component={RenderTextInput} />
              <Field name="password" label="Password" type="password" component={RenderTextInput} />
              <div className={styles.link} onClick={() => handleBack()}>
                Forgot password ?
              </div>
              <PrimaryButton
                label="Login"
                type="submit"
                className={styles.btn}
                disabled={invalid}
              />
              <div className={styles.errorMsg}>{!!errorMsg && errorMsg}</div>
            </form>
          );
        }}
      </Form>
      <div className={styles.copyrightText}>{legalText}</div>
    </div>
  );
}
export default LoginView;

LoginView.propsType = {
  onSubmit: PropTypes.func,
  errorMsg: PropTypes.string,
  handleBack: PropTypes.func,
};
