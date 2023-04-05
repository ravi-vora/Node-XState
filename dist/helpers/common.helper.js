export const convertStringtoObject = (obj) => {
    try {
        return typeof obj === 'object' ? obj : JSON.parse(obj);
    }
    catch (error) {
        return error;
    }
};
export const rtStringifyData = (data) => {
    return typeof data === 'object' ? JSON.stringify(data) : data;
};
export const rtParseData = (data) => {
    return typeof data === 'object' ? data : JSON.parse(data);
};
//# sourceMappingURL=common.helper.js.map