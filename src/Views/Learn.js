import Accordion from "../Components/Accordion";

const lessons = [
    {
        title: "¿Qué es un CFD?",
        description: `En finanzas, un contrato por diferencia (en inglés, contract for difference, CFD) es un contrato entre dos partes, el comprador y el vendedor, que estipula que el vendedor pagará al comprador la diferencia entre el valor actual de un activo subyacente (acciones, índices, divisas, bonos, entre otros)y su valor en tiempo del contrato (si la diferencia es negativa, el comprador paga al vendedor). Si al momento de la finalización del contrato la diferencia es positiva, entonces el vendedor pagará al comprador.
        
        En efecto, los CFD son derivados financieros que permiten a los traders tomar ventaja de las subidas de precio (operaciones en largo) o bajadas de precios (operaciones en corto) en los instrumentos financieros. Por ejemplo, cuando se aplica a acciones, dicho contrato es un derivado de capital que permite a los traders especular sobre movimientos de precios de acciones, sin la necesidad de la propiedad de las acciones subyacentes. Los CFD pueden negociarse teniendo como activo subyacente acciones, bonos, futuros, productos básicos, índices o divisas.
        
        Los CFD exigen el depósito por parte del inversor de un pequeño importe en concepto de garantías, lo que permite operar como si se tuviera más dinero. En 2017 han tenido un gran crecimiento con la inclusión de CFD sobre criptomonedas como el Bitcoin o el Ethereum.`
    },
    {
        title: "¿Qué es un contrato en largo?¿Y un contrato en corto?",
        description: `En finanzas, un contrato por diferencia (en inglés, contract for difference, CFD) es un contrato entre dos partes, el comprador y el vendedor, que estipula que el vendedor pagará al comprador la diferencia entre el valor actual de un activo subyacente (acciones, índices, divisas, bonos, entre otros)y su valor en tiempo del contrato (si la diferencia es negativa, el comprador paga al vendedor). Si al momento de la finalización del contrato la diferencia es positiva, entonces el vendedor pagará al comprador.
        
        En efecto, los CFD son derivados financieros que permiten a los traders tomar ventaja de las subidas de precio (operaciones en largo) o bajadas de precios (operaciones en corto) en los instrumentos financieros. Por ejemplo, cuando se aplica a acciones, dicho contrato es un derivado de capital que permite a los traders especular sobre movimientos de precios de acciones, sin la necesidad de la propiedad de las acciones subyacentes. Los CFD pueden negociarse teniendo como activo subyacente acciones, bonos, futuros, productos básicos, índices o divisas.
        
        Los CFD exigen el depósito por parte del inversor de un pequeño importe en concepto de garantías, lo que permite operar como si se tuviera más dinero. En 2017 han tenido un gran crecimiento con la inclusión de CFD sobre criptomonedas como el Bitcoin o el Ethereum.`
    }
]
export default function Learn(){
    return(
        <>
        <h1>CFDSM Learn</h1>
        <h2>Aquí podrás aprender todo lo que necesitas para operar en nuestro servicio.</h2>
        {lessons.map(lesson => {
            return(<Accordion
                title={lesson.title}
                description={lesson.description}/>)
        })}
        </>
    )
}