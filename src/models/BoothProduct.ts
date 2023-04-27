import BinaryNumber from "./BinaryNumber";

/**
 * Represents a product in Booth's algorithm.
 */
export default class BoothProduct {
    left: BinaryNumber;
    right: BinaryNumber;
    boothBit: boolean;

    constructor(left: BinaryNumber, right: BinaryNumber, boothBit: boolean) {
        this.left = left;
        this.right = right;
        this.boothBit = boothBit;
    }

    /**
     * Returns the decimal value of the product.
     * @returns {number} The decimal value of the product.
     */
    toDecimal() {
        return BinaryNumber.merge(this.left, this.right).toDecimal();
    }

    /**
     * Returns the binary value of the product.
     * @returns {BinaryNumber} The binary value of the product.
     */
    toBinary() {
        return BinaryNumber.merge(this.left, this.right);
    }

    /**
     * Returns the product as a string.
     * @returns {string} The product as a string.
     */
    toString() {
        return `${this.left.toString()} ${this.right.toString()} ${this.boothBit ? "1" : "0"}`;
    }

    /**
     * Shifts the product to the right.
     */
    rightShift() {
        const carryBit = this.left.rightShift();
        this.boothBit = this.right.rightShift(carryBit);
    }

    /**
     * Copies the product.
     * @returns {BoothProduct} A copy of the product.
     */
    copy() {
        return new BoothProduct(this.left.copy(), this.right.copy(), this.boothBit);
    }
}