import React, { useState, useEffect } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TextareaAutosize from 'react-textarea-autosize';

import { Container, Detail } from './styles';
import api from '~/services/api';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';

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

  return (
    <Container>
      <h1>
        Within the scope of this project, the following materials were produced:
      </h1>
      {products.map(({ title, description, files }, index) => (
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
              <TextareaAutosize disabled defaultValue={description} />
            </Detail>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </Container>
  );
}

export default Products;
