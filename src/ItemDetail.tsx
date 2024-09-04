import * as React from 'react';
import './StreamedList.css';


interface DetailProps {
    item: any;
}



 const ItemDetail: React.FC<DetailProps> = (item) => {

    console.log("in item detail:", item);
     const processValue = (value: any) => {
         if (typeof value === 'object' && value !== null) {
             // If the value is an object, recursively render its key-value pairs
             return (
                 <div className="nestedObject">
                     {Object.entries(value).map(([key, innerValue]) => (
                         <div key={key} className="propertyLine">
                             <div>{key}:</div>
                             <div>{processValue(innerValue)}</div>
                         </div>
                     ))}
                 </div>
             );
         } else {
             // If the value is not an object, just render it
             return <span>{value}</span>;
         }
     };

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
