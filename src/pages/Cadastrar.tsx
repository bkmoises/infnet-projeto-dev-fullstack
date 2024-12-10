import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetCar } from "../store/slices/car/reducer";
import { AppDispatch } from "../store";
import Form from "../components/Form";

const Cadastrar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(resetCar());
  }, [dispatch]);

  return <Form />;
};

export default Cadastrar;
