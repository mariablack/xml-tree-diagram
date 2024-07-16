import './App.css';
import XmlFileUploader from './components/XmlFileUploader';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

function App() {
  return (
    <div className="App">
      <h1>XML Presentation to Tree Diagram</h1>
      <XmlFileUploader />
    </div>
  );
}

export default App;
