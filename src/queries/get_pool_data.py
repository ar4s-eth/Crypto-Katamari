import requests
import json
import pandas as pd
import time

counter = 0
query = """query {
  prizePools(where:{id:"0x0650d780292142835f6ac58dd8e2a336e87b4393"}) {
    id
    cumulativePrizeNet
    cumulativePrizeGross
    cumulativePrizeReserveFee
  }
}
"""
url = 'https://api.thegraph.com/subgraphs/name/pooltogether/pooltogether-v3_1_0'
while counter >= 0:
  r = requests.post(url, json={'query': query})
  counter += 1
  print(r.status_code)
  print(r.text)
  time.sleep(45)
  print('Try #:' + str(counter + 1))