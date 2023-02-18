import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import React, { useMemo } from 'react';
import { useParams } from "react-router-dom";
import politicians_data from "../data/politicians.json";
import MaterialReactTable from 'material-react-table';
import { formatCurrency } from "../utilities/formatCurrency";
import { CartesianGrid, XAxis, YAxis, Tooltip, Line, ResponsiveContainer, LineChart } from 'recharts';

import politician_wealth_data from '../data/wealth.json';
import politician_spouse_data from '../data/spouses.json';
import politician_spouse_wealth_data from '../data/spouses_wealth.json';
import business_trips_data from '../data/business_trips.json';
import advisors_data from '../data/advisors.json';

import "./Member_Info.css";


export function Member_Info() {
    const { id } = useParams();
    const politician = politicians_data.find(item => item.id === Number(id))
    const politician_advisors = advisors_data.filter(item => item.politican_id === politician.id)
    const politician_business_trips = business_trips_data.filter(item => item.politican_id === politician.id)
    const politician_wealth_list = politician_wealth_data.filter(item => item.politican_id === politician.id)
    const spouse = politician_spouse_data.find(item => item.politican_id === politician.id)
    let years = 0
    for (let index = 0; index < politician.tenures.length - 1; index++) {
        years += politician.tenures[index + 1] - politician.tenures[index];
    }
    let politician_wealth_graph = []

    for (let i = 0; i < politician_wealth_list.length; i++) {
        let politician_wealth = 0
        let politician_spouse_wealth = 0
        if (spouse) {

            const spouse_wealth = politician_spouse_wealth_data.find(item =>
                item.year_declared === politician_wealth_list[i].year_declared &&
                item.politician_spouse_id === spouse.id)
            if (spouse_wealth) {
                for (let index = 0; index < spouse_wealth.numbers.length; index++) {
                    politician_spouse_wealth += spouse_wealth.numbers[index];
                }
            }
        }
        for (let index = 0; index < politician_wealth_list[i].numbers.length; index++) {
            politician_wealth += politician_wealth_list[i].numbers[index];
        }
        if (politician_wealth_list[i].year_declared < 2015) {
            politician_wealth = politician_wealth * 0.28962;
            politician_spouse_wealth = politician_spouse_wealth * 0.28962;
        }
        politician_wealth_graph.unshift({
            "year_declared": politician_wealth_list[i].year_declared,
            "politician_wealth": politician_wealth,
            "spouse_wealth": politician_spouse_wealth,
            "all_wealth": politician_wealth + politician_spouse_wealth
        })
    }

    const max = Math.max(...politician_wealth_graph.map((o) => o.all_wealth))
    const maxYaxis = max * 1.1
    let min = Math.min(...politician_wealth_graph.map((o) => o.all_wealth))
    const minYaxis = min * 0.9

    const columns_advisors = useMemo(() => [
        {
            accessorKey: 'name_surname',
            header: 'Vardas Pavardė',
        },
    ],
        [],
    );
    const columns_business_trips = useMemo(() => [
        {
            accessorKey: 'start_date',
            header: 'Pradžios data',
        },
        {
            accessorKey: 'end_date',
            header: 'Pabaigos data',
        },
        {
            accessorKey: 'description',
            header: 'Aprašymas',
        },
    ],
        [],
    );

    const CustomTooltip = ({ active, payload, label }) => {
        console.log(payload)
        if (active && payload && payload.length) {
            return (
                <div style={{ display: "inline-block", padding: 10 }}>
                    <p>{`${label} metai`}</p>
                    <div>
                        {payload.map((pld) => (
                            <div style={{ color: pld.stroke }}>
                                {formatCurrency(pld.value)}
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
        return null
    }
    return (
        <>
            <h1>{politician.name_surname}</h1>
            <div className="details">
                <div className="imagediv">
                    <img className="image" src={politician.image_link} />
                </div>
                <div className="info">
                    <span><strong>Frakcija:</strong> {politician.faction} </span><br />
                    <span><strong>Amžius: </strong> {Math.floor(Math.abs(new Date() - new Date(politician.birthday)) / 31536000000)} metai </span><br />
                    <span><strong>Seime: </strong> {years} metai </span><br />
                    <span><strong>Patarėjai: </strong> {politician.advisors} </span><br />
                    <span><strong>Turtas: </strong> {formatCurrency(politician_wealth_graph.at(-1).all_wealth)} </span><br />
                </div>
                <div className="tabs">
                    <ButtonGroup color="primary"
                        variant="text"
                        aria-label="outlined primary button group"
                        style={{ backgroundColor: "lightgray", width: "100%" }}>
                        <Button
                            style={{ width: "100%" }}
                            onClick={() => {
                                document.getElementById('wealth_report').style.display = 'block';
                                document.getElementById('advisors').style.display = 'none';
                                document.getElementById('trips').style.display = 'none';
                            }}
                        >Turto apžvalga</Button>
                        <Button
                            style={{ width: "100%" }}
                            onClick={() => {
                                document.getElementById('advisors').style.display = 'block';
                                document.getElementById('wealth_report').style.display = 'none';
                                document.getElementById('trips').style.display = 'none';
                            }}
                        >Patarėjai</Button>
                        <Button
                            style={{ width: "100%" }}
                            onClick={() => {
                                document.getElementById('trips').style.display = 'block';
                                document.getElementById('advisors').style.display = 'none';
                                document.getElementById('wealth_report').style.display = 'none';
                            }}
                        >Komandiruotės</Button>
                    </ButtonGroup>
                    <div id='wealth_report' className='wealth_report'>
                        <h3>Turto apžvalga</h3>
                        <ResponsiveContainer width="100%" height={500}>
                            <LineChart data={politician_wealth_graph}                        >
                                <Line type="monotone" dataKey="all_wealth" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" />
                                <XAxis dataKey="year_declared" />
                                <YAxis
                                    width={150}
                                    domain={[minYaxis, maxYaxis]}
                                    tickFormatter={(value) =>
                                        formatCurrency(value)
                                    }
                                />
                                <Tooltip
                                    content={<CustomTooltip />}
                                    wrapperStyle={{ backgroundColor: "white", borderStyle: "ridge", paddingLeft: "10px", paddingRight: "10px" }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div id='advisors' className='advisors'>
                        <h3>Patarėjai</h3>
                        <MaterialReactTable
                            columns={columns_advisors}
                            data={politician_advisors}
                            enableColumnActions={false}
                            enableTopToolbar={false}
                            enableGlobalFilter={false}
                            enableColumnDragging={false}
                            enablePagination={false}
                        />
                    </div>
                    <div id='trips' className='trips'>
                        <h3>Komandiruotės</h3>
                        <MaterialReactTable
                            columns={columns_business_trips}
                            data={politician_business_trips}
                            enableColumnOrdering
                            enableColumnActions={false}
                            enableTopToolbar={false}
                            enableGlobalFilter={false}
                            enableColumnDragging={false}
                            enablePagination={false}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}