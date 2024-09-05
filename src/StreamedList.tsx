import * as React from 'react';
import { useState, useEffect, useCallback } from "react";
import ListItem from "./ListItem";
import './StreamedList.css';
import classNames from "classnames";

const fetchUrl = "https://s3.amazonaws.com/io.cribl.c021.takehome/cribl.log";
const ERROR = 'error';

interface FullItem {
    item: any; // with more time, would enumerate all the properties that could be in an item
    line: string;
};

const safeParse = (jsonString: string) => {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Failed to parse JSON:", error);
        return ERROR;
    }
};

interface StreamProps {
    alternateUrl?:string;
    testData?: any;
}

const StreamedList: React.FC<StreamProps> = ({alternateUrl, testData}) => {
    const [items, setItems] = useState<FullItem[]>([]);

    useEffect(() => {
        const fetchAndDisplayItems = async (url: string) => {
            // const response = await fetch(url, { mode: "no-cors" });
            const response = await fetch(url);

            if (!response.body) {
                console.error("Readable stream not supported!");
                return;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            let buffer = "";

            async function processChunk() {
                const { value, done } = await reader.read();
                if (done) {
                     if (buffer) {
                         // get last line(s) done; now that we know there are no more incomplete lines
                         const lines = buffer.split("\n");
                        processLines(lines);
                     }

                    return;
                }

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");

                // Process all lines except the last one (it may be incomplete)
                buffer = lines.pop() || '';
                processLines(lines);

                processChunk(); // Continue reading the stream
            }

            processChunk();
        };
        if (testData) {
            // with more time, would add ndjson parser; when using test data just using normal json:
            processLines(testData);
            return;
        }

        const url = alternateUrl ?? fetchUrl;
        fetchAndDisplayItems(url);
    }, []);

    // do them all as one batch!
    const processLines = useCallback((lines: string[]) => {
        const processedLines  = lines.map(line => {
            if (testData) {
                // no need to parse; already parsed
                const actualLine = JSON.stringify(line);
                return {line:actualLine, item: line};
            }
           const item = safeParse(line);
            return {line, item};
        }).filter(x => x.item !== ERROR);

        setItems((prevItems) => [...prevItems, ...processedLines]);
    }, []);


    const headerClass = classNames('table-header', 'tableLine');
    return (
        <div className='main-container'>
            <div className='title'>Event Log</div>
            <div className='table-container'>
                <div className={headerClass}>
                    <div className='time'> Time </div>
                    <div> Event </div>
                </div>
                {items.map((fullItem, index) => (
                    <ListItem key={index} item={fullItem.item} line={fullItem.line} index={index} />
                ))}
            </div>
        </div>
    );
};

export default StreamedList;
