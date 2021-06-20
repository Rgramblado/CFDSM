import Accordion from "../Components/Accordion";

const lessons = [
    {
        title: "¿Qué es un CFD?",
        description: [`En finanzas, un contrato por diferencia (en inglés, contract for difference, CFD) 
        es un contrato entre dos partes, el comprador y el vendedor, que estipula que el vendedor pagará 
        al comprador la diferencia entre el valor actual de un activo subyacente 
        (acciones, índices, divisas, bonos, entre otros)y su valor en tiempo del contrato 
        (si la diferencia es negativa, el comprador paga al vendedor). 
        Si al momento de la finalización del contrato la diferencia es positiva, entonces el vendedor pagará al comprador.`,
        
        `En efecto, los CFD son derivados financieros que permiten a los traders tomar 
        ventaja de las subidas de precio (operaciones en largo) o bajadas de precios (operaciones en corto) 
        en los instrumentos financieros. Por ejemplo, cuando se aplica a acciones, 
        dicho contrato es un derivado de capital que permite a los traders especular sobre movimientos de precios de acciones, 
        sin la necesidad de la propiedad de las acciones subyacentes. 
        Los CFD pueden negociarse teniendo como activo subyacente acciones, bonos, futuros, productos básicos, índices o divisas.`,
        
        `Los CFD exigen el depósito por parte del inversor de un pequeño importe en concepto de garantías, 
        lo que permite operar como si se tuviera más dinero. En 2017 han tenido un gran crecimiento con la inclusión de 
        CFD sobre criptomonedas como el Bitcoin o el Ethereum.`]
    },
    {
        title: "¿Qué es un contrato en largo? ¿Y un contrato en corto?",
        description: [`Un contrato en largo es un contrato de compra del activo. Se podría hablar de una "apuesta" de 
        crecimiento del precio.`,
        `Un contrato en corto, por el contrario, es un contrato de venta del activo. Es una apuesta a una bajada del 
        precio`]
    },
    {
        title: "¿Qué es el apalancamiento?",
        description: [`El apalancamiento es un multiplicador de la garantía ofrecida. Pongamos un ejemplo: `,
        `Consideramos un contrato en largo sobre un activo, cuyo valor es 1000 USDT. Con un apalancamiento x10, 
        ofrecemos una garantía (margin) de 100 USDT. Al tener ese multiplicador, el tamaño de nuestra posición será
        de una unidad de dicho activo (100 x 10 = 1000).`,
        `Esto nos permite maximizar los beneficios (y las pérdidas de nuestra posición).`,
        `Al utilizar 900 USDT en nuestra operación que están fuera de nuestra garantía, si el valor total de nuestra 
        posición desciende por debajo de esos 900 USDT, nuestra posición será automáticamente liquidada, y nuestra
        garantía, perdida.`]
    },
    {
        title: "¿Qué es una operación market? ¿Y una operación limit?",
        description: [`Una operación market se realiza instantáneamente, al precio de mercado del activo en ese momento.`, 
        `Una operación limit se realiza cuando el activo llega a un precio marcado. En operaciones long, el precio que
        marcamos como limit es el precio máximo en el que ejecutamos la operación. En operaciones short, por el contrario,
        el precio límite es el precio mínimo que tiene que alcanzar el activo para ejecutarse.`]
    },
    {
        title: "Una vez conocido todo esto, ¿cómo opero en CFDSM?",
        description: [`Para operar en CFDSM los pasos son muy sencillos:`,
        `Lo primero es ir a la pestaña de mercados. Ahí encontrarás todos los mercados disponibles en nuestro
        servicio.`, 
        `Una vez seleccionado, esto nos llevará a la pestaña 'Trading'. En ella podremos ejecutar todas las operaciones 
        que deseemos (siempre y cuando tengamos fondos suficientes).`,
        `Además, si existen operaciones activas, podremos visualizarlas en la parte inferior de esta pestaña.`]
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