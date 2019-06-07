import React, { useState, useEffect } from 'react';
import { Grid, Button, Segment, Message, Loader, Dimmer } from 'semantic-ui-react';
import FeedList from './FeedList';
import http from '../api/http';

const FeedContainer = (props) => {
    const [feedData, setFeedData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect (() => {
        http.get('/feeds')
        .then((res) => {
            setFeedData(res.data);
            setLoading(false);
        })
        .catch(err => {
            const errMessage = err.response ? 
              err.response.data.message : 'Oops, something went wrong!\nPlease try again!';
            setError(errMessage);
            setLoading(false);
        });
    }, [loading, error]);

    return (
        <Grid centered>
            <Grid.Column width={10}>
                <Button.Group size='large' attached='top'>
                    <Button positive onClick={() => props.history.push('/addNewFeed')}>Add new feed</Button>
                    <Button.Or />
                    <Button negative onClick={() => http.signOut(props)}>Sign Out</Button>
                </Button.Group>
                    {loading ? 
                    <Dimmer active inverted style={{marginTop: '20%'}}>
                        <Loader>Loading</Loader>
                    </Dimmer> :
                    <Segment attached>
                        {error ? 
                        <Message
                          negative
                          hidden={!error}
                          header='Error!'
                          content={error}
                        /> :
                        <FeedList setLoading={setLoading} feedData={feedData} setError={setError} />}
                    </Segment>}
            </Grid.Column>
        </Grid>
    );
}

export default FeedContainer;
