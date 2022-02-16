import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import NewsComponent from './News/NewsComponent';

function App() {
  return (
    <div className='container d-flex justify-content-center'>
      <div className='app-container'>
        <h1 className='header'>News Today</h1>
        <NewsComponent />
      </div>
    </div>
  );
}

export default App;
