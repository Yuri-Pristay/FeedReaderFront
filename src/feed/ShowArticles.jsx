import React, { useState, useEffect } from 'react';
import { Grid, Button, Segment, Message, Loader, Dimmer } from 'semantic-ui-react';
import ArticleList from './ArticleList';
import http from '../api/http';

const ShowArticles = (props) => {
    const [feedData, setFeedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect (() => {
        const feedUrl = props.history.location.query && props.history.location.query.url;
        if (!feedUrl) {
            props.history.push('/feeds');
            return () => {};
        }

        http.get(`/feeds?url=${feedUrl}`)
        .then(res => {
            setFeedData(res.data);
            setLoading(false);
        })
        .catch(err => {
            const errMessage = err.response ? 
              err.response.data.message : 'Oops, something went wrong!\nPlease try again!';
            setError(errMessage);
            setLoading(false);
        });
    }, [props.history]);

    return (
        <Grid centered>
            <Grid.Column width={10}>
                <Button.Group size='large' attached='top'>
                    <Button positive onClick={() => props.history.push('/feeds')}>Back to feeds</Button>
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
                        <ArticleList feedData={feedData} />}
                    </Segment>}
            </Grid.Column>
        </Grid>
    );
};
  
export default ShowArticles;
