#!/usr/bin/env python3
# Mont Sion Boutique Server
# Author: sossou Kouamé appolinaire développeur web

import http.server
import socketserver
import os
import sys

PORT = 10000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()
    
    def do_GET(self):
        # Handle SPA routing
        if self.path != '/' and not os.path.exists(os.path.join(DIRECTORY, self.path.lstrip('/'))):
            if self.path.endswith('.html') or not '.' in os.path.basename(self.path):
                self.path = '/'
        super().do_GET()

def run_server():
    print(f"🚀 Mont Sion Boutique server is running on port {PORT}")
    print(f"📱 Access the website at: http://localhost:{PORT}")
    print(f"👨‍💻 Developed by: sossou Kouamé appolinaire développeur web")
    print("=" * 60)
    
    with socketserver.TCPServer(("0.0.0.0", PORT), CustomHTTPRequestHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped by user")
            sys.exit(0)

if __name__ == "__main__":
    run_server()