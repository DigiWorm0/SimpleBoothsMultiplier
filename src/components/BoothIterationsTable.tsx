import { Table } from 'react-bootstrap';
import BoothIteration from '../models/BoothIteration';
import BoothIterationRow from './BoothIterationRow';

interface BoothIterationsTableProps {
    iterations: BoothIteration[];
}

export default function BoothIterationsTable(props: BoothIterationsTableProps) {
    const { iterations } = props;

    if (iterations.length === 0) {
        return null;
    }
    return (
        <Table
            striped
            bordered
            hover
            responsive="sm"
            className="text-center align-middle"
            size="sm"
        >
            <thead>
                <tr>
                    <th>Iteration</th>
                    <th>Multiplier</th>
                    <th>Multiplicand</th>
                    <th>Step</th>
                </tr>
            </thead>
            <tbody>
                {iterations.map((iteration, index) => (
                    <BoothIterationRow
                        key={index}
                        iteration={iteration}
                    />
                ))}
            </tbody>
        </Table>
    );
}