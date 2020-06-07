import React, { useState, useEffect } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TextareaAutosize from 'react-textarea-autosize';

import { Container, Detail, Session } from './styles';
import api from '~/services/api';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
import { format } from 'date-fns';

function Events() {
  const classes = useStyles();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await api.get('events');
      setEvents(response.data);
    };

    fetchResults();
  }, []);

  return (
    <Container>
      <h1>Within the scope of this project, the following events were held:</h1>
      {events.map(({ title, description, files, date, sessions }, index) => (
        <ExpansionPanel defaultExpanded={!index}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              <h2>
                {title} - <span>{format(new Date(date), 'yyyy-MM-dd')}</span>
              </h2>
            </Typography>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            <Detail>
              <span>
                {files[0]?.url && <img src={files[0]?.url}></img>}

                <TextareaAutosize disabled defaultValue={description} />
              </span>
              <div>
                {sessions?.map((session, index) => (
                  <Session>
                    <h1>
                      Session {index + 1}: <span>{session.title}</span>
                      <span
                        style={{
                          color: '#666',
                          marginLeft: 'auto',
                          fontSize: 14,
                        }}
                      >
                        {format(new Date(session.date), 'yyyy-MM-dd')}
                      </span>
                    </h1>

                    <TextareaAutosize
                      disabled
                      defaultValue={session.description}
                    />

                    {session.files?.length ? (
                      <div>
                        Docs:{' '}
                        {session.files?.map(({ url, name }) => (
                          <a href={url} target="_blank">
                            {name}
                          </a>
                        ))}
                      </div>
                    ) : null}

                    {session.links?.length ? (
                      <div>
                        Links:{' '}
                        {session.links?.map(link => (
                          <a href={link} target="_blank">
                            {link}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </Session>
                ))}
              </div>
            </Detail>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </Container>
  );
}

export default Events;
