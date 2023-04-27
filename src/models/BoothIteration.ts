import BinaryNumber from "./BinaryNumber";
import BoothProduct from "./BoothProduct";

/**
 * Represents an iteration in Booth's algorithm.
 */
export default class BoothIteration {
    index: number;
    multiplicand: BinaryNumber;
    step1: BoothProduct;
    step2: BoothProduct;

    isAdd: boolean;
    isSubtract: boolean;

    constructor(iteration: number, multiplicand: BinaryNumber, step1: BoothProduct, step2: BoothProduct) {
        this.index = iteration;
        this.multiplicand = multiplicand;
        this.step1 = step1;
        this.step2 = step2;

        this.isAdd = false;
        this.isSubtract = false;
    }

    /**
     * Returns the decimal value of the iteration.
     * @returns {number} The decimal value of the iteration.
     */
    getDecimal(): number {
        return this.step2.toDecimal();
    }

    /**
     * Returns the iteration as a string.
     * @returns {string} The iteration as a string.
     */
    toString() {
        return `${this.index} ${this.multiplicand.toString()} ${this.step1.toString()} ${this.step2.toString()}`;
    }
}