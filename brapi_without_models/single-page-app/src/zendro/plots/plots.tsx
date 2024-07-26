import React from 'react';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

// define types of properties
const CustomPlotlyPlot: React.FC<{
  data: any;
  title?: string;
  xTitle?: string;
  yTitle?: string;
  xTickAngle?: number;
  yTickAngle?: number;
}> = (props) => {
  return (
    <Plot
      // plotly data object
      data={props.data}
      // plotly layout object
      layout={{
        title: {
          text: props.title,
          font:{size:25}},
        xaxis: {
          title: props.xTitle,
          tickangle: props.xTickAngle,
          zeroline: false,
        },
        yaxis: {
          title: props.yTitle,
          tickangle: props.yTickAngle,
          zeroline: false,
        },
        height: 800,
        font:{size:15},
        showlegend: false
      }}
      // In case you want your plot to be resizable
      useResizeHandler={true}
    />
  );
};

export default CustomPlotlyPlot;
