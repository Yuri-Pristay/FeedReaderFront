import React, { useState } from 'react';
import { Grid, Form, Button, Segment, Message } from 'semantic-ui-react';
import http from '../api/http';

const AddNewFeed = (props) => {
    const [username, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleUrlChange = (e) => setUrl(e.target.value);

    const SubmitFeedData = (e) => {
        setLoading(true);
        setError('');
        const username = e.target[0].value, title = e.target[1].value, url = e.target[2].value;

        http.post('/registerfeed', { username, title, url })
        .then(() => {
            setLoading(false);
            props.history.push('/feeds'); 
        })
        .catch(err => {
            const errMessage = err.response ? 
              err.response.data.message : 'Oops, something went wrong!\nPlease try again!';
            setLoading(false);
            setError(errMessage);
        });
    };

    return (
        <Grid centered style={{ marginTop: '12vh' }}>
            <Grid.Column width={6}>
                <Segment>
                    <Form onSubmit={SubmitFeedData}>
                        <Form.Input
                          type='text'
                          label='Username' 
                          placeholder='Username'
                          value={username}
                          onChange={handleUsernameChange}
                          required 
                        />
                        <Form.Input 
                          type='text'
                          label='Title' 
                          placeholder='Title'
                          value={title}
                          onChange={handleTitleChange}
                          required 
                        />
                        <Form.Input 
                          type='text'
                          label='Url' 
                          placeholder='https://www.google.com'
                          value={url}
                          onChange={handleUrlChange}
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
                          Add
                        </Button>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    );
}

export default AddNewFeed;