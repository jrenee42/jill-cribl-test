import * as React from 'react';
import { useState, useEffect, useCallback } from "react";

const fetchUrl = "https://s3.amazonaws.com/io.cribl.c021.takehome/cribl.log";

interface ItemProps {
    item: string;
}

const ListItem: React.FC<ItemProps> = React.memo(({ item }) => {
    return <li>{item}</li>;
});

const StreamedList: React.FC = () => {
    const [items, setItems] = useState<string[]>([]);

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
        setItems((prevItems) => [...prevItems, line]);
    }, []);

    console.log("displaying....");
    return (
        <div>
            <h1>Streamed Items 223</h1>
            <ul>
                {items.map((item, index) => (
                    <ListItem key={index} item={item} />
                ))}
            </ul>
        </div>
    );
};

export default StreamedList;
