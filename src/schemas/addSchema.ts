import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Minimum uzunluq 2 simvol olmalıdır")
    .required("İstifadəçinin adı mütləqdir"),
  surname: yup
    .string()
    .min(2, "Minimum uzunluq 2 simvol olmalıdır")
    .required("İstifadəçinin soyadı mütləqdir"),
  email: yup.string().required("İstifadəçinin email adresi mütləqdir"),
  age: yup
    .string()

    .required("İstifadəçinin yaşı mütləqdir"),
});
