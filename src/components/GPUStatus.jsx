import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const CircleProgress = ({ value, maxValue, color, label, size = 150 }) => {
  const percentage = (value / maxValue) * 100;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m: 2 }}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        {/* Círculo base */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#333"
          strokeWidth="8"
          fill="none"
        />
        {/* Círculo de progreso */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
        {/* Texto central */}
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dy="0.3em"
          fill="white"
          fontSize="16"
          fontWeight="bold"
        >
          {Math.round(percentage)}%
        </text>
      </svg>
      <Typography sx={{ color: 'white', mt: 1, textAlign: 'center' }}>
        {label}
      </Typography>
      <Typography sx={{ color: color, fontSize: '0.9rem', textAlign: 'center' }}>
        {value} / {maxValue}
      </Typography>
    </Box>
  );
};

export default function GPUStatus() {
  const [gpuData, setGpuData] = useState({
    name: "",
    power: { current: 0, max: 240 },
    memory: { used: 0, total: 8192 },
    utilization: 0
  });
  const [ip, setIp] = useState("192.168.44.34");
  const [port, setPort] = useState("3001");
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  const [updateInterval, setUpdateInterval] = useState(4);

  useEffect(() => {
    if (!connected) return;
    
    const fetchData = () => {
      fetch(`http://${ip}:${port}/status`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error en la respuesta del servidor: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data && data.length > 0) {
            const gpu = data[0];
            const powerValues = gpu.power.split('/').map(v => parseFloat(v));
            const memoryValues = gpu.memory.split('/').map(v => parseInt(v));
            
            setGpuData({
              name: gpu.name,
              power: {
                current: powerValues[0],
                max: powerValues[1]
              },
              memory: {
                used: memoryValues[0],
                total: memoryValues[1]
              },
              utilization: parseInt(gpu.utilization.replace('%', ''), 10)
            });
            setError(null);
          }
        })
        .catch((err) => {
          console.error(err);
          setError(err.message);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, updateInterval * 1000);
    return () => clearInterval(interval);
  }, [connected, ip, port, updateInterval]);

  return (
    <Box sx={{ padding: 2, maxWidth: 800, margin: "0 auto" }}>
      <Card sx={{ backgroundColor: '#1a1a1a', color: 'white' }}>
        <CardContent>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              Error: {error}
            </Typography>
          )}
          {!connected ? (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>Conectar a GPU Remota</Typography>
              <TextField
                label="IP del servidor"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                fullWidth
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                  },
                  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' }
                }}
              />
              <TextField
                label="Puerto"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                fullWidth
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                  },
                  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' }
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => setConnected(true)}
                sx={{ mt: 2 }}
              >
                Conectar
              </Button>
            </Box>
          ) : (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ color: '#4A90E2' }}>
                  {gpuData.name || "Conectando..."}
                </Typography>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Intervalo
                  </InputLabel>
                  <Select
                    value={updateInterval}
                    onChange={(e) => setUpdateInterval(e.target.value)}
                    sx={{
                      color: 'white',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.3)'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.5)'
                      },
                      '& .MuiSvgIcon-root': {
                        color: 'white'
                      }
                    }}
                  >
                    <MenuItem value={1}>1 segundo</MenuItem>
                    <MenuItem value={2}>2 segundos</MenuItem>
                    <MenuItem value={4}>4 segundos</MenuItem>
                    <MenuItem value={6}>6 segundos</MenuItem>
                    <MenuItem value={10}>10 segundos</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                flexWrap: 'wrap',
                gap: 2
              }}>
                <CircleProgress
                  value={gpuData.utilization}
                  maxValue={100}
                  color="#4A90E2"
                  label="GPU Usage"
                />
                <CircleProgress
                  value={gpuData.memory.used}
                  maxValue={gpuData.memory.total}
                  color="#50E3C2"
                  label="Memory"
                />
                <CircleProgress
                  value={gpuData.power.current}
                  maxValue={gpuData.power.max}
                  color="#E25668"
                  label="Power"
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() => setConnected(false)}
                >
                  Desconectar
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => {
                    setIp("192.168.44.34");
                    setPort("3001");
                  }}
                  sx={{
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,0.5)'
                    }
                  }}
                >
                  Restaurar IP por defecto
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
