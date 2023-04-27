import { Card } from 'react-bootstrap';
import BoothIteration from '../models/BoothIteration';

interface BoothIterationRowProps {
    iteration: BoothIteration;
}

export default function BoothIterationRow(props: BoothIterationRowProps) {
    const { iteration } = props;

    return (
        <>
            {iteration.isAdd && (
                <tr>
                    <td rowSpan={2}>{iteration.index}</td>
                    <td>{iteration.multiplicand.toString()}</td>
                    <td>{iteration.step1.toString()}</td>
                    <td className="text-success">Add Multiplier</td>
                </tr>
            )}
            {iteration.isSubtract && (
                <tr>
                    <td rowSpan={2}>{iteration.index}</td>
                    <td>{iteration.multiplicand.toString()}</td>
                    <td>{iteration.step1.toString()}</td>
                    <td className="text-danger">Subtract Multiplier</td>
                </tr>
            )}
            <tr>
                {!iteration.isSubtract && !iteration.isAdd && (
                    <td>{iteration.index}</td>
                )}
                <td>{iteration.multiplicand.toString()}</td>
                <td>{iteration.step2.toString()}</td>
                <td className="text-primary">{iteration.index === 0 ? "Initial Value" : "Shift Right"}</td>
            </tr>
        </>
    );
}