import { Col, Row } from "react-bootstrap"
import politicians from "../data/politicians.json"

export function Members(){
    return <>
    <h1>Nariai</h1>
    <Row>
        {politicians.map(item => (
            <Col>{JSON.stringify(item)}</Col>

        ))}
    </Row>
    </>
}