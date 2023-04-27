import React from "react";
import { FormControl, InputGroup } from 'react-bootstrap';
import BinaryNumber from "../models/BinaryNumber";

interface BinaryNumberPanelProps {
    binaryNumber: BinaryNumber;

    onChange?: (number: number) => void;
    minValue?: number;
    maxValue?: number;
    managed?: boolean;
}

export default function BinaryNumberPanel(props: BinaryNumberPanelProps) {
    const [value, setValue] = React.useState(props.binaryNumber.toDecimal());

    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange !== undefined) {
            const value = parseInt(e.target.value);
            setValue(value);
            props.onChange(value);
        }
    }, [props.onChange]);

    return (
        <InputGroup className="m-1">
            <FormControl
                type="number"
                placeholder="0"
                aria-label="Enter a multiplicand"
                aria-describedby="basic-addon2"
                onChange={onChange}
                isInvalid={
                    (props.maxValue !== undefined && value > props.maxValue) ||
                    (props.minValue !== undefined && value < props.minValue)
                }
                readOnly={props.onChange === undefined}
                disabled={props.onChange === undefined}
                value={props.managed ? props.binaryNumber.toDecimal() : undefined}
            />
            <InputGroup.Text>
                {props.binaryNumber.toString()}
            </InputGroup.Text>
        </InputGroup>
    );
}