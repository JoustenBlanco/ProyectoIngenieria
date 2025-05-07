import {NextResponse} from "next/server"
import {prisma} from '../../../../lib/prisma'


export async function GET(){
    try {
        const result = await prisma.rAE_Clases.findMany({
          include: {
            RAE_Funcionarios: {
              select: {
                Primer_nombre: true,
                Primer_apellido: true,
                Segundo_apellido: true,
              },
            },
            RAE_Materia: {
              select: {
                Nombre: true,
              },
            },
            RAE_Secciones: {
              select: {
                Nombre: true,
              },
            },
          },
        });
        return NextResponse.json(result,{status:200});
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching classes' }, { status: 500 });
    }
}

export async function POST(_req: Request) {
    try {
      const data: CreateClase = await _req.json();  
      const result = await prisma.rAE_Clases.create({
        data: {
            Descripcion: data.Descripcion || null,                              
            Estado: data.Estado,                             
            Id_funcionario: data.Id_funcionario,           
            Id_materia: data.Id_materia,               
            Id_seccion: data.Id_seccion,                
        },
      }); 
      return NextResponse.json(result, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Error creating class' }, { status: 500 });
    }
  }

  export async function PUT(req: Request) {
    try {
      const data : Clase = await req.json();
      const result = await prisma.rAE_Clases.update({
        where: { 
            Id_clase : data.Id_clase
        }, 
        data: {
            Descripcion: data.Descripcion || null,                            
            Estado: data.Estado,                              
            Id_funcionario: data.Id_funcionario,           
            Id_materia: data.Id_materia,               
            Id_seccion: data.Id_seccion,                
        },
      });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error updating class' }, { status: 500 });
    }
  }

  export async function DELETE(_req: Request) {
    try {
      const { Id_clase } = await _req.json(); 
      const result = await prisma.rAE_Clases.delete({
        where:{Id_clase:Id_clase},
      });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting class' }, { status: 500 });
    }
  }