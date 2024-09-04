export const fillInTheBlankQuestions = [
    {
      question: "En el aprendizaje supervisado, un algoritmo aprende de un conjunto de entradas junto con sus salidas {0}. El algoritmo aprende comparando su salida {1} con las salidas correctas para encontrar {2}. Una vez que encuentra los errores, puede {3} el modelo {4}.",
      blanks: [
        { key: "0", value: "real" },
        { key: "1", value: "correctas" },
        { key: "2", value: "errores" },
        { key: "3", value: "modificar" },
        { key: "4", value: "en consecuencia" }
      ],
      word_bank: ["correctas", "real", "errores", "modificar", "en consecuencia"],
      explanation: "En el aprendizaje supervisado, el algoritmo recibe datos etiquetados, lo que significa que se le proporcionan las entradas y sus salidas correctas. El objetivo es aprender a mapear las entradas a las salidas correctas ajustando el modelo en función de los errores detectados al comparar la salida real con la salida deseada."    
    },
    {
      question: "La {0} es un tipo de aprendizaje automático {1} que se puede definir como el intento de {2} una salida dada la entrada...",
      blanks: [
        { key: "0", value: "clasificación" },
        { key: "1", value: "supervisado" },
        { key: "2", value: "predecir" },
        { key: "3", value: "etiquetados" },
        { key: "4", value: "aprender" }
      ],
      word_bank: ["clasificación", "supervisado", "predecir", "etiquetados", "aprender"],
      explanation: "La clasificación, que pertenece al aprendizaje supervisado, puede definirse como el intento de predecir una salida dada la entrada. Requiere un conjunto de ejemplos etiquetados, como una imagen, un texto o un discurso, para aprender."    
    }
  ];
  