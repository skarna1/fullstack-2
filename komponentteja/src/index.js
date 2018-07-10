import React from 'react';
import ReactDOM from 'react-dom';


const Osa = ({ osa, tehtavia }) => <p>{osa} {tehtavia}</p>
const Otsikko = ({ kurssi }) => <h1>{kurssi.nimi}</h1>
const Sisalto = ({ kurssi }) => {
    return (
        <div>
            {kurssi.osat.map(osa =>
                <Osa osa={osa.nimi}
                    tehtavia={osa.tehtavia}
                    key={osa.id} />)}
        </div>
    )
}

const Yhteensa = ({kurssi}) => {
    const laske_yhteensa = (summa, osa) => summa + osa.tehtavia
    const yhteensa = kurssi.osat.reduce(laske_yhteensa, 0)
    return (
        <div>
        <p>Yhteensä {yhteensa} tehtävää</p>
        </div>
    )
}

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto kurssi={kurssi} />
            <Yhteensa kurssi={kurssi} />
        </div>
    )
}

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10,
                id: 1
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7,
                id: 2
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14,
                id: 3
            },
            {
                nimi: 'Redux',
                tehtavia: 7,
                id: 4
            }
        ]
    }

    return (
        <div>
            <Kurssi kurssi={kurssi} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)