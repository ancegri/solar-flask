const inputPagoMinimo = document.getElementById("pagoMin");
const inputPagoMaximo = document.getElementById("pagoMax");
const selectTipoTarifa = document.getElementById("tipotarifa");
const selectTarifa = document.getElementById("tarifa");
const selectMunicipio = document.getElementById("municipio");
const buttonVerificacion = document.querySelector("span.quotation__button");
function verificarFactibilidad() {
    var minimo = inputPagoMinimo.value;
    var maximo = inputPagoMaximo.value;
    if(minimo != "" && maximo != ""){
        if((parseFloat(minimo)+parseFloat(maximo))/2 >= 100){
            selectTipoTarifa.hidden = false;
            selectTarifa.hidden = false;
            buttonVerificacion.hidden = true;
            selectTipoTarifa.style = "animation: appear 0.5s;"
        }
    }else{
        alert("Llena los campos correctamente")
    }
};
selectTipoTarifa.addEventListener("change", ()=>{
    if(selectMunicipio.selectedIndex != 0){
        selectMunicipio.hidden = false;
        selectMunicipio.style = "animation: appear 0.5s;"
        check(selectTipoTarifa.value, selectMunicipio.value);
    }else{
        if(selectMunicipio.value != 0){
            selectMunicipio.hidden = false;
            check(selectTipoTarifa.value, selectMunicipio.value);
        }
    }
});
selectMunicipio.addEventListener("change", ()=>{
    var tipotarifa = selectTipoTarifa.value;
    var municipio = selectMunicipio.value;
    selectTarifa.hidden = false;
    selectTarifa.style = "animation: appear 0.5s;";    
   check(tipotarifa, municipio);
   function consumoEnergetico(pago_minimo, pago_maximo) {
       promedio = ((pago_minimo + pago_maximo)/2)
       if(selectTipoTarifa == "1"){
           if(selectTarifa == "1"){
               return promedio/2.49;
            }
            else if(selectTarifa == "2"){
                return promedio/2.56;
            }
        }
        else if(selectTipoTarifa == "2"){
            return promedio/4.46
        }
    };
});
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