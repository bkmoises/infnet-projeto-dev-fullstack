import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { getAllCar } from "../store/slices/car/actions";
import Form from "../components/Form";
import ErrorMsg from "../components/ErrorMsg";

interface Params {
    id: string;
}

const Detalhes: React.FC = () => {
    const { id } = useParams<Params>();
    const dispatch = useDispatch();
    const car = useSelector((state: RootState) => state.car.car);

    useEffect(() => {
        if (id) {
            dispatch(getAllCar(id));
        }
    }, [dispatch, id]);

    if (!car || Object.keys(car).length === 0) {
        return <ErrorMsg />;
    }

    return <Form isEdit car={car} />;
};

export default Detalhes;
