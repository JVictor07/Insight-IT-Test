import * as React from "react";
import {
  Container,
  Form,
  Button,
} from "react-bootstrap";
import * as yup from "yup";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import "yup-phone";

const todayFormattedDate = new Date().toISOString().substring(0, 10)
const schema = yup.object({
  email: yup.string().required('O email é obrigatório'),
  phone: yup.string().phone("BR", true, 'O número precisa estar no formato (99) 99999-9999').required(),
  name: yup
    .string()
    .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi, 'O nome pode conter apenas letras')
    .required('O nome é obrigatório'),
  date: yup
    .date()
    .max(todayFormattedDate, 'Não é possível incluir uma data futura')
    .required('A data é obrigatória')
    .typeError('Inclua uma data válida'),
}).required();

const App = () => {
  const onSubmit = (values) => {
    window.alert(JSON.stringify(values))
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date: todayFormattedDate
    },
  });

  return (
    <Container className="my-4">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ex: Francisco"
            {...register("name", { required: "O nome é obrigatório" })}
          />
          {errors.name && (
            <Form.Text className="text-danger">
              {errors.name.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Telefone</Form.Label>
          <Form.Control
            type="phone"
            as={InputMask}
            mask={"(99) 99999-9999"}
            placeholder="Ex: 90000-0000"
            {...register("phone", { required: "O telefone é obrigatório" })}
          />
          {errors.phone && (
            <Form.Text className="text-danger">
              {errors.phone.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ex: email@gmail.com"
            {...register("email", { required: "O email é obrigatório" })}
          />
          {errors.email && (
            <Form.Text className="text-danger">
              {errors.email.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Data</Form.Label>
          <Form.Control
            type="date"
            placeholder="Ex: email@gmail.com"
            {...register("date", { required: "A data é obrigatória" })}
          />
          {errors.date && (
            <Form.Text className="text-danger">
              {errors.date.message}
            </Form.Text>
          )}
        </Form.Group>

        <Button className="mt-3" variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </Container>
  );
};

export default App;
