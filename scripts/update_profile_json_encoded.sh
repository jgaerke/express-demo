#!/bin/bash
curl -i -H 'Content-Type:application/json' -X PUT  -d @update_profile_json_encoded_data.json  http://localhost:3000/api/profiles/38c132f5-e8de-479f-b406-e43103820421 --no-proxy localhost:3000

