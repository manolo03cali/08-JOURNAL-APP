import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  // Aquí guardo el estado actual del formulario, inicializado con los valores que me pasan
  const [formState, setFormState] = useState(initialForm);

  // Aquí guardo el estado de las validaciones, que será un objeto con mensajes de error o null si es válido
  const [formValidation, setFormValidation] = useState({});

  // Cada vez que cambie el formState, ejecuto la función que valida los campos
  useEffect(() => {
    createValidators();
  }, [formState]);

  // Si el initialForm cambia, actualizo el formState para que refleje esos nuevos valores
  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  // Creo una variable que me dice si el formulario completo es válido o no
  // Recorro todos los valores de formValidation y si alguno tiene error (no es null), retorno false
  // Uso useMemo para que solo se recalculen cuando cambien las validaciones
  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }
    return true; // Si no encuentro errores, el formulario es válido
  }, [formValidation]);

  // Esta función la llamo cuando el usuario cambia un input
  // Actualizo el formState con el nuevo valor, manteniendo el resto igual
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Esta función la llamo cuando quiero resetear el formulario a su estado inicial
  const onResetForm = () => {
    setFormState(initialForm);
  };

  // Aquí defino la función que revisa las validaciones para cada campo del formulario
  const createValidators = () => {
    const formCheckedValues = {};

    // Recorro cada campo para validar usando las funciones que me pasaron en formValidations
    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];

      // Si la validación pasa, guardo null, sino guardo el mensaje de error
      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }

    // Finalmente actualizo el estado con los resultados de la validación
    setFormValidation(formCheckedValues);
  };

  // Retorno todo lo necesario para manejar el formulario y sus validaciones:
  // los valores individuales, el estado completo, funciones para cambiar y resetear,
  // los mensajes de validación y el indicador global de si el formulario es válido
  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,

    ...formValidation,
    isFormValid,
  };
};
