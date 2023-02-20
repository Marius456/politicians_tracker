import { formatCurrency } from "../utilities/formatCurrency";
import { CartesianGrid, XAxis, YAxis, Tooltip, Line, ResponsiveContainer, LineChart } from 'recharts';
import politician_wealth_data from '../data/wealth.json';
import politician_spouse_data from '../data/spouses.json';
import politician_spouse_wealth_data from '../data/spouses_wealth.json';

export function WealthChart(props) {
    const politician_wealth_list = politician_wealth_data.filter(item => item.politican_id === props.politician.id)
    const spouse = politician_spouse_data.find(item => item.politican_id === props.politician.id)
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
    const min = Math.min(...politician_wealth_graph.map((o) => o.all_wealth))
    const minYaxis = min * 0.9

    const CustomTooltip = ({ active, payload, label }) => {
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
    )
}