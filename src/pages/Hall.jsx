import React from "react";
import politicians_data from '../data/politicians.json';
import wealth_data from '../data/wealth.json';
import { useEffect } from 'react'
import { formatCurrency } from "../utilities/formatCurrency";
const coordinates = [

    [189, 299],
    [197, 278],
    [209, 259],
    [223, 242],
    [267, 211],
    [297, 202],
    [357, 201],
    [386, 211],
    [432, 242],
    [445, 260],
    [457, 278],
    [466, 299],
    [153, 287],
    [162, 266],
    [172, 246],
    [186, 228],
    [201, 211],
    [241, 182],
    [260, 173],
    [281, 166],
    [302, 162],
    [352, 162],
    [373, 166],
    [394, 173],
    [414, 182],
    [454, 212],
    [469, 228],
    [482, 246],
    [493, 266],
    [501, 287],
    [117, 275],
    [126, 254],
    [136, 234],
    [148, 215],
    [162, 197],
    [178, 181],
    [219, 151],
    [238, 142],
    [259, 134],
    [280, 128],
    [302, 124],
    [352, 124],
    [374, 128],
    [396, 133],
    [416, 141],
    [436, 152],
    [476, 181],
    [492, 197],
    [506, 215],
    [518, 234],
    [529, 254],
    [537, 275],
    [81, 264],
    [90, 242],
    [99, 222],
    [111, 202],
    [125, 183],
    [140, 166],
    [156, 150],
    [196, 121],
    [216, 110],
    [237, 101],
    [258, 95],
    [280, 90],
    [302, 86],
    [352, 86],
    [375, 89],
    [396, 94],
    [417, 101],
    [438, 110],
    [458, 120],
    [498, 150],
    [515, 166],
    [530, 184],
    [543, 202],
    [555, 222],
    [565, 243],
    [573, 264],
    [45, 252],
    [52, 231],
    [63, 210],
    [74, 190],
    [87, 170],
    [101, 152],
    [117, 136],
    [134, 119],
    [174, 90],
    [194, 80],
    [215, 70],
    [235, 62],
    [257, 56],
    [280, 51],
    [302, 48],
    [352, 48],
    [375, 51],
    [397, 56],
    [418, 62],
    [440, 70],
    [460, 79],
    [480, 90],
    [521, 120],
    [537, 135],
    [553, 152],
    [567, 170],
    [580, 190],
    [591, 210],
    [601, 230],
    [609, 252],
    [10, 241],
    [18, 219],
    [27, 197],
    [38, 177],
    [50, 158],
    [64, 139],
    [78, 121],
    [94, 104],
    [111, 89],
    [152, 60],
    [171, 48],
    [192, 39],
    [213, 30],
    [235, 22],
    [257, 17],
    [279, 13],
    [302, 10],
    [352, 10],
    [375, 13],
    [397, 17],
    [420, 23],
    [441, 30],
    [462, 38],
    [482, 48],
    [503, 59],
    [543, 89],
    [560, 104],
    [576, 121],
    [591, 139],
    [604, 157],
    [616, 177],
    [628, 198],
    [637, 219],
    [645, 241],
    [539, 14],
    [571, 37],
    [600, 65],
    [629, 100],
    [651, 135]
];

export function Hall() {
    useEffect(() => {
        for (let index = 0; index < coordinates.length; index++) {
            var el = document.getElementById(index)
            let politician = politicians_data.find(item => item.sitting_position === index)

            el.addEventListener('click', function (e) {
                window.location = politician.link;
            });

            el.addEventListener('mouseenter', function (e) {
                document.getElementById('id' + index).style.display = 'block';
                if (politician) {
                    e.currentTarget.setAttribute('fill', politician.faction_color);

                    document.getElementById('id' + index).innerHTML = ""

                    let name_div = document.createElement("div");
                    name_div.id = "name_id_" + index;
                    name_div.className = "name_class_" + index;
                    name_div.style.backgroundColor = "lightgrey";
                    name_div.style.width = "auto";
                    name_div.style.height = "15%";
                    name_div.style.fontSize = "0.7em";
                    name_div.style.textAlign = "center";
                    name_div.style.fontWeight = "bold";
                    name_div.textContent = `${politician.name_surname}`
                    document.getElementById('id' + index).appendChild(name_div);

                    let image_div = document.createElement("div");
                    image_div.id = "image_div_id_" + index;
                    image_div.className = "image_div_class_" + index;
                    image_div.style.width = "30%";
                    image_div.style.height = "85%";
                    image_div.style.float = "left";
                    document.getElementById('id' + index).appendChild(image_div);

                    let image = document.createElement("img");
                    image.id = "image_id_" + index;
                    image.className = "image_class_" + index;
                    image.style.minWidth = "0";
                    image.style.width = "100%";
                    image.style.height = "100%";
                    image.setAttribute("src", politician.image_link);
                    document.getElementById("image_div_id_" + index).appendChild(image);


                    let bio_div = document.createElement("div");
                    bio_div.id = "bio_id_" + index;
                    bio_div.className = "bio_class_" + index;
                    bio_div.style.width = "70%";
                    bio_div.style.height = "100%";
                    bio_div.style.float = "right";
                    bio_div.style.fontSize = "0";
                    document.getElementById('id' + index).appendChild(bio_div);

                    const bio_fontSize = "7px"

                    var faction_span = document.createElement('span');
                    faction_span.style.fontSize = bio_fontSize;
                    faction_span.innerHTML = '<strong>Frakcija: </strong>' + politician.faction + "<br>";
                    var p3 = document.getElementById("bio_id_" + index);
                    p3.appendChild(faction_span);

                    var age_span = document.createElement('span');
                    age_span.style.fontSize = bio_fontSize;
                    age_span.innerHTML = '<strong>Amžius: </strong>' + Math.floor(Math.abs(new Date() - new Date(politician.birthday)) / 31536000000) + "<br>";
                    p3.appendChild(age_span);

                    var age_span = document.createElement('span');
                    age_span.style.fontSize = bio_fontSize;
                    let years = 0
                    for (let index = 0; index < politician.tenures.length - 1; index++) {
                        years += politician.tenures[index + 1] - politician.tenures[index];
                    }
                    age_span.innerHTML = '<strong>Seime: </strong>' + years + "<br>";
                    p3.appendChild(age_span);

                    var helpers_span = document.createElement('span');
                    helpers_span.style.fontSize = bio_fontSize;
                    helpers_span.innerHTML = '<strong>Patarėjai: </strong>' + politician.advisors + "<br>";
                    p3.appendChild(helpers_span);

                    let wealth = 0
                    const politicians_wealth_current_year = wealth_data[0].year_declared
                    const pol_wealth = wealth_data.find(item => item.politican_id === politician.id &&
                        item.year_declared === politicians_wealth_current_year)
                    if (pol_wealth) {
                        for (let index = 0; index < pol_wealth.numbers.length; index++) {
                            wealth += pol_wealth.numbers[index];
                        }
                    }
                    var wealth_span = document.createElement('span');
                    wealth_span.style.fontSize = bio_fontSize;
                    wealth_span.innerHTML = '<strong>Turtas: </strong>' + formatCurrency(wealth) + "<br>";
                    p3.appendChild(wealth_span);
                }
            });

            el.addEventListener('mouseleave', function (e) {
                if (politician) {
                    e.currentTarget.setAttribute('fill', politician.faction_color);
                }
                else {
                    e.currentTarget.setAttribute('fill', '#E3E8EC');
                }
                document.getElementById('id' + index).style.display = 'none';
            });
        }

    }, [])
    return (
        <div>
            <h1>Salė</h1>
            <div
                height="800"
                width="700"
                style={{
                    width: "100%",
                }}>
                <svg
                    viewBox="0 0 700 350"
                    overflow="visible"
                >
                    {
                        coordinates.map((coord, index) =>
                        (
                            <circle
                                id={index}
                                key={index}
                                cx={coord[0] + 10}
                                cy={coord[1] + 10}
                                r="10"
                                fill={politicians_data.find(item => item.sitting_position === index) ? politicians_data.find(item => item.sitting_position === index).faction_color : "#E3E8EC"}
                            />
                        ))
                    }
                    {
                        coordinates.map((coord, index) =>
                        (
                            <foreignObject
                                id={"id" + index}
                                key={"key" + index}
                                x={coord[0] + 10 + 200 > 700 ? coord[0] + 10 - 200 : coord[0] + 10}
                                y={coord[1] - 100 < 0 ? coord[1] + 20 : coord[1] - 100}
                                width="200"
                                height="100"
                                style={{
                                    border: "2px solid green",
                                    background: "white",
                                    display: "none"
                                }}>
                            </foreignObject>
                        ))
                    }
                </svg>
            </div>
        </div>
    );
}