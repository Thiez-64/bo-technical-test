import React from 'react';
import { Form, Field } from 'react-final-form';

import { PrimaryButton } from '../../widgets/Buttons/Buttons';
import RenderTextInput from '../../Renderers/RenderTextInput';
import { loginImagePath, legalText } from '../../config';
import { palette } from '../../muiTheme';

import styles from './newPassword.module.scss';

const backGroundStyle = loginImagePath
  ? { backgroundImage: `url(${loginImagePath})` }
  : { backgroundColor: palette.primary.main };

function NewPasswordView({ onSubmit, errorMsg, isRequested, handleBack }) {
  const validate = (values) => {
    const errors = {};
    if (values.password?.length < 3) {
      errors.password = 'Too short (min 3 characters)';
    }
    if (values.password?.length > 50) {
      errors.password = 'Too long (max 50 characters)';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Please confirm password';
    }

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Password does not match';
    }

    return errors;
  };

  return (
    <div className={styles.loginWrapper} style={backGroundStyle}>
      {isRequested ? (
        <div className={styles.comfirmRequest}>
          <h4>Your password has been succefully updated</h4>
          <PrimaryButton label="Back to Login" onClick={() => handleBack()} />
        </div>
      ) : (
        <Form onSubmit={onSubmit} validate={validate}>
          {({ handleSubmit, invalid }) => {
            return (
              <form onSubmit={handleSubmit} className={styles.form}>
                <Field
                  name="password"
                  label="New Password"
                  type="password"
                  component={RenderTextInput}
                />
                <Field
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  component={RenderTextInput}
                />
                <PrimaryButton
                  label="Apply new password"
                  type="submit"
                  className={styles.btn}
                  disabled={invalid}
                />
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
export default NewPasswordView;
