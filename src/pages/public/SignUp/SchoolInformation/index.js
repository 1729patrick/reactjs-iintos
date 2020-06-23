import React, { useMemo, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import Input from '~/components/Input';
import Button from '~/components/Button';
import Select from '~/components/Select';
import FileInput from '~/components/FileInput';

import {
  coordinator as validationSchemaCoordinator,
  prof as validationSchemaProf,
} from '~/validations/schoolInformation';

import api from '~/services/api';

import { Container, Content } from './styles';

const SchoolInformation = ({ location, history }) => {
  const user = useMemo(() => location.state, [location]);
  const coordinator = useMemo(() => user.coordinator, [user]);
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const registration = localStorage.getItem(
      'registration_school_information'
    );

    if (registration) {
      const values = JSON.parse(registration);

      formik.setValues(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function loadSchools() {
      const response = await api.get('/schools', { params: { active: true } });

      setSchools(response.data);
    }

    loadSchools();
  }, []);

  const initFormik = () => {
    if (coordinator)
      return {
        initialValues: {
          name: '',
          phone: '',
          country: '',
          city: '',
          postalCode: '',
          fileVerification: '',
        },
        validationSchema: validationSchemaCoordinator,
      };

    return {
      initialValues: {
        schoolId: '',
      },
      validationSchema: validationSchemaProf,
    };
  };

  const submitForm = async ({ fileVerification, ...school }) => {
    try {
      localStorage.setItem(
        'registration_school_information',
        JSON.stringify(formik.values)
      );

      const userData = fileVerification
        ? { ...user, fileVerificationId: fileVerification.id }
        : user;

      await api.post('/signup', {
        school,
        user: userData,
      });

      toast.success('Account created with success');
      localStorage.clear();
      history.push('/await_verification');
    } catch ({ response }) {
      toast.error(response?.data?.error || 'Invalid data');
    }
  };

  const formik = useFormik({
    ...initFormik(),
    onSubmit: submitForm,
  });

  const onFileUpload = async ({ target }) => {
    const [file] = target.files;

    const formData = new FormData();

    formData.append('file', file);

    const response = await api.post('/files', formData);

    formik.setFieldValue('fileVerification', response.data);
  };

  return (
    <Container>
      <Content>
        <h1>Create your account</h1>

        <form onSubmit={formik.handleSubmit}>
          {coordinator ? (
            <>
              <Input
                label="School name"
                type="text"
                name="name"
                placeholder="Type your school name"
                onChange={formik.handleChange}
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
              />

              <Input
                label="School phone"
                type="number"
                name="phone"
                placeholder="Type your school phone"
                onChange={formik.handleChange}
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
              />
              <Input
                label="School country"
                type="text"
                name="country"
                placeholder="Type your school country"
                onChange={formik.handleChange}
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
              />
              <Input
                label="School city"
                type="text"
                name="city"
                placeholder="Type your school city"
                onChange={formik.handleChange}
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
              />
              <Input
                label="School postal code"
                type="text"
                name="postalCode"
                placeholder="Type your school postal code"
                onChange={formik.handleChange}
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
              />

              <FileInput
                label="Coordinator Verification"
                name="fileVerification"
                placeholder={
                  formik.values?.fileVerification?.name || 'Attachment file'
                }
                onChange={onFileUpload}
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
              />
            </>
          ) : (
            <Select
              label="School"
              placeholder="Select your school"
              name="schoolId"
              onChange={formik.handleChange}
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              submitted={formik.submitCount}
              options={schools}
            />
          )}

          <Button title="Create account" type="submit" />
        </form>
      </Content>
    </Container>
  );
};

export default withRouter(SchoolInformation);
