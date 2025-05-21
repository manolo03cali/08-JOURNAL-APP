// Importamos el hook useState desde React para manejar el estado del formulario
import { useEffect, useMemo, useState } from "react";

// Definimos el custom hook useForm, que recibe como parámetro un objeto inicial para el formulario
export const useForm = (initialForm = {}, formValidations = {}) => {
  // Creamos un estado llamado formState con los valores iniciales del formulario
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});
  useEffect(() => {
    createValidators();
  }, [formState]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation]);

  // Esta función se encarga de manejar los cambios en los inputs del formulario
  const onInputChange = ({ target }) => {
    const { name, value } = target;

    // Actualizamos el estado del formulario usando el nombre del input como clave
    setFormState({
      ...formState, // Mantenemos los demás valores del formulario
      [name]: value, // Actualizamos solo el campo que cambió
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };
  const createValidators = () => {
    const formCheckedValues = {};
    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];
      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckedValues);
    //console.log(formCheckedValues);
  };

  // Retornamos:
  // - Todas las propiedades individuales del formulario (spread de formState)
  // - El estado completo del formulario (formState)
  // - La función para manejar cambios en los inputs (onInputChange)
  return {
    ...formState, // Permite acceder a los valores del formulario directamente (ej: username, email, etc.)
    formState, // Permite acceder al estado completo del formulario si se necesita
    onInputChange, // Se utiliza en los inputs para manejar los cambios
    onResetForm,
    ...formValidation,
    isFormValid,
  };
};
