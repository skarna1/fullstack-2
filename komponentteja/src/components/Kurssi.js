import React from 'react'


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

export default Kurssi