import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const ChartCard = (props) => {
    const { title, children } = props;

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{title}</Text>
            <View style={styles.chartContainer}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        //padding: 15,
        marginBottom: 10, // Small gap between cards
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333', // Dark grey title color
        textAlign: 'center', // Align title to the center
    },
    chartContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#f9f9f9', // Light grey background color for charts
        aspectRatio: 1.2, // Aspect ratio to maintain the chart's shape
    },
});

const ChartCardScrollView = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ChartCard title="Chart 1 Title">
                {/* Your chart content here */}
            </ChartCard>
            <ChartCard title="Chart 2 Title">
                {/* Your chart content here */}
            </ChartCard>
            {/* Add more ChartCard components with unique titles as needed */}
        </ScrollView>
    );
};

export default ChartCardScrollView;


