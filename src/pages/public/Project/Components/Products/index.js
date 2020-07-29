import React, { useState, useEffect } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TextareaAutosize from 'react-textarea-autosize';

import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
import { Container, Detail } from './styles';
import api from '~/services/api';
import FileList from '~/components/FileList';

function Products() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await api.get('outputResults');
      setProducts(response.data);
    };

    fetchResults();
  }, []);

  const getDescriptionProduct6 = id => {
    if (id !== 6) return null;

    return (
      <div>
        <p>
          <b>This User guide has four main components:</b>
        </p>

        <p>1. Catalogue of Effective Internationalization Strategies;</p>

        <p>2. Guide on Framework for Exchange;</p>

        <p>3. Platform tutorials;</p>

        <p>
          4. Tutorials on implementation of international offices in schools.
        </p>

        <div style={{ flexDirection: 'column', display: 'flex' }}>
          <iframe
            key={1}
            width="300"
            height="150"
            src="https://www.youtube.com/embed/hqhwhFK7ekI"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ marginTop: 25, borderRadius: 4, marginBottom: 10 }}
          />
          <iframe
            key={1}
            width="300"
            height="150"
            src="https://www.youtube.com/embed/5nS-RqSIOKk"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ marginTop: 25, borderRadius: 4, marginBottom: 10 }}
          />
          <iframe
            key={1}
            width="300"
            height="150"
            src="https://www.youtube.com/embed/ApQIAXF2hIU"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ marginTop: 25, borderRadius: 4, marginBottom: 10 }}
          />
          <iframe
            key={1}
            width="300"
            height="150"
            src="https://www.youtube.com/embed/9TCRWwZV7f4"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ marginTop: 25, borderRadius: 4, marginBottom: 10 }}
          />
          <iframe
            key={1}
            width="300"
            height="150"
            src="https://www.youtube.com/embed/2w0tmEDXMOE"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ marginTop: 25, borderRadius: 4, marginBottom: 10 }}
          />
          <iframe
            key={1}
            width="300"
            height="150"
            src="https://www.youtube.com/embed/PPu4T46dY-E"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ marginTop: 25, borderRadius: 4, marginBottom: 10 }}
          />
        </div>
      </div>
    );
  };

  return (
    <Container>
      <h1>
        Within the scope of this project, the following materials were produced:
      </h1>
      {products.map(({ id, title, description, files }, index) => (
        <ExpansionPanel defaultExpanded={!index}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{title}</Typography>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            <Detail>
              {getDescriptionProduct6(id)}
              {id !== 6 && (
                <TextareaAutosize disabled defaultValue={description} />
              )}

              {files?.length === 1 && (
                <div>
                  {files?.map(({ url, name }) => (
                    <a href={url} target="_blank" style={{ marginRight: 10 }}>
                      {name}
                    </a>
                  ))}
                </div>
              )}

              {files?.length > 1 && (
                <div>
                  <FileList files={files} />
                </div>
              )}
            </Detail>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </Container>
  );
}

export default Products;
