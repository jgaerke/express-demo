#!/bin/bash
curl -i -H 'Content-Type:application/x-www-form-urlencoded' -X POST  -d @create_profile_form_encoded_data.txt  http://localhost:3000/api/profiles --no-proxy localhost:3000

