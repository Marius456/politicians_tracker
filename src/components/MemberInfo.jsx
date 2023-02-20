import { formatCurrency } from "../utilities/formatCurrency";
import politicians_wealth_data from '../data/wealth.json';

export function MemberInfo(props) {
    let wealth = 0
    const politicians_wealth_current_year = politicians_wealth_data[0].year_declared
    const pol_wealth = politicians_wealth_data.find(item => item.politican_id === props.politician.id &&
        item.year_declared === politicians_wealth_current_year)
    if (pol_wealth) {
        for (let index = 0; index < pol_wealth.numbers.length; index++) {
            wealth += pol_wealth.numbers[index];
        }
    }

    let years = 0
    for (let index = 0; index < props.politician.tenures.length - 1; index++) {
        years += props.politician.tenures[index + 1] - props.politician.tenures[index];
    }
    return (
        <div>
            {props.politician.faction ? (
                <>
                    <span><strong>Frakcija:</strong> {props.politician.faction} </span>
                    <br />
                </>) : (
                <>
                    <span><strong>Frakcija:</strong> Neturi frakcijos </span>
                    <br />
                </>
            )}
            {props.politician.birthday ? (
                <>
                    <span>
                        <strong>Amžius: </strong> {Math.floor(Math.abs(new Date() - new Date(props.politician.birthday)) / 31536000000)} metai
                    </span>
                    <br />
                </>) : (
                <>
                    <span>
                        <strong>Amžius: </strong> Duomenų nėra </span>
                    <br />
                </>
            )}
            <span><strong>Seime: </strong> {years} metai </span><br />
            <span><strong>Patarėjai: </strong> {props.politician.advisors} </span><br />
            <span><strong>Turtas: </strong> {formatCurrency(wealth)} </span><br />
        </div>
    )
}