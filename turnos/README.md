# Planilla Justa

App para armar la planilla semanal de funcionarios. Reparte los puestos que rotan
(Entregas, Depósito, Puerta tarde…), los sábados, los días libres y los descansos.

Es un solo archivo (`index.html`), sin servidor ni instalación: se abre en el navegador.
Los datos quedan guardados en ese navegador; en **Ajustes → Respaldo** se copian para pasarlos a otro equipo.

## Qué trae

- **Guía paso a paso** la primera vez que se abre; se vuelve a ver con el botón “?”.
- **Planilla** por semana (grilla) o por día (cómoda en el celular). Tocando una casilla se ve
  por qué le tocó eso a esa persona y se puede cambiar; lo cambiado a mano queda fijo.
- **Avisar falta**: marca la ausencia y, si la persona tenía un puesto que rota, busca a quién le corresponde cubrirlo.
- **Equipo**: personas, próximo sábado estimado, licencias, teletrabajo y cursos (los días de curso no se asignan puestos que rotan).
- **Puestos**: cuántas personas necesita cada puesto por día y quién lo puede hacer (o si le gusta / prefiere evitarlo).
- **Sectores**: personas por sábado y máximo de libres el mismo día.
- **Ajustes**: días preferidos para el libre compensatorio, horarios de descanso, punto de partida
  (último sábado y días sin comisión del último mes) y respaldo.

## Cómo reparte (internamente)

1. Respeta lo fijado a mano, las licencias y los días libres fijos.
2. **Sábados**: por sector, entra primero quien hace más tiempo que no trabaja uno.
3. **Libre compensatorio**: el día preferido con menos compañeros libres, respetando el máximo por sector.
4. **Puestos que rotan**: gana quien tenga el menor porcentaje de días sin comisión (sobre días trabajados,
   en las últimas N semanas confirmadas); después el menor porcentaje en ese puesto; la preferencia solo desempata;
   luego quien hace más tiempo que no lo hace; al final un sorteo reproducible por semana.
5. **Descansos**: cada semana todos pasan al turno siguiente.

Solo las semanas **confirmadas** cuentan para la rotación.
