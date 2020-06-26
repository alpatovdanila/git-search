
export const pick = <S extends { [index: string]: any }>(object: Partial<S>, sliceDefinition: S): S => {
    const slice: any = {};

    for (let key in sliceDefinition) {
        slice[key] = object[key] || sliceDefinition[key];
    }

    return slice;
}