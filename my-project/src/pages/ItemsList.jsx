import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchItems } from '../items/itemsSlice';
import CharacterCard from '../components/CharacterCard';
import Spinner from '../components/Spinner';
import ErrorBox from '../components/ErrorBox';
import '../styles/ItemsPage.css';
// import itemsReducer from '../features/items/itemsSlice';

function ItemsPage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { list, loadingList, errorList } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchItems(query));
  }, [dispatch, query]);

  if (loadingList) {
    return <Spinner />;
  }

  if (errorList) {
    return <ErrorBox message={errorList} />;
  }

  return (
    <div className="items-page">
      <h1>Items {query && `- Search: "${query}"`}</h1>
      <div className="items-grid">
        {list.length === 0 ? (
          <p>No items found</p>
        ) : (
          list.map((item) => (
            <CharacterCard key={item.id} character={item} />
          ))
        )}
      </div>
    </div>
  );
}

export default ItemsPage;