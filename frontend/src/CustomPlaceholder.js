import React from "react";

import Placeholder from 'react-bootstrap/Placeholder';

function CustomPlaceholder(props) {
    let width = props.width;
    let height = props.height;
    let placeholderBlock = Array.from(Array(height).keys());

    return (
        <>
            {placeholderBlock.map((row, index) => {
                return <PlaceholderRow key={index} width={width} />
            })}
        </>
    );
}

function PlaceholderRow(props) {
    let width = props.width;

    return (
        <Placeholder animation="glow">
            <Placeholder xs={width} />
        </ Placeholder>
    );
}

export default CustomPlaceholder;