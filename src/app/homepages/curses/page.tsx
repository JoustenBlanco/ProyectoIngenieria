import Curse from "../../components/curses/curse";

export default function Curses() {
  return (
    <div className="p-6 flex-col justify-start items-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-500">Cursos</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 w-full justify-center items-center transition-all duration-300">
        <Curse
          image="/images/students.svg"
          title="Sección 11-2"
          description="Matemáticas"
        />
        <Curse
          image="/images/students.svg"
          title="Sección 11-2"
          description="Matemáticas"
        />
        <Curse
          image="/images/students.svg"
          title="Sección 11-2"
          description="Matemáticas"
        />
        <Curse
          image="/images/students.svg"
          title="Sección 11-2"
          description="Matemáticas"
        />
        <Curse
          image="/images/students.svg"
          title="Sección 11-2"
          description="Matemáticas"
        />
      </div>
    </div>
  );
}
