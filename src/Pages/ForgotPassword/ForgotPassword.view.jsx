import React from 'react';
import { Form, Field } from 'react-final-form';
import { PrimaryButton, DangerButton } from '../../widgets/Buttons/Buttons';

import RenderTextInput from '../../Renderers/RenderTextInput';
import { loginImagePath, legalText } from '../../config';
import { palette } from '../../muiTheme';

import styles from './forgotPassword.module.scss';

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const backGroundStyle = loginImagePath
  ? { backgroundImage: `url(${loginImagePath})` }
  : { backgroundColor: palette.primary.main };

function ForgotPasswordView({ onSubmit, errorMsg, isRequested, handleBack }) {
  const validate = (values) => {
    const errors = {};
    if (!values?.username) {
      errors.email = 'Required';
    } else if (!!values.email && !validateEmail(values.email)) {
      errors.email = 'Invalid Email';
    }
    return errors;
  };

  return (
    <div className={styles.loginWrapper} style={backGroundStyle}>
      {isRequested ? (
        <div className={styles.comfirmRequest}>
          <h4>A new password has been succefully requested</h4>
          <p>Please check your email inbox.</p>
          <p>
            <br /> You will receive a message with reset instructions.
          </p>
          <PrimaryButton label="Back to Login" onClick={() => handleBack()} />
        </div>
      ) : (
        <Form onSubmit={onSubmit} validate={validate}>
          {({ handleSubmit, invalid }) => {
            return (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div>{"Please enter your account's email"}</div>
                <Field name="username" label="Email" type="input" component={RenderTextInput} />
                <PrimaryButton
                  label="Reset Password"
                  type="submit"
                  className={styles.btn}
                  disabled={invalid}
                />
                <DangerButton label="Cancel" onClick={() => handleBack()} />

                <div className={styles.errorMsg}>{!!errorMsg && errorMsg}</div>
              </form>
            );
          }}
        </Form>
      )}

      <div className={styles.copyrightText}>{legalText}</div>
    </div>
  );
}
export default ForgotPasswordView;
