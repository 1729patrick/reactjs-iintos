import React from 'react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';

import { useUserContext } from '~/context/UserContext';
import api from '~/services/api';
import validationSchema from '~/validations/updateUser';

import Input from '~/components/Input';
import Button from '~/components/Button';

import { Container, Form, FileInput } from './styles';

export default function Profile() {
  const { user, setUser, token, school } = useUserContext();

  const onSubmit = async values => {
    try {
      const formattedValues = { ...values, avatarId: values.avatar?.saved?.id };

      await api.put(`/users/${user.id}`, formattedValues);

      setUser({
        token,
        school,
        user: { ...user, avatar: formik.values?.avatar?.file },
      });
      // /setItem('user', user);
      toast.success('User updated with success!');
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };
  const formik = useFormik({
    onSubmit,
    validationSchema,
    initialValues: { ...user, avatar: { file: user.avatar } },
  });

  const onFileUpload = async ({ target }) => {
    const [file] = target.files;

    const formData = new FormData();

    formData.append('file', file);

    const response = await api.post('/files', formData);

    formik.setFieldValue('avatar', {
      saved: response.data,
      file: URL.createObjectURL(file),
    });
  };

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <div>
          <FileInput
            label="Avatar"
            name="avatar"
            file={formik.values?.avatar?.file}
            onChange={onFileUpload}
            values={formik.values}
            errors={formik.errors}
            touched={formik.touched}
            imagePreview
          />
          <Input
            label="Name"
            name="name"
            placeholder="Name"
            onChange={formik.handleChange}
            values={formik.values}
            errors={formik.errors}
            touched={formik.touched}
            submitted={formik.submitCount}
          />
          <Input
            label="E-mail"
            name="email"
            placeholder="E-mail"
            onChange={formik.handleChange}
            values={formik.values}
            errors={formik.errors}
            touched={formik.touched}
            submitted={formik.submitCount}
          />
          <Input
            label="Password"
            name="oldPassword"
            placeholder="Passowrd"
            type="password"
            onChange={formik.handleChange}
            values={formik.values}
            errors={formik.errors}
            touched={formik.touched}
            submitted={formik.submitCount}
          />
          <Input
            label="New Password"
            name="password"
            placeholder="New Passowrd"
            type="password"
            onChange={formik.handleChange}
            values={formik.values}
            errors={formik.errors}
            touched={formik.touched}
            submitted={formik.submitCount}
          />

          <Button title="Save" type="submit" />
        </div>
      </Form>
    </Container>
  );
}
