import * as React from 'react';
import './StreamedList.css';


interface DetailProps {
    item: any;
}



 const ItemDetail: React.FC<DetailProps> = (item) => {

    console.log("in item detail:", item);
     const processValue = (val: string | object) => {
        debugger;
         if (typeof val === 'string' ||  typeof val === 'number') {
             // Handle the case where the item is a string
             return val;
             // Do something with the string
         } else if (typeof val === 'object' && val !== null) {
             return <ItemDetail item={val}/>;
         } else {
             console.log("The item is neither a string nor an object.", val);
             return 'ack';
         }
     }

    return (<div className="detailLine">
        {Object.entries(item).map(([key, value]) => (
            <div key={key} className="propertyLine">
                <div>{key}:</div>
                <div>{processValue(value)}</div>
            </div>
        ))}
    </div>);
}

export default ItemDetail;
