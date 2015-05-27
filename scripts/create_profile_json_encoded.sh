#!/bin/bash
curl -i -H 'Content-Type:application/json' -X POST  -d @create_profile_json_encoded_data.json  http://localhost:3000/api/profiles --no-proxy localhost:3000

