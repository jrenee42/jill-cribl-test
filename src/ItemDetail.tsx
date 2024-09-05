import * as React from 'react';
import './StreamedList.css';

interface DetailProps {
    item: any;
    index: number;
}

const ItemDetail: React.FC<DetailProps> = React.memo(({item, index}) => {
    const processValue = (value: any) => {
        if (Array.isArray(value)) {
            // If the value is an array, render it as [val1, val2, ...]
            return (
                <span>[{value.map((element, index) => (
                    <span key={index}>
                              {index > 0 && ', '}
                        {typeof element === 'object' ? JSON.stringify(element) : element}
            </span>
                ))}]
        </span>
            );
        } else if (typeof value === 'object' && value !== null) {
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
            // If the value is neither an array nor an object, just render it
            return <span>{value}</span>;
        }
    };

    return (<div className="detailLine" data-testid={`itemDetail-${index}`}>
        {Object.entries(item).map(([key, value]) => (
            <div key={key} className="propertyLine">
                <div>{key}:</div>
                <div>{processValue(value)}</div>
            </div>
        ))}
    </div>);
});

export default ItemDetail;
