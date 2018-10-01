function loadDoc(metodo, url, d, numopcion)
{    
    var xhttp = new XMLHttpRequest();
    xhttp.open(metodo, url, true);
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
          
          if(numopcion == 1){
            jsonObj = JSON.parse(this.responseText);
            Consecutivo(jsonObj, d);
          }
      }
    };
    xhttp.send();
 }

function mandaURL(d, num){
  var s = document.getElementById("codigo").value;
  if(s.length >= 5)
  {
    var depend = document.getElementById("oficina").selectedIndex - 1;
    if(depend == 0){
      s = document.getElementById("dependenciaDecano1").selectedIndex-1;
    }else if(depend == 1){
      s = document.getElementById("dependenciaSistemas1").selectedIndex-1;
    }else if(depend == 2){
      s = document.getElementById("dependenciaElectronica1").selectedIndex-1;
    }
    loadDoc("GET","tratamientoDatos.php?dependencia="+depend+"&subdependencia="+s,d, num);
  }else{
    window.alert("No ha escogido una subdependencia");
  }
  
}

function agregarNumDocumentoCajaText(d,s){
  if (s != 0) {
    document.getElementById("codigo").value="8"+"."+d+"."+s;
  }else if (d==0){
      document.getElementById("codigo").value="8";        
    }else{
    document.getElementById("codigo").value="8"+"."+d;
    }   
}

function Consecutivo(obj, d){
  var s = document.getElementById("codigo").value;
  obj = obj.Dependencias;

  var j;
  var i;
  if (s.length >= 5) {
    for(i = 0; i < obj.length; i++)
    {
      if(obj[i].Numero == d)
      {
        for(j = 0; obj[i].SubDependencias.length; j++){
          if(obj[i].SubDependencias[j].Numero == s[4]){
            document.getElementById("codigo").value="8"+"."+obj[i].Numero+"."+obj[i].SubDependencias[j].Numero + "/" + obj[i].SubDependencias[j].Docs;
            break;
          }
        }
      }
    }
    
  }else{
    window.alert("No ha escogido una subdependencia");
  }
   
}

function mostrarFormulario(numItem)
{
  //ajax('GET', './tratamientoDatos.php');
  if (numItem == 0) {
      document.getElementById("dependenciaSistemas").style.visibility = "hidden";
      document.getElementById("dependenciaElectronica").style.visibility = "hidden";
      document.getElementById("dependenciaDecano").style.visibility = "hidden";
  }
    if( numItem == 1){
      //Cambia el estado del siguiente formulario correspondiente a visible
      document.getElementById("dependenciaSistemas").style.visibility = "hidden";
      document.getElementById("dependenciaElectronica").style.visibility = "hidden";
      document.getElementById("dependenciaDecano").style.visibility = "visible";
    }
    if( numItem == 4){
      //Cambia el estado del siguiente formulario correspondiente a visible
      document.getElementById("dependenciaDecano").style.visibility = "hidden";
      document.getElementById("dependenciaElectronica").style.visibility = "hidden";
      document.getElementById("dependenciaSistemas").style.visibility = "visible";

    }
    if( numItem == 5){
      //Cambia el estado del siguiente formulario correspondiente a visible
      document.getElementById("dependenciaDecano").style.visibility = "hidden";
      document.getElementById("dependenciaSistemas").style.visibility = "hidden";
      document.getElementById("dependenciaElectronica").style.visibility = "visible";

    }
    //ajax('GET','tratamientoDatos.php'); // ya no se entonces :()
    agregarNumDocumentoCajaText(numItem,0);
}

