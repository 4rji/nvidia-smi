import GPUStatus from './components/GPUStatus';

function App() {
  return (
    <div style={{ 
      backgroundColor: '#1a1a1a', 
      minHeight: '100vh',
      padding: '20px'
    }}>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        NVIDIA GPU Monitor
      </h1>
      <GPUStatus />
    </div>
  );
}

export default App;
