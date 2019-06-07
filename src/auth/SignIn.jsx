import React, { useState } from 'react';
import { Grid, Form, Button, Segment, Message } from 'semantic-ui-react';
import http from '../api/http';

const SignIn = (props) => {
    if (http.getToken()) props.history.push('/feeds');
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const SubmitUserData = (e) => {
        setLoading(true);
        setError('');
        const username = e.target[0].value, password = e.target[1].value;

        http.post('/signin',{ username, password })
        .then((res) => {
            setLoading(false);
            localStorage.setItem('access-token', res.headers['access-token']);
            props.history.push('/feeds'); 
        })
        .catch(err => {
            const errMessage = err.response ? 
              err.response.data.message : 'Oops, something went wrong!\nPlease try again!';
            setLoading(false);
            setError(errMessage);
        });
    }

    return (
        <Grid centered style={{ marginTop: '12vh' }}>
            <Grid.Column width={6}>
                <Segment>
                    <Form onSubmit={SubmitUserData}>
                        <Form.Input
                          icon='user'
                          iconPosition='left'
                          type='text'
                          label='Username' 
                          placeholder='Username'
                          value={username}
                          onChange={handleUsernameChange}
                          required 
                        />
                        <Form.Input 
                          icon='lock'
                          iconPosition='left'
                          type='password'
                          label='Password' 
                          placeholder='Password'
                          value={password}
                          onChange={handlePasswordChange}
                          required 
                        />
                        <Message
                          negative
                          hidden={!error}
                          header='Error!'
                          content={error}
                        />
                        <Button 
                          type='submit'
                          size="large"
                          positive
                          loading={loading}
                          style={{ display: 'block', margin: '0 auto' }}
                        >
                          Sign In
                        </Button>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    );
}

export default SignIn;
