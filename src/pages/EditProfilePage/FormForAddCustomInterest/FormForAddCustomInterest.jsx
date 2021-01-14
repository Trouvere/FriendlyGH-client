import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css';
import Button from '../../../components/Button';
import { interestApi } from '../../../API';

import { requestAllTag } from '../../../store/reducers/TagReducer';
import { InputForFormik, SelectForFormik } from '../../../components/ForFormik';
import { setInterestStatusToStateIdle } from '../../../store/reducers/InterestReducer';

const FormForAddCustomInterest = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const { tags, statusTag, userRole } = useSelector((state) => ({
    tags: state.tagData.allTag,
    statusTag: state.tagData.status,
    userRole: state.profileData.profile.role
  }));
  const isAdmin = userRole === 'admin';
  useEffect(() => {
    if (isAdmin && statusTag === 'idle') {
      dispatch(requestAllTag());
    }
  }, [isAdmin, statusTag]);
  const tagsIdsNames = tags.map((el) => ({
    id: el.id,
    name: el.name
  }));
  const [isFetching, setIsFetching] = useState(false);
  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: '',
        id: '',
        tag: ''
      }}
      validationSchema=""
      onSubmit={async (data) => {
        setIsFetching(true);
        try {
          if (isAdmin) {
            await interestApi.postNewInterestForAdmin({
              name: data.name,
              id: data.id,
              tag: data.tag
            });
          } else {
            await interestApi.postNewInterest({
              name: data.name
            });
          }
          dispatch(setInterestStatusToStateIdle());
          onSubmit();
        } catch (error) {
          console.log(error);
        } finally {
          setIsFetching(false);
        }
      }}
    >
      {() => (
        <div className={styles.formWrapper}>
          <div className={styles.loginWrapper}>
            <Form className={styles.loginForm}>
              <h3 className={styles.loginTitle}>Add CustomInterests</h3>
              <InputForFormik
                label="name CustomInterests"
                name="name"
                placeholder="name CustomInterests"
              />
              {isAdmin && (
                <>
                  <InputForFormik
                    label="id CustomInterests"
                    name="id"
                    placeholder="id"
                  />
                  <SelectForFormik options={tagsIdsNames} name="tag" />
                </>
              )}

              <div className={styles.buttonRow}>
                <Button color="white" type="submit" isLoading={isFetching}>
                  add CustomInterests
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default FormForAddCustomInterest;

FormForAddCustomInterest.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
