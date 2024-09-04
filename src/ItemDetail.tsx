import * as React from 'react';
import './StreamedList.css';


interface DetailProps {
    item: any;
}

 const ItemDetail: React.FC<DetailProps> = (item) => {

    return (<div className="detailLine">
        {Object.entries(item).map(([key, value]) => (
            <div key={key} className="propertyLine">
                <div>{`"${key}"`}:</div>
                <div>{`"${String(value)}"`}</div>
            </div>
        ))}
    </div>);
}

export default ItemDetail;
