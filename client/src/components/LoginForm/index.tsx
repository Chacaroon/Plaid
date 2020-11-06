import {Box, Button, Grid, Paper} from '@material-ui/core'
import {observer} from 'mobx-react'
import React from 'react'
import {Field, Form, Formik} from 'formik'
import Service from './service'
import {TextField} from 'formik-material-ui'

interface IProps {
}

const fieldStyle = {
    width: '100%',
    marginBottom: '10px'
}

const LoginForm = observer(
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
                validateEmail
            } = this.service

            return (
                <Box mt={6}>
                    <Grid container justify={'center'}>
                        <Grid item xs={3}>
                            <Paper>
                                <Box p={2}>
                                    <Formik
                                        initialValues={initialValues}
                                        onSubmit={handleSubmit}
                                    >
                                        <Form>
                                            <Grid container direction={'column'}
                                                  alignItems={'center'}>
                                                <Field
                                                    style={fieldStyle}
                                                    component={TextField}
                                                    name={'email'}
                                                    label={'E-mail'}
                                                    validate={validateEmail}
                                                />
                                                <Field
                                                    style={fieldStyle}
                                                    component={TextField}
                                                    name={'password'}
                                                    label={'Password'}
                                                    type={'password'}
                                                />
                                                <Button variant={'contained'}
                                                        type={'submit'}>Submit</Button>
                                            </Grid>
                                        </Form>
                                    </Formik>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            )
        }
    }
)

export default LoginForm
