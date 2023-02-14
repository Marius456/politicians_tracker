import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import React, { useMemo } from 'react';
import { useParams } from "react-router-dom";
import politicians_data from "../data/politicians.json";
import MaterialReactTable from 'material-react-table';
import { formatCurrency } from "../utilities/formatCurrency";
import { AreaChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';

import wealth_data from '../data/wealth.json';
import business_trips_data from '../data/business_trips.json';
import advisors_data from '../data/advisors.json';

import "./Member_Info.css";


export function Member_Info() {
    const { id } = useParams();
    const politician = politicians_data.find(item => item.id === Number(id))
    const politician_advisors = advisors_data.filter(item => item.politican_id === politician.id)
    const politician_business_trips = business_trips_data.filter(item => item.politican_id === politician.id)
    const politician_wealth = wealth_data.filter(item => item.politican_id === politician.id)
    let years = 0
    for (let index = 0; index < politician.tenures.length - 1; index++) {
        years += politician.tenures[index + 1] - politician.tenures[index];
    }
    let politician_wealth_graph = []
    const last_declared_year = wealth_data[0].year_declared
    for (let i = 0; i < politician_wealth.length; i++) {
        let wealth = 0
        for (let index = 0; index < politician_wealth[i].numbers.length; index++) {
            wealth += politician_wealth[i].numbers[index];
        }
        politician_wealth_graph.unshift({ "year_declared": politician_wealth[i].year_declared, "wealth": wealth })
    }


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
                    <span><strong>Turtas: </strong> {formatCurrency(politician_wealth_graph.at(-1).wealth)} </span><br />
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
                        <AreaChart width={400} height={400} data={politician_wealth_graph}>
                            <Area type="monotone" dataKey="wealth" stroke="#8884d8" fill='#8884d8' />
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="year_declared" />
                            <YAxis domain={['datamin', 'dataMax+1000']}/>
                            <Tooltip />
                        </AreaChart>
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