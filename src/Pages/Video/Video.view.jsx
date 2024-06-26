import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import Modal from '@material-ui/core/Modal';
import Section from '../../widgets/Section';
import SubSection from '../../widgets/SubSection';
import RenderTextInput from '../../Renderers/RenderTextInput';
import { PrimaryButton } from '../../widgets/Buttons/Buttons';

import styles from './video.module.scss';
function VideoView({
  title,
  description,
  onSubmit,
  isOpen,
  setIsOpen,
  setDetail,
  initialValues,
  isEdit,
  setIsEdit,
}) {
  return (
    <div style={{ padding: '0px 10px', marginBottom: '40px' }}>
      <Section label="Video">
        {isEdit ? (
          <Form onSubmit={onSubmit} initialValues={initialValues}>
            {({ handleSubmit }) => {
              return (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <Field name="title" label="Title" type="input" component={RenderTextInput} />
                  <Field
                    name="description"
                    label="Description"
                    type="input"
                    component={RenderTextInput}
                  />
                  <PrimaryButton label="Confirm" type="submit" />
                </form>
              );
            }}
          </Form>
        ) : (
          <>
            <SubSection label={`Title: ${title}`} />
            <SubSection label={`Description: ${description}`} />
            <PrimaryButton
              label="Edit"
              type="submit"
              onClick={() => {
                setIsEdit(true);
                setDetail({ title: '', description: '' });
              }}
            />
          </>
        )}
      </Section>

      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div className={styles.modal}>
          <p>{`Title: ${title}`}</p>
          <p>{`Description: ${description}`}</p>
        </div>
      </Modal>
    </div>
  );
}
export default VideoView;

VideoView.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onSubmit: PropTypes.func,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  setDetail: PropTypes.func,
  initialValues: PropTypes.object,
  isEdit: PropTypes.bool,
  setIsEdit: PropTypes.func,
};
