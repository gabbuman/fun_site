from http.server import BaseHTTPRequestHandler
import urllib.request
import json

class handler(BaseHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        if args and kwargs:
            super().__init__(*args, **kwargs)

    def do_GET(self):
        try:
            # Fetch Chess.com stats
            username = "mesukatchess1"
            url = f"https://api.chess.com/pub/player/{username}/stats"

            req = urllib.request.Request(
                url,
                headers={'User-Agent': 'Personal Website - Contact: your-email@example.com'}
            )

            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode())

            # Send response
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            self.wfile.write(json.dumps(data).encode())

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()

            error_response = {'error': str(e)}
            self.wfile.write(json.dumps(error_response).encode())
