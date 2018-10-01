<?php
$nombreArchivo = "documentos.json";

// verificamos si el archivo "documentos.json" existe
if( !file_exists($nombreArchivo) ){
    // Creamos la estructura para el nuevo archivo
    $datosJSON = array("Dependencias"=>array(
        array("Nombre"=>"Decanatura",
            "Numero"=>1,
            "SubDependencias"=>array(
                array(
                    "Nombre"=>"Decano",
                    "Numero"=>1,
                    "Docs"=>0
                ),
                array(
                    "Nombre"=>"Secretaria",
                    "Numero"=>2,
                    "Docs"=>0
                )
            )
        ),
        array("Nombre"=>"DepSistemas",
            "Numero"=>4,
            "SubDependencias"=>array(
                array(
                    "Nombre"=>"Jefe de Departamento",
                    "Numero"=>1,
                    "Docs"=>0
                ),
                array(
                    "Nombre"=>"Tesoreria",
                    "Numero"=>2,
                    "Docs"=>0
                )
            )
        ),
        array("Nombre"=>"DepElectronica",
            "Numero"=>5,
            "SubDependencias"=>array(
                array(
                    "Nombre"=>"Jefe de Departamento",
                    "Numero"=>1,
                    "Docs"=>0
                ),
                array(
                    "Nombre"=>"Tesoreria",
                    "Numero"=>2,
                    "Docs"=>0
                )
            )
        )
        )
    );

    $datosCod = json_encode($datosJSON);
    echo $datosCod;
    file_put_contents($nombreArchivo, $datosCod);

}else{ 

    $archivo = json_decode(file_get_contents($nombreArchivo),true);

    echo json_encode($archivo);
    
    file_put_contents($nombreArchivo, json_encode($archivo)); 
}

if(isset($_GET["dependencia"]) or isset($_GET["subdependencia"]))
{
    $dependencia = $_GET["dependencia"];
    $subdependencia = $_GET["subdependencia"];

    $json = json_decode(file_get_contents($nombreArchivo, true)); 
    
    $json->Dependencias[$dependencia]->SubDependencias[$subdependencia]->Docs++;

    file_put_contents($nombreArchivo, json_encode($json));
}

?>