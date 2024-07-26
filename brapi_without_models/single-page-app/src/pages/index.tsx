import Image from 'next/image';

import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { AppLayout, PageWithLayout } from '@/layouts';
import { useTranslation, Trans } from 'react-i18next';
import ClientOnly from '@/components/client-only';
import { Button } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import { Container, Typography, Link, Card, CardContent } from '@mui/material';

import { useSession, signIn } from 'next-auth/react';

import { BASEPATH } from '@/config/globals';

const Home: PageWithLayout = () => {
  const { data: session } = useSession();
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <main className={classes.main}>
      <ClientOnly>
      <div
          style={{
            marginTop: '2rem',
            
            display: 'flex',
            height: '200px',
            width: '100%',
          }}
        >
          
          <div
          style={{
            marginTop: '2rem',
            marginRight: '2rem',
            position: 'relative',
            height: '200px',
            width: '33%',
          }}
        >
          <Image
            src={`${BASEPATH}/banner.png`}
            alt="zendro"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div
          style={{
            marginTop: '2rem',
            marginRight: '2rem',
            position: 'relative',
            height: '200px',
            width: '33%',
            display: 'flex',
            alignItems: 'center',  
            justifyContent: 'center'
          }}
        >
          <Image
            src={`${BASEPATH}/brapi-logo.svg`}
            alt="brapi"
            width={'300'}
            height={'100'}
          />
        </div>
        <div
          style={{
            marginTop: '2rem',
            position: 'relative',
            height: '200px',
            width: '33%',
            display: 'flex',
            alignItems: 'center',  
            justifyContent: 'center'
          }}
        >
          <Image
            src={`${BASEPATH}/cassavabase_co.png`}
            alt="brapi"
            width={'500'}
            height={'150'}
          />
        </div>
          
        </div>

        <div className={classes.cardContainer} style={{ marginTop: '4rem', marginBottom: '3rem' }}>
          <Typography variant="h5" component="div" gutterBottom>
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
          {!session && (
          <Typography variant="body1" color="text.secondary" style={{ marginTop: '1rem' }}>
          
          <Trans
            i18nKey='home.general-login'
            
          />
          
        </Typography>
        )}
        </div>
        
        {!session && (
          <Button
            size="large"
            variant="outlined"
            color="success"
            endIcon={<LoginIcon />}
            onClick={() =>
              signIn('zendro', { callbackUrl: `${BASEPATH}/models` })
            }
          >
            LOGIN
          </Button>
        )}
        <div className={classes.cardContainer} style={{ marginTop: '4rem', marginBottom: '3rem' }}>

          <br/><br/><h5 style={{ color: 'rgba(0, 0, 0, 0.6)' }}>{t('home.ref')}</h5>
          <ol style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
            <li>
            Fernandez-Pozo N, Menda N, Edwards JD, Saha S, Tecle IY, Strickler SR, Bombarely A, Fisher-York T, Pujar A, Foerster H, Yan A, Mueller LA. The Sol Genomics Network (SGN)—from genotype to phenotype to breeding. (2015) Nucleic Acids Res. Volume 43 (Database issue):D1036-41. <a href="https://pubmed.ncbi.nlm.nih.gov/25428362/" target="_blank" rel="noopener noreferrer">PubMed</a>.
            </li>
            <li>https://www.cassavabase.org/help</li>
          </ol>
        </div>
      </ClientOnly>
    </main>
  );
};

Home.layout = AppLayout;
export default Home;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      alignItems: 'center',

      // Spacing
      padding: theme.spacing(4, 8),
      [theme.breakpoints.up('sm')]: {
        justifyContent: 'space-evenly',
      },
    },

    login: {
      borderRadius: 5,
      boxShadow: theme.shadows[3],
      padding: '1rem',
    },

    banner: {
      width: '100%',
      maxWidth: theme.breakpoints.values.md,
      position: 'relative',
      height: 'unset',

      margin: theme.spacing(5, 0, 0, 0),
      [theme.breakpoints.up('sm')]: {
        margin: 0,
      },

      // '& img': {
      //   width: '100%',
      //   objectFit: 'contain',
      // },
    },

    cardContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      maxWidth: theme.breakpoints.values.md,
      marginTop: theme.spacing(4),
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
