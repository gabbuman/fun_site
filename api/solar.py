from http.server import BaseHTTPRequestHandler
import urllib.request
import json

class handler(BaseHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        if args and kwargs:
            super().__init__(*args, **kwargs)

    def do_GET(self):
        try:
            # Define major cities for each region
            locations = [
                {
                    'name': 'North America',
                    'location': 'New York, USA',
                    'lat': 40.7128,
                    'lon': -74.0060
                },
                {
                    'name': 'Europe',
                    'location': 'Berlin, Germany',
                    'lat': 52.5200,
                    'lon': 13.4050
                },
                {
                    'name': 'Asia',
                    'location': 'Tokyo, Japan',
                    'lat': 35.6762,
                    'lon': 139.6503
                }
            ]

            regions_data = []

            for loc in locations:
                # Open-Meteo Solar Radiation API (free, no key needed)
                # Parameters: GHI (shortwave_radiation), DNI (direct_normal_irradiance), DHI (diffuse_radiation)
                url = (
                    f"https://api.open-meteo.com/v1/forecast?"
                    f"latitude={loc['lat']}&longitude={loc['lon']}"
                    f"&current=shortwave_radiation,direct_normal_irradiance,diffuse_radiation"
                    f"&daily=shortwave_radiation_sum,sunshine_duration"
                    f"&timezone=auto"
                )

                req = urllib.request.Request(url)
                with urllib.request.urlopen(req, timeout=10) as response:
                    data = json.loads(response.read().decode())

                region_info = {
                    'name': loc['name'],
                    'location': loc['location'],
                    'timezone': data.get('timezone'),
                    'current_time': data.get('current', {}).get('time'),
                    'current': {
                        'ghi': data.get('current', {}).get('shortwave_radiation'),
                        'dni': data.get('current', {}).get('direct_normal_irradiance'),
                        'dhi': data.get('current', {}).get('diffuse_radiation')
                    },
                    'daily': {
                        'peak': data.get('daily', {}).get('shortwave_radiation_sum', [None])[0],
                        'sunshine_duration': data.get('daily', {}).get('sunshine_duration', [None])[0]
                    }
                }

                regions_data.append(region_info)

            result = {
                'regions': regions_data,
                'timestamp': data.get('current', {}).get('time'),
                'source': 'Open-Meteo Solar API'
            }

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            self.wfile.write(json.dumps(result).encode())

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()

            error_response = {'error': str(e)}
            self.wfile.write(json.dumps(error_response).encode())
