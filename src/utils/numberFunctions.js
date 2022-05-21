
// Checks if a number is valid.
// Differs from num? because num? returns false on 0
export const isValid = (num) => {
    if (num === undefined) return false
    if (num === null) return false
    if (num === NaN) return false
    if (typeof (num) != "number") return false

    return true
}
