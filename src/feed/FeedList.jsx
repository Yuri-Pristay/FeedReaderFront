import React from 'react';
import { Container, Button, Segment, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import http from '../api/http';

const FeedList = ({ feedData, setLoading, setError }) => {

    const deleteReq = (feedId, feedItemId) => {
        http.delete('/deletefeed', { feedId, feedItemId })
        .then(() => {
            setLoading(true);
        })
        .catch((err) => {
            const errMessage = err.response ? 
              err.response.data.message : 'Oops, something went wrong!\nPlease try again!';
            setError(errMessage);
        });
    };

    return (
        <Container>
            <Segment>
                <List divided>
                    {feedData.map(item => {
                        return item.feeds.map(feed => (
                            <List.Item key={feed._id}>
                                <List.Content floated='right'>
                                    <Button 
                                      icon='times' 
                                      color='red' 
                                      onClick={() => deleteReq(item._id, feed._id)}
                                    >
                                    </Button>
                                </List.Content>
                                <List.Content 
                                  as={Link}
                                  to={{ pathname: `/feeds/${feed.title}`, query: { url: feed.url } }}
                                >
                                  {feed.title}
                                </List.Content>
                                <List.Content>Added by: {item.username}</List.Content>
                            </List.Item>
                        ));
                    })}
                </List>
            </Segment>
        </Container>
    );
}

export default FeedList;
