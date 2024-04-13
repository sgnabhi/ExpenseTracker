import React from 'react';
import { View, StyleSheet } from 'react-native';
import Plotly from 'react-native-plotly';

export const Chart = (props) => {
    const { series, title, xAxis, yAxis, chartType } = props;
    const data = series.map((serie) => {
        return ({
            x: serie.x,
            y: serie.y,
            name: serie.name,
            type: chartType,
            marker: {
                color: '#FF4500', // Orange color for data points
            },
        });
    });

    const layout = {
        title: title,
        xaxis: xAxis,
        yaxis: yAxis,
        plot_bgcolor: '#f9f9f9', // Light grey background color
        paper_bgcolor: '#ffffff', // White paper color
        font: {
            color: '#333', // Dark grey font color
        },
    };

    return (
        <View style={styles.container}>
            <Plotly
                data={data}
                layout={layout}
                config={{ displayModeBar: false }}
                style={styles.plot}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff', // White background color
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    plot: {
        width: '100%',
        height: 300,
        borderRadius: 10,
    },
});

  