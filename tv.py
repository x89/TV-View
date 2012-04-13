#!/usr/bin/env python

import pprint
import psycopg2 as pg
import json

conn = pg.connect("dbname=napalm user=postgres")

cur=conn.cursor()

cur.execute('''SELECT * FROM tv_view''')
shows = cur.fetchall()

pprint.pprint(shows)


cur.close()
conn.close()
