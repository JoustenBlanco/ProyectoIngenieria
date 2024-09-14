export interface InputProps {
    id: string;
    name: string;
    type: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    className?: string;
  }

  export interface CreateStudent { 
    Primer_nombre: string;
    Segundo_nombre?: string;
    Primer_apellido: string;
    Segundo_apellido?: string;
    Fecha_nacimiento: string; 
    Grado: string;
    Cedula: string;
    Correo_mep: string;
    Estado: string;
    Seccion: string;
  }

  export interface Student { 
    Id_alumno: Int,
    Primer_nombre: string;
    Segundo_nombre?: string;
    Primer_apellido: string;
    Segundo_apellido?: string;
    Fecha_nacimiento: string; 
    Grado: string;
    Cedula: string;
    Correo_mep: string;
    Estado: string;
    Seccion: string;
  }

  export interface College {
    Id_colegio:Int,              
    Nombre:string, 
    Direccion:string,  
    Telefono?:string,
    Correo:string 
  }

  export interface CreateCollege {
    Nombre:string, 
    Direccion:string,  
    Telefono?:string,
    Correo:string 
  }

  export interface CreateSchoolYear{
  Anno:number,
  Comentarios?:string,                         
  Estado:string,                               
  Id_colegio:number,
  Criterio_alerta_temprana:string,
  }

  export interface SchoolYear{
    Id_anno_lectivo:number,
    Anno:number,
    Comentarios?:string,                         
    Estado:string,                               
    Id_colegio:number,
    Criterio_alerta_temprana:string,
  }

  export interface EarlyWarning{
    Id_alerta:number,          
    Id_alumno:number,
    Descripcion:string,          
    Fecha:DateTime,
    Estado:string,        
    Id_Funcionario:int,
  }

  export interface CreateEarlyWarning{          
    Id_alumno:number,
    Descripcion:string,          
    Fecha:DateTime,
    Estado:string,        
    Id_Funcionario:int,
  }

  export interface Record{ //Es la misma vara que asistencia
    Id_asistencia:number,                   
    Comentarios?:string,                 
    Fecha :string,          
    Lugar: string,                     
  }

  export interface CreateRecord{ //Es la misma vara que asistencia                   
    Comentarios?:string,                 
    Fecha :string,          
    Lugar: string,                     
  }

  export interface RecordXStudent{
    Id_asistencia:number,
    Id_Alumno:number,
    Asistio:string,
  }

  export interface SchoolDay{
    Id_dia_lectivo:number,                                  
    Fecha:string,                          
    Comentario?:string,                                   
  }

  export interface CreateSchoolDay{                                 
    Fecha:string,                          
    Comentario?:string,                                   
  }

  
  export interface SpecialDay{
    Id_dia_especial:number,                                  
    Fecha:string,                          
    Comentarios?:string,                                   
  }

  export interface CreateSpecialDay{                                 
    Fecha:string,                          
    Comentarios?:string,                                   
  }

  export interface Classes{
    Id_Clase:number,                       
    Descripcion?:string,            
    Hora_inicio:DateTime,          
    Hora_finalizacion:DateTime,         
    Estado:string,           
    Id_Materia:number,
    Id_asistencia:number,          
    Id_dia_lectivo:number,           
  }

  export interface CreateClasses{                      
    Descripcion?:string,            
    Hora_inicio:DateTime,          
    Hora_finalizacion:DateTime,         
    Estado:string,           
    Id_Materia:number,
    Id_asistencia:number,          
    Id_dia_lectivo:number,           
  }

  export interface ClasesXAlumnos{
    Id_alumno:number,
    Id_Clase:number,
    Id_dia_lectivo:number,
  }

  export interface Funcionarios{
    Id_Funcionario:number,                                      
    Primer_nombre:string,                                        
    Segundo_nombre?:string,                                         
    Primer_apellido:string,                                          
    Segundo_apellido?:string,                                    
    Cedula:string,                                                
    Estado:string,                                                 
    Suplente:string,                                               
    Password:string,                                             
  }

  export interface CrearFuncionarios{                                     
    Primer_nombre:string,                                        
    Segundo_nombre?:string,                                         
    Primer_apellido:string,                                          
    Segundo_apellido?:string,                                    
    Cedula:string,                                                
    Estado:string,                                                 
    Suplente:string,                                               
    Password:string,                                             
  }

  export interface Parents{
  Id_encargado_legal:int,               
  Primer_nombre:string,
  Segundo_nombre?:string,        
  Primer_apellido:string,      
  Segundo_apellido?:string,      
  Cedula:string,               
  Numero:string,                
  Correo:string,                 
  }

  export interface CreateParents{           
    Primer_nombre:string,
    Segundo_nombre?:string,        
    Primer_apellido:string,      
    Segundo_apellido?:string,      
    Cedula:string,               
    Numero:string,                
    Correo:string,                 
    }

    export interface Materia{
      Id_Materia:number,        
      Nombre:string,       
      Descripcion?:string,      
      Tipo_materia:string,   
    }

    export interface CrearMateria{
      Id_Materia:number,        
      Nombre:string,       
      Descripcion?:string,      
      Tipo_materia:string,   
    }