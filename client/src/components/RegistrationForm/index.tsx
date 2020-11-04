import {Button} from '@material-ui/core'
import {observer} from 'mobx-react'
import React from 'react'
import {Field, Form, Formik} from 'formik'
import Service from './service'
import {TextField} from 'formik-material-ui'

interface IProps {
}

const RegistrationForm = observer(
    class extends React.Component {
        private readonly service: Service

        constructor(props: IProps) {
            super(props)

            this.service = new Service()
        }

        render() {
            const {
                initialValues,
                handleSubmit,
                validateName,
                validateTag,
                validateEmail,
                validatePassword
            } = this.service

            return (
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Field
                            component={TextField}
                            name={'name'}
                            label={'Name'}
                            validate={validateName}
                        />
                        <Field
                            component={TextField}
                            name={'tag'}
                            label={'Tag'}
                            validate={validateTag}
                        />
                        <Field
                            component={TextField}
                            name={'email'}
                            label={'E-mail'}
                            validate={validateEmail}
                        />
                        <Field
                            component={TextField}
                            name={'password'}
                            label={'Password'}
                            type={'password'}
                            validate={validatePassword}
                        />
                        <Button type={'submit'}>Submit</Button>
                    </Form>
                </Formik>
            )
        }
    }
)

export default RegistrationForm
