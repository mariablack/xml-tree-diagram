// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// configure({ adapter: new Adapter() });
const originalConsoleError = console.error;
console.error = function (...data) {
  if (
    typeof data?.[0]?.toString === 'function' && 
    data[0].toString().includes('Error: Could not parse CSS stylesheet')
  ) return;
  originalConsoleError(...data);
};