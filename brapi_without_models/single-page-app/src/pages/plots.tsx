import React from "react";
import dynamic from "next/dynamic";
import { ModelLayout, PageWithLayout } from "@/layouts";
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from "@mui/styles";
import { useZendroClient } from "@/hooks";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Typography, Link } from '@mui/material';
import { useTranslation, Trans } from 'react-i18next';

const PlotlyPlot = dynamic(() => import("@/zendro/plots/plots"), {
  ssr: false,
});

type Observation = {
  value: number | null;
};

type GraphQLResponse = {
  observations: Observation[];
};

const Plots: PageWithLayout = () => {
  useSession();
  const [scatterData, setScatterData] = useState<{ x: number[]; y: number[] }>({ x: [], y: [] });
  const [boxData, setBoxData] = useState<{ x: string[]; y: number[] }>({ x: [], y: [] });
  const zendro = useZendroClient();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      // Query for scatter plot x values
      const resX: GraphQLResponse = await zendro.request(`
        {
          observations(pagination:{limit:600},search:{
            operator:and
            search:[
              {
                search:[
                  {field:study_ID, value:"1502", operator:eq}
                  {field:study_ID, value:"1503", operator:eq }
                  {field:study_ID, value:"1504", operator:eq }
                  {field:study_ID, value:"1505", operator:eq }
                ]
                operator:or
              }
              {field: observationVariable_ID, value: "12", operator: eq}
            ]
          }){
            value
          }
        }
      `);

      // Query for scatter plot y values and box plot y values
      const resY: GraphQLResponse = await zendro.request(`
        {
          observations(pagination:{limit:600},search:{
            operator:and
            search:[
              {
                search:[
                  {field:study_ID, value:"1502", operator:eq}
                  {field:study_ID, value:"1503", operator:eq }
                  {field:study_ID, value:"1504", operator:eq }
                  {field:study_ID, value:"1505", operator:eq }
                ]
                operator:or
              }
              {field: observationVariable_ID, value: "16", operator: eq}
            ]
          }){
            value
            study_ID
          }
        }
      `);

      const resYBox: GraphQLResponse = await zendro.request(`
        {
          observations(pagination:{limit:600},search:{
            operator:and
            search:[
              {
                search:[
                  {field:study_ID, value:"1502", operator:eq}
                  {field:study_ID, value:"1503", operator:eq }
                  {field:study_ID, value:"1504", operator:eq }
                  {field:study_ID, value:"1505", operator:eq }
                ]
                operator:or
              }
              {field: observationVariable_ID, value: "50", operator: eq}
            ]
          }){
            value
            study_ID
          }
        }
      `);

      // Filtrar valores nulos y asignar valores a 'x' y 'y' para scatter plot
      const xValues = resX.observations.filter((obs: Observation) => obs.value !== null).map((obs: Observation) => obs.value as number);
      const yValuesScatter = resY.observations.filter((obs: Observation) => obs.value !== null).map((obs: Observation) => obs.value as number);

      // Asignar valores a 'x' y 'y' para box plot
      const xValuesBox = resYBox.observations
        .filter((obs: Observation) => obs.value !== null)
        .map((obs: any) => obs.study_ID.toString());
      const yValuesBox = resYBox.observations.filter((obs: Observation) => obs.value !== null).map((obs: Observation) => obs.value as number);

      setScatterData({ x: xValues, y: yValuesScatter });
      setBoxData({ x: xValuesBox, y: yValuesBox });
    };

    fetchData();
  }, []);

  // add custom classes
  const classes = useStyles();
  const uniqueXValues = [...new Set(boxData.x)];
  const colors = uniqueXValues.map((value, index) => {
    // Puedes definir una paleta de colores o generar colores dinámicamente
    const colorPalette = ['rgba(44, 160, 101, 0.5)', 'rgba(93, 164, 214, 0.5)', 'rgba(255, 144, 14, 0.5)', 'rgba(255, 65, 54, 0.5)', 'rgba(207, 114, 255, 0.5)', 'rgba(127, 96, 0, 0.5)'];
    return colorPalette[index % colorPalette.length];
  });


// Obtener valores únicos de x
const uniqueXValues_box = [...new Set(boxData.x)];

const colorPalette = [
  'rgba(44, 160, 101, 0.5)', 'rgba(93, 164, 214, 0.5)', 'rgba(255, 144, 14, 0.5)', 'rgba(255, 65, 54, 0.5)', 'rgba(207, 114, 255, 0.5)', 'rgba(127, 96, 0, 0.5)'
  // Añade más colores según sea necesario
];

// Generar datos del box plot dinámicamente
const plotData = uniqueXValues_box.map((xValue, index) => {
  const color = colorPalette[index % colorPalette.length];
  return {
    x: boxData.x.filter((x, i) => x === xValue),
    y: boxData.y.filter((_, i) => boxData.x[i] === xValue),
    type: 'box',
    marker: {
      color: color
      
    },
  };
});

const plotDataViolin = uniqueXValues.map((xValue, index) => {
  // Seleccionar color basado en el índice, con manejo de desbordamiento
  const color = colorPalette[index % colorPalette.length];

  return {
    type: 'violin',
    x: boxData.x.filter((x) => x === xValue),
    y: boxData.y.filter((_, i) => boxData.x[i] === xValue),
    box: {
      visible: true,
      line: {
        color: color // Color de la línea de la caja
      }
    },
    line: {
      color: color // Color del contorno del violín
    },
    points: 'all',
    pointpos: -0.5,
    fillcolor: color, // Color de llenado del violín
    marker: {
      color: color, // Color de los puntos
      size: 6 // Tamaño de los puntos
    },
    side: 'positive',
  };
});

const title1 = '<b>'+t('plots.fig') + ' 1</b>';
const title2 = '<b>'+t('plots.fig') + ' 2</b>';
const title3 = '<b>'+t('plots.fig') + ' 3</b>';

  return (
    // Generic plot container. Feel free to change
    <main className={classes.main}>
    <div className={classes.cardContainer} >
    <Typography variant="h5" component="div" gutterBottom style={{ marginTop: '3rem' }}>
      <Trans
          i18nKey='plots.header'
        />            
        
      </Typography>
      <Typography variant="body1" color="text.secondary" style={{ marginTop: '1rem' }}>
        Change querys to match your own models.
      </Typography>
    </div>
    <div className={classes.plotContainer_custom}>
      <PlotlyPlot
        // Scatter plot parameters
        data={[
          {
            x: scatterData.x,
            y: scatterData.y,
            mode: 'markers',
            type: 'scatter',
            marker: {
              size: 12
            },
          },
        ]}
        title={title1}
        xTitle={'X axis'}
        yTitle={'Y axis'}
      />
      <br />
      {/* <Typography variant="body1" color="text.secondary" style={{ marginTop: '1rem' }}>
        <Trans
          i18nKey='plots.figure1'
        />
      </Typography>
      <br />
      <PlotlyPlot
        // Box plot parameters
        data={plotData}
        title={title2}
        xTitle={'Study ID'}
        yTitle={'Harvest index variable'}
      />
      <br />
      <Typography variant="body1" color="text.secondary" style={{ marginTop: '1rem' }}>
        <Trans
          i18nKey='plots.figure2'
        />
      </Typography>
      <br />
      <PlotlyPlot
        // Rain cloud plot parameters
        data={plotDataViolin}
        title={title3}
        xTitle={'Study ID'}
        yTitle={'Harvest index variable'}
      />
      <Typography variant="body1" color="text.secondary" style={{ marginTop: '1rem' }}>
        <Trans
          i18nKey='plots.figure3'
        />
      </Typography> */}
      <br />
      
    </div>
    </main>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    plotContainer_custom: {
      display: "flex",
      flexDirection: "column",
      overflow: "auto",
      padding: "2rem",
    },
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
  })
);

// Export the plots using the default zendro Modellayout. This ensures that your
// new page will be integrated seamlessly into the existing zendro experience.
// If you want to fully customize the page, just delete the following line.
Plots.layout = ModelLayout;

export default Plots;
