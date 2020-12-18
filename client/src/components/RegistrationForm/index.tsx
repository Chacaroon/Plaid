import {Box, Button, Grid, MenuItem, Paper, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'
import React from 'react'
import {Field, Form, Formik} from 'formik'
import Service from './service'
import {TextField, Checkbox, Select} from 'formik-material-ui'

interface IProps {
}

const fieldStyle = {
  width: '100%',
  marginBottom: '10px'
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
        validatePassword,
        categories
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
                          name={'name'}
                          label={'Name'}
                          validate={validateName}
                        />
                        <Field
                          style={fieldStyle}
                          component={TextField}
                          name={'tag'}
                          label={'Tag'}
                          validate={validateTag}
                        />
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
                          validate={validatePassword}
                        />
                        <Field
                          style={fieldStyle}
                          component={Select}
                          name={'category'}
                          label={'Category'}
                        >
                          {categories.map((cat,i) => <MenuItem key={i} value={cat}>{cat}</MenuItem>)}
                        </Field>
                        <Grid item container justify={'center'}
                              alignItems={'center'} style={fieldStyle}>
                          <Typography>I am a creator</Typography>
                          <Field
                            component={Checkbox}
                            type='checkbox'
                            name={'isCreator'}
                            label={'isCreator'}
                          />
                        </Grid>
                        <Button type={'submit'}
                                variant={'contained'}>Submit</Button>
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

export default RegistrationForm
