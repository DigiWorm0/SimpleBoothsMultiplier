import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import BinaryNumberPanel from '../components/BinaryNumberPanel';
import BoothIterationsTable from '../components/BoothIterationsTable';
import useBoothsMultiplier from '../hooks/useBoothsMultiplier';
import BinaryNumber from '../models/BinaryNumber';
import { BIT_COUNT } from '../models/Constants';

function App() {
    const [multiplier, setMultiplier] = React.useState(0);
    const [multiplicand, setMultiplicand] = React.useState(0);
    const iterations = useBoothsMultiplier(multiplier, multiplicand);

    // BinaryNumbers of values
    const multiplierBinary = React.useMemo(() => {
        return BinaryNumber.fromDecimal(multiplier, BIT_COUNT);
    }, [multiplier]);
    const multiplicandBinary = React.useMemo(() => {
        return BinaryNumber.fromDecimal(multiplicand, BIT_COUNT);
    }, [multiplicand]);
    const productBinary = React.useMemo(() => {
        return iterations.length > 0 ? iterations[iterations.length - 1].step2 : undefined;
    }, [iterations]);

    // Min and max values
    const maxValue = React.useMemo(() => {
        return Math.pow(2, BIT_COUNT - 1) - 1;
    }, []);
    const minValue = React.useMemo(() => {
        return -Math.pow(2, BIT_COUNT - 1);
    }, []);

    return (
        <Container>
            <Row>
                <Col lg={5}>
                    <div className="mt-5 p-1">
                        <h1 className="mt-5 fw-bold">Booth's Multiplier 🔢</h1>
                        <p className="lead">A simple implementation of Booth's Multiplier in React.</p>
                        <BinaryNumberPanel
                            binaryNumber={multiplierBinary}
                            onChange={setMultiplier}
                            minValue={minValue}
                            maxValue={maxValue}
                        />
                        <BinaryNumberPanel
                            binaryNumber={multiplicandBinary}
                            onChange={setMultiplicand}
                            minValue={minValue}
                            maxValue={maxValue}
                        />
                        <hr className='mt-3' />
                        {productBinary && (
                            <BinaryNumberPanel
                                binaryNumber={productBinary.toBinary()}
                                managed
                            />
                        )}
                    </div>
                </Col>
                <Col lg={7}>
                    <div className="mt-5 p-1">
                        <BoothIterationsTable
                            iterations={iterations}
                        />
                        {iterations.length === 0 && (
                            <p className="text-muted m-5">
                                Invalid input. Please enter a number between {minValue} and {maxValue} (inclusive).
                            </p>
                        )}
                    </div>
                </Col>
            </Row>
            <Row className='mt-5 mb-5' />
        </Container>
    );
}

export default App;
