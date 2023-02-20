import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useParams } from "react-router-dom";
import { AdvisorsTable } from '../components/AdvisorsTable';
import { MemberInfo } from '../components/MemberInfo';
import { TripsTable } from '../components/TripsTable';
import { WealthChart } from '../components/WealthChart';
import politicians_data from "../data/politicians.json";


import "./Member_Info.css";


export function Member_Info() {
    const { id } = useParams();
    const politician = politicians_data.find(item => item.id === Number(id))

    return (
        <>
            <h1>{politician.name_surname}</h1>
            <div className="details">
                <div className="imagediv">
                    <img className="image" src={politician.image_link} />
                </div>
                <div className="info" >
                    <MemberInfo politician={politician} />
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
                        <h3>Šeimos turto apžvalga</h3>
                        <WealthChart politician={politician} />
                    </div>
                    <div id='advisors' className='advisors'>
                        <h3>Patarėjai</h3>
                        <AdvisorsTable politician={politician} />
                    </div>
                    <div id='trips' className='trips'>
                        <h3>Komandiruotės</h3>
                        <TripsTable politician={politician} />
                    </div>
                </div>
            </div>
        </>
    )
}