const inputPagoMinimo = document.getElementById("pagoMin");
const inputPagoMaximo = document.getElementById("pagoMax");
const selectTipoTarifa = document.getElementById("tipotarifa");
const selectTarifa = document.getElementById("tarifa");
const selectMunicipio = document.getElementById("municipio");
const selectHsp = document.getElementById("hsp");
const instructionsP = document.getElementById("form__instructions");
const buttonVerificacion = document.querySelector("span.quotation__button");
const outputs = document.getElementsByClassName("output");
const inputNombre = document.getElementById("name");
const inputMail = document.getElementById("email");
const inputTel = document.getElementById("phone");
const inputRecibo = document.getElementById("recibo");
const inputMensaje = document.getElementById("message");
const inputSubmit = document.getElementById("isubmit");
var potenciaModulo = 410;
var tipodecambio = 21;
function verificarFactibilidad() {
    var minimo = inputPagoMinimo.value;
    var maximo = inputPagoMaximo.value;
    if(minimo != "" && maximo != ""){
        if((parseFloat(minimo)+parseFloat(maximo))/2 >= 1000){
            selectTipoTarifa.hidden = false;
            selectTarifa.hidden = false;
            buttonVerificacion.hidden = true;
            selectTipoTarifa.style = "animation: appear 0.5s;";
            instructionsP.style = "background-color: darkgoldenrod;"
            instructionsP.innerHTML = "Seleccione su tipo de tarifa."
        }else{
            instructionsP.style = "background-color: red;"
            instructionsP.innerHTML = "Lo sentimos, no le es factible implementar modulos solares."
        }
    }else{
        alert("Llena los campos correctamente")
    }
};
selectTipoTarifa.addEventListener("change", ()=>{
    selectMunicipio.hidden = false;
    selectMunicipio.style = "animation: appear 0.5s;"
    check(selectTipoTarifa.value, selectMunicipio.value);
    instructionsP.style = "background-color: darkgoldenrod;"
    instructionsP.innerHTML = "Seleccione el municipio donde se implementará el sistema fotovoltaico."
});
selectMunicipio.addEventListener("change", ()=>{
    var tipotarifa = selectTipoTarifa.value;
    var municipio = selectMunicipio.value;
    selectHsp.selectedIndex = municipio;
    selectTarifa.hidden = false;
    selectTarifa.style = "animation: appear 0.5s;";    
    check(tipotarifa, municipio);
    var consumoe = consumoEnergetico(parseFloat(inputPagoMinimo.value), parseFloat(inputPagoMaximo.value))
    var hsp = selectHsp.options[selectHsp.selectedIndex].text;
    var potenciafv = potenciaFV((consumoe/60), hsp);
    var numeromfv = numeroDeModulos(potenciafv, potenciaModulo);
    var promediop = (parseFloat(inputPagoMinimo.value)+parseFloat(inputPagoMaximo.value))/2;
    var ahorro = ahorroAnual(promediop,potenciafv);
    var inversion = costoSistemaFV(potenciafv);
    outputs[0].innerHTML = "Tamaño del sistema Solar:<br><span>"+((potenciafv)*numeromfv).toFixed(2)+"kWh</span><br>con <span>"+Math.round(numeromfv)+" Paneles</span>";
    outputs[0].style = "animation: appear 0.5s;";
    outputs[1].innerHTML = "Ahorro anual:<br><span>$"+ahorro+" MXN</span>";
    outputs[1].style = "animation: appear 0.5s;";
    outputs[2].innerHTML = "Inversión:<br><span>$"+inversion.toFixed(2)+" MXN</span>";
    outputs[2].style = "animation: appear 0.5s;";
    outputs[3].innerHTML = "Periodo de Recuperación:";
    outputs[3].style = "animation: appear 0.5s;";
    instructionsP.style = "background-color: green;"
    instructionsP.innerHTML = "Introduzca sus datos personales y (opcionalmente) su recibo para un calculo más aproximado"
    inputNombre.hidden = false;
    inputMail.hidden = false;
    inputTel.hidden = false;
    inputRecibo.hidden = false;
    inputMensaje.hidden = false;
    inputSubmit.hidden = false;
    });
function consumoEnergetico(pago_minimo, pago_maximo) {
    var promedio = ((pago_minimo + pago_maximo)/2);
    if(selectTipoTarifa.value == "1"){
        if(selectTarifa.value == "1"){
            return (promedio/2.49);
         }
         else if(selectTarifa.value == "2"){
             return (promedio/2.56);
         }
     }
     else if(selectTipoTarifa.value == "2"){
         return (promedio/4.46);
     }
 };
 function potenciaFV(cpd, hsp) {
     return(cpd/(hsp*0.77));
 };
 function numeroDeModulos(potenciafv, potenciamu) {
     return ((potenciafv * 1000)/potenciamu);
 };
 function ahorroAnual(promediopago, potenciafv) {
     pi = potenciaInversor(potenciafv);
     return ((promediopago*pi)-1140);
 };
 function potenciaInversor(potenciafv) {
     var potenciasInversor=[3.0, 3.8, 5.0, 6.0, 7.0, 7.7, 8.2, 10.0, 12.0]
     var potencia = potenciasInversor[0];
     for (potencia in potenciasInversor){
         if (potenciafv < potencia) {
             return potencia;
         }
     }
 };
 function costoSistemaFV(potenciafv) {
     if(potenciafv >= 0.8 && potenciafv <= 6){
         return (((potenciafv*1000)*1.52)*21)
     }
     if(potenciafv >= 6.01 && potenciafv <= 12){
         return (((potenciafv*1000)*1.4)*21)
     }
     if(potenciafv >= 12.01 && potenciafv <= 20){
         return (((potenciafv*1000)*1.25)*tipodecambio)
     }
 }
 function check(tipotarifa, municipio) {
    if(tipotarifa == 1){
        if(municipio > 58){
            selectTarifa.selectedIndex = 2;
        }else{
            selectTarifa.selectedIndex = 1;
        }
    }else{
        selectTarifa.selectedIndex = 4;
    }
};