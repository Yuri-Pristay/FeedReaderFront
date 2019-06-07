import React from 'react';
import { Grid, Button, Segment } from 'semantic-ui-react';
import http from '../api/http';

const ShowArticle = (props) => {
    const articleUrl = props.history.location.query && props.history.location.query.url;
    if (!articleUrl) props.history.push('/feeds');
    const { article } = props.match.params;

    return (
        <Grid centered>
            <Grid.Column width={10}>
                <Button.Group size='large' attached='top'>
                    <Button positive onClick={() => props.history.push(`/feeds`)}>
                        Back to feeds
                    </Button>
                    <Button.Or />
                    <Button negative onClick={() => http.signOut(props)}>Sign Out</Button>
                </Button.Group>
                    <Segment attached>
                        <iframe 
                          title={article}
                          src={articleUrl}
                          style={{ width: '100%', minHeight: '80vh' }}
                        >
                        </iframe>
                    </Segment>
            </Grid.Column>
        </Grid>
    );
};
  
export default ShowArticle;
