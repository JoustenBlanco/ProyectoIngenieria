import { NextResponse } from "next/server";
import {prisma} from "../../../../lib/prisma";


//filtra por funcionarios de momento no le veo sentido al findMany
//api/funcionarios_x_rol?Id_funcionario=1
export async function GET(_req: Request) {
  try {
    const { searchParams } = new URL(_req.url);
    const Id_funcionario = searchParams.get("Id_funcionario");
    console.log("El id del funcionario es ", Id_funcionario);
    const result = await prisma.rAE_Funcionarios_X_Rol.findFirst({
      where: { Id_funcionario: Number(Id_funcionario) },
    });
    console.log("Resultado en api");
    console.log(result);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error fetching FuncionariosXRol" },
      { status: 500 }
    );
  }
}

export async function POST(_req: Request) {
  try {
    const data: FuncionariosXRol = await _req.json();
    console.log("Desde el post", data);
    const result = await prisma.rAE_Funcionarios_X_Rol.create({
      data: {
        Id_rol_funcionario: data.Id_rol_funcionario,
        Id_funcionario: data.Id_funcionario,
      },
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error creating FuncionariosXRol" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: Request) {
  try {
    const requestBody = await _req.json();

    if (!requestBody.Id_funcionario) {
      return NextResponse.json(
        { error: "Se requiere el ID del funcionario (Id_funcionario)" },
        { status: 400 }
      );
    }

    const { Id_funcionario } = requestBody;

    const existingRelations = await prisma.rAE_Funcionarios_X_Rol.findMany({
      where: {
        Id_funcionario: Id_funcionario,
      },
    });

    if (existingRelations.length === 0) {
      return NextResponse.json(
        { message: "El funcionario no tiene roles asignados" },
        { status: 200 }
      );
    }

    const result = await prisma.rAE_Funcionarios_X_Rol.deleteMany({
      where: {
        Id_funcionario: Id_funcionario,
      },
    });

    console.log(`Se eliminaron ${result.count} roles del funcionario`);
    return NextResponse.json(
      {
        message: "Roles eliminados correctamente",
        count: result.count,
        funcionarioId: Id_funcionario,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en DELETE Funcionarios_X_Rol:", error);

    return NextResponse.json(
      {
        error: "Error al eliminar los roles del funcionario",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
