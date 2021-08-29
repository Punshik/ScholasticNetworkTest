import { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.scss';
import ItemListPage from './components/ItemListPage';
import ItemPage from './components/ItemPage';
import Loader from './components/Loader';
import { useTypedSelector } from './hooks/useTypedSelector';

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const {loading} = useTypedSelector(state => state.loading);

  return (
    <BrowserRouter>
      <div className='header'>
            <span>Test Homework</span>
            <input type='text' value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder='Search'></input>
      </div>
      {
        loading ? <Loader /> : <span style={{display: 'none'}}></span>
      }
      <Route path={'/'} exact>
        <ItemListPage searchQuery={searchQuery}/>
      </Route>
      <Route path={'/item/:id'}>
        <ItemPage/>
      </Route>
    </BrowserRouter>
  );
}

export default App;
