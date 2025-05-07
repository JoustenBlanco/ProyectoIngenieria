import {NextResponse} from "next/server"
import {prisma} from '../../../../../../lib/prisma'


export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url); 
        const cedula = searchParams.get('cedula'); 
        
        if (!cedula) {
            return NextResponse.json({ error: 'Cedula is required' }, { status: 400 });
        }

        const result = await prisma.rAE_Funcionarios.findFirst({
            where: { Cedula: cedula }, 
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