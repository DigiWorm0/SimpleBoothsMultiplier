import { Card } from 'react-bootstrap';
import BoothIteration from '../models/BoothIteration';

interface BoothIterationPanelProps {
    iteration: BoothIteration;
}

export default function BoothIterationPanel(props: BoothIterationPanelProps) {
    const { iteration } = props;

    return (
        <Card className="mt-1">
            <Card.Header>
                Iteration {iteration.index}
            </Card.Header>
            <Card.Body>
                <Card.Text className="text-secondary">
                    <strong>Multiplier:</strong> {iteration.multiplicand.toString()}
                </Card.Text>
                {iteration.isAdd && (
                    <Card.Text className="text-success">
                        <strong>Add Multiplier:</strong> {iteration.step1.toString()}
                    </Card.Text>
                )}
                {iteration.isSubtract && (
                    <Card.Text className="text-danger">
                        <strong>Subtract Multiplier:</strong> {iteration.step1.toString()}
                    </Card.Text>
                )}
                {iteration.index === 0 ? (
                    <Card.Text className="text-primary">
                        <strong>Initial Value:</strong> {iteration.step2.toString()}
                    </Card.Text>
                ) : (
                    <Card.Text className="text-primary">
                        <strong>Shift Right:</strong> {iteration.step2.toString()}
                    </Card.Text>
                )}
            </Card.Body>
        </Card>
    );
}