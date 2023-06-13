import React from 'react'

const VistaComprobanteManual = ( { boletas } ) => {
    const fecha = `${boletas.created_at}`;
    const fechare = fecha.substring(0,10);
    const nombrec = `${boletas.name} ${boletas.apellido}`;
    const cant = `${boletas.monto} Bs`;
    // const [esTrans, setEsTrans] = useState[false];

    // function verTrans(){
    //     const tipoboleta = boletas.estado;
    //   switch (tipoboleta){
    //     case 1 :
    //         setEsTrans(true);
    //       break;
    //     case 3 :
    //         setEsTrans(false);
    //       break; 
    //     default :
    //       break; 
    //   }
    // };

  return (
    <div
        style={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
            marginInlineStart: "100px",
        }}
    >
        <h1 style={{ color: "#3388af", fontSize: "28px"}}> 
            #{boletas ? boletas.nro_factura : "..."} 
        </h1>
        <h1 style={{ color: "#3388af", fontSize: "26px"}}> 
            RECIBO
        </h1>
        <h1
            style={{
                color: "gray",
                fontStyle: "italic",
                fontSize: "20px",
            }} 
        > 
            FECHA: {fechare}
            {/* {boletas ? boletas.created_at : "..."}  */}
        </h1>
        <h1
            style={{
                color: "gray",
                fontStyle: "italic",
                fontSize: "20px",
            }} 
        > 
            Bs: {boletas ? boletas.monto : "..."} 
        </h1>
        <h1
            style={{
                color: "gray",
                fontStyle: "italic",
                fontSize: "20px",
            }} 
        > 
            Recibi de: {nombrec} 
        </h1>
        <h1
            style={{
                color: "gray",
                fontStyle: "italic",
                fontSize: "20px",
            }} 
        > 
            La cantidad de: {cant} 
        </h1>
        <h1
            style={{
                color: "gray",
                fontStyle: "italic",
                fontSize: "20px",
            }} 
        > 
            Mensualidad: {boletas ? boletas.mensualidad : "..."} 
        </h1>
        <h1
            style={{
                color: "gray",
                fontStyle: "italic",
                fontSize: "20px",
            }} 
        > 
            Tipo de Pago: Efectivo
        </h1>
        
        <br/>
        <h1 style={{ color: "#3388af", fontSize: "20px"}}> 
            TOTAL: {cant}
        </h1>
    </div>
  );
};

export default VistaComprobanteManual;