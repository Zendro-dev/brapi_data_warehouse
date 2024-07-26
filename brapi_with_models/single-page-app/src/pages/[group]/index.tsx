import { GetStaticPaths, GetStaticProps } from 'next';
import { ModelLayout, PageWithLayout } from '@/layouts';
import { GroupUrlQuery } from '@/types/routes';
import { Typography, Link } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { useTranslation, Trans } from 'react-i18next';
import ClientOnly from '@/components/client-only';
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useSession } from 'next-auth/react';

export const getStaticPaths: GetStaticPaths<GroupUrlQuery> = async () => {
  return {
    paths: [{ params: { group: 'models' } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<GroupUrlQuery> = async (
  context
) => {
  const { group } = context.params as GroupUrlQuery;

  return {
    props: {
      key: group,
      group,
    },
  };
};

const ModelsHome: PageWithLayout<GroupUrlQuery> = ({ group }) => {
  useSession();
  const classes = useStyles();
  const { t } = useTranslation();


  return (
    <main className={classes.main}>
      <ClientOnly>
        <div className={classes.cardContainer} >
          
          </div>
          <div className={classes.cardContainer} >
          <Typography variant="h5" component="div" gutterBottom style={{ marginTop: '3rem' }}>
            <Trans
                i18nKey='home.general-title'
                components={{ 1: <Link href="https://www.cassavabase.org/" target="_blank" rel="noopener noreferrer" />               }}
              />            
              
            </Typography>
            <Typography variant="body1" color="text.secondary" style={{ marginTop: '1rem' }}>
              <Trans
                i18nKey='home.general-info'
                components={{ 1: <Link href="https://zendro-dev.github.io/" target="_blank" rel="noopener noreferrer" />,
                            2: <Link href="https://github.com/Zendro-dev" target="_blank" rel="noopener noreferrer" />
                }}
              />
            </Typography>
          <Typography variant="h5" component="div" gutterBottom style={{ marginTop: '2rem' }}>
            Getting started
          </Typography>
            <Typography variant="body1" color="text.secondary" style={{ marginTop: '1rem' }}>
              <Trans
                i18nKey='home.getting-started'
                components={{ 1: <Link href="https://brapi.org/specification" target="_blank" rel="noopener noreferrer" />,
                            2: <Link href="https://zendro-dev.github.io/usage/spa" target="_blank" rel="noopener noreferrer" />
                }}
              />
              <br/><br/>{t('home.starting-point')}
              <ul >
                <li>{t('home.l1')}</li>
                <li>{t('home.l2')}</li>
                <li>{t('home.l3')}</li>
              </ul>
              {t('home.example')}
              <ul>
                <li>Trial → Studies → Observations</li>
                <li>{t('home.goto')}</li>
                
              </ul>
              <Trans
                i18nKey='home.plots'
                components={{ 1: <Link href="https://brapi-gui.zendro-dev.org/plots" target="_blank" rel="noopener noreferrer" />                }}
              />
              <br/><br/>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{ '& .MuiTypography-root': { color: 'rgba(0, 0, 0, 0.6)' } }}
                >
                  {t('home.models')}
                </AccordionSummary>
                <AccordionDetails>
                  <ul>
                    <li>AdditionalInfo</li>
                    <li>Coordinates</li>
                    <li>Cross</li>
                    <li>CrossAttributes</li>
                    <li>CrossingProject</li>
                    <li>Date</li>
                    <li>Donors</li>
                    <li>Event</li>
                    <li>ExperimentalDesign</li>
                    <li>ExternalReferences</li>
                    <li>Germplasm</li>
                    <li>Image</li>
                    <li>ImageLocation</li>
                    <li>Location</li>
                    <li>MarkerPosition</li>
                    <li>Ontology</li>
                    <li>OntologyReference</li>
                    <li>Parent</li>
                    <li>Person</li>
                    <li>Program</li>
                    <li>Reference</li>
                    <li>ReferenceSet</li>
                    <li>Season</li>
                    <li>SeedLot</li>
                    <li>Species</li>
                    <li>Study</li>
                    <li>Synonyms</li>
                    <li>Trait</li>
                    <li>Trial</li>
                  </ul>
                </AccordionDetails>
              </Accordion>
      
              <br/><br/>{t('home.allmodels')}
              <br></br><br></br>
              <Trans
                i18nKey='home.graphql'
                components={{ 1: <Link href="https://brapi-graphql.zendro-dev.org/graphql" target="_blank" rel="noopener noreferrer" />,
                            3: <Link href="https://zendro-dev.github.io/usage/graphql" target="_blank" rel="noopener noreferrer" />,
                            2: <Link href="https://zendro-dev.github.io/api_root/graphql" target="_blank" rel="noopener noreferrer" />,
                            4: <Link href="https://graphql.org/" target="_blank" rel="noopener noreferrer" />

                }}
              />

              <br/><br/><h5>{t('home.ref')}</h5>
              <ol>
                <li>
                Fernandez-Pozo N, Menda N, Edwards JD, Saha S, Tecle IY, Strickler SR, Bombarely A, Fisher-York T, Pujar A, Foerster H, Yan A, Mueller LA. The Sol Genomics Network (SGN)—from genotype to phenotype to breeding. (2015) Nucleic Acids Res. Volume 43 (Database issue):D1036-41. <a href="https://pubmed.ncbi.nlm.nih.gov/25428362/" target="_blank" rel="noopener noreferrer">PubMed</a>.
                </li>
                <li>https://www.cassavabase.org/help</li>
              </ol>
            </Typography>
            
              
          </div>
          
        </ClientOnly>
    </main>
  );
};
ModelsHome.layout = ModelLayout;
export default ModelsHome;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      
      //display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: 'auto', // Asegura que el contenedor cubra al menos la altura completa de la vista
      overflowX: 'hidden', // Evita el desbordamiento horizontal
      overflowY: 'auto',
      // Spacing
      padding: theme.spacing(4, 8),
      [theme.breakpoints.up('sm')]: {
        justifyContent: 'space-evenly',
      },
    },

    cardContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      // maxWidth: theme.breakpoints.values.md,
      maxWidth: '90%',
      marginLeft: '5%',
      marginTop: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        maxWidth: '80%',
        marginLeft: '10%',
      },
    },

    card: {
      // Dimensions
      width: '100%',

      // Spacing & Layout
      margin: theme.spacing(2, 0),
      padding: theme.spacing(2, 0),

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(2, 8),
        flexBasis: '40%',
        '&:nth-child(even)': {
          marginLeft: theme.spacing(2),
        },
      },

      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(2, 7),
      },

      // Palette & Typography
      '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.background,
      },

      '& h1': {
        ...theme.typography.h6,
        color: theme.palette.primary.dark,
        fontWeight: 'bold',
        [theme.breakpoints.up('sm')]: {
          ...theme.typography.h5,
          color: theme.palette.primary.dark,
          fontWeight: 'bold',
        },
      },
    },
  })
);
