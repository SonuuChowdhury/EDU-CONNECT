export default function sortArrayBySerial(arr) {
    return arr.sort((a, b) => a.serial - b.serial);
}