export function allowInteger(oldVal: string, newVal: string): string {
    if (newVal.length < oldVal.length) {
        // deletion; assume the old value was also passed through here so it's fine
        return newVal;
    }
    const newChars = newVal.slice(oldVal.length);
    for (let i = 0; i < newChars.length; i++) {
        const c = newChars.charCodeAt(i);
        if (c < '0'.charCodeAt(0) || c > '9'.charCodeAt(0)) {
            return oldVal;
        }
    }
    return newVal;
}
