

export const getFunctionaryIdByCedula = async (cedula: number) => {
    const uri = `/api/funcionarios/cedula/[ced]?cedula=${cedula}`;
    const response = await fetch(uri, {
        cache: "no-store",
    });
    if (!response.ok) {
        throw new Error("Error fetching functionary ID");
    }
    const data: Funcionarios = await response.json();
    return data.Id_funcionario;
};

export const createStudentPerSeccion = async (
    students: CreateStudent[],
    Id_seccion: number
) => {
    const uri = `/api/alumnos`;
    const response = await fetch(uri, {
        cache: "no-store",
    });
    if (!response.ok) {
        console.log("No se pudo obtener la lista de estudiantes por seccion");
        throw new Error("Error creating student per section");
    }
    const data: Student[] = await response.json();
    var studentsToCreate: CreateStudent[] = [];
    var studentsToUpdate: Student[] = [];
    for (let i = 0; i < students.length; i++) {
        var alreadyExists = false;
        for (let j = 0; j < data.length && !alreadyExists; j++) {
            if (students[i].Cedula === data[j].Cedula) {
                alreadyExists = true;
                studentsToUpdate.push(data[j]);
            }
        }
        if (!alreadyExists) {
            studentsToCreate.push(students[i]);
        }
    }
    studentsToUpdate = studentsToUpdate.map((student: Student) => {
        return {
            ...student,
            Id_alumno: student.Id_alumno,
            Id_seccion: Id_seccion,
        };
    });

    if (studentsToCreate.length !== 0) {
        for (const student of studentsToCreate) {
            const responseCreate = await fetch(uri, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
                body: JSON.stringify(student),
            });
            if (!responseCreate.ok) {
                throw new Error("Error creating students");
            }
        }
    }
    if (studentsToUpdate.length !== 0) {
        for (const student of studentsToUpdate) {
            const responseUpdate = await fetch(uri, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(student),
                cache: "no-store",
            });
            if (!responseUpdate.ok) {
                throw new Error("Error updating students");
            }
        }
    }
};
