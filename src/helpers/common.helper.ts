export const convertStringtoObject = (obj: any) : object => {
    try {
        return typeof obj === 'object' ? obj : JSON.parse(obj);
    } catch (error: any) {
        return error;
    }
}

export const rtStringifyData = (data: object | string): string => {
    return typeof data === 'object' ? JSON.stringify(data) : data;
};

export const rtParseData = (data: object | string): object => {
    return typeof data === 'object' ? data : JSON.parse(data);
};