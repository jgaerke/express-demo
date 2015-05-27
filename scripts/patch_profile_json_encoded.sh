#!/bin/bash
curl -i -H 'Content-Type:application/json' -X PATCH  -d @patch_profile_json_encoded_data.json  http://localhost:3000/api/profiles/b7bbc5b2-4d91-431f-ac01-9bf88d07609a --no-proxy localhost:3000

