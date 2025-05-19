interface InputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  pattern?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
}

interface ButtonsProps {
  reportType: string;
  data: Record<string, string | number>[];
  studentName: string | null
  studentId: string | null
}

interface CreateStudent {
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
interface CreateStudent {
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

interface Student {
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

interface College {
  Id_colegio: Int,
  Nombre: string,
  Direccion: string,
  Telefono?: string,
  Correo: string
}

interface CreateCollege {
  Nombre: string,
  Direccion: string,
  Telefono?: string,
  Correo: string
}

interface CreateSchoolYear {
  Anno: number,
  Comentarios?: string,
  Estado: string,
  Id_colegio: number,
  Criterio_alerta_temprana: string,
  Fecha_Inicio: string,
  Fecha_Finalizacion: string,
}

interface SchoolYear {
  Id_anno_lectivo: number,
  Anno: number,
  Comentarios?: string,
  Estado: string,
  Id_colegio: number,
  Criterio_alerta_temprana: string,
  Fecha_Inicio: string,
  Fecha_Finalizacion: string,
}

interface EarlyWarning {
  Id_alerta: number,
  Id_alumno: number,
  Descripcion: string,
  Fecha: DateTime,
  Estado: string,
  Id_funcionario: int,
}

interface CreateEarlyWarning {
  Id_alumno: number,
  Descripcion: string,
  Fecha: string,
  Estado: string,
  Id_funcionario: int,
}

interface AttendanceRecord { //Es la misma vara que asistencia
  Id_asistencia: number,
  Comentarios?: string,
  Fecha: string,
  Lugar: string,
  Hora_inicio: DateTime,
  Hora_finalizacion: DateTime,
  Id_clase: int
}

interface CreateRecord {
  Comentarios?: string,
  Fecha: string,
  Lugar: string,
  Hora_inicio: DateTime,
  Hora_finalizacion: DateTime,
  Id_clase: int
}

interface RecordXStudent {
  Id_asistencia: number,
  Id_alumno: number,
  Asistio: string,
  Comentarios?: string,
}

interface ClasesXAlumnos {
  Id_alumno: number,
  Id_Clase: number,
  Id_dia_lectivo: number,
}

interface Funcionarios {
  Id_funcionario: number,
  Primer_nombre: string,
  Segundo_nombre?: string,
  Primer_apellido: string,
  Segundo_apellido?: string,
  Email: string,
  Numero_telefono: string,
  Cedula: string,
  Estado: string,
  Suplente: string,
  Password: string,
  Change_password: string,
}

interface CrearFuncionarios {
  Primer_nombre: string,
  Segundo_nombre?: string,
  Primer_apellido: string,
  Segundo_apellido?: string,
  Email: string,
  Numero_telefono: string,
  Cedula: string,
  Estado: string,
  Suplente: string,
  Password: string,
  Change_password: string,
}

interface Parents {
  Id_encargado_legal: int,
  Primer_nombre: string,
  Segundo_nombre?: string,
  Primer_apellido: string,
  Segundo_apellido?: string,
  Cedula: string,
  Numero: string,
  Correo: string,
  Estado: string,
}

interface CreateParents {
  Primer_nombre: string,
  Segundo_nombre?: string,
  Primer_apellido: string,
  Segundo_apellido?: string,
  Cedula: string,
  Numero: string,
  Correo: string,
  Estado: string,
}

interface Materia {
  Id_materia: number,
  Nombre: string,
  Descripcion?: string,
  Tipo_materia: string,
}

interface CrearMateria {
  Nombre: string,
  Descripcion?: string,
  Tipo_materia: string,
}

interface RolFuncionario {
  Id_rol_funcionario: number,
  Descripcion: string,
  Nombre: string,
}

interface CreateRolFuncionario {
  Descripcion: string,
  Nombre: string,
}

interface Clase {
  Id_clase: number;
  Descripcion?: string | null;
  Estado: string;
  Id_funcionario: number;
  Id_materia: number;
  Id_seccion: number;
  RAE_Funcionarios: FuncionariosXSeccion;
  RAE_Materia: MateriaLite;
  RAE_Secciones: SeccionLite;
}

interface SeccionLite {
  Nombre: string,
}

interface MateriaLite {
  Nombre: string,
}

interface CreateClase {
  Descripcion?: string | null;
  Estado: string;
  Id_funcionario: number;
  Id_materia: number;
  Id_seccion: number;
}

interface ClaseXSessiones {
  Id_clase: number;
  Descripcion: string;
  Estado: string;
  Id_funcionario: number;
  Id_materia: number;
  Id_seccion: number;
  RAE_Secciones: Seccion;
  RAE_Materia: Materia;

}

interface EncargadoXAlumno {
  Id_encargado_legal: number,
  Id_alumno: number,
}

interface FuncionariosXAnnolectivo {
  Id_funcionario: number,
  Id_anno_lectivo: number,
}

interface FuncionariosXRol {
  Id_funcionario: number,
  Id_rol_funcionario: number,
}

interface Seccion {
  Id_seccion: number;
  Estado: string;
  Comentarios?: string | null;
  Grado: string;
  Nombre: string;
  Id_funcionario: number;
  RAE_Funcionarios: FuncionariosXSeccion;
}

interface FuncionarioXSeccion {
  Primer_nombre: string;
  Primer_apellido: string;
  Segundo_apellido: string;
}

interface CreateSeccion {
  Estado: string;
  Comentarios?: string | null;
  Grado: string;
  Nombre: string;
  Id_funcionario: number;
}

interface User {
  Id: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Cedula: string;
  Status: string;
  PhoneNumber: string;
  Rol: string;
}

interface ExcelData {
  [key: string]: string | number | boolean | Date;
}

interface ExcelKeyValuePair {
  key: string;
  value: string | number;
}

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onSubmit?: () => void;
  onExcel?: () => void;
}