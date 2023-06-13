import React from 'react'
import { Document, Page, View, Text} from '@react-pdf/renderer'

const ComprobantePdfManual = ( { boletas } ) => {
    const fecha = `${boletas.created_at}`;
    const fechare = fecha.substring(0,10);
    const nombrec = `${boletas.name} ${boletas.apellido}`;
    const cant = `${boletas.monto} Bs`;
    const enc = `${fechare}                                                            ${boletas.monto}Bs`
    
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
    <Document>
        <Page size="A4">
        <Text style={{ 
                fontStyle: "italic",
                fontSize: "20px", 
                marginLeft:"30px",
                marginTop:"20px",
            }}
            > 
            {/* {boletas ? boletas.created_at : "..."} */}
            {enc}
        </Text>
        <Text style={{ color: "#3388af", fontSize: 26, textAlign:"center", marginTop:"10px"}}> 
            #{boletas ? boletas.nro_factura : "..."} 
        </Text>
        <Text style={{ color: "#3388af", fontSize: 24, textAlign:"center"}}> 
            RECIBO
        </Text>
            <View 
        style={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
            marginInlineStart: "100px",
            marginLeft: "30px",
            marginTop:"40px",
            fontStyle:'italic',
        }}
    >
        
        {/* <Text
            style={{
                color: "gray",
                fontStyle: "italic",
                fontSize: "20px",
            }} 
        > 
            FECHA: {boletas ? boletas.created_at : "..."} 
        </Text> */}
        {/* <Text
            style={{
                color: "gray",
                fontStyle: "italic",
                fontSize: "20px",
            }} 
        > 
            Bs: {boletas ? boletas.monto : "..."} 
        </Text> */}
        <Text
            style={{
                fontStyle: "italic",
                fontSize: "18px",
            }} 
        > 
            Recibi de: {nombrec} 
        </Text>
        <Text
            style={{
                fontStyle: "italic",
                fontSize: "18px",
                marginTop: "10px",
            }} 
        > 
            La cantidad de: {cant} 
        </Text>
        <Text
            style={{
                fontStyle: "italic",
                fontSize: "18px",
                marginTop: "10px",
            }} 
        > 
            Mensualidad: {boletas ? boletas.mensualidad : "..."} 
        </Text>
        <Text
            style={{
                fontStyle: "italic",
                fontSize: "18px",
                marginTop: "10px",
            }} 
        > 
            Tipo de Pago: Efectivo
        </Text>
        
        <Text style={{ color: "#3388af", fontSize: 20, marginLeft: "350px", marginTop:"60px"}}> 
            TOTAL: {cant}
        </Text>
            </View>
            <Text
            style={{
                marginTop: "20px",
            }} 
            >-----------------------------------------------------------------------------------------------------</Text>
        </Page>
    </Document>
  );
};

export default ComprobantePdfManual