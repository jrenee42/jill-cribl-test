import * as React from 'react';
import { useState } from "react";
import classNames from 'classnames';

import './StreamedList.css';
import ItemDetail from "./ItemDetail";


interface PreviewProps {
    item: any;
    line: string;
}

const toIso = (timestamp: string) => {

    try {
        return new Date(timestamp).toISOString();
    } catch (e) {
        console.log("bad timestamp: ", timestamp);
        return 'error';
    }
};

const ListItem: React.FC<PreviewProps> = React.memo(({ item, line, }) => {

    const [expanded, setExpanded] = useState(false);
    const [mousePressed, setMousePressed] = useState(false);
    const [isHovered, setHovered] = useState(false);

    const toggleExpanded = () => {
        setUnPressed();
        setExpanded(!expanded);
    };

    const setPressed = () => setMousePressed(true);
    const setUnPressed = () => setMousePressed(false);

    const startHover = () => setHovered(true);
    const endHover = () => setHovered(false);

    const formattedTime = toIso(item._time);
    item.time = formattedTime;
    const preview = `${line.substring(0, 110)}...`;
    console.log('item?', item);
    if (formattedTime === 'error') {
        return null;
    }


    const buttonIcon = expanded ? '>' : '+';

    // todo: with internet install classnames!!!
    // and do this part properly!
    // const actual = mousePressed ? 'buttonPressed': 'expandButton';

    const btnClass = classNames('expandButton',
        { 'buttonPressed': mousePressed,
        'buttonOver': !mousePressed && isHovered,}
    );

    const button = <div onClick={toggleExpanded}
                        onMouseDown={setPressed}
                        onMouseUp={setUnPressed}
                        onMouseLeave={endHover}
                        onMouseEnter={startHover}
                        className={btnClass}>{buttonIcon}</div>

    const firstColumn = <div className='time'> {button} {formattedTime}</div>

    const secondCol = expanded ? <div><ItemDetail {...item}/></div> : <div>{preview}</div>;

    return (<div className='tableLine'>
        {firstColumn}
        {secondCol}
    </div>);

});

export default ListItem;
