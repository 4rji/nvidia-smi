# NVIDIA GPU Monitor

A real-time monitoring application for NVIDIA GPUs that provides a beautiful and intuitive interface to track GPU usage, memory consumption, and power usage.

![GPU Monitor Screenshot](screenshots/monitor.png)

## Features

- Real-time monitoring of NVIDIA GPU metrics:
  - GPU Usage (%)
  - Memory Usage (MiB)
  - Power Consumption (W)
- Customizable refresh rate (1-10 seconds)
- Dark theme interface with circular progress indicators
- Configurable server connection settings
- Cross-platform Electron application

## Prerequisites

- Node.js 16.x or higher
- Python 3.6 or higher (for the agent)
- NVIDIA GPU with updated drivers
- `nvidia-smi` command available on the server machine

## Installation

### Client Application

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nvidia-nm.git
cd nvidia-nm
```

2. Install dependencies:
```bash
npm install
```

3. Build the application:
```bash
npm run build
```

### Server Agent

1. Copy the `agente.py` file to the machine with the NVIDIA GPU.

2. Install the required Python packages:
```bash
pip install flask nvidia-ml-py3 flask-cors
```

3. Run the agent:
```bash
python agente.py
```

By default, the agent runs on port 3001. You can modify this in the agent script if needed.

## Usage

### Starting the Application

Development mode:
```bash
npm run electron:dev
```

Production mode:
```bash
npm run electron:preview
```

### Connecting to a GPU

1. Launch the application
2. Enter the IP address of the machine running the agent (default: 192.168.44.34)
3. Verify the port number (default: 3001)
4. Click "Connect"

### Monitoring Features

- **Refresh Rate**: Select update intervals between 1-10 seconds
- **GPU Metrics**:
  - Usage percentage (0-100%)
  - Memory usage (Used/Total MiB)
  - Power consumption (Current/Max Watts)
- **Connection Controls**:
  - Disconnect/Reconnect
  - Reset to default IP

## Agent Details

The `agente.py` script runs on the machine with the NVIDIA GPU and provides the following functionality:

- Creates a REST API endpoint at `/status`
- Collects GPU metrics using `nvidia-smi`
- Enables CORS for cross-origin requests
- Returns JSON-formatted GPU data:
  ```json
  [{
    "name": "NVIDIA GeForce RTX 3070",
    "utilization": "0%",
    "memory": "3489MiB / 8192MiB",
    "power": "42.95W / 240.00W"
  }]
  ```

### Agent Configuration

The default configuration in `agente.py`:
- Host: `0.0.0.0` (accessible from any IP)
- Port: `3001`
- Update interval: 1 second

To modify these settings, edit the corresponding values in `agente.py`.

## Development

The application is built with:
- React + Vite for the frontend
- Electron for the desktop application
- Material-UI for the interface components
- Flask for the Python agent

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- NVIDIA for providing the NVML library
- The Electron community
- Material-UI team for the beautiful components
