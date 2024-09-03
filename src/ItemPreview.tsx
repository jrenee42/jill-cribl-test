import * as React from 'react';
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

    const [expanded, setExpanded] = React.useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const formattedTime = toIso(item._time);
    item.time = formattedTime;
    const preview = `${line.substring(0, 110)}...`;
    console.log('item?', item);
    if (formattedTime === 'error') {
        return null;
    }


    const buttonIcon = expanded ? '>' : '+';
    const button = <div onClick={toggleExpanded} className='expandButton'>{buttonIcon}</div>

    const firstColumn = <div className='time'> {button} {formattedTime}</div>

    const secondCol = expanded ? <div><ItemDetail {...item}/></div> : <div>{preview}</div>;

    return (<div className='tableLine'>
        {firstColumn}
        {secondCol}
    </div>);

});

export default ListItem;
