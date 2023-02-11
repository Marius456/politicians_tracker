import "./About.css";

export function About(){
    return(
        <>
            <h1>Apie</h1>
            <div className="box">
                <div className="title">
                    <span>Titulinis</span>
                </div>
                <div className="text">
                    <p>Projektas sukurtas Mariaus Žilgužio</p>
                    <a href="https://www.linkedin.com/in/marius-%C5%BEilgu%C5%BEis-827173242/">LinkedIn nuoroda</a>
                    <p>Sukūriau šį projektą naudodamas ReactJS <i>framework</i>.</p>
                    <a href="https://github.com/Marius456/politicians_tracker">GitHub nuoroda</a>
                    <p>Duomenys surinkti naudojant savo sukurta programa kurioje naudojau Python programavimo kalbą. Duomenys paimti iš oficialios seimo ir mokesčių inspekcijos svetainės ir išsaugoti JSON formatu.</p>
                    <a href="https://github.com/Marius456/scrapper">Github nuoroda</a>
                </div>
            </div>
        </> 
    )
}