import { Card } from "react-native-elements";
import React from 'react';

function CardBase(props) {
    const {title, subTitle, containerStyle,children} = props;
    return (
        <Card containerStyle={containerStyle}>
            <Card.Title>{title}</Card.Title>
            <Card.Divider />
            {{subTitle} && <Card.FeaturedSubtitle>{subTitle}</Card.FeaturedSubtitle>}
            {children}
        </Card>
    );
}

export default CardBase;