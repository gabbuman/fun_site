from http.server import BaseHTTPRequestHandler
import urllib.request
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            # Steam64 ID: 76561198310726348
            # Convert to Account ID (Steam32): Steam64 - 76561197960265728
            steam64_id = 76561198310726348
            account_id = steam64_id - 76561197960265728  # = 350460620

            # Fetch OpenDota player profile
            profile_url = f"https://api.opendota.com/api/players/{account_id}"
            wl_url = f"https://api.opendota.com/api/players/{account_id}/wl"
            recent_url = f"https://api.opendota.com/api/players/{account_id}/recentMatches"

            result = {}

            # Get profile
            req = urllib.request.Request(profile_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=10) as response:
                result['profile'] = json.loads(response.read().decode())

            # Get win/loss
            req = urllib.request.Request(wl_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=10) as response:
                result['win_loss'] = json.loads(response.read().decode())

            # Extract rank and leaderboard info from profile
            profile = result['profile']
            result['rank_tier'] = profile.get('rank_tier')
            result['leaderboard_rank'] = profile.get('leaderboard_rank')

            # Get MMR estimate (from profile)
            if 'mmr_estimate' in profile:
                result['mmr_estimate'] = {
                    'estimate': profile['mmr_estimate'].get('estimate')
                }

            # Get recent matches
            req = urllib.request.Request(recent_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=10) as response:
                result['recent_matches'] = json.loads(response.read().decode())

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            self.wfile.write(json.dumps(result).encode())

        except urllib.error.HTTPError as e:
            self.send_response(e.code)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            error_response = {'error': f'OpenDota API error {e.code}: {e.reason}'}
            self.wfile.write(json.dumps(error_response).encode())

        except urllib.error.URLError as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            error_response = {'error': f'Network error: {str(e.reason)}'}
            self.wfile.write(json.dumps(error_response).encode())

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            error_response = {'error': f'Server error: {str(e)}'}
            self.wfile.write(json.dumps(error_response).encode())
