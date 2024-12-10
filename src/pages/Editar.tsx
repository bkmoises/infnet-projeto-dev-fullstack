import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { getAllCars } from "../store/slices/car/actions";
import Table from "../components/Table";

const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const link = document.querySelector("link[rel~='icon']");
        if (link) {
            link.href = "/icon.png";
        }

        dispatch(getAllCars());
    }, [dispatch]);

    return <Table />;
}

export default App;
