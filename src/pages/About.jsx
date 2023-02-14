import "./About.css";

export function About() {
    return (
        <>
            <div className="box">
                <div className="details">
                    <div className="title">
                        <h1>Apie Projektą</h1>
                    </div>
                    <div className="text">
                        <p>Projektas sukurtas Mariaus Žilgužio</p>
                        <a href="https://www.linkedin.com/in/marius-%C5%BEilgu%C5%BEis-827173242/">LinkedIn nuoroda</a>
                        <p>Sukūriau šį projektą naudodamas ReactJS <i>framework</i>.</p>
                        <a href="https://github.com/Marius456/politicians_tracker">GitHub nuoroda</a>
                        <p>Duomenys surinkti naudojant savo sukurta programa kurioje naudojau Python programavimo kalbą. Duomenys paimti iš oficialios seimo ir valstybinės mokesčių inspekcijos svetainės ir išsaugoti JSON formatu.</p>
                        <a href="https://github.com/Marius456/scrapper">Github nuoroda</a>
                    </div>
                </div>
                <div className="imagediv">
                    <img src="imgs/nykis.jpg" className="image"/>
                </div>
            </div>
        </>
    )
}