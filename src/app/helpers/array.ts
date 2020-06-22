import { Injectable } from '@angular/core';
import { GroupedArray } from './../models/GroupedArray';
@Injectable({
    providedIn: 'root'
})
export class ArrayHelpers {
    public GroupArray<T>(arrToGroup: T[], groupingPropery: string):GroupedArray<T>[]{
        let resultArray:GroupedArray<T>[] = [];        
        arrToGroup.forEach((el) => {
            var foundIndex = resultArray.findIndex((r => r.GroupedObject[groupingPropery] === el[groupingPropery]));
            if (foundIndex != -1){
                resultArray[foundIndex].Qty++;
            }
            else{
                let newGroup: GroupedArray<T> = { GroupedObject: el, Qty: 1 };
                resultArray.push(newGroup);
            }
        })
        return resultArray;
    }
}

