#!/usr/bin/env python3
import json
import subprocess
from http.server import BaseHTTPRequestHandler, HTTPServer

class GPUHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path != '/status':
            self.send_response(404)
            self.end_headers()
            return

        # Ejecuta nvidia-smi y formatea salida CSV sin encabezados ni unidades
        cmd = [
            'nvidia-smi',
            '--query-gpu=name,utilization.gpu,memory.used,memory.total,power.draw,power.limit',
            '--format=csv,noheader,nounits'
        ]
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(result.stderr.encode())
            return

        # Parsea cada línea en un objeto JSON
        data = []
        for line in result.stdout.strip().split('\n'):
            name, util, memUsed, memTotal, pDraw, pLimit = [x.strip() for x in line.split(',')]
            data.append({
                'name': name,
                'utilization': f"{util}%",
                'memory': f"{memUsed}MiB / {memTotal}MiB",
                'power': f"{pDraw}W / {pLimit}W"
            })

        body = json.dumps(data).encode()

        # Respuesta HTTP con CORS habilitado
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(body)

if __name__ == '__main__':
    port = 3001
    server = HTTPServer(('', port), GPUHandler)
    print(f"Listening on port {port}")
    server.serve_forever()
