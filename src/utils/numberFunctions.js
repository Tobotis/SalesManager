

export const isValid = (num) => {
    if (num === undefined) return false
    if (num === null) return false
    if (num === NaN) return false
    if (typeof (num) != "number") return false

    return true
}
