
import {pick} from "./";

const sourceObject = {
    stringValue:'stringValue',
    numberValue: 12,
    nullValue:null,
    objValue: {},
    noValue:undefined,
}

it('Picking values', ()=>{
    expect(pick(sourceObject, {
        stringValue:null,
        noValue:'test',
        nullValue:12,
    })).toEqual({
        stringValue:'stringValue',
        noValue:'test',
        nullValue:12,
    })
})
