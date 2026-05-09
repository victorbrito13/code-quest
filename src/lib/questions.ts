export type Question = {
  topic: string;
  question: string;
  options: string[];
  answer: number; // index
  explanation: string;
};

export const QUESTIONS: Question[] = [
  // 20 preguntas para el juego
  {
    topic: "Variables",
    question: "¿Cuál es la forma correcta de declarar una variable constante en JavaScript?",
    options: ["var x = 5;", "let x = 5;", "const x = 5;", "constant x = 5;"],
    answer: 2,
    explanation: "const declara una variable cuyo valor no puede reasignarse.",
  },
  {
    topic: "Condicionales",
    question: "¿Qué imprime este código?\n\nlet n = 7;\nif (n % 2 === 0) console.log('par');\nelse console.log('impar');",
    options: ["par", "impar", "7", "Error"],
    answer: 1,
    explanation: "7 no es divisible entre 2, por lo tanto es impar.",
  },
  {
    topic: "Ciclos",
    question: "¿Cuántas veces se ejecuta el cuerpo del ciclo?\n\nfor (let i = 0; i < 5; i++) { ... }",
    options: ["4", "5", "6", "Infinitas"],
    answer: 1,
    explanation: "Va de i=0 hasta i=4, son 5 iteraciones.",
  },
  {
    topic: "Funciones",
    question: "¿Qué retorna la función?\n\nfunction suma(a, b) {\n  return a + b;\n}\nsuma(3, 4);",
    options: ["34", "7", "undefined", "null"],
    answer: 1,
    explanation: "3 + 4 = 7. La función retorna la suma numérica.",
  },
  {
    topic: "Funciones y ciclos",
    question: "¿Qué valor tiene total al final?\n\nlet total = 0;\nfor (let i = 1; i <= 3; i++) {\n  total += i;\n}",
    options: ["3", "5", "6", "9"],
    answer: 2,
    explanation: "1 + 2 + 3 = 6.",
  },
  {
    topic: "Tipos",
    question: "¿Qué tipo devuelve `typeof null` en JavaScript?",
    options: ["'null'", "'object'", "'undefined'", "'number'"],
    answer: 1,
    explanation: "Por una peculiaridad histórica `typeof null` es 'object'.",
  },
  {
    topic: "Operadores",
    question: "¿Cuál es el resultado de `2 + '2'` en JavaScript?",
    options: ["4", "'22'", "NaN", "'4'"],
    answer: 1,
    explanation: "La suma con string concatena, por eso resulta '22'.",
  },
  {
    topic: "Ámbito",
    question: "¿Cuál es la diferencia principal entre `var` y `let`?",
    options: ["var es block-scoped", "let es function-scoped", "let es block-scoped", "No hay diferencia"],
    answer: 2,
    explanation: "`let` tiene alcance de bloque; `var` tiene alcance de función.",
  },
  {
    topic: "Arrays",
    question: "¿Qué método se usa para añadir un elemento al final de un array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: 0,
    explanation: "`push` añade al final; `unshift` añade al inicio.",
  },
  {
    topic: "Objetos",
    question: "¿Cómo accedes a la propiedad 'name' de un objeto `user`?",
    options: ["user.name", "user['name']", "Ambas", "Ninguna"],
    answer: 2,
    explanation: "Ambas sintaxis (`user.name` y `user['name']`) funcionan.",
  },
  {
    topic: "Async",
    question: "¿Qué palabra clave se usa para esperar una promesa?",
    options: ["await", "async", "then", "yield"],
    answer: 0,
    explanation: "`await` se usa dentro de funciones `async` para esperar promesas.",
  },
  {
    topic: "DOM",
    question: "¿Qué método devuelve un elemento por su id?",
    options: ["querySelectorAll", "getElementById", "getElementsByClassName", "querySelector"],
    answer: 1,
    explanation: "`document.getElementById('id')` devuelve el elemento con ese id.",
  },
  {
    topic: "Herencia",
    question: "¿Qué palabra clave crea una clase que hereda de otra en ES6?",
    options: ["extends", "implements", "inherits", "super"],
    answer: 0,
    explanation: "`class A extends B {}` declara herencia; `super` llama al constructor padre.",
  },
  {
    topic: "Errores",
    question: "¿Qué lanza JavaScript cuando se usa una variable no declarada?",
    options: ["TypeError", "ReferenceError", "SyntaxError", "RangeError"],
    answer: 1,
    explanation: "Acceder a una variable no declarada lanza ReferenceError.",
  },
  {
    topic: "JSON",
    question: "¿Cómo conviertes un objeto JS a JSON?",
    options: ["JSON.stringify(obj)", "JSON.parse(obj)", "obj.toJSON()", "String(obj)"],
    answer: 0,
    explanation: "`JSON.stringify` convierte un objeto a su representación JSON.",
  },
  {
    topic: "Closures",
    question: "¿Qué es un closure en JavaScript?",
    options: ["Una función sin retorno", "Una función que recuerda su entorno léxico", "Un tipo de error", "Un bucle infinito"],
    answer: 1,
    explanation: "Un closure es una función que mantiene acceso a variables del scope donde fue creada.",
  },
  {
    topic: "Comparación",
    question: "¿Cuál es la diferencia entre `==` y `===`?",
    options: ["No hay diferencia", "`==` compara tipo y valor", "`===` compara tipo y valor", "`===` convierte tipos"],
    answer: 2,
    explanation: "`===` compara estrictamente tipo y valor; `==` realiza coerción de tipos.",
  },
  {
    topic: "Eventos",
    question: "¿Qué método elimina un listener de evento?",
    options: ["removeEventListener", "off", "deleteListener", "stopPropagation"],
    answer: 0,
    explanation: "`removeEventListener` elimina un listener agregado con `addEventListener`.",
  },
  {
    topic: "Promesas",
    question: "¿Qué hace `Promise.all([...])`?",
    options: ["Devuelve la primera promesa resuelta", "Espera todas las promesas y devuelve un array de resultados", "Cancela las promesas", "Convierte a callbacks"],
    answer: 1,
    explanation: "`Promise.all` espera a que todas las promesas se resuelvan o rechaza si alguna falla.",
  },
  {
    topic: "Debugging",
    question: "¿Qué instrucción pausa la ejecución y abre las DevTools cuando están abiertas?",
    options: ["console.log()", "debugger;", "alert()", "break;"],
    answer: 1,
    explanation: "La sentencia `debugger;` pausa la ejecución si el depurador está activo.",
  },
];
