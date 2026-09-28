# Planilla Justa

App para armar la planilla semanal de funcionarios repartiendo de forma pareja los puestos
rotativos (Entregas, Depósito, Puerta tarde…), los sábados y los horarios de descanso.

Es un solo archivo (`index.html`), sin servidor ni instalación: se abre en el navegador.
Los datos quedan guardados en ese navegador; usar la pestaña **Respaldo** para pasarlos a otro equipo.

## Cómo reparte

1. Respeta lo fijado a mano, las licencias y los días libres fijos.
2. **Sábados**: por sector, entra primero quien hace más tiempo que no trabaja uno.
3. **Libre compensatorio**: a quien trabaja el sábado se le da un día (por defecto mar–jue),
   el que tenga menos compañeros del sector libres.
4. **Puestos rotativos**: gana quien tenga el menor porcentaje de días sin comisión
   (sobre días trabajados, en las últimas N semanas confirmadas); después el menor porcentaje en ese puesto;
   la preferencia declarada solo desempata; luego quien hace más tiempo que no lo hace; al final un sorteo
   reproducible por semana (nunca el orden alfabético).
5. Descansos: cada semana todos corren un turno.

Cada decisión queda explicada en “Por qué quedó así”, y la pestaña **Equidad** muestra los acumulados.
Solo las semanas **confirmadas** cuentan para el historial.
