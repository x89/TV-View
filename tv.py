#!/usr/bin/env python

import psycopg2 as pg
import json
from collections import OrderedDict
from decimal import Decimal
from datetime import datetime

import cgitb
cgitb.enable()

conn = pg.connect("dbname=napalm user=lighty password=niggah")

cur=conn.cursor()

cur.execute('''SELECT name, season, episode, rating, view_date FROM tv_view order by name, season, episode, id''')
shows_array = cur.fetchall()

cur.close()
conn.close()

class ComplexEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            return float(o)
        elif isinstance(o, datetime):
            return o.isoformat()
        return json.JSONEncoder.default(self, o)

shows = []
for show in shows_array:
    tmp = {}
    tmp['name'] = show[0]
    tmp['season'] = show[1]
    tmp['episode'] = show[2]
    tmp['rating'] = show[3]
    tmp['view_date'] = show[4]
    shows.append(tmp)

print json.dumps(shows, cls=ComplexEncoder)
