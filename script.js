function mincost(arr) { 
    // Min-heap functions
    const minHeap = [];

    function heapifyUp(index) {
        while (index > 0) {
            let parent = Math.floor((index - 1) / 2);
            if (minHeap[index] < minHeap[parent]) {
                [minHeap[index], minHeap[parent]] = [minHeap[parent], minHeap[index]];
                index = parent;
            } else break;
        }
    }

    function heapifyDown(index) {
        const length = minHeap.length;
        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let smallest = index;

            if (left < length && minHeap[left] < minHeap[smallest]) smallest = left;
            if (right < length && minHeap[right] < minHeap[smallest]) smallest = right;

            if (smallest !== index) {
                [minHeap[index], minHeap[smallest]] = [minHeap[smallest], minHeap[index]];
                index = smallest;
            } else break;
        }
    }

    function insert(val) {
        minHeap.push(val);
        heapifyUp(minHeap.length - 1);
    }

    function extractMin() {
        if (minHeap.length === 0) return null;
        const min = minHeap[0];
        const end = minHeap.pop();
        if (minHeap.length > 0) {
            minHeap[0] = end;
            heapifyDown(0);
        }
        return min;
    }

    // Build heap from array
    for (let i = 0; i < arr.length; i++) {
        insert(arr[i]);
    }

    let cost = 0;
    while (minHeap.length > 1) {
        let first = extractMin();
        let second = extractMin();
        let sum = first + second;
        cost += sum;
        insert(sum);
    }

    return cost;
}

module.exports = mincost;
