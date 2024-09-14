import Curse from "../../components/curses/curse";

export default function TestPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Cursos</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl">
        <Curse
          image="/images/user.svg"
          title="Sección 11-2"
          description="Matemáticas"
        />
        <Curse
          image="/images/user.svg"
          title="Sección 11-2"
          description="Matemáticas"
        />
        <Curse
          image="/images/user.svg"
          title="Sección 11-2"
          description="Matemáticas"
        />
        <Curse
          image="/images/user.svg"
          title="Sección 11-2"
          description="Matemáticas"
        />
        <Curse
          image="/images/user.svg"
          title="Sección 11-2"
          description="Matemáticas"
        />
      </div>
    </div>
  );
}
