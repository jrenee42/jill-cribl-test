import * as React from 'react';
import { useState, useEffect, useCallback } from "react";
import ListItem from "./ListItem";
import './StreamedList.css';
import classNames from "classnames";

const realFetchUrl = "https://s3.amazonaws.com/io.cribl.c021.takehome/cribl.log";
const fetchUrl = './testData.json';

interface FullItem {
    item: any; // todo: make this the real object; or actually just need the time here..... ???
    line: string;
};

const safeParse = (jsonString: string) => {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Failed to parse JSON:", error);
        return 'error';
    }
};

const StreamedList: React.FC = () => {
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
 console.log("in processChunk; current buffer:", buffer);
                if (done) {
                    // if (buffer) {
                    //     processBuffer(buffer);
                    // }
                    // no need to process buffer; just return
                    return;
                }

                buffer += decoder.decode(value, { stream: true });
 console.log("decoded; current buffer?", buffer);
                const lines = buffer.split("\n");
 console.log("got lines?", lines.length, lines);
                // Process all lines except the last one (it may be incomplete)
                // for (let i = 0; i < lines.length - 1; i++) {
                //     processLine(lines[i]);
                // }
                processLines(lines);

                // is this necessary?  or should set to nada???
                // Keep the last partial line in the buffer
                buffer = lines[lines.length - 1];


                processChunk(); // Continue reading the stream
            }

            processChunk();
        };

        fetchAndDisplayItems(fetchUrl);
    }, []);

    //
    // const processLine = useCallback((line: string) => {
    //     const item = JSON.parse(line);
    //     const fullItem = {line, item};
    //     setItems((prevItems) => [...prevItems, fullItem]);
    // }, []);

    // do them all as one batch!
    const processLines = useCallback((lines: string[]) => {
        const processedLines  = lines.map(line => {
           const item = safeParse(line);
            return {line, item};
        }).filter(x => x.item !== 'error');

        console.log('processing lines; new items:', processedLines.length);
        console.log('processing lines; existing items:', items.length);
        setItems((prevItems) => [...prevItems, ...processedLines]);
    }, []);


    console.log("displaying....");
    const headerClass = classNames('table-header', 'tableLine');
    return (
        <div className='main-container'>
            <h1>Event Log</h1>
            <div className='table-container'>
                <div className={headerClass}>
                    <div className='time'> Time </div>
                    <div> Event </div>
                </div>
                {items.map((fullItem, index) => (
                    <ListItem key={index} item={fullItem.item} line={fullItem.line} />
                ))}
            </div>
        </div>
    );
};

export default StreamedList;
