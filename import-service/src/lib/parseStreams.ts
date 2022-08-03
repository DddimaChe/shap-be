import csv from "csv-parser";

export const parseStream = async (stream: any) => {
    const results = [];

    return new Promise((res, rej) => {
        stream
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                res(results);
            })
            .on('error', (e) => {
                rej(e);
            });
    });
};