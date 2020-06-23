import {createLocationSearch, getLocationSearchParams} from './'

const initialParameters = {
    query:'queryValue',
    empty:null,
    otherEmpty:undefined,
    language:'languageValue',
}

const locationSearch = createLocationSearch(initialParameters)


it('Creates location from params via createLocation()', ()=>{
    expect(locationSearch).toEqual(`query=queryValue&language=languageValue`);
})

it('Gets location search params via get getLocationSearchParams()', ()=>{
    expect(getLocationSearchParams(locationSearch)).toEqual({
        query:'queryValue',
        language:'languageValue',
    });
})