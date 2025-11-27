import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemById, clearSelectedItem } from "../items/itemsSlice";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import "../styles/ItemDetails.css";

export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Получаем данные из Redux store
  const { selectedItem, loadingItem, errorItem } = useSelector(
    (state) => state.items
  );

  useEffect(() => {
    dispatch(fetchItemById(id));

    return () => {
      dispatch(clearSelectedItem());
    };
  }, [dispatch, id]);

  if (loadingItem) return <Spinner />;
  if (errorItem) return <ErrorBox message={errorItem} />;
  if (!selectedItem) return <p>Item not found.</p>;

  return (
    <div className="character-details">
      <img src={selectedItem.image} alt={selectedItem.name} />
      <h1>{selectedItem.name}</h1>
      <p><b>Status:</b> {selectedItem.status}</p>
      <p><b>Species:</b> {selectedItem.species}</p>
      <p><b>Gender:</b> {selectedItem.gender}</p>
      <p><b>Origin:</b> {selectedItem.origin?.name}</p>
      <p><b>Location:</b> {selectedItem.location?.name}</p>
      <p><b>Episodes:</b> {selectedItem.episode?.length}</p>

      <button onClick={() => navigate(-1)}>← Back</button>
    </div>
  );
}