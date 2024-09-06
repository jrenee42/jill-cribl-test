import * as React from 'react';
import {useMemo, useState} from "react";
import classNames from 'classnames';

import './StreamedList.css';
import ItemDetail from "./ItemDetail";


interface PreviewProps {
    item: any;
    line: string;
    index: number;
}

const ERROR = 'error';
const toIso = (timestamp: string) => {

    try {
        return new Date(timestamp).toISOString();
    } catch (e) {
        console.error("bad timestamp: ", timestamp);
        return ERROR;
    }
};

const ListItem: React.FC<PreviewProps> = ({ item, line, index }) => {

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

    const renderedRow = useMemo(() => {
        const formattedTime = toIso(item._time);
        item.time = formattedTime;
        const preview = `${line.substring(0, 110)}...`;

        if (formattedTime === ERROR) {
            return null;
        }

        const buttonIcon = expanded ? '>' : '+';

        const btnClass = classNames('expandButton',
            {
                'buttonPressed': mousePressed,
                'buttonOver': !mousePressed && isHovered,
            }
        );

        const button = <div onClick={toggleExpanded}
                            onMouseDown={setPressed}
                            onMouseUp={setUnPressed}
                            onMouseLeave={endHover}
                            onMouseEnter={startHover}
                            className={btnClass}
                            data-testId={`expander-${index}`}
        >{buttonIcon}</div>

        const firstColumn = <div className='time'> {button} {formattedTime}</div>

        const secondCol = expanded ? <div><ItemDetail item={item} index={index}/></div> :
            <div data-testid={`itemPreview-${index}`}>{preview}</div>;

        return (<div className='tableLine' data-testid='table-line'>
            {firstColumn}
            {secondCol}
        </div>);
    }, [index, expanded, mousePressed, isHovered, item.time]);
    return renderedRow;
};

export default ListItem;
