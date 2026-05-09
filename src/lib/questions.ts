export type Question = {
  topic: string;
  question: string;
  options: string[];
  answer: number; // index
  explanation: string;
};

export const QUESTIONS: Question[] = [
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
];
