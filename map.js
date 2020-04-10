Array.prototype.map = function(fn, context) {
    let result = [], 
        i = 0, 
        cur = undefined,
        len = this.length,
        context = context || this;
    for(;i < len; i++) {
        cur = this[i]
        result.push(fn.call(context, cur, i, this));
    }
    return result
}

Array.prototype.reduce = function(fn, initValue) {
    var result, i;
    i = initValue ? 1 : 0;
    result = initValue ? initValue : this[0]
    for (i; i < this.length; i++) {
        result = fn(result, this[i], i, this);
    }
    return result;
}

Function.prototype.apply = function() {
    let context = arguments[0],
        param = arguments[1];
    
}

Array.prototype.sort = (comparefn) => {
    let array = this,
        length = array.length;
    return InnerArraySort(array, length, comparefn)
}
const InnerArraySort = (array, length, comparefn) => {
    // 比较函数未传入
    if (Object.prototype.toString.call(comparefn) !== '[object Function]') {
        comparefn = function(a, b) {
            if (a === b) return 0;
            a = a.toString();
            b = b.toString();
            if (a === b) {
                return 0;
            } else {
                return a < b ? -1 : 1;
            }
        }
    }
    // 插入排序
    const insertSort = (arr, start = 0, end) => {
        end = end || arr.length;
        for (let i = start; i < end; i++) {
            let temp = arr[i];
            for (let j = i; j > start && comparefn(arr[j - 1], temp) > 0; j--) {
                arr[j] = arr[j - 1];
            }
            arr[j] = temp;
        }
        return;
    };
    // 获取中位数
    const getThirdIndex = (a, from, to) => {
        let tmpArr = [];
        // 递增量, 200 - 215之间, 因为任何正数和15与操作, 结果必然不大于15\
        let increment = 200 + ((to - from) & 15);
        let j = 0;
        from += 1;
        to -= 1;
        for (let i = from; i < to; i+=increment) {
            tmpArr[j] = [i, a[i]];
            j++;
        }
        tmpArr.sort(function(a, b) {
            return comparefn(a[1], b[1])
        });
        let thirdIndex = tempArr[tempArr.length >> 1][0];
        return thirdIndex;
    }
    const _sort = (a, b, c) => {
        let arr = [];
        arr.push(a, b, c);
        insertSort(arr, 0, 3);
        return arr;
    }
    const quickSort = (a, from, to) => {
        // 哨兵位置
        let thirdIndex = 0;
        while(true) {
            if (to - from <= 10) {
                insertSort(a, from, to)
                return
            }
            if (to - from > 1000) {
                thirdIndex  = getThirdIndex(a, from, to)
            } else {
                // 小于1000直接取中点
                thirdIndex = from + ((to - from) >> 2);
            }
            let tmpArr = _sort(a[from], a[thirdIndex], a[to - 1])
            a[from] = tempArr[0]; a[thirdIndex] = tmpArr[1]; a[to - 1] = tempArr[2];
            let pivot = a[thirdIndex];

            // 进入快排
            let lowEnd = from + 1;
            let highStart = to - 1;

            a[thirdIndex] = a[lowEnd];
            a[lowEnd] = pivot;

            for (let i = lowEnd + 1; i < highStart; i++) {
                let element = a[i];
                let order = comparefn(element, pivot);
                if (order < 0) {
                    a[i] = a[lowEnd];
                    a[lowEnd] = element;
                    lowEnd++;
                } else if (order > 0) {
                    do {
                        highStart --
                        if (highStart === i) break;
                        order = comparefn(a[highStart], pivot);
                    } while (order > 0)

                    a[i] = a[highStart];
                    a[highStart] = element;
                    if (order < 0) {
                        element = a[i];
                        a[i] = a[lowEnd];
                        a[lowEnd] = element;
                        lowEnd++
                    }
                }
            }
            if (lowEnd - from > to - highStart) {
                to = lowEnd;
                quickSort(a, highStart, to);
            } else if(lowEnd - from <= to - highStart) {
                from = highStart;
                quickSort(a, from, lowEnd);
            }
        }
    }
}