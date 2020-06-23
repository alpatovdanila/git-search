
export const pick = (object:object, sliceDefinition: object) : object=> {
    const slice = {};

    for(let key in sliceDefinition){
        slice[key] = object[key] || sliceDefinition[key];
    }

    return slice;
}