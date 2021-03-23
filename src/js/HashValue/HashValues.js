import {DefaultHashValue} from './DefaultHashValue.js'

export class HashValues {
    #hashValues = []
    #defaultHashValue

    constructor(hashValues) {
        this.#hashValues = hashValues;
        this.#defaultHashValue = new DefaultHashValue()
    }

    execute(hashValue) {
        console.log(this.#hashValues)
        let hashValueCmd = this.#hashValues
            .find(hashValueCmd => hashValueCmd.isUsable(hashValue));

        console.log(hashValueCmd)

        if(hashValueCmd === undefined) {
            return this.#defaultHashValue.getElementDoms()
        }

        return hashValueCmd.getElementDoms()
    }

}