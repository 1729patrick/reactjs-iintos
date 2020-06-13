import React, { useEffect, useState } from 'react';
import api from '~/services/api';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  TextareaAutosize,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Container, Detail } from './styles';
import { format } from 'date-fns';
function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = (await api.get('/news')).data;

      setNews(response);
    };

    fetch();
  }, []);

  return (
    <Container>
      <h1>News</h1>

      {news.map(new_ => (
        <ExpansionPanel defaultExpanded key={new_.id}>
          <ExpansionPanelSummary
            style={{ display: 'flex' }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h4>{new_.title}</h4>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            <Detail>
              <img src={new_?.image?.url}></img>

              <TextareaAutosize disabled defaultValue={new_.description} />

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span>
                  Created by {new_?.author?.name} at{' '}
                  {format(new Date(new_.createdAt), 'yyyy-MM-dd')}
                </span>
              </div>
            </Detail>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </Container>
  );
}

export default News;
