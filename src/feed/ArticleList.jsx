import React from 'react';
import { Container, Segment, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ArticleList = (props) => (
    <Container>
        <Segment>
            <List divided>
            {props.feedData.items.map(item => (
                <List.Item key={Date.now()}>
                    <List.Content 
                        as={Link}
                        to={{ pathname: `/feeds/${props.feedData.title}/${item.title}`, query: { url: item.link } }}
                        style={{ overflow: 'hidden' }}
                    >
                        {item.title}
                    </List.Content>
                    <List.Content>Published: {item.pubDate}</List.Content>
                </List.Item>
            ))}
            </List>
        </Segment>
    </Container>
);

export default ArticleList;