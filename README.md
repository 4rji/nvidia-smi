# NVIDIA GPU Monitor

A real-time monitoring application for NVIDIA GPUs that provides a beautiful and intuitive interface to track GPU usage, memory consumption, and power usage.

🌐 **Live Demo**: [https://4rji.github.io/nvidia-smi/](https://4rji.github.io/nvidia-smi/)

<img width="744" alt="Image" src="https://github.com/user-attachments/assets/1ab75804-9c70-4647-83e6-f7683d011dd8" />


## Features

- Real-time monitoring of NVIDIA GPU metrics:
  - GPU Usage (%)
  - Memory Usage (MiB)
  - Power Consumption (W)
- Customizable refresh rate (1–10 seconds)
- Dark-themed interface with circular progress indicators
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
   git clone https://github.com/4rji/nvidia-smi.git
   cd nvidia-nm
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run or build the application:
   ```bash
   # Web development
   npm run dev          # Start development server
   npm run build        # Build for production
   npm run preview      # Preview production build
   
   # Electron desktop app
   npm run electron:dev    # Run Electron in development
   npm run electron:build  # Build Electron app
   npm run electron:preview # Preview Electron app
   
   # Deploy to GitHub Pages
   npm run deploy       # Deploy web version to GitHub Pages
   ```

### Server Agent

1. Copy the `agente.py` file to the machine with the NVIDIA GPU.

2. Run the agent:
   ```bash
   python3 agente.py
   ```

By default, the agent runs on port 3001. You can modify this in the agent script if needed.

## Usage

### Starting the Application

- Development mode:
  ```bash
  npm run electron:dev
  ```
- Production mode:
  ```bash
  npm run electron:preview
  ```

### Connecting to a GPU

1. Launch the application  
2. Enter the IP address of the machine running the agent (default: 192.168.44.34)  
3. Verify the port number (default: 3001)  
4. Click “Connect”  

<img width="744" alt="Image" src="https://github.com/user-attachments/assets/e1072eac-f573-4c83-a763-a42ca2656673" />




### Monitoring Features

- **Refresh Rate**: Select update intervals between 1–10 seconds  
- **GPU Metrics**:
  - Usage percentage (0–100%)
  - Memory usage (Used/Total MiB)
  - Power consumption (Current/Max Watts)
- **Connection Controls**:
  - Disconnect/Reconnect
  - Reset to default IP

## Agent Details

For easy deployment, use the agents in the releases. Available for Linux and Windows (I don't have a Windows computer so I haven't tried it, but you can use the Python agent too).

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

<img width="744" alt="Image" src="https://github.com/user-attachments/assets/6e66daa5-f7cf-4d64-afeb-28e1b4b6c0f4" />

### Agent Configuration

The default configuration in `agente.py`:

- Host: `0.0.0.0` (accessible from any IP)  
- Port: `3001`  
- Update interval: 1 second  

To modify these settings, edit the corresponding values in `agente.py`.

## GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages using GitHub Actions. Here's how to set it up:

### Automatic Deployment (Recommended)

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" in the sidebar
   - Under "Source", select "GitHub Actions"

2. **Deploy automatically**:
   - Every push to the `main` branch will trigger a deployment
   - The workflow is already configured in `.github/workflows/deploy.yml`
   - Your app will be available at `https://yourusername.github.io/nvidia-smi/`

### Manual Deployment

If you prefer to deploy manually:

```bash
# Install gh-pages if not already installed
npm install --save-dev gh-pages

# Deploy
npm run deploy
```

### Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public` folder with your domain name
2. Configure your DNS to point to GitHub Pages
3. Update the `base` in `vite.config.js` to match your domain

## Development

The application is built with:

- React + Vite for the frontend  
- Electron for the desktop application  
- Material-UI for the interface components  
- Flask for the Python agent  

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- NVIDIA for providing the NVML library  
- The Electron community  
- Material-UI team for the beautiful components  
