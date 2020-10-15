import React, { useState, useEffect } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TextareaAutosize from 'react-textarea-autosize';

import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
import { Detail } from './styles';
import { PublicContainer as Container } from '~/styles/Sidebar';
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

    const files = [
      {
        name: 'Effective strategy - 1.pdf',
        path: '0a866cab0d0bfe72c1c0e02ad7b3d6f9.pdf',
        updatedAt: '2020-08-06T00:18:05.701Z',
        url:
          'https://iintoska2.ips.pt/api/files/0a866cab0d0bfe72c1c0e02ad7b3d6f9.pdf',
      },

      {
        name: 'Effective strategy - 2.pdf',
        path: 'a797d2f50dc027539904122147b7830a.pdf',
        updatedAt: '2020-08-06T00:17:36.548Z',
        url:
          'https://iintoska2.ips.pt/api/files/a797d2f50dc027539904122147b7830a.pdf',
      },

      {
        name: 'Effective strategy - 3.pdf',
        path: '7efa198a4b9bc52ff17a59b2c36df590.pdf',
        updatedAt: '2020-08-06T00:18:05.885Z',
        url:
          'https://iintoska2.ips.pt/api/files/7efa198a4b9bc52ff17a59b2c36df590.pdf',
      },
      {
        name: 'Effective strategy - 4.pdf',
        path: 'f3ffc874bc6ee47f8a66fec8ce009ef0.pdf',
        updatedAt: '2020-08-06T00:18:04.684Z',
        url:
          'https://iintoska2.ips.pt/api/files/f3ffc874bc6ee47f8a66fec8ce009ef0.pdf',
      },

      {
        name: 'Effective strategy - 5.pdf',
        path: '4bec1ab2ae3344d58021fc1fa3a1f6d4.pdf',
        updatedAt: '2020-08-06T00:18:04.908Z',
        url:
          'https://iintoska2.ips.pt/api/files/4bec1ab2ae3344d58021fc1fa3a1f6d4.pdf',
      },

      {
        name: 'Effective strategy - 6.pdf',
        path: '1013adc0f3956641bdabda5b581702d8.pdf',
        updatedAt: '2020-08-06T00:18:06.072Z',
        url:
          'https://iintoska2.ips.pt/api/files/1013adc0f3956641bdabda5b581702d8.pdf',
      },

      {
        name: 'Effective strategy - 7.pdf',
        path: '71bb259106ba5f186a0a135283f062f7.pdf',
        updatedAt: '2020-08-06T00:18:05.742Z',
        url:
          'https://iintoska2.ips.pt/api/files/71bb259106ba5f186a0a135283f062f7.pdf',
      },

      {
        name: 'Effective strategy - 8.pdf',
        path: '8d11f38253195379ed7ab467fb98e18a.pdf',
        updatedAt: '2020-08-06T00:18:00.892Z',
        url:
          'https://iintoska2.ips.pt/api/files/8d11f38253195379ed7ab467fb98e18a.pdf',
      },
      {
        name: 'Effective strategy - 9.pdf',
        path: '478e253b40b502629416dd59205960ce.pdf',
        updatedAt: '2020-08-09T16:46:13.833Z',
        url:
          'https://iintoska2.ips.pt/api/files/478e253b40b502629416dd59205960ce.pdf',
      },
      {
        name: 'Effective strategy - 10.pdf',
        path: '11c39ad01760c8e6816982167a61b8fc.pdf',
        updatedAt: '2020-09-13T17:47:27.618Z',
        url:
          'https://iintoska2.ips.pt/api/files/11c39ad01760c8e6816982167a61b8fc.pdf',
      },
    ];
    return (
      <div>
        <p>
          This is a practical User guide focused on providing strategies and
          pathways for schools to implement their own International Offices with
          the help of the products and processes developed by the IINTOS
          project.
        </p>
        <p>
          <h3>This User guide has four main components:</h3>
        </p>

        <h4>1. Catalogue of Effective Internationalization Strategies;</h4>
        <p>
          This catalogue provides access to strategies that were successful,
          including the ones from the IINTOS project pilot schools;
        </p>
        <div style={{ marginLeft: 15 }}>
          <FileList files={files} />
        </div>

        <h4>2. Guide on Framework for Exchange;</h4>
        <p>
          On the Framework for Exchange document (on Curricula matrix tool),
          there is a logical sequence of steps to take in order to start and
          develop the process of internationalization. This guide provides help
          on the use of the framework to find the main idea for an international
          project, comparing selected relevant documents using content analyses;
        </p>

        <div style={{ marginLeft: 15 }}>
          <a
            href="https://iintoska2.ips.pt/api/files/e6dfc32b962e0afafb5a29d074c9cf8d.pdf"
            target="_blank"
            style={{ marginRight: 10 }}
          >
            Guide on Framework for Exchange.pdf
          </a>
        </div>
        <h4>3. Platform tutorials;</h4>
        <p>
          A series of video tutorials on different aspect of the use of the
          IINTOS project platform, with a strong focus on the development of
          International Projects;
        </p>

        <div style={{ flexDirection: 'column', display: 'flex' }}>
          <iframe
            key={1}
            width="300"
            height="150"
            src="https://www.youtube.com/embed/mCxGxdAeTzU"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ marginTop: 25, borderRadius: 4, marginBottom: 10 }}
          />
          <iframe
            key={1}
            width="300"
            height="150"
            src="https://www.youtube.com/embed/I-e0uvMXDhg"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ marginTop: 25, borderRadius: 4, marginBottom: 10 }}
          />
          <iframe
            key={1}
            width="300"
            height="150"
            src="https://www.youtube.com/embed/WvM_52IKyFc"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ marginTop: 25, borderRadius: 4, marginBottom: 10 }}
          />
          <iframe
            key={1}
            width="300"
            height="150"
            src="https://www.youtube.com/embed/h0138Y8fZMk"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ marginTop: 25, borderRadius: 4, marginBottom: 10 }}
          />
          <iframe
            key={1}
            width="300"
            height="150"
            src="https://www.youtube.com/embed/HC2-n6G-fNs"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ marginTop: 25, borderRadius: 4, marginBottom: 10 }}
          />
        </div>

        <h4>
          4. Tutorials on implementation of international offices in schools.
        </h4>
        <p>
          Based on the experience and analysis on the entire process of
          international office implementation by the IINTOS project, a series of
          video were created focusing three key dimensions: strategic thinking,
          operation and pedagogy.
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
