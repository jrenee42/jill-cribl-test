import * as React from 'react';
import { useState, useEffect, useCallback } from "react";
import styles from

const fetchUrl = "https://s3.amazonaws.com/io.cribl.c021.takehome/cribl.log";

interface ItemProps {
    item: any;
    line: string;
}
interface FullItem {
    item: any; // todo: make this the real object; or actually just need the time here..... ???
    line: string;
};

const toIso = (timestamp: string) => new Date(timestamp).toISOString();

const ListItem: React.FC<ItemProps> = React.memo(({ item, line, }) => {
    console.log('rendering:44ab ', item, line);
    console.log("arghh....time?", item._time);
    return (<div className={styles.tableLine}>
        <div> {toIso(item._time)}</div>
        <div> {line}</div>
    </div>);
});

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

                if (done) {
                    // if (buffer) {
                    //     processBuffer(buffer);
                    // }
                    // no need to process buffer; just return
                    return;
                }

                buffer += decoder.decode(value, { stream: true });

                const lines = buffer.split("\n");

                // Process all lines except the last one (it may be incomplete)
                for (let i = 0; i < lines.length - 1; i++) {
                    processLine(lines[i]);
                }

                // Keep the last partial line in the buffer
                buffer = lines[lines.length - 1];

                processChunk(); // Continue reading the stream
            }

            processChunk();
        };

        fetchAndDisplayItems(fetchUrl);
    }, []);

    const processLine = useCallback((line: string) => {
        console.log("about to add line:", line);
        const item = JSON.parse(line);
        const fullItem = {line, item};
        setItems((prevItems) => [...prevItems, fullItem]);
    }, []);

    console.log("displaying....");
    return (
        <div>
            <h1>Streamed Items 223abc</h1>
            <ul>
                {items.map((fullItem, index) => (
                    <ListItem key={index} item={fullItem.item} line={fullItem.line} />
                ))}
            </ul>
        </div>
    );
};

export default StreamedList;
