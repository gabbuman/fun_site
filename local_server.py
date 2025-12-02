#!/usr/bin/env python3
"""
Simple local development server for testing the website
Run with: python local_server.py
Then visit: http://localhost:8000
"""

import http.server
import socketserver
import os
from urllib.parse import urlparse

PORT = 8000

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL
        parsed_path = urlparse(self.path)
        path = parsed_path.path

        # Handle API routes
        if path.startswith('/api/'):
            self.handle_api(path)
        else:
            # Serve static files
            super().do_GET()

    def handle_api(self, path):
        """Handle API requests by importing and running Python functions"""
        try:
            if '/api/chess' in path:
                from api.chess import handler
                h = handler()
                h.do_GET = lambda: self.serve_api_response(handler)
                h.send_response = self.send_response
                h.send_header = self.send_header
                h.end_headers = self.end_headers
                h.wfile = self.wfile
                h.do_GET()

            elif '/api/dota' in path:
                from api.dota import handler
                h = handler()
                h.send_response = self.send_response
                h.send_header = self.send_header
                h.end_headers = self.end_headers
                h.wfile = self.wfile
                h.do_GET()

            elif '/api/solar' in path:
                from api.solar import handler
                h = handler()
                h.send_response = self.send_response
                h.send_header = self.send_header
                h.end_headers = self.end_headers
                h.wfile = self.wfile
                h.do_GET()

            else:
                self.send_error(404, "API endpoint not found")

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            error_msg = f'{{"error": "{str(e)}"}}'
            self.wfile.write(error_msg.encode())

    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

os.chdir(os.path.dirname(os.path.abspath(__file__)))

with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    print("")
    print(f"  >> Server running at http://localhost:{PORT}")
    print("")
    print("  Pages:")
    print(f"    - http://localhost:{PORT}/index.html")
    print(f"    - http://localhost:{PORT}/chess.html")
    print(f"    - http://localhost:{PORT}/dota.html")
    print(f"    - http://localhost:{PORT}/solar.html")
    print("")
    print("  Press Ctrl+C to stop")
    print("")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n  Server stopped.")
