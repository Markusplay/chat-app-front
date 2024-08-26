import Chat from './blocks/Chat/Chat';
import Sidebar from './blocks/Sidebar/Sidebar';
function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Chat />
    </div>
  );
}

export default App;
