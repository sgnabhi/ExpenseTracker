import React from 'react';
import { View } from 'react-native';
import Plotly from 'react-native-plotly';

export const Chart = ( props ) => {
    const { series, title, xAxis, yAxis, chartType } = props;
    const data = series.map( ( serie ) => 
        {
            return( {
                x: serie.x,
                y: serie.y,
                name : serie.name,
                type: chartType,
            } );
        }
    );
  //console.log( data );
  const layout = {
    title: title,
    xaxis: xAxis,
    yaxis: yAxis,
  };

  return (
    <View style={{ flex: 1 }}>
      <Plotly data={data} layout={layout} config={{ displayModeBar: false }}
          style={{ width: '100%', height: 300 }}/>
    </View>
  );
};
  