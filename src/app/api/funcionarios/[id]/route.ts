import { NextResponse } from "next/server";
import { prisma } from '../../../../../lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const Id_funcionario = searchParams.get('Id_funcionario');

    if (!Id_funcionario) {
      return NextResponse.json({ error: 'Id_funcionario is required' }, { status: 400 });
    }

    const result = await prisma.rAE_Funcionarios.findUnique({
      where: { Id_funcionario: Number(Id_funcionario) },
    });

    if (!result) {
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching teacher' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data: Funcionarios = await req.json();
    data.Password = await bcrypt.hash(data.Password, 10);
    const result = await prisma.rAE_Funcionarios.update({
      where: {
        Id_funcionario: data.Id_funcionario
      },
      data: {
        Primer_nombre: data.Primer_nombre,
        Segundo_nombre: data.Segundo_nombre || null,
        Primer_apellido: data.Primer_apellido,
        Segundo_apellido: data.Segundo_apellido || null,
        Cedula: data.Cedula,
        Estado: data.Estado,
        Suplente: data.Suplente,
        Password: data.Password,
        Change_password: data.Change_password,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating teachers' }, { status: 500 });
  }
}

export async function DELETE(_req: Request) {
  try {
    const { Id_funcionario } = await _req.json();
    const result = await prisma.rAE_Funcionarios.delete({
      where: { Id_funcionario: Id_funcionario },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting teacher' }, { status: 500 });
  }
}