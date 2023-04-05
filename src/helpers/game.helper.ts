export const addMinutes = (date: Date, minutes: number): Date => {
    return new Date(date.getTime() + minutes * 60000);
}

export const getRandomArbitrary = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
}

export const findAndRemove = (arr: Array<any>, removeElement : any) => {
    const index = arr.indexOf(removeElement);
    if (index > -1) { // only splice array when item is found
        arr.splice(index, 1); // 2nd parameter means remove one item only
    }
    return arr;
}