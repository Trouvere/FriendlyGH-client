/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css';
import Button from '../../../components/Button';
import { getChatsApi } from '../../../API';
import { requestAllInterest } from '../../../store/reducers/InterestReducer';
import { setRecommendedChatsAndChatsToStateIdle } from '../../../store/reducers/ChatsReducer';
import { InputForFormik, SelectForFormik } from '../../../components/ForFormik';
import ErrorMessage from '../../../components/ErrorMessage';

const AddChatForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const { interests, statusInterest } = useSelector((state) => ({
    interests: state.interestData.allInterest,
    statusInterest: state.interestData.status
  }));
  useEffect(() => {
    if (statusInterest === 'idle') {
      dispatch(requestAllInterest());
    }
  }, [statusInterest]);
  const interestsIdsNames = interests.map((el) => ({
    id: el.id,
    name: el.name
  }));
  const [isFetching, setIsFetching] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: '',
        link: '',
        messenger: '',
        id: '',
        interest: ''
      }}
      validationSchema=""
      onSubmit={async (data) => {
        setIsFetching(true);
        try {
          await getChatsApi.postNewChat({
            name: data.name,
            link: data.link,
            messenger: data.messenger,
            id: data.id,
            interest: data.interest
          });

          dispatch(setRecommendedChatsAndChatsToStateIdle());
          onSubmit();
          setShowError(false);
        } catch (error) {
          setShowError(true);
        } finally {
          setIsFetching(false);
        }
      }}
    >
      {() => (
        <div className={styles.formWrapper}>
          <div className={styles.loginWrapper}>
            <Form className={styles.loginForm}>
              <h3 className={styles.loginTitle}>Add Chat</h3>
              <InputForFormik
                label="name chat"
                name="name"
                placeholder="name chat"
                colorLabel="black"
              />
              <InputForFormik
                label="link chat"
                name="link"
                placeholder="link"
                colorLabel="black"
              />
              <InputForFormik
                label="messenger"
                name="messenger"
                placeholder="messenger"
                colorLabel="black"
              />
              <InputForFormik
                label="id chat"
                name="id"
                placeholder="id"
                colorLabel="black"
              />
              <SelectForFormik
                options={interestsIdsNames}
                name="interest"
                colorLabel="black"
              />
              <div className={styles.buttonRow}>
                <Button color="white" type="submit" isLoading={isFetching}>
                  add Chat
                </Button>
                {showError && (
                  <ErrorMessage typeError="formError">
                    Chat was not added
                  </ErrorMessage>
                )}
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default AddChatForm;

AddChatForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
