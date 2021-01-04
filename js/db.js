const claveform = document.querySelector("#addclave");
const claveformmodal = document.querySelector("#modal-form");

claveform.addEventListener("submit",e=>{
    e.preventDefault();
    const clave ={
        sitio:claveform.sitio.value,
        email:claveform.email.value,
        clave:claveform.clave.value
    };

    db.collection("claves").add(clave).then(()=>{
        claveform.reset();
        var instance = M.Modal.getInstance(claveformmodal);
        instance.close();
        claveform.querySelector(".error").textContent="";
    })
    .catch(err=>{
        claveform.querySelector(".error").textContent="Error al guardar";
    })
});