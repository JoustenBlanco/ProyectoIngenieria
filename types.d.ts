export interface InputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  value?: string;                
  onChange?: React.ChangeEventHandler<HTMLInputElement>; 
  error?: string;
}

  export interface CreateStudent { 
    Primer_nombre: string,
    Segundo_nombre?: string,
    Primer_apellido: string,
    Segundo_apellido?: string,
    Fecha_nacimiento: string,
    Grado: string,
    Cedula: string,
    Correo_mep: string,
    Estado: string,
    Id_seccion: number,
  }

  export interface Student { 
    Id_alumno: number,
    Primer_nombre: string,
    Segundo_nombre?: string,
    Primer_apellido: string,
    Segundo_apellido?: string,
    Fecha_nacimiento: string,
    Grado: string,
    Cedula: string,
    Correo_mep: string,
    Estado: string,
    Id_seccion: number,
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
  Fecha_Inicio:string,                         
  Fecha_Finalizacion:string,                         
  }

  export interface SchoolYear{
    Id_anno_lectivo:number,
    Anno:number,
    Comentarios?:string,                         
    Estado:string,                               
    Id_colegio:number,
    Criterio_alerta_temprana:string,
    Fecha_Inicio:string,                         
    Fecha_Finalizacion:string,  
  }

  export interface EarlyWarning{
    Id_alerta:number,          
    Id_alumno:number,
    Descripcion:string,          
    Fecha:DateTime,
    Estado:string,        
    Id_funcionario:int,
  }

  export interface CreateEarlyWarning{          
    Id_alumno:number,
    Descripcion:string,          
    Fecha:string,
    Estado:string,        
    Id_funcionario:int,
  }

  export interface Record{ //Es la misma vara que asistencia
    Id_asistencia:number,                   
    Comentarios?:string,                 
    Fecha :string,          
    Lugar: string,                     
  }

  export interface CreateRecord{                  
    Comentarios?:string,                 
    Fecha :string,          
    Lugar: string,                     
  }

  export interface RecordXStudent{
    Id_asistencia:number,
    Id_alumno:number,
    Asistio:string,
    Comentarios?:string,
  }

  export interface ClasesXAlumnos{
    Id_alumno:number,
    Id_Clase:number,
    Id_dia_lectivo:number,
  }

  export interface Funcionarios{
    Id_funcionario:number,                                      
    Primer_nombre:string,                                        
    Segundo_nombre?:string,                                         
    Primer_apellido:string,                                          
    Segundo_apellido?:string,  
    Email:string,
    Numero_telefono:string,                                  
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
    Email:string,
    Numero_telefono:string,                                  
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
  Estado:string,                
  }

  export interface CreateParents{           
    Primer_nombre:string,
    Segundo_nombre?:string,        
    Primer_apellido:string,      
    Segundo_apellido?:string,      
    Cedula:string,               
    Numero:string,                
    Correo:string,      
    Estado:string,           
    }

    export interface Materia{
      Id_materia:number,        
      Nombre:string,       
      Descripcion?:string,      
      Tipo_materia:string,   
    }

    export interface CrearMateria{     
      Nombre:string,       
      Descripcion?:string,      
      Tipo_materia:string,   
    }

    export interface RolFuncionario{
      Id_rol_funcionario:number,                      
      Descripcion:string ,     
      Nombre:string,     
    }

    export interface CreateRolFuncionario{                     
      Descripcion:string ,     
      Nombre:string,     
    }

    export interface Clase {
      Id_clase: number;                 
      Descripcion?: string | null;            
      Estado: string;                             
      Id_funcionario: number;           
      Id_materia: number;               
      Id_seccion: number;                                   
    }

    export interface CreateClase {                
      Descripcion?: string | null;             
      Estado: string;                             
      Id_funcionario: number;           
      Id_materia: number;               
      Id_seccion: number;                                   
    }

    export interface ClaseXSessiones{
      Id_clase: number;
      Descripcion: string;
      Estado: string;
      Id_funcionario: number;
      Id_materia: number;
      Id_seccion: number;
      RAE_Secciones: Seccion;
      RAE_Materia:Materia;
       
    }

    export interface EncargadoXAlumno{
      Id_encargado_legal:number,
      Id_alumno:number,
    }

    export interface FuncionariosXAnnolectivo{
      Id_funcionario:number,
      Id_anno_lectivo:number,
    }

    export interface FuncionariosXRol{
      Id_funcionario:number,
      Id_rol_funcionario:number,
    }

    interface Seccion {
      Id_seccion: number;               
      Estado: string;                   
      Comentarios?: string | null;      
      Grado: string;                    
      Nombre: string;                   
      Id_funcionario: number;           
    }

    interface CreateSeccion {             
      Estado: string;                   
      Comentarios?: string | null;      
      Grado: string;                    
      Nombre: string;                   
      Id_funcionario: number;           
    }
    
  export interface User {
    Id: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Cedula: string;
    Status: string;
    PhoneNumber:string;
    Rol:number;
  }
