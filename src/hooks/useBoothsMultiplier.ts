import React from "react";
import BoothIteration from "../models/BoothIteration";
import { BIT_COUNT } from "../models/Constants";
import BoothProduct from "../models/BoothProduct";
import BinaryNumber from "../models/BinaryNumber";

export default function useBoothsMultiplier(a: number, b: number): BoothIteration[] {

    // Min and max values
    const maxValue = React.useMemo(() => {
        return Math.pow(2, BIT_COUNT - 1) - 1;
    }, []);
    const minValue = React.useMemo(() => {
        return -Math.pow(2, BIT_COUNT - 1);
    }, []);

    // Function to get the next iteration.
    const getNextIteration = React.useCallback((iteration: BoothIteration) => {

        // Determine the next index, multiplicand, and step1.
        const nextIndex = iteration.index + 1;
        const nextMultiplicand = iteration.multiplicand;
        const nextStep1 = new BoothProduct(
            iteration.step2.left,
            iteration.step2.right,
            iteration.step2.boothBit
        );

        // Determine if the multiplicand should be added or subtracted.
        let isAdd = !nextStep1.right.lastBit() && nextStep1.boothBit;
        let isSubtract = nextStep1.right.lastBit() && !nextStep1.boothBit;

        // Add or subtract the multiplicand.
        if (isAdd) {
            nextStep1.left = BinaryNumber.add(nextStep1.left, nextMultiplicand);
        } else if (isSubtract) {
            nextStep1.left = BinaryNumber.subtract(nextStep1.left, nextMultiplicand);
        }

        // Copy and shift the product.
        const nextStep2 = nextStep1.copy();
        nextStep2.rightShift();

        // Create the next iteration.
        const nextIteration = new BoothIteration(nextIndex, nextMultiplicand, nextStep1, nextStep2);
        nextIteration.isAdd = isAdd;
        nextIteration.isSubtract = isSubtract;

        return nextIteration;
    }, []);

    // Iterations
    const iterations = React.useMemo(() => {
        const iterations: BoothIteration[] = [];

        // Check if a or b is out of range.
        if (a > maxValue || a < minValue || b > maxValue || b < minValue) {
            return iterations;
        }

        // Calculate the initial product.
        const initialProduct = new BoothProduct(
            BinaryNumber.fromDecimal(0, BIT_COUNT),
            BinaryNumber.fromDecimal(b, BIT_COUNT),
            false
        );
        const initialIteration = new BoothIteration(
            0,
            BinaryNumber.fromDecimal(a, BIT_COUNT),
            initialProduct,
            initialProduct
        );
        iterations.push(initialIteration);

        // Calculate the rest of the iterations.
        let lastIteration = initialIteration;
        for (let i = 0; i < BIT_COUNT; i++) {
            const nextIteration = getNextIteration(lastIteration);
            iterations.push(nextIteration);
            lastIteration = nextIteration;
        }
        return iterations;
    }, [a, b]);

    return iterations;
}